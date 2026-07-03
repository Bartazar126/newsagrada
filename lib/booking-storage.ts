import 'server-only'

import { getDb } from '@/lib/db'
import { SITE_LABEL } from '@/lib/site-label'

export type BookingRequest = {
  productSlug: string
  productTitle: string
  productPrice: number
  visitDate: string
  visitTime: string
  adults: number
  children: number
  language: string
  fullName: string
  email: string
  phone: string
  total: number
  sourcePath: string
}

export type StoredBooking = {
  id: string
  order_number: string
  created_at: string
  product_slug: string
  product_title: string
  product_price: number
  visit_date: string
  visit_time: string
  adults: number
  children: number
  language: string
  first_name: string
  last_name: string
  email: string
  phone: string
  total: number
  status: string
  source: string
}

function splitFullName(fullName: string) {
  const parts = fullName.trim().replace(/\s+/g, ' ').split(' ')
  const firstName = parts.shift() ?? ''
  const lastName = parts.join(' ') || '-'

  return { firstName, lastName }
}

export async function createBooking(booking: BookingRequest) {
  const db = getDb()
  const { firstName, lastName } = splitFullName(booking.fullName)
  const { rows } = await db.query<{ id: string; order_number: string }>(
    `
      insert into public.valor_bookings (
        product_slug,
        product_title,
        product_price,
        visit_date,
        visit_time,
        adults,
        children,
        language,
        first_name,
        last_name,
        email,
        phone,
        traveler_names,
        document_type,
        document_number,
        total,
        source,
        status
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, 'new')
      returning id, order_number
    `,
    [
      booking.productSlug,
      booking.productTitle,
      booking.productPrice,
      booking.visitDate,
      booking.visitTime,
      booking.adults,
      booking.children,
      booking.language,
      firstName,
      lastName,
      booking.email,
      booking.phone,
      [booking.fullName.trim()],
      'not-provided',
      booking.sourcePath,
      booking.total,
      SITE_LABEL,
    ],
  )

  const storedBooking = rows[0]

  if (!storedBooking) {
    throw new Error('Booking could not be saved.')
  }

  return storedBooking
}

export async function listBookings() {
  const db = getDb()
  const { rows } = await db.query<StoredBooking>(
    `
      select
        id,
        order_number,
        created_at::text as created_at,
        product_slug,
        product_title,
        product_price::float8 as product_price,
        visit_date::text as visit_date,
        visit_time,
        adults,
        children,
        language,
        first_name,
        last_name,
        email,
        phone,
        total::float8 as total,
        status,
        source
      from public.valor_bookings
      where source = $1
      order by created_at desc
    `,
    [SITE_LABEL],
  )

  return rows
}
