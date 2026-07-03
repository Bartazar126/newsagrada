import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Terms of Service | SagradaTickets',
  description:
    'Terms of Service for using SagradaTickets.com and purchasing tickets and tour products through VALOR TOUR LLC.',
}

export default function TermsOfServicePage() {
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
              Terms of Service
            </h1>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              These Terms of Service apply when you use sagradatickets.com or
              purchase museum tickets and tour products through VALOR TOUR LLC.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Last updated: June 2026
            </p>
          </header>

          <div className="mt-10 space-y-10 text-pretty leading-relaxed text-foreground/85">
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                1. Website Owner and Identification
              </h2>
              <p className="mt-4">
                This web portal is owned and operated by VALOR TOUR LLC, a limited
                liability company organized and existing under the laws of the State
                of Delaware, United States, with a registered Employer Identification
                Number (EIN) of 30-1486586.
              </p>
              <p className="mt-4">
                For legal and statutory purposes, the corporation&apos;s registered
                address is located at 8 The Green STE B, Dover, KENT COUNTY, DE
                19901, United States. Users may contact the company directly via the
                customer service channels provided on the Website.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                2. Purpose of the Website
              </h2>
              <p className="mt-4">
                VALOR TOUR LLC provides this Website to the public (hereinafter
                referred to as the &ldquo;User&rdquo;) solely for informational and
                commercial purposes. The information, data, materials, and services
                available on this platform (hereinafter referred to as the
                &ldquo;Contents&rdquo; or &ldquo;Services&rdquo;) are created,
                curated, and maintained directly by the company.
              </p>
              <p className="mt-4">
                Due to the dynamic nature of electronic commerce, VALOR TOUR LLC
                reserves the right to modify, amend, or update these Terms of
                Service at any time without prior notice. The User is legally bound
                by the version of the Terms in force at the exact time of their
                access. It is the User&apos;s sole responsibility to review these
                Terms periodically.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                3. Acceptable Use of Services
              </h2>
              <p className="mt-4">
                The User agrees to utilize the Website and its Services in a
                diligent, correct, and lawful manner. By accessing the Website, the
                User is strictly prohibited from engaging in the following actions:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  Utilizing the Services for any purpose that is unlawful, malicious,
                  contrary to public order, or violating generally accepted moral
                  standards.
                </li>
                <li>
                  Reproducing, copying, distributing, modifying, or publicly
                  displaying any portion of the Services without prior, express
                  written authorization from the lawful copyright or trademark owner.
                </li>
                <li>
                  Performing any act that constitutes an infringement of the
                  intellectual property, industrial property, or trade secret rights
                  belonging to VALOR TOUR LLC or any third party.
                </li>
                <li>
                  Harvesting data or using information obtained through this Website
                  to transmit unsolicited advertising, spam, direct marketing
                  communications, or mass messaging of any kind.
                </li>
              </ul>
              <p className="mt-4">
                The User shall be held personally and financially liable for any and
                all damages, losses, or expenses that VALOR TOUR LLC may incur as a
                result of the User&apos;s breach of these Terms, or any applicable
                federal, state, or international laws.
              </p>
              <p className="mt-4">
                <strong className="font-semibold text-foreground">Minors:</strong>{' '}
                Any User under the legal age of majority in their jurisdiction must
                obtain explicit consent from a parent or legal guardian prior to
                using this Website. Parents or guardians shall be held legally and
                financially responsible for any transactions, purchases, or misuse
                of the platform by such minors.
              </p>
              <p className="mt-4">
                VALOR TOUR LLC reserves the right, at its sole and absolute
                discretion, to restrict, suspend, or terminate a User&apos;s access
                to the Website immediately and without liability, in the event of
                suspected fraud, criminal activity, or conduct that violates these
                Terms or harms the brand reputation, image, or operational integrity
                of the company.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                4. Rules of Conduct
              </h2>
              <p className="mt-4">
                When interacting with VALOR TOUR LLC or its customer service
                representatives, Users must adhere to the following strict code of
                conduct:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  <strong className="font-semibold text-foreground">
                    Identity Fraud:
                  </strong>{' '}
                  No User shall impersonate any individual, corporate entity, or
                  organization. False representation may constitute a civil wrong
                  or criminal offense under applicable federal and state statutes.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    Prohibited Language:
                  </strong>{' '}
                  The use of abusive, threatening, defamatory, or offensive
                  language is strictly prohibited. VALOR TOUR LLC reserves the right
                  to remove any non-compliant content and pursue appropriate legal
                  remedies against the perpetrator.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    Unauthorized Marketing:
                  </strong>{' '}
                  Users are entirely barred from promoting, linking to, or
                  recommending competitor businesses or third-party web portals.
                  Unauthorized marketing, backlinking, or spamming will result in
                  immediate account deletion and potential reporting to data
                  protection authorities.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                5. Electronic Contracting
              </h2>
              <p className="mt-4">
                All terms governing online transactions, ticket purchases, bookings,
                or electronic contracts executed between the customer and VALOR TOUR
                LLC are strictly regulated by the General Terms and Conditions of
                Purchase listed on the designated checkout and billing sections of
                this Website.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                6. Governing Law and Jurisdiction
              </h2>
              <p className="mt-4">
                These Terms of Service, along with any disputes, controversies, or
                legal claims arising from the use of this Website, shall be governed
                by, construed, and enforced exclusively in accordance with the laws
                of the State of Delaware, United States, without regard to its
                conflict of law principles.
              </p>
              <p className="mt-4">
                In the event of any litigation or legal dispute, both parties
                explicitly agree to submit to the exclusive personal jurisdiction
                and venue of the state and federal courts located in Dover, Kent
                County, Delaware, expressly waiving any objection to such
                jurisdiction or any claim of an inconvenient forum.
              </p>

              <h3 className="mt-8 font-heading text-xl font-bold text-foreground">
                6.1. Consumer Protection
              </h3>
              <p className="mt-4">
                These Terms of Service, along with any disputes arising from the use
                of this Website, shall be governed by the laws of the State of
                Delaware, United States. Both parties agree to submit to the
                exclusive jurisdiction of the courts located in Dover, Kent County,
                Delaware.
              </p>
              <p className="mt-4">
                <strong className="font-semibold text-foreground">
                  Consumer Protection and Online Dispute Resolution (ODR):
                </strong>{' '}
                In compliance with international consumer rights regulations, the
                Company provides the following listed resources for consumer
                protection, inquiries, and dispute resolutions:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  <strong className="font-semibold text-foreground">
                    For U.S. and International Consumers (BBB):
                  </strong>{' '}
                  Any consumer may file a formal inquiry or review corporate
                  compliance through the Delaware Better Business Bureau (BBB) at{' '}
                  <a
                    href="https://www.bbb.org/local-bbb/bbb-serving-delaware"
                    className="font-medium text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    bbb.org/local-bbb/bbb-serving-delaware
                  </a>
                  .
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    For European Union (EU) Consumers (ODR Platform):
                  </strong>{' '}
                  Pursuant to Regulation (EU) No 524/2013, the European Commission
                  provides a public platform for online dispute resolution for
                  services purchased online within the EU. European consumers may
                  submit claims directly via the EU Online Dispute Resolution
                  Platform at{' '}
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    className="font-medium text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ec.europa.eu/consumers/odr
                  </a>
                  .
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    For General Federal Trade Inquiries (FTC):
                  </strong>{' '}
                  International and U.S. consumers can report fraudulent practices
                  or learn about consumer rights via the U.S. Federal Trade
                  Commission (FTC) portal at{' '}
                  <a
                    href="https://www.ftc.gov"
                    className="font-medium text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ftc.gov
                  </a>
                  .
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                7. License and Acceptable Use of the Website
              </h2>
              <p className="mt-4">
                You are granted a limited, non-exclusive, non-transferable, and
                revocable license to access and use this Website, as well as to
                print or download extracts of the Content strictly for your
                personal, private, and non-commercial use, provided that you
                strictly comply with the following rules:
              </p>

              <h3 className="mt-8 font-heading text-xl font-bold text-foreground">
                7.1. Prohibition of Fraudulent Use
              </h3>
              <p className="mt-4">
                You shall not engage in any fraudulent, malicious, or unauthorized
                use of the Website. This includes, but is not limited to, hacking,
                introducing viruses or malicious code, data mining, harvesting,
                automated scraping, or any action intended to disrupt the
                operational integrity of the platform.
              </p>

              <h3 className="mt-8 font-heading text-xl font-bold text-foreground">
                7.2. Intellectual Property Ownership
              </h3>
              <p className="mt-4">
                Unless otherwise explicitly stated, the copyright, trademarks, trade
                secrets, and all other intellectual and industrial property rights
                in this Website and the entire content published on it (including
                but not limited to text, software, source code, photographs, logos,
                and graphic images) are owned exclusively by VALOR TOUR LLC. These
                works are protected by federal United States copyright laws, state
                regulations, and international intellectual property treaties
                worldwide. All rights are strictly reserved. Any unauthorized
                reproduction or distribution is legally actionable.
              </p>

              <h3 className="mt-8 font-heading text-xl font-bold text-foreground">
                7.3. Alteration of Materials
              </h3>
              <p className="mt-4">
                You are strictly prohibited from modifying, altering, or adapting
                the digital or physical copies of any Content you print or download.
                Furthermore, you may not use any drawings, photographs, graphics,
                video, or audio sequences independently from their accompanying text
                or without the express written consent of VALOR TOUR LLC.
              </p>
            </section>

            <section className="rounded-3xl border border-primary/20 bg-secondary/80 p-8">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Important Notice
              </h2>
              <p className="mt-4">
                <strong className="font-semibold text-foreground">
                  SagradaTickets.com
                </strong>{' '}
                is owned and operated exclusively by VALOR TOUR LLC, a registered
                limited liability company organized under the laws of the State of
                Delaware, United States (EIN: 30-1486586).
              </p>
              <p className="mt-4">
                We are not the primary ticket office, nor are we directly affiliated
                with the primary administration of the Sagrada Família, the Sagrada
                administration or any attraction authority. VALOR TOUR LLC is an
                independent, specialized travel service and ticket
                reseller/intermediary dedicated to curating cultural experiences and
                comprehensive ticket packages.
              </p>
              <p className="mt-4">
                Prices displayed on this Website may be higher than the face value
                offered by a primary provider. Our package prices can include entry
                or access costs where applicable, booking management, customer
                support, supplier coordination, payment processing and other service
                components. The total price is shown before payment information is
                submitted.
              </p>
              <p className="mt-4">
                Full refund and cancellation rules are available in our{' '}
                <Link
                  href="/cancellation-policy"
                  className="font-medium text-primary hover:underline"
                >
                  Refund &amp; Cancellation Policy
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  )
}
