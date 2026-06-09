# MyPorto - Project Map

## 📋 Project Overview
**Name**: MyPorto  
**Type**: Personal Portfolio & App Store  
**Framework**: Next.js 15 (App Router)  
**CMS**: Sanity CMS  
**Styling**: Tailwind CSS  
**Owner**: Gugus Darmayanto  

---

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 15 + React 19
- **CMS**: Sanity v3.83
- **Styling**: Tailwind CSS 3.4
- **Payment**: Stripe (integrated), Midtrans (planned)
- **Analytics**: Google Analytics (G-KEDW0DKNYH)
- **Font**: Google Fonts (Lato)
- **Rich Text**: @sanity/block-content-to-react
- **Date Handling**: moment.js + react-moment

### Key Features
1. **Portfolio Showcase** - Personal info, experience, skills, services
2. **Blog System** - CMS-powered blog with categories and SEO
3. **Project Gallery** - Project listings with image galleries
4. **App Store** - Digital app marketplace with payment integration
5. **Real-time Updates** - Sanity webhook for instant cache invalidation
6. **Admin Dashboard** - Sanity Studio for content management

---

## 📁 Directory Structure

```
myporto/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin dashboard
│   │   └── page.jsx
│   ├── api/                      # API Routes
│   │   ├── download/             # App download handler
│   │   │   └── route.js
│   │   ├── payment/              # Payment integration
│   │   │   ├── confirm-payment/
│   │   │   │   └── route.js
│   │   │   └── create-payment-intent/
│   │   │       └── route.js      # Stripe payment intent
│   │   ├── post/                 # Portfolio data API
│   │   │   └── route.js
│   │   └── sanity-webhook/       # Cache invalidation webhook
│   │       └── route.js
│   ├── blog/                     # Blog section
│   │   ├── [slug]/               # Individual blog post
│   │   │   └── page.jsx
│   │   ├── live-page.jsx         # Live preview page
│   │   └── page.jsx              # Blog listing
│   ├── project/                  # Projects section
│   │   ├── [slug]/               # Individual project
│   │   │   └── page.jsx
│   │   └── page.jsx              # Project listing
│   ├── sitemap.xml/              # SEO sitemap
│   │   └── route.js
│   ├── store/                    # App Store
│   │   ├── [slug]/               # Individual app page
│   │   │   ├── AppPurchaseForm.jsx
│   │   │   ├── ScreenshotModal.jsx
│   │   │   ├── ScreenshotsSection.jsx
│   │   └── │   └── page.jsx
│   │   ├── AppCard.jsx           # App card component
│   │   ├── StoreFilters.jsx      # Filter/search component
│   │   └── page.jsx              # Store listing
│   ├── studio/[[...tool]]/       # Sanity Studio
│   │   └── page.jsx
│   ├── analitics.js              # GA tracking setup
│   ├── globals.css               # Global styles
│   ├── layout.js                 # Root layout
│   └── page.js                   # Homepage
├── component/                    # Reusable components
│   ├── BlockContentClient.js     # Sanity block content renderer
│   ├── BlogHeader.js             # Blog header component
│   ├── ProjectGalleryWithModal.js# Project gallery with modal
│   ├── SiteFooter.js             # Site footer
│   ├── SiteHeader.js             # Site header
│   ├── StoreHeader.js            # Store header
│   └── homeComponent.js          # Homepage sections
├── lib/                          # Utilities & configs
│   ├── sanity.js                 # Sanity client + queries
│   └── useSanityLive.js          # Real-time subscription hook
├── sanity/                       # Sanity CMS configuration
│   ├── lib/                      # Sanity utilities
│   │   ├── client.js             # Sanity client setup
│   │   ├── image.js              # Image URL builder
│   │   └── live.js               # Live query setup
│   ├── schemaTypes/              # Content schemas
│   │   ├── app.js                # App schema
│   │   ├── authorType.js         # Author schema
│   │   ├── blockContentType.js   # Rich text schema
│   │   ├── blog.js               # Blog post schema
│   │   ├── categoryType.js       # Category schema
│   │   ├── code.js               # Code block schema
│   │   ├── education.js          # Education schema
│   │   ├── index.js              # Schema exports
│   │   ├── portofolio.js         # Portfolio schema
│   │   ├── project.js            # Project schema
│   │   ├── services.js           # Services schema
│   │   ├── skills.js             # Skills schema
│   │   ├── transaction.js        # Transaction schema
│   │   └── workexperience.js     # Work experience schema
│   ├── env.js                    # Sanity environment
│   └── structure.js              # Studio structure
├── public/                       # Static assets
│   ├── gugus.jpg
│   └── icon.png
└── Configuration Files
    ├── .env.local                # Environment variables
    ├── .gitignore
    ├── jsconfig.json
    ├── next.config.mjs
    ├── package.json
    ├── postcss.config.mjs
    ├── sanity.cli.js
    ├── sanity.config.js
    └── tailwind.config.js
```

