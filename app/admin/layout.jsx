import './admin.css'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Admin · myporto',
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({ children }) {
  return <div className="admin-root">{children}</div>
}
