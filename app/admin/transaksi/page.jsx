import { getRecentTransactions } from '@/lib/admin/data'
import { formatDate, formatMoney } from '@/lib/admin/format'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Transaksi · Admin myporto', robots: { index: false } }

const STATUS_LABEL = {
  completed: 'Selesai',
  pending: 'Menunggu',
  failed: 'Gagal',
  refunded: 'Refund',
}

export default async function TransactionsPage() {
  const transactions = await getRecentTransactions(50)
  const paid = transactions.filter((tx) => tx.amount > 0)
  const revenue = paid.reduce((sum, tx) => sum + (tx.amount || 0), 0)

  return (
    <>
      <div className="topbar">
        <h1>Transaksi</h1>
        <span className="crumb">{transactions.length} transaksi tercatat</span>
      </div>

      <div className="page">
        <div className="stats">
          <div className="stat">
            <div className="stat-label">Total transaksi</div>
            <div className="stat-figure">{transactions.length}</div>
            <div className="stat-note">Semua waktu</div>
          </div>
          <div className="stat">
            <div className="stat-label">Berbayar</div>
            <div className="stat-figure">{paid.length}</div>
            <div className="stat-note">Transaksi dengan nominal</div>
          </div>
          <div className="stat">
            <div className="stat-label">Pendapatan</div>
            <div className="stat-figure">{formatMoney(revenue)}</div>
            <div className="stat-note">Dari transaksi berbayar</div>
          </div>
          <div className="stat">
            <div className="stat-label">Unduhan gratis</div>
            <div className="stat-figure">{transactions.length - paid.length}</div>
            <div className="stat-note">Nominal nol</div>
          </div>
        </div>

        <section className="card">
          <div className="card-head">
            <div className="card-title">Semua transaksi</div>
            <div className="spacer" />
            <span className="card-sub">Terbaru di atas</span>
          </div>

          {transactions.length === 0 ? (
            <div className="card-body">
              <div className="empty">
                <div className="empty-title">Belum ada transaksi</div>
                <p className="empty-text">Transaksi tercatat saat pengunjung mengunduh atau membeli aplikasi.</p>
              </div>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Aplikasi</th>
                  <th>Pembeli</th>
                  <th>Metode</th>
                  <th>Nominal</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx._id}>
                    <td className="num" title={tx.transactionId}>{tx.transactionId}</td>
                    <td>
                      <div className="cell-main">
                        <div className="thumb">{(tx.app ?? '?').slice(0, 1)}</div>
                        <strong>{tx.app ?? '—'}</strong>
                      </div>
                    </td>
                    <td>{tx.customerEmail}</td>
                    <td>{tx.method === 'free' ? 'Gratis' : tx.method ?? '—'}</td>
                    <td>{formatMoney(tx.amount)}</td>
                    <td className="num">{formatDate(tx.createdAt)}</td>
                    <td>
                      <span className={`pill ${tx.status === 'completed' ? 'is-live' : 'is-draft'}`}>
                        {STATUS_LABEL[tx.status] ?? tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </>
  )
}
