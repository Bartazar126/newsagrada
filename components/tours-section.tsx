'use client'

import { Clock, Users, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useHomeLocale } from '@/components/home-locale-provider'
import { scrollToSection } from '@/components/footer-booking-link'
import { tours } from '@/lib/tickets-data'
import type { TourId } from '@/lib/i18n/home'

export function ToursSection() {
  const { t } = useHomeLocale()

  return (
    <section id="tours" className="bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t.tours.sectionLabel}
          </p>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold text-foreground sm:text-4xl">
            {t.tours.title}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {t.tours.subtitle}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => {
            const copy = t.tours.tours[tour.id as TourId]
            return (
              <article
                key={tour.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={tour.image || '/placeholder.svg'}
                    alt={copy.name}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-sm font-semibold text-foreground backdrop-blur">
                    {t.tours.fromPrice.replace('{price}', String(tour.price))}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {copy.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {copy.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5 text-primary" />
                      {copy.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="size-3.5 text-primary" />
                      {copy.groupSize}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Globe className="size-3.5 text-primary" />
                      {tour.languages.join(', ')}
                    </span>
                  </div>

                  <Button
                    render={
                      <a
                        href="#booking"
                        onClick={(event) => {
                          event.preventDefault()
                          scrollToSection('booking')
                        }}
                      />
                    }
                    nativeButton={false}
                    variant="secondary"
                    className="mt-6 w-full rounded-full transition-colors group-hover:!bg-primary group-hover:!text-primary-foreground hover:!bg-primary hover:!text-primary-foreground"
                  >
                    {t.tours.chooseTime}
                  </Button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
