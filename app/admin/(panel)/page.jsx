import Link from 'next/link'
import {
  getAdminCounts,
  getRecentActivity,
  getRecentTransactions,
} from '@/lib/admin/data'
import { formatDate, formatMoney, formatRelative } from '@/lib/admin/format'

export const dynamic = 'force-dynamic'

const TYPE_LABEL = { blog: 'Artikel', project: 'Project', app: 'Aplikasi' }

export default async function DashboardPage() {
  const [counts, transactions, activity] = await Promise.all([
    getAdminCounts(),
    getRecentTransactions(4),
    getRecentActivity(5),
  ])

  const bars = [
    { name: 'Keahlian', value: counts.skills, max: Math.max(counts.skills, 1) },
    { name: 'Projects', value: counts.projects, max: Math.max(counts.skills, 1) },
    { name: 'Layanan', value: counts.services, max: Math.max(counts.skills, 1) },
    { name: 'Aplikasi', value: counts.apps, max: Math.max(counts.skills, 1) },
    { name: 'Pengalaman', value: counts.experience, max: Math.max(counts.skills, 1) },
    { name: 'Pendidikan', value: counts.education, max: Math.max(counts.skills, 1) },
    { name: 'Artikel', value: counts.blog, max: Math.max(counts.skills, 1) },
  ]

  return (
    <>
      <div className="topbar">
        <h1>Dashboard</h1>
        <span className="crumb">Ringkasan konten dan aktivitas situs</span>
        <div className="topbar-right">
          <Link className="btn btn-ghost" href="/" target="_blank">
            Lihat situs
          </Link>
          <div className="avatar">GD</div>
        </div>
      </div>

      <div className="page">
        <div className="stats">
          <div className="stat">
            <div className="stat-label">Artikel</div>
            <div className="stat-figure">{counts.blog}</div>
            <div className="stat-note">
              <b>{counts.blogPublished}</b> terbit, {counts.blog - counts.blogPublished} draf
            </div>
          </div>
          <div className="stat">
            <div className="stat-label">Projects</div>
            <div className="stat-figure">{counts.projects}</div>
            <div className="stat-note">
              <b>{counts.featuredProjects}</b> tampil di homepage
            </div>
          </div>
          <div className="stat">
            <div className="stat-label">Aplikasi</div>
            <div className="stat-figure">{counts.apps}</div>
            <div className="stat-note">Aktif di store</div>
          </div>
          <div className="stat">
            <div className="stat-label">Transaksi</div>
            <div className="stat-figure">{counts.transactions}</div>
            <div className="stat-note">Semua unduhan gratis</div>
          </div>
        </div>

        <div className="grid-2">
          <section className="card">
            <div className="card-head">
              <div>
                <div className="card-title">Kunjungan</div>
                <div className="card-sub">30 hari terakhir, Google Analytics</div>
              </div>
            </div>
            <div className="card-body">
              <div className="empty">
                <div className="empty-title">Belum terhubung ke Google Analytics</div>
                <p className="empty-text">
                  Tambahkan kredensial GA4 di pengaturan untuk menampilkan grafik kunjungan di sini.
                </p>
                <Link className="btn" href="/admin/pengaturan">
                  Buka pengaturan
                </Link>
              </div>
            </div>
          </section>

          <section className="card">
            <div className="card-head">
              <div className="card-title">Isi konten</div>
              <div className="spacer" />
              <span className="card-sub">total dokumen</span>
            </div>
            <div className="card-body is-fill">
              <div className="bars">
                {bars.map((bar) => (
                  <div className="bar-row" key={bar.name}>
                    <span className="bar-name">{bar.name}</span>
                    <span className="bar-track">
                      <span
                        className={`bar-fill${bar.value === 0 ? ' is-dim' : ''}`}
                        style={{ width: `${Math.max((bar.value / bar.max) * 100, bar.value ? 2 : 1)}%` }}
                      />
                    </span>
                    <span className="bar-value">{bar.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="grid-2">
          <section className="card">
            <div className="card-head">
              <div className="card-title">Transaksi terbaru</div>
              <div className="spacer" />
              <Link className="link" href="/admin/transaksi">
                Lihat semua
              </Link>
            </div>
            {transactions.length === 0 ? (
              <div className="card-body">
                <div className="empty">
                  <div className="empty-title">Belum ada transaksi</div>
                  <p className="empty-text">Transaksi muncul setelah ada unduhan atau pembelian aplikasi.</p>
                </div>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Aplikasi</th>
                    <th>Pembeli</th>
                    <th>Nominal</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx._id}>
                      <td>
                        <div className="cell-main">
                          <div className="thumb">{(tx.app ?? '?').slice(0, 1)}</div>
                          <strong>{tx.app ?? 'Tanpa aplikasi'}</strong>
                        </div>
                      </td>
                      <td>{tx.customerEmail}</td>
                      <td>{formatMoney(tx.amount)}</td>
                      <td className="num">{formatDate(tx.createdAt)}</td>
                      <td>
                        <span className={`pill ${tx.status === 'completed' ? 'is-live' : 'is-draft'}`}>
                          {tx.status === 'completed' ? 'Selesai' : tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          <section className="card">
            <div className="card-head">
              <div className="card-title">Aktivitas</div>
            </div>
            <div className="card-body" style={{ paddingTop: 4, paddingBottom: 12 }}>
              {activity.length === 0 ? (
                <div className="empty">
                  <div className="empty-title">Belum ada aktivitas</div>
                </div>
              ) : (
                <div className="activity">
                  {activity.map((item) => (
                    <div className="act" key={item._id}>
                      <span className="act-icon">
                        <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 20h4L20 8l-4-4L4 16z" />
                        </svg>
                      </span>
                      <div className="act-text">
                        <b>{item.label ?? 'Tanpa judul'}</b> diperbarui
                        <div className="hint">{TYPE_LABEL[item._type] ?? item._type}</div>
                      </div>
                      <div className="act-time num">{formatRelative(item._updatedAt)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
