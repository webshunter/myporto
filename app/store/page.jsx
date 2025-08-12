import { client } from '../../lib/sanity';
import { urlFor } from '../../lib/sanity';
import StoreHeader from '../../component/StoreHeader';
import SiteFooter from '../../component/SiteFooter';
import Link from 'next/link';
import StoreFilters from './StoreFilters';
import AppCard from './AppCard';

// Fetch all apps from Sanity
async function getApps() {
  const query = `
    *[_type == "app" && isActive == true] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      mainImage,
      price,
      isFree,
      appType,
      downloadCount,
      rating,
      tags,
      category->{
        title
      },
      publishedAt
    }
  `;
  
  return await client.fetch(query);
}

// Fetch categories for filtering
async function getCategories() {
  const query = `
    *[_type == "categoryType"] {
      _id,
      title
    }
  `;
  
  return await client.fetch(query);
}

export default async function StorePage() {
  const apps = await getApps();
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gray-50 app-store-section">
      <StoreHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            App Store
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover and download amazing applications, from web apps to mobile applications
          </p>
        </div>

        {/* Filter and Search */}
        <div className="mb-8">
          <StoreFilters categories={categories} />
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {apps.map((app) => (
            <AppCard key={app._id} app={app} />
          ))}
        </div>

        {apps.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No applications found.</p>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
} 