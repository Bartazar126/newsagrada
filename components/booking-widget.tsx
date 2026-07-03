'use client'

import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import {
  Check,
  Clock,
  Minus,
  Plus,
  CalendarDays,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BookingCalendar } from '@/components/booking-calendar'
import { consumePendingTicketId } from '@/components/footer-booking-link'
import {
  formatGuestSummary,
  useHomeLocale,
} from '@/components/home-locale-provider'
import { useTicketTiers } from '@/components/use-ticket-tiers'
import { timeSlots } from '@/lib/tickets-data'
import type { TicketTierId } from '@/lib/i18n/home'

const CHILD_DISCOUNT = 0.4 // 40% child ticket discount

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type AvailabilityClosure = {
  closure_date: string
  closure_time: string | null
}

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      parameters?: Record<string, string | number>,
    ) => void
  }
}

function isValidEmail(value: string) {
  return EMAIL_RE.test(value.trim())
}

function isValidPhone(value: string) {
  return value.replace(/\D/g, '').length >= 8
}

function formatDate(d: Date, monthNames: readonly string[]) {
  return `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

function formatDateForApi(d: Date) {
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')

  return `${d.getFullYear()}-${month}-${day}`
}

function replaceTokens(
  template: string,
  tokens: Record<string, string | number>,
) {
  return Object.entries(tokens).reduce(
    (result, [key, value]) => result.replace(`{${key}}`, String(value)),
    template,
  )
}

function isMobileBookingLayout() {
  return window.matchMedia('(max-width: 1023px)').matches
}

function scrollToBookingStep(element: HTMLElement | null) {
  if (!element || !isMobileBookingLayout()) return

  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function trackPurchaseConversion(total: number, orderNumber: string) {
  window.gtag?.('event', 'ads_conversion_PURCHASE_1', {
    value: total,
    currency: 'EUR',
    transaction_id: orderNumber,
  })
}

export function BookingWidget() {
  const { locale, t } = useHomeLocale()
  const b = t.booking
  const ticketTiers = useTicketTiers()

  const step2Ref = useRef<HTMLDivElement>(null)
  const step3Ref = useRef<HTMLDivElement>(null)
  const step4Ref = useRef<HTMLDivElement>(null)

  const [ticketId, setTicketId] = useState('towers')
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [closures, setClosures] = useState<AvailabilityClosure[]>([])
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false)

  const handleTicketSelect = (id: string) => {
    setTicketId(id)
    setConfirmed(false)
    requestAnimationFrame(() => scrollToBookingStep(step2Ref.current))
  }

  const handleTimeSelect = (slot: string) => {
    setTime(slot)
    requestAnimationFrame(() => scrollToBookingStep(step3Ref.current))
  }

  const handleContinueToDetails = () => {
    scrollToBookingStep(step4Ref.current)
  }

  // Allow ticket cards elsewhere on the page to preselect a tier.
  useEffect(() => {
    const pending = consumePendingTicketId()
    if (pending && ticketTiers.some((t) => t.id === pending)) {
      setTicketId(pending)
      setConfirmed(false)
      requestAnimationFrame(() => scrollToBookingStep(step2Ref.current))
    }

    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail
      if (ticketTiers.some((t) => t.id === id)) {
        setTicketId(id)
        setConfirmed(false)
        requestAnimationFrame(() => scrollToBookingStep(step2Ref.current))
      }
    }
    window.addEventListener('select-ticket', handler)
    return () => window.removeEventListener('select-ticket', handler)
  }, [ticketTiers])

  const ticket = useMemo(
    () => ticketTiers.find((t) => t.id === ticketId) ?? ticketTiers[0],
    [ticketId],
  )

  const ticketCopy = t.tickets.tiers[ticket.id as TicketTierId]

  const adultTotal = adults * ticket.price
  const childPrice = Math.round(ticket.price * (1 - CHILD_DISCOUNT))
  const childTotal = children * childPrice
  const serviceFee = adults + children > 0 ? 2 : 0
  const total = adultTotal + childTotal + serviceFee
  const selectedDateKey = date ? formatDateForApi(date) : ''
  const selectedFullDayClosed = useMemo(
    () =>
      closures.some(
        (closure) =>
          closure.closure_date === selectedDateKey &&
          closure.closure_time === null,
      ),
    [closures, selectedDateKey],
  )
  const fullDayClosedDates = useMemo(
    () =>
      new Set(
        closures
          .filter((closure) => closure.closure_time === null)
          .map((closure) => closure.closure_date),
      ),
    [closures],
  )
  const partiallyClosedDates = useMemo(
    () =>
      new Set(
        closures
          .filter(
            (closure) =>
              closure.closure_time !== null &&
              !fullDayClosedDates.has(closure.closure_date),
          )
          .map((closure) => closure.closure_date),
      ),
    [closures, fullDayClosedDates],
  )
  const closedTimes = useMemo(
    () =>
      new Set(
        closures
          .filter((closure) => closure.closure_date === selectedDateKey)
          .map((closure) => closure.closure_time)
          .filter((value): value is string => Boolean(value)),
      ),
    [closures, selectedDateKey],
  )

  const normalizedEmail = email.trim().toLowerCase()
  const normalizedConfirmEmail = confirmEmail.trim().toLowerCase()
  const emailValid = isValidEmail(email)
  const confirmEmailValid = isValidEmail(confirmEmail)
  const emailsMatch =
    emailValid &&
    confirmEmailValid &&
    normalizedEmail === normalizedConfirmEmail

  const confirmEmailMismatch =
    confirmEmail.length > 0 && normalizedEmail !== normalizedConfirmEmail
      ? b.errors.emailMismatch
      : undefined

  const canConfirm =
    !!date &&
    !!time &&
    adults >= 1 &&
    emailValid &&
    confirmEmailValid &&
    emailsMatch &&
    name.trim().length >= 2 &&
    isValidPhone(phone) &&
    !selectedFullDayClosed &&
    !closedTimes.has(time)

  useEffect(() => {
    let cancelled = false

    async function loadAvailability() {
      setIsLoadingAvailability(true)
      setClosures([])

      try {
        const response = await fetch(
          `/api/availability?productSlug=${encodeURIComponent(ticketId)}`,
          { cache: 'no-store' },
        )
        const result = (await response.json()) as {
          closures?: AvailabilityClosure[]
        }

        if (!cancelled) {
          setClosures(result.closures ?? [])
        }
      } catch {
        if (!cancelled) {
          setClosures([])
        }
      } finally {
        if (!cancelled) {
          setIsLoadingAvailability(false)
        }
      }
    }

    loadAvailability()
    window.addEventListener('focus', loadAvailability)

    return () => {
      cancelled = true
      window.removeEventListener('focus', loadAvailability)
    }
  }, [ticketId])

  useEffect(() => {
    if (selectedFullDayClosed) {
      setTime(null)
      return
    }

    if (time && closedTimes.has(time)) {
      setTime(null)
    }
  }, [closedTimes, selectedFullDayClosed, time])

  const handleConfirm = async () => {
    if (!canConfirm || !date || !time || isSubmitting) return

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productSlug: ticket.id,
          visitDate: formatDateForApi(date),
          visitTime: time,
          adults,
          children,
          language: locale,
          fullName: name,
          email,
          phone,
          sourcePath: window.location.pathname,
        }),
      })
      const result = (await response.json()) as {
        orderNumber?: string
        checkoutUrl?: string
        message?: string
      }

      if (!response.ok) {
        throw new Error(result.message ?? 'Could not save your booking.')
      }

      const nextOrderNumber = result.orderNumber ?? ''
      setOrderNumber(nextOrderNumber)

      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl
        return
      }

      trackPurchaseConversion(total, nextOrderNumber)
      setConfirmed(true)
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Could not save your booking. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (confirmed) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-xl shadow-foreground/5 sm:p-12">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="size-8" />
        </div>
        <h3 className="mt-6 font-heading text-2xl font-bold text-foreground">
          {b.confirmed.title}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
          {replaceTokens(b.confirmed.body, {
            firstName: name.split(' ')[0],
            email,
            date: date ? formatDate(date, b.monthNames) : '',
            time: time ?? '',
          })}
        </p>
        <div className="mx-auto mt-6 grid max-w-sm gap-2 rounded-2xl bg-secondary p-4 text-left text-sm">
          {orderNumber ? (
            <SummaryRow label="Order number" value={orderNumber} />
          ) : null}
          <SummaryRow label={b.summary.ticketType} value={ticketCopy.name} />
          <SummaryRow
            label={b.summary.guests}
            value={formatGuestSummary(locale, adults, children)}
          />
          <SummaryRow label={b.summary.amountPaid} value={`${total} €`} />
        </div>
        <Button
          className="mt-8 rounded-full px-8"
          onClick={() => {
            setConfirmed(false)
            setDate(null)
            setTime(null)
            setConfirmEmail('')
            setPhone('')
            setOrderNumber('')
            setSubmitError('')
          }}
        >
          {b.confirmed.newBooking}
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      {/* Left: steps */}
      <div className="space-y-6">
        {/* Step 1 - ticket */}
        <StepCard step={1} title={b.steps.ticket}>
          <div className="grid gap-3 sm:grid-cols-3">
            {ticketTiers.map((tier) => {
              const copy = t.tickets.tiers[tier.id as TicketTierId]
              const active = tier.id === ticketId
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => handleTicketSelect(tier.id)}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    active
                      ? 'border-primary bg-primary/5 ring-1 ring-primary'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {copy.badge && (
                    <span className="mb-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                      {copy.badge}
                    </span>
                  )}
                  <div className="font-heading text-sm font-semibold text-foreground">
                    {copy.name}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {copy.duration}
                  </div>
                  <div className="mt-3 text-lg font-bold text-foreground">
                    {tier.price} €
                    <span className="text-xs font-normal text-muted-foreground">
                      {' '}
                      {b.perPerson}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </StepCard>

        {/* Step 2 - date & time */}
        <StepCard ref={step2Ref} step={2} title={b.steps.dateTime}>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border p-4">
              <BookingCalendar
                selected={date}
                isDateDisabled={(d) => fullDayClosedDates.has(formatDateForApi(d))}
                getDateAvailabilityStatus={(d) => {
                  const dateKey = formatDateForApi(d)

                  if (fullDayClosedDates.has(dateKey)) return 'closed'
                  if (partiallyClosedDates.has(dateKey)) return 'limited'

                  return undefined
                }}
                onSelect={(d) => {
                  setDate(d)
                  setTime(null)
                }}
                monthNames={b.monthNames}
                weekdayNames={b.weekdayNames}
                previousMonthAria={b.calendar.previousMonth}
                nextMonthAria={b.calendar.nextMonth}
              />
            </div>
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                <Clock className="size-4 text-primary" />
                {isLoadingAvailability
                  ? 'Loading availability...'
                  : date
                    ? b.availableTimeSlots
                    : b.selectDateFirst}
              </div>
              {date && selectedFullDayClosed ? (
                <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-destructive/30 bg-destructive/10 px-4 text-center text-sm font-medium text-destructive">
                  This day is closed. Please select another date.
                </div>
              ) : date ? (
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => {
                    const active = slot === time
                    const closed = closedTimes.has(slot)
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={closed}
                        onClick={() => {
                          if (!closed) handleTimeSelect(slot)
                        }}
                        className={`rounded-lg border py-2 text-sm font-medium transition-colors ${
                          closed
                            ? 'cursor-not-allowed border-border bg-secondary text-muted-foreground line-through opacity-50'
                            : active
                              ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border text-foreground hover:border-primary/50'
                        }`}
                      >
                        {slot}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-border text-sm text-muted-foreground">
                  <CalendarDays className="mr-2 size-4" />
                  {b.selectDateOnCalendar}
                </div>
              )}
            </div>
          </div>
        </StepCard>

        {/* Step 3 - guests */}
        <StepCard ref={step3Ref} step={3} title={b.steps.guests}>
          <div className="space-y-3">
            <Counter
              label={b.guestTypes.adult.label}
              hint={b.guestTypes.adult.hint}
              value={adults}
              min={1}
              onChange={setAdults}
              price={`${ticket.price} €`}
              decreaseAria={replaceTokens(b.decreaseAria, {
                label: b.guestTypes.adult.label,
              })}
              increaseAria={replaceTokens(b.increaseAria, {
                label: b.guestTypes.adult.label,
              })}
            />
            <Counter
              label={b.guestTypes.child.label}
              hint={replaceTokens(b.guestTypes.child.hint, {
                price: childPrice,
              })}
              value={children}
              min={0}
              onChange={setChildren}
              price={`${childPrice} €`}
              decreaseAria={replaceTokens(b.decreaseAria, {
                label: b.guestTypes.child.label,
              })}
              increaseAria={replaceTokens(b.increaseAria, {
                label: b.guestTypes.child.label,
              })}
            />
          </div>
          <button
            type="button"
            onClick={handleContinueToDetails}
            className="mt-4 w-full rounded-full border border-primary bg-primary/5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10 lg:hidden"
          >
            {b.continue}
          </button>
        </StepCard>

        {/* Step 4 - contact */}
        <StepCard ref={step4Ref} step={4} title={b.steps.details}>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label={b.fields.fullName}
              value={name}
              onChange={setName}
              placeholder={b.placeholders.fullName}
              type="text"
              className="sm:col-span-2"
            />
            <Field
              label={b.fields.email}
              value={email}
              onChange={setEmail}
              placeholder={b.placeholders.email}
              type="email"
              autoComplete="email"
            />
            <Field
              label={b.fields.confirmEmail}
              value={confirmEmail}
              onChange={setConfirmEmail}
              placeholder={b.placeholders.email}
              type="email"
              autoComplete="email"
              error={confirmEmailMismatch}
            />
            <Field
              label={b.fields.phone}
              value={phone}
              onChange={setPhone}
              placeholder={b.placeholders.phone}
              type="tel"
              autoComplete="tel"
              className="sm:col-span-2"
            />
          </div>
        </StepCard>
      </div>

      {/* Right: summary */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-xl shadow-foreground/5">
          <div className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
            <Sparkles className="size-4 text-primary" />
            {b.summary.title}
          </div>

          <div className="mt-5 space-y-3 border-b border-border pb-5 text-sm">
            <SummaryRow label={b.summary.ticketType} value={ticketCopy.name} />
            <SummaryRow
              label={b.summary.date}
              value={date ? formatDate(date, b.monthNames) : b.summary.emptyValue}
              muted={!date}
            />
            <SummaryRow
              label={b.summary.time}
              value={time ?? b.summary.emptyValue}
              muted={!time}
            />
          </div>

          <div className="space-y-2 border-b border-border py-5 text-sm">
            {adults > 0 && (
              <SummaryRow
                label={replaceTokens(b.summary.adultLine, { count: adults })}
                value={`${adultTotal} €`}
              />
            )}
            {children > 0 && (
              <SummaryRow
                label={replaceTokens(b.summary.childLine, { count: children })}
                value={`${childTotal} €`}
              />
            )}
            {serviceFee > 0 && (
              <SummaryRow label={b.summary.bookingFee} value={`${serviceFee} €`} />
            )}
            {adults + children === 0 && (
              <p className="text-muted-foreground">{b.summary.selectGuests}</p>
            )}
          </div>

          <div className="flex items-center justify-between py-5">
            <span className="text-sm font-medium text-muted-foreground">
              {b.summary.totalDue}
            </span>
            <span className="font-heading text-2xl font-bold text-foreground">
              {total} €
            </span>
          </div>

          <Button
            type="button"
            disabled={!canConfirm || isSubmitting}
            onClick={handleConfirm}
            className="w-full rounded-full text-base disabled:cursor-not-allowed"
            size="lg"
          >
            {isSubmitting ? 'Saving...' : b.confirm}
          </Button>
          {submitError ? (
            <p className="mt-3 rounded-xl border border-destructive/25 bg-destructive/10 px-3 py-2 text-center text-sm font-medium text-destructive">
              {submitError}
            </p>
          ) : null}
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-primary" />
            {b.cancellationNote}
          </p>
        </div>
      </div>
    </div>
  )
}

const StepCard = forwardRef<
  HTMLDivElement,
  {
    step: number
    title: string
    children: React.ReactNode
  }
>(function StepCard({ step, title, children }, ref) {
  return (
    <div
      ref={ref}
      className="scroll-mt-24 rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6"
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="flex size-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {step}
        </span>
        <h3 className="font-heading text-lg font-semibold text-foreground">
          {title}
        </h3>
      </div>
      {children}
    </div>
  )
})

function Counter({
  label,
  hint,
  value,
  min,
  onChange,
  price,
  decreaseAria,
  increaseAria,
}: {
  label: string
  hint: string
  value: number
  min: number
  onChange: (v: number) => void
  price: string
  decreaseAria: string
  increaseAria: string
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border p-4">
      <div>
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">{hint}</div>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden text-sm font-semibold text-foreground sm:inline">
          {price}
        </span>
        <button
          type="button"
          aria-label={decreaseAria}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary disabled:opacity-30"
        >
          <Minus className="size-4" />
        </button>
        <span className="w-5 text-center text-sm font-semibold text-foreground">
          {value}
        </span>
        <button
          type="button"
          aria-label={increaseAria}
          onClick={() => onChange(value + 1)}
          className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type,
  className,
  autoComplete,
  error,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  type: string
  className?: string
  autoComplete?: string
  error?: string
}) {
  return (
    <label className={`block ${className ?? ''}`}>
      <span className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        className={`w-full rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:ring-1 ${
          error
            ? 'border-destructive focus:border-destructive focus:ring-destructive/30'
            : 'border-border focus:border-primary focus:ring-primary'
        }`}
      />
      {error ? (
        <span className="mt-1.5 block text-xs text-destructive">{error}</span>
      ) : null}
    </label>
  )
}

function SummaryRow({
  label,
  value,
  muted,
}: {
  label: string
  value: string
  muted?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={`text-right font-medium ${muted ? 'text-muted-foreground' : 'text-foreground'}`}
      >
        {value}
      </span>
    </div>
  )
}
