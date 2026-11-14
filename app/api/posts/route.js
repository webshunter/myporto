import { NextResponse } from 'next/server'
import { createBlogPost, listBlogPosts } from '@/lib/admin/blog-api'
import { isApiKeyValid } from '@/lib/admin/api-auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function unauthorized() {
  return NextResponse.json(
    { error: 'Unauthorized. Kirim header: Authorization: Bearer <BLOG_API_KEY>' },
    { status: 401 }
  )
}

export async function GET(request) {
  if (!isApiKeyValid(request)) return unauthorized()

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status') ?? 'all'
  const limit = searchParams.get('limit') ?? 20

  const posts = await listBlogPosts({ status, limit })
  return NextResponse.json({ ok: true, count: posts.length, posts })
}

export async function POST(request) {
  if (!isApiKeyValid(request)) return unauthorized()

  let payload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Body harus JSON yang valid' }, { status: 400 })
  }

  const result = await createBlogPost(payload)

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status || 400 })
  }

  return NextResponse.json(result, { status: 201 })
}
