import { client } from '../../../lib/sanity';
import { urlFor } from '../../../lib/sanity';
import StoreHeader from '../../../component/StoreHeader';
import SiteFooter from '../../../component/SiteFooter';
import BlockContentClient from '../../../component/BlockContentClient';
import AppPurchaseForm from './AppPurchaseForm';
import ScreenshotsSection from './ScreenshotsSection';
import Link from 'next/link';

async function getApp(slug) {
  const query = `
    *[_type == "app" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      content,
      mainImage,
      screenshots,
      price,
      isFree,
      appType,
      downloadUrl,
      fileSize,
      version,
      systemRequirements,
      features,
      tags,
      downloadCount,
      category->{
        title
      },
      author->{
        name,
        image
      },
      publishedAt
    }
  `;

  return await client.fetch(query, { slug });
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const app = await getApp(resolvedParams.slug);

  if (!app) {
    return { title: 'App Not Found' };
  }

  return {
    title: `${app.title} - GStore`,
    description: app.description,
    openGraph: {
      title: app.title,
      description: app.description,
      images: app.mainImage ? [urlFor(app.mainImage).url()] : [],
    },
  };
}

export default async function AppDetailPage({ params }) {
  const resolvedParams = await params;
  const app = await getApp(resolvedParams.slug);

  if (!app) {
    return (
      <div className="min-h-screen bg-navy app-store-section">
        <StoreHeader />
        <main className="max-w-6xl mx-auto px-6 lg:px-16 py-16 text-center">
          <p className="text-4xl mb-4">📦</p>
          <h1 className="text-2xl font-bold text-white mb-4">App Not Found</h1>
          <p className="text-gray-400 mb-8">The application you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/store" className="btn-primary inline-flex">Back to App Store</Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy app-store-section">
      <StoreHeader />

      <main className="max-w-6xl mx-auto px-6 lg:px-16 py-8">
        <Link href="/store" className="link-accent inline-flex items-center gap-2 mb-8 text-sm">
          ← Back to App Store
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="store-panel mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 rounded-xl bg-gray-800/80 border border-gray-800 flex items-center justify-center p-2">
                    <img
                      src={urlFor(app.mainImage).width(400).fit('clip').url()}
                      alt={app.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="badge-accent capitalize">{app.appType}</span>
                    {app.category && (
                      <span className="text-xs text-gray-500 bg-gray-800/60 px-2 py-1 rounded-md border border-gray-700/50">
                        {app.category.title}
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl font-bold text-white mb-3">{app.title}</h1>
                  <p className="text-gray-400 mb-5 leading-relaxed">{app.description}</p>

                  <div className="flex flex-wrap items-center gap-4 mb-5">
                    {app.isFree ? (
                      <span className="store-badge-free text-lg px-4 py-1.5">FREE</span>
                    ) : (
                      <span className="store-badge-paid text-lg px-4 py-1.5">${app.price}</span>
                    )}
                    <div className="flex items-center text-gray-500 text-sm">
                      <span className="mr-1.5">📥</span>
                      <span>{app.downloadCount || 0} downloads</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {app.version && (
                      <div className="p-3 rounded-lg bg-gray-800/40 border border-gray-800">
                        <span className="text-gray-500 block text-xs mb-0.5">Version</span>
                        <span className="text-gray-200">{app.version}</span>
                      </div>
                    )}
                    {app.fileSize && (
                      <div className="p-3 rounded-lg bg-gray-800/40 border border-gray-800">
                        <span className="text-gray-500 block text-xs mb-0.5">Size</span>
                        <span className="text-gray-200">{app.fileSize} MB</span>
                      </div>
                    )}
                  </div>

                  {app.tags && app.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {app.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-800/60 text-gray-400 text-sm rounded-full border border-gray-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {!app.isFree && (
                    <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <p className="text-sm text-blue-300">
                        Payment integration with Midtrans coming soon. Currently available for free download.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <ScreenshotsSection screenshots={app.screenshots} appTitle={app.title} />

            {app.features && app.features.length > 0 && (
              <div className="store-panel mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">Features</h2>
                <ul className="space-y-3">
                  {app.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-300 text-sm">
                      <span className="text-emerald-400 mr-2 mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {app.systemRequirements && (
              <div className="store-panel mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">System Requirements</h2>
                <p className="text-gray-400 whitespace-pre-line text-sm leading-relaxed">
                  {app.systemRequirements}
                </p>
              </div>
            )}

            {app.content && (
              <div className="store-panel">
                <h2 className="text-xl font-semibold text-white mb-4">About This App</h2>
                <div className="prose prose-invert max-w-none">
                  <BlockContentClient blocks={app.content} />
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <AppPurchaseForm app={app} />
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
