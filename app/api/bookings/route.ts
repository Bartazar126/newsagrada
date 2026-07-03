import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'
import { assertAvailabilityOpen } from '@/lib/availability'
import { createBooking } from '@/lib/booking-storage'
import { getStripe } from '@/lib/stripe'
import { getTicketTiersWithPrices } from '@/lib/ticket-prices'
import {
  getBookingProductTitle,
  timeSlots,
  type TicketTier,
} from '@/lib/tickets-data'

type BookingPayload = {
  productSlug?: unknown
  visitDate?: unknown
  visitTime?: unknown
  adults?: unknown
  children?: unknown
  language?: unknown
  fullName?: unknown
  email?: unknown
  phone?: unknown
  sourcePath?: unknown
}

const CHILD_DISCOUNT = 0.4
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function getString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function getPositiveInteger(value: unknown, fallback: number) {
  const numberValue = Number(value)

  if (!Number.isInteger(numberValue) || numberValue < 0) {
    return fallback
  }

  return numberValue
}

function getSafeSourcePath(value: unknown) {
  const sourcePath = getString(value)

  if (!sourcePath.startsWith('/') || sourcePath.startsWith('//')) {
    return '/'
  }

  return sourcePath.slice(0, 250)
}

function validatePayload(payload: BookingPayload, ticketTiers: TicketTier[]) {
  const productSlug = getString(payload.productSlug)
  const product = ticketTiers.find((ticket) => ticket.id === productSlug)

  if (!product) {
    throw new Error('Please select a valid ticket.')
  }

  const visitDate = getString(payload.visitDate)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(visitDate)) {
    throw new Error('Please select a valid visit date.')
  }

  const visitTime = getString(payload.visitTime)
  if (!timeSlots.includes(visitTime)) {
    throw new Error('Please select a valid visit time.')
  }

  const adults = getPositiveInteger(payload.adults, 0)
  const children = getPositiveInteger(payload.children, 0)
  if (adults < 1) {
    throw new Error('At least one adult ticket is required.')
  }

  const fullName = getString(payload.fullName)
  if (fullName.length < 2) {
    throw new Error('Please enter your full name.')
  }

  const email = getString(payload.email).toLowerCase()
  if (!EMAIL_RE.test(email)) {
    throw new Error('Please enter a valid email address.')
  }

  const phone = getString(payload.phone)
  if (phone.replace(/\D/g, '').length < 8) {
    throw new Error('Please enter a valid phone number.')
  }

  const childPrice = Math.round(product.price * (1 - CHILD_DISCOUNT))
  const serviceFee = adults + children > 0 ? 2 : 0

  return {
    productSlug: product.id,
    productTitle: getBookingProductTitle(product.id, product.name),
    productPrice: product.price,
    visitDate,
    visitTime,
    adults,
    children,
    language: getString(payload.language) || 'en',
    fullName,
    email,
    phone,
    total: adults * product.price + children * childPrice + serviceFee,
    sourcePath: getSafeSourcePath(payload.sourcePath),
  }
}

function getRequestOrigin(request: Request) {
  const forwardedHost = request.headers.get('x-forwarded-host')
  const forwardedProto = request.headers.get('x-forwarded-proto') ?? 'https'

  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`
  }

  return new URL(request.url).origin
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as BookingPayload
    const ticketTiers = await getTicketTiersWithPrices()
    const validatedBooking = validatePayload(payload, ticketTiers)
    await assertAvailabilityOpen({
      productSlug: validatedBooking.productSlug,
      visitDate: validatedBooking.visitDate,
      visitTime: validatedBooking.visitTime,
    })

    const stripe = getStripe()
    let booking: { id: string; order_number: string } | null = null
    let orderNumber = `SAG-${Date.now()}-${randomUUID().slice(0, 8)}`

    try {
      booking = await createBooking(validatedBooking)
      orderNumber = booking.order_number
    } catch (error) {
      if (!stripe) {
        throw error
      }
    }

    if (stripe) {
      const origin = getRequestOrigin(request)
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}${validatedBooking.sourcePath}#booking`,
        customer_email: validatedBooking.email,
        client_reference_id: orderNumber,
        metadata: {
          bookingId: booking?.id ?? '',
          orderNumber,
          site: 'newsagrada',
        },
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: 'eur',
              unit_amount: Math.round(validatedBooking.total * 100),
              product_data: {
                name: `${validatedBooking.productTitle} booking`,
                description: `${validatedBooking.visitDate} at ${validatedBooking.visitTime}`,
              },
            },
          },
        ],
      })

      if (!session.url) {
        throw new Error('Stripe checkout could not be started.')
      }

      return NextResponse.json(
        {
          id: booking?.id,
          orderNumber,
          checkoutUrl: session.url,
        },
        { status: 201 },
      )
    }

    return NextResponse.json(
      {
        id: booking?.id,
        orderNumber,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : 'Booking payload is invalid.',
      },
      { status: 400 },
    )
  }
}
