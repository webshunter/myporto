'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { liveClient } from '@/lib/sanity.server'
import { revalidateContent } from '@/lib/revalidate'
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE,
  checkCredentials,
  expectedSessionValue,
  isAdminAuthenticated,
} from '@/lib/admin/session'

/* ------------------------------- auth ------------------------------- */

export async function login(formData) {
  const username = String(formData.get('username') ?? '')
  const password = String(formData.get('password') ?? '')

  const expectedSession = expectedSessionValue()
  if (!expectedSession) redirect('/admin/login?error=config')

  if (!checkCredentials(username, password)) {
    redirect('/admin/login?error=1')
  }

  const jar = await cookies()
  jar.set(ADMIN_COOKIE, expectedSession, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })

  redirect('/admin')
}

export async function logout() {
  const jar = await cookies()
  jar.delete(ADMIN_COOKIE)
  redirect('/admin/login')
}

/* ---------------------------- revalidate ---------------------------- */

import { CONTENT_TYPES } from '@/lib/revalidate'

export async function revalidateContentAction(formData) {
  if (!(await isAdminAuthenticated())) redirect('/admin/login')

  const type = String(formData.get('type') ?? '')
  if (!CONTENT_TYPES.includes(type)) redirect('/admin?error=type')

  revalidateContent(type, {})
  redirect(`/admin?ok=${type}`)
}

/* ------------------------------- blog ------------------------------- */

const BLOCK_TYPES = new Set([
  'block',
  'code',
  'image',
  'divider',
  'table',
  'embed',
])

function cleanBlocks(blocks) {
  if (!Array.isArray(blocks)) return []
  return blocks
    .filter((b) => b && BLOCK_TYPES.has(b._type))
    .map((b, i) => ({ ...b, _key: b._key || `b${Date.now()}${i}` }))
}

function slugFrom(title, fallback) {
  const base = (fallback || title || 'untitled')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
  return base || `artikel-${Date.now()}`
}

export async function savePost(payload = {}) {
  if (!(await isAdminAuthenticated())) {
    return { ok: false, error: 'Sesi berakhir, login ulang.' }
  }

  const {
    id,
    title,
    slug,
    excerpt,
    publishedAt,
    authorId,
    categoryIds = [],
    tags = [],
    seo = {},
    mainImage,
    body,
    publish = false,
  } = payload

  if (!title || !String(title).trim()) {
    return { ok: false, error: 'Judul wajib diisi.' }
  }

  const finalSlug = slugFrom(title, slug)
  const doc = {
    _type: 'blog',
    title: String(title).trim(),
    slug: { _type: 'slug', current: finalSlug },
    excerpt: excerpt || '',
    publishedAt: publish ? publishedAt || new Date().toISOString() : null,
    categories: categoryIds.map((ref, i) => ({
      _type: 'reference',
      _ref: ref,
      _key: `cat${i}`,
    })),
    tags: Array.isArray(tags) ? tags.filter(Boolean) : [],
    body: cleanBlocks(body),
    seo: {
      metaTitle: seo?.metaTitle || '',
      metaDescription: seo?.metaDescription || '',
    },
  }

  if (authorId) doc.author = { _type: 'reference', _ref: authorId }
  if (mainImage?.asset?._ref) doc.mainImage = mainImage

  try {
    let savedId = id
    if (!id || id === 'new') {
      const created = await liveClient.create(doc)
      savedId = created._id
    } else {
      await liveClient.patch(id).set(doc).commit()
    }

    revalidateContent('blog', { slug: { current: finalSlug } })
    return { ok: true, id: savedId, slug: finalSlug }
  } catch (error) {
    console.error('[admin] savePost failed:', error)
    return { ok: false, error: 'Gagal menyimpan artikel.' }
  }
}

export async function deletePost(formData) {
  if (!(await isAdminAuthenticated())) redirect('/admin/login')

  const id = String(formData.get('id') ?? '')
  if (id) {
    try {
      await liveClient.delete(id)
      revalidateContent('blog', {})
    } catch (error) {
      console.error('[admin] deletePost failed:', error)
    }
  }
  redirect('/admin/blog')
}

/* ----------------------------- projects ----------------------------- */

export async function saveProject(payload = {}) {
  if (!(await isAdminAuthenticated())) {
    return { ok: false, error: 'Sesi berakhir, login ulang.' }
  }

  const { id, name, slug, description, icon, content, gallery } = payload

  if (!name || !String(name).trim()) {
    return { ok: false, error: 'Nama project wajib diisi.' }
  }

  const finalSlug = slugFrom(name, slug)
  const doc = {
    _type: 'project',
    name: String(name).trim(),
    slug: { _type: 'slug', current: finalSlug },
    description: description || '',
    content: cleanBlocks(content),
    gallery: Array.isArray(gallery)
      ? gallery
          .filter((g) => g?.asset?._ref)
          .map((g, i) => ({ ...g, _key: g._key || `g${i}`, _type: 'image' }))
      : [],
  }

  if (icon?.asset?._ref) doc.icon = icon

  try {
    let savedId = id
    if (!id || id === 'new') {
      const created = await liveClient.create(doc)
      savedId = created._id
    } else {
      await liveClient.patch(id).set(doc).commit()
    }

    revalidateContent('project', { slug: { current: finalSlug } })
    return { ok: true, id: savedId, slug: finalSlug }
  } catch (error) {
    console.error('[admin] saveProject failed:', error)
    return { ok: false, error: 'Gagal menyimpan project.' }
  }
}

/* ---------------------------- portfolio ----------------------------- */

export async function savePortfolio(formData) {
  if (!(await isAdminAuthenticated())) redirect('/admin/login')

  const id = String(formData.get('id') ?? '')
  if (!id) redirect('/admin/homepage?error=missing')

  const value = (key) => String(formData.get(key) ?? '').trim()

  const patch = {
    name: value('name'),
    headtitle: value('headtitle'),
    description: value('description'),
    email: value('email'),
    github: value('github'),
    location: value('location'),
    linkcv: value('linkcv'),
    language: value('language'),
  }

  try {
    await liveClient.patch(id).set(patch).commit()
    revalidateContent('portfolio', {})
    redirect('/admin/homepage?ok=1')
  } catch (error) {
    console.error('[admin] savePortfolio failed:', error)
    redirect('/admin/homepage?error=save')
  }
}
