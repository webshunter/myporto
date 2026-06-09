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

function PostMeta({ post }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
      <time className="flex items-center gap-1.5">
        <svg className="w-4 h-4 text-blue-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {formatDate(post.publishedAt)}
      </time>
      {post.author && (
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-blue-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {post.author}
        </span>
      )}
    </div>
  )
}

function CategoryBadges({ categories }) {
  if (!categories?.length) return null
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((category) => (
        <span key={category} className="badge-accent">
          {category}
        </span>
      ))}
    </div>
  )
}

export function BlogPostCardFeatured({ post }) {
  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="card-dark-hover block md:flex overflow-hidden mb-10 group"
    >
      {post.mainImage && (
        <div className="relative h-56 md:h-auto md:w-2/5 shrink-0 overflow-hidden">
          <Image
            src={urlFor(post.mainImage).width(800).height(500).url()}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-navy/80 via-transparent to-transparent" />
          <span className="absolute top-4 left-4 badge-accent bg-blue-500/25">Latest Post</span>
        </div>
      )}
      <div className="p-8 md:w-3/5 flex flex-col justify-center">
        <PostMeta post={post} />
        <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-3 text-white group-hover:text-blue-400 transition-colors line-clamp-2">
          {post.title}
        </h2>
        <div className="mb-4">
          <CategoryBadges categories={post.categories} />
        </div>
        {post.excerpt && (
          <p className="text-gray-400 line-clamp-3 mb-6 leading-relaxed">{post.excerpt}</p>
        )}
        <span className="link-accent inline-flex items-center mt-auto">
          Read article
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

export default function BlogPostCard({ post }) {
  return (
    <article className="card-dark-hover overflow-hidden flex flex-col h-full group hover:scale-[1.02]">
      {post.mainImage && (
        <Link href={`/blog/${post.slug.current}`} className="relative h-48 overflow-hidden block">
          <Image
            src={urlFor(post.mainImage).width(400).height(200).url()}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
        </Link>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <PostMeta post={post} />
        <Link href={`/blog/${post.slug.current}`}>
          <h2 className="text-xl font-bold mt-3 mb-3 hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>
        <div className="mb-4">
          <CategoryBadges categories={post.categories} />
        </div>
        {post.excerpt && (
          <p className="text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed flex-grow">{post.excerpt}</p>
        )}
        <Link href={`/blog/${post.slug.current}`} className="link-accent inline-flex items-center mt-auto text-sm group/link">
          Read more
          <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </article>
  )
}
