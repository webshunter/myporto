import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { PORTFOLIO_DOCUMENT_ID } from '@/sanity/constants'
import { apiVersion, dataset, projectId } from '@/sanity/env'

/**
 * Client publik — HANYA untuk baca data yang sudah publish.
 * Tidak memakai token, aman diimpor dari komponen client ("use client").
 * Untuk operasi tulis (create/patch) gunakan `lib/sanity.server.js`.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

export const portfolioFields = `
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

export async function getAllPosts() {
  return client.fetch(`
    *[_type == "blog" && defined(publishedAt)] | order(publishedAt desc) {
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

export async function getRecentPosts(limit = 3) {
  return client.fetch(
    `*[_type == "blog" && defined(publishedAt)] | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt,
      "author": author->name,
      "categories": categories[]->title
    }`,
    { limit }
  )
}

export async function getPostBySlug(slug) {
  return client.fetch(`
    *[_type == "blog" && defined(publishedAt) && slug.current == $slug][0] {
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

export async function getFeaturedProjects(limit = 4) {
  return client.fetch(
    `*[_type == "project"] | order(_createdAt desc)[0...$limit] {
      _id,
      name,
      slug,
      icon,
      description
    }`,
    { limit }
  )
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
      rating
    }
  `, { slug })
}
