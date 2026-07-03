'use client'

import { useEffect } from 'react'
import { ShieldCheck, Zap, Smartphone, Headset } from 'lucide-react'
import { HomeLocaleProvider } from '@/components/home-locale-provider'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { TicketsSection } from '@/components/tickets-section'
import { ExperienceSection } from '@/components/experience-section'
import { ToursSection } from '@/components/tours-section'
import { BookingSection } from '@/components/booking-section'
import { BlogSection } from '@/components/blog-section'
import { FaqSection } from '@/components/faq-section'
import { SiteFooter } from '@/components/site-footer'
import { useHomeLocale } from '@/components/home-locale-provider'
import { scrollToHashSection } from '@/components/footer-booking-link'

const trustIcons = [Zap, Smartphone, ShieldCheck, Headset] as const

function HomeTrustBar() {
  const { t } = useHomeLocale()

  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
        {t.trust.items.map((item, index) => {
          const Icon = trustIcons[index]
          return (
            <div key={item.title} className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {item.title}
                </div>
                <div className="text-xs text-muted-foreground">{item.desc}</div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function HomePageContent() {
  useEffect(() => {
    scrollToHashSection()
  }, [])

  return (
    <main className="bg-background">
      <SiteHeader localized />
      <Hero />
      <HomeTrustBar />
      <TicketsSection />
      <ExperienceSection />
      <ToursSection />
      <BookingSection />
      <BlogSection />
      <FaqSection />
      <SiteFooter localized />
    </main>
  )
}

export function HomePage() {
  return (
    <HomeLocaleProvider>
      <HomePageContent />
    </HomeLocaleProvider>
  )
}
