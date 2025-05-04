import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPostBySlug, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: `${post.title} | Blog`,
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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/blog"
        className="text-blue-600 hover:text-blue-800 mb-8 inline-block"
      >
        ← Back to Blog
      </Link>
      
      <article className="prose lg:prose-xl mx-auto">
        {post.mainImage && (
          <div className="mb-8">
            <Image
              src={urlFor(post.mainImage).width(1200).height(600).url()}
              alt={post.mainImage.alt || post.title}
              width={1200}
              height={600}
              className="rounded-lg object-cover"
            />
          </div>
        )}
        
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
          <time>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {post.author && <span>by {post.author}</span>}
        </div>

        {post.categories && post.categories.length > 0 && (
          <div className="flex gap-2 mb-8">
            {post.categories.map((category) => (
              <span
                key={category}
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        <div className="prose prose-lg">
          <PortableText value={post.body} />
        </div>
      </article>
    </div>
  )
} 