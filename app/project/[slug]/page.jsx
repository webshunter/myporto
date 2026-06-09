import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProjectBySlug, urlFor } from '@/lib/sanity'
import BlockContentClient from '@/component/BlockContentClient'
import SiteHeader from '@/component/SiteHeader'
import SiteFooter from '@/component/SiteFooter'
import ProjectGalleryWithModal from '@/component/ProjectGalleryWithModal'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    }
  }

  return {
    title: `${project.name} | Projects - Gugus Darmayanto`,
    description: project.description,
  }
}

export const revalidate = 60

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const formattedDate = project._createdAt
    ? new Date(project._createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <div className="min-h-screen bg-navy text-white">
      <SiteHeader />

      <article className="max-w-4xl mx-auto px-6 lg:px-16 py-10">
        <Link href="/project" className="link-accent inline-flex items-center gap-2 mb-8 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>

        <span className="badge-accent mb-4 inline-block">Project</span>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          {project.name}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-800">
          {formattedDate && (
            <time className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formattedDate}
            </time>
          )}
          {project.galleryCount > 0 && (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {project.galleryCount} {project.galleryCount === 1 ? 'screenshot' : 'screenshots'}
            </span>
          )}
        </div>

        {project.description && (
          <p className="text-lg text-gray-300 leading-relaxed mb-8 pl-4 border-l-2 border-blue-500/50 italic">
            {project.description}
          </p>
        )}

        {project.icon && (
          <div className="mb-10 rounded-2xl overflow-hidden ring-1 ring-gray-800 border border-gray-800/80">
            <div className="relative h-64 md:h-[420px] bg-gray-900">
              <Image
                src={urlFor(project.icon).width(1200).height(630).url()}
                alt={project.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {project.content && (
          <div className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-p:leading-relaxed prose-li:text-gray-300 mb-10">
            <BlockContentClient blocks={project.content} />
          </div>
        )}

        <ProjectGalleryWithModal project={project} />

        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="store-panel flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <p className="font-bold text-white mb-1">Interested in similar work?</p>
              <p className="text-gray-400 text-sm">Explore more projects or reach out to discuss your next idea.</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/project" className="btn-outline text-sm !px-5 !py-2.5">
                More Projects
              </Link>
              <a
                href="https://wa.me/6285800455338"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm !px-5 !py-2.5"
              >
                Hire Me
              </a>
            </div>
          </div>
        </div>
      </article>

      <SiteFooter />
    </div>
  )
}
