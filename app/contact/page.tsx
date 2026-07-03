import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ContactDetails, ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Contact | SagradaTickets',
  description:
    'Get in touch with SagradaTickets customer support for booking help, tickets, and guided tour questions.',
}

export default function ContactPage() {
  return (
    <main className="min-h-dvh bg-background">
      <SiteHeader solid />

      <section className="pb-20 pt-28 sm:pb-28 sm:pt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>

          <header className="mt-8 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Contact
            </p>
            <h1 className="mt-2 text-balance font-heading text-4xl font-bold text-foreground sm:text-5xl">
              We&apos;re here to help
            </h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Questions about tickets, tours, or your booking? Send us a message and
              we&apos;ll get back to you as soon as we can.
            </p>
          </header>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <ContactForm />
            <ContactDetails />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
