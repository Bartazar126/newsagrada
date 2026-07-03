import { NextResponse } from 'next/server'
import { getTicketTiersWithPrices } from '@/lib/ticket-prices'

export async function GET() {
  const tiers = await getTicketTiersWithPrices()

  return NextResponse.json({
    prices: tiers.map((tier) => ({
      id: tier.id,
      price: tier.price,
    })),
  })
}
