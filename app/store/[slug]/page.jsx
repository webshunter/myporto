import { client } from '../../../lib/sanity';
import { urlFor } from '../../../lib/sanity';
import StoreHeader from '../../../component/StoreHeader';
import SiteFooter from '../../../component/SiteFooter';
import BlockContentClient from '../../../component/BlockContentClient';
import AppPurchaseForm from './AppPurchaseForm';
import ScreenshotModal from './ScreenshotModal';
import ScreenshotsSection from './ScreenshotsSection';

// Fetch app by slug
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

// Generate metadata
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const app = await getApp(resolvedParams.slug);
  
  if (!app) {
    return {
      title: 'App Not Found',
    };
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
      <div className="min-h-screen bg-gray-50">
        <StoreHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              App Not Found
            </h1>
            <p className="text-gray-600">
              The application you're looking for doesn't exist.
            </p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 app-store-section">
      <StoreHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* App Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* App Image */}
                <div className="flex-shrink-0">
                  <img
                    src={urlFor(app.mainImage).width(400).fit('clip').url()}
                    alt={app.title}
                    className="w-48 h-48 object-contain rounded-lg bg-gray-100"
                  />
                </div>

                {/* App Info */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {app.title}
                  </h1>
                  
                  <p className="text-gray-600 mb-4">
                    {app.description}
                  </p>

                  {/* Price and Rating */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      FREE
                    </span>
                    
                    <div className="flex items-center text-gray-500">
                      <span className="mr-1">📥</span>
                      <span>{app.downloadCount || 0} downloads</span>
                    </div>
                  </div>

                  {/* App Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Type:</span>
                      <span className="ml-2 text-gray-600">{app.appType}</span>
                    </div>
                    {app.version && (
                      <div>
                        <span className="font-medium text-gray-700">Version:</span>
                        <span className="ml-2 text-gray-600">{app.version}</span>
                      </div>
                    )}
                    {app.fileSize && (
                      <div>
                        <span className="font-medium text-gray-700">Size:</span>
                        <span className="ml-2 text-gray-600">{app.fileSize} MB</span>
                      </div>
                    )}
                    {app.category && (
                      <div>
                        <span className="font-medium text-gray-700">Category:</span>
                        <span className="ml-2 text-gray-600">{app.category.title}</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {app.tags && app.tags.length > 0 && (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {app.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Payment Notice for Paid Apps */}
                  {!app.isFree && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <p className="text-sm text-blue-800">
                        💳 Payment integration with Midtrans coming soon. Currently available for free download.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Screenshots */}
            <ScreenshotsSection screenshots={app.screenshots} appTitle={app.title} />

            {/* Features */}
            {app.features && app.features.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Features
                </h2>
                <ul className="space-y-2">
                  {app.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* System Requirements */}
            {app.systemRequirements && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  System Requirements
                </h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {app.systemRequirements}
                </p>
              </div>
            )}

            {/* Detailed Content */}
            {app.content && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  About This App
                </h2>
                <div className="prose max-w-none">
                  <BlockContentClient blocks={app.content} />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Purchase Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <AppPurchaseForm app={app} />
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
} 