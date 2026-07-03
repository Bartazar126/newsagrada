'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useHomeLocale } from '@/components/home-locale-provider'

export function FaqSection() {
  const { t } = useHomeLocale()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t.faq.label}
          </p>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold text-foreground sm:text-4xl">
            {t.faq.title}
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {t.faq.faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-medium text-foreground">{faq.q}</span>
                  <Plus
                    className={`size-5 shrink-0 text-primary transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-pretty leading-relaxed text-muted-foreground">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
