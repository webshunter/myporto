import { revalidatePath } from 'next/cache'

export const CONTENT_TYPES = [
  'blog',
  'project',
  'app',
  'category',
  'transaction',
]

/**
 * Invalidasi cache ISR per tipe konten.
 * Dipakai oleh Sanity webhook (/api/sanity-webhook) dan panel /admin.
 *
 * Catatan: hanya memakai revalidatePath. revalidateTag tidak dipakai karena
 * query Sanity di project ini tidak memakai cache tag, sehingga tag akan
 * jadi no-op yang menyesatkan.
 */
export function revalidateContent(type, doc = {}) {
  const slug = doc?.slug?.current
  const revalidated = ['/']

  switch (type) {
    case 'blog':
      revalidatePath('/blog')
      revalidated.push('/blog')
      if (slug) {
        revalidatePath(`/blog/${slug}`)
        revalidated.push(`/blog/${slug}`)
      }
      break

    case 'project':
      revalidatePath('/project')
      revalidated.push('/project')
      if (slug) {
        revalidatePath(`/project/${slug}`)
        revalidated.push(`/project/${slug}`)
      }
      break

    case 'app':
      revalidatePath('/store')
      revalidated.push('/store')
      if (slug) {
        revalidatePath(`/store/${slug}`)
        revalidated.push(`/store/${slug}`)
      }
      break

    case 'category':
      revalidatePath('/store')
      revalidatePath('/blog')
      revalidated.push('/store', '/blog')
      break

    case 'transaction':
      revalidatePath('/store')
      revalidated.push('/store')
      break

    default:
      break
  }

  revalidatePath('/')

  return revalidated
}
