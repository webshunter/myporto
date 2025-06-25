'use client';

import { useState } from 'react';

export default function AppPurchaseForm({ app }) {
  const [isLoading, setIsLoading] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [downloadStatus, setDownloadStatus] = useState(null);
  const [downloadToken, setDownloadToken] = useState(null);

  const handleDownload = async () => {
    if (!customerEmail || !customerName) {
      alert('Please fill in your name and email');
      return;
    }

    setIsLoading(true);
    setDownloadStatus(null);

    try {
      // For now, we'll handle both free and paid apps as free downloads
      // In the future, this will integrate with Midtrans for paid apps
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appId: app._id,
          isFree: true, // Treat all apps as free for now
          customerEmail,
          customerName,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setDownloadStatus('success');
        setDownloadToken(data.downloadToken);
        // Trigger download
        window.open(data.downloadUrl, '_blank');
      } else {
        setDownloadStatus('error');
        alert(data.error || 'Download failed. Please try again.');
      }
    } catch (error) {
      console.error('Download error:', error);
      setDownloadStatus('error');
      alert('Download failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadAgain = async () => {
    if (!downloadToken) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          downloadToken,
          appId: app._id,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        window.open(data.downloadUrl, '_blank');
      } else {
        alert('Download failed. Please try again.');
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Download failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Download App
      </h2>

      {/* Price Display */}
      <div className="mb-6">
        <div className="text-center">
          <span className="text-3xl font-bold text-green-600">
            FREE
          </span>
          <p className="text-sm text-gray-500 mt-1">
            Free download
          </p>
          {!app.isFree && (
            <p className="text-xs text-gray-400 mt-1">
              *Payment integration coming soon with Midtrans
            </p>
          )}
        </div>
      </div>

      {/* Customer Form */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      {/* Download Status */}
      {downloadStatus === 'success' && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-green-800 font-medium">
              Download successful! You can download again if needed.
            </span>
          </div>
        </div>
      )}

      {downloadStatus === 'error' && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center">
            <span className="text-red-500 mr-2">✗</span>
            <span className="text-red-800">
              Download failed. Please try again.
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {!downloadToken ? (
        <button
          onClick={handleDownload}
          disabled={isLoading || !customerEmail || !customerName}
          className={`w-full py-3 px-4 rounded-md font-medium transition-colors duration-200 ${
            isLoading || !customerEmail || !customerName
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Downloading...
            </span>
          ) : (
            'Download Free'
          )}
        </button>
      ) : (
        <button
          onClick={handleDownloadAgain}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors duration-200"
        >
          {isLoading ? 'Downloading...' : 'Download Again'}
        </button>
      )}

      {/* App Info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>File Size:</span>
            <span>{app.fileSize || 'N/A'} MB</span>
          </div>
          <div className="flex justify-between">
            <span>Version:</span>
            <span>{app.version || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span>Type:</span>
            <span>{app.appType}</span>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="mt-4 text-xs text-gray-500">
        <p>✓ Secure download</p>
        <p>✓ Instant access</p>
        <p>✓ 7-day download access</p>
        {!app.isFree && (
          <p className="text-blue-600 mt-2">
            💳 Payment integration with Midtrans coming soon
          </p>
        )}
      </div>
    </div>
  );
} 