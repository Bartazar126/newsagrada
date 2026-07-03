'use client'

import { useMemo, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  closeAvailabilitySlotInline,
  openAvailabilitySlotInline,
} from './actions'
import type { ProductSlug } from '@/lib/availability'

type ProductOption = {
  slug: ProductSlug
  title: string
}

type CalendarClosure = {
  id: string
  product_slug: ProductSlug
  closure_date: string
  closure_time: string | null
  note: string | null
  created_at: string
}

type AvailabilityCalendarProps = {
  products: ProductOption[]
  closures: CalendarClosure[]
  productBookingTimes: Record<ProductSlug, readonly string[]>
  initialProductSlug?: string
  initialDate?: string
}

function formatDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getMonthDays(monthDate: Date) {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const firstDate = new Date(year, month, 1)
  const firstWeekday = (firstDate.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  return [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from(
      { length: daysInMonth },
      (_, index) => new Date(year, month, index + 1),
    ),
  ]
}

function monthLabel(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function parseDateKey(value: string | undefined, fallback: Date) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return formatDateKey(fallback)
  }

  return value
}

function monthFromDateKey(value: string) {
  const [year, month] = value.split('-').map(Number)

  return new Date(year, month - 1, 1)
}

function slotKey({
  productSlug,
  closureDate,
  closureTime,
}: {
  productSlug: ProductSlug
  closureDate: string
  closureTime: string | null
}) {
  return `${productSlug}:${closureDate}:${closureTime ?? 'full-day'}`
}

