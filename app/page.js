'use server'
import Image from "next/image";
import { createClient } from 'next-sanity';
import HomeComponent from "@/component/homeComponent";

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
}

const client = createClient(config);



export default async function Home(props) {
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

  // Query untuk mengambil 3 blog post terbaru
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

  // Query untuk mengambil 4 project terbaru
  const projectQuery = `*[_type == "project"] | order(_createdAt desc)[0...4] {
    _id,
    name,
    slug,
    icon,
    description
  }`

  const posts = await client.fetch(query)
  const blogPosts = await client.fetch(blogQuery)
  const projectList = await client.fetch(projectQuery)
  
  return (
    <>
    <HomeComponent data={posts} blogPosts={blogPosts} projectList={projectList} />
</>
  );
}


