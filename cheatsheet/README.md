# MyPorto - Cheatsheet Index

## 📚 Complete Documentation Set

This folder contains comprehensive cheatsheets for the MyPorto project. Use this index to navigate all available documentation.

---

## 📖 Available Cheatsheets

### 1. [PROJECT_MAP.md](./PROJECT_MAP.md)
**Complete Project Overview** - Start here!

**Contains**:
- Project overview and architecture
- Complete directory structure
- Database schema documentation
- API routes summary
- Page structure and data flow
- Design system (colors, typography, layout)
- Content relationships
- Environment variables
- Planned features

**When to use**: Understanding the overall project structure, finding files, understanding how different parts connect

---

### 2. [SANITY_QUERIES.md](./SANITY_QUERIES.md)
**Sanity CMS Query Reference**

**Contains**:
- GROQ query patterns
- Reference resolution examples
- Image handling with urlFor
- Common queries (posts, apps, projects)
- Filtering and parameters
- Block content rendering
- Schema quick reference
- Client configuration
- Debugging queries

**When to use**: Writing Sanity queries, understanding schema fields, debugging CMS issues, optimizing data fetching

---

### 3. [API_ROUTES.md](./API_ROUTES.md)
**API Routes & Integration Guide**

**Contains**:
- Download API documentation
- Payment APIs (Stripe integration)
- Portfolio data API
- Sanity webhook handler
- Security considerations
- Testing examples with cURL
- Error handling patterns
- Complete payment flow
- Integration examples (frontend + backend)

**When to use**: Working with payment integration, understanding API endpoints, testing APIs, implementing new routes

---

### 4. [COMPONENTS_PATTERNS.md](./COMPONENTS_PATTERNS.md)
**Component Usage & React Patterns**

**Contains**:
- Server vs Client components
- Data fetching patterns
- Image handling
- List rendering
- State management
- Event handling
- Form patterns
- Filter & search implementation
- Responsive design patterns
- Common UI patterns (cards, badges, buttons)
- Best practices
- Quick reference guides

**When to use**: Building new components, understanding component patterns, learning React/Next.js best practices, implementing UI features

---

### 5. [UI_DESIGN_SYSTEM.md](./UI_DESIGN_SYSTEM.md) ⭐ NEW
**Complete UI/UX Design System**

**Contains**:
- Color palette (dark & light themes)
- Typography system (Lato font)
- Spacing system and scales
- Component styles (buttons, cards, badges, forms)
- Custom CSS classes
- Responsive design breakpoints
- Layout patterns
- Image handling guidelines
- Interactive states
- Accessibility guidelines
- Theme switching (dark/light)
- Component inventory
- Design tokens

**When to use**: Styling components, maintaining design consistency, adding new UI elements, understanding color system

### 6. [PAGE_UI_BREAKDOWN.md](./PAGE_UI_BREAKDOWN.md) ⭐ NEW
**Page-by-Page Visual Guide**

**Contains**:
- Homepage section-by-section breakdown (12 sections)
- Blog listing page structure
- Project listing page structure
- App store listing structure
- App detail page layout
- Blog detail page structure
- Project detail page structure
- ASCII wireframes for each section
- Exact Tailwind classes used
- Visual hierarchy information
- Spacing rhythm patterns

**When to use**: Understanding page layouts, replicating section designs, finding exact styling for components, visual reference

---

---

## 🎯 Quick Navigation by Task

### I want to understand the project structure
→ Read: [PROJECT_MAP.md](./PROJECT_MAP.md) - "Architecture" & "Directory Structure" sections

### I want to add a new page
→ Read: 
1. [PROJECT_MAP.md](./PROJECT_MAP.md) - "Page Structure" section
2. [COMPONENTS_PATTERNS.md](./COMPONENTS_PATTERNS.md) - "Data Fetching Patterns"

### I want to modify Sanity queries
→ Read: [SANITY_QUERIES.md](./SANITY_QUERIES.md) - "Common Queries" section

### I want to work on the App Store
→ Read:
1. [PROJECT_MAP.md](./PROJECT_MAP.md) - "App Store" sections
2. [API_ROUTES.md](./API_ROUTES.md) - "Payment APIs" section
3. [COMPONENTS_PATTERNS.md](./COMPONENTS_PATTERNS.md) - "Filter & Search Pattern"

### I want to add payment features
→ Read: [API_ROUTES.md](./API_ROUTES.md) - "Payment Flow (Complete)" section

### I want to create a new component
→ Read: [COMPONENTS_PATTERNS.md](./COMPONENTS_PATTERNS.md) - "Component Structure" & "Common UI Patterns"

### I want to fix image loading issues
→ Read: [SANITY_QUERIES.md](./SANITY_QUERIES.md) - "Image Handling" section

### I want to understand the webhook/cache system
→ Read: [API_ROUTES.md](./API_ROUTES.md) - "Sanity Webhook" section

### I want to deploy the project
→ Read: [PROJECT_MAP.md](./PROJECT_MAP.md) - "Environment Variables" & "Scripts & Commands"

### I want to add a new content type
→ Read: 
1. [SANITY_QUERIES.md](./SANITY_QUERIES.md) - "Schema Quick Reference"
2. [PROJECT_MAP.md](./PROJECT_MAP.md) - "Database Schema" section

---

## 📊 Documentation Coverage

