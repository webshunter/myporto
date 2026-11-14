/**
 * Konversi Markdown sederhana → Portable Text.
 * Dipakai endpoint API blog (MCP / otomasi artikel) supaya hasilnya sama
 * dengan artikel yang ditulis lewat editor.
 *
 * Mendukung: heading, paragraf, list bullet/number, blockquote, code fence,
 * gambar, dan inline bold/italic/code/link.
 */

let counter = 0
const key = (p = 'k') => `${p}${Date.now().toString(36)}${(counter++).toString(36)}`

function inline(text) {
  const children = []
  const markDefs = []

  // tokenizer sederhana: **bold**, *italic*, `code`, [link](url)
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  let last = 0
  let match

  const pushText = (value) => {
    if (value) children.push({ _type: 'span', _key: key('s'), text: value, marks: [] })
  }

  while ((match = pattern.exec(text)) !== null) {
    pushText(text.slice(last, match.index))
    const token = match[0]

    if (token.startsWith('**')) {
      children.push({ _type: 'span', _key: key('s'), text: token.slice(2, -2), marks: ['strong'] })
    } else if (token.startsWith('`')) {
      children.push({ _type: 'span', _key: key('s'), text: token.slice(1, -1), marks: ['code'] })
    } else if (token.startsWith('*')) {
      children.push({ _type: 'span', _key: key('s'), text: token.slice(1, -1), marks: ['em'] })
    } else {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      const defKey = key('link')
      markDefs.push({ _type: 'link', _key: defKey, href: link[2] })
      children.push({ _type: 'span', _key: key('s'), text: link[1], marks: [defKey] })
    }

    last = pattern.lastIndex
  }

  pushText(text.slice(last))

  if (!children.length) children.push({ _type: 'span', _key: key('s'), text: '', marks: [] })

  return { children, markDefs }
}

function block(style, text, extra = {}) {
  const { children, markDefs } = inline(text)
  return { _type: 'block', _key: key('b'), style, markDefs, children, ...extra }
}

export function markdownToPortableText(markdown = '') {
  const lines = String(markdown).replace(/\r\n/g, '\n').split('\n')
  const out = []

  let buffer = []
  let listType = null
  let inCode = false
  let codeLang = ''
  let codeLines = []

  const flushParagraph = () => {
    if (buffer.length) {
      out.push(block('normal', buffer.join(' ').trim()))
      buffer = []
    }
  }

  const flushList = () => {
    listType = null
  }

  lines.forEach((raw) => {
    const line = raw.trimEnd()

    const fence = line.match(/^```(\w*)\s*$/)
    if (fence) {
      if (!inCode) {
        flushParagraph()
        flushList()
        inCode = true
        codeLang = fence[1] || 'javascript'
        codeLines = []
      } else {
        out.push({ _type: 'code', _key: key('c'), language: codeLang, code: codeLines.join('\n'), filename: '' })
        inCode = false
        codeLines = []
      }
      return
    }

    if (inCode) {
      codeLines.push(raw)
      return
    }

    if (!line.trim()) {
      flushParagraph()
      flushList()
      return
    }

    const heading = line.match(/^(#{1,4})\s+(.*)$/)
    if (heading) {
      flushParagraph()
      flushList()
      out.push(block(`h${heading[1].length}`, heading[2].trim()))
      return
    }

    const quote = line.match(/^>\s?(.*)$/)
    if (quote) {
      flushParagraph()
      flushList()
      out.push(block('blockquote', quote[1].trim()))
      return
    }

    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/)
    if (image) {
      flushParagraph()
      flushList()
      out.push({
        _type: 'image',
        _key: key('i'),
        alt: image[1] || '',
        url: image[2],
      })
      return
    }

    const bullet = line.match(/^[-*+]\s+(.*)$/)
    if (bullet) {
      flushParagraph()
      listType = 'bullet'
      out.push(block('normal', bullet[1].trim(), { listItem: 'bullet', level: 1 }))
      return
    }

    const numbered = line.match(/^\d+[.)]\s+(.*)$/)
    if (numbered) {
      flushParagraph()
      listType = 'number'
      out.push(block('normal', numbered[1].trim(), { listItem: 'number', level: 1 }))
      return
    }

    if (listType) flushList()
    buffer.push(line.trim())
  })

  flushParagraph()

  if (inCode && codeLines.length) {
    out.push({ _type: 'code', _key: key('c'), language: codeLang, code: codeLines.join('\n'), filename: '' })
  }

  return out
}
