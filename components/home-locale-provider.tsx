'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  defaultLocale,
  getHomeCopy,
  isHomeLocale,
  type HomeCopy,
  type HomeLocale,
} from '@/lib/i18n/home'

const STORAGE_KEY = 'sagrada-home-locale'

type HomeLocaleContextValue = {
  locale: HomeLocale
  setLocale: (locale: HomeLocale) => void
  t: HomeCopy
}

const HomeLocaleContext = createContext<HomeLocaleContextValue | null>(null)

export function HomeLocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<HomeLocale>(defaultLocale)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && isHomeLocale(stored)) {
      setLocaleState(stored)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = (next: HomeLocale) => {
    setLocaleState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: getHomeCopy(locale),
    }),
    [locale],
  )

  return (
    <HomeLocaleContext.Provider value={value}>
      {children}
    </HomeLocaleContext.Provider>
  )
}

export function useHomeLocale() {
  const ctx = useContext(HomeLocaleContext)
  if (!ctx) {
    throw new Error('useHomeLocale must be used within HomeLocaleProvider')
  }
  return ctx
}

export function useHomeLocaleOptional() {
  return useContext(HomeLocaleContext)
}

export function formatGuestSummary(
  locale: HomeLocale,
  adults: number,
  children: number,
): string {
  const plural = (count: number, one: string, many: string) =>
    count === 1 ? one.replace('{count}', String(count)) : many.replace('{count}', String(count))

  const templates: Record<
    HomeLocale,
    (a: number, c: number) => string
  > = {
    en: (a, c) =>
      `${plural(a, '{count} adult', '{count} adults')}${c ? `, ${plural(c, '{count} child', '{count} children')}` : ''}`,
    es: (a, c) =>
      `${plural(a, '{count} adulto', '{count} adultos')}${c ? `, ${plural(c, '{count} niño', '{count} niños')}` : ''}`,
    fr: (a, c) =>
      `${plural(a, '{count} adulte', '{count} adultes')}${c ? `, ${plural(c, '{count} enfant', '{count} enfants')}` : ''}`,
    de: (a, c) =>
      `${plural(a, '{count} Erwachsener', '{count} Erwachsene')}${c ? `, ${plural(c, '{count} Kind', '{count} Kinder')}` : ''}`,
    it: (a, c) =>
      `${plural(a, '{count} adulto', '{count} adulti')}${c ? `, ${plural(c, '{count} bambino', '{count} bambini')}` : ''}`,
  }

  return templates[locale](adults, children)
}