| Topic | Coverage | File |
|-------|----------|------|
| Project Architecture | ✅ Complete | PROJECT_MAP.md |
| Directory Structure | ✅ Complete | PROJECT_MAP.md |
| Sanity Schema | ✅ Complete | PROJECT_MAP.md + SANITY_QUERIES.md |
| GROQ Queries | ✅ Complete | SANITY_QUERIES.md |
| API Routes | ✅ Complete | API_ROUTES.md |
| Payment Integration | ✅ Complete | API_ROUTES.md |
| Component Patterns | ✅ Complete | COMPONENTS_PATTERNS.md |
| Styling (Tailwind) | ✅ Complete | UI_DESIGN_SYSTEM.md |
| Design System | ✅ Complete | UI_DESIGN_SYSTEM.md |
| Page Layouts | ✅ Complete | PAGE_UI_BREAKDOWN.md |
| Data Fetching | ✅ Complete | Multiple files |
| State Management | ✅ Complete | COMPONENTS_PATTERNS.md |
| Security | ✅ Complete | API_ROUTES.md |
| Deployment | ⚠️ Basic | PROJECT_MAP.md |
| Testing | ⚠️ Basic | API_ROUTES.md |

---

## 🚀 Getting Started

### For New Developers
1. Start with [PROJECT_MAP.md](./PROJECT_MAP.md) to understand the architecture
2. Read [COMPONENTS_PATTERNS.md](./COMPONENTS_PATTERNS.md) for coding patterns
3. Use [SANITY_QUERIES.md](./SANITY_QUERIES.md) as a query reference
4. Reference [API_ROUTES.md](./API_ROUTES.md) for API work

### For Quick Reference
- Keep all cheatsheets open in separate tabs
- Use Ctrl+F / Cmd+F to search within files
- Bookmark this index for easy access

### For Specific Tasks
- Check the "Quick Navigation by Task" section above
- Each cheatsheet has "When to use" guidance

---

## 📝 File Locations Quick Reference

### Frontend Files
- Homepage: `app/page.js` + `component/homeComponent.js`
- Blog: `app/blog/page.jsx`
- Store: `app/store/page.jsx`
- Projects: `app/project/page.jsx`

### Backend Files
- Sanity client: `lib/sanity.js`
- Download API: `app/api/download/route.js`
- Payment API: `app/api/payment/create-payment-intent/route.js`
- Webhook: `app/api/sanity-webhook/route.js`

### CMS Files
- Schema index: `sanity/schemaTypes/index.js`
- App schema: `sanity/schemaTypes/app.js`
- Blog schema: `sanity/schemaTypes/blog.js`
- Project schema: `sanity/schemaTypes/project.js`

### Configuration
- Environment: `.env.local`
- Next.js config: `next.config.mjs`
- Tailwind config: `tailwind.config.js`
- Sanity config: `sanity.config.js`

---

## 🔗 External Resources

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev/)
- [Sanity Docs](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Stripe Docs](https://stripe.com/docs)

### Project Resources
- README: `/README.md`
- Midtrans Plan: `/MIDTRANS_INTEGRATION.md`
- Payment Setup: `/PAYMENT_SETUP.md`
- Sanity Real-time: `/SANITY_REALTIME_SETUP.md`

---

## 🎨 Design System Quick Reference

### Colors
- Primary: Yellow (`yellow-400` / `#FFD700`)
- Background: Black (`#000000`)
- Cards: `gray-900`
- Text: White (`#FFFFFF`)
- Secondary: `gray-400`
- Borders: `gray-800`

### Typography
- Font: Lato (Google Fonts)
- Weights: 100, 300, 400, 700, 900

### Layout
- Container: `max-w-4xl` or `max-w-6xl`
- Sections: `py-16 px-6 lg:px-16`
- Grid gaps: `gap-6` or `gap-8`

---

## 💡 Tips for Using Cheatsheets

1. **Don't memorize** - Use as reference
2. **Search effectively** - Use Ctrl+F for specific terms
3. **Cross-reference** - Topics span multiple files
4. **Practice** - Try examples from the cheatsheets
5. **Update** - Add your own notes as you learn
6. **Share** - Use for onboarding new team members

---

## 📈 Maintenance

### Last Updated
- June 8, 2026

### How to Update
When project changes:
1. Update relevant cheatsheet sections
2. Update this index if new files added
3. Update "Last Updated" timestamp
4. Commit changes with clear message

### Contributing
If you discover new patterns or useful information:
1. Add to the appropriate cheatsheet
2. Update this index if needed
3. Document why the addition is valuable

---

## 🆘 Need Help?

### Common Questions

**Q: Where do I find the schema for a content type?**
A: Check `sanity/schemaTypes/[type].js` or read "Database Schema" section in PROJECT_MAP.md

**Q: How do I fetch data from Sanity?**
A: Use functions in `lib/sanity.js` or see SANITY_QUERIES.md for examples

**Q: How does the payment system work?**
A: Read API_ROUTES.md "Payment Flow (Complete)" section

**Q: How do I add a new page?**
A: See PROJECT_MAP.md "Page Structure" and COMPONENTS_PATTERNS.md "Data Fetching Patterns"

**Q: Where are the API routes?**
A: All in `app/api/` - see API_ROUTES.md for documentation

---

**Happy Coding! 🚀**
