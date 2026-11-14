import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { client } from '@/lib/sanity'

export async function POST(request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 503 }
      )
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const { appId, customerEmail, customerName } = await request.json()

    if (!appId || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Harga selalu dari Sanity — jangan percaya nominal dari browser.
    const app = await client.fetch(
      `*[_type == "app" && _id == $appId][0]{_id, title, price, isFree, isActive}`,
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

    if (app.isFree) {
      return NextResponse.json(
        { error: 'This app is free, no payment needed' },
        { status: 400 }
      )
    }

    if (!app.price || app.price <= 0) {
      return NextResponse.json(
        { error: 'App price is not configured' },
        { status: 422 }
      )
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(app.price * 100),
      currency: 'usd',
      metadata: {
        appId,
        appTitle: app.title,
        customerEmail,
        customerName: customerName || '',
      },
      description: `Purchase: ${app.title}`,
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: app.price,
    })
  } catch (error) {
    console.error('Payment intent creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}
