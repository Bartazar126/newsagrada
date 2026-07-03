'use client'

import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SiteLogo } from '@/components/site-logo'
import { LanguageSelector } from '@/components/language-selector'
import { useHomeLocaleOptional } from '@/components/home-locale-provider'
import { scrollToSection } from '@/components/footer-booking-link'
import { getHomeCopy } from '@/lib/i18n/home'

const defaultNav = [
  { label: 'Tickets', href: '/#tickets' },
  { label: 'Tours', href: '/#tours' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/#faq' },
]

export function SiteHeader({
  solid = false,
  localized = false,
}: {
  solid?: boolean
  localized?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [scrolledState, setScrolledState] = useState(false)
  const scrolled = solid || scrolledState
  const homeLocale = useHomeLocaleOptional()
  const t = localized && homeLocale ? homeLocale.t : getHomeCopy('en')

  const navLinks = localized
    ? [
        { label: t.header.nav.tickets, href: '/#tickets' },
        { label: t.header.nav.tours, href: '/#tours' },
        { label: t.header.nav.experience, href: '/#experience' },
        { label: t.header.nav.blog, href: '/blog' },
        { label: t.header.nav.faq, href: '/#faq' },
      ]
    : defaultNav

  useEffect(() => {
    const onScroll = () => setScrolledState(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const showLanguageSelector = localized && homeLocale
  const handleBookingClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setOpen(false)
    scrollToSection('booking')
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-border/60 bg-background/90 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a href="/" aria-label={t.header.homepageAria}>
          <SiteLogo
            textClassName={scrolled ? 'text-foreground' : 'text-background'}
          />
        </a>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-opacity hover:opacity-70 ${
                scrolled ? 'text-foreground' : 'text-background'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex lg:gap-3">
          {showLanguageSelector ? (
            <LanguageSelector variant={scrolled ? 'light' : 'dark'} />
          ) : null}
          <Button
            render={<a href="/#booking" onClick={handleBookingClick} />}
            nativeButton={false}
            size="sm"
            className="rounded-full px-5"
          >
            {t.header.bookTicket}
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {showLanguageSelector ? (
            <LanguageSelector variant={scrolled || open ? 'light' : 'dark'} />
          ) : null}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.header.closeMenu : t.header.openMenu}
            className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
              scrolled || open
                ? 'bg-secondary text-foreground'
                : 'bg-background/20 text-background backdrop-blur'
            }`}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-secondary"
              >
                {link.label}
              </a>
            ))}
            <Button
              render={<a href="/#booking" onClick={handleBookingClick} />}
              nativeButton={false}
              className="mt-2 rounded-full"
            >
              {t.header.bookTicket}
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
