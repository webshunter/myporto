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
  const postsGet = await fetch(process.env.BASE_URL +'/api/post?v='+Date.now());
  const posts = await postsGet.json();
  return (
    <>
    <HomeComponent data={posts} />
</>
  );
}