---

## 🗄️ Database Schema (Sanity CMS)

### Core Content Types

#### 1. **portofolio** - Personal Portfolio Data
- Personal info (name, email, github, location, language)
- Profile photo
- Description with dynamic placeholders ({ex}, {mo})
- CV download link
- References to: experience, education, services, skills, projects

#### 2. **blog** - Blog Posts
- Title, slug, mainImage (with alt text)
- Published date, author reference
- Categories (array), tags (array)
- Excerpt, body (blockContent)
- SEO metadata (metaTitle, metaDescription, ogImage)

#### 3. **project** - Portfolio Projects
- Icon image
- Name, description
- Content (blockContent)
- Gallery (array of images with alt text)
- Slug (auto-generated from name)

#### 4. **app** - Store Applications
- Title, slug, description
- Category reference
- Main image, screenshots (array)
- Price (USD), isFree boolean
- App type (web/mobile/desktop/plugin)
- Download URL, file size, version
- System requirements, features (array)
- Tags, published date
- isActive status, downloadCount, rating
- Author reference

#### 5. **transaction** - Purchase Records
- Transaction ID, app reference
- Customer info (email, name)
- Amount, currency (USD)
- Status (pending/completed/failed/refunded)
- Payment method (stripe/paypal/bank_transfer)
- Payment gateway ID
- Download token, expiry date
- Download tracking (isDownloaded, downloadCount, lastDownloadedAt)
- Security (IP address, user agent)
- Timestamps (createdAt, updatedAt)

#### 6. **Supporting Types**
- **author** - Blog/app authors
- **category** - Classification for blogs/apps
- **workexperience** - Work history records
- **education** - Education history
- **services** - Service offerings with icons
- **skills** - Skill names with percentage
- **blockContent** - Rich text content
- **code** - Code block with syntax highlighting
- **transaction** - Payment transactions

---

## 🔌 API Routes

### `/api/download` - App Download Handler
- Validates download tokens
- Tracks download attempts
- Increments app download count
- Returns secure download URL

### `/api/payment/create-payment-intent` - Stripe Integration
- Creates Stripe PaymentIntent
- Accepts: appId, appTitle, amount, customerEmail, customerName
- Returns: clientSecret, paymentIntentId
- Converts amount to cents for Stripe

### `/api/payment/confirm-payment` - Payment Confirmation
- Confirms payment status
- Updates transaction records
- Generates download tokens on success

### `/api/post` - Portfolio Data API
- Fetches portfolio data from Sanity
- Used by homepage for real-time updates
- Returns complete portfolio object

### `/api/sanity-webhook` - Cache Invalidation
- Receives Sanity webhook notifications
- Revalidates affected pages:
  - Blog posts → /blog, /blog/[slug], /
  - Projects → /project, /project/[slug], /
  - Apps → /store, /store/[slug]
  - Categories → /store, /blog
  - Transactions → /store
- Supports GET for testing

---

## 🎨 Page Structure

### Homepage (`/`)
**File**: `app/page.js` + `component/homeComponent.js`

**Sections** (in order):
1. Header with navigation
2. Hero section (photo + intro)
3. About Me (personal info grid)
4. Resume (work experience + education)
5. Services (3-column grid)
6. Skills (progress bars)
7. Projects (latest 4 projects)
8. Blog (latest 3 posts)
9. Freelancing CTA
10. Contact (info cards + form)
11. Footer

**Data Queries**:
- Portfolio data with all references
- Latest 3 blog posts
- Latest 4 projects

### Blog (`/blog`)
**File**: `app/blog/page.jsx`

**Features**:
- Grid layout (3 columns)
- Blog cards with images
- Category badges
- Author & date display
- Newsletter section (placeholder)
- Revalidation: 60 seconds

### Blog Post (`/blog/[slug]`)
**File**: `app/blog/[slug]/page.jsx`

**Features**:
- Full article display
- BlockContent renderer
- Author info
- Categories & tags
- SEO metadata
- Related posts

### Projects (`/project`)
**File**: `app/project/page.jsx`

