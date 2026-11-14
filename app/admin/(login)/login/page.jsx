import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { login } from '@/app/admin/actions'
import { ADMIN_COOKIE } from '@/lib/admin/session'

export const metadata = {
  title: 'Masuk · Admin myporto',
  robots: { index: false, follow: false },
}

const MESSAGES = {
  '1': 'Username atau password salah.',
  config: 'Admin belum dikonfigurasi: ADMIN_USERNAME / ADMIN_PASSWORD / ADMIN_SESSION_SECRET kosong.',
  auth: 'Sesi tidak valid, silakan masuk lagi.',
}

export default async function LoginPage({ searchParams }) {
  const params = await searchParams
  const jar = await cookies()
  if (jar.get(ADMIN_COOKIE)?.value) redirect('/admin')

  const error = params?.error

  return (
    <div className="login-wrap">
      <form className="login-card" action={login}>
        <div className="login-brand">
          <div className="brand-mark">g</div>
          <div>
            <div className="brand-name">myporto</div>
            <div className="brand-sub">Content manager</div>
          </div>
        </div>

        <h1 className="login-title">Masuk ke admin</h1>
        <p className="login-sub">Kelola konten, blog, dan project tanpa membuka Sanity Studio.</p>

        <label className="field">
          <span className="label">Username</span>
          <input
            className="input"
            type="text"
            name="username"
            autoComplete="username"
            required
            autoFocus
          />
        </label>

        <label className="field">
          <span className="label">Password</span>
          <input
            className="input"
            type="password"
            name="password"
            autoComplete="current-password"
            required
          />
        </label>

        <button className="btn btn-primary login-submit" type="submit">
          Masuk
        </button>

        {error && <div className="login-error">{MESSAGES[error] ?? 'Terjadi kesalahan.'}</div>}
      </form>
    </div>
  )
}
