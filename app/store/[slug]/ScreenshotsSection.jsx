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
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Screenshots
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {screenshots.map((screenshot, index) => (
              <div key={index} className="relative group cursor-pointer" onClick={() => openModal(urlFor(screenshot).url(), `${appTitle} screenshot ${index + 1}`)}>
                <img
                  src={urlFor(screenshot).width(800).fit('clip').url()}
                  alt={`${appTitle} screenshot ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300"
                />
              </div>
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