**Features**:
- Grid layout (3 columns)
- Project cards with icons
- Description preview
- Links to detail pages

### Project Detail (`/project/[slug]`)
**File**: `app/project/[slug]/page.jsx`

**Features**:
- ProjectGalleryWithModal component
- Full content display
- Image gallery with modal viewer

### App Store (`/store`)
**File**: `app/store/page.jsx` (Client Component)

**Features**:
- Client-side filtering & search
- Categories filter
- App type filter (web/mobile/desktop/plugin)
- Price filter (free/paid)
- Sorting (newest/oldest/name/downloads/price)
- Responsive grid (1-4 columns)
- Real-time filter updates

### App Detail (`/store/[slug]`)
**Files**: 
- `page.jsx` - Main page
- `AppPurchaseForm.jsx` - Purchase/download form
- `ScreenshotsSection.jsx` - Screenshot gallery
- `ScreenshotModal.jsx` - Modal viewer

**Features**:
- App details display
- Screenshot gallery
- Purchase form for paid apps
- Free download for free apps
- Stripe payment integration
- Transaction tracking

### Sanity Studio (`/studio`)
**File**: `app/studio/[[...tool]]/page.jsx`

**Features**:
- Full CMS interface
- Content editing
- Media management
- Preview functionality

---

## 🔧 Key Components

### `component/homeComponent.js` (686 lines)
- Main homepage component
- All portfolio sections
- Mobile responsive menu
- WhatsApp integration
- Scroll-to-top button
- Dynamic year calculation for description

### `component/BlockContentClient.js`
- Renders Sanity blockContent
- Supports custom serializers
- Client-side rendering

### `component/ProjectGalleryWithModal.js`
- Image gallery grid
- Modal image viewer
- Navigation controls
- Responsive layout

### `component/BlogHeader.js`
- Blog section header
- Navigation links
- Responsive design

### `component/SiteHeader.js` & `component/SiteFooter.js`
- Global header/footer
- Navigation menu
- Social links

### `component/StoreHeader.js`
- Store-specific header
- Store branding

### `app/store/AppCard.jsx`
- App card display
- Price badge
- Category badge
- Download count
- Link to detail page

### `app/store/StoreFilters.jsx`
- Search input
- Category dropdown
- App type filter
- Price filter
- Sort dropdown
- Real-time filter updates

---

## 📦 Sanity Client Setup

### `lib/sanity.js`

**Two Client Configuration**:

1. **CDN Client** (Production/Public)
   - `useCdn: true`
   - For normal page rendering
   - Cached responses

2. **Live Client** (Real-time)
   - `useCdn: false`
   - Includes `SANITY_API_TOKEN`
   - For webhooks, previews, real-time updates

**Exported Functions**:
- `getAllPosts()` - Fetch all blog posts
- `getPostBySlug(slug)` - Fetch single blog post
- `getAllProjects()` - Fetch all projects
- `getProjectBySlug(slug)` - Fetch single project
- `getAllApps()` - Fetch all active apps
- `getAppBySlug(slug)` - Fetch single app
- `urlFor(source)` - Image URL builder

---

## 🔄 Data Flow

### Homepage Data Fetch
```
User visits / 
  → app/page.js (Server Component)
    → Sanity CDN Client
      → Fetch portfolio + blog + projects
    → Pass data to HomeComponent
  → Render homepage
```

### Store Data Flow
```
User visits /store
  → Client component mounts
    → Fetch apps + categories from Sanity
  → User applies filters
    → Client-side filtering
  → Display filtered results
```

### Payment Flow
```
User clicks "Buy" on paid app
  → Fill purchase form
  → POST /api/payment/create-payment-intent
    → Create Stripe PaymentIntent
    → Return clientSecret
  → Stripe checkout (client-side)
  → POST /api/payment/confirm-payment
    → Verify payment
    → Create transaction in Sanity
    → Generate download token
  → Redirect to download
```

### Cache Invalidation Flow
```
Content updated in Sanity
  → Sanity sends webhook
    → POST /api/sanity-webhook
      → Identify content type
      → Revalidate affected paths
      → Clear cache tags
  → Next request fetches fresh data
```

---

## 🎯 Key Features Implementation

### Real-time Updates
- Sanity webhook triggers cache revalidation
- Uses Next.js `revalidatePath()` and `revalidateTag()`
- Homepage fetches from `/api/post` for live updates
- `useSanityLive.js` hook for subscriptions (if used)

