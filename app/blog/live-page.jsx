'use client'

import { useEffect, useState } from 'react'
import { getAllPosts } from '@/lib/sanity'
import { useBlogLive } from '@/lib/useSanityLive'
import BlogHeader from '@/component/BlogHeader'
import SiteFooter from '@/component/SiteFooter'
import BlogPostCard, { BlogPostCardFeatured } from '@/component/BlogPostCard'

export default function BlogLivePage() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { data: livePosts } = useBlogLive()

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true)
        const initialPosts = await getAllPosts()
        setPosts(initialPosts)
      } catch (error) {
        console.error('Error loading posts:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadPosts()
  }, [])

  useEffect(() => {
    if (livePosts) {
      setPosts(livePosts)
    }
  }, [livePosts])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-navy text-white">
        <BlogHeader />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-400">Loading blog posts...</p>
          </div>
        </div>
      </div>
    )
  }

  const [featuredPost, ...restPosts] = posts

  return (
    <div className="min-h-screen bg-navy text-white">
      <BlogHeader />

      <section className="py-16 px-6 lg:px-16 bg-gradient-to-b from-navy-light to-navy border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-blue-400 font-medium mb-3 tracking-wide uppercase text-sm">Insights & Tutorials</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            My <span className="text-blue-400">Blog</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Sharing insights about technology, development practices, and the latest trends in programming.
          </p>
          <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full" />
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm text-gray-500">Live updates enabled</span>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16 store-panel">
              <p className="text-4xl mb-4">📝</p>
              <h2 className="text-2xl font-bold mb-4">No Posts Yet</h2>
              <p className="text-gray-400">Blog posts will appear here soon!</p>
            </div>
          ) : (
            <>
              {featuredPost && <BlogPostCardFeatured post={featuredPost} />}
              {restPosts.length > 0 && (
                <>
                  <h2 className="section-heading mb-8">More Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {restPosts.map((post) => (
                      <BlogPostCard key={post._id} post={post} />
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
          <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
          <p className="text-gray-400 mb-6 text-sm">
            Get notified when I publish new articles about technology and development.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="email" placeholder="your@email.com" className="input-dark flex-1" />
            <button type="button" className="btn-primary whitespace-nowrap">Subscribe</button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
