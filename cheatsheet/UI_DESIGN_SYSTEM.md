# UI/UX Design System - Complete Guide

## 🎨 Design System Overview

MyPorto uses a **dual-theme design system**:
- **Dark Theme** - Portfolio sections (black background)
- **Light Theme** - App Store (white/gray background)

---

## 🎯 Color Palette

### Primary Colors

| Color Name | Hex Code | Tailwind Class | Usage |
|-----------|----------|----------------|-------|
| **Primary Yellow** | `#FFD700` | `yellow-400` | CTAs, highlights, accents, links hover |
| **Dark Yellow** | `#F59E0B` | `yellow-300/500` | Hover states, gradients |
| **Black** | `#000000` | `#000000` | Main background (portfolio) |
| **White** | `#FFFFFF` | `white` | Text on dark, backgrounds (store) |

### Gray Scale (Dark Theme)

| Color | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Dark Gray 900 | `#111827` | `gray-900` | Card backgrounds, sections |
| Dark Gray 800 | `#1F2937` | `gray-800` | Borders, dividers |
| Dark Gray 700 | `#374151` | `gray-700` | Progress bar background |
| Dark Gray 600 | `#4B5563` | `gray-600` | - |
| Dark Gray 500 | `#6B7280` | `gray-500` | - |
| Dark Gray 400 | `#9CA3AF` | `gray-400` | Secondary text, descriptions |
| Dark Gray 300 | `#D1D5DB` | `gray-300` | - |
| Dark Gray 200 | `#E5E7EB` | `gray-200` | - |
| Dark Gray 100 | `#F3F4F6` | `gray-100` | - |

### Gray Scale (Light Theme - Store)

| Color | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Light Gray 50 | `#F9FAFB` | `gray-50` | Page background |
| Light Gray 100 | `#F3F4F6` | `gray-100` | Card backgrounds, tags |
| Light Gray 200 | `#E5E7EB` | `gray-200` | Image placeholders |
| Light Gray 300 | `#D1D5DB` | `gray-300` | Borders |
| Light Gray 500 | `#6B7280` | `gray-500` | Secondary text, labels |
| Light Gray 600 | `#4B5563` | `gray-600` | Nav links, descriptions |
| Light Gray 700 | `#374151` | `gray-700` | Primary text, labels |
| Light Gray 800 | `#1F2937` | `gray-800` | - |
| Light Gray 900 | `#111827` | `gray-900` | Headings, bold text |

### Accent Colors

| Color | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| **Green** | `#10B981` | `green-600` | Free badges, success states |
| **Green Light** | `#D1FAE5` | `green-100` | Free badge background |
| **Green Dark** | `#065F46` | `green-800` | Free badge text |
| **Blue** | `#2563EB` | `blue-600` | Paid badges, info boxes |
| **Blue Light** | `#DBEAFE` | `blue-100` | Paid badge background |
| **Blue Dark** | `#1E40AF` | `blue-800` | Paid badge text |
| **Blue 50** | `#EFF6FF` | `blue-50` | Info box background |
| **Blue 200** | `#BFDBFE` | `blue-200` | Info box border |
| **Blue 800** | `#1E40AF` | `blue-800` | Info box text |

---

## 🔤 Typography

### Font Family

**Primary Font**: Lato (Google Fonts)
```css
font-family: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
```

**Font Weights Available**:
- 100 - Thin
- 300 - Light
- 400 - Regular/Normal
- 700 - Bold
- 900 - Black

### Font Size Scale

| Element | Mobile | Tablet (md) | Desktop (lg) | Tailwind Classes |
|---------|--------|-------------|--------------|------------------|
| **H1** | 36px | 48px | 48px | `text-4xl md:text-5xl` |
| **H2** | 30px | 30px | 30px | `text-3xl` |
| **H3** | 24px | 24px | 24px | `text-2xl` |
| **H4** | 20px | 20px | 20px | `text-xl` |
| **Body Large** | 18px | 18px | 18px | `text-lg` |
| **Body** | 16px | 16px | 16px | `text-base` |
| **Small** | 14px | 14px | 14px | `text-sm` |
| **Extra Small** | 12px | 12px | 12px | `text-xs` |

