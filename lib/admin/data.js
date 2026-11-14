import { liveClient } from '@/lib/sanity.server'

export async function getAdminCounts() {
  const [c] = await liveClient.fetch(
    `[{
      "blog": count(*[_type == "blog"]),
      "blogPublished": count(*[_type == "blog" && defined(publishedAt)]),
      "projects": count(*[_type == "project"]),
      "apps": count(*[_type == "app" && isActive == true]),
      "transactions": count(*[_type == "transaction"]),
      "skills": count(*[_type == "skills"]),
      "services": count(*[_type == "services"]),
      "experience": count(*[_type == "workexperience"]),
      "education": count(*[_type == "education"]),
      "featuredProjects": count(*[_type == "portofolio"][0].project[])
    }]`
  )
  return c
}

export async function getRecentTransactions(limit = 5) {
  return liveClient.fetch(
    `*[_type == "transaction"] | order(createdAt desc)[0...$limit] {
      _id, transactionId, status, amount, method,
      "app": app->title, customerEmail, createdAt
    }`,
    { limit }
  )
}

export async function getRecentActivity(limit = 6) {
  const docs = await liveClient.fetch(
    `*[_type in ["blog", "project", "app"]] | order(_updatedAt desc)[0...$limit] {
      _id, _type, _updatedAt,
      "label": coalesce(title, name)
    }`,
    { limit }
  )
  return docs
}

export async function getAdminPosts() {
  return liveClient.fetch(`
    *[_type == "blog"] | order(coalesce(publishedAt, _updatedAt) desc) {
      _id, title, "slug": slug.current, publishedAt, _updatedAt,
      "categories": categories[]->title,
      "hasBody": count(body) > 0
    }
  `)
}

export async function getAdminPost(id) {
  if (!id || id === 'new') return null
  return liveClient.fetch(
    `*[_type == "blog" && _id == $id][0] {
      _id, title, "slug": slug.current, excerpt, publishedAt, _updatedAt,
      "author": author->_id, "categories": categories[]->_id, tags,
      seo, mainImage, body
    }`,
    { id }
  )
}

export async function getAdminProjects() {
  return liveClient.fetch(`
    *[_type == "project"] | order(_updatedAt desc) {
      _id, name, "slug": slug.current, description, _updatedAt, _createdAt,
      "gallery": count(gallery)
    }
  `)
}

export async function getAdminProject(id) {
  if (!id || id === 'new') return null
  return liveClient.fetch(
    `*[_type == "project" && _id == $id][0] {
      _id, name, "slug": slug.current, description, icon, content, gallery
    }`,
    { id }
  )
}

export async function getPortfolioDoc() {
  return liveClient.fetch(`
    *[_type == "portofolio"][0] {
      _id, name, headtitle, description, email, github, location, linkcv, language,
      image,
      "experience": experience[]->{_id, name, position, startDate, endDate},
      "education": education[]->{_id, name, education, startDate, endDate},
      "services": services[]->{_id, name, icon},
      "skills": skills[]->{_id, name, prosentase},
      "project": project[]->{_id, name, "slug": slug.current}
    }
  `)
}

export async function getCategories() {
  return liveClient.fetch(`*[_type == "category"] | order(title asc){ _id, title }`)
}

export async function getAuthors() {
  return liveClient.fetch(`*[_type == "author"] | order(name asc){ _id, name }`)
}
