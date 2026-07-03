import type { HomeCopy, HomeLocale } from './types'
import { en } from './en'
import { es } from './es'
import { fr } from './fr'
import { de } from './de'
import { it } from './it'

export type { HomeCopy, HomeLocale, TicketTierId, TourId } from './types'

export const defaultLocale: HomeLocale = 'en'

export const HOME_LOCALES: { code: HomeLocale; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
]

const copies: Record<HomeLocale, HomeCopy> = {
  en,
  es,
  fr,
  de,
  it,
}

export function getHomeCopy(locale: HomeLocale): HomeCopy {
  return copies[locale] ?? copies[defaultLocale]
}

export function isHomeLocale(value: string): value is HomeLocale {
  return value in copies
}

export { en, es, fr, de, it }
