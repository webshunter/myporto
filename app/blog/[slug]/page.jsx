import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPostBySlug, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import BlogHeader from '@/component/BlogHeader'

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug)
  
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

export const revalidate = 60 // Revalidate this page every 60 seconds

export default async function BlogPost({ params }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <BlogHeader />

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 lg:px-16 py-12">
        <Link href="/blog" className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-8">
          ← Back to Blog
        </Link>
        
        {post.mainImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <div className="relative h-64 md:h-96">
              <Image
                src={urlFor(post.mainImage).width(1200).height(600).url()}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
        
        <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
          <time>📅 {new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</time>
          {post.author && <span>👤 {post.author}</span>}
        </div>

        {post.categories && post.categories.length > 0 && (
          <div className="flex gap-3 mb-6">
            {post.categories.map((category) => (
              <span key={category} className="bg-yellow-400/20 text-yellow-400 px-4 py-2 rounded-full text-sm border border-yellow-400/30">
                {category}
              </span>
            ))}
          </div>
        )}

        <div className="prose prose-lg prose-invert max-w-none text-gray-300">
          <PortableText value={post.body} />
        </div>
      </article>

      <footer className="py-8 px-6 lg:px-16 border-t border-gray-800 text-center">
        <p className="text-gray-400">© 2024 Gugus Darmayanto. All rights reserved.</p>
      </footer>
    </div>
  )
} 