### Font Usage by Component

| Component | Weight | Size | Color |
|-----------|--------|------|-------|
| **Site Logo** | Bold (700) | 20px (text-xl) | White/Gray-800 |
| **Navigation** | Normal (400) | 16px | White/Gray-600 |
| **Section Titles** | Bold (700) | 30px (text-3xl) | White/Gray-900 |
| **Card Titles** | Bold (700) | 20px (text-xl) | White/Gray-900 |
| **Body Text** | Normal (400) | 16px | Gray-400/Gray-700 |
| **Labels** | Medium (500) | 14px (text-sm) | Gray-400/Gray-700 |
| **Buttons** | Bold (700) | 14-16px | Black |
| **Badges** | Semibold (600) | 12px (text-xs) | Varies |

---

## 📐 Spacing System

### Padding & Margin Scale

| Size | Pixels | Tailwind Class | Common Usage |
|------|--------|----------------|--------------|
| xs | 4px | `p-1`, `m-1` | Tight spacing |
| sm | 8px | `p-2`, `m-2` | Small gaps |
| md | 12px | `p-3`, `m-3` | - |
| base | 16px | `p-4`, `m-4` | Card padding |
| lg | 20px | `p-5`, `m-5` | - |
| xl | 24px | `p-6`, `m-6` | Section padding |
| 2xl | 32px | `p-8`, `m-8` | - |
| 3xl | 40px | `p-10`, `m-10` | - |
| 4xl | 48px | `p-12`, `m-12` | - |
| 5xl | 64px | `p-16`, `m-16` | Page padding |

### Section Spacing Pattern

```javascript
// Standard section spacing
<section className="py-16 px-6 lg:px-16">
  {/* Content */}
</section>

// With max-width container
<section className="py-16 px-6 lg:px-16">
  <div className="max-w-6xl mx-auto">
    {/* Content */}
  </div>
</section>

// Centered narrow content
<section className="py-16 px-6 lg:px-16">
  <div className="max-w-4xl mx-auto text-center">
    {/* Content */}
  </div>
</section>
```

---

## 🎭 Component Styles

### 1. Header Components

#### SiteHeader (Dark Theme)
**File**: `component/SiteHeader.js`

**Styling**:
```javascript
<header className="py-4 px-6 lg:px-16 flex justify-between items-center">
  // Logo: text-xl font-bold, white text
  // Nav links: white, hover:text-yellow-400
  // Contact button: bg-yellow-400 text-black rounded-full
</header>
```

**Mobile Menu**:
- Full-screen overlay
- Background: `rgba(0, 0, 0, 0.95)` with blur
- Links: 24px (text-2xl), centered
- Animation: fadeIn 0.3s ease-out
- Underline hover effect with yellow line

#### StoreHeader (Light Theme)
**File**: `component/StoreHeader.js`

**Differences from SiteHeader**:
- Logo text: `text-gray-800`
- Nav links: `text-gray-600`
- Active link: `text-yellow-400 font-bold`
- Hamburger: `text-gray-600`

---

### 2. Button Components

#### Primary Button (CTA)
```javascript
<button className="
  bg-yellow-400 
  text-black 
  rounded-full 
  px-6 py-3 
  font-bold 
  hover:bg-yellow-300 
  transition-colors
">
  Contact
</button>
```

**Variants**:

| Variant | Classes | Usage |
|---------|---------|-------|
| **Small** | `px-4 py-2 text-xs md:text-sm` | Header contact button |
| **Medium** | `px-6 py-3` | Section CTAs |
| **Large** | `px-8 py-4 text-lg` | Hero sections |

#### Secondary Button
```javascript
<button className="
  bg-yellow-400 
  text-black 
  rounded-full 
  px-6 py-3 
  font-bold 
  mt-4
">
  Download CV
</button>
```

