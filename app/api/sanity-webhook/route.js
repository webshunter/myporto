import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { CONTENT_TYPES, revalidateContent } from '@/lib/revalidate'

function verifySignature(rawBody, signature, secret) {
  if (!signature || !secret) return false
  const expected = crypto
    .createHmac('sha256', secret)
    .update(rawBody, 'utf8')
    .digest('hex')
  const a = Buffer.from(signature, 'utf8')
  const b = Buffer.from(expected, 'utf8')
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

export async function POST(request) {
  const secret = process.env.SANITY_WEBHOOK_SECRET

  if (!secret) {
    console.error('[webhook] SANITY_WEBHOOK_SECRET belum diset — request ditolak.')
    return NextResponse.json(
      { error: 'Webhook is not configured' },
      { status: 503 }
    )
  }

  const rawBody = await request.text()
  const signature = request.headers.get('sanity-webhook-signature')

  if (!verifySignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let body
  try {
    body = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { _type, operation } = body ?? {}

  if (!CONTENT_TYPES.includes(_type)) {
    return NextResponse.json({
      ok: true,
      skipped: true,
      reason: `type "${_type}" tidak memakai cache ISR`,
    })
  }

  const revalidated = revalidateContent(_type, body)

  return NextResponse.json({
    ok: true,
    type: _type,
    operation: operation ?? 'unknown',
    revalidated,
    now: Date.now(),
  })
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Webhook hanya menerima POST bertanda tangan.' },
    { status: 405 }
  )
}
