import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Cookie Policy | SagradaTickets',
  description:
    'How VALOR TOUR LLC uses cookies and similar technologies on SagradaTickets.com.',
}

export default function CookiePolicyPage() {
  return (
    <main className="min-h-dvh bg-background">
      <SiteHeader solid />

      <article className="pb-20 pt-28 sm:pb-28 sm:pt-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>

          <header className="mt-8 border-b border-border pb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Legal
            </p>
            <h1 className="mt-2 text-balance font-heading text-4xl font-bold text-foreground sm:text-5xl">
              Cookie Policy
            </h1>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              This page describes how VALOR TOUR LLC uses cookies and similar
              technologies on sagradatickets.com.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Last updated: June 2026
            </p>
          </header>

          <div className="mt-10 space-y-10 text-pretty leading-relaxed text-foreground/85">
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                What are cookies?
              </h2>
              <p className="mt-4">
                Cookies are small text files stored on your device when you visit a
                website. They help the site function, remember preferences, and
                understand how pages are used.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                How we use cookies
              </h2>
              <p className="mt-4">
                This Website uses strictly necessary cookies for basic operation and
                may use optional analytics or advertising cookies only after the
                visitor gives consent through the cookie banner.
              </p>
              <p className="mt-4">
                No Google advertising or analytics tags are loaded by default on this
                Website. If optional tools are added later, they will only be used
                according to the visitor consent choice.
              </p>
              <p className="mt-4">
                Visitors can reject optional cookies without losing access to the
                Website. The consent choice is stored locally in the visitor&apos;s
                browser so the banner does not need to be shown on every page view.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  <strong className="font-semibold text-foreground">
                    Essential cookies
                  </strong>{' '}
                  — required for site security, checkout, admin sessions and basic
                  functionality.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    Analytics cookies
                  </strong>{' '}
                  — used only with consent to measure visits and performance.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    Advertising cookies
                  </strong>{' '}
                  — not currently used by this Website.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Managing cookies
              </h2>
              <p className="mt-4">
                You can control cookies through your browser settings. Blocking
                essential cookies may affect booking and site functionality.
              </p>
              <p className="mt-4">
                Our cookie banner lets you accept or reject optional analytics and
                advertising cookies. We store your choice in your browser so the
                banner does not keep reappearing. Consent can be changed by clearing
                browser site data or local storage for this Website.
              </p>
              <p className="mt-4">
                For full details on how we process personal data, see our{' '}
                <Link
                  href="/privacy-policy"
                  className="font-medium text-primary hover:underline"
                >
                  Privacy &amp; Cookie Policy
                </Link>
                .
              </p>
            </section>

            <section className="rounded-3xl border border-border bg-secondary/50 p-8">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Contact
              </h2>
              <address className="mt-4 space-y-1 not-italic text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">VALOR TOUR LLC</p>
                <p>8 The Green STE B, Dover, KENT COUNTY, DE 19901, United States</p>
                <p>
                  <a
                    href="mailto:support@valortours.org"
                    className="font-medium text-primary hover:underline"
                  >
                    support@valortours.org
                  </a>
                </p>
              </address>
            </section>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  )
}
