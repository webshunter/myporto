'use client';

import { useState } from 'react';

export default function StoreFilters({ categories, onFiltersChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [appTypeFilter, setAppTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Handle filter changes and notify parent component
  const handleFilterChange = (filterType, value) => {
    let newFilters;
    
    switch (filterType) {
      case 'search':
        setSearchTerm(value);
        newFilters = { searchTerm: value, selectedCategory, priceFilter, appTypeFilter, sortBy };
        break;
      case 'category':
        setSelectedCategory(value);
        newFilters = { searchTerm, selectedCategory: value, priceFilter, appTypeFilter, sortBy };
        break;
      case 'price':
        setPriceFilter(value);
        newFilters = { searchTerm, selectedCategory, priceFilter: value, appTypeFilter, sortBy };
        break;
      case 'appType':
        setAppTypeFilter(value);
        newFilters = { searchTerm, selectedCategory, priceFilter, appTypeFilter: value, sortBy };
        break;
      case 'sort':
        setSortBy(value);
        newFilters = { searchTerm, selectedCategory, priceFilter, appTypeFilter, sortBy: value };
        break;
      default:
        return;
    }
    
    onFiltersChange(newFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Apps
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search by name..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select 
            value={selectedCategory}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories && categories.map((category) => (
              <option key={category._id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {/* App Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            App Type
          </label>
          <select 
            value={appTypeFilter}
            onChange={(e) => handleFilterChange('appType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="web">Web Application</option>
            <option value="mobile">Mobile App (APK)</option>
            <option value="desktop">Desktop Application</option>
            <option value="plugin">Plugin/Extension</option>
          </select>
        </div>

        {/* Price Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price
          </label>
          <select 
            value={priceFilter}
            onChange={(e) => handleFilterChange('price', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Prices</option>
            <option value="free">Free Only</option>
            <option value="paid">Paid Only</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select 
            value={sortBy}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="downloads">Most Downloaded</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
} 