/**
 * Konversi dua arah antara output Editor.js (tools dari repo block-editor)
 * dan Portable Text (Sanity). Dipakai di browser sebelum menyimpan.
 */

let keyCounter = 0
const k = (prefix = 'k') =>
  `${prefix}${Date.now().toString(36)}${(keyCounter++).toString(36)}`

/* --------------------------- inline helpers --------------------------- */

const MARK_ELEMENTS = {
  B: 'strong',
  STRONG: 'strong',
  I: 'em',
  EM: 'em',
  CODE: 'code',
  U: 'underline',
  S: 'strike-through',
}

function parseInline(html, markDefs = []) {
  const spans = []

  if (!html) {
    return { children: [{ _type: 'span', _key: k('s'), text: '', marks: [] }], markDefs }
  }

  if (typeof DOMParser === 'undefined') {
    return {
      children: [
        { _type: 'span', _key: k('s'), text: html.replace(/<[^>]*>/g, ''), marks: [] },
      ],
      markDefs,
    }
  }

  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html')
  const root = doc.body.firstElementChild

  const walk = (node, marks) => {
    node.childNodes.forEach((child) => {
      if (child.nodeType === 3) {
        const text = child.textContent
        if (text) spans.push({ _type: 'span', _key: k('s'), text, marks: [...marks] })
        return
      }
      if (child.nodeType !== 1) return

      const tag = child.tagName
      if (tag === 'BR') {
        spans.push({ _type: 'span', _key: k('s'), text: '\n', marks: [...marks] })
        return
      }
      if (tag === 'A') {
        const defKey = k('link')
        markDefs.push({ _type: 'link', _key: defKey, href: child.getAttribute('href') || '' })
        walk(child, [...marks, defKey])
        return
      }
      const mark = MARK_ELEMENTS[tag]
      if (mark) {
        walk(child, [...marks, mark])
        return
      }
      walk(child, marks)
    })
  }

  if (root) walk(root, [])
  if (!spans.length) spans.push({ _type: 'span', _key: k('s'), text: '', marks: [] })

  return { children: spans, markDefs }
}

/* ------------------------ Editor.js → PortableText ------------------- */

function listItemsToBlocks(items, style, level, out) {
  items.forEach((item) => {
    const { children, markDefs } = parseInline(item.content)
    out.push({
      _type: 'block',
      _key: k('b'),
      style: 'normal',
      listItem: style === 'ordered' ? 'number' : style === 'checklist' ? 'bullet' : 'bullet',
      level,
      markDefs,
      children,
    })
    if (Array.isArray(item.items) && item.items.length) {
      listItemsToBlocks(item.items, style, level + 1, out)
    }
  })
}

function youtubeHtml(videoId, url) {
  const id = videoId || (url || '').match(/(?:v=|youtu\.be\/)([\w-]+)/)?.[1]
  if (!id) return ''
  return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
}

export function editorJsToPortableText(blocks = []) {
  const out = []

  blocks.forEach((block) => {
    const data = block?.data ?? {}

    switch (block?.type) {
      case 'header': {
        const level = Math.min(Math.max(Number(data.level) || 2, 1), 4)
        const { children, markDefs } = parseInline(data.text)
        out.push({ _type: 'block', _key: k('b'), style: `h${level}`, markDefs, children })
        break
      }

      case 'paragraph': {
        const { children, markDefs } = parseInline(data.text)
        out.push({ _type: 'block', _key: k('b'), style: 'normal', markDefs, children })
        break
      }

      case 'list':
        listItemsToBlocks(data.items ?? [], data.style, 1, out)
        break

      case 'quote': {
        const { children, markDefs } = parseInline(data.text)
        const attribution = [data.author, data.source].filter(Boolean).join(', ')
        const node = {
          _type: 'block',
          _key: k('b'),
          style: 'blockquote',
          markDefs,
          children,
        }
        if (attribution) node.attribution = attribution
        out.push(node)
        break
      }

      case 'code':
        out.push({
          _type: 'code',
          _key: k('c'),
          language: data.language || 'javascript',
          code: data.code || '',
          filename: '',
        })
        break

      case 'image': {
        const url = data?.file?.url || ''
        const match = url.match(/\/images\/[^/]+\/[^/]+\/(.+)$/)
        if (!match) break
        out.push({
          _type: 'image',
          _key: k('i'),
          alt: data.caption || '',
          asset: { _type: 'reference', _ref: `image-${match[1]}` },
        })
        break
      }

      case 'divider':
        out.push({ _type: 'divider', _key: k('d'), style: data.style || 'solid' })
        break

      case 'table':
        out.push({
          _type: 'table',
          _key: k('t'),
          withHeader: Boolean(data.withHeader),
          rows: Array.isArray(data.content) ? data.content : [],
        })
        break

      case 'cta':
        out.push({
          _type: 'cta',
          _key: k('cta'),
          title: data.title || '',
          text: data.text || '',
          buttonText: data.buttonText || '',
          buttonUrl: data.buttonUrl || '',
          alignment: data.alignment || 'center',
        })
        break

      case 'embed':
        out.push({
          _type: 'embed',
          _key: k('e'),
          service: data.service || 'custom',
          source: data.source || '',
          html: data.embed || '',
          caption: data.caption || '',
        })
        break

      case 'youtube':
        out.push({
          _type: 'embed',
          _key: k('e'),
          service: 'youtube',
          source: data.url || (data.videoId ? `https://youtu.be/${data.videoId}` : ''),
          html: youtubeHtml(data.videoId, data.url),
          caption: data.caption || '',
        })
        break

      case 'codepen':
        out.push({
          _type: 'embed',
          _key: k('e'),
          service: 'codepen',
          source: data.url || data.penUrl || '',
          html: data.embed || '',
          caption: data.caption || '',
        })
        break

      case 'rawHtml':
        out.push({ _type: 'rawHtml', _key: k('r'), html: data.html || '' })
        break

      default:
        break
    }
  })

  return out
}

