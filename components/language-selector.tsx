'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Globe } from 'lucide-react'
import { HOME_LOCALES, type HomeLocale } from '@/lib/i18n/home'
import { useHomeLocale } from '@/components/home-locale-provider'

type LanguageSelectorProps = {
  variant?: 'light' | 'dark'
  className?: string
}

export function LanguageSelector({
  variant = 'light',
  className = '',
}: LanguageSelectorProps) {
  const { locale, setLocale } = useHomeLocale()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const isLight = variant === 'light'
  const current = HOME_LOCALES.find((item) => item.code === locale) ?? HOME_LOCALES[0]

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const selectLocale = (code: HomeLocale) => {
    setLocale(code)
    setOpen(false)
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className={`inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-sm font-medium transition-colors sm:gap-2 sm:px-3 ${
          isLight
            ? 'border-border/70 bg-background/90 text-foreground backdrop-blur'
            : 'border-background/25 bg-background/10 text-background backdrop-blur'
        }`}
      >
        <Globe className="size-4 shrink-0 opacity-80" aria-hidden="true" />
        <span className="hidden min-w-0 truncate sm:inline">{current.label}</span>
        <span className="min-w-0 truncate uppercase sm:hidden">{current.code}</span>
        <ChevronDown
          className={`size-4 shrink-0 opacity-70 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-[60] min-w-[11rem] overflow-hidden rounded-xl border border-border bg-popover py-1 shadow-lg"
        >
          {HOME_LOCALES.map((item) => {
            const active = item.code === locale
            return (
              <li key={item.code} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => selectLocale(item.code)}
                  className={`flex w-full items-center justify-between gap-3 whitespace-nowrap px-3 py-2.5 text-left text-sm transition-colors ${
                    active
                      ? 'bg-primary/10 font-medium text-popover-foreground'
                      : 'text-popover-foreground hover:bg-secondary'
                  }`}
                >
                  <span>{item.label}</span>
                  {active ? (
                    <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
