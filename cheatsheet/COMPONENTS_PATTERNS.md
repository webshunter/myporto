# Component Usage & Patterns Cheat Sheet

## 📦 Component Structure

### Server Component (Default)
```javascript
// No 'use client' directive = Server Component
import { client } from '@/lib/sanity'

async function getData() {
  const data = await client.fetch('*[_type == "blog"]')
  return data
}

export default async function BlogPage() {
  const posts = await getData()
  
  return (
    <div>
      {posts.map(post => (
        <article key={post._id}>{post.title}</article>
      ))}
    </div>
  )
}
```

### Client Component
```javascript
'use client'

import { useState, useEffect } from 'react'

export default function StorePage() {
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const data = await fetchApps()
      setApps(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div>
      {apps.map(app => (
        <div key={app._id}>{app.title}</div>
      ))}
    </div>
  )
}
```

---

## 🎨 Reusable Components

### Component Location Rules
- **Global components**: `component/` folder
- **Feature-specific**: Inside feature folder (e.g., `app/store/AppCard.jsx`)
- **Layout components**: `component/SiteHeader.js`, `component/SiteFooter.js`

---

## 📝 Common Patterns

### 1. Data Fetching in Server Components
```javascript
// app/blog/page.jsx
import { getAllPosts } from '@/lib/sanity'

export default async function BlogPage() {
  const posts = await getAllPosts()
  
  return <BlogList posts={posts} />
}
```

### 2. Pass Data to Client Components
```javascript
// Server Component
import ClientChart from './ClientChart'

export default async function Dashboard() {
  const data = await fetchData()
  
  // Pass data as props to client component
  return <ClientChart initialData={data} />
}
```

### 3. Conditional Rendering
```javascript
{posts.length === 0 ? (
  <div>No posts yet</div>
) : (
  <div>
    {posts.map(post => <PostCard key={post._id} post={post} />)}
  </div>
)}
```

### 4. Loading States
```javascript
if (loading) {
  return (
    <div className="text-center">
      <p className="text-gray-500">Loading...</p>
    </div>
  )
}
```

### 5. Error Handling
```javascript
try {
  const data = await fetchData()
  setData(data)
} catch (error) {
  console.error('Error fetching data:', error)
  setError('Failed to load data')
}
```

---

## 🖼️ Image Handling

### Using urlFor (Recommended)
```javascript
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

function BlogCard({ post }) {
  return (
    <div className="relative h-48">
      <Image
        src={urlFor(post.mainImage).width(400).height(200).url()}
        alt={post.mainImage.alt || post.title}
        fill
        className="object-cover"
      />
    </div>
  )
}
```

### Using Regular img (for dynamic URLs)
```javascript
function ProjectCard({ project }) {
  return (
    <div>
      {project.icon && (
        <img
          src={urlFor(project.icon).width(400).height(200).url()}
          alt={project.name}
          className="w-full h-48 object-cover"
        />
      )}
    </div>
  )
}
```

---

## 📋 List Rendering

### Grid Layout with Responsive Columns
```javascript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {items.map(item => (
    <Card key={item._id} item={item} />
  ))}
</div>
```

### Limited Items
```javascript
// Show only first 3 items
{items.slice(0, 3).map(item => (
  <Card key={item._id} item={item} />
))}
```

### With Index (when needed)
```javascript
{items.map((item, index) => (
  <div key={index}>
    <h3>{item.title}</h3>
  </div>
))}
```

---

## 🔗 Links & Navigation

### Internal Links (Next.js Link)
```javascript
import Link from 'next/link'

<Link href={`/blog/${post.slug.current}`}>
  <h2>{post.title}</h2>
</Link>
```

### External Links
```javascript
<a 
  href="https://github.com" 
  target="_blank"
  rel="noopener noreferrer"
>
  GitHub
</a>
```

### Dynamic Routes
```javascript
// /blog/[slug]/page.jsx
<Link href={`/blog/${slug}`}>Read more →</Link>

// /store/[slug]/page.jsx
<Link href={`/store/${app.slug.current}`}>View App</Link>
```

---

## 🎭 State Management

### Simple State
```javascript
const [isOpen, setIsOpen] = useState(false)

<button onClick={() => setIsOpen(!isOpen)}>
  {isOpen ? 'Close' : 'Open'}
</button>
```

### Multiple States
```javascript
const [apps, setApps] = useState([])
const [filteredApps, setFilteredApps] = useState([])
const [loading, setLoading] = useState(true)
const [filters, setFilters] = useState({
  category: '',
  price: '',
  search: ''
})
```

### State with Objects
```javascript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
})

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  })
}
```

---

## 📡 Data Fetching Patterns

