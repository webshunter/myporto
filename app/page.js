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

  const posts = await client.fetch(query)


  return (
    <>
    <HomeComponent data={posts} />
</>
  );
}


