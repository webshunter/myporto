'use client'

import { useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { saveProject } from '@/app/admin/actions'
import {
  editorJsToPortableText,
  portableTextToEditorJs,
} from '@/lib/admin/editorjs'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

const imageUrl = (ref) =>
  ref && projectId
    ? `https://cdn.sanity.io/images/${projectId}/${dataset}/${ref.replace(/^image-/, '')}`
    : null

async function uploadFile(file) {
  const body = new FormData()
  body.append('file', file)
  const res = await fetch('/api/admin/upload', { method: 'POST', body })
  return res.json()
}

export default function ProjectEditor({ project }) {
  const router = useRouter()
  const holder = useRef(null)
  const editorRef = useRef(null)

  const [name, setName] = useState(project?.name ?? '')
  const [slug, setSlug] = useState(project?.slug ?? '')
  const [description, setDescription] = useState(project?.description ?? '')
  const [icon, setIcon] = useState(project?.icon ?? null)
  const [gallery, setGallery] = useState(project?.gallery ?? [])
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState(null)
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    let destroyed = false

    const init = async () => {
      const [{ default: EditorJS }, { default: Header }, { default: List }, { default: Quote }, { default: CodeTool }, { default: ImageTool }] =
        await Promise.all([
          import('@editorjs/editorjs'),
          import('@editorjs/header'),
          import('@editorjs/list'),
          import('@editorjs/quote'),
          import('@editorjs/code'),
          import('@editorjs/image'),
        ])

      if (destroyed || !holder.current) return

      editorRef.current = new EditorJS({
        holder: holder.current,
        placeholder: 'Ceritakan project ini, ketik / untuk menyisipkan blok',
        data: portableTextToEditorJs(project?.content, projectId, dataset),
        tools: {
          header: { class: Header, config: { levels: [2, 3, 4], defaultLevel: 2 }, inlineToolbar: true },
          list: { class: List, inlineToolbar: true },
          quote: { class: Quote, inlineToolbar: true },
          code: CodeTool,
          image: {
            class: ImageTool,
            config: {
              endpoints: { byFile: '/api/admin/upload' },
              field: 'file',
              types: 'image/*',
              uploader: {
                async uploadByFile(file) {
                  return uploadFile(file)
                },
              },
            },
          },
        },
      })
    }

    init().catch((error) => {
      console.error('[admin] project editor init failed:', error)
      setMessage({ type: 'error', text: 'Editor gagal dimuat. Muat ulang halaman.' })
    })

    return () => {
      destroyed = true
      const editor = editorRef.current
      editorRef.current = null
      if (editor?.destroy) Promise.resolve(editor.destroy()).catch(() => {})
    }
  }, [project?.content])

  const handleIcon = async (file) => {
    if (!file) return
    setBusy(true)
    const json = await uploadFile(file)
    if (json?.asset?._id) {
      setIcon({ _type: 'image', asset: { _type: 'reference', _ref: json.asset._id }, alt: name })
    } else {
      setMessage({ type: 'error', text: json?.error ?? 'Upload gagal.' })
    }
    setBusy(false)
  }

  const handleGallery = async (files) => {
    if (!files?.length) return
    setBusy(true)
    const uploaded = []
    for (const file of Array.from(files)) {
      const json = await uploadFile(file)
      if (json?.asset?._id) {
        uploaded.push({
          _type: 'image',
          _key: `g${Date.now()}${uploaded.length}`,
          asset: { _type: 'reference', _ref: json.asset._id },
        })
      }
    }
    setGallery((prev) => [...prev, ...uploaded])
    setBusy(false)
  }

  const handleSave = () => {
    if (!name.trim()) {
      setMessage({ type: 'error', text: 'Nama project wajib diisi.' })
      return
    }
    setMessage(null)

    startTransition(async () => {
      try {
        const saved = await editorRef.current?.save()
        const result = await saveProject({
          id: project?._id ?? 'new',
          name,
          slug,
          description,
          icon,
          gallery,
          content: editorJsToPortableText(saved?.blocks ?? []),
        })

        if (!result.ok) {
          setMessage({ type: 'error', text: result.error })
          return
        }

        setMessage({ type: 'ok', text: 'Project disimpan.' })
        if (!project?._id) router.replace(`/admin/projects/${result.id}`)
        router.refresh()
      } catch (error) {
        console.error('[admin] save project failed:', error)
        setMessage({ type: 'error', text: 'Gagal menyimpan project.' })
      }
    })
  }

  const iconUrl = useMemo(() => imageUrl(icon?.asset?._ref), [icon])

  return (
    <div className="editor-grid">
      <div className="editor-canvas">
        <div className="editor-sheet">
          <textarea
            className="editor-title"
            placeholder="Nama project"
            rows={1}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onInput={(e) => {
              e.currentTarget.style.height = 'auto'
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
            }}
          />
          <p className="editor-hint">
            {project?._id ? `ID ${project._id}` : 'Project baru'} · slug /project/{slug || 'nama-project'}
          </p>

          <div className="field" style={{ marginTop: 18 }}>
            <span className="label">Deskripsi singkat</span>
            <textarea
              className="textarea"
              rows={3}
              maxLength={300}
              placeholder="Dipakai di kartu homepage dan halaman /project"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="counter">
              <span className="counter-track">
                <span className="counter-fill" style={{ width: `${(description.length / 300) * 100}%` }} />
              </span>
              <span className="counter-text num">{description.length}/300</span>
            </div>
          </div>

          <div className="editor-blocks" ref={holder} />
        </div>
      </div>

      <aside className="editor-side">
        <div className="side-head">Pengaturan project</div>

        <div className="side-block">
          <div className="side-title">URL</div>
          <div className="input-affix">
            <span className="prefix">/project/</span>
            <input
              className="input is-mono"
              value={slug}
              placeholder="nama-project"
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
        </div>

        <div className="side-block">
          <div className="side-title">Gambar cover</div>
          <div className="image-field">
            {iconUrl ? (
              <img className="image-preview" src={iconUrl} alt="" />
            ) : (
              <div className="image-preview is-empty">Kosong</div>
            )}
            <div className="photo-actions">
              <label className="btn btn-sm" style={{ cursor: 'pointer' }}>
                {busy ? 'Mengunggah...' : 'Pilih gambar'}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleIcon(e.target.files?.[0])}
                />
              </label>
              {iconUrl && (
                <button type="button" className="btn btn-sm" onClick={() => setIcon(null)}>
                  Hapus
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="side-block">
          <div className="side-title">Galeri</div>
          <div className="chips" style={{ gap: 8 }}>
            {gallery.map((item) => (
              <div key={item._key} style={{ position: 'relative' }}>
                <img
                  className="image-preview"
                  style={{ width: 60, height: 60 }}
                  src={imageUrl(item.asset?._ref)}
                  alt=""
                />
                <button
                  type="button"
                  className="icon-btn"
                  style={{ position: 'absolute', top: -8, right: -8, background: 'var(--surface-3)' }}
                  aria-label="Hapus gambar"
                  onClick={() => setGallery((prev) => prev.filter((g) => g._key !== item._key))}
                >
                  <svg aria-hidden="true" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
            ))}
            <label className="image-preview is-empty" style={{ cursor: 'pointer', width: 60, height: 60 }}>
              +
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={(e) => handleGallery(e.target.files)}
              />
            </label>
          </div>
          <div className="hint">Ditampilkan sebagai galeri di /project/[slug].</div>
        </div>

        <div className="side-block">
          {message && <div className={`notice${message.type === 'ok' ? ' is-ok' : ''}`}>{message.text}</div>}
          <div className="form-actions">
            <button type="button" className="btn btn-primary" disabled={pending} onClick={handleSave}>
              {pending ? 'Menyimpan...' : 'Simpan project'}
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}
