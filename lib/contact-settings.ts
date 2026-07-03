import 'server-only'

import { getDb } from '@/lib/db'
import { SITE_LABEL } from '@/lib/site-label'

export type ContactSettings = {
  supportEmail: string
  supportPhone: string
}

export const defaultContactSettings: ContactSettings = {
  supportEmail: 'support@valortours.org',
  supportPhone: '+1 505 537 5806',
}

async function ensureContactSettingsTable() {
  const db = getDb()

  await db.query(`
    create table if not exists public.valor_contact_settings (
      site text primary key,
      support_email text not null,
      support_phone text not null,
      updated_at timestamptz not null default now()
    );

    alter table public.valor_contact_settings enable row level security;

    revoke all on table public.valor_contact_settings from anon, authenticated;
    grant select, insert, update, delete on table public.valor_contact_settings to service_role;
  `)

  await db.query(
    `
      insert into public.valor_contact_settings (site, support_email, support_phone)
      values ($1, $2, $3)
      on conflict (site) do nothing
    `,
    [
      SITE_LABEL,
      defaultContactSettings.supportEmail,
      defaultContactSettings.supportPhone,
    ],
  )
}

export async function getContactSettings(): Promise<ContactSettings> {
  try {
    await ensureContactSettingsTable()
    const db = getDb()
    const { rows } = await db.query<{
      support_email: string
      support_phone: string
    }>(
      `
        select support_email, support_phone
        from public.valor_contact_settings
        where site = $1
        limit 1
      `,
      [SITE_LABEL],
    )

    const settings = rows[0]
    return settings
      ? {
          supportEmail: settings.support_email,
          supportPhone: settings.support_phone,
        }
      : defaultContactSettings
  } catch {
    return defaultContactSettings
  }
}

export async function updateContactSettings(settings: ContactSettings) {
  const supportEmail = settings.supportEmail.trim().toLowerCase()
  const supportPhone = settings.supportPhone.trim()

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(supportEmail)) {
    throw new Error('Please enter a valid support email.')
  }

  if (supportPhone.replace(/\D/g, '').length < 8) {
    throw new Error('Please enter a valid support phone number.')
  }

  await ensureContactSettingsTable()
  const db = getDb()

  await db.query(
    `
      insert into public.valor_contact_settings (site, support_email, support_phone, updated_at)
      values ($1, $2, $3, now())
      on conflict (site)
      do update set
        support_email = excluded.support_email,
        support_phone = excluded.support_phone,
        updated_at = now()
    `,
    [SITE_LABEL, supportEmail, supportPhone],
  )
}
