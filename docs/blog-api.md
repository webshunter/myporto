# API Blog & MCP

Dua jalan untuk membuat artikel secara otomatis: REST (`/api/posts`) dan MCP JSON-RPC (`/api/mcp`). Keduanya memakai isi **Markdown** dan langsung dikonversi ke Portable Text yang sama dengan editor admin.

## Autentikasi

Semua request wajib membawa header:

```
Authorization: Bearer <BLOG_API_KEY>
```

Nilai key ada di `.env.local` (`BLOG_API_KEY`). Kalau bocor, ganti nilainya dan restart server.

## REST

### Buat / perbarui artikel

```bash
curl -X POST http://192.168.1.4:3005/api/posts \
  -H "Authorization: Bearer $BLOG_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Cara memakai DeepSeek untuk koreksi artikel",
    "markdown": "## Pendahuluan\n\nDeepSeek bisa dipakai sebagai editor...\n\n- poin satu\n- poin dua\n\n```js\nconsole.log(\"halo\")\n```\n",
    "excerpt": "Ringkasan singkat.",
    "tags": ["deepseek", "ai"],
    "categories": ["coding"],
    "publish": true
  }'
```

Respons `201`:

```json
{ "ok": true, "id": "…", "slug": "cara-memakai-deepseek-untuk-koreksi-artikel", "url": "/blog/cara-memakai-deepseek-untuk-koreksi-artikel", "published": true, "blocks": 5 }
```

Field yang diterima:

| Field | Wajib | Keterangan |
|---|---|---|
| `title` | ya | judul artikel |
| `markdown` | salah satu dari tiga | isi Markdown |
| `blocks` | salah satu | output Editor.js (array blok) |
| `body` | salah satu | Portable Text siap pakai |
| `slug` | tidak | otomatis dari judul bila kosong |
| `excerpt` | tidak | ringkasan kartu blog |
| `tags`, `categories` | tidak | kategori berupa **nama** yang sudah ada |
| `publish` / `publishedAt` | tidak | tanpa ini artikel tersimpan sebagai draf |
| `metaTitle`, `metaDescription` | tidak | default dari judul/excerpt |
| `author` | tidak | dicocokkan dengan nama author di Sanity |
| `id` | tidak | untuk memperbarui artikel yang sudah ada |

Jika `slug` sudah dipakai, dokumen itu **diperbarui**, bukan diduplikasi.

### Daftar artikel

```bash
curl "http://192.168.1.4:3005/api/posts?status=draft&limit=10" \
  -H "Authorization: Bearer $BLOG_API_KEY"
```

`status`: `all` | `published` | `draft`.

## MCP

Endpoint: `POST /api/mcp` — JSON-RPC 2.0, cocok untuk MCP client yang mendukung *streamable HTTP*.

```bash
curl -X POST http://192.168.1.4:3005/api/mcp \
  -H "Authorization: Bearer $BLOG_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

Tool yang tersedia:

- `create_blog_post` — argumen sama seperti body REST (`title`, `markdown`, `publish`, …)
- `list_blog_posts` — `status`, `limit`

Contoh `tools/call`:

```bash
curl -X POST http://192.168.1.4:3005/api/mcp \
  -H "Authorization: Bearer $BLOG_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0","id":2,"method":"tools/call",
    "params":{"name":"create_blog_post","arguments":{"title":"Halo MCP","markdown":"Isi artikel.","publish":false}}
  }'
```

Konfigurasi di client MCP (contoh Claude Desktop / Cursor):

```json
{
  "mcpServers": {
    "myporto-blog": {
      "type": "http",
      "url": "http://192.168.1.4:3005/api/mcp",
      "headers": { "Authorization": "Bearer <BLOG_API_KEY>" }
    }
  }
}
```

`GET /api/mcp` mengembalikan ringkasan server + daftar tool (untuk cek cepat).

## AI di editor (DeepSeek)

Editor `/admin/blog/[id]` punya panel **Bantuan AI (DeepSeek)**:

- **Koreksi ejaan & tata bahasa** — memperbaiki ejaan, tanda baca, dan kalimat janggal per blok; tag bold/italic/link dipertahankan.
- **Buat ringkasan** — mengisi kolom ringkasan (maks 180 karakter).
- **Buat meta description** — mengisi kolom SEO (maks 155 karakter).

Butuh `DEEPSEEK_API_KEY` di environment (`.env.local` saat lokal, Environment Variables Vercel saat produksi). Tanpa key, panel menampilkan pesan bahwa key belum diisi. Endpoint: `POST /api/admin/ai` (wajib sesi admin atau Bearer API key), body `{task: "proofread" | "excerpt" | "meta", …}`.
