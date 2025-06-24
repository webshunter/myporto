import { client } from '@/lib/sanity';

export async function GET() {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

  // Ambil slug blog dan project dari Sanity
  const [blogs, projects] = await Promise.all([
    client.fetch(`*[_type == "blog"]{ "slug": slug.current }`),
    client.fetch(`*[_type == "project"]{ "slug": slug.current }`)
  ]);

  let urls = [
    '', // home
    '/blog',
    '/project'
  ];

  urls = [
    ...urls,
    ...blogs.map(b => `/blog/${b.slug}`),
    ...projects.map(p => `/project/${p.slug}`)
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(
  url => `<url><loc>${baseUrl}${url}</loc></url>`
).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
} 