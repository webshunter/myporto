import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import crypto from 'crypto'
import { liveClient } from '@/lib/sanity.server'

const DOWNLOAD_EXPIRY_DAYS = 7

export async function POST(request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 503 }
      )
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const {
      paymentIntentId,
      appId,
      customerEmail,
      customerName,
      ipAddress,
      userAgent,
    } = await request.json()

    if (!paymentIntentId || !appId || !customerEmail || !customerName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Harga diambil dari dokumen app, bukan dari body request.
    const app = await liveClient.fetch(
      `*[_type == "app" && _id == $appId][0]{_id, title, price, isFree}`,
      { appId }
    )

    if (!app) {
      return NextResponse.json({ error: 'App not found' }, { status: 404 })
    }

    if (app.isFree) {
      return NextResponse.json(
        { error: 'This app is free, no payment needed' },
        { status: 400 }
      )
    }

    // Verifikasi ke Stripe: intent harus benar-benar sudah dibayar.
    let intent
    try {
      intent = await stripe.paymentIntents.retrieve(paymentIntentId)
    } catch (err) {
      console.error('Stripe retrieve failed:', err?.message)
      return NextResponse.json(
        { error: 'Invalid payment intent' },
        { status: 400 }
      )
    }

    if (intent.status !== 'succeeded') {
      return NextResponse.json(
        { error: `Payment not completed (status: ${intent.status})` },
        { status: 402 }
      )
    }

    const expectedAmount = Math.round((app.price || 0) * 100)
    if (intent.amount !== expectedAmount || intent.currency !== 'usd') {
      return NextResponse.json(
        { error: 'Payment amount does not match app price' },
        { status: 400 }
      )
    }

    // Idempoten: satu payment intent hanya boleh menghasilkan satu transaksi.
    const existing = await liveClient.fetch(
      `*[_type == "transaction" && transactionId == $paymentIntentId][0]{_id, downloadToken, downloadExpiry}`,
      { paymentIntentId }
    )

    if (existing) {
      return NextResponse.json({
        success: true,
        transactionId: existing._id,
        downloadToken: existing.downloadToken,
        downloadExpiry: existing.downloadExpiry,
        reused: true,
      })
    }

    const downloadToken = crypto.randomBytes(32).toString('hex')

    const downloadExpiry = new Date()
    downloadExpiry.setDate(downloadExpiry.getDate() + DOWNLOAD_EXPIRY_DAYS)

    const transaction = await liveClient.create({
      _type: 'transaction',
      transactionId: paymentIntentId,
      app: {
        _type: 'reference',
        _ref: appId,
      },
      customerEmail,
      customerName,
      amount: app.price,
      currency: 'USD',
      status: 'completed',
      paymentMethod: 'stripe',
      paymentGatewayId: paymentIntentId,
      downloadToken,
      downloadExpiry: downloadExpiry.toISOString(),
      isDownloaded: false,
      downloadCount: 0,
      ipAddress,
      userAgent,
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
      transactionId: transaction._id,
      downloadToken,
      downloadExpiry: downloadExpiry.toISOString(),
    })
  } catch (error) {
    console.error('Payment confirmation error:', error)
    return NextResponse.json(
      { error: 'Failed to confirm payment' },
      { status: 500 }
    )
  }
}
