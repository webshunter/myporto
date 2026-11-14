import { NextResponse } from 'next/server'
import { createBlogPost, listBlogPosts } from '@/lib/admin/blog-api'
import { isApiKeyValid } from '@/lib/admin/api-auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SERVER_INFO = { name: 'myporto-blog', version: '1.0.0' }
const PROTOCOL_VERSION = '2024-11-05'

const TOOLS = [
  {
    name: 'create_blog_post',
    description:
      'Buat atau perbarui artikel blog di myporto. Kirim markdown untuk isi artikel. ' +
      'Set publish=true agar langsung terbit di /blog.',
    inputSchema: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Judul artikel' },
        markdown: {
          type: 'string',
          description: 'Isi artikel dalam Markdown (heading, list, blockquote, code fence)',
        },
        slug: { type: 'string', description: 'Slug URL, opsional (dibuat dari judul)' },
        excerpt: { type: 'string', description: 'Ringkasan untuk kartu blog' },
        tags: { type: 'array', items: { type: 'string' } },
        categories: {
          type: 'array',
          items: { type: 'string' },
          description: 'Nama kategori yang sudah ada, mis. ["coding"]',
        },
        publish: { type: 'boolean', description: 'true = terbit sekarang' },
        publishedAt: { type: 'string', description: 'ISO date, opsional' },
        metaTitle: { type: 'string' },
        metaDescription: { type: 'string' },
        id: { type: 'string', description: 'ID dokumen untuk memperbarui artikel lama' },
      },
      required: ['title', 'markdown'],
    },
  },
  {
    name: 'list_blog_posts',
    description: 'Daftar artikel blog beserta status terbit.',
    inputSchema: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: ['all', 'published', 'draft'] },
        limit: { type: 'number' },
      },
    },
  },
]

async function callTool(name, args = {}) {
  if (name === 'create_blog_post') {
    const result = await createBlogPost(args)
    if (!result.ok) {
      return { isError: true, content: [{ type: 'text', text: result.error }] }
    }
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            id: result.id,
            slug: result.slug,
            url: result.url,
            published: result.published,
            blocks: result.blocks,
          }),
        },
      ],
    }
  }

  if (name === 'list_blog_posts') {
    const posts = await listBlogPosts(args)
    return { content: [{ type: 'text', text: JSON.stringify(posts) }] }
  }

  return { isError: true, content: [{ type: 'text', text: `Tool tidak dikenal: ${name}` }] }
}

export async function POST(request) {
  if (!isApiKeyValid(request)) {
    return NextResponse.json(
      { jsonrpc: '2.0', error: { code: -32001, message: 'Unauthorized' }, id: null },
      { status: 401 }
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { jsonrpc: '2.0', error: { code: -32700, message: 'Parse error' }, id: null },
      { status: 400 }
    )
  }

  const { id = null, method, params = {} } = body ?? {}

  if (method === 'initialize') {
    return NextResponse.json({
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: params.protocolVersion || PROTOCOL_VERSION,
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER_INFO,
      },
    })
  }

  if (method === 'notifications/initialized') {
    return new NextResponse(null, { status: 202 })
  }

  if (method === 'ping') {
    return NextResponse.json({ jsonrpc: '2.0', id, result: {} })
  }

  if (method === 'tools/list') {
    return NextResponse.json({ jsonrpc: '2.0', id, result: { tools: TOOLS } })
  }

  if (method === 'tools/call') {
    const { name, arguments: args } = params ?? {}
    if (!name) {
      return NextResponse.json(
        { jsonrpc: '2.0', id, error: { code: -32602, message: 'name tool wajib' } },
        { status: 400 }
      )
    }
    const result = await callTool(name, args ?? {})
    return NextResponse.json({ jsonrpc: '2.0', id, result })
  }

  return NextResponse.json(
    { jsonrpc: '2.0', id, error: { code: -32601, message: `Method tidak didukung: ${method}` } },
    { status: 200 }
  )
}

export async function GET() {
  return NextResponse.json(
    {
      mcp: SERVER_INFO,
      transport: 'streamable-http (JSON-RPC 2.0 over POST)',
      auth: 'Authorization: Bearer <BLOG_API_KEY>',
      tools: TOOLS.map((tool) => tool.name),
      rest: '/api/posts',
    },
    { status: 200 }
  )
}
