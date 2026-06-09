# Page-by-Page UI Breakdown

## 📄 Complete Visual Guide for Each Page

---

## 1. Homepage (`/`)

**File**: `app/page.js` + `component/homeComponent.js`  
**Theme**: Dark  
**Total Lines**: ~686 lines in homeComponent.js

### Section-by-Section Breakdown

#### 1.1 Header
**Position**: Fixed at top  
**Background**: Black (#000000)  
**Height**: Auto (py-4 padding)

**Elements**:
```
┌─────────────────────────────────────────────────────────┐
│ [Logo: Gugus Darmayanto]  [Nav Links...]  [Contact] [☰] │
└─────────────────────────────────────────────────────────┘
```

**Styling**:
- Logo: `text-xl font-bold` white, hover yellow
- Desktop Nav: Hidden on mobile (`hidden md:flex`)
- Links: `space-x-6`, white text, hover yellow
- Contact Button: `bg-yellow-400 text-black rounded-full px-4 py-2 text-xs md:text-sm font-bold`
- Hamburger: `md:hidden`, white icon, 24x24px

**Mobile Menu** (when toggled):
- Full-screen overlay
- Background: `rgba(0, 0, 0, 0.95)` with blur
- Close button: Top-right, X icon 32x32px
- Links: `text-2xl`, centered, vertical stack `space-y-6`
- Hover: Yellow underline animation

---

#### 1.2 Hero Section (#home)
**Background**: Black  
**Padding**: `py-16 px-6 lg:px-16`  
**Layout**: Flex row-reverse on mobile, row on desktop

**Structure**:
```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  [Text Content]          [Profile Photo]            │
│  - H1: Headtitle         - Width: Full (md:1/2)     │
│  - Description           - Height: h-64/md:h-96     │
│  - Contact Button        - Object-fit: cover        │
│                            - Object-position: top    │
└──────────────────────────────────────────────────────┘
```

**Left Column (md:w-1/2)**:
- H1: `text-4xl md:text-5xl font-bold mb-4`
  - Word "programmer" highlighted in yellow
- Description: `text-gray-400 mb-4`
  - Dynamic placeholders: {ex} = years experience, {mo} = years mobile dev
- Contact Button: `bg-yellow-400 text-black rounded-full px-6 py-3 font-bold mt-4`

**Right Column (md:w-1/2)**:
- Image: `w-full h-64 md:h-96 object-cover rounded-lg bg-gray-800`
- Positioning: `flex justify-center items-center mb-8 md:mb-0`

---

#### 1.3 About Me Section (#about)
**Background**: `bg-gray-900`  
**Padding**: `py-16 px-6 lg:px-16`

**Structure**:
```
┌──────────────────────────────────────────────────────┐
│  About Me (H2: text-3xl font-bold mb-8)             │
│                                                      │
│  ┌─────────┐  Name:        Gugus Darmayanto         │
│  │  Photo  │  GitHub:      webshunter               │
│  │         │  Location:    Indonesia                │
│  │ h-64/80 │  Languages:   Indonesian, English      │
│  └─────────┘                                        │
│               [Download CV Button]                  │
└──────────────────────────────────────────────────────┘
```

**Left Column (md:w-1/3)**:
- Photo div: `w-full h-64 md:h-80 rounded-lg bg-cover bg-top`
- Background image from porto.foto

**Right Column (md:w-2/3 md:pl-8)**:
- Info Grid: `grid grid-cols-1 md:grid-cols-2 gap-4`
  - Label: `text-gray-400 mb-2`
  - Value: `font-medium`
- Download CV Button: `bg-yellow-400 text-black rounded-full px-6 py-3 font-bold mt-8`

---

#### 1.4 Resume Section (#resume)
**Background**: Black  
**Padding**: `py-16 px-6 lg:px-16`

**Structure**:
```
┌──────────────────────────────────────────────────────┐
│  Resume (H2)                                        │
│                                                      │
│  ┌─────────────────────┬──────────────────────┐     │
│  │ Work Experience     │ Education            │     │
│  │                     │                      │     │
│  │ [Date Range]        │ [Date Range]         │     │
│  │ [Company Name]      │ [School Name]        │     │
│  │ [Position]          │ [Degree]             │     │
│  │ [Details (HTML)]    │                      │     │
│  │                     │                      │     │
│  │ [Date Range]        │ [Date Range]         │     │
│  │ [Company Name]      │ [School Name]        │     │
│  └─────────────────────┴──────────────────────┘     │
│                                                      │
│              [Download CV Button]                    │
└──────────────────────────────────────────────────────┘
```

**Columns**: `grid grid-cols-1 md:grid-cols-2 gap-8`

**Each Card**:
- Background: `bg-gray-900 p-6 rounded-lg`
- Title: `text-xl font-bold mb-4`

**Work Experience Items**:
- Date: `text-yellow-400 font-bold`
- Company: `text-xl font-bold`
- Position: `text-gray-400 mt-2`
- Details: BlockContent renderer (rich text)

**Education Items**:
- Date: `text-yellow-400 font-bold`
- School: `text-xl font-bold`
- Degree: `text-gray-400 mt-2`

**Center Button**: `flex justify-center mt-10`

---

#### 1.5 Services Section (#services)
**Background**: `bg-gray-900`  
**Padding**: `py-16 px-6 lg:px-16`

**Structure**:
```
┌──────────────────────────────────────────────────────┐
│  Services (H2)                                      │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ [Icon]   │  │ [Icon]   │  │ [Icon]   │          │
│  │          │  │          │  │          │          │
│  │ Service1 │  │ Service2 │  │ Service3 │          │
│  │ [Skill]  │  │ [Skill]  │  │ [Skill]  │          │
│  └──────────┘  └──────────┘  └──────────┘          │
└──────────────────────────────────────────────────────┘
```

**Grid**: `grid grid-cols-1 md:grid-cols-3 gap-6`

**Each Service Card**:
- Background: `bg-black p-8 rounded-lg text-center`
- Icon Container: `w-16 h-16 bg-yellow-400 rounded-lg flex items-center justify-center mx-auto mb-4`
- Icon Image: 40x40px
- Title: `text-xl font-bold mb-2`
- Description: `text-gray-400`

---

#### 1.6 Skills Section (#skills)
**Background**: Black  
**Padding**: `py-16 px-6 lg:px-16`

**Structure**:
```
┌──────────────────────────────────────────────────────┐
│  My Skills (H2)                                     │
│                                                      │
│  ┌─────────────────────┬──────────────────────┐     │
│  │ JavaScript  90%     │ Python        85%    │     │
│  │ [████████░░]        │ [█████████░]         │     │
│  │                     │                      │     │
│  │ React       88%     │ Next.js       82%    │     │
│  │ [████████░░]        │ [████████░░]         │     │
│  │                     │                      │     │
│  │ Node.js     85%     │ MongoDB       80%    │     │
│  │ [████████░░]        │ [████████░░]         │     │
│  └─────────────────────┴──────────────────────┘     │
└──────────────────────────────────────────────────────┘
```

**Grid**: `grid grid-cols-1 md:grid-cols-2 gap-8`

**Each Skill Item**:
- Header: `flex justify-between mb-2`
  - Name: Left aligned
  - Percentage: Right aligned
- Progress Bar: 
  - Container: `.progress-bar rounded-full overflow-hidden`
  - Fill: `.progress-fill` with inline `width: ${skill.prosentase}%`
- Split: First half in left column, second half in right column

---

#### 1.7 Projects Section (#projects)
**Background**: `bg-gray-900`  
**Padding**: `py-16 px-6 lg:px-16`

**Structure**:
```
┌──────────────────────────────────────────────────────┐
│  My Projects (H2)                                   │
│                                                      │
│  ┌─────────────────┐  ┌─────────────────┐          │
│  │ [Project Image] │  │ [Project Image] │          │
│  │                 │  │                 │          │
│  │ Project Name    │  │ Project Name    │          │
│  │ Description...  │  │ Description...  │          │
│  │ View Details →  │  │ View Details →  │          │
│  └─────────────────┘  └─────────────────┘          │
│                                                      │
│  ┌─────────────────┐  ┌─────────────────┐          │
│  │ [Project Image] │  │ [Project Image] │          │
│  └─────────────────┘  └─────────────────┘          │
│                                                      │
│           [View More Projects Button]               │
└──────────────────────────────────────────────────────┘
```

**Grid**: `grid grid-cols-1 md:grid-cols-2 gap-8`

**Each Project Card**:
- Background: `bg-black p-6 rounded-lg hover:scale-105 transition-all duration-300 block border border-gray-800`
- Image: `w-full mb-2 rounded`, 400x200px
- Title: `text-xl font-bold mb-2`
- Description: `text-gray-400 line-clamp-2`
- Link: `mt-2 text-yellow-400 font-medium`

**View More Button** (if projects exist):
- `text-center mt-8`
- `inline-flex items-center bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors`
- Arrow: `→` with `ml-2`

---

#### 1.8 Blog Section (#blog)
**Background**: Black  
**Padding**: `py-16 px-6 lg:px-16`

**Structure**:
```
┌──────────────────────────────────────────────────────┐
│  Blog (H2)                                          │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ [Image]  │  │ [Image]  │  │ [Image]  │          │
│  │          │  │          │  │          │          │
│  │ 📅Date 👤│  │ 📅Date 👤│  │ 📅Date 👤│          │
│  │ Author   │  │ Author   │  │ Author   │          │
│  │ Title    │  │ Title    │  │ Title    │          │
│  │ [Badge]  │  │ [Badge]  │  │ [Badge]  │          │
│  │ Excerpt..│  │ Excerpt..│  │ Excerpt..│          │
│  │ Read more│  │ Read more│  │ Read more│          │
│  └──────────┘  └──────────┘  └──────────┘          │
│                                                      │
│              [View All Posts Button]                 │
└──────────────────────────────────────────────────────┘
```

**Grid**: `grid grid-cols-1 md:grid-cols-3 gap-8`

**Each Blog Card**:
- Background: `bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-800`
- Image Container: `relative h-48 overflow-hidden`
  - Gradient overlay: `absolute inset-0 bg-gradient-to-t from-black/50 to-transparent`
  - Image hover: `hover:scale-110 transition-transform duration-300`
- Content Padding: `p-6`
- Date/Author: `flex items-center gap-4 text-sm text-gray-400 mb-3`
  - Icons: 📅 and 👤
- Title: `text-xl font-bold mb-2 hover:text-yellow-400 transition-colors line-clamp-2`
- Categories: `flex gap-2 mb-4 flex-wrap`
  - Badge: `bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-medium border border-yellow-400/30`
- Excerpt: `text-gray-400 mb-4 line-clamp-3`
- Read More Link: `inline-flex items-center text-yellow-400 hover:text-yellow-300 font-medium transition-colors group`
  - Arrow animation: `ml-2 group-hover:translate-x-1 transition-transform`

---

#### 1.9 Freelancing CTA Section
**Background**: `bg-gray-800 bg-opacity-50`  
**Padding**: `py-16 px-6 lg:px-16`  
**Alignment**: `text-center`

**Structure**:
```
┌──────────────────────────────────────────────────────┐
│                                                      │
│    I'm Available for Freelancing (H2)               │
│                                                      │
│              [Contact Button]                        │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Styling**:
- Title: `text-3xl font-bold mb-4`
  - "Available" in yellow: `<span className="text-yellow-400">`
- Contact Button: Same as hero section

---

#### 1.10 Contact Section (#contact)
**Background**: Black  
**Padding**: `py-16 px-6 lg:px-16`

**Structure**:
```
┌──────────────────────────────────────────────────────┐
│  Contact Me (H2)                                    │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ ✉️ Icon  │  │ 📍 Icon  │  │ 🌐 Icon  │          │
│  │  Email   │  │ Location │  │  GitHub  │          │
│  │ [email]  │  │  [loc]   │  │ [github] │          │
│  └──────────┘  └──────────┘  └──────────┘          │
│                                                      │
│  ┌─────────────┬───────────────────────┐           │
│  │  [Map Area] │  Name: [________]     │           │
│  │             │  Email: [________]    │           │
│  │  h-64/full  │  Subject: [______]    │           │
│  │  bg-gray-800│  Message: [______]    │           │
│  │             │  [Send Message Btn]   │           │
│  └─────────────┴───────────────────────┘           │
└──────────────────────────────────────────────────────┘
```

**Info Cards Grid**: `grid grid-cols-1 md:grid-cols-3 gap-6 mb-12`

**Each Card**:
- Background: `bg-gray-900 p-6 rounded-lg text-center`
- Icon Container: `w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4`
- Icon: SVG 24x24px, `text-yellow-400`
- Label: `text-gray-400`
- Value: White text

**Form Layout**: `flex flex-col md:flex-row gap-8`

**Left Column (md:w-1/2)**:
- Map placeholder: `w-full h-64 md:h-full bg-gray-800 rounded-lg`

**Right Column (md:w-1/2)**:
- Form: `space-y-4`
- Input fields: `w-full bg-gray-900 border border-gray-800 rounded-lg p-4`
- Submit Button: `bg-yellow-400 text-black rounded-full px-6 py-3 font-bold`

---

#### 1.11 Footer
**Background**: `bg-gray-900`  
**Padding**: `py-16 px-6 lg:px-16`

**Structure**:
```
┌──────────────────────────────────────────────────────┐
│  About        │ Links    │ Services   │ Skills      │
│  [About text] │ - Home   │ - Web Dev  │ JS  React   │
│               │ - About  │ - Mobile   │ Node Python │
│               │ - Resume │ - DB Mgmt  │ [More...]   │
│               │ - Project│ - Server   │             │
│                                                      │
│  ───────────────────────────────────────────────     │
│  © 2025 All Rights Reserved | Gugus Darmayanto      │
│                         [GitHub] [LinkedIn] [Twitter]│
└──────────────────────────────────────────────────────┘
```

**Top Grid**: `grid grid-cols-1 md:grid-cols-4 gap-8 mb-8`

**Each Column**:
- Title: `text-xl font-bold mb-4`
- Content: `text-gray-400`
- Links: `hover:text-yellow-400`

**Skills Column**:
- Grid: `grid grid-cols-2`
- Items: `pr-[5px] text-gray-400`

**Bottom Section**:
- Border: `border-t border-gray-800 pt-8`
- Layout: `flex flex-col md:flex-row justify-between items-center`
- Copyright: `text-gray-400 mb-4 md:mb-0`
- Social Icons: `flex space-x-4`, gray hover yellow

---

#### 1.12 Scroll to Top Button
**Position**: Fixed bottom-right  
**Visibility**: Hidden by default, shown after 60px scroll

**Styling**:
```javascript
className="
  fixed bottom-6 right-6 
  w-5 h-10 
  flex items-center justify-center 
  bg-yellow-400 text-gray-900 
  rounded-full 
  shadow-xl border border-yellow-300 
  hover:bg-yellow-500 hover:shadow-2xl 
  transition-all duration-200 
  ring-1 ring-yellow-200/60 
  z-50 cursor-pointer hidden
"
```

**Icon**: Up arrow SVG 18x20px

---

## 2. Blog Listing Page (`/blog`)

**File**: `app/blog/page.jsx`  
**Theme**: Dark  
**Revalidation**: 60 seconds

### Structure

#### Hero Section
**Background**: `bg-gradient-to-b from-gray-900 to-black`  
**Padding**: `py-16 px-6 lg:px-16`

**Content** (centered, max-w-4xl):
- H1: `text-5xl md:text-6xl font-bold mb-6`
  - "Blog" highlighted in yellow
- Description: `text-xl text-gray-400 mb-8 max-w-2xl mx-auto`
- Divider: `w-24 h-1 bg-yellow-400 mx-auto`

#### Blog Grid
**Layout**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`  
**Container**: `max-w-6xl mx-auto`

**Each Card**: Same as homepage blog cards (see section 1.8)

**Empty State**:
- Icon: `text-6xl mb-4` (📝)
- Title: `text-2xl font-bold mb-4`
- Text: `text-gray-400`

#### Newsletter Section
**Background**: `bg-gray-900`  
**Padding**: `py-16 px-6 lg:px-16`

**Content** (centered, max-w-4xl):
- H2: `text-3xl font-bold mb-4`
- Description: `text-gray-400 mb-8`
- Form: `flex flex-col sm:flex-row gap-4 max-w-md mx-auto`
  - Input: `flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg`
  - Button: `bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold`

#### Footer
Simple copyright footer (different from SiteFooter component)

---

## 3. Project Listing Page (`/project`)

**File**: `app/project/page.jsx`  
**Theme**: Dark

### Structure

#### Header
Uses `SiteHeader` component

#### Page Header
**Padding**: `py-16 px-6 lg:px-16`

- H1: `text-4xl font-bold mb-8 text-center`
- Text: "My Projects"

#### Project Grid
**Layout**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`  
**Container**: `max-w-6xl mx-auto`

**Each Card**:
- Link wrapper: `bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 border border-gray-800 block`
- Image Container: `relative h-48 overflow-hidden bg-gray-800 flex items-center justify-center`
  - Image: `object-cover w-full h-full`
- Content: `p-6`
  - Title: `text-xl font-bold mb-2 line-clamp-2`
  - Description: `text-gray-400 line-clamp-3`
  - CTA: `mt-4 text-yellow-400 font-medium` - "Lihat Detail →"

#### Footer
Uses `SiteFooter` component

---

## 4. App Store Listing (`/store`)

**File**: `app/store/page.jsx`  
**Theme**: Light  
**Component Type**: Client Component

### Structure

#### Header
Uses `StoreHeader` component (light theme)

#### Page Header
**Container**: `container mx-auto px-4 py-8`

**Content** (centered, text-center, mb-12):
- H1: `text-4xl font-bold text-gray-900 mb-4`
  - Text: "App Store"
- Description: `text-xl text-gray-600 max-w-2xl mx-auto`

#### Filters Section
**Component**: `StoreFilters`  
**Margin**: `mb-8`

**Styling**: `bg-white rounded-lg shadow-sm p-6 mb-6`

**Grid**: `grid grid-cols-1 md:grid-cols-5 gap-4`

**Filters**:
1. **Search** - Text input
2. **Category** - Dropdown
3. **App Type** - Dropdown
4. **Price** - Dropdown
5. **Sort By** - Dropdown

Each with:
- Label: `block text-sm font-medium text-gray-700 mb-2`
- Input/Select: `w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500`

#### Apps Grid
**Layout**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`

**Each Card**: `AppCard` component (see section below)

**Empty State**:
- `text-center py-12`
- `text-gray-500 text-lg`

#### Footer
Uses `SiteFooter` component

---

## 5. App Detail Page (`/store/[slug]`)

**File**: `app/store/[slug]/page.jsx`  
**Theme**: Light

### Structure

#### Header
Uses `StoreHeader` component

#### Main Layout
**Container**: `container mx-auto px-4 py-8`

**Grid**: `grid grid-cols-1 lg:grid-cols-3 gap-8`

---

#### Main Content (lg:col-span-2)

##### 5.1 App Header Card
**Styling**: `bg-white rounded-lg shadow-sm p-6 mb-6`

**Layout**: `flex flex-col md:flex-row gap-6`

**Left - App Image**:
- `flex-shrink-0`
- `w-48 h-48 object-contain rounded-lg bg-gray-100`

**Right - App Info** (flex-1):
- H1: `text-3xl font-bold text-gray-900 mb-2`
- Description: `text-gray-900 mb-4`
- Price & Downloads Row: `flex items-center gap-4 mb-4`
  - Price: `text-2xl font-bold text-green-600` - "FREE"
  - Downloads: `flex items-center text-gray-500`
    - Icon: 📥
    - Text: `{count} downloads`
- Details Grid: `grid grid-cols-2 gap-4 text-sm`
  - Type, Version, Size, Category
  - Label: `font-medium text-gray-700`
  - Value: `ml-2 text-gray-600`
- Tags: `mt-4 flex flex-wrap gap-2`
  - Each: `px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full`
- Payment Notice (if paid app):
  - `mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md`
  - Text: `text-sm text-blue-800`

---

##### 5.2 Screenshots Section
**Component**: `ScreenshotsSection`

**Styling**: `bg-white rounded-lg shadow-sm p-6 mb-6`

**Features**:
- Grid of screenshots
- Click to open modal
- Full-screen viewer

---

##### 5.3 Features Section
**Conditional**: Only if `app.features` exists

**Styling**: `bg-white rounded-lg shadow-sm p-6 mb-6`

- H2: `text-xl font-semibold text-gray-900 mb-4`
- List: `space-y-2`
  - Each: `flex items-start`
  - Checkmark: `text-green-500 mr-2` - "✓"
  - Text: `text-gray-700`

---

##### 5.4 System Requirements Section
**Conditional**: Only if `app.systemRequirements` exists

**Styling**: `bg-white rounded-lg shadow-sm p-6 mb-6`

- H2: `text-xl font-semibold text-gray-900 mb-4`
- Content: `text-gray-700 whitespace-pre-line`

---

##### 5.5 About This App Section
**Conditional**: Only if `app.content` exists

**Styling**: `bg-white rounded-lg shadow-sm p-6`

- H2: `text-xl font-semibold text-gray-900 mb-4`
- Content: `prose max-w-none text-gray-900`
  - BlockContentClient renderer

---

#### Sidebar (lg:col-span-1)

##### Purchase Form
**Component**: `AppPurchaseForm`

**Positioning**: 
- `lg:col-span-1`
- `sticky top-8`

**Features**:
- Customer name input
- Customer email input
- Purchase/Download button
- Payment integration (Stripe)
- Terms checkbox

---

## 6. Blog Detail Page (`/blog/[slug]`)

**Theme**: Dark  
**File**: `app/blog/[slug]/page.jsx`

### Structure

#### Header
Uses `SiteHeader` component (or BlogHeader)

#### Article Header
**Background**: Gradient or solid dark

**Elements**:
- Title: Large heading (text-4xl/5xl)
- Meta info:
  - Published date
  - Author name
  - Categories (badges)
- Featured image: Full-width or contained

#### Article Content
**Styling**: `prose-invert` class

**BlockContent**:
- Rich text rendering
- Custom serializers for code blocks
- Links in yellow
- Code blocks with gray background
- Blockquotes with yellow left border

#### Sidebar (if exists)
- Table of contents
- Related posts
- Share buttons

#### Footer
Uses `SiteFooter` component

---

## 7. Project Detail Page (`/project/[slug]`)

**Theme**: Dark  
**File**: `app/project/[slug]/page.jsx`

### Structure

#### Header
Uses `SiteHeader` component

#### Project Header
- Project icon/image
- Project name (H1)
- Description

#### Gallery Section
**Component**: `ProjectGalleryWithModal`

**Features**:
- Grid of images
- Modal viewer
- Navigation arrows
- Image counter

#### Content Section
- BlockContent rendering
- Rich text
- Code blocks if applicable

#### Footer
Uses `SiteFooter` component

---

## 8. Admin Dashboard (`/admin`)

**File**: `app/admin/page.jsx`

**Purpose**: Custom admin interface (if implemented)

**Note**: May redirect to Sanity Studio at `/studio`

---

## 9. Sanity Studio (`/studio`)

**File**: `app/studio/[[...tool]]/page.jsx`

**Purpose**: CMS interface for content management

**Features**:
- Full Sanity Studio UI
- Content editing
- Media library
- Preview mode
- Real-time collaboration

**Access**: Requires Sanity authentication

---

## 📐 Common Layout Patterns

### Full-Width Sections
```javascript
<section className="py-16 px-6 lg:px-16">
  {/* Spans full viewport width */}
</section>
```

### Container-Constrained Content
```javascript
<section className="py-16 px-6 lg:px-16">
  <div className="max-w-6xl mx-auto">
    {/* Constrained to 6xl (1152px) */}
  </div>
</section>
```

### Centered Narrow Content
```javascript
<div className="max-w-4xl mx-auto text-center">
  {/* Constrained to 4xl (896px), centered */}
</div>
```

### Two-Column Responsive
```javascript
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <div>Left</div>
  <div>Right</div>
</div>
```

### Main + Sidebar
```javascript
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="lg:col-span-2">Main</div>
  <div className="lg:col-span-1">
    <div className="sticky top-8">Sidebar</div>
  </div>
</div>
```

---

## 🎨 Visual Hierarchy

### Heading Sizes
- **H1**: 36px-48px (text-4xl/5xl) - Page titles
- **H2**: 30px (text-3xl) - Section titles
- **H3**: 24px (text-2xl) - Card titles
- **H4**: 20px (text-xl) - Subsection titles

### Color Priority
1. **White** - Primary text on dark backgrounds
2. **Yellow-400** - Highlights, CTAs, links hover
3. **Gray-400** - Secondary text, descriptions
4. **Gray-900** - Card backgrounds
5. **Black** - Main background

### Spacing Rhythm
- **Section padding**: 64px vertical (py-16)
- **Section title margin**: 32px bottom (mb-8)
- **Card padding**: 24px (p-6)
- **Element spacing**: 16px (mb-4)
- **Grid gaps**: 32px (gap-8) or 24px (gap-6)

---

**Last Updated**: June 8, 2026  
**Pages Documented**: 9  
**Total Sections**: 40+