### SEO Optimization
- Dynamic metadata in layout
- Sitemap generation (`/sitemap.xml`)
- Blog SEO fields (metaTitle, metaDescription, ogImage)
- Google Analytics integration

### Security Features
- Token-based download system
- IP tracking for transactions
- User agent logging
- Payment validation
- Environment variable protection

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile
- Grid layouts adapt to screen size
- Touch-friendly components

---

## 🔐 Environment Variables

Required in `.env.local`:
```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
SANITY_API_TOKEN=your_api_token

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key

# Midtrans (Planned)
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
MIDTRANS_MERCHANT_ID=your_merchant_id
MIDTRANS_IS_PRODUCTION=false
```

---

## 🚀 Scripts & Commands

```bash
# Development
npm run dev          # Start dev server with Turbopack

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

---

## 📊 Content Relationships

```
portofolio
  ├── experience[] → workexperience
  ├── education[] → education
  ├── services[] → services
  ├── skills[] → skills
  └── project[] → project

blog
  ├── author → author
  └── categories[] → category

app
  ├── author → author
  └── category → category

transaction
  └── app → app

project
  └── (standalone)
```

---

## 🎨 Design System

### Color Scheme
- **Primary**: Yellow (#FFD700 / yellow-400)
- **Background**: Black (#000000)
- **Cards**: Gray-900
- **Text**: White (#FFFFFF)
- **Secondary Text**: Gray-400
- **Borders**: Gray-800

### Typography
- **Font**: Lato (Google Fonts)
- **Weights**: 100, 300, 400, 700, 900

### Layout
- **Max Width**: Container-based
- **Grid**: 1-4 columns (responsive)
- **Spacing**: Tailwind spacing scale

---

## 📝 Documentation Files

- `README.md` - Basic setup instructions
- `MIDTRANS_INTEGRATION.md` - Midtrans payment integration plan
- `PAYMENT_SETUP.md` - Payment configuration guide
- `SANITY_REALTIME_SETUP.md` - Real-time updates setup
- `mind.md` - Project mind map/notes
- `app.txt`, `blog.txt`, `history.txt` - Development notes

---

## 🔮 Planned Features

### Midtrans Integration (See MIDTRANS_INTEGRATION.md)
- Indonesian payment gateway
- Multiple payment methods (bank transfer, e-wallet, QRIS)
- Sandbox testing environment
- Estimated: 9-14 days implementation

### Future Enhancements
- [ ] Newsletter subscription (UI exists, backend needed)
- [ ] Contact form submission handler
- [ ] User authentication for store
- [ ] App reviews & ratings
- [ ] Download analytics dashboard
- [ ] Multi-language support

---

## 🐛 Common Development Notes

### Image Handling
- Use `urlFor()` from `lib/sanity.js`
- Always specify width/height for optimization
- Use `next/image` for automatic optimization

### Sanity Queries
- Use GROQ query language
- Reference resolution with `->` operator
- Array projections with `[]`
- Filtering with `[_type == "xxx"]`

### Component Patterns
- Server components by default (no 'use client')
- Client components only when needed (state, hooks, events)
- Data fetching in server components
- Pass data down as props

### Cache Strategy
- Time-based revalidation (`revalidate = 60`)
- On-demand revalidation (webhooks)
- CDN caching for production

---

## 📞 Quick Reference

### Sanity Studio Access
- URL: `/studio`
- Configure in: `sanity.config.js`
- Schema in: `sanity/schemaTypes/`

### Webhook Configuration
- URL: `https://your-domain.com/api/sanity-webhook`
- Configure in Sanity dashboard
- Triggers on content changes

### Google Analytics
- Tracking ID: G-KEDW0DKNYH
- Implemented in: `app/layout.js`
- Manual gtag implementation

---

## 🔍 File Purpose Quick Lookup

| File | Purpose |
|------|---------|
| `app/page.js` | Homepage server component |
| `component/homeComponent.js` | All homepage sections |
| `lib/sanity.js` | Sanity client & query functions |
| `sanity/schemaTypes/index.js` | Schema exports |
| `app/api/sanity-webhook/route.js` | Cache invalidation |
| `app/api/payment/create-payment-intent/route.js` | Stripe integration |
| `app/store/page.jsx` | App store listing |
| `app/blog/page.jsx` | Blog listing |
| `app/project/page.jsx` | Project listing |
| `component/ProjectGalleryWithModal.js` | Project image gallery |

---

**Last Updated**: June 8, 2026  
**Project Status**: Active Development  
**Next Major Feature**: Midtrans Payment Integration
