import { liveClient } from '@/lib/sanity.server'
import { markdownToPortableText } from './markdown'
import { editorJsToPortableText } from './editorjs'
import { revalidateContent } from '@/lib/revalidate'

export function slugify(value = '', fallback = 'artikel') {
  const base = String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
  return base || `${fallback}-${Date.now()}`
}

function imageRefFromUrl(url = '') {
  const match = String(url).match(/\/images\/[^/]+\/[^/]+\/(.+)$/)
  return match ? `image-${match[1]}` : null
}

function normalizeBody(payload) {
  if (Array.isArray(payload.body) && payload.body.length) {
    return payload.body.filter((n) => n && n._type)
  }
  if (Array.isArray(payload.blocks) && payload.blocks.length) {
    return editorJsToPortableText(payload.blocks)
  }
  if (typeof payload.markdown === 'string' && payload.markdown.trim()) {
    return markdownToPortableText(payload.markdown).map((node) => {
      if (node._type !== 'image') return node
      const ref = imageRefFromUrl(node.url)
      if (!ref) return null
      return { ...node, asset: { _type: 'reference', _ref: ref }, url: undefined }
    }).filter(Boolean)
  }
  return []
}

async function resolveCategories(titles = []) {
  if (!Array.isArray(titles) || titles.length === 0) return []
  const docs = await liveClient.fetch(
    `*[_type == "category" && title in $titles]{_id, title}`,
    { titles }
  )
  return docs.map((doc, i) => ({ _type: 'reference', _ref: doc._id, _key: `cat${i}` }))
}

export async function createBlogPost(payload = {}) {
  const title = String(payload.title ?? '').trim()
  if (!title) return { ok: false, status: 400, error: 'title wajib diisi' }

  const body = normalizeBody(payload)
  if (!body.length) {
    return { ok: false, status: 400, error: 'kirim salah satu: markdown, blocks, atau body' }
  }

  const slug = slugify(payload.slug || title, 'artikel')
  const publish = payload.publish === true || Boolean(payload.publishedAt)
  const publishedAt = publish
    ? payload.publishedAt || new Date().toISOString()
    : null

  const doc = {
    _type: 'blog',
    title,
    slug: { _type: 'slug', current: slug },
    excerpt: payload.excerpt || '',
    publishedAt,
    tags: Array.isArray(payload.tags) ? payload.tags.filter(Boolean).map(String) : [],
    categories: await resolveCategories(payload.categories),
    body,
    seo: {
      metaTitle: payload.metaTitle || title,
      metaDescription: payload.metaDescription || payload.excerpt || '',
    },
  }

  if (payload.mainImageUrl) {
    const ref = imageRefFromUrl(payload.mainImageUrl)
    if (ref) doc.mainImage = { _type: 'image', asset: { _type: 'reference', _ref: ref } }
  }

  const authorName = payload.author
  if (authorName) {
    const author = await liveClient.fetch(
      `*[_type == "author" && name == $name][0]{_id}`,
      { name: authorName }
    )
    if (author?._id) doc.author = { _type: 'reference', _ref: author._id }
  }

  let id = typeof payload.id === 'string' && payload.id ? payload.id : null

  if (!id) {
    const existing = await liveClient.fetch(
      `*[_type == "blog" && slug.current == $slug][0]{_id}`,
      { slug }
    )
    if (existing?._id) id = existing._id
  }

  if (id) {
    await liveClient.patch(id).set(doc).commit()
  } else {
    const created = await liveClient.create(doc)
    id = created._id
  }

  revalidateContent('blog', { slug: { current: slug } })

  return {
    ok: true,
    status: 200,
    id,
    slug,
    url: `/blog/${slug}`,
    published: Boolean(publishedAt),
    blocks: body.length,
  }
}

export async function listBlogPosts({ status = 'all', limit = 20 } = {}) {
  const filter =
    status === 'published'
      ? 'defined(publishedAt)'
      : status === 'draft'
        ? '!defined(publishedAt)'
        : 'true'

  return liveClient.fetch(
    `*[_type == "blog" && ${filter}] | order(coalesce(publishedAt, _updatedAt) desc)[0...$limit] {
      _id, title, "slug": slug.current, publishedAt, _updatedAt,
      excerpt, tags, "categories": categories[]->title
    }`,
    { limit: Math.min(Number(limit) || 20, 100) }
  )
}
