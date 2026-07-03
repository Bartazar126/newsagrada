'use client'

import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { selectTicketAndScrollToBooking } from '@/components/footer-booking-link'
import { useHomeLocale } from '@/components/home-locale-provider'
import { useTicketTiers } from '@/components/use-ticket-tiers'
import type { TicketTierId } from '@/lib/i18n/home'

export function TicketsSection() {
  const { t } = useHomeLocale()
  const ticketTiers = useTicketTiers()

  const selectTicket = (id: string) => {
    selectTicketAndScrollToBooking(id)
  }

  return (
    <section id="tickets" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t.tickets.sectionLabel}
          </p>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold text-foreground sm:text-4xl">
            {t.tickets.title}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {t.tickets.subtitle}
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {ticketTiers.map((tier) => {
            const copy = t.tickets.tiers[tier.id as TicketTierId]
            return (
              <div
                key={tier.id}
                className={`group relative flex flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
                  tier.popular
                    ? 'border-primary bg-card shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20'
                    : 'border-border bg-card shadow-sm hover:border-primary hover:shadow-xl hover:shadow-primary/10'
                }`}
              >
                {copy.badge && (
                  <span
                    className={`absolute -top-3 left-7 rounded-full px-3 py-1 text-xs font-semibold ${
                      tier.popular
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent text-accent-foreground'
                    }`}
                  >
                    {copy.badge}
                  </span>
                )}

                <h3 className="font-heading text-xl font-bold text-foreground">
                  {copy.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{copy.tagline}</p>

                <div className="mt-5 flex items-end gap-2">
                  <span className="font-heading text-4xl font-bold text-foreground">
                    {tier.price} €
                  </span>
                  {tier.oldPrice && (
                    <span className="mb-1 text-sm text-muted-foreground line-through">
                      {tier.oldPrice} €
                    </span>
                  )}
                  <span className="mb-1.5 text-sm text-muted-foreground">
                    {t.tickets.perPerson}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{copy.duration}</p>

                <ul className="mt-6 flex-1 space-y-3">
                  {copy.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm text-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => selectTicket(tier.id)}
                  variant={tier.popular ? 'default' : 'secondary'}
                  className={
                    tier.popular
                      ? 'mt-7 w-full rounded-full transition-colors hover:!bg-primary hover:!text-primary-foreground group-hover:!bg-primary group-hover:!text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/30'
                      : 'mt-7 w-full rounded-full transition-colors group-hover:!bg-primary group-hover:!text-primary-foreground hover:!bg-primary hover:!text-primary-foreground'
                  }
                  size="lg"
                >
                  {t.tickets.bookFrom.replace('{price}', String(tier.price))}
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
