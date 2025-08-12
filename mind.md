# Mind Notes - GUGUS DARMAYANTO PROJECT

## User Rules & Access Control

### Admin Authentication
- Username: `gugus`
- Password: `gugus$111$`
- Access: Admin panel for content management
- Session: localStorage-based login persistence

### Admin Capabilities
- Trigger blog content revalidation
- Trigger project content revalidation  
- Trigger app store content revalidation
- Trigger transaction data revalidation

### Content Management
- All content managed via Sanity CMS
- Real-time updates with webhook system
- CDN optimization with live fallback
- Required fields validation for content types

### Payment & Store Rules
- Free apps: Direct download with form
- Paid apps: Midtrans payment gateway required
- Payment methods: Bank transfer, e-wallet, cards, convenience stores, QRIS
- Download security: Token-based system

### Technical Stack
- Next.js 15.2.5 with App Router
- Sanity.io CMS with real-time updates
- Tailwind CSS for styling
- Midtrans for payment processing
- Google Analytics integration

## Key Learnings
- Centralized admin control for content updates
- Hybrid free/paid app monetization strategy
- Real-time content synchronization system
- Token-based security for downloads
- Indonesian payment gateway integration

## Sanity CMS Structure & Schema

### Core Configuration
- **structure.js**: Defines admin panel organization with sections for Blog, Portfolio, Projects, and App Store
- **env.js**: Environment variables for API version, dataset, and project ID
- **client.js**: Sanity client with CDN optimization (useCdn: true)
- **image.js**: Image URL builder for Sanity assets
- **live.js**: Real-time content updates with experimental API

### Content Schema Types
1. **Blog**: Full-featured blog with SEO, categories, authors, and rich content
2. **App Store**: Applications with pricing, screenshots, download links, and ratings
3. **Transaction**: Payment tracking with download tokens and security features
4. **Project**: Portfolio projects with galleries and descriptions
5. **Portfolio**: Personal profile with work experience, education, skills, and services
6. **Author**: User management with bio and profile images
7. **Category**: Content categorization system
8. **Skills**: Percentage-based skill ratings (0-100)
9. **Work Experience**: Employment history with date ranges
10. **Education**: Academic background and qualifications
11. **Services**: Offered services with skill descriptions
12. **Code**: Syntax-highlighted code blocks with language support
13. **Block Content**: Rich text editor with images, headings, and formatting

### Content Management Features
- **Hotspot Images**: Interactive image editing with focus points
- **Rich Text**: Portable Text editor with custom styles and annotations
- **References**: Cross-document linking between content types
- **Validation**: Required field validation and data constraints
- **Preview**: Custom preview configurations for admin panel
- **SEO**: Meta titles, descriptions, and social media images
- **File Management**: Support for various file types and sizes 