#### Store Action Buttons
```javascript
// Free App Button
<button className="
  bg-green-600 
  text-white 
  hover:bg-green-700 
  rounded-md 
  py-2 px-4
">
  Download Free
</button>

// Paid App Button
<button className="
  bg-blue-600 
  text-white 
  hover:bg-blue-700 
  rounded-md 
  py-2 px-4
">
  View Details
</button>
```

---

### 3. Card Components

#### Blog/Project Card (Dark Theme)
**Structure**:
```javascript
<article className="
  bg-gray-900 
  rounded-lg 
  overflow-hidden 
  hover:scale-105 
  transition-all 
  duration-300 
  border 
  border-gray-800
">
  {/* Image: h-48 relative */}
  {/* Content: p-6 */}
  {/* Title: text-xl font-bold, hover:text-yellow-400 */}
  {/* Description: text-gray-400 line-clamp-3 */}
  {/* Link: text-yellow-400 hover:text-yellow-300 */}
</article>
```

**Hover Effect**: 
- Scale: `1.05`
- Duration: `300ms`
- Smooth transition

#### App Card (Light Theme)
**File**: `app/store/AppCard.jsx`

**Structure**:
```javascript
<div className="
  bg-white 
  rounded-lg 
  shadow-md 
  overflow-hidden 
  hover:shadow-lg 
  transition-shadow 
  duration-300
">
  {/* Image: h-48 bg-gray-200 */}
  {/* Price Badge: absolute top-3 right-3 */}
  {/* Type Badge: absolute top-3 left-3 */}
  {/* Content: p-4 */}
  {/* Title: text-lg font-semibold text-gray-900 */}
  {/* Description: text-gray-600 line-clamp-3 */}
</div>
```

---

### 4. Badge Components

#### Category Badge (Blog)
```javascript
<span className="
  bg-yellow-400/20 
  text-yellow-400 
  px-3 py-1 
  rounded-full 
  text-xs 
  font-medium 
  border 
  border-yellow-400/30
">
  {category}
</span>
```

#### Price Badge (App Store)
```javascript
// Free
<span className="
  bg-green-100 
  text-green-800 
  px-3 py-1 
  rounded-full 
  text-sm 
  font-semibold
">
  FREE
</span>

// Paid
<span className="
  bg-blue-100 
  text-blue-800 
  px-3 py-1 
  rounded-full 
  text-sm 
  font-semibold
">
  $29.99
</span>
```

#### App Type Badge
```javascript
<span className="
  px-2 py-1 
  rounded-full 
  text-xs 
  font-medium 
  bg-gray-100 
  text-gray-700
">
  Web App / Mobile / Desktop / Plugin
</span>
```

---

### 5. Form Components

#### Input Fields (Dark Theme - Contact Form)
```javascript
<input
  className="
    w-full 
    bg-gray-900 
    border 
    border-gray-800 
    rounded-lg 
    p-4 
    text-white
    placeholder-gray-400
    focus:outline-none 
    focus:border-yellow-400
  "
/>
```

#### Input Fields (Light Theme - Store Filters)
```javascript
<input
  className="
    w-full 
    px-3 py-2 
    border 
    border-gray-300 
    rounded-md 
    focus:outline-none 
    focus:ring-2 
    focus:ring-blue-500
  "
/>
```

#### Select Dropdowns
```javascript
<select className="
  w-full 
  px-3 py-2 
  border 
  border-gray-300 
  rounded-md 
  focus:outline-none 
  focus:ring-2 
  focus:ring-blue-500
">
  <option value="">All Categories</option>
  {/* Options */}
</select>
```

---

### 6. Progress Bar

**Custom CSS** (in `globals.css`):
```css
.progress-bar {
  background: #374151; /* gray-700 */
  height: 8px;
}

.progress-fill {
  background: linear-gradient(90deg, #fbbf24, #f59e0b);
  height: 100%;
  transition: width 0.3s ease;
}
```

**Usage**:
```javascript
<div className="progress-bar rounded-full overflow-hidden">
  <div 
    className="progress-fill" 
    style={{ width: `${skill.prosentase}%` }} 
  />
</div>
```

