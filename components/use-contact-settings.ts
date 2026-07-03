'use client'

import { useEffect, useState } from 'react'

export type ClientContactSettings = {
  supportEmail: string
  supportPhone: string
}

export const defaultClientContactSettings: ClientContactSettings = {
  supportEmail: 'support@valortours.org',
  supportPhone: '+1 505 537 5806',
}

export function formatPhoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function useContactSettings() {
  const [settings, setSettings] = useState(defaultClientContactSettings)

  useEffect(() => {
    let active = true

    async function loadSettings() {
      try {
        const response = await fetch('/api/contact-settings', {
          cache: 'no-store',
        })

        if (!response.ok) return

        const data = (await response.json()) as Partial<ClientContactSettings>

        if (active && data.supportEmail && data.supportPhone) {
          setSettings({
            supportEmail: data.supportEmail,
            supportPhone: data.supportPhone,
          })
        }
      } catch {
        // Static contact details remain available if the settings API is unavailable.
      }
    }

    loadSettings()

    return () => {
      active = false
    }
  }, [])

  return settings
}
