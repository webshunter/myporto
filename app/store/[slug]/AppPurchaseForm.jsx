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
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appId: app._id,
          isFree: true,
          customerEmail,
          customerName,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setDownloadStatus('success');
        setDownloadToken(data.downloadToken);
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ downloadToken, appId: app._id }),
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
    <div className="store-panel">
      <h2 className="text-xl font-semibold text-white mb-4">Download App</h2>

      <div className="mb-6 text-center p-4 rounded-xl bg-gray-800/50 border border-gray-800">
        {app.isFree ? (
          <>
            <span className="text-3xl font-bold text-emerald-400">FREE</span>
            <p className="text-sm text-gray-400 mt-1">Free download</p>
          </>
        ) : (
          <>
            <span className="text-3xl font-bold text-blue-400">${app.price}</span>
            <p className="text-sm text-gray-400 mt-1">One-time purchase</p>
            <p className="text-xs text-gray-500 mt-2">Payment via Midtrans coming soon</p>
          </>
        )}
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="store-label">Full Name *</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="store-input"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div>
          <label className="store-label">Email Address *</label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="store-input"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      {downloadStatus === 'success' && (
        <div className="mb-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
          <div className="flex items-center text-emerald-400 text-sm">
            <span className="mr-2">✓</span>
            <span className="font-medium">Download successful! You can download again if needed.</span>
          </div>
        </div>
      )}

      {downloadStatus === 'error' && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="flex items-center text-red-400 text-sm">
            <span className="mr-2">✗</span>
            <span>Download failed. Please try again.</span>
          </div>
        </div>
      )}

      {!downloadToken ? (
        <button
          onClick={handleDownload}
          disabled={isLoading || !customerEmail || !customerName}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
            isLoading || !customerEmail || !customerName
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
              : app.isFree
                ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/20'
                : 'btn-primary w-full !rounded-lg'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : app.isFree ? (
            'Download Free'
          ) : (
            'Purchase & Download'
          )}
        </button>
      ) : (
        <button
          onClick={handleDownloadAgain}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-500 transition-colors duration-200"
        >
          {isLoading ? 'Downloading...' : 'Download Again'}
        </button>
      )}

      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex justify-between">
            <span>File Size</span>
            <span className="text-gray-300">{app.fileSize || 'N/A'} MB</span>
          </div>
          <div className="flex justify-between">
            <span>Version</span>
            <span className="text-gray-300">{app.version || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span>Type</span>
            <span className="text-gray-300 capitalize">{app.appType}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-1 text-xs text-gray-500">
        <p className="text-emerald-400/80">✓ Secure download</p>
        <p>✓ Instant access</p>
        <p>✓ 7-day download access</p>
      </div>
    </div>
  );
}
