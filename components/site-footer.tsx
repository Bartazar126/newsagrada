'use client'

import { Mail, Phone } from 'lucide-react'
import { SiteLogo } from '@/components/site-logo'
import { FooterBookingLink, FooterScrollLink } from '@/components/footer-booking-link'
import { useHomeLocaleOptional } from '@/components/home-locale-provider'
import {
  formatPhoneHref,
  useContactSettings,
} from '@/components/use-contact-settings'
import { getHomeCopy } from '@/lib/i18n/home'

const defaultFooter = getHomeCopy('en').footer

const ticketIds = ['basic', 'towers', 'guided'] as const

const tourLinkKeys = [
  { key: 'premiumTour' as const, href: '#' },
  { key: 'towersPanorama' as const, href: '#' },
  { key: 'gaudiFullDay' as const, href: '#' },
  { key: 'groupBooking' as const, href: '/contact' },
]

export function SiteFooter({ localized = false }: { localized?: boolean }) {
  const homeLocale = useHomeLocaleOptional()
  const contactSettings = useContactSettings()
  const t = localized && homeLocale ? homeLocale.t.footer : defaultFooter

  const informationLinks: Array<
    { label: string; sectionId: string } | { label: string; href: string }
  > = [
    { label: t.infoLinks.faq, sectionId: 'faq' },
    { label: t.infoLinks.cancellationPolicy, href: '/cancellation-policy' },
    { label: t.infoLinks.privacyPolicy, href: '/privacy-policy' },
    { label: t.infoLinks.termsOfService, href: '/terms-of-service' },
    { label: t.infoLinks.contact, href: '/contact' },
  ]

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <SiteLogo textClassName="text-foreground" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t.tagline}
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                <a
                  href={`mailto:${contactSettings.supportEmail}`}
                  className="transition-colors hover:text-primary"
                >
                  {contactSettings.supportEmail}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-primary" />
                <a
                  href={formatPhoneHref(contactSettings.supportPhone)}
                  className="transition-colors hover:text-primary"
                >
                  {contactSettings.supportPhone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {t.columns.tickets}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {ticketIds.map((ticketId) => (
                <li key={ticketId}>
                  <FooterBookingLink
                    ticketId={ticketId}
                    label={t.ticketLinks[ticketId]}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {t.columns.tours}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {tourLinkKeys.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {t.tourLinks[link.key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {t.columns.information}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {informationLinks.map((link) => (
                <li key={link.label}>
                  {'sectionId' in link ? (
                    <FooterScrollLink
                      sectionId={link.sectionId}
                      label={link.label}
                    />
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          role="note"
          aria-label="Legal disclaimer"
          className="mt-12 rounded-2xl border border-primary/20 bg-secondary/80 px-5 py-5 text-sm leading-relaxed text-foreground/90 shadow-sm sm:px-6 sm:py-6"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {t.importantNotice}
          </p>
          <p className="mt-3">{t.disclaimer}</p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>{t.rights.replace('{year}', String(new Date().getFullYear()))}</p>
          <div className="flex gap-5">
            <a href="/privacy-policy" className="hover:text-primary">
              {t.privacy}
            </a>
            <a href="/terms-of-service" className="hover:text-primary">
              {t.terms}
            </a>
            <a href="/cookie-policy" className="hover:text-primary">
              {t.cookies}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
