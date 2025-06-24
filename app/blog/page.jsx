import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, urlFor } from '@/lib/sanity'
import BlogHeader from '@/component/BlogHeader'

export const metadata = {
  title: 'Blog | Gugus Darmayanto',
  description: 'Read my latest blog posts about technology, development, and programming insights.',
}

export const revalidate = 60 // Revalidate this page every 60 seconds

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="min-h-screen bg-black text-white">
      <BlogHeader />

      {/* Hero Section */}
      <section className="py-16 px-6 lg:px-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            My <span style={{color:'yellow'}}>Blog</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Sharing insights about technology, development practices, and the latest trends in programming.
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold mb-4">No Posts Yet</h2>
              <p className="text-gray-400">Blog posts will appear here soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post._id} className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-800">
                  {post.mainImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={urlFor(post.mainImage).width(400).height(200).url()}
                        alt={post.mainImage.alt || post.title}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <time className="flex items-center">
                        <span className="mr-2">📅</span>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                      {post.author && (
                        <span className="flex items-center">
                          <span className="mr-2">👤</span>
                          {post.author}
                        </span>
                      )}
                    </div>
                    
                    <Link href={`/blog/${post.slug.current}`}>
                      <h2 className="text-xl font-bold mb-3 hover:text-yellow-400 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>
                    
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex gap-2 mb-4 flex-wrap">
                        {post.categories.map((category) => (
                          <span
                            key={category}
                            className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-medium border border-yellow-400/30"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-medium transition-colors group"
                    >
                      Read more 
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6 lg:px-16 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-400 mb-8">
            Get notified when I publish new articles about technology and development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
            />
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 lg:px-16 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Gugus Darmayanto. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
} 