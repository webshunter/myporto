'use client';

import { useState, useEffect, useCallback } from 'react';
import { client } from '../../lib/sanity';
import { urlFor } from '../../lib/sanity';
import StoreHeader from '../../component/StoreHeader';
import SiteFooter from '../../component/SiteFooter';
import Link from 'next/link';
import StoreFilters from './StoreFilters';
import AppCard from './AppCard';

export default function StorePage() {
  const [apps, setApps] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appsData, categoriesData] = await Promise.all([
          getApps(),
          getCategories()
        ]);
        console.log('Fetched apps:', appsData);
        console.log('Fetched categories:', categoriesData);
        setApps(appsData);
        setCategories(categoriesData);
        setFilteredApps(appsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle filter changes - memoized to prevent infinite loops
  const handleFiltersChange = useCallback((filters) => {
    console.log('Filters changed:', filters);
    console.log('Available apps:', apps);
    
    let filtered = [...apps];

    // Search filter
    if (filters.searchTerm) {
      filtered = filtered.filter(app => 
        app.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        app.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filters.selectedCategory) {
      console.log('Filtering by category:', filters.selectedCategory);
      filtered = filtered.filter(app => {
        console.log('App category:', app.category, 'Filter category:', filters.selectedCategory);
        return app.category === filters.selectedCategory;
      });
    }

    // App type filter
    if (filters.appTypeFilter) {
      filtered = filtered.filter(app => 
        app.appType === filters.appTypeFilter
      );
    }

    // Price filter
    if (filters.priceFilter) {
      if (filters.priceFilter === 'free') {
        filtered = filtered.filter(app => app.isFree === true);
      } else if (filters.priceFilter === 'paid') {
        filtered = filtered.filter(app => app.isFree === false);
      }
    }

    // Sort filter
    switch (filters.sortBy) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'downloads':
        filtered.sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0));
        break;
      case 'price-low':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    }

    console.log('Filtered results:', filtered);
    setFilteredApps(filtered);
  }, [apps]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <StoreHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-500">Loading apps...</p>
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
          <StoreFilters categories={categories} onFiltersChange={handleFiltersChange} />
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredApps.map((app) => (
            <AppCard key={app._id} app={app} />
          ))}
        </div>

        {filteredApps.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No applications found matching your filters.</p>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

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
      tags,
      "category": category->title,
      publishedAt
    }
  `;
  
  return await client.fetch(query);
}

// Fetch categories for filtering
async function getCategories() {
  const query = `
    *[_type == "category"] {
      _id,
      title
    }
  `;
  
  return await client.fetch(query);
} 