'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ICONS = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  homepage: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V20h13V9.5" />
    </>
  ),
  blog: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6" />
    </>
  ),
  projects: <path d="M3 7h6l2 2h10v11H3z" />,
  apps: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="8" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
    </>
  ),
  transactions: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 10h19" />
    </>
  ),
  settings: (
    <>
      <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="10" cy="17" r="2" />
    </>
  ),
}

function NavIcon({ name }) {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      {ICONS[name]}
    </svg>
  )
}

const GROUPS = [
  {
    label: 'Konten',
    items: [
      { href: '/admin', label: 'Dashboard', icon: 'dashboard', exact: true },
      { href: '/admin/homepage', label: 'Homepage', icon: 'homepage' },
      { href: '/admin/blog', label: 'Blog', icon: 'blog', count: 'blog' },
      { href: '/admin/projects', label: 'Projects', icon: 'projects', count: 'projects' },
    ],
  },
  {
    label: 'Penjualan',
    items: [{ href: '/admin/transaksi', label: 'Transaksi', icon: 'transactions' }],
  },
  {
    label: 'Sistem',
    items: [{ href: '/admin/pengaturan', label: 'Pengaturan', icon: 'settings' }],
  },
]

export default function Sidebar({ counts = {}, user = 'Admin' }) {
  const pathname = usePathname()

  const isActive = (item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href)

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">g</div>
        <div>
          <div className="brand-name">myporto</div>
          <div className="brand-sub">Content manager</div>
        </div>
      </div>

      <nav className="nav">
        {GROUPS.map((group) => (
          <div className="nav-group" key={group.label}>
            <div className="nav-label">{group.label}</div>
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item${isActive(item) ? ' is-active' : ''}`}
                aria-current={isActive(item) ? 'page' : undefined}
              >
                <NavIcon name={item.icon} />
                {item.label}
                {item.count && counts[item.count] !== undefined && (
                  <span className="nav-count">{counts[item.count]}</span>
                )}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-foot">
        <div className="avatar">GD</div>
        <div>
          <div className="who-name">Gugus Darmayanto</div>
          <div className="who-role">{user}</div>
        </div>
      </div>
    </aside>
  )
}
