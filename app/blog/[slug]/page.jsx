import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPostBySlug, urlFor } from '@/lib/sanity'
import BlogBody from '@/components/BlogBody'
import BlogHeader from '@/component/BlogHeader'
import SiteFooter from '@/component/SiteFooter'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: `${post.title} | Blog - Gugus Darmayanto`,
    description: post.excerpt,
  }
}

export const revalidate = 60

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-navy text-white">
      <BlogHeader />

      <article className="max-w-4xl mx-auto px-6 lg:px-16 py-10">
        <Link href="/blog" className="link-accent inline-flex items-center gap-2 mb-8 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category) => (
              <span key={category} className="badge-accent">
                {category}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-800">
          <time className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formattedDate}
          </time>
          {post.author && (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {post.author}
            </span>
          )}
        </div>

        {post.excerpt && (
          <p className="text-lg text-gray-300 leading-relaxed mb-8 pl-4 border-l-2 border-blue-500/50 italic">
            {post.excerpt}
          </p>
        )}

        {post.mainImage && (
          <div className="mb-10 rounded-2xl overflow-hidden ring-1 ring-gray-800 border border-gray-800/80">
            <div className="relative h-64 md:h-[420px]">
              <Image
                src={urlFor(post.mainImage).width(1200).height(630).url()}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        <div className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-p:leading-relaxed prose-li:text-gray-300">
          <BlogBody value={post.body} />
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="store-panel flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <p className="font-bold text-white mb-1">Enjoyed this article?</p>
              <p className="text-gray-400 text-sm">Explore more posts or get in touch for your next project.</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/blog" className="btn-outline text-sm !px-5 !py-2.5">
                More Articles
              </Link>
              <a href="/#contact" className="btn-primary text-sm !px-5 !py-2.5">
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </article>

      <SiteFooter />
    </div>
  )
}
