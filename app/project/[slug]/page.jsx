import { client } from '@/lib/sanity';
import imageUrlBuilder from '@sanity/image-url';
import BlockContentClient from '@/component/BlockContentClient';
import Link from 'next/link';
import SiteHeader from '@/component/SiteHeader';
import SiteFooter from '@/component/SiteFooter';
import ProjectGalleryWithModal from '@/component/ProjectGalleryWithModal';

const builder = imageUrlBuilder(client);

async function getProject(slug) {
  return client.fetch(`*[_type == "project" && slug.current == $slug][0] {
    _id,
    name,
    icon,
    description,
    content,
    gallery
  }`, { slug });
}

export default async function ProjectDetailPage({ params }) {
  const project = await getProject(params.slug);
  if (!project) return <div className="text-center py-16">Project not found.</div>;
  return (
    <>
      <SiteHeader />
      <div className="min-h-screen bg-black text-white py-16 px-6 lg:px-8 max-w-4xl mx-auto">
        <Link href="/project" className="text-yellow-400 hover:underline mb-8 inline-block">← Kembali ke Daftar Project</Link>
        <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
        {project.icon && (
          <div className="relative h-64 w-full mb-6 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src={builder.image(project.icon).width(600).height(300).url()}
              alt={project.name}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <p className="text-gray-400 mb-6">{project.description}</p>
        <div className="prose prose-invert max-w-none">
          <BlockContentClient blocks={project.content} />
        </div>
        {/* Gallery with modal */}
        <ProjectGalleryWithModal project={project} />
      </div>
      <SiteFooter />
    </>
  );
} 