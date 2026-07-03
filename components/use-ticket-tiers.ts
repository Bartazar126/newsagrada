'use client'

import { useEffect, useMemo, useState } from 'react'
import { ticketTiers, type TicketTier } from '@/lib/tickets-data'

type TicketPricesResponse = {
  prices?: Array<{
    id: string
    price: number
  }>
}

export function useTicketTiers() {
  const [prices, setPrices] = useState<Record<string, number>>({})

  useEffect(() => {
    let active = true

    async function loadPrices() {
      try {
        const response = await fetch('/api/ticket-prices', {
          cache: 'no-store',
        })

        if (!response.ok) return

        const data = (await response.json()) as TicketPricesResponse
        const nextPrices = Object.fromEntries(
          (data.prices ?? [])
            .filter((price) => Number.isFinite(price.price))
            .map((price) => [price.id, price.price]),
        )

        if (active) {
          setPrices(nextPrices)
        }
      } catch {
        // Static prices remain available if the settings API is unavailable.
      }
    }

    loadPrices()

    return () => {
      active = false
    }
  }, [])

  return useMemo<TicketTier[]>(
    () =>
      ticketTiers.map((tier) => ({
        ...tier,
        price: prices[tier.id] ?? tier.price,
      })),
    [prices],
  )
}
