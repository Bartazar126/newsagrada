'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  selected: Date | null
  onSelect: (date: Date) => void
  isDateDisabled?: (date: Date) => boolean
  getDateAvailabilityStatus?: (date: Date) => 'closed' | 'limited' | undefined
  monthNames: readonly string[]
  weekdayNames: readonly string[]
  previousMonthAria: string
  nextMonthAria: string
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function BookingCalendar({
  selected,
  onSelect,
  isDateDisabled,
  getDateAvailabilityStatus,
  monthNames,
  weekdayNames,
  previousMonthAria,
  nextMonthAria,
}: Props) {
  const today = startOfDay(new Date())
  const [view, setView] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  )

  const year = view.getFullYear()
  const month = view.getMonth()

  // Monday-first offset
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (Date | null)[] = []
  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))

  const canGoPrev =
    year > today.getFullYear() ||
    (year === today.getFullYear() && month > today.getMonth())

  const goPrev = () => {
    if (canGoPrev) setView(new Date(year, month - 1, 1))
  }
  const goNext = () => setView(new Date(year, month + 1, 1))

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canGoPrev}
          aria-label={previousMonthAria}
          className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="size-4" />
        </button>
        <div className="font-heading text-base font-semibold text-foreground">
          {monthNames[month]} {year}
        </div>
        <button
          type="button"
          onClick={goNext}
          aria-label={nextMonthAria}
          className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1">
        {weekdayNames.map((w, i) => (
          <div
            key={`weekday-${i}`}
            className="py-1 text-center text-xs font-medium text-muted-foreground"
          >
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />
          const isPast = date < today
          const isClosed = Boolean(isDateDisabled?.(date))
          const availabilityStatus =
            getDateAvailabilityStatus?.(date) ?? (isClosed ? 'closed' : undefined)
          const isLimited = availabilityStatus === 'limited'
          const isDisabled = isPast || isClosed
          const isSelected = selected ? isSameDay(date, selected) : false
          const isToday = isSameDay(date, today)
          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={isDisabled}
              aria-label={`${date.getDate()}${availabilityStatus === 'closed' ? ', closed' : availabilityStatus === 'limited' ? ', limited availability' : ''}`}
              title={
                availabilityStatus === 'closed'
                  ? 'Closed'
                  : availabilityStatus === 'limited'
                    ? 'Limited availability'
                    : undefined
              }
              onClick={() => onSelect(date)}
              className={`relative flex aspect-square items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                isSelected
                  ? 'bg-primary text-primary-foreground'
                  : isClosed
                    ? 'cursor-not-allowed border border-destructive/20 bg-destructive/5 text-destructive'
                    : isLimited
                      ? 'border border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100'
                  : isDisabled
                    ? 'cursor-not-allowed text-muted-foreground/40'
                    : 'text-foreground hover:bg-secondary'
              }`}
            >
              <span>{date.getDate()}</span>
              {availabilityStatus === 'closed' && (
                <span className="absolute bottom-1 size-1.5 rounded-full bg-destructive" />
              )}
              {availabilityStatus === 'limited' && (
                <span className="absolute bottom-1 size-1.5 rounded-full bg-amber-500" />
              )}
              {isToday && !isSelected && !availabilityStatus && (
                <span className="absolute bottom-1 size-1 rounded-full bg-primary" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
