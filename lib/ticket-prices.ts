import 'server-only'

import { getDb } from '@/lib/db'
import { SITE_LABEL } from '@/lib/site-label'
import { ticketTiers, type TicketTier } from '@/lib/tickets-data'

export type TicketPrice = {
  id: string
  price: number
}

function mergePrices(prices: TicketPrice[]) {
  const priceById = new Map(prices.map((price) => [price.id, price.price]))

  return ticketTiers.map((tier) => ({
    ...tier,
    price: priceById.get(tier.id) ?? tier.price,
  }))
}

async function ensureTicketPriceTable() {
  const db = getDb()

  await db.query(`
    create table if not exists public.valor_ticket_prices (
      site text not null,
      ticket_slug text not null,
      price numeric(10, 2) not null check (price >= 0),
      updated_at timestamptz not null default now(),
      primary key (site, ticket_slug)
    );

    alter table public.valor_ticket_prices enable row level security;

    revoke all on table public.valor_ticket_prices from anon, authenticated;
    grant select, insert, update, delete on table public.valor_ticket_prices to service_role;
  `)

  for (const tier of ticketTiers) {
    await db.query(
      `
        insert into public.valor_ticket_prices (site, ticket_slug, price)
        values ($1, $2, $3)
        on conflict (site, ticket_slug) do nothing
      `,
      [SITE_LABEL, tier.id, tier.price],
    )
  }
}

export async function getTicketTiersWithPrices(): Promise<TicketTier[]> {
  try {
    await ensureTicketPriceTable()
    const db = getDb()
    const { rows } = await db.query<{ id: string; price: number }>(
      `
        select ticket_slug as id, price::float8 as price
        from public.valor_ticket_prices
        where site = $1
      `,
      [SITE_LABEL],
    )

    return mergePrices(rows)
  } catch {
    return ticketTiers
  }
}

export async function updateTicketPrices(prices: TicketPrice[]) {
  const validIds = new Set(ticketTiers.map((tier) => tier.id))
  const cleanPrices = prices.filter(
    (price) =>
      validIds.has(price.id) && Number.isFinite(price.price) && price.price >= 0,
  )

  if (cleanPrices.length !== ticketTiers.length) {
    throw new Error('Please enter a valid price for every ticket type.')
  }

  await ensureTicketPriceTable()
  const db = getDb()

  for (const price of cleanPrices) {
    await db.query(
      `
        insert into public.valor_ticket_prices (site, ticket_slug, price, updated_at)
        values ($1, $2, $3, now())
        on conflict (site, ticket_slug)
        do update set price = excluded.price, updated_at = now()
      `,
      [SITE_LABEL, price.id, price.price],
    )
  }
}
