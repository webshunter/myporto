import { NextResponse } from 'next/server';
import { client } from '../../../../lib/sanity';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { 
      paymentIntentId, 
      appId, 
      customerEmail, 
      customerName, 
      amount,
      ipAddress,
      userAgent 
    } = await request.json();

    // Validate required fields
    if (!paymentIntentId || !appId || !customerEmail || !customerName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate unique download token
    const downloadToken = crypto.randomBytes(32).toString('hex');
    
    // Set download expiry (7 days from now)
    const downloadExpiry = new Date();
    downloadExpiry.setDate(downloadExpiry.getDate() + 7);

    // Create transaction record in Sanity
    const transaction = await client.create({
      _type: 'transaction',
      transactionId: paymentIntentId,
      app: {
        _type: 'reference',
        _ref: appId
      },
      customerEmail,
      customerName,
      amount,
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
      updatedAt: new Date().toISOString()
    });

    // Increment download count for the app
    await client
      .patch(appId)
      .setIfMissing({ downloadCount: 0 })
      .inc({ downloadCount: 1 })
      .commit();

    return NextResponse.json({
      success: true,
      transactionId: transaction._id,
      downloadToken,
      downloadExpiry: downloadExpiry.toISOString()
    });

  } catch (error) {
    console.error('Payment confirmation error:', error);
    return NextResponse.json(
      { error: 'Failed to confirm payment' },
      { status: 500 }
    );
  }
} 