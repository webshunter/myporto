import { NextResponse } from 'next/server'
import { isAuthorized } from '@/lib/admin/api-auth'
import { deepseekChat, isAiConfigured, sanitizeInlineHtml } from '@/lib/admin/ai'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PROOFREAD_SYSTEM = `Kamu editor bahasa Indonesia yang teliti.
Tugas: perbaiki ejaan, tata bahasa, tanda baca, dan kalimat yang janggal pada tiap blok.
Aturan:
- JANGAN mengubah gagasan, urutan, atau menambah kalimat baru.
- Pertahankan tag HTML inline yang ada (<b>, <i>, <a href>, <code>, <br>) dan jangan menambah tag lain.
- Jika blok sudah benar, kembalikan apa adanya.
- Balas HANYA JSON: {"items":[{"id":"<id blok>","html":"<html hasil perbaikan>"}]}`

const SUMMARY_SYSTEM = `Kamu editor konten. Tulis ringkasan artikel dalam bahasa Indonesia yang mengalir, satu paragraf, maksimal 180 karakter, tanpa tanda kutip pembuka/penutup, tanpa embel-embel "artikel ini".`

export async function POST(request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isAiConfigured()) {
    return NextResponse.json(
      { error: 'DEEPSEEK_API_KEY belum diisi di .env.local', code: 'NO_KEY' },
      { status: 503 }
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Body harus JSON' }, { status: 400 })
  }

  const task = body?.task

  try {
    if (task === 'proofread') {
      const items = Array.isArray(body.items) ? body.items : []
      if (!items.length) return NextResponse.json({ error: 'items kosong' }, { status: 400 })
      if (items.length > 40) return NextResponse.json({ error: 'maksimal 40 blok per permintaan' }, { status: 400 })

      const clean = items
        .filter((item) => item?.id && typeof item.html === 'string')
        .map((item) => ({ id: String(item.id), html: item.html.slice(0, 4000) }))

      const raw = await deepseekChat({
        json: true,
        temperature: 0.1,
        messages: [
          { role: 'system', content: PROOFREAD_SYSTEM },
          { role: 'user', content: JSON.stringify({ items: clean }) },
        ],
      })

      let parsed
      try {
        parsed = JSON.parse(raw)
      } catch {
        return NextResponse.json({ error: 'Balasan AI bukan JSON valid' }, { status: 502 })
      }

      const result = (parsed.items ?? [])
        .filter((item) => item?.id)
        .map((item) => ({ id: String(item.id), html: sanitizeInlineHtml(item.html ?? '') }))

      return NextResponse.json({ ok: true, task, items: result })
    }

    if (task === 'excerpt' || task === 'meta') {
      const text = String(body.text ?? '').trim()
      if (!text) return NextResponse.json({ error: 'text kosong' }, { status: 400 })

      const limit = task === 'excerpt' ? 180 : 155
      const result = await deepseekChat({
        temperature: 0.3,
        maxTokens: 300,
        messages: [
          { role: 'system', content: SUMMARY_SYSTEM },
          {
            role: 'user',
            content: `Judul: ${body.title || '-'}\n\nIsi artikel:\n${text.slice(0, 6000)}\n\nBuat ringkasan maksimal ${limit} karakter.`,
          },
        ],
      })

      return NextResponse.json({
        ok: true,
        task,
        text: result.replace(/^["'\s]+|["'\s]+$/g, '').slice(0, limit),
      })
    }

    if (task === 'titles') {
      const text = String(body.text ?? '').trim()
      if (!text) return NextResponse.json({ error: 'text kosong' }, { status: 400 })

      const raw = await deepseekChat({
        json: true,
        temperature: 0.7,
        maxTokens: 400,
        messages: [
          {
            role: 'system',
            content: 'Buat 5 judul artikel bahasa Indonesia yang spesifik dan tidak clickbait. Balas JSON: {"titles":["..."]}',
          },
          { role: 'user', content: text.slice(0, 4000) },
        ],
      })

      const parsed = JSON.parse(raw)
      return NextResponse.json({ ok: true, task, titles: (parsed.titles ?? []).slice(0, 5) })
    }

    return NextResponse.json({ error: 'task tidak dikenal' }, { status: 400 })
  } catch (error) {
    console.error('[admin] AI error:', error)
    const status = error?.code === 'NO_KEY' ? 503 : 502
    return NextResponse.json({ error: error.message ?? 'Gagal memanggil DeepSeek' }, { status })
  }
}
