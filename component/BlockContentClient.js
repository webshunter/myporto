'use client';
import BlockContent from '@sanity/block-content-to-react';

export default function BlockContentClient({ blocks }) {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return <div className="text-gray-400 italic">Belum ada konten detail untuk project ini.</div>;
  }
  return <BlockContent blocks={blocks} />;
} 