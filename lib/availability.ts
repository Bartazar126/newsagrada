import 'server-only'

import { getDb } from '@/lib/db'
import { SITE_LABEL } from '@/lib/site-label'
import { ticketTiers, timeSlots as ticketTimeSlots } from '@/lib/tickets-data'

export const timeSlots = ticketTimeSlots

export type ProductSlug = (typeof ticketTiers)[number]['id']

export const productBookingTimes: Record<ProductSlug, readonly string[]> =
  Object.fromEntries(
    ticketTiers.map((ticket) => [ticket.id, timeSlots]),
  ) as Record<ProductSlug, readonly string[]>

export type AvailabilityClosure = {
  id: string
  product_slug: ProductSlug
  closure_date: string
  closure_time: string | null
  note: string | null
  created_at: string
  source: string
}

async function ensureAvailabilityClosureTable() {
  const db = getDb()

  await db.query(`
    create table if not exists public.valor_availability_closures (
      id uuid primary key default gen_random_uuid(),
      product_slug text not null,
      closure_date date not null,
      closure_time text,
      note text,
      source text not null default 'website',
      created_at timestamptz not null default now(),
      closure_time_key text generated always as (coalesce(closure_time, '__full_day__')) stored
    );

    alter table public.valor_availability_closures enable row level security;

    revoke all on table public.valor_availability_closures from anon, authenticated;
    grant select, insert, update, delete on table public.valor_availability_closures to service_role;

    alter table public.valor_availability_closures
      add column if not exists closure_time_key text generated always as (coalesce(closure_time, '__full_day__')) stored;

    create unique index if not exists valor_availability_closures_source_slot_idx
      on public.valor_availability_closures (source, product_slug, closure_date, closure_time_key);

    create index if not exists valor_availability_closures_lookup_idx
      on public.valor_availability_closures (source, product_slug, closure_date, closure_time);
  `)
}

export function getAdminProducts() {
  return [...ticketTiers]
    .sort((a, b) => {
      if (a.id === 'towers') return -1
      if (b.id === 'towers') return 1
      return 0
    })
    .map((ticket) => ({
    slug: ticket.id,
    title: ticket.name,
  }))
}

export function isProductSlug(value: string): value is ProductSlug {
  return ticketTiers.some((ticket) => ticket.id === value)
}

export function getBookingTimesForProduct(productSlug: ProductSlug) {
  if (!isProductSlug(productSlug)) {
    return []
  }

  return productBookingTimes[productSlug] ?? []
}

export async function listAvailabilityClosures() {
  await ensureAvailabilityClosureTable()
  const db = getDb()
  const { rows } = await db.query<AvailabilityClosure>(
    `
      select
        id,
        product_slug,
        closure_date::text as closure_date,
        closure_time,
        note,
        created_at::text as created_at,
        source
      from public.valor_availability_closures
      where source = $1 and closure_date >= current_date
      order by closure_date asc, product_slug asc, closure_time asc nulls first
    `,
    [SITE_LABEL],
  )

  return rows
}

export async function createAvailabilityClosure({
  productSlug,
  closureDate,
  closureTime,
  note,
}: {
  productSlug: ProductSlug
  closureDate: string
  closureTime: string | null
  note: string
}) {
  await ensureAvailabilityClosureTable()
  const db = getDb()
  const productSlugs =
    closureTime === null ? ticketTiers.map((ticket) => ticket.id) : [productSlug]

  for (const nextProductSlug of productSlugs) {
    await db.query(
      `
        insert into public.valor_availability_closures (
          product_slug,
          closure_date,
          closure_time,
          note,
          source
        )
        values ($1, $2, $3, nullif($4, ''), $5)
        on conflict (source, product_slug, closure_date, closure_time_key)
        do update set note = excluded.note
      `,
      [nextProductSlug, closureDate, closureTime, note.trim(), SITE_LABEL],
    )
  }
}

export async function deleteAvailabilityClosure(id: string) {
  await ensureAvailabilityClosureTable()
  const db = getDb()

  await db.query(
    `
      delete from public.valor_availability_closures
      where id = $1 and source = $2
    `,
    [id, SITE_LABEL],
  )
}

export async function deleteAvailabilityClosureBySlot({
  productSlug,
  closureDate,
  closureTime,
}: {
  productSlug: ProductSlug
  closureDate: string
  closureTime: string | null
}) {
  await ensureAvailabilityClosureTable()
  const db = getDb()

  if (closureTime === null) {
    await db.query(
      `
        delete from public.valor_availability_closures
        where source = $1
          and closure_date = $2::date
          and closure_time is null
      `,
      [SITE_LABEL, closureDate],
    )
    return
  }

  await db.query(
    `
      delete from public.valor_availability_closures
      where source = $1
        and product_slug = $2
        and closure_date = $3::date
        and coalesce(closure_time, '__full_day__') = coalesce($4, '__full_day__')
    `,
    [SITE_LABEL, productSlug, closureDate, closureTime],
  )
}

export async function getClosuresForProduct(productSlug: ProductSlug) {
  await ensureAvailabilityClosureTable()
  const db = getDb()
  const { rows } = await db.query<{
    closure_date: string
    closure_time: string | null
  }>(
    `
      select closure_date::text as closure_date, closure_time
      from public.valor_availability_closures
      where source = $1
        and (
          product_slug = $2
          or closure_time is null
        )
        and closure_date >= current_date
      order by closure_date asc, closure_time asc nulls first
    `,
    [SITE_LABEL, productSlug],
  )

  return rows
}

export async function assertAvailabilityOpen({
  productSlug,
  visitDate,
  visitTime,
}: {
  productSlug: ProductSlug
  visitDate: string
  visitTime: string
}) {
  await ensureAvailabilityClosureTable()
  const db = getDb()
  const { rowCount } = await db.query(
    `
      select 1
      from public.valor_availability_closures
      where source = $1
        and (
          product_slug = $2
          or closure_time is null
        )
        and closure_date = $3::date
        and (closure_time is null or closure_time = $4)
      limit 1
    `,
    [SITE_LABEL, productSlug, visitDate, visitTime],
  )

  if (rowCount) {
    throw new Error('This date or time is closed for the selected ticket.')
  }
}