export default function AvailabilityCalendar({
  products,
  closures,
  productBookingTimes,
  initialProductSlug,
  initialDate,
}: AvailabilityCalendarProps) {
  const today = useMemo(() => new Date(), [])
  const initialProduct = products.some(
    (product) => product.slug === initialProductSlug,
  )
    ? (initialProductSlug as ProductSlug)
    : products[0].slug
  const initialDateKey = parseDateKey(initialDate, today)
  const [selectedProduct, setSelectedProduct] =
    useState<ProductSlug>(initialProduct)
  const [visibleMonth, setVisibleMonth] = useState(
    () => monthFromDateKey(initialDateKey),
  )
  const [selectedDate, setSelectedDate] = useState(initialDateKey)
  const [calendarClosures, setCalendarClosures] = useState(closures)
  const [pendingSlotKeys, setPendingSlotKeys] = useState<Set<string>>(
    () => new Set(),
  )
  const [errorMessage, setErrorMessage] = useState('')
  const [, startTransition] = useTransition()
  const router = useRouter()

  const monthDays = getMonthDays(visibleMonth)
  const selectedProductClosures = calendarClosures.filter(
    (closure) =>
      closure.product_slug === selectedProduct || closure.closure_time === null,
  )
  const selectedBookingTimes = productBookingTimes[selectedProduct] ?? []
  const closureMap = new Map(
    selectedProductClosures.map((closure) => [
      `${closure.closure_date}:${closure.closure_time ?? 'full-day'}`,
      closure,
    ]),
  )
  const selectedDayFullClosed = closureMap.has(`${selectedDate}:full-day`)

  function moveMonth(change: number) {
    setVisibleMonth(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() + change, 1),
    )
  }

  function submitFullDayToggle(dateKey: string) {
    const fullDayClosed = closureMap.has(`${dateKey}:full-day`)

    toggleAvailabilitySlot(dateKey, null, !fullDayClosed)
  }

  function setPendingSlot(key: string, isPending: boolean) {
    setPendingSlotKeys((current) => {
      const next = new Set(current)

      if (isPending) {
        next.add(key)
      } else {
        next.delete(key)
      }

      return next
    })
  }

  function updateLocalClosure(
    closureDate: string,
    closureTime: string | null,
    isClosed: boolean,
  ) {
    const key = slotKey({
      productSlug: selectedProduct,
      closureDate,
      closureTime,
    })

    setCalendarClosures((current) => {
      const withoutSlot = current.filter(
        (closure) =>
          slotKey({
            productSlug: closure.product_slug,
            closureDate: closure.closure_date,
            closureTime: closure.closure_time,
          }) !== key,
      )

      if (!isClosed) {
        return withoutSlot
      }

      return [
        ...withoutSlot,
        {
          id: `optimistic-${key}`,
          product_slug: selectedProduct,
          closure_date: closureDate,
          closure_time: closureTime,
          note: null,
          created_at: new Date().toISOString(),
        },
      ]
    })
  }

  function toggleAvailabilitySlot(
    closureDate: string,
    closureTime: string | null,
    shouldClose: boolean,
  ) {
    const key = slotKey({
      productSlug: selectedProduct,
      closureDate,
      closureTime,
    })
    const previousClosures = calendarClosures

    setErrorMessage('')
    setPendingSlot(key, true)
    updateLocalClosure(closureDate, closureTime, shouldClose)

    startTransition(async () => {
      try {
        const input = {
          productSlug: selectedProduct,
          closureDate,
          closureTime: closureTime ?? 'full-day',
        }

        if (shouldClose) {
          await closeAvailabilitySlotInline(input)
        } else {
          await openAvailabilitySlotInline(input)
        }

        router.refresh()
      } catch (error) {
        setCalendarClosures(previousClosures)
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Could not update availability.',
        )
      } finally {
        setPendingSlot(key, false)
      }
    })
  }

  return (
    <div className="mb-8 rounded-[2rem] border border-primary/20 bg-card p-4 shadow-xl shadow-foreground/10 md:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
            Fast calendar
          </p>
          <h2 className="mt-2 font-heading text-4xl font-bold">
            Close days and time slots
          </h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold text-muted-foreground">
            Click a day to manage slots. Double click a day to close or open the
            full day.
          </p>
        </div>
        <label className="block min-w-72 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
          Product
          <select
            value={selectedProduct}
            onChange={(event) =>
              setSelectedProduct(event.target.value as ProductSlug)
            }
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-bold normal-case outline-none focus:border-primary"
          >
            {products.map((product) => (
              <option key={product.slug} value={product.slug}>
                {product.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      {errorMessage && (
        <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          {errorMessage}
        </p>
      )}

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => moveMonth(-1)}
              className="rounded-full border border-border px-4 py-2 text-sm font-black uppercase tracking-[0.16em] hover:border-primary hover:text-primary"
            >
              Prev
            </button>
            <h3 className="font-heading text-2xl font-bold">
              {monthLabel(visibleMonth)}
            </h3>
            <button
              type="button"
              onClick={() => moveMonth(1)}
              className="rounded-full border border-border px-4 py-2 text-sm font-black uppercase tracking-[0.16em] hover:border-primary hover:text-primary"
            >
              Next
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-black uppercase tracking-[0.12em] text-muted-foreground">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-2">
            {monthDays.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="min-h-24" />
              }

              const dateKey = formatDateKey(date)
              const fullDayClosed = closureMap.has(`${dateKey}:full-day`)
              const timeClosedCount = selectedBookingTimes.filter((time) =>
                closureMap.has(`${dateKey}:${time}`),
              ).length
              const isSelected = selectedDate === dateKey

              return (
                <button
                  key={dateKey}
                  type="button"
                  onClick={() => setSelectedDate(dateKey)}
                  onDoubleClick={() => submitFullDayToggle(dateKey)}
                  className={`min-h-24 rounded-2xl border p-2 text-left transition hover:-translate-y-0.5 ${
                    fullDayClosed
                      ? 'border-red-300 bg-red-50 text-red-800'
                      : timeClosedCount
                        ? 'border-amber-300 bg-amber-50 text-amber-900'
                        : 'border-border bg-secondary/40 text-foreground'
                  } ${isSelected ? 'ring-4 ring-primary/30' : ''}`}
                  title="Click to manage times. Double click to toggle full day."
                >
                  <span className="text-lg font-black">{date.getDate()}</span>
                  <span className="mt-3 block text-[0.65rem] font-black uppercase tracking-[0.14em]">
                    {fullDayClosed
                      ? 'Full closed'
                      : timeClosedCount
                        ? `${timeClosedCount} time closed`
                        : 'Open'}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <aside className="rounded-[1.5rem] border border-border bg-secondary/40 p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">
            Selected day
          </p>
          <h3 className="mt-2 font-heading text-3xl font-bold">
            {selectedDate}
          </h3>
          <div className="mt-5">
            {selectedDayFullClosed ? (
              <button
                type="button"
                onClick={() => toggleAvailabilitySlot(selectedDate, null, false)}
                disabled={pendingSlotKeys.has(
                  slotKey({
                    productSlug: selectedProduct,
                    closureDate: selectedDate,
                    closureTime: null,
                  }),
                )}
                className="w-full rounded-full bg-primary px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-primary-foreground hover:bg-[#2f2118]"
              >
                Open full day
              </button>
            ) : (
              <button
                type="button"
                onClick={() => toggleAvailabilitySlot(selectedDate, null, true)}
                disabled={pendingSlotKeys.has(
                  slotKey({
                    productSlug: selectedProduct,
                    closureDate: selectedDate,
                    closureTime: null,
                  }),
                )}
                className="w-full rounded-full bg-[#2f2118] px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-white hover:bg-red-600"
              >
                Close full day
              </button>
            )}
          </div>
          <div className="mt-6 space-y-3">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
              Time slots
            </p>
            {selectedBookingTimes.map((time) => {
              const closed =
                selectedDayFullClosed || closureMap.has(`${selectedDate}:${time}`)
              const pendingKey = slotKey({
                productSlug: selectedProduct,
                closureDate: selectedDate,
                closureTime: selectedDayFullClosed ? null : time,
              })
              const isPendingSlot = pendingSlotKeys.has(pendingKey)

              return (
                <div
                  key={time}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-card p-3 shadow-sm"
                >
                  <span className="text-lg font-black">{time}</span>
                  {closed ? (
                    <button
                      type="button"
                      onClick={() =>
                        toggleAvailabilitySlot(
                          selectedDate,
                          selectedDayFullClosed ? null : time,
                          false,
                        )
                      }
                      disabled={isPendingSlot}
                      className="rounded-full bg-primary px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-primary-foreground hover:bg-[#2f2118]"
                    >
                      {isPendingSlot
                        ? 'Saving'
                        : selectedDayFullClosed
                          ? 'Open day'
                          : 'Open'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        toggleAvailabilitySlot(selectedDate, time, true)
                      }
                      disabled={isPendingSlot}
                      className="rounded-full border border-red-300 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-red-600 hover:bg-red-600 hover:text-white"
                    >
                      {isPendingSlot ? 'Saving' : 'Close'}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </aside>
      </div>
    </div>
  )
}
