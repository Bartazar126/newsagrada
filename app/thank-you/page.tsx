import Link from 'next/link'
import { Check } from 'lucide-react'
import { PurchaseConversionEvent } from '@/components/purchase-conversion-event'

type ThankYouPageProps = {
  searchParams: Promise<{
    session_id?: string
  }>
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const { session_id: sessionId } = await searchParams

  return (
    <main className="min-h-screen bg-secondary/50 px-4 py-20">
      <PurchaseConversionEvent transactionId={sessionId} />
      <section className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 text-center shadow-xl shadow-foreground/5 sm:p-12">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="size-8" />
        </div>
        <h1 className="mt-6 font-heading text-3xl font-bold text-foreground">
          Thank you for your purchase
        </h1>
        <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
          Your payment was completed successfully. We have received your booking
          and will send your ticket details by email.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Back to homepage
        </Link>
      </section>
    </main>
  )
}
