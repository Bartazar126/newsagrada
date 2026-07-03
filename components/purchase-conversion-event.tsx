'use client'

import { useEffect } from 'react'

export function PurchaseConversionEvent({
  transactionId,
}: {
  transactionId?: string
}) {
  useEffect(() => {
    if (!transactionId) return

    window.gtag?.('event', 'ads_conversion_PURCHASE_1', {
      transaction_id: transactionId,
      currency: 'EUR',
    })
  }, [transactionId])

  return null
}
