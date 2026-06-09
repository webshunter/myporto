'use client';

import { useState } from 'react';
import { urlFor } from '../../../lib/sanity';
import ScreenshotModal from './ScreenshotModal';

export default function ScreenshotsSection({ screenshots, appTitle }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (imageUrl, altText) => {
    setSelectedImage({ imageUrl, altText });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      {screenshots && screenshots.length > 0 && (
        <div className="store-panel mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {screenshots.map((screenshot, index) => (
              <button
                key={index}
                type="button"
                className="relative rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                onClick={() => openModal(urlFor(screenshot).url(), `${appTitle} screenshot ${index + 1}`)}
              >
                <img
                  src={urlFor(screenshot).width(800).fit('clip').url()}
                  alt={`${appTitle} screenshot ${index + 1}`}
                  className="w-full h-auto bg-gray-800/50"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <ScreenshotModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={selectedImage?.imageUrl}
        altText={selectedImage?.altText}
      />
    </>
  );
}
