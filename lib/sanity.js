import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { PORTFOLIO_DOCUMENT_ID } from '@/sanity/constants'

// Client untuk CDN (production/public)
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-03-20',
  useCdn: true,
})

// Client untuk real-time updates (khusus API/webhook/preview)
export const liveClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-03-20',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

const portfolioFields = `
  name,
  headtitle,
  email,
  github,
  'foto': image.asset->url,
  description,
  location,
  linkcv,
  language,
  'experience': experience[]->{
    name,
    position,
    startDate,
    endDate,
    details
  },
  'education': education[]->{
    name,
    startDate,
    endDate,
    graduate,
    education
  },
  'services': services[]->{
    name,
    icon,
    skill
  },
  'skills': skills[]->{
    name,
    prosentase
  },
  'project': project[]->{
    name,
    'icon': icon.asset->url,
    details
  }
`

export async function getPortfolio() {
  return client.fetch(
    `*[_type == "portofolio" && _id == $id][0]{${portfolioFields}}`,
    { id: PORTFOLIO_DOCUMENT_ID }
  )
}

// Semua fungsi fetch di bawah hanya menggunakan client CDN
export async function getAllPosts() {
  return client.fetch(`
    *[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt,
      "author": author->name,
      "categories": categories[]->title,
      tags
    }
  `)
}

export async function getPostBySlug(slug) {
  return client.fetch(`
    *[_type == "blog" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt,
      body,
      "author": author->name,
      "categories": categories[]->title,
      tags,
      seo
    }
  `, { slug })
}

export async function getAllProjects() {
  return client.fetch(`
    *[_type == "project"] | order(_createdAt desc) {
      _id,
      name,
      description,
      slug,
      icon,
      _createdAt,
      "galleryCount": count(gallery)
    }
  `)
}

export async function getProjectBySlug(slug) {
  return client.fetch(`
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      name,
      description,
      content,
      slug,
      icon,
      gallery,
      _createdAt,
      "galleryCount": count(gallery)
    }
  `, { slug })
}

export async function getAllApps() {
  return client.fetch(`
    *[_type == "app" && isActive == true] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      content,
      mainImage,
      price,
      isFree,
      appType,
      downloadUrl,
      fileSize,
      version,
      systemRequirements,
      features,
      tags,
      publishedAt,
      downloadCount,
      rating,
      "author": author->name,
      "category": category->title
    }
  `)
}

export async function getAppBySlug(slug) {
  return client.fetch(`
    *[_type == "app" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      content,
      mainImage,
      screenshots,
      price,
      isFree,
      appType,
      downloadUrl,
      fileSize,
      version,
      systemRequirements,
      features,
      tags,
      publishedAt,
      downloadCount,
      rating,
      "author": author->name,
      "category": category->title
    }
  `, { slug })
}

// Fungsi liveClient & subscription tetap bisa dipakai di API/webhook/preview 