### Client-Side Fetching (useEffect)
```javascript
'use client'

import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity'

export default function StorePage() {
  const [apps, setApps] = useState([])

  useEffect(() => {
    async function fetchData() {
      const query = `*[_type == "app" && isActive == true]`
      const data = await client.fetch(query)
      setApps(data)
    }
    fetchData()
  }, [])

  return <div>{/* render apps */}</div>
}
```

### Server-Side Fetching (Async Component)
```javascript
import { getAllApps } from '@/lib/sanity'

export default async function StorePage() {
  const apps = await getAllApps()
  
  return <div>{/* render apps */}</div>
}
```

### Fetch with Parameters
```javascript
async function getPostBySlug(slug) {
  return client.fetch(`
    *[_type == "blog" && slug.current == $slug][0]
  `, { slug })
}
```

---

## 🎨 Styling Patterns

### Tailwind Classes
```javascript
<div className="bg-gray-900 p-6 rounded-lg hover:scale-105 transition-all duration-300 border border-gray-800">
  Content
</div>
```

### Inline Styles (when needed)
```javascript
<div style={{ 
  background: '#000000', 
  color: '#fff' 
}}>
  Content
</div>
```

### Conditional Classes
```javascript
<div className={`
  ${isActive ? 'bg-yellow-400' : 'bg-gray-400'}
  ${isLoading ? 'opacity-50' : 'opacity-100'}
`}>
  Content
</div>
```

### Responsive Design
```javascript
<div className="
  text-sm           // mobile
  md:text-base      // tablet
  lg:text-lg        // desktop
">
  Responsive text
</div>
```

---

## 🔄 Event Handling

### Click Handler
```javascript
function handleClick() {
  console.log('Clicked!')
}

<button onClick={handleClick}>
  Click me
</button>
```

### Inline Handler
```javascript
<button onClick={() => setIsOpen(!isOpen)}>
  Toggle
</button>
```

### Form Submit
```javascript
function handleSubmit(e) {
  e.preventDefault()
  // Process form data
}

<form onSubmit={handleSubmit}>
  {/* form fields */}
  <button type="submit">Submit</button>
</form>
```

### External Link (WhatsApp)
```javascript
function openWA() {
  if (typeof window !== 'undefined') {
    window.open('https://wa.me/6285800455338', '_blank')
  }
}

<button onClick={openWA}>
  Contact on WhatsApp
</button>
```

---

## 📱 Responsive Menu Pattern

### Mobile Menu with Overlay
```javascript
'use client'

import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen)
    if (typeof document !== 'undefined') {
      const menuOverlay = document.getElementById("menu-overlay")
      if (menuOverlay) {
        if (!isMenuOpen) {
          menuOverlay.classList.add("active")
          document.body.style.overflow = 'hidden'
        } else {
          menuOverlay.classList.remove("active")
          document.body.style.overflow = 'auto'
        }
      }
    }
  }

  function closeMenu() {
    setIsMenuOpen(false)
    if (typeof document !== 'undefined') {
      const menuOverlay = document.getElementById("menu-overlay")
      if (menuOverlay) {
        menuOverlay.classList.remove("active")
        document.body.style.overflow = 'auto'
      }
    }
  }

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex">
        {/* links */}
      </nav>

      {/* Mobile hamburger */}
      <button onClick={toggleMenu} className="md:hidden">
        ☰
      </button>

      {/* Mobile menu overlay */}
      <div id="menu-overlay" className={isMenuOpen ? 'active' : ''}>
        <button onClick={closeMenu}>✕</button>
        <nav>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About</a>
          {/* more links */}
        </nav>
      </div>
    </>
  )
}
```

---

## 📊 Filter & Search Pattern

### Filter State Management
```javascript
'use client'

import { useState, useCallback } from 'react'

export default function StorePage() {
  const [apps, setApps] = useState([])
  const [filteredApps, setFilteredApps] = useState([])

  const handleFiltersChange = useCallback((filters) => {
    let filtered = [...apps]

    // Search filter
    if (filters.searchTerm) {
      filtered = filtered.filter(app => 
        app.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (filters.selectedCategory) {
      filtered = filtered.filter(app => 
        app.category === filters.selectedCategory
      )
    }

    // Sort filter
    switch (filters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        break
      case 'name-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    setFilteredApps(filtered)
  }, [apps])

  return (
    <div>
      <StoreFilters onFiltersChange={handleFiltersChange} />
      <div className="grid">
        {filteredApps.map(app => <AppCard key={app._id} app={app} />)}
      </div>
    </div>
  )
}
```

---

## 🎯 Form Pattern

### Controlled Form
```javascript
'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Send to API
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
        rows={4}
        required
      />
      <button type="submit">
        Send Message
      </button>
    </form>
  )
}
```

---

## 📄 Metadata Pattern

