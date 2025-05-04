import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, urlFor } from '@/lib/sanity'

export const metadata = {
  title: 'Blog | My Portfolio',
  description: 'Read my latest blog posts about technology, development, and more.',
}

export const revalidate = 60 // Revalidate this page every 60 seconds

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid gap-8">
        {posts.map((post) => (
          <article key={post._id} className="border-b border-gray-200 pb-8">
            {post.mainImage && (
              <div className="mb-4">
                <Image
                  src={urlFor(post.mainImage).width(800).height(400).url()}
                  alt={post.mainImage.alt || post.title}
                  width={800}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            )}
            <Link href={`/blog/${post.slug.current}`}>
              <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
            </Link>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
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
              <div className="flex gap-2 mb-4">
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
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug.current}`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
} 