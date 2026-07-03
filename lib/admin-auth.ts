import 'server-only'

import { cookies } from 'next/headers'

const adminCookieName = 'newsagrada_admin_session'
const adminCookieValue = 'active'

export async function isAdminAuthenticated() {
  const cookieStore = await cookies()

  return cookieStore.get(adminCookieName)?.value === adminCookieValue
}

export async function setAdminSession() {
  const cookieStore = await cookies()

  cookieStore.set(adminCookieName, adminCookieValue, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/admin',
    maxAge: 60 * 60 * 8,
  })
}

export async function clearAdminSession() {
  const cookieStore = await cookies()

  cookieStore.set(adminCookieName, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/admin',
    maxAge: 0,
  })
}

export function isValidAdminPassword(password: string) {
  return Boolean(
    process.env.ADMIN_PANEL_PASSWORD &&
      password === process.env.ADMIN_PANEL_PASSWORD,
  )
}
