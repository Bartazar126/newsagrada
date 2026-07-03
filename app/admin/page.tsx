import { redirect } from 'next/navigation'
import {
  addAvailabilityClosure,
  logoutAdmin,
  removeAvailabilityClosure,
  updateContactSettings,
  updateTicketPrices,
} from './actions'
import AvailabilityCalendar from './AvailabilityCalendar'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import {
  getAdminProducts,
  listAvailabilityClosures,
  productBookingTimes,
  timeSlots,
} from '@/lib/availability'
import { listBookings, type StoredBooking } from '@/lib/booking-storage'
import { getContactSettings } from '@/lib/contact-settings'
import { SITE_LABEL } from '@/lib/site-label'
import { getTicketTiersWithPrices } from '@/lib/ticket-prices'

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function formatPrice(value: number) {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    contact?: string
    contactError?: string
    date?: string
    product?: string
    prices?: string
    priceError?: string
  }>
}) {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login')
  }

  const params = await searchParams
  let bookings: StoredBooking[] = []
  const availabilityClosures = await listAvailabilityClosures()
  const contactSettings = await getContactSettings()
  const products = getAdminProducts()
  const ticketTiers = await getTicketTiersWithPrices()
  let errorMessage = ''

  try {
    bookings = await listBookings()
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : 'Unknown database error.'
  }

  return (
    <main className="min-h-screen bg-secondary/40 text-foreground">
      <header className="bg-[#2f2118] px-4 py-6 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#f5c16c]">
              Admin panel
            </p>
            <h1 className="mt-2 font-heading text-4xl font-bold">
              Incoming bookings
            </h1>
            <p className="mt-2 text-sm text-white/70">
              Site label: <span className="font-bold">{SITE_LABEL}</span>
            </p>
          </div>

          <form action={logoutAdmin}>
            <button
              type="submit"
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] hover:border-[#f5c16c] hover:text-[#f5c16c]"
            >
              Logout
            </button>
          </form>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 flex flex-col gap-2 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
              Newest first
            </p>
            <h2 className="mt-2 font-heading text-4xl font-bold">
              {bookings.length} booking request
              {bookings.length === 1 ? '' : 's'}
            </h2>
          </div>
          <p className="max-w-xl text-sm text-muted-foreground">
            Only records saved with the {SITE_LABEL} site label are shown here.
          </p>
        </div>

        {errorMessage && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-bold text-red-700">
            Could not load bookings: {errorMessage}
          </p>
        )}

        {params.prices === 'updated' && (
          <p className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-bold text-green-700">
            Prices updated successfully.
          </p>
        )}

        {params.priceError && (
          <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-bold text-red-700">
            Could not update prices: {params.priceError}
          </p>
        )}

        {params.contact === 'updated' && (
          <p className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-bold text-green-700">
            Contact settings updated successfully.
          </p>
        )}

        {params.contactError && (
          <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-bold text-red-700">
            Could not update contact settings: {params.contactError}
          </p>
        )}

        <form
          action={updateTicketPrices}
          className="mb-8 rounded-3xl border border-border bg-card p-5 shadow-sm md:p-6"
        >
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
                Ticket prices
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold">
                Update website pricing
              </h2>
            </div>
            <button
              type="submit"
              className="rounded-full bg-primary px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary/90"
            >
              Save prices
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {ticketTiers.map((tier) => (
              <label key={tier.id} className="block">
                <span className="mb-1.5 block text-sm font-bold text-foreground">
                  {tier.name}
                </span>
                <div className="flex items-center rounded-xl border border-border bg-background px-3 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                  <input
                    name={`price_${tier.id}`}
                    type="number"
                    min="0"
                    step="0.01"
                    defaultValue={tier.price}
                    className="w-full bg-transparent py-2.5 text-sm font-bold text-foreground outline-none"
                  />
                  <span className="text-sm font-bold text-muted-foreground">
                    €
                  </span>
                </div>
              </label>
            ))}
          </div>
        </form>

        <form
          action={updateContactSettings}
          className="mb-8 rounded-3xl border border-border bg-card p-5 shadow-sm md:p-6"
        >
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
                Contact settings
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold">
                Update website contact details
              </h2>
            </div>
            <button
              type="submit"
              className="rounded-full bg-primary px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary/90"
            >
              Save contact
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-foreground">
                Support email
              </span>
              <input
                name="supportEmail"
                type="email"
                defaultValue={contactSettings.supportEmail}
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-bold text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-foreground">
                Support phone
              </span>
              <input
                name="supportPhone"
                type="tel"
                defaultValue={contactSettings.supportPhone}
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-bold text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </label>
          </div>
        </form>

        <AvailabilityCalendar
          products={products}
          closures={availabilityClosures}
          productBookingTimes={productBookingTimes}
          initialProductSlug={params.product}
          initialDate={params.date}
        />

        <form
          action={addAvailabilityClosure}
          className="mb-8 grid gap-4 rounded-3xl border border-border bg-card p-5 shadow-sm md:grid-cols-2 lg:grid-cols-[1fr_0.8fr_0.8fr_1fr_auto]"
        >
          <label className="block text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
            Product
            <select
              name="productSlug"
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-bold normal-case outline-none focus:border-primary"
              required
            >
              {products.map((product) => (
                <option key={product.slug} value={product.slug}>
                  {product.title}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
            Date
            <input
              name="closureDate"
              type="date"
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 font-bold outline-none focus:border-primary"
              required
            />
          </label>
          <label className="block text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
            Time
            <select
              name="closureTime"
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 font-bold outline-none focus:border-primary"
            >
              <option value="full-day">Full day</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
            Note
            <input
              name="note"
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 font-bold outline-none focus:border-primary"
              placeholder="Optional"
            />
          </label>
          <button
            type="submit"
            className="self-end rounded-full bg-[#2f2118] px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-white hover:bg-primary"
          >
            Close
          </button>
        </form>

        <div className="mb-8 space-y-4">
          {availabilityClosures.map((closure) => {
            const product = products.find(
              (item) => item.slug === closure.product_slug,
            )

            return (
              <article
                key={closure.id}
                className="flex flex-col gap-4 rounded-3xl border border-border bg-card px-4 py-5 shadow-sm md:flex-row md:items-center md:justify-between md:px-6"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    {closure.closure_date} · {closure.closure_time ?? 'Full day'}
                  </p>
                  <h3 className="mt-1 font-heading text-2xl font-bold">
                    {product?.title ?? closure.product_slug}
                  </h3>
                  {closure.note ? (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {closure.note}
                    </p>
                  ) : null}
                </div>
                <form action={removeAvailabilityClosure}>
                  <input type="hidden" name="closureId" value={closure.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-red-300 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-red-600 hover:bg-red-600 hover:text-white"
                  >
                    Open again
                  </button>
                </form>
              </article>
            )
          })}
          {availabilityClosures.length === 0 && (
            <div className="rounded-3xl border border-border bg-card py-14 text-center shadow-sm">
              <p className="text-xl font-bold">No closures yet.</p>
              <p className="mt-2 text-muted-foreground">
                Closed days and time slots will appear here.
              </p>
            </div>
          )}
        </div>

        {!errorMessage && bookings.length === 0 && (
          <div className="rounded-3xl border border-border bg-card py-14 text-center shadow-sm">
            <p className="text-xl font-bold">No bookings yet.</p>
            <p className="mt-2 text-muted-foreground">
              New website bookings will appear here in arrival order.
            </p>
          </div>
        )}

        {!errorMessage && bookings.length > 0 && (
          <div className="space-y-5">
            {bookings.map((booking, index) => (
              <article
                key={booking.id}
                className="rounded-3xl border border-border bg-card px-4 py-6 shadow-sm md:px-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      #{index + 1} · Order {booking.order_number} ·{' '}
                      {formatDateTime(booking.created_at)}
                    </p>
                    <h3 className="mt-2 font-heading text-2xl font-bold">
                      {booking.product_title}
                    </h3>
                    <p className="mt-1 font-semibold text-muted-foreground">
                      Visit: {booking.visit_date} at {booking.visit_time} ·{' '}
                      {booking.language}
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <span className="inline-flex rounded-full border border-primary px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                      {booking.status}
                    </span>
                    <p className="mt-3 font-heading text-3xl font-bold">
                      {formatPrice(booking.total)}€
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {booking.adults} adult(s) · {booking.children} child(ren)
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 border-t border-border pt-5 md:grid-cols-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      Customer
                    </p>
                    <p className="mt-1 font-bold">
                      {booking.first_name} {booking.last_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      Email
                    </p>
                    <a
                      className="mt-1 block font-bold"
                      href={`mailto:${booking.email}`}
                    >
                      {booking.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      Phone
                    </p>
                    <a
                      className="mt-1 block font-bold"
                      href={`tel:${booking.phone}`}
                    >
                      {booking.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      Source
                    </p>
                    <p className="mt-1 font-bold">{booking.source}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
