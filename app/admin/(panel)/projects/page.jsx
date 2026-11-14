import Link from 'next/link'
import { getAdminProjects } from '@/lib/admin/data'
import { formatDate, formatRelative } from '@/lib/admin/format'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Projects · Admin myporto', robots: { index: false } }

export default async function ProjectsPage() {
  const projects = await getAdminProjects()
  const withoutDescription = projects.filter((p) => !p.description)

  return (
    <>
      <div className="topbar">
        <h1>Projects</h1>
        <span className="crumb">
          {projects.length} project, {projects.filter((p) => p.gallery > 0).length} punya galeri
        </span>
        <div className="topbar-right">
          <Link className="btn btn-primary" href="/admin/projects/new">
            <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Project baru
          </Link>
        </div>
      </div>

      <div className="page">
        <section className="card">
          <div className="card-head">
            <span className="card-sub">{projects.length} project</span>
            <div className="spacer" />
            <span className="card-sub">Diurutkan: terbaru diubah</span>
          </div>

          {projects.length === 0 ? (
            <div className="card-body">
              <div className="empty">
                <div className="empty-title">Belum ada project</div>
                <p className="empty-text">Tambahkan project pertama untuk ditampilkan di /project dan homepage.</p>
                <Link className="btn btn-primary" href="/admin/projects/new">
                  Project pertama
                </Link>
              </div>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Slug</th>
                  <th>Galeri</th>
                  <th>Diperbarui</th>
                  <th>Status</th>
                  <th style={{ width: 40 }} />
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id}>
                    <td>
                      <div className="cell-main">
                        <div className="thumb">{project.name.slice(0, 2).toUpperCase()}</div>
                        <div>
                          <Link className="row-link" href={`/admin/projects/${project._id}`}>
                            {project.name}
                          </Link>
                          <div className="td-sub">
                            {project.description || 'Belum ada deskripsi'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="num">{project.slug ? `/project/${project.slug}` : '—'}</td>
                    <td className="num">{project.gallery ?? 0}</td>
                    <td className="num" title={formatDate(project._updatedAt)}>
                      {formatRelative(project._updatedAt)}
                    </td>
                    <td>
                      <span className={`pill ${project.description ? 'is-live' : 'is-draft'}`}>
                        {project.description ? 'Lengkap' : 'Perlu diisi'}
                      </span>
                    </td>
                    <td>
                      <Link className="icon-btn" href={`/admin/projects/${project._id}`} aria-label="Edit project">
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M4 20h4L20 8l-4-4L4 16z" />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {withoutDescription.length > 0 && (
          <section className="card">
            <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div>
                <div className="card-title">
                  {withoutDescription.length} project belum punya deskripsi singkat
                </div>
                <div className="hint" style={{ marginTop: 3 }}>
                  Deskripsi dipakai di kartu homepage dan halaman /project.
                </div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                {withoutDescription.slice(0, 4).map((p) => (
                  <Link key={p._id} className="btn" href={`/admin/projects/${p._id}`}>
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
