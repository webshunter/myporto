import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { liveClient } from '@/lib/sanity.server'

const FREE_DOWNLOAD_EXPIRY_DAYS = 7

const APP_FIELDS = `{
  _id,
  title,
  downloadUrl,
  fileSize,
  isFree,
  isActive
}`

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      downloadToken,
      appId: rawAppId,
      customerEmail,
      customerName,
    } = body ?? {}

    const appId = typeof rawAppId === 'string' ? rawAppId.trim() : ''
    if (!appId) {
      return NextResponse.json({ error: 'Missing app ID' }, { status: 400 })
    }

    // Ambil app dari Sanity lebih dulu: status gratis/berbayar ditentukan
    // oleh dokumen, BUKAN oleh nilai yang dikirim klien.
    const app = await liveClient.fetch(
      `*[_type == "app" && _id == $appId][0]${APP_FIELDS}`,
      { appId }
    )

    if (!app) {
      return NextResponse.json({ error: 'App not found' }, { status: 404 })
    }

    if (app.isActive === false) {
      return NextResponse.json(
        { error: 'This app is not available' },
        { status: 403 }
      )
    }

    // --- Download gratis ---
    if (app.isFree === true) {
      if (!customerEmail || !customerName) {
        return NextResponse.json(
          { error: 'Missing required fields for free download' },
          { status: 400 }
        )
      }

      const freeDownloadToken = crypto.randomBytes(32).toString('hex')

      const downloadExpiry = new Date()
      downloadExpiry.setDate(
        downloadExpiry.getDate() + FREE_DOWNLOAD_EXPIRY_DAYS
      )

      await liveClient.create({
        _type: 'transaction',
        transactionId: `FREE_${Date.now()}`,
        app: {
          _type: 'reference',
          _ref: appId,
        },
        customerEmail,
        customerName,
        amount: 0,
        currency: 'USD',
        status: 'completed',
        paymentMethod: 'free',
        downloadToken: freeDownloadToken,
        downloadExpiry: downloadExpiry.toISOString(),
        isDownloaded: false,
        downloadCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })

      await liveClient
        .patch(appId)
        .setIfMissing({ downloadCount: 0 })
        .inc({ downloadCount: 1 })
        .commit()

      return NextResponse.json({
        success: true,
        downloadToken: freeDownloadToken,
        downloadUrl: app.downloadUrl,
        fileName: app.title,
        fileSize: app.fileSize,
        downloadExpiry: downloadExpiry.toISOString(),
      })
    }

    // --- Download berbayar: wajib punya token transaksi yang valid ---
    if (!downloadToken || !appId) {
      return NextResponse.json(
        { error: 'Missing download token or app ID' },
        { status: 400 }
      )
    }

    const transaction = await liveClient.fetch(
      `*[_type == "transaction" && downloadToken == $downloadToken && app._ref == $appId][0] {
        _id,
        status,
        downloadExpiry,
        downloadCount,
        isDownloaded,
        app->{
          _id,
          title,
          downloadUrl,
          fileSize
        }
      }`,
      { downloadToken, appId }
    )

    if (!transaction) {
      return NextResponse.json(
        { error: 'Invalid download token' },
        { status: 404 }
      )
    }

    if (transaction.status !== 'completed') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 403 }
      )
    }

    if (transaction.downloadExpiry && new Date() > new Date(transaction.downloadExpiry)) {
      return NextResponse.json(
        { error: 'Download link has expired' },
        { status: 410 }
      )
    }

    await liveClient
      .patch(transaction._id)
      .set({
        downloadCount: (transaction.downloadCount || 0) + 1,
        isDownloaded: true,
        lastDownloadedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .commit()

    return NextResponse.json({
      success: true,
      downloadUrl: transaction.app.downloadUrl,
      fileName: transaction.app.title,
      fileSize: transaction.app.fileSize,
      downloadCount: (transaction.downloadCount || 0) + 1,
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Failed to process download' },
      { status: 500 }
    )
  }
}