/* ------------------------ PortableText → Editor.js ------------------- */

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function spansToHtml(children = [], markDefs = []) {
  return children
    .map((span) => {
      let text = escapeHtml(span.text ?? '').replace(/\n/g, '<br>')
      const marks = span.marks ?? []
      if (marks.includes('code')) text = `<code>${text}</code>`
      if (marks.includes('em')) text = `<i>${text}</i>`
      if (marks.includes('strong')) text = `<b>${text}</b>`
      if (marks.includes('underline')) text = `<u>${text}</u>`
      if (marks.includes('strike-through')) text = `<s>${text}</s>`

      marks.forEach((mark) => {
        const def = markDefs.find((d) => d._key === mark)
        if (def?._type === 'link') text = `<a href="${escapeHtml(def.href)}">${text}</a>`
      })

      return text
    })
    .join('')
}

export function portableTextToEditorJs(value, projectId, dataset) {
  if (!Array.isArray(value) || !value.length) {
    return { blocks: [{ id: k('blk'), type: 'paragraph', data: { text: '' } }] }
  }

  const blocks = []
  let pendingList = null

  const flushList = () => {
    if (pendingList) {
      blocks.push(pendingList)
      pendingList = null
    }
  }

  value.forEach((node) => {
    if (!node) return

    if (node._type === 'code') {
      flushList()
      blocks.push({
        id: k('blk'),
        type: 'code',
        data: { code: node.code || '', language: node.language || 'javascript' },
      })
      return
    }

    if (node._type === 'image') {
      flushList()
      const ref = node.asset?._ref || ''
      const path = ref.replace(/^image-/, '')
      const url = path && projectId && dataset
        ? `https://cdn.sanity.io/images/${projectId}/${dataset}/${path}`
        : ''
      blocks.push({ id: k('blk'), type: 'image', data: { file: { url }, caption: node.alt || '' } })
      return
    }

    if (node._type === 'divider') {
      flushList()
      blocks.push({ id: k('blk'), type: 'divider', data: { style: node.style || 'solid' } })
      return
    }

    if (node._type === 'table') {
      flushList()
      blocks.push({
        id: k('blk'),
        type: 'table',
        data: { withHeader: node.withHeader !== false, content: node.rows || [] },
      })
      return
    }

    if (node._type === 'cta') {
      flushList()
      blocks.push({
        id: k('blk'),
        type: 'cta',
        data: {
          title: node.title || '',
          text: node.text || '',
          buttonText: node.buttonText || 'Buka',
          buttonUrl: node.buttonUrl || '',
          backgroundColor: '#0f1729',
          textColor: '#e9edf6',
          alignment: node.alignment || 'center',
        },
      })
      return
    }

    if (node._type === 'embed') {
      flushList()
      if (node.service === 'youtube') {
        const id = (node.source || '').match(/(?:v=|youtu\.be\/|embed\/)([\w-]+)/)?.[1] || ''
        blocks.push({
          id: k('blk'),
          type: 'youtube',
          data: { videoId: id, url: node.source || '', caption: node.caption || '' },
        })
      } else {
        blocks.push({
          id: k('blk'),
          type: 'embed',
          data: {
            service: node.service || 'custom',
            source: node.source || '',
            embed: node.html || '',
            width: 580,
            height: 320,
            caption: node.caption || '',
          },
        })
      }
      return
    }

    if (node._type === 'rawHtml') {
      flushList()
      blocks.push({ id: k('blk'), type: 'rawHtml', data: { html: node.html || '' } })
      return
    }

    if (node._type !== 'block') return

    const html = spansToHtml(node.children, node.markDefs)

    if (node.listItem) {
      const style = node.listItem === 'number' ? 'ordered' : 'unordered'
      if (pendingList && pendingList.data.style === style) {
        pendingList.data.items.push({ content: html, items: [] })
      } else {
        flushList()
        pendingList = {
          id: k('blk'),
          type: 'list',
          data: { style, items: [{ content: html, items: [] }] },
        }
      }
      return
    }

    flushList()

    if (node.style === 'blockquote') {
      blocks.push({
        id: k('blk'),
        type: 'quote',
        data: { text: html, author: node.attribution || '', source: '' },
      })
      return
    }

    if (/^h[1-4]$/.test(node.style || '')) {
      blocks.push({
        id: k('blk'),
        type: 'header',
        data: { text: html, level: Number(node.style.slice(1)) },
      })
      return
    }

    blocks.push({ id: k('blk'), type: 'paragraph', data: { text: html } })
  })

  flushList()

  return { blocks: blocks.length ? blocks : [{ id: k('blk'), type: 'paragraph', data: { text: '' } }] }
}
