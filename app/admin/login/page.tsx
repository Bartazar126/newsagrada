import { redirect } from 'next/navigation'
import { loginAdmin } from '../actions'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { SITE_LABEL } from '@/lib/site-label'

type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string
  }>
}

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  if (await isAdminAuthenticated()) {
    redirect('/admin')
  }

  const params = await searchParams

  return (
    <main className="min-h-screen bg-[#2f2118] px-4 py-12 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md flex-col justify-center">
        <div className="rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#f5c16c]">
            Admin panel
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold">
            Newsagrada bookings
          </h1>
          <p className="mt-3 text-sm text-white/70">Site label: {SITE_LABEL}</p>

          <form action={loginAdmin} className="mt-8 space-y-4">
            <label className="block text-sm font-bold">
              Password
              <input
                name="password"
                type="password"
                required
                className="mt-2 w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-slate-950 outline-none focus:border-[#f5c16c]"
              />
            </label>

            {params.error && (
              <p className="rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-sm font-bold text-red-700">
                Wrong password.
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-primary px-5 py-4 font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Enter admin
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
