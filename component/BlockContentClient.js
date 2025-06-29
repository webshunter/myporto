'use client';
import { PortableText } from '@portabletext/react'

const components = {
  types: {
    code: ({ value }) => (
      <div className="relative my-4">
        <button
          onClick={() => navigator.clipboard.writeText(value.code)}
          className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold hover:bg-yellow-500 transition-colors z-10"
          title="Copy code"
        >
          Copy
        </button>
        <pre className="bg-gray-900 text-yellow-200 rounded p-4 overflow-x-auto text-sm">
          <code>{value.code}</code>
        </pre>
      </div>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-6 mb-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal ml-6 mb-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} className="text-yellow-400 underline hover:text-yellow-300" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-bold mt-3 mb-2">{children}</h4>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-gray-300 my-4">{children}</blockquote>,
    normal: ({ children }) => <p className="mb-4">{children}</p>,
  },
}

export default function BlockContentClient({ blocks }) {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return <div className="text-gray-400 italic">No detail content for this item.</div>
  }
  return <PortableText value={blocks} components={components} />
} 