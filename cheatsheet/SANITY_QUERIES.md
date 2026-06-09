# Sanity CMS Query Cheat Sheet

## 📚 Basic Query Patterns

### Fetch All Documents of a Type
```groq
*[_type == "blog"]
```

### Fetch Single Document by Slug
```groq
*[_type == "blog" && slug.current == $slug][0]
```

### Order Results
```groq
*[_type == "blog"] | order(publishedAt desc)
```

### Limit Results
```groq
*[_type == "blog"][0...3]
```

---

## 🔗 Reference Resolution

### Simple Reference
```groq
"author": author->name
```

### Multiple Fields from Reference
```groq
"author": author->{
  name,
  email,
  image
}
```

### Array of References
```groq
"categories": categories[]->title
```

### References in Portfolio
```groq
'experience': experience[]->{
  name,
  position,
  startDate,
  endDate,
  details
}
```

---

## 🖼️ Image Handling

### Get Image URL
```groq
'image': image.asset->url
```

### With Hotspot
```groq
mainImage {
  asset->,
  hotspot
}
```

### Using urlFor in JavaScript
```javascript
import { urlFor } from '@/lib/sanity'

const imageUrl = urlFor(image).width(400).height(200).url()
```

---

## 📊 Common Queries

### Get All Blog Posts
```javascript
export async function getAllPosts() {
  return client.fetch(`
    *[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt,
      "author": author->name,
      "categories": categories[]->title,
      tags
    }
  `)
}
```

### Get Blog Post by Slug
```javascript
export async function getPostBySlug(slug) {
  return client.fetch(`
    *[_type == "blog" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt,
      body,
      "author": author->name,
      "categories": categories[]->title,
      tags,
      seo
    }
  `, { slug })
}
```

### Get All Active Apps
```javascript
export async function getAllApps() {
  return client.fetch(`
    *[_type == "app" && isActive == true] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      mainImage,
      price,
      isFree,
      appType,
      "category": category->title,
      publishedAt
    }
  `)
}
```

### Get All Projects
```javascript
export async function getAllProjects() {
  return client.fetch(`
    *[_type == "project"] | order(_createdAt desc) {
      _id,
      name,
      slug,
      icon,
      description
    }
  `)
}
```

---

## 🎯 Filtering

### Filter by Boolean
```groq
*[_type == "app" && isActive == true]
```

### Filter by Reference
```groq
*[_type == "blog" && category->_id == $categoryId]
```

### Filter with Multiple Conditions
```groq
*[_type == "app" && isActive == true && isFree == false]
```

---

## 📝 Block Content

### Render in React
```javascript
import BlockContent from '@sanity/block-content-to-react'

<BlockContent blocks={post.body} serializers={serializers} />
```

### Custom Serializers
```javascript
const serializers = {
  types: {
    code: CodeComponent,
    image: ImageComponent
  }
}
```

---

## 🔄 Parameters

### Using Parameters in Queries
```javascript
const query = `*[_type == "blog" && slug.current == $slug][0]`
const params = { slug: 'my-post' }
const result = await client.fetch(query, params)
```

### Multiple Parameters
```javascript
const query = `
  *[_type == "app" && category->_id == $categoryId && price < $maxPrice]
`
const params = { categoryId: 'cat-123', maxPrice: 50 }
```

---

## 📋 Schema Quick Reference

### Blog Schema Fields
- `title` (string)
- `slug` (slug)
- `mainImage` (image with alt)
- `publishedAt` (datetime)
- `author` (reference → author)
- `categories` (array → category)
- `tags` (array of strings)
- `excerpt` (text)
- `body` (blockContent)
- `seo` (object: metaTitle, metaDescription, ogImage)

### App Schema Fields
- `title` (string)
- `slug` (slug)
- `description` (text)
- `content` (blockContent)
- `category` (reference → category)
- `mainImage` (image)
- `screenshots` (array of images)
- `price` (number)
- `isFree` (boolean)
- `appType` (string: web/mobile/desktop/plugin)
- `downloadUrl` (url)
- `fileSize` (number)
- `version` (string)
- `systemRequirements` (text)
- `features` (array of strings)
- `tags` (array of strings)
- `publishedAt` (datetime)
- `isActive` (boolean)
- `downloadCount` (number)
- `rating` (number 0-5)
- `author` (reference → author)

### Project Schema Fields
- `icon` (image)
- `name` (string)
- `description` (text)
- `content` (blockContent)
- `gallery` (array of images with alt)
- `slug` (slug)

### Portfolio Schema Fields
- `name` (string)
- `image` (image)
- `headtitle` (string)
- `description` (text)
- `location` (string)
- `email` (string)
- `github` (string)
- `linkcv` (string)
- `language` (string)
- `experience` (array → workexperience)
- `education` (array → education)
- `services` (array → services)
- `skills` (array → skills)
- `project` (array → project)

### Transaction Schema Fields
- `transactionId` (string)
- `app` (reference → app)
- `customerEmail` (email)
- `customerName` (string)
- `amount` (number)
- `currency` (string, default: USD)
- `status` (string: pending/completed/failed/refunded)
- `paymentMethod` (string: stripe/paypal/bank_transfer)
- `paymentGatewayId` (string)
- `downloadToken` (string)
- `downloadExpiry` (datetime)
- `isDownloaded` (boolean)
- `downloadCount` (number)
- `lastDownloadedAt` (datetime)
- `ipAddress` (string)
- `userAgent` (text)
- `notes` (text)
- `createdAt` (datetime)
- `updatedAt` (datetime)

---

## 🔧 Client Configuration

### CDN Client (Public)
```javascript
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-03-20',
  useCdn: true,
})
```

### Live Client (Authenticated)
```javascript
export const liveClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-03-20',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})
```

---

## 💡 Tips & Best Practices

1. **Always use `[0]` when expecting a single result**
2. **Project only needed fields** to reduce payload
3. **Use CDN client** for public queries (faster, cached)
4. **Use live client** for authenticated operations
5. **Cache tags** for granular revalidation
6. **Revalidate paths** after content updates via webhook
7. **Use `urlFor`** for optimized images
8. **Add alt text** to images for accessibility

---

## 🔍 Useful Debugging Queries

### Get All Document Types
```groq
*[_type in path("*.type")].type
```

### Count Documents
```groq
count(*[_type == "blog"])
```

### Get Unique Categories
```groq
*[_type == "category"].title
```

### Get Latest Document
```groq
*[_type == "blog"] | order(publishedAt desc)[0]
```

---

## 📖 Resources

- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Next-Sanity Documentation](https://www.sanity.io/plugins/next-sanity)
- [Block Content Renderer](https://github.com/sanity-io/block-content-to-react)
- [Image URL Builder](https://www.sanity.io/docs/image-url)
