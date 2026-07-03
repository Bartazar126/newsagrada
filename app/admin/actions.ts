'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  clearAdminSession,
  isAdminAuthenticated,
  isValidAdminPassword,
  setAdminSession,
} from '@/lib/admin-auth'
import {
  createAvailabilityClosure,
  deleteAvailabilityClosure,
  deleteAvailabilityClosureBySlot,
  getBookingTimesForProduct,
  isProductSlug,
} from '@/lib/availability'
import { updateContactSettings as saveContactSettings } from '@/lib/contact-settings'
import { updateTicketPrices as saveTicketPrices } from '@/lib/ticket-prices'
import { ticketTiers } from '@/lib/tickets-data'

type AvailabilitySlotInput = {
  productSlug: string
  closureDate: string
  closureTime: string
}

function availabilityRedirect(productSlug: string, closureDate: string) {
  redirect(
    `/admin?product=${encodeURIComponent(productSlug)}&date=${encodeURIComponent(
      closureDate,
    )}`,
  )
}

function getValidatedAvailabilitySlot(input: AvailabilitySlotInput) {
  const productSlug = input.productSlug
  const closureDate = input.closureDate
  const closureTime =
    input.closureTime === 'full-day' ? null : input.closureTime

  if (!isProductSlug(productSlug)) {
    throw new Error('Invalid product.')
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(closureDate)) {
    throw new Error('Invalid date.')
  }

  if (closureTime && !getBookingTimesForProduct(productSlug).includes(closureTime)) {
    throw new Error('Invalid time.')
  }

  return {
    productSlug,
    closureDate,
    closureTime,
  }
}

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get('password') ?? '')

  if (!isValidAdminPassword(password)) {
    redirect('/admin/login?error=1')
  }

  await setAdminSession()
  redirect('/admin')
}

export async function logoutAdmin() {
  await clearAdminSession()
  redirect('/admin/login')
}

export async function updateTicketPrices(formData: FormData) {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login')
  }

  try {
    await saveTicketPrices(
      ticketTiers.map((tier) => ({
        id: tier.id,
        price: Number(formData.get(`price_${tier.id}`)),
      })),
    )

    revalidatePath('/admin')
    revalidatePath('/')
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Could not update prices.'
    redirect(`/admin?priceError=${encodeURIComponent(message)}`)
  }

  redirect('/admin?prices=updated')
}

export async function updateContactSettings(formData: FormData) {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login')
  }

  try {
    await saveContactSettings({
      supportEmail: String(formData.get('supportEmail') ?? ''),
      supportPhone: String(formData.get('supportPhone') ?? ''),
    })

    revalidatePath('/admin')
    revalidatePath('/')
    revalidatePath('/contact')
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Could not update contact settings.'
    redirect(`/admin?contactError=${encodeURIComponent(message)}`)
  }

  redirect('/admin?contact=updated')
}

export async function addAvailabilityClosure(formData: FormData) {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login')
  }

  const productSlug = String(formData.get('productSlug') ?? '')
  const closureDate = String(formData.get('closureDate') ?? '')
  const closureTimeValue = String(formData.get('closureTime') ?? '')
  const note = String(formData.get('note') ?? '')
  const { closureTime } = getValidatedAvailabilitySlot({
    productSlug,
    closureDate,
    closureTime: closureTimeValue,
  })

  await createAvailabilityClosure({
    productSlug,
    closureDate,
    closureTime,
    note,
  })

  revalidatePath('/admin')
  revalidatePath('/')
  availabilityRedirect(productSlug, closureDate)
}

export async function removeAvailabilityClosure(formData: FormData) {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login')
  }

  const closureId = String(formData.get('closureId') ?? '')

  if (!closureId) {
    throw new Error('Missing closure id.')
  }

  await deleteAvailabilityClosure(closureId)
  revalidatePath('/admin')
  revalidatePath('/')
  redirect('/admin')
}

export async function closeAvailabilitySlotInline(input: AvailabilitySlotInput) {
  if (!(await isAdminAuthenticated())) {
    throw new Error('Unauthorized.')
  }

  const { productSlug, closureDate, closureTime } =
    getValidatedAvailabilitySlot(input)

  await createAvailabilityClosure({
    productSlug,
    closureDate,
    closureTime,
    note: closureTime ? 'Closed from calendar' : 'Full day closed from calendar',
  })

  revalidatePath('/admin')
  revalidatePath('/')
}

export async function openAvailabilitySlotInline(input: AvailabilitySlotInput) {
  if (!(await isAdminAuthenticated())) {
    throw new Error('Unauthorized.')
  }

  const { productSlug, closureDate, closureTime } =
    getValidatedAvailabilitySlot(input)

  await deleteAvailabilityClosureBySlot({
    productSlug,
    closureDate,
    closureTime,
  })

  revalidatePath('/admin')
  revalidatePath('/')
}
