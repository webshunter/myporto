'use server'
import { createClient } from 'next-sanity'
import HomeComponent from '@/component/homeComponent'
import { getPortfolio } from '@/lib/sanity'

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
}

const client = createClient(config)

export default async function Home() {
  const portfolio = await getPortfolio()

  const blogQuery = `*[_type == "blog"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    excerpt,
    "author": author->name,
    "categories": categories[]->title
  }`

  const projectQuery = `*[_type == "project"] | order(_createdAt desc)[0...4] {
    _id,
    name,
    slug,
    icon,
    description
  }`

  const blogPosts = await client.fetch(blogQuery)
  const projectList = await client.fetch(projectQuery)

  return (
    <HomeComponent data={portfolio} blogPosts={blogPosts} projectList={projectList} />
  )
}
