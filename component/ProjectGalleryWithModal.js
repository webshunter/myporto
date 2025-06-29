'use client';
import { useState, useRef, useEffect } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/lib/sanity';

export default function ProjectGalleryWithModal({ project }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const modalRef = useRef(null);
  const builder = imageUrlBuilder(client);

  const openModal = (idx) => {
    setCurrentIdx(idx);
    setModalOpen(true);
    setIsZoomed(false);
    setDragPosition({ x: 0, y: 0 });
  };
  
  const closeModal = () => {
    setModalOpen(false);
    setIsZoomed(false);
    setDragPosition({ x: 0, y: 0 });
  };
  
  const nextImg = () => {
    setCurrentIdx((prev) => (prev + 1) % project.gallery.length);
    setIsZoomed(false);
    setDragPosition({ x: 0, y: 0 });
  };
  
  const prevImg = () => {
    setCurrentIdx((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
    setIsZoomed(false);
    setDragPosition({ x: 0, y: 0 });
  };
  
  const toggleZoom = () => {
    setIsZoomed((z) => !z);
    if (!isZoomed) {
      setDragPosition({ x: 0, y: 0 });
    }
  };

  // Mouse event handlers for dragging
  const handleMouseDown = (e) => {
    if (!isZoomed) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setHasMoved(false);
    setDragStart({
      x: e.clientX - dragPosition.x,
      y: e.clientY - dragPosition.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isZoomed) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Check if we've moved significantly (more than 3px)
    const deltaX = Math.abs(newX - dragPosition.x);
    const deltaY = Math.abs(newY - dragPosition.y);
    
    if (deltaX > 3 || deltaY > 3) {
      setHasMoved(true);
    }
    
    // Apply drag boundaries: X dibatasi, Y bebas
    const maxDragX = window.innerWidth * 0.3;
    const constrainedX = Math.max(-maxDragX, Math.min(maxDragX, newX));
    // Y tidak dibatasi
    setDragPosition({
      x: constrainedX,
      y: newY
    });
    e.preventDefault();
  };

  const handleMouseUp = (e) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsDragging(false);
    setHasMoved(false);
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    if (!isZoomed) return;
    e.preventDefault();
    setIsDragging(true);
    setHasMoved(false);
    const touch = e.touches[0];
    setDragStart({
      x: touch.clientX - dragPosition.x,
      y: touch.clientY - dragPosition.y
    });
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !isZoomed) return;
    const touch = e.touches[0];
    
    const newX = touch.clientX - dragStart.x;
    const newY = touch.clientY - dragStart.y;
    
    // Check if we've moved significantly (more than 3px)
    const deltaX = Math.abs(newX - dragPosition.x);
    const deltaY = Math.abs(newY - dragPosition.y);
    
    if (deltaX > 3 || deltaY > 3) {
      setHasMoved(true);
    }
    
    // Apply drag boundaries: X dibatasi, Y bebas
    const maxDragX = window.innerWidth * 0.3;
    const constrainedX = Math.max(-maxDragX, Math.min(maxDragX, newX));
    // Y tidak dibatasi
    setDragPosition({
      x: constrainedX,
      y: newY
    });
    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsDragging(false);
    setHasMoved(false);
  };

  // Add/remove event listeners
  useEffect(() => {
    if (modalOpen && isZoomed) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [modalOpen, isZoomed, isDragging, dragStart, hasMoved]);

  // Handle wheel scroll for zoomed images
  const handleWheel = (e) => {
    if (!isZoomed) return;
    e.preventDefault();
    // Y tidak dibatasi
    setDragPosition(prev => ({
      x: prev.x,
      y: prev.y - e.deltaY * 0.8
    }));
  };

  // Handle click with drag detection
  const handleImageClick = (e) => {
    // Only toggle zoom if we weren't dragging or didn't move significantly
    if (!isDragging && !hasMoved) {
      e.preventDefault();
      e.stopPropagation();
      toggleZoom();
    }
  };

  return (
    <>
      <div className="prose prose-invert max-w-none">
        {/* Render block content di sini jika ingin, atau di parent */}
      </div>
      {project.gallery && project.gallery.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {project.gallery.map((img, idx) => (
              <button
                key={img._key || idx}
                className="bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center focus:outline-none"
                onClick={() => openModal(idx)}
                aria-label={`Open image ${idx + 1}`}
              >
                <img
                  src={builder.image(img).width(600).height(400).fit('crop').crop('top').url()}
                  alt={img.alt || `Gallery image ${idx + 1}`}
                  className="object-contain w-full h-48 bg-black hover:opacity-80 transition"
                />
              </button>
            ))}
          </div>
          {/* Modal Popup */}
          {modalOpen && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 w-screen h-screen overflow-y-auto p-4"
              onWheel={handleWheel}
            >
              <button
                className="absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none z-10"
                onClick={closeModal}
                aria-label="Close gallery"
              >
                ×
              </button>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl font-bold focus:outline-none z-10"
                onClick={prevImg}
                aria-label="Previous image"
              >
                ‹
              </button>
              <div 
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 w-screen h-screen overflow-y-auto p-4"
                ref={modalRef}
              >
                <img
                  src={builder.image(project.gallery[currentIdx]).url()}
                  alt={project.gallery[currentIdx].alt || `Gallery image ${currentIdx + 1}`}
                  className={
                    isZoomed
                      ? 'object-contain cursor-grab shadow-lg rounded-lg select-none'
                      : 'object-contain max-w-[90vw] max-h-[80vh] rounded-lg shadow-lg cursor-zoom-in'
                  }
                  style={isZoomed ? { 
                    width: '90vw',
                    height: 'auto',
                    maxWidth: '90vw',
                    objectFit: 'contain',
                    transform: `translate(${dragPosition.x}px, ${dragPosition.y}px)`,
                    cursor: isDragging ? 'grabbing' : 'grab',
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                  } : {}}
                  onClick={handleImageClick}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  title={isZoomed ? 'Click to zoom out, drag to move' : 'Click to zoom in'}
                  draggable={false}
                />
              </div>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl font-bold focus:outline-none z-10"
                onClick={nextImg}
                aria-label="Next image"
              >
                ›
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
} 