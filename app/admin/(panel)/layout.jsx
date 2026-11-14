import { redirect } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import { isAdminAuthenticated } from '@/lib/admin/session'
import { getAdminCounts } from '@/lib/admin/data'

export const dynamic = 'force-dynamic'

export default async function PanelLayout({ children }) {
  const authed = await isAdminAuthenticated()

  if (!authed) {
    redirect('/admin/login')
  }

  let counts = {}
  try {
    counts = await getAdminCounts()
  } catch (error) {
    console.error('[admin] counts failed:', error)
  }

  return <AdminShell counts={counts}>{children}</AdminShell>
}
