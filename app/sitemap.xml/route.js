import { client } from '@/lib/sanity';

export async function GET() {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

  // Fetch slugs for blog, project, and app store
  const [blogs, projects, apps] = await Promise.all([
    client.fetch(`*[_type == "blog"]{ "slug": slug.current }`),
    client.fetch(`*[_type == "project"]{ "slug": slug.current }`),
    client.fetch(`*[_type == "app" && isActive == true]{ "slug": slug.current }`)
  ]);

  let urls = [
    '', // home
    '/blog',
    '/project',
    '/store'
  ];

  urls = [
    ...urls,
    ...blogs.map(b => `/blog/${b.slug}`),
    ...projects.map(p => `/project/${p.slug}`),
    ...apps.map(a => `/store/${a.slug}`)
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