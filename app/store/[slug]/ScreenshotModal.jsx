'use client';

import { useState, useRef, useEffect } from 'react';

export default function ScreenshotModal({ isOpen, onClose, imageUrl, altText }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 4)); // Max 4x zoom
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1)); // Min 1x zoom
  };

  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClose = () => {
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
    onClose();
  };

  // Reset position when zoom changes
  useEffect(() => {
    if (zoomLevel === 1) {
      setImagePosition({ x: 0, y: 0 });
    }
  }, [zoomLevel]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 9999
      }}
      onClick={handleClose}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center z-10"
      >
        ×
      </button>

      {/* Zoom controls */}
      <div className="absolute right-4 top-20 flex flex-col gap-2 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            zoomIn();
          }}
          className="w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center text-lg font-bold transition-all duration-200"
        >
          +
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            zoomOut();
          }}
          className="w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center text-lg font-bold transition-all duration-200"
        >
          −
        </button>
        <div className="text-center text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
          {zoomLevel.toFixed(1)}x
        </div>
      </div>

      {/* Image container */}
      <div 
        className="relative flex items-center justify-center w-full h-full"
        style={{ cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      >
        <img
          ref={imageRef}
          src={imageUrl}
          alt={altText}
          className="transition-all duration-300 ease-in-out select-none"
          style={{
            transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
            maxWidth: '90vw',
            maxHeight: '90vh',
            objectFit: 'contain',
            cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
          }}
          onMouseDown={handleMouseDown}
          onClick={(e) => e.stopPropagation()}
          draggable={false}
        />
      </div>
    </div>
  );
} 