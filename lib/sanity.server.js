import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

/**
 * Client server-only untuk operasi tulis (create / patch / delete) dan query
 * yang butuh draft/private data.
 *
 * PENTING: file ini memegang SANITY_API_TOKEN. Jangan pernah diimpor dari
 * komponen "use client" — token akan ikut ter-bundle ke browser.
 */
if (typeof window !== 'undefined') {
  throw new Error(
    'lib/sanity.server.js hanya boleh dipakai di server. ' +
      'Untuk komponen client, impor lib/sanity.js.'
  )
}

const token = process.env.SANITY_API_TOKEN

export const hasWriteToken = Boolean(token)

if (!token) {
  console.warn(
    '[sanity] SANITY_API_TOKEN kosong — operasi tulis (create/patch) akan gagal 401.'
  )
}

export const liveClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})
