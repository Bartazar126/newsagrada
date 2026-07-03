'use client'

import { BookingWidget } from '@/components/booking-widget'
import { useHomeLocale } from '@/components/home-locale-provider'

export function BookingSection() {
  const { t } = useHomeLocale()

  return (
    <section
      id="booking"
      className="scroll-mt-20 bg-secondary/50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t.booking.sectionLabel}
          </p>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold text-foreground sm:text-4xl">
            {t.booking.title}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {t.booking.subtitle}
          </p>
        </div>

        <div className="mt-12">
          <BookingWidget />
        </div>
      </div>
    </section>
  )
}