---

### 7. Scroll to Top Button

**Styling** (inline Tailwind):
```javascript
<button
  id="scrollUpButton"
  className="
    fixed 
    bottom-6 
    right-6 
    w-5 h-10 
    flex 
    items-center 
    justify-center 
    bg-yellow-400 
    text-gray-900 
    rounded-full 
    shadow-xl 
    border 
    border-yellow-300 
    hover:bg-yellow-500 
    hover:shadow-2xl 
    transition-all 
    duration-200 
    ring-1 
    ring-yellow-200/60 
    z-50 
    cursor-pointer 
    hidden
  "
>
  {/* Arrow icon */}
</button>
```

---

## 🎨 Custom CSS Classes

### Defined in `globals.css`

#### Menu Overlay
```css
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
}

.menu-overlay.active {
  display: flex;
  animation: fadeIn 0.3s ease-out;
}
```

#### Animations
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}
```

#### Hover Effects
```css
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
```

#### Line Clamp Utilities
```css
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

#### Custom Scrollbar
```css
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #fbbf24; /* yellow-400 */
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #f59e0b; /* yellow-500 */
}
```

#### Blog Content Styling (prose-invert)
```css
.prose-invert {
  color: #d1d5db; /* gray-300 */
}

.prose-invert h1,
.prose-invert h2,
.prose-invert h3 {
  color: white;
}

.prose-invert a {
  color: #fbbf24; /* yellow-400 */
}

.prose-invert a:hover {
  color: #f59e0b; /* yellow-500 */
}

.prose-invert blockquote {
  border-left-color: #fbbf24;
  color: #9ca3af; /* gray-400 */
}

.prose-invert code {
  background-color: #374151; /* gray-700 */
  color: #fbbf24; /* yellow-400 */
}

.prose-invert pre {
  background-color: #1f2937; /* gray-800 */
  color: #d1d5db; /* gray-300 */
}
```

---

## 📱 Responsive Design

### Breakpoints

| Breakpoint | Size | Prefix | Usage |
|-----------|------|--------|-------|
| Mobile | < 768px | (default) | Single column, stacked layout |
| Tablet | ≥ 768px | `md:` | 2 columns, side-by-side |
| Desktop | ≥ 1024px | `lg:` | 3-4 columns, full layout |
| Large Desktop | ≥ 1280px | `xl:` | 4 columns (store) |

### Responsive Grid Patterns

#### Blog/Project Grid
```javascript
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-8
">
  {items.map(item => <Card key={item._id} item={item} />)}
</div>
```

#### App Store Grid
```javascript
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  xl:grid-cols-4 
  gap-6
">
  {apps.map(app => <AppCard key={app._id} app={app} />)}
</div>
```

#### Footer Grid
```javascript
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-4 
  gap-8 
  mb-8
">
  {/* 4 columns on desktop */}
</div>
```

### Responsive Navigation

**Desktop (md and up)**:
```javascript
<nav className="hidden md:flex space-x-6">
  {/* Horizontal navigation */}
</nav>
```

**Mobile (below md)**:
```javascript
<button className="md:hidden" onClick={toggleMenu}>
  {/* Hamburger icon */}
</button>

<div id="menu-overlay" className="menu-overlay">
  {/* Full-screen overlay menu */}
</div>
```

---

## 🎯 Layout Patterns

### Section Layout
```javascript
<section id="section-id" className="py-16 px-6 lg:px-16">
  <h2 className="text-3xl font-bold mb-8">Section Title</h2>
  <div className="max-w-6xl mx-auto">
    {/* Content */}
  </div>
</section>
```

### Alternating Background
```javascript
// Light section (default - black bg)
<section className="py-16 px-6 lg:px-16">
  {/* Content */}
</section>

// Dark section (gray-900 bg)
<section className="py-16 px-6 lg:px-16 bg-gray-900">
  {/* Content */}
</section>
```

