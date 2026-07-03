import fs from 'node:fs'
import pg from 'pg'

function loadEnvFile(path) {
  if (!fs.existsSync(path)) {
    return {}
  }

  return Object.fromEntries(
    fs
      .readFileSync(path, 'utf8')
      .split(/\r?\n/)
      .filter((line) => line && !line.trimStart().startsWith('#'))
      .map((line) => {
        const separatorIndex = line.indexOf('=')
        return [line.slice(0, separatorIndex), line.slice(separatorIndex + 1)]
      }),
  )
}

function mergeEnv(...sources) {
  return sources.reduce((result, source) => {
    for (const [key, value] of Object.entries(source)) {
      if (value) {
        result[key] = value
      }
    }

    return result
  }, {})
}

const envFile = process.env.SETUP_ENV_FILE ?? '.env.local'
const env = mergeEnv(loadEnvFile(envFile), process.env)
const connectionString =
  env.SUPABASE_DATABASE_URL ??
  (env.NEXT_PUBLIC_SUPABASE_URL && env.SUPABASE_DB_PASSWORD
    ? `postgresql://postgres:${encodeURIComponent(
        env.SUPABASE_DB_PASSWORD,
      )}@db.${new URL(env.NEXT_PUBLIC_SUPABASE_URL).host.split('.')[0]}.supabase.co:5432/postgres`
    : undefined)

if (!connectionString) {
  throw new Error(
    'Set SUPABASE_DATABASE_URL or NEXT_PUBLIC_SUPABASE_URL + SUPABASE_DB_PASSWORD before running setup.',
  )
}

const client = new pg.Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
})

await client.connect()

await client.query(`
  create sequence if not exists public.valor_booking_order_number_seq
    start with 90000
    increment by 1;

  create table if not exists public.valor_bookings (
    id uuid primary key default gen_random_uuid(),
    order_number text not null default lpad(nextval('public.valor_booking_order_number_seq')::text, 8, '0'),
    created_at timestamptz not null default now(),
    product_slug text not null default 'legacy',
    product_title text not null,
    product_price numeric(10, 2) not null,
    visit_date date not null,
    visit_time text not null,
    adults integer not null check (adults > 0),
    children integer not null default 0 check (children >= 0),
    language text not null,
    first_name text not null,
    last_name text not null,
    email text not null,
    phone text not null,
    traveler_names text[] not null default '{}',
    document_type text not null,
    document_number text not null,
    total numeric(10, 2) not null,
    status text not null default 'new' check (status in ('new', 'confirmed', 'cancelled')),
    source text not null default 'website'
  );

  alter table public.valor_bookings enable row level security;

  revoke all on table public.valor_bookings from anon, authenticated;
  grant select, insert, update, delete on table public.valor_bookings to service_role;

  create index if not exists valor_bookings_created_at_idx
    on public.valor_bookings (created_at desc);

  create index if not exists valor_bookings_source_created_at_idx
    on public.valor_bookings (source, created_at desc);

  alter table public.valor_bookings
    add column if not exists order_number text,
    add column if not exists product_slug text not null default 'legacy',
    add column if not exists children integer not null default 0,
    add column if not exists traveler_names text[] not null default '{}',
    add column if not exists source text not null default 'website';

  alter table public.valor_bookings
    alter column order_number set default lpad(nextval('public.valor_booking_order_number_seq')::text, 8, '0');

  update public.valor_bookings
  set order_number = lpad(nextval('public.valor_booking_order_number_seq')::text, 8, '0')
  where order_number is null;

  alter table public.valor_bookings
    alter column order_number set not null;

  create table if not exists public.valor_ticket_prices (
    site text not null,
    ticket_slug text not null,
    price numeric(10, 2) not null check (price >= 0),
    updated_at timestamptz not null default now(),
    primary key (site, ticket_slug)
  );

  alter table public.valor_ticket_prices enable row level security;

  revoke all on table public.valor_ticket_prices from anon, authenticated;
  grant select, insert, update, delete on table public.valor_ticket_prices to service_role;

  insert into public.valor_ticket_prices (site, ticket_slug, price)
  values
    ('newsagrada', 'basic', 33),
    ('newsagrada', 'towers', 46),
    ('newsagrada', 'guided', 59)
  on conflict (site, ticket_slug) do nothing;

  create table if not exists public.valor_contact_settings (
    site text primary key,
    support_email text not null,
    support_phone text not null,
    updated_at timestamptz not null default now()
  );

  alter table public.valor_contact_settings enable row level security;

  revoke all on table public.valor_contact_settings from anon, authenticated;
  grant select, insert, update, delete on table public.valor_contact_settings to service_role;

  insert into public.valor_contact_settings (site, support_email, support_phone)
  values ('newsagrada', 'support@valortours.org', '+1 505 537 5806')
  on conflict (site) do nothing;

  create table if not exists public.valor_availability_closures (
    id uuid primary key default gen_random_uuid(),
    product_slug text not null,
    closure_date date not null,
    closure_time text,
    note text,
    source text not null default 'website',
    created_at timestamptz not null default now(),
    closure_time_key text generated always as (coalesce(closure_time, '__full_day__')) stored
  );

  alter table public.valor_availability_closures enable row level security;

  revoke all on table public.valor_availability_closures from anon, authenticated;
  grant select, insert, update, delete on table public.valor_availability_closures to service_role;

  alter table public.valor_availability_closures
    add column if not exists closure_time_key text generated always as (coalesce(closure_time, '__full_day__')) stored;

  create unique index if not exists valor_availability_closures_source_slot_idx
    on public.valor_availability_closures (source, product_slug, closure_date, closure_time_key);

  create index if not exists valor_availability_closures_lookup_idx
    on public.valor_availability_closures (source, product_slug, closure_date, closure_time);

`)

await client.end()

console.log('Newsagrada Valor backend is ready. Site label: newsagrada')
