import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function ProjectMeta({ project }) {
  if (!project._createdAt) return null
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
      <time className="flex items-center gap-1.5">
        <svg className="w-4 h-4 text-blue-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {formatDate(project._createdAt)}
      </time>
      {project.galleryCount > 0 && (
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-blue-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {project.galleryCount} {project.galleryCount === 1 ? 'screenshot' : 'screenshots'}
        </span>
      )}
    </div>
  )
}

export function ProjectCardFeatured({ project }) {
  return (
    <Link
      href={`/project/${project.slug.current}`}
      className="card-dark-hover block md:flex overflow-hidden mb-10 group"
    >
      {project.icon ? (
        <div className="relative h-56 md:h-auto md:w-2/5 shrink-0 overflow-hidden bg-gray-900">
          <Image
            src={urlFor(project.icon).width(800).height(500).url()}
            alt={project.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-navy/80 via-transparent to-transparent" />
          <span className="absolute top-4 left-4 badge-accent bg-blue-500/25">Featured Project</span>
        </div>
      ) : (
        <div className="relative h-56 md:h-auto md:w-2/5 shrink-0 overflow-hidden bg-gradient-to-br from-navy-light to-gray-900 flex items-center justify-center">
          <svg className="w-16 h-16 text-blue-400/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className="absolute top-4 left-4 badge-accent bg-blue-500/25">Featured Project</span>
        </div>
      )}
      <div className="p-8 md:w-3/5 flex flex-col justify-center">
        <ProjectMeta project={project} />
        <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-3 text-white group-hover:text-blue-400 transition-colors line-clamp-2">
          {project.name}
        </h2>
        {project.description && (
          <p className="text-gray-400 line-clamp-3 mb-6 leading-relaxed">{project.description}</p>
        )}
        <span className="link-accent inline-flex items-center mt-auto">
          View project
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

export default function ProjectCard({ project }) {
  return (
    <article className="card-dark-hover overflow-hidden flex flex-col h-full group hover:scale-[1.02]">
      <Link href={`/project/${project.slug.current}`} className="relative h-48 overflow-hidden block bg-gray-900">
        {project.icon ? (
          <Image
            src={urlFor(project.icon).width(400).height(200).url()}
            alt={project.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-light to-gray-900">
            <svg className="w-12 h-12 text-blue-400/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <ProjectMeta project={project} />
        <Link href={`/project/${project.slug.current}`}>
          <h2 className="text-xl font-bold mt-3 mb-3 hover:text-blue-400 transition-colors line-clamp-2">
            {project.name}
          </h2>
        </Link>
        {project.description && (
          <p className="text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed flex-grow">{project.description}</p>
        )}
        <Link href={`/project/${project.slug.current}`} className="link-accent inline-flex items-center mt-auto text-sm group/link">
          View details
          <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </article>
  )
}
