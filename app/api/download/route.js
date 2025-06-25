import { NextResponse } from 'next/server';
import { client } from '../../../lib/sanity';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { downloadToken, appId, isFree, customerEmail, customerName } = await request.json();

    // Handle free downloads
    if (isFree) {
      if (!appId || !customerEmail || !customerName) {
        return NextResponse.json(
          { error: 'Missing required fields for free download' },
          { status: 400 }
        );
      }

      // Get app details
      const app = await client.fetch(`
        *[_type == "app" && _id == $appId][0] {
          _id,
          title,
          downloadUrl,
          fileSize,
          isFree
        }
      `, { appId });

      if (!app) {
        return NextResponse.json(
          { error: 'App not found' },
          { status: 404 }
        );
      }

      if (!app.isFree) {
        return NextResponse.json(
          { error: 'This app is not free' },
          { status: 403 }
        );
      }

      // Generate download token for free apps
      const freeDownloadToken = crypto.randomBytes(32).toString('hex');
      
      // Set download expiry (7 days from now)
      const downloadExpiry = new Date();
      downloadExpiry.setDate(downloadExpiry.getDate() + 7);

      // Create transaction record for free download
      const transaction = await client.create({
        _type: 'transaction',
        transactionId: `FREE_${Date.now()}`,
        app: {
          _type: 'reference',
          _ref: appId
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
        downloadToken: freeDownloadToken,
        downloadUrl: app.downloadUrl,
        fileName: app.title,
        fileSize: app.fileSize,
        downloadExpiry: downloadExpiry.toISOString()
      });
    }

    // Handle paid downloads
    if (!downloadToken || !appId) {
      return NextResponse.json(
        { error: 'Missing download token or app ID' },
        { status: 400 }
      );
    }

    // Find transaction by download token
    const transaction = await client.fetch(`
      *[_type == "transaction" && downloadToken == $downloadToken && app._ref == $appId][0] {
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
      }
    `, { downloadToken, appId });

    if (!transaction) {
      return NextResponse.json(
        { error: 'Invalid download token' },
        { status: 404 }
      );
    }

    // Check if payment was completed
    if (transaction.status !== 'completed') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 403 }
      );
    }

    // Check if download link has expired
    const now = new Date();
    const expiryDate = new Date(transaction.downloadExpiry);
    
    if (now > expiryDate) {
      return NextResponse.json(
        { error: 'Download link has expired' },
        { status: 410 }
      );
    }

    // Update download count and mark as downloaded
    await client
      .patch(transaction._id)
      .set({
        downloadCount: (transaction.downloadCount || 0) + 1,
        isDownloaded: true,
        lastDownloadedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .commit();

    // Return download information
    return NextResponse.json({
      success: true,
      downloadUrl: transaction.app.downloadUrl,
      fileName: transaction.app.title,
      fileSize: transaction.app.fileSize,
      downloadCount: (transaction.downloadCount || 0) + 1
    });

  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Failed to process download' },
      { status: 500 }
    );
  }
} 