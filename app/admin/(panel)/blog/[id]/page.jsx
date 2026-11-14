import Link from 'next/link'
import PostEditor from '@/components/admin/PostEditor'
import {
  getAdminPost,
  getAuthors,
  getCategories,
} from '@/lib/admin/data'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Editor artikel · Admin myporto', robots: { index: false } }

export default async function PostEditorPage({ params }) {
  const { id } = await params

  const [post, categories, authors] = await Promise.all([
    getAdminPost(id),
    getCategories(),
    getAuthors(),
  ])

  return (
    <>
      <div className="topbar">
        <Link className="btn btn-ghost" href="/admin/blog" aria-label="Kembali ke daftar blog">
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Link>
        <span className="crumb">Blog</span>
        <span className="crumb-sep">/</span>
        <span className="crumb" style={{ color: 'var(--text)' }}>
          {post?.title || 'Artikel baru'}
        </span>
        <div className="topbar-right">
          {post?.publishedAt && post?.slug && (
            <Link className="btn" href={`/blog/${post.slug}`} target="_blank">
              Lihat halaman
            </Link>
          )}
        </div>
      </div>

      <PostEditor post={post} categories={categories} authors={authors} />
    </>
  )
}
