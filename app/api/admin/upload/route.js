import { NextResponse } from 'next/server'
import { liveClient } from '@/lib/sanity.server'
import { isAdminAuthenticated } from '@/lib/admin/session'

export const runtime = 'nodejs'

export async function POST(request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ success: 0, error: 'unauthorized' }, { status: 401 })
  }

  try {
    const form = await request.formData()
    const file = form.get('file')

    if (!file || typeof file === 'string') {
      return NextResponse.json({ success: 0, error: 'file kosong' }, { status: 400 })
    }

    if (!file.type?.startsWith('image/')) {
      return NextResponse.json({ success: 0, error: 'hanya gambar' }, { status: 415 })
    }

    if (file.size > 12 * 1024 * 1024) {
      return NextResponse.json({ success: 0, error: 'maksimal 12 MB' }, { status: 413 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const asset = await liveClient.assets.upload('image', buffer, {
      filename: file.name,
      contentType: file.type,
    })

    return NextResponse.json({
      success: 1,
      file: { url: asset.url, assetId: asset._id },
      asset: { _id: asset._id, url: asset.url },
    })
  } catch (error) {
    console.error('[admin] upload failed:', error)
    return NextResponse.json({ success: 0, error: 'upload gagal' }, { status: 500 })
  }
}
