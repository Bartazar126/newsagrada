import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Privacy & Cookie Policy | SagradaTickets',
  description:
    'How VALOR TOUR LLC collects, uses, and protects personal data when you browse SagradaTickets.com or book tickets and tours.',
}

export default function PrivacyPolicyPage() {
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
              Privacy &amp; Cookie Policy
            </h1>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              This policy explains how VALOR TOUR LLC collects, uses, and protects
              personal data when you browse sagradatickets.com or book museum tickets
              and tours.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Last updated: June 2026
            </p>
          </header>

          <div className="mt-10 space-y-10 text-pretty leading-relaxed text-foreground/85">
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                1. Data Controller
              </h2>
              <p className="mt-4">
                In compliance with international data protection regulations,
                including the European General Data Protection Regulation (GDPR)
                (EU) 2016/679 and applicable United States federal and state privacy
                statutes, the entity responsible for the collection, processing, and
                protection of your personal data is VALOR TOUR LLC.
              </p>
              <dl className="mt-6 space-y-2 text-sm">
                <div>
                  <dt className="font-semibold text-foreground">Company Name</dt>
                  <dd>VALOR TOUR LLC</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">
                    Form of Incorporation
                  </dt>
                  <dd>
                    Limited Liability Company organized under the laws of the State
                    of Delaware, USA
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">
                    Employer Identification Number (EIN)
                  </dt>
                  <dd>30-1486586</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">
                    Registered Address
                  </dt>
                  <dd>
                    8 The Green STE B, Dover, KENT COUNTY, DE 19901, United States
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Contact E-mail</dt>
                  <dd>
                    <a
                      href="mailto:support@valortours.org"
                      className="font-medium text-primary hover:underline"
                    >
                      support@valortours.org
                    </a>
                  </dd>
                </div>
              </dl>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                2. Purpose and Legal Basis
              </h2>
              <p className="mt-4">
                VALOR TOUR LLC collects and processes personal data provided
                consciously and via explicit consent by users and clients during the
                booking, registration, or purchase process.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  <strong className="font-semibold text-foreground">
                    Service Execution:
                  </strong>{' '}
                  To process, manage, and secure online ticket bookings, guided
                  tours, and cultural experiences for the Sagrada Família and related
                  Barcelona attractions.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    Payment Processing:
                  </strong>{' '}
                  To securely facilitate credit card and electronic transactions
                  through certified third-party payment gateways such as Stripe.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    Customer Support:
                  </strong>{' '}
                  To contact users regarding updates, scheduling changes, or
                  cancellations related to purchased services.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    Marketing and Retargeting:
                  </strong>{' '}
                  Based on explicit consent, data tracking tools including optional
                  analytics tools may be used only if added later and accepted by the
                  visitor.
                </li>
              </ul>
            </section>

            <section id="cookies">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                3. Cookies
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
                    Essential cookies:
                  </strong>{' '}
                  required for site security, checkout, admin sessions and basic
                  functionality.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    Analytics cookies:
                  </strong>{' '}
                  used only with consent to measure visits and performance.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    Advertising cookies:
                  </strong>{' '}
                  not currently used by this Website.
                </li>
              </ul>
              <p className="mt-4">
                Consent can be changed by clearing browser site data or local storage
                for this Website.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                4. Data Retention
              </h2>
              <p className="mt-4">
                The personal data provided will be stored and maintained for the
                duration of the binding contractual relationship, or until the User
                explicitly requests its deletion. Following the termination of the
                service, data may be archived for the minimum period required by
                applicable international fiscal, tax, and administrative laws.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                5. Third-Party Data Sharing and Transfers
              </h2>
              <p className="mt-4">
                VALOR TOUR LLC will not disclose, sell, or lease personal information
                to unauthorized third parties. Data will only be shared with trusted
                partner companies, booking software systems, local service operators,
                and payment processors strictly when necessary to ensure proper
                execution of the contracted services. All such partners are
                contractually bound to maintain strict confidentiality and adhere to
                equivalent data protection standards.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                6. Your Rights and How to Exercise Them
              </h2>
              <p className="mt-4">
                Pursuant to the GDPR and international data privacy frameworks, every
                client and user has rights regarding personal data.
              </p>
              <p className="mt-4">
                To exercise any of these rights, the interested party may contact the
                legal compliance team directly via email at{' '}
                <a
                  href="mailto:support@valortours.org"
                  className="font-medium text-primary hover:underline"
                >
                  support@valortours.org
                </a>
                . We will respond to valid inquiries within the legally required
                timeframes.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  <strong className="font-semibold text-foreground">
                    Right of Access:
                  </strong>{' '}
                  You have the right to know what personal data we hold and how it is
                  processed.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    Right to Rectification or Deletion:
                  </strong>{' '}
                  You may request correction of inaccurate data or deletion when
                  records are no longer necessary.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    Right to Restriction of Processing:
                  </strong>{' '}
                  You may request temporary limits on processing under specific legal
                  circumstances.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    Right to Data Portability:
                  </strong>{' '}
                  You have the right to receive personal data in a structured,
                  commonly used, machine-readable format.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    Right to Object:
                  </strong>{' '}
                  You may object to marketing communications or processing based on
                  legitimate interest at any time.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                7. Intellectual Property and Content Protection
              </h2>
              <p className="mt-4">
                The entire content of this website, including but not limited to
                source code, user interface, web design, text, databases, logos,
                photographs, graphics, and audio/video sequences, is the exclusive
                intellectual property of VALOR TOUR LLC. All rights are reserved
                globally under United States copyright laws and international
                treaties. Any unauthorized copying, data mining, automated scraping,
                reproduction, or distribution of these materials without explicit
                written consent is strictly prohibited and may result in legal action.
              </p>
            </section>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  )
}
