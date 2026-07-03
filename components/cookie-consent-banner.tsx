'use client'

import { useEffect, useState } from 'react'

export const COOKIE_CONSENT_EVENT = 'sagrada-cookie-consent-change'
export const COOKIE_CONSENT_STORAGE_KEY = 'sagrada-cookie-consent'

export type CookieConsent = {
  statistics: boolean
  marketing: boolean
  updatedAt: string
}

const COOKIE_MAX_AGE = 60 * 60 * 24 * 180

function createConsent(allowed: boolean): CookieConsent {
  return {
    statistics: allowed,
    marketing: allowed,
    updatedAt: new Date().toISOString(),
  }
}

function readStoredConsent() {
  if (typeof window === 'undefined') return null

  try {
    const stored = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
    return stored ? (JSON.parse(stored) as CookieConsent) : null
  } catch {
    return null
  }
}

function persistConsent(consent: CookieConsent) {
  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(consent))

  const status = consent.statistics || consent.marketing ? 'accepted' : 'rejected'
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `sagrada_cookie_consent=${status}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax${secure}`
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: consent }))
}

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(!readStoredConsent())
  }, [])

  function handleChoice(allowed: boolean) {
    persistConsent(createConsent(allowed))
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <section
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-4xl rounded-3xl border border-border bg-background/95 p-5 shadow-2xl shadow-foreground/20 backdrop-blur sm:bottom-5 sm:p-6"
    >
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            We use cookies
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            We use essential cookies to run the site, and optional analytics and
            marketing cookies to improve bookings and measure ads. You can
            accept all cookies or reject non-essential cookies.
          </p>
          <a
            href="/cookie-policy"
            className="mt-2 inline-flex text-sm font-semibold text-primary hover:underline"
          >
            Read our cookie policy
          </a>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row md:flex-col">
          <button
            type="button"
            onClick={() => handleChoice(true)}
            className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={() => handleChoice(false)}
            className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Reject non-essential
          </button>
        </div>
      </div>
    </section>
  )
}
