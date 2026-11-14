'use client'

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deletePost, savePost } from '@/app/admin/actions'
import {
  editorJsToPortableText,
  portableTextToEditorJs,
} from '@/lib/admin/editorjs'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

function Counter({ value = '', max }) {
  const len = value.length
  const pct = Math.min((len / max) * 100, 100)
  return (
    <div className="counter">
      <span className="counter-track">
        <span className="counter-fill" style={{ width: `${pct}%` }} />
      </span>
      <span className="counter-text num">
        {len}/{max}
      </span>
    </div>
  )
}

export default function PostEditor({ post, categories = [], authors = [] }) {
  const router = useRouter()
  const holder = useRef(null)
  const editorRef = useRef(null)

  const [title, setTitle] = useState(post?.title ?? '')
  const [slug, setSlug] = useState(post?.slug ?? '')
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '')
  const [publishedAt, setPublishedAt] = useState(
    post?.publishedAt ? post.publishedAt.slice(0, 10) : new Date().toISOString().slice(0, 10)
  )
  const [authorId, setAuthorId] = useState(post?.author ?? authors[0]?._id ?? '')
  const [categoryIds, setCategoryIds] = useState(post?.categories ?? [])
  const [tags, setTags] = useState((post?.tags ?? []).join(', '))
  const [seoTitle, setSeoTitle] = useState(post?.seo?.metaTitle ?? '')
  const [seoDesc, setSeoDesc] = useState(post?.seo?.metaDescription ?? '')
  const [mainImage, setMainImage] = useState(post?.mainImage ?? null)
  const [uploading, setUploading] = useState(false)

  const [message, setMessage] = useState(null)
  const [pending, startTransition] = useTransition()
  const [aiBusy, setAiBusy] = useState(null)

  const published = Boolean(post?.publishedAt)

  useEffect(() => {
    let destroyed = false

    const init = async () => {
      const [
        { default: EditorJS },
        { default: List },
        { default: ImageTool },
        { CustomHeader },
        { BlockQuote },
        { CodeBlock },
        { Divider },
        { TableBlock },
        { CTABlock },
        { RawHtmlBlock },
        { EmbedBlock },
        { YouTubeEmbed },
        { CodePenEmbed },
      ] = await Promise.all([
        import('@editorjs/editorjs'),
        import('@editorjs/list'),
        import('@editorjs/image'),
        import('@/lib/editor/tools/custom-header'),
        import('@/lib/editor/tools/block-quote'),
        import('@/lib/editor/tools/code-block'),
        import('@/lib/editor/tools/divider'),
        import('@/lib/editor/tools/table-block'),
        import('@/lib/editor/tools/cta-block'),
        import('@/lib/editor/tools/raw-html-block'),
        import('@/lib/editor/tools/embed-block'),
        import('@/lib/editor/tools/youtube-embed'),
        import('@/lib/editor/tools/codepen-embed'),
      ])

      if (destroyed || !holder.current) return

      const editor = new EditorJS({
        holder: holder.current,
        autofocus: false,
        placeholder: 'Tulis isi artikel, ketik / untuk menyisipkan blok',
        data: portableTextToEditorJs(post?.body, projectId, dataset),
        tools: {
          header: { class: CustomHeader, inlineToolbar: true },
          list: { class: List, inlineToolbar: true, config: { defaultStyle: 'unordered' } },
          quote: BlockQuote,
          code: CodeBlock,
          divider: Divider,
          table: TableBlock,
          cta: CTABlock,
          rawHtml: RawHtmlBlock,
          embed: EmbedBlock,
          youtube: YouTubeEmbed,
          codepen: CodePenEmbed,
          image: {
            class: ImageTool,
            config: {
              endpoints: { byFile: '/api/admin/upload' },
              field: 'file',
              types: 'image/*',
              uploader: {
                async uploadByFile(file) {
                  const body = new FormData()
                  body.append('file', file)
                  const res = await fetch('/api/admin/upload', { method: 'POST', body })
                  return res.json()
                },
              },
            },
          },
        },
      })

      editorRef.current = editor
    }

    init().catch((error) => {
      console.error('[admin] editor init failed:', error)
      setMessage({ type: 'error', text: 'Editor gagal dimuat. Muat ulang halaman.' })
    })

    return () => {
      destroyed = true
      const editor = editorRef.current
      editorRef.current = null
      if (editor?.destroy) {
        Promise.resolve(editor.destroy()).catch(() => {})
      }
    }
  }, [post?.body])

  const toggleCategory = (id) => {
    setCategoryIds((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]))
  }

  const uploadMainImage = async (file) => {
    if (!file) return
    setUploading(true)
    try {
      const body = new FormData()
      body.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body })
      const json = await res.json()
      if (json?.asset?._id) {
        setMainImage({
          _type: 'image',
          asset: { _type: 'reference', _ref: json.asset._id },
          alt: title,
        })
      } else {
        setMessage({ type: 'error', text: json?.error ?? 'Upload gagal.' })
      }
    } finally {
      setUploading(false)
    }
  }

  const handleSave = (publish) => {
    if (!title.trim()) {
      setMessage({ type: 'error', text: 'Judul wajib diisi sebelum menyimpan.' })
      return
    }
    setMessage(null)

    startTransition(async () => {
      try {
        const saved = await editorRef.current?.save()
        const body = editorJsToPortableText(saved?.blocks ?? [])

        const result = await savePost({
          id: post?._id ?? 'new',
          title,
          slug,
          excerpt,
          publishedAt: publishedAt ? new Date(`${publishedAt}T09:00:00`).toISOString() : null,
          authorId,
          categoryIds,
          tags: tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
          seo: { metaTitle: seoTitle, metaDescription: seoDesc },
          mainImage,
          body,
          publish,
        })

        if (!result.ok) {
          setMessage({ type: 'error', text: result.error })
          return
        }

        setMessage({ type: 'ok', text: publish ? 'Artikel diterbitkan.' : 'Draft disimpan.' })

        if (!post?._id) {
          router.replace(`/admin/blog/${result.id}`)
        }
        router.refresh()
      } catch (error) {
        console.error('[admin] save failed:', error)
        setMessage({ type: 'error', text: 'Gagal menyimpan artikel.' })
      }
    })
  }

  const collectBlocks = async () => {
    const saved = await editorRef.current?.save()
    const blocks = saved?.blocks ?? []
    const textBlocks = blocks.filter(
      (block) =>
        ['paragraph', 'header', 'quote'].includes(block.type) &&
        String(block.data?.text ?? '').replace(/<[^>]*>/g, '').trim().length > 0
    )
    return { blocks, textBlocks }
  }

  const plainText = (blocks) =>
    blocks
      .map((block) => String(block.data?.text ?? '').replace(/<[^>]*>/g, ' '))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()

  const callAi = async (payload) => {
    const res = await fetch('/api/admin/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(json.error || `AI gagal (${res.status})`)
    return json
  }

  const runProofread = async () => {
    setAiBusy('proofread')
    setMessage(null)
    try {
      const { textBlocks } = await collectBlocks()
      if (!textBlocks.length) {
        setMessage({ type: 'error', text: 'Belum ada teks yang bisa dikoreksi.' })
        return
      }

      let fixed = 0
      for (let i = 0; i < textBlocks.length; i += 20) {
        const chunk = textBlocks.slice(i, i + 20)
        const result = await callAi({
          task: 'proofread',
          items: chunk.map((block) => ({ id: block.id, html: block.data.text })),
        })

        for (const item of result.items ?? []) {
          const before = chunk.find((b) => b.id === item.id)?.data?.text
          if (before !== undefined && before !== item.html) {
            await editorRef.current?.blocks.update(item.id, { text: item.html })
            fixed += 1
          }
        }
      }

      setMessage({
        type: 'ok',
        text: `${textBlocks.length} blok diperiksa DeepSeek, ${fixed} diperbaiki.`,
      })
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setAiBusy(null)
    }
  }

  const runSummary = async (task) => {
    setAiBusy(task)
    setMessage(null)
    try {
      const { blocks } = await collectBlocks()
      const text = plainText(blocks)
      if (!text) {
        setMessage({ type: 'error', text: 'Isi artikel masih kosong.' })
        return
      }
      const result = await callAi({ task, text, title })
      if (task === 'excerpt') setExcerpt(result.text)
      if (task === 'meta') setSeoDesc(result.text)
      setMessage({ type: 'ok', text: task === 'excerpt' ? 'Ringkasan dibuat.' : 'Meta description dibuat.' })
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setAiBusy(null)
    }
  }

  const mainImageUrl = useMemo(() => {
    const ref = mainImage?.asset?._ref
    if (!ref || !projectId) return null
    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${ref.replace(/^image-/, '')}`
  }, [mainImage])

  return (
    <div className="editor-grid">
      <div className="editor-canvas">
        <div className="editor-sheet">
          <textarea
            className="editor-title"
            placeholder="Judul artikel"
            value={title}
            rows={1}
            onChange={(e) => setTitle(e.target.value)}
            onInput={(e) => {
              e.currentTarget.style.height = 'auto'
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
            }}
          />
          <p className="editor-hint">
            {post?._id ? `ID ${post._id}` : 'Artikel baru'} · slug /blog/{slug || 'judul-artikel'}
          </p>

          <div className="editor-blocks" ref={holder} />
        </div>
      </div>

      <aside className="editor-side">
        <div className="side-head">Pengaturan artikel</div>

        <div className="side-actions">
          <button type="button" className="btn" disabled={pending} onClick={() => handleSave(false)}>
            {pending ? 'Menyimpan...' : 'Simpan draft'}
          </button>
          <button type="button" className="btn btn-primary" disabled={pending} onClick={() => handleSave(true)}>
            Publikasikan
          </button>
          {post?._id && (
            <form action={deletePost} style={{ marginLeft: 'auto' }}>
              <input type="hidden" name="id" value={post._id} />
              <button type="submit" className="btn is-danger btn-sm" aria-label="Hapus artikel">
                Hapus
              </button>
            </form>
          )}
        </div>

        <div className="side-block">
          <div className="side-title">Publikasi</div>
          <div className="side-row">
            <span className="label">Status</span>
            <span className={`pill ${published ? 'is-live' : 'is-draft'}`}>
              {published ? 'Terbit' : 'Draf'}
            </span>
          </div>
          <div className="side-row">
            <span className="label">Tanggal</span>
            <input
              className="input"
              type="date"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
            />
          </div>
          <div className="side-row">
            <span className="label">Penulis</span>
            <select className="input" value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
              <option value="">Tanpa penulis</option>
              {authors.map((a) => (
                <option key={a._id} value={a._id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="side-block">
          <div className="side-title">URL</div>
          <div className="input-affix">
            <span className="prefix">/blog/</span>
            <input
              className="input is-mono"
              value={slug}
              placeholder="slug-artikel"
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <div className="hint">Kosongkan untuk dibuat otomatis dari judul.</div>
        </div>

        <div className="side-block">
          <div className="side-title">Kategori dan tag</div>
          <div className="chips">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat._id}
                className={`chip${categoryIds.includes(cat._id) ? ' is-on' : ''}`}
                onClick={() => toggleCategory(cat._id)}
              >
                {cat.title}
              </button>
            ))}
            {categories.length === 0 && <span className="hint">Belum ada kategori.</span>}
          </div>
          <input
            className="input"
            placeholder="next.js, sanity, cms"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <div className="hint">Pisahkan tag dengan koma.</div>
        </div>

        <div className="side-block">
          <div className="side-title">Ringkasan</div>
          <textarea
            className="textarea"
            rows={3}
            placeholder="Ringkasan singkat untuk kartu dan daftar blog"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </div>

        <div className="side-block">
          <div className="side-title">SEO dan pratinjau</div>
          <div className="field">
            <span className="label">Meta title</span>
            <input className="input" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
            <Counter value={seoTitle} max={60} />
          </div>
          <div className="field">
            <span className="label">Meta description</span>
            <textarea
              className="textarea"
              rows={3}
              value={seoDesc}
              onChange={(e) => setSeoDesc(e.target.value)}
            />
            <Counter value={seoDesc} max={160} />
          </div>
        </div>

        <div className="side-block">
          <div className="side-title">Bantuan AI (DeepSeek)</div>
          <div className="ai-actions">
            <button
              type="button"
              className="btn btn-sm"
              disabled={Boolean(aiBusy) || pending}
              onClick={runProofread}
            >
              {aiBusy === 'proofread' ? 'Memeriksa...' : 'Koreksi ejaan & tata bahasa'}
            </button>
            <button
              type="button"
              className="btn btn-sm"
              disabled={Boolean(aiBusy) || pending}
              onClick={() => runSummary('excerpt')}
            >
              {aiBusy === 'excerpt' ? 'Menyusun...' : 'Buat ringkasan'}
            </button>
            <button
              type="button"
              className="btn btn-sm"
              disabled={Boolean(aiBusy) || pending}
              onClick={() => runSummary('meta')}
            >
              {aiBusy === 'meta' ? 'Menyusun...' : 'Buat meta description'}
            </button>
          </div>
          <div className="hint">
            Mengirim teks artikel ke DeepSeek untuk dikoreksi. Tag bold/italic/link dipertahankan.
          </div>
        </div>

        <div className="side-block">
          <div className="side-title">Gambar utama</div>
          <div className="image-field">
            {mainImageUrl ? (
              <img className="image-preview" src={mainImageUrl} alt="" />
            ) : (
              <div className="image-preview is-empty">Kosong</div>
            )}
            <div className="photo-actions">
              <label className="btn btn-sm" style={{ cursor: 'pointer' }}>
                {uploading ? 'Mengunggah...' : 'Pilih gambar'}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => uploadMainImage(e.target.files?.[0])}
                />
              </label>
              {mainImageUrl && (
                <button type="button" className="btn btn-sm" onClick={() => setMainImage(null)}>
                  Hapus
                </button>
              )}
              <span className="hint">1200 × 630 px.</span>
            </div>
          </div>
        </div>

        {message && (
          <div className="side-block">
            <div className={`notice${message.type === 'ok' ? ' is-ok' : ''}`}>{message.text}</div>
          </div>
        )}
      </aside>
    </div>
  )
}
