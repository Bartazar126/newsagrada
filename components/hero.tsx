'use client'

import { ShieldCheck, Zap, CalendarCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useHomeLocale } from '@/components/home-locale-provider'
import { scrollToSection } from '@/components/footer-booking-link'

const highlightIcons = [Zap, CalendarCheck, ShieldCheck] as const

export function Hero() {
  const { t } = useHomeLocale()

  return (
    <section id="top" className="relative min-h-[92vh] w-full overflow-hidden">
      <img
        src="/images/hero-sagrada.png"
        alt={t.hero.imageAlt}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/40 to-foreground/80" />

      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-background/25 bg-background/10 px-3 py-1.5 text-sm text-background backdrop-blur">
            <span className="flex size-2 rounded-full bg-accent" />
            <span className="font-medium">{t.hero.badge}</span>
          </div>

          <h1 className="text-balance font-heading text-4xl font-bold leading-[1.05] text-background sm:text-5xl lg:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-background/85">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
              size="lg"
              className="rounded-full px-8 text-base shadow-lg shadow-primary/30"
            >
              {t.hero.ctaStart}
            </Button>
            <Button
              render={
                <a
                  href="#tickets"
                  onClick={(event) => {
                    event.preventDefault()
                    scrollToSection('tickets')
                  }}
                />
              }
              nativeButton={false}
              size="lg"
              variant="secondary"
              className="rounded-full border border-background/30 bg-background/10 px-8 text-base text-background backdrop-blur hover:bg-background/20"
            >
              {t.hero.ctaTickets}
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {t.hero.highlights.map((label, index) => {
              const Icon = highlightIcons[index]
              return (
                <div
                  key={label}
                  className="flex items-center gap-2 text-sm font-medium text-background/90"
                >
                  <Icon className="size-4 text-accent" />
                  {label}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
