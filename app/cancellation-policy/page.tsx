import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | SagradaTickets',
  description:
    'Cancellation, refund, and admission rules for tickets and guided experiences sold by VALOR TOUR LLC through SagradaTickets.com.',
}

export default function CancellationPolicyPage() {
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
              Refund &amp; Cancellation Policy
            </h1>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              This policy explains cancellation, refund, and admission rules for
              museum tickets, attraction tickets, and guided experiences sold by
              VALOR TOUR LLC through sagradatickets.com.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Last updated: June 2026
            </p>
          </header>

          <div className="mt-10 space-y-10 text-pretty leading-relaxed text-foreground/85">
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                1. Strict No-Refund and No-Cancellation Policy
              </h2>
              <p className="mt-4">
                By purchasing any ticket, guided tour, or service package through
                VALOR TOUR LLC (hereinafter referred to as the &ldquo;Company&rdquo;),
                the Customer explicitly acknowledges and agrees that all sales are
                final.
              </p>
              <p className="mt-4">
                Once a booking is confirmed, paid for, and processed, no refunds,
                cancellations, or voluntary modifications will be granted under any
                circumstances, including but not limited to personal schedule
                changes, travel delays, missed time slots, illness, or weather
                conditions.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                2. Nature of the Service
              </h2>
              <p className="mt-4">
                VALOR TOUR LLC operates as an independent third-party travel agency
                and ticket reseller/intermediary providing convenience services,
                including booking management, customer support, supplier coordination
                and guided tour curation.
              </p>
              <p className="mt-4">
                Entry tickets or access services included in our packages may be
                non-refundable and non-transferable under the conditions of the
                issuing authority or local supplier. Because many tickets are tied to
                a specific traveler name and strict time slot after purchase, the
                Company may be unable to recover costs from suppliers and cannot
                extend refund privileges to the Customer unless expressly stated in
                this policy.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                3. Missed Time Slots and Admission Rules
              </h2>
              <p className="mt-4">
                The Sagrada Família administration and other attraction or supplier
                authorities may enforce strict security protocols, boarding rules,
                time slots and capacity limits.
              </p>
              <p className="mt-4">
                It is the sole responsibility of the Customer to arrive at the
                designated meeting point or entrance at least 15–20 minutes prior to
                the time slot indicated on their voucher. If the Customer arrives
                late or misses the allocated time slot, the monument&apos;s security
                may deny entry. VALOR TOUR LLC shall not be held liable for missed
                entries due to customer lateness, and no refunds or re-bookings will
                be issued.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                4. Exceptional Cancellations by the Monument
              </h2>
              <p className="mt-4">
                In the rare event that an attraction authority or local supplier
                fully closes or cancels the purchased service due to scheduled
                events, strikes, safety restrictions or force majeure, VALOR TOUR
                LLC will act as a mediator. If the supplier issues a refund to our
                agency, we will process a corresponding refund to the Customer,
                minus any non-refundable operating, administrative, supplier or
                credit card processing fees.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                5. Agency Liability and Failure to Deliver Service
              </h2>
              <p className="mt-4">
                If VALOR TOUR LLC is unable to deliver the purchased tickets,
                vouchers, or guided tours due to internal operational errors,
                technical system failures, or overbooking on our part, the Customer
                shall be entitled to a full refund of the amount paid directly to
                the Website.
              </p>
              <p className="mt-4">
                The Company&apos;s liability is strictly limited to the total
                monetary amount paid by the Customer during the online transaction
                on this Website. VALOR TOUR LLC shall not be held liable for
                indirect, consequential, or collateral expenses, including but not
                limited to airline tickets, hotel accommodations, train fares,
                alternative travel arrangements, or loss of enjoyment.
              </p>
            </section>

            <section className="rounded-3xl border border-border bg-secondary/50 p-8">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Contact
              </h2>
              <p className="mt-4">
                For questions about this policy, contact{' '}
                <a
                  href="mailto:support@valortours.org"
                  className="font-medium text-primary hover:underline"
                >
                  support@valortours.org
                </a>
                .
              </p>
              <address className="mt-6 space-y-1 not-italic text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">VALOR TOUR LLC</p>
                <p>8 The Green STE B, Dover, KENT COUNTY, DE 19901, United States</p>
                <p>EIN: 30-1486586</p>
              </address>
            </section>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  )
}
