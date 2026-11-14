import Link from 'next/link'
import { getAdminPosts } from '@/lib/admin/data'
import { formatDate, formatRelative } from '@/lib/admin/format'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Blog · Admin myporto', robots: { index: false } }

export default async function BlogListPage({ searchParams }) {
  const params = await searchParams
  const status = params?.status === 'terbit' ? 'terbit' : params?.status === 'draf' ? 'draf' : 'semua'

  const allPosts = await getAdminPosts()
  const posts = allPosts.filter((post) => {
    if (status === 'terbit') return Boolean(post.publishedAt)
    if (status === 'draf') return !post.publishedAt
    return true
  })

  return (
    <>
      <div className="topbar">
        <h1>Blog</h1>
        <span className="crumb">
          {allPosts.length} artikel, {allPosts.filter((p) => p.publishedAt).length} terbit
        </span>
        <div className="topbar-right">
          <Link className="btn btn-primary" href="/admin/blog/new">
            <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Tulis artikel
          </Link>
        </div>
      </div>

      <div className="page">
        <section className="card">
          <div className="card-head">
            <div className="seg">
              <Link className={status === 'semua' ? 'is-on' : ''} href="/admin/blog">Semua</Link>
              <Link className={status === 'terbit' ? 'is-on' : ''} href="/admin/blog?status=terbit">Terbit</Link>
              <Link className={status === 'draf' ? 'is-on' : ''} href="/admin/blog?status=draf">Draf</Link>
            </div>
            <div className="spacer" />
            <span className="card-sub">Diurutkan: terbaru</span>
          </div>

          {posts.length === 0 ? (
            <div className="card-body">
              <div className="empty">
                <div className="empty-title">Belum ada artikel</div>
                <p className="empty-text">
                  Artikel pertama akan muncul di /blog dan kartu homepage setelah diterbitkan.
                </p>
                <Link className="btn btn-primary" href="/admin/blog/new">
                  Tulis artikel pertama
                </Link>
              </div>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Status</th>
                  <th>Kategori</th>
                  <th>Diperbarui</th>
                  <th style={{ width: 40 }} />
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post._id}>
                    <td>
                      <div className="cell-main">
                        <div className="thumb">{(post.title ?? 'A').slice(0, 1).toUpperCase()}</div>
                        <div>
                          <Link className="row-link" href={`/admin/blog/${post._id}`}>
                            {post.title || 'Tanpa judul'}
                          </Link>
                          <div className="td-sub">
                            {post.hasBody ? `/blog/${post.slug ?? ''}` : 'Belum ada isi'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`pill ${post.publishedAt ? 'is-live' : 'is-draft'}`}>
                        {post.publishedAt ? 'Terbit' : 'Draf'}
                      </span>
                    </td>
                    <td>{post.categories?.length ? post.categories.join(', ') : '—'}</td>
                    <td className="num" title={formatDate(post._updatedAt)}>
                      {formatRelative(post._updatedAt)}
                    </td>
                    <td>
                      <Link className="icon-btn" href={`/admin/blog/${post._id}`} aria-label="Edit artikel">
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M4 20h4L20 8l-4-4L4 16z" />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </>
  )
}
