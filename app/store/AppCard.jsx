'use client';

import Link from 'next/link';
import { urlFor } from '../../lib/sanity';

const appTypeLabels = {
  web: 'Web App',
  mobile: 'Mobile',
  desktop: 'Desktop',
  plugin: 'Plugin',
};

export default function AppCard({ app }) {
  return (
    <div className="card-dark-hover overflow-hidden flex flex-col h-full">
      <div className="relative h-48 bg-gray-800/80 border-b border-gray-800">
        {app.mainImage && (
          <img
            src={urlFor(app.mainImage).width(400).fit('clip').url()}
            alt={app.title}
            className="w-full h-full object-contain p-2"
          />
        )}
        <div className="absolute top-3 right-3">
          <span className={app.isFree ? 'store-badge-free' : 'store-badge-paid'}>
            {app.isFree ? 'FREE' : `$${app.price}`}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="badge-accent">
            {appTypeLabels[app.appType] || app.appType}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 hover:text-blue-400 transition-colors">
          {app.title}
        </h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-3 flex-grow">
          {app.description}
        </p>
        {app.category && (
          <p className="text-xs text-gray-500 mb-3">{app.category}</p>
        )}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className="mr-1.5">📥</span>
          <span>{app.downloadCount || 0} downloads</span>
        </div>
        {app.tags && app.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {app.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-gray-800 text-gray-400 text-xs rounded-md border border-gray-700/50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <Link
          href={`/store/${app.slug.current}`}
          className={`flex items-center justify-center w-full text-center py-2.5 px-4 rounded-lg font-semibold transition-all duration-200 mt-auto ${
            app.isFree
              ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/20'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md shadow-blue-500/20'
          }`}
        >
          {app.isFree ? 'Download Free' : 'View Details'}
        </Link>
      </div>
    </div>
  );
}
