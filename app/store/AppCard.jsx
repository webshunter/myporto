'use client';

import Link from 'next/link';
import { urlFor } from '../../lib/sanity';

export default function AppCard({ app }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* App Image */}
      <div className="relative h-48 bg-gray-200">
        {app.mainImage && (
          <img
            src={urlFor(app.mainImage).width(400).height(300).url()}
            alt={app.title}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
            FREE
          </span>
        </div>

        {/* App Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {app.appType}
          </span>
        </div>
      </div>

      {/* App Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {app.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {app.description}
        </p>

        {/* Category */}
        {app.category && (
          <p className="text-xs text-gray-500 mb-3">
            {app.category.title}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <span className="mr-2">⭐</span>
            <span>{app.rating || 0}/5</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">📥</span>
            <span>{app.downloadCount || 0}</span>
          </div>
        </div>

        {/* Tags */}
        {app.tags && app.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {app.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Button */}
        <Link
          href={`/store/${app.slug.current}`}
          className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200"
        >
          Download Free
        </Link>
      </div>
    </div>
  );
} 