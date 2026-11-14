import { PortableText } from '@portabletext/react'

const components = {
  block: {
    blockquote: ({ children, value }) => (
      <blockquote className="border-l-2 border-blue-500/60 pl-4 my-6 text-gray-200 italic">
        {children}
        {value?.attribution ? (
          <footer className="mt-2 text-sm text-gray-400 not-italic">— {value.attribution}</footer>
        ) : null}
      </blockquote>
    ),
  },
  types: {
    code: ({ value }) => (
      <pre className="my-6 overflow-auto rounded-xl border border-gray-800 bg-[#070b16] p-4 text-sm text-gray-300">
        <code>{value?.code}</code>
      </pre>
    ),
    divider: ({ value }) => (
      <hr
        className={`my-10 border-gray-800 ${
          value?.style === 'dashed' ? 'border-dashed' : value?.style === 'dotted' ? 'border-dotted' : ''
        }`}
      />
    ),
    table: ({ value }) => {
      const rows = Array.isArray(value?.rows) ? value.rows : []
      if (!rows.length) return null
      const [head, ...rest] = rows
      return (
        <div className="my-6 overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-sm">
            {value?.withHeader !== false && (
              <thead className="bg-white/5 text-gray-200">
                <tr>
                  {(head.cells ?? []).map((cell, i) => (
                    <th key={i} className="px-4 py-2 text-left font-bold">{cell}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="text-gray-300">
              {(value?.withHeader !== false ? rest : rows).map((row, i) => (
                <tr key={i} className="border-t border-gray-800">
                  {(row.cells ?? []).map((cell, j) => (
                    <td key={j} className="px-4 py-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
    cta: ({ value }) => (
      <div
        className={`my-8 rounded-2xl border border-gray-800 bg-white/5 p-6 ${
          value?.alignment === 'left' ? 'text-left' : value?.alignment === 'right' ? 'text-right' : 'text-center'
        }`}
      >
        {value?.title && <div className="text-xl font-bold text-white">{value.title}</div>}
        {value?.text && <div className="mt-2 text-gray-300">{value.text}</div>}
        {value?.buttonText && value?.buttonUrl && (
          <a className="btn-primary mt-4 inline-flex" href={value.buttonUrl} target="_blank" rel="noreferrer">
            {value.buttonText}
          </a>
        )}
      </div>
    ),
    embed: ({ value }) => {
      if (!value?.html) return null
      return (
        <figure className="my-8">
          <div
            className="overflow-hidden rounded-xl border border-gray-800 [&_iframe]:h-full [&_iframe]:w-full"
            style={{ aspectRatio: '16 / 9' }}
            dangerouslySetInnerHTML={{ __html: value.html }}
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-xs text-gray-500">{value.caption}</figcaption>
          )}
        </figure>
      )
    },
    rawHtml: ({ value }) =>
      value?.html ? (
        <div className="my-6" dangerouslySetInnerHTML={{ __html: value.html }} />
      ) : null,
  },
}

export default function BlogBody({ value }) {
  if (!Array.isArray(value) || value.length === 0) return null
  return <PortableText value={value} components={components} />
}
