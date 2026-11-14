export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-20'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

if (!projectId) {
  console.warn(
    '[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID belum diset — query akan gagal.'
  )
}