### Centered Content
```javascript
<div className="max-w-4xl mx-auto text-center">
  <h1 className="text-5xl md:text-6xl font-bold mb-6">
    Title
  </h1>
  <p className="text-xl text-gray-400 mb-8">
    Description
  </p>
  <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
</div>
```

### Two Column Layout
```javascript
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <div>
    {/* Left column */}
  </div>
  <div>
    {/* Right column */}
  </div>
</div>
```

### Sticky Sidebar
```javascript
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="lg:col-span-2">
    {/* Main content */}
  </div>
  <div className="lg:col-span-1">
    <div className="sticky top-8">
      {/* Sidebar content */}
    </div>
  </div>
</div>
```

---

## 🖼️ Image Handling

### Image Dimensions by Component

| Component | Width | Height | Object Fit | Notes |
|-----------|-------|--------|------------|-------|
| **Hero Image** | Full | 256px (h-64) / 384px (md:h-96) | cover | Responsive height |
| **Blog Card** | 400px | 200px | cover | With Next/Image |
| **Project Card** | 400px | 200px | cover | With regular img |
| **App Card** | 400px | 200px | contain | With regular img |
| **App Detail** | 400px | 400px (w-48 h-48) | contain | Square format |
| **Profile Photo** | Full | 256px / 384px | cover | With object-position top |

### Image with Next/Image
```javascript
import Image from 'next/image'

<Image
  src={urlFor(image).width(400).height(200).url()}
  alt={title}
  fill
  className="object-cover hover:scale-110 transition-transform duration-300"
/>
```

### Image with Regular img
```javascript
<img
  src={urlFor(image).width(400).height(200).url()}
  alt={title}
  className="w-full h-48 object-cover"
/>
```

### Image Hover Effects
```javascript
<div className="relative h-48 overflow-hidden">
  <Image
    src={imageUrl}
    alt={title}
    fill
    className="object-cover hover:scale-110 transition-transform duration-300"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
</div>
```

---

## 🎨 Interactive States

### Link Hover
```javascript
<a className="hover:text-yellow-400 transition-colors duration-200">
  Link Text
</a>
```

### Button Hover
```javascript
<button className="
  bg-yellow-400 
  hover:bg-yellow-300 
  transition-colors 
  duration-200
">
  Button
</button>
```

### Card Hover
```javascript
<div className="
  hover:scale-105 
  transition-all 
  duration-300
">
  Card Content
</div>
```

### Input Focus
```javascript
<input className="
  focus:outline-none 
  focus:border-yellow-400
  // or
  focus:ring-2 
  focus:ring-blue-500
"/>
```

---

## 🎯 Accessibility

### Color Contrast

| Combination | Ratio | Status |
|-------------|-------|--------|
| White on Black | 21:1 | ✅ AAA |
| Yellow-400 on Black | 12.6:1 | ✅ AAA |
| Gray-400 on Black | 5.7:1 | ✅ AA |
| Gray-700 on White | 10.3:1 | ✅ AAA |
| Gray-600 on White | 5.9:1 | ✅ AA |

### ARIA Labels
```javascript
<button
  onClick={toggleMenu}
  aria-label="Toggle menu"
>
  <svg>...</svg>
</button>

<button
  onClick={scrollToTop}
  aria-label="Scroll to top"
>
  <svg>...</svg>
</button>
```

### Semantic HTML
- Use `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Use `<article>` for blog posts and projects
- Use `<h1>` to `<h6>` hierarchy
- Use `<form>`, `<label>`, `<input>` for forms

---

## 🎨 Theme Switching

### Dark Theme (Portfolio)
**Used in**: Homepage, Blog, Projects

**Characteristics**:
- Background: `#000000` (black)
- Cards: `gray-900`
- Text: `white`
- Secondary text: `gray-400`
- Borders: `gray-800`
- Accent: `yellow-400`

### Light Theme (App Store)
**Used in**: Store pages

**Characteristics**:
- Background: `gray-50`
- Cards: `white`
- Text: `gray-900`
- Secondary text: `gray-600`/`gray-500`
- Borders: `gray-300`
- Accents: `green-600` (free), `blue-600` (paid)

