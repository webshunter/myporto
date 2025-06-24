import Link from 'next/link';
import { client } from '@/lib/sanity';
import imageUrlBuilder from '@sanity/image-url';
import SiteHeader from '@/component/SiteHeader';
import SiteFooter from '@/component/SiteFooter';

const builder = imageUrlBuilder(client);

export const metadata = {
  title: 'Projects | Gugus Darmayanto',
  description: 'Daftar project yang pernah dikerjakan.',
};

async function getProjects() {
  return client.fetch(`*[_type == "project"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    icon,
    description
  }`);
}

export default async function ProjectPage() {
  const projects = await getProjects();
  return (
    <>
      <SiteHeader />
      <div className="min-h-screen bg-black text-white py-16 px-6 lg:px-16">
        <h1 className="text-4xl font-bold mb-8 text-center">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project) => (
            <Link
              key={project._id}
              href={`/project/${project.slug.current}`}
              className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 border border-gray-800 block"
            >
              {project.icon && (
                <div className="relative h-48 overflow-hidden bg-gray-800 flex items-center justify-center">
                  <img
                    src={builder.image(project.icon).width(400).height(200).url()}
                    alt={project.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 line-clamp-2">{project.name}</h2>
                <p className="text-gray-400 line-clamp-3">{project.description}</p>
                <span className="inline-block mt-4 text-yellow-400 font-medium">Lihat Detail →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <SiteFooter />
    </>
  );
} 