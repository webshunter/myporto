import './admin.css'
import AdminShell from '@/components/admin/AdminShell'
import { isAdminAuthenticated } from '@/lib/admin/session'
import { getAdminCounts } from '@/lib/admin/data'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Admin · myporto',
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }) {
  const authed = await isAdminAuthenticated()

  if (!authed) {
    return <div className="admin-bare">{children}</div>
  }

  let counts = {}
  try {
    counts = await getAdminCounts()
  } catch (error) {
    console.error('[admin] counts failed:', error)
  }

  return <AdminShell counts={counts}>{children}</AdminShell>
}