### Theme Override Classes
```css
/* Store form text color overrides */
.store-form input,
.store-form textarea {
  color: inherit !important;
}

/* App store specific text colors */
.app-store-section input,
.app-store-section label {
  color: #374151 !important;
}
```

---

## 📊 Component Inventory

### Global Components (component/)

| Component | Theme | Purpose | Key Styles |
|-----------|-------|---------|------------|
| **SiteHeader** | Dark | Main navigation | Black bg, yellow accents |
| **SiteFooter** | Dark | Footer | gray-900 bg, 4-column grid |
| **BlogHeader** | Dark | Blog header | Gradient bg |
| **StoreHeader** | Light | Store navigation | White bg, gray text |
| **homeComponent** | Dark | Homepage sections | Full page component |
| **BlockContentClient** | Both | Rich text renderer | Inherits parent theme |
| **ProjectGalleryWithModal** | Dark | Project images | Grid + modal |

### Store Components (app/store/)

| Component | Theme | Purpose | Key Styles |
|-----------|-------|---------|------------|
| **AppCard** | Light | App listing card | White bg, shadow |
| **StoreFilters** | Light | Filter/search bar | White bg, 5-column grid |
| **AppPurchaseForm** | Light | Purchase/download form | Sticky sidebar |
| **ScreenshotsSection** | Light | App screenshots | Grid gallery |
| **ScreenshotModal** | Light | Full-screen viewer | Modal overlay |

---

## 🎨 Quick Style Reference

### Most Common Class Combinations

#### Card Container
```javascript
className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 border border-gray-800"
```

#### Section Title
```javascript
className="text-3xl font-bold mb-8"
```

#### Body Text
```javascript
className="text-gray-400 mb-4"
```

#### Link
```javascript
className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
```

#### Primary Button
```javascript
className="bg-yellow-400 text-black rounded-full px-6 py-3 font-bold hover:bg-yellow-300 transition-colors"
```

#### Badge
```javascript
className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-medium border border-yellow-400/30"
```

---

## 🔧 Tailwind Config

**File**: `tailwind.config.js`

```javascript
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './component/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['var(--font-lato)', 'Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

---

## 📝 Best Practices

### ✅ Do
- Use Tailwind utility classes (not custom CSS)
- Follow the color palette consistently
- Use semantic HTML elements
- Add hover states to interactive elements
- Use transition classes for smooth animations
- Implement responsive design with breakpoints
- Add aria-labels for accessibility
- Use line-clamp for text truncation
- Optimize images with Next/Image
- Use CSS classes from globals.css for custom effects

### ❌ Don't
- Don't use inline styles (except dynamic values)
- Don't mix dark and light themes in same section
- Don't skip hover states on buttons/links
- Don't use arbitrary values (use Tailwind scale)
- Don't forget mobile responsiveness
- Don't hardcode colors (use Tailwind classes)
- Don't skip alt text on images
- Don't use custom fonts without declaring in config

---

## 🎯 Design Tokens

### Spacing Token Usage
- `px-6 lg:px-16` - Section horizontal padding
- `py-16` - Section vertical padding
- `p-6` - Card padding
- `gap-8` - Grid gaps
- `mb-8` - Section title margin bottom
- `mb-4` - Element spacing within cards

### Border Radius
- `rounded-lg` - Cards, inputs (8px)
- `rounded-full` - Buttons, badges (9999px)
- `rounded-md` - Small elements (6px)

### Shadows
- `shadow-md` - App cards
- `shadow-lg` - Hover state for cards
- `shadow-xl` - Scroll to top button
- `shadow-2xl` - Hover state for button

### Transitions
- `transition-colors` - Color changes
- `transition-all` - Multiple property changes
- `transition-shadow` - Shadow changes
- `transition-transform` - Transform changes
- `duration-200` - Fast (200ms)
- `duration-300` - Normal (300ms)
- `duration-600` - Slow (600ms)

---

**Last Updated**: June 8, 2026  
**Design System Version**: 1.0  
**Framework**: Tailwind CSS 3.4
