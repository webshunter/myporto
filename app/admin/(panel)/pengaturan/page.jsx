import { logout, revalidateContentAction } from '@/app/admin/actions'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Pengaturan · Admin myporto', robots: { index: false } }

const REVALIDATE_TYPES = [
  { type: 'blog', label: 'Blog', desc: 'Halaman /blog dan /blog/[slug]' },
  { type: 'project', label: 'Projects', desc: 'Halaman /project dan /project/[slug]' },
  { type: 'app', label: 'Aplikasi', desc: 'Halaman /store dan /store/[slug]' },
  { type: 'category', label: 'Kategori', desc: 'Kategori memengaruhi blog dan store' },
  { type: 'transaction', label: 'Transaksi', desc: 'Data transaksi dan halaman store' },
]

export default function SettingsPage({ searchParams }) {
  const integrations = [
    {
      label: 'Sanity API token',
      ok: Boolean(process.env.SANITY_API_TOKEN),
      note: 'Dibutuhkan untuk menyimpan konten dari admin.',
    },
    {
      label: 'Sanity webhook secret',
      ok: Boolean(process.env.SANITY_WEBHOOK_SECRET),
      note: 'Mengamankan /api/sanity-webhook.',
    },
    {
      label: 'Stripe secret key',
      ok: Boolean(process.env.STRIPE_SECRET_KEY),
      note: 'Dibutuhkan untuk pembayaran aplikasi berbayar.',
    },
    {
      label: 'Blog API key (MCP)',
      ok: Boolean(process.env.BLOG_API_KEY),
      note: 'Dipakai /api/posts dan /api/mcp untuk membuat artikel otomatis.',
    },
    {
      label: 'DeepSeek API key',
      ok: Boolean(process.env.DEEPSEEK_API_KEY),
      note: 'Menyalakan tombol koreksi & ringkasan AI di editor.',
    },
    {
      label: 'Google Analytics',
      ok: Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
      note: 'Tracking aktif, tetapi grafik kunjungan butuh akses GA4 Data API.',
    },
  ]

  return (
    <>
      <div className="topbar">
        <h1>Pengaturan</h1>
        <span className="crumb">Integrasi, cache, dan sesi</span>
      </div>

      <div className="page">
        <div className="grid-2">
          <section className="card">
            <div className="card-head">
              <div>
                <div className="card-title">Revalidate cache</div>
                <div className="card-sub">Jalankan setelah mengubah data langsung di Sanity</div>
              </div>
            </div>
            <div className="card-body">
              <div className="section-list">
                {REVALIDATE_TYPES.map((item) => (
                  <div className="section-row" key={item.type} style={{ gridTemplateColumns: 'minmax(0,1fr) auto' }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{item.label}</div>
                      <div className="hint">{item.desc}</div>
                    </div>
                    <form action={revalidateContentAction}>
                      <input type="hidden" name="type" value={item.type} />
                      <button className="btn btn-sm" type="submit">
                        Revalidate
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="card">
            <div className="card-head">
              <div className="card-title">Integrasi</div>
            </div>
            <div className="card-body">
              <div className="section-list">
                {integrations.map((item) => (
                  <div className="section-row" key={item.label} style={{ gridTemplateColumns: 'minmax(0,1fr) auto' }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{item.label}</div>
                      <div className="hint">{item.note}</div>
                    </div>
                    <span className={`pill ${item.ok ? 'is-live' : 'is-draft'}`}>
                      {item.ok ? 'Aktif' : 'Belum diatur'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <section className="card">
          <div className="card-head">
            <div className="card-title">Sesi</div>
          </div>
          <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="hint">
              Sesi admin berlaku 8 jam dan disimpan di cookie HttpOnly.
            </span>
            <form action={logout} style={{ marginLeft: 'auto' }}>
              <button className="btn is-danger" type="submit">
                Keluar
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  )
}
