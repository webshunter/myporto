import Sidebar from '@/components/admin/Sidebar'

export default function AdminShell({ children, counts }) {
  return (
    <div className="shell">
      <Sidebar counts={counts} />
      <main className="main">{children}</main>
    </div>
  )
}
