import Link from 'next/link'
import ProjectEditor from '@/components/admin/ProjectEditor'
import { getAdminProject } from '@/lib/admin/data'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Editor project · Admin myporto', robots: { index: false } }

export default async function ProjectEditorPage({ params }) {
  const { id } = await params
  const project = await getAdminProject(id)

  return (
    <>
      <div className="topbar">
        <Link className="btn btn-ghost" href="/admin/projects" aria-label="Kembali ke daftar project">
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Link>
        <span className="crumb">Projects</span>
        <span className="crumb-sep">/</span>
        <span className="crumb" style={{ color: 'var(--text)' }}>
          {project?.name || 'Project baru'}
        </span>
        <div className="topbar-right">
          {project?.slug && (
            <Link className="btn" href={`/project/${project.slug}`} target="_blank">
              Lihat halaman
            </Link>
          )}
        </div>
      </div>

      <ProjectEditor project={project} />
    </>
  )
}
