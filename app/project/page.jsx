import Link from 'next/link'
import { getAllProjects } from '@/lib/sanity'
import SiteHeader from '@/component/SiteHeader'
import SiteFooter from '@/component/SiteFooter'
import ProjectCard, { ProjectCardFeatured } from '@/component/ProjectCard'

export const metadata = {
  title: 'Projects | Gugus Darmayanto',
  description: 'A collection of web and mobile projects — from apps to full-stack solutions.',
}

export const revalidate = 60

export default async function ProjectPage() {
  const projects = await getAllProjects()
  const [featuredProject, ...restProjects] = projects

  return (
    <div className="min-h-screen bg-navy text-white">
      <SiteHeader />

      <section className="py-16 px-6 lg:px-16 bg-gradient-to-b from-navy-light to-navy border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-blue-400 font-medium mb-3 tracking-wide uppercase text-sm">Portfolio Showcase</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            My <span className="text-blue-400">Projects</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            A collection of projects I&apos;ve built — from web apps to mobile solutions and custom software.
          </p>
          <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full" />
          {projects.length > 0 && (
            <p className="mt-6 text-sm text-gray-500">
              {projects.length} {projects.length === 1 ? 'project' : 'projects'} completed
            </p>
          )}
        </div>
      </section>

      <section className="py-16 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {projects.length === 0 ? (
            <div className="text-center py-16 store-panel">
              <svg className="w-16 h-16 mx-auto mb-4 text-blue-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h2 className="text-2xl font-bold mb-4">No Projects Yet</h2>
              <p className="text-gray-400">Projects will appear here soon!</p>
            </div>
          ) : (
            <>
              {featuredProject && <ProjectCardFeatured project={featuredProject} />}
              {restProjects.length > 0 && (
                <>
                  <h2 className="section-heading mb-8">More Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {restProjects.map((project) => (
                      <ProjectCard key={project._id} project={project} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      <section className="py-16 px-6 lg:px-16 bg-navy-surface/50 border-t border-gray-800/50">
        <div className="max-w-2xl mx-auto store-panel text-center">
          <h2 className="text-2xl font-bold mb-2">Have a Project in Mind?</h2>
          <p className="text-gray-400 mb-6 text-sm">
            I&apos;m available for freelance work on Fiverr. Let&apos;s discuss your requirements and bring your idea to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/6285800455338"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary whitespace-nowrap"
            >
              Hire Me on WhatsApp
            </a>
            <Link href="/#contact" className="btn-outline whitespace-nowrap">
              Contact Me
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
