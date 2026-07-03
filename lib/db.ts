import 'server-only'

import pg from 'pg'

function getConnectionString() {
  const configuredDatabaseUrl = process.env.SUPABASE_DATABASE_URL

  if (configuredDatabaseUrl) {
    return configuredDatabaseUrl
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseDbPassword = process.env.SUPABASE_DB_PASSWORD

  if (!supabaseUrl || !supabaseDbPassword) {
    throw new Error(
      'Missing database environment variables. Set SUPABASE_DATABASE_URL or NEXT_PUBLIC_SUPABASE_URL + SUPABASE_DB_PASSWORD.',
    )
  }

  const projectRef = new URL(supabaseUrl).host.split('.')[0]

  return `postgresql://postgres:${encodeURIComponent(
    supabaseDbPassword,
  )}@db.${projectRef}.supabase.co:5432/postgres`
}

const globalForPostgres = globalThis as typeof globalThis & {
  newsagradaPool?: pg.Pool
}

export function getDb() {
  if (!globalForPostgres.newsagradaPool) {
    globalForPostgres.newsagradaPool = new pg.Pool({
      connectionString: getConnectionString(),
      ssl: {
        rejectUnauthorized: false,
      },
    })
  }

  return globalForPostgres.newsagradaPool
}
