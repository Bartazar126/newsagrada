'use client'

import { Sparkles } from 'lucide-react'
import { useHomeLocale } from '@/components/home-locale-provider'

export function ExperienceSection() {
  const { t } = useHomeLocale()

  return (
    <section id="experience" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <img
                src="/images/interior.png"
                alt={t.experience.imageAlts[0]}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden w-48 overflow-hidden rounded-2xl border-4 border-background shadow-xl sm:block">
              <img
                src="/images/stained-glass.png"
                alt={t.experience.imageAlts[1]}
                className="aspect-square w-full object-cover"
              />
            </div>
          </div>

          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="size-4" />
              {t.experience.label}
            </p>
            <h2 className="mt-3 text-balance font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              {t.experience.title}
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              {t.experience.body}
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-6">
              {t.experience.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-heading text-3xl font-bold text-primary">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
