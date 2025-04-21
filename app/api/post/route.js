import { createClient } from 'next-sanity'

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Replace with your Sanity project ID
  dataset: 'production', // Replace with your dataset name
  apiVersion: '2023-01-01', // Use the latest API version
  useCdn: true, // `false` if you want to ensure fresh data
}

const client = createClient(config)

export async function GET(req) {
  try {
    const query = `*[_type == "portofolio"][]{
    name,
    headtitle,
    email,
    github,
    'foto' : image.asset->url,
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
      'icon':icon.asset->url,
      skill
    },
    'skills': skills[]->{
      name,
      prosentase
    },
    'project' : project[]->{
      name,
      'icon':icon.asset->url,
      details
    }
  }`
    const posts = await client.fetch(query)
    return new Response(JSON.stringify(posts), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), { status: 500 })
  }
}