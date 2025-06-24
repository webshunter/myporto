'use client';
import BlockContent from '@sanity/block-content-to-react';
import { useRef } from 'react';

function CodeBlock({ node }) {
  const codeRef = useRef(null);
  const handleCopy = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(codeRef.current.innerText);
    }
  };
  return (
    <div className="relative my-4">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold hover:bg-yellow-500 transition-colors z-10"
        title="Copy code"
      >
        Copy
      </button>
      <pre className="bg-gray-900 text-yellow-200 rounded p-4 overflow-x-auto text-sm">
        <code ref={codeRef}>{node.code}</code>
      </pre>
    </div>
  );
}

const serializers = {
  types: {
    code: CodeBlock,
  },
};

export default function BlockContentClient({ blocks }) {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return <div className="text-gray-400 italic">No detail content for this item.</div>;
  }
  return <BlockContent blocks={blocks} serializers={serializers} />;
} 