### Static Metadata
```javascript
export const metadata = {
  title: 'Blog | Gugus Darmayanto',
  description: 'Read my latest blog posts',
}

export default function BlogPage() {
  return <div>Blog content</div>
}
```

### Dynamic Metadata
```javascript
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug)
  
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }) {
  return <div>Post content</div>
}
```

---

## 🔄 Revalidation Pattern

### Time-based Revalidation
```javascript
export const revalidate = 60 // Revalidate every 60 seconds

export default async function BlogPage() {
  const posts = await getAllPosts()
  return <div>{/* ... */}</div>
}
```

### On-demand Revalidation (Webhook)
```javascript
// app/api/sanity-webhook/route.js
import { revalidatePath } from 'next/cache'

export async function POST(request) {
  const body = await request.json()
  
  if (body._type === 'blog') {
    revalidatePath('/blog')
    revalidatePath('/')
  }
  
  return Response.json({ success: true })
}
```

---

## 🧩 Component Composition

### Pass Children
```javascript
function Layout({ children }) {
  return (
    <div className="container">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
```

### Pass Props
```javascript
function AppCard({ app }) {
  return (
    <div className="card">
      <h3>{app.title}</h3>
      <p>{app.description}</p>
      <span>${app.price}</span>
    </div>
  )
}

// Usage
<AppCard app={appData} />
```

### Spread Props
```javascript
function Input(props) {
  return (
    <input 
      {...props}
      className={`custom-input ${props.className}`}
    />
  )
}
```

---

## 🎨 Common UI Patterns

### Card Component
```javascript
<div className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 border border-gray-800">
  {/* Image */}
  <div className="relative h-48">
    <Image src={imageUrl} alt={title} fill className="object-cover" />
  </div>
  
  {/* Content */}
  <div className="p-6">
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400 line-clamp-3">{description}</p>
    <Link href={`/detail/${slug}`} className="text-yellow-400 mt-4">
      Read more →
    </Link>
  </div>
</div>
```

### Badge/Tag
```javascript
<span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-medium border border-yellow-400/30">
  {category}
</span>
```

### Button Variants
```javascript
// Primary
<button className="bg-yellow-400 text-black rounded-full px-6 py-3 font-bold hover:bg-yellow-300 transition-colors">
  Primary
</button>

// Secondary
<button className="border border-yellow-400 text-yellow-400 rounded-full px-6 py-3 font-bold hover:bg-yellow-400 hover:text-black transition-colors">
  Secondary
</button>
```

---

## 📱 Responsive Grid Patterns

### Auto-fit Grid
```javascript
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {items.map(item => <Card key={item._id} item={item} />)}
</div>
```

### Centered Content
```javascript
<div className="max-w-6xl mx-auto px-6 lg:px-16">
  {/* Content */}
</div>
```

### Section Spacing
```javascript
<section className="py-16 px-6 lg:px-16">
  <div className="max-w-4xl mx-auto">
    {/* Content */}
  </div>
</section>
```

---

## 🔧 Utility Functions

### Date Formatting
```javascript
import Moment from 'react-moment'

<Moment format="MMMM DD, YYYY">{date}</Moment>

// Or manual
new Date(date).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
```

### Text Truncation
```javascript
// Tailwind line-clamp
<p className="line-clamp-2">{text}</p>
<p className="line-clamp-3">{text}</p>
```

### Scroll to Top
```javascript
function scrollToTop() {
  if (typeof window !== 'undefined') {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
}
```

---

## 📖 Best Practices

### ✅ Do
- Use Server Components by default
- Add 'use client' only when needed
- Fetch data in Server Components
- Pass data down as props
- Use TypeScript for type safety (optional)
- Implement error boundaries
- Add loading states
- Use semantic HTML
- Optimize images with Next/Image
- Implement proper SEO metadata

### ❌ Don't
- Fetch data in Client Components (use Server Components instead)
- Add 'use client' to every component
- Forget to handle loading/error states
- Use inline styles (use Tailwind instead)
- Skip alt text on images
- Forget responsive design
- Hardcode URLs (use environment variables)
- Skip error handling

---

## 🎯 Quick Reference

### When to Use Client Components
- useState, useEffect hooks
- Event handlers (onClick, onChange)
- Browser APIs (window, document)
- Third-party libraries with hooks
- Real-time updates (subscriptions)

### When to Use Server Components
- Data fetching
- Access backend resources
- Keep sensitive information server-side
- Reduce client-side JavaScript
- SEO-critical pages

---

## 📚 Resources

- [Next.js Components](https://nextjs.org/docs/app/building-your-application/components)
- [React Hooks](https://react.dev/reference/react)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Sanity Block Content](https://www.sanity.io/docs/block-content)
