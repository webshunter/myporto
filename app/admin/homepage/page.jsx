import Link from 'next/link'
import { getPortfolioDoc } from '@/lib/admin/data'
import { savePortfolio } from '@/app/admin/actions'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Homepage · Admin myporto', robots: { index: false } }

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

function photoUrl(ref) {
  if (!ref || !projectId) return null
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${ref.replace(/^image-/, '')}`
}

export default async function HomepageAdminPage({ searchParams }) {
  const params = await searchParams
  const profile = await getPortfolioDoc()

  if (!profile) {
    return (
      <div className="page">
        <div className="empty">
          <div className="empty-title">Dokumen profil tidak ditemukan</div>
          <p className="empty-text">Buat dokumen `portofolio` di Sanity terlebih dahulu.</p>
        </div>
      </div>
    )
  }

  const sections = [
    { label: 'Pengalaman kerja', count: profile.experience?.length ?? 0 },
    { label: 'Pendidikan', count: profile.education?.length ?? 0 },
    { label: 'Layanan', count: profile.services?.length ?? 0 },
    { label: 'Keahlian', count: profile.skills?.length ?? 0 },
    { label: 'Project unggulan', count: profile.project?.length ?? 0 },
  ]

  const photo = photoUrl(profile.image?.asset?._ref)

  return (
    <>
      <div className="topbar">
        <span className="crumb">Homepage</span>
        <span className="crumb-sep">/</span>
        <span className="crumb" style={{ color: 'var(--text)' }}>Profil &amp; kontak</span>
        <div className="topbar-right">
          <Link className="btn" href="/" target="_blank">
            Lihat halaman
          </Link>
        </div>
      </div>

      <div className="page">
        <div className="page-head">
          <div>
            <h2 className="page-title">Profil &amp; kontak</h2>
            <p className="page-sub">Dipakai di hero homepage, footer, dan halaman kontak.</p>
          </div>
        </div>

        {params?.ok && <div className="notice is-ok">Perubahan tersimpan.</div>}
        {params?.error && <div className="notice">Gagal menyimpan perubahan.</div>}

        <div className="profile-grid">
          <form action={savePortfolio} style={{ display: 'flex', flexDirection: 'column', gap: 17 }}>
            <input type="hidden" name="id" value={profile._id} />

            <section className="card">
              <div className="card-head">
                <div className="card-title">Identitas</div>
              </div>
              <div className="card-body">
                <div className="form-grid">
                  <div className="field is-wide">
                    <label className="label" htmlFor="name">Nama lengkap</label>
                    <input id="name" className="input" name="name" defaultValue={profile.name ?? ''} required />
                  </div>
                  <div className="field is-wide">
                    <label className="label" htmlFor="headtitle">Headline</label>
                    <input id="headtitle" className="input" name="headtitle" defaultValue={profile.headtitle ?? ''} />
                    <span className="hint">Satu baris, muncul di bawah nama pada hero.</span>
                  </div>
                  <div className="field is-wide">
                    <label className="label" htmlFor="description">Bio</label>
                    <textarea id="description" className="textarea" name="description" rows={4} defaultValue={profile.description ?? ''} />
                  </div>
                  <div className="field is-wide">
                    <span className="label">Foto profil</span>
                    <div className="image-field">
                      {photo ? (
                        <img className="photo" style={{ width: 84, height: 84 }} src={photo} alt="" />
                      ) : (
                        <div className="image-preview is-empty">Kosong</div>
                      )}
                      <div className="photo-actions">
                        <Link className="btn btn-sm" href="/studio" target="_blank">
                          Ganti di Studio
                        </Link>
                        <span className="hint">PNG transparan, 500 × 500 px.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="card">
              <div className="card-head">
                <div className="card-title">Kontak &amp; tautan</div>
              </div>
              <div className="card-body">
                <div className="form-grid">
                  <div className="field">
                    <label className="label" htmlFor="email">Email</label>
                    <input id="email" className="input" name="email" type="email" defaultValue={profile.email ?? ''} />
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="location">Lokasi</label>
                    <input id="location" className="input" name="location" defaultValue={profile.location ?? ''} />
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="github">GitHub</label>
                    <input id="github" className="input is-mono" name="github" defaultValue={profile.github ?? ''} />
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="linkcv">Link CV</label>
                    <input id="linkcv" className="input is-mono" name="linkcv" defaultValue={profile.linkcv ?? ''} />
                  </div>
                  <div className="field is-wide">
                    <label className="label" htmlFor="language">Bahasa</label>
                    <input id="language" className="input" name="language" defaultValue={profile.language ?? ''} />
                  </div>
                </div>
              </div>
            </section>

            <div className="form-actions">
              <button className="btn btn-primary" type="submit">Simpan perubahan</button>
              <span className="hint">Perubahan langsung tampil di situs setelah revalidate.</span>
            </div>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 17 }}>
            <section className="card">
              <div className="card-head">
                <div className="card-title">Pratinjau hero</div>
              </div>
              <div className="card-body">
                <div className="hero-preview">
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    {photo ? (
                      <img className="photo" style={{ width: 52, height: 52 }} src={photo} alt="" />
                    ) : (
                      <div className="avatar">GD</div>
                    )}
                    <div>
                      <div className="preview-name">{profile.name}</div>
                      <div className="preview-head">{profile.headtitle}</div>
                    </div>
                  </div>
                  <p className="preview-desc">{profile.description}</p>
                  <div className="preview-meta">
                    <div className="preview-meta-row">{profile.email}</div>
                    <div className="preview-meta-row">{profile.location}</div>
                    <div className="preview-meta-row">{profile.github}</div>
                  </div>
                </div>
                <div className="hint" style={{ marginTop: 10 }}>
                  Pratinjau mengikuti tema situs, bukan tema admin.
                </div>
              </div>
            </section>

            <section className="card">
              <div className="card-head">
                <div className="card-title">Bagian homepage</div>
                <div className="spacer" />
                <Link className="link" href="/studio" target="_blank">
                  Atur di Studio
                </Link>
              </div>
              <div className="card-body" style={{ paddingTop: 4 }}>
                <div className="section-list">
                  {sections.map((section) => (
                    <div className="section-row" key={section.label}>
                      <span className="drag">
                        <svg aria-hidden="true" width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="9" cy="6" r="1.6" />
                          <circle cx="15" cy="6" r="1.6" />
                          <circle cx="9" cy="12" r="1.6" />
                          <circle cx="15" cy="12" r="1.6" />
                          <circle cx="9" cy="18" r="1.6" />
                          <circle cx="15" cy="18" r="1.6" />
                        </svg>
                      </span>
                      <span>{section.label}</span>
                      <span className="count">{section.count} entri</span>
                    </div>
                  ))}
                </div>
                <div className="hint" style={{ marginTop: 10 }}>
                  Editor untuk pengalaman, pendidikan, layanan, dan keahlian menyusul. Sementara masih lewat Studio.
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
