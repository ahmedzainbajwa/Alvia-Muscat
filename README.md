# Alvia Landing Page - Developer Documentation

A modern, production-ready single-page landing page for the Alvia real estate project in Muscat, Oman. Built with Next.js 14 App Router, TypeScript, CSS Modules, and Framer Motion.

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Guidelines](#development-guidelines)
- [Architecture](#architecture)
- [Styling System](#styling-system)
- [Internationalization (i18n)](#internationalization-i18n)
- [Data Management](#data-management)
- [API Routes](#api-routes)
- [Component Guide](#component-guide)
- [Build & Deployment](#build--deployment)
- [Troubleshooting](#troubleshooting)

---

## 🛠️ Tech Stack

### Core Technologies
- **Next.js 14.2** - React framework with App Router
- **React 18.3** - UI library
- **TypeScript** - Type safety for layout and page components
- **CSS Modules** - Scoped styling
- **Framer Motion 11** - Animation library
- **react-intersection-observer** - Scroll detection for animations

### Key Dependencies
- `gray-matter` - Markdown frontmatter parsing
- `clsx` - Conditional class name utilities
- `sharp` - Image optimization (dev dependency)

### Fonts
- **Manrope** - Primary font (English) via `next/font/google`
- **IBM Plex Sans Arabic** - Arabic font (RTL support)

---

## 📁 Project Structure

```
alvia-landing/
├── app/
│   ├── alvia/                    # Main application folder
│   │   ├── components/           # All React components
│   │   │   ├── About/
│   │   │   ├── AmenitiesSection/
│   │   │   ├── Button/
│   │   │   ├── CallModal/
│   │   │   ├── Chip/
│   │   │   ├── Contact/
│   │   │   ├── CustomCountrySelect/
│   │   │   ├── Footer/
│   │   │   ├── Hero/
│   │   │   ├── Locality/
│   │   │   ├── Navbar/
│   │   │   ├── Offerings/
│   │   │   ├── Parallax/
│   │   │   ├── PaymentPlan/
│   │   │   ├── PropertyDetails/
│   │   │   └── WhyInvest/
│   │   ├── globals.css          # Global styles & design tokens
│   │   └── page.tsx             # Main page component
│   ├── api/
│   │   └── contact/
│   │       └── route.js         # Contact form API endpoint
│   ├── layout.tsx               # Root layout (TypeScript)
│   └── page.tsx                 # Root page (re-exports from alvia)
│
├── contexts/
│   └── LanguageContext.jsx       # i18n context provider
│
├── data/
│   ├── alvia.md                 # Main content (Markdown + frontmatter)
│   ├── amenities.json           # Amenities data
│   └── offerings.json           # Residential & commercial offerings
│
├── locales/
│   ├── en.json                  # English translations
│   └── ar.json                  # Arabic translations
│
├── public/
│   └── assets/                  # Static assets (images, PDFs, videos)
│       ├── amenities/           # Amenity icons
│       ├── brochure-modal/      # Modal carousel images
│       ├── brochures/           # PDF brochures
│       ├── hero/                # Hero images, videos, logos
│       ├── Locality/            # Location images
│       ├── offerings/           # Property images
│       ├── parallax/            # Parallax gallery images
│       ├── paymentplan/         # Payment plan PDFs/PNGs
│       ├── QR/                  # QR code assets
│       └── whyinvest/           # Investment section images
│
├── tsconfig.json                # TypeScript configuration
├── jsconfig.json                # JavaScript path aliases
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies
└── README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd alvia-landing
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 💻 Development Guidelines

### Code Style
- **Components**: Use functional components with hooks
- **Styling**: CSS Modules for component styles
- **Naming**: PascalCase for components, kebab-case for CSS classes
- **TypeScript**: Used for `layout.tsx` and `page.tsx` (main entry points)

### Path Aliases
- `@/components/*` → `app/alvia/components/*`
- `@/contexts/*` → `contexts/*`
- `@/locales/*` → `locales/*`
- `@/*` → Root directory

### Import Guidelines
```javascript
// ✅ Correct - Use path aliases
import Button from '@/components/Button/Button'
import { useLanguage } from '@/contexts/LanguageContext'

// ✅ Correct - Relative imports within same folder
import styles from './Component.module.css'

// ❌ Avoid - Absolute paths without aliases
import Button from '../../../components/Button/Button'
```

### Component Structure
Each component follows this structure:
```
ComponentName/
├── ComponentName.jsx          # Component logic
└── ComponentName.module.css   # Scoped styles
```

---

## 🏗️ Architecture

### Component Hierarchy

```
RootLayout (layout.tsx)
└── LanguageProvider
    └── HomePage (page.tsx)
        ├── Navbar
        ├── Hero
        │   └── BrochureModal
        ├── AmenitiesSection
        ├── Offerings
        ├── WhyInvest
        ├── WhyChooseAlvia1
        ├── WhyChooseAlvia2
        ├── Locality
        ├── About
        ├── Contact
        │   └── CallModal
        └── Footer
```

### State Management
- **Local State**: `useState` for component-specific state
- **Global State**: `LanguageContext` for language/i18n
- **No External State Library**: Pure React hooks pattern

### Data Flow
1. **Static Data**: Markdown/JSON files in `data/` folder
2. **Server-Side**: `page.tsx` reads data files at build time
3. **Props**: Data passed down via props to components
4. **No Client-Side Fetching**: All data is static/SSG

---

## 🎨 Styling System

### Design Tokens
Located in `app/alvia/globals.css`:

**Colors:**
- `--color-primary`: `#345273` (Brand blue)
- `--color-accent-a`: `#262626` (Dark charcoal)
- `--color-accent-b`: `#cca483` (Gold)
- `--color-bg`: `#ffffff`
- `--text-primary`: `#1A1A1A`
- `--text-secondary`: `#818181`

**Typography:**
- Font families: Manrope (English), IBM Plex Sans Arabic (Arabic)
- Responsive sizing with `clamp()`
- Six predefined sizes: `h1`, `h2`, `h3`, `text-l`, `regular-m`, `regular-s`

**Spacing:**
- Base unit: `4px`
- Scale: `--space-1` through `--space-9` (4px to 72px)

**Breakpoints:**
- Desktop: `≥ 1200px`
- Tablet: `768px - 1199px`
- Mobile: `≤ 767px`

### CSS Modules Usage
```javascript
import styles from './Component.module.css'

<div className={styles.container}>
  <h1 className={styles.heading}>Title</h1>
</div>
```

### RTL Support
Arabic (RTL) support is handled via:
- `dir="rtl"` attribute on `<html>` (managed by `LanguageContext`)
- CSS rules: `html[dir="rtl"] .selector { ... }`
- Font switching: IBM Plex Sans Arabic for RTL

---

## 🌍 Internationalization (i18n)

### Setup
1. Translation files: `locales/en.json` and `locales/ar.json`
2. Context provider: `contexts/LanguageContext.jsx`
3. Hook: `useLanguage()` provides `t()`, `language`, `isRTL`, `toggleLanguage()`

### Usage in Components
```javascript
import { useLanguage } from '@/contexts/LanguageContext'

function MyComponent() {
  const { t, isRTL } = useLanguage()
  
  return (
    <div>
      <h1>{t('section.heading')}</h1>
      <p>{t('section.description')}</p>
    </div>
  )
}
```

### Translation Structure
```json
{
  "section": {
    "heading": "English Heading",
    "description": "English description"
  }
}
```

### Adding Translations
1. Add key-value pairs to both `en.json` and `ar.json`
2. Use the key in components: `t('section.heading')`
3. Ensure Arabic translations are correct for Omani market

---

## 📊 Data Management

### Content Files

**`data/alvia.md`** - Main content with frontmatter:
```yaml
---
title: "Alvia"
subtitle: "We Redefine Lifestyle"
location: "Muscat, Oman"
propertyType: "Residential/Commercial"
units: "200+"
parallaxImages:
  - "/assets/parallax/01.webp"
whyInvestImages:
  - "/assets/whyinvest/image-1.webp"
---
```

**`data/amenities.json`** - Structured amenities list:
```json
[
  {
    "id": "pool-public",
    "icon": "/assets/amenities/pool.svg",
    "name": "Public and private swimming pools"
  }
]
```

**`data/offerings.json`** - Property offerings:
```json
{
  "residential": [...],
  "commercial": [...],
  "tourUrl": "https://..."
}
```

### Reading Data in Components
```javascript
// In page.tsx (server component)
import matter from 'gray-matter'
import fs from 'fs'

const mdContent = fs.readFileSync('data/alvia.md', 'utf8')
const { data: frontmatter, content } = matter(mdContent)
```

---

## 🔌 API Routes

### Contact Form Endpoint
**Location:** `app/api/contact/route.js`

**Method:** `POST`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+96812345678",
  "message": "Optional message"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Form submitted successfully"
}
```

### Integration
Currently a stub. To integrate with email service:
1. Install service SDK (e.g., `@sendgrid/mail`)
2. Add API key to `.env.local`
3. Update POST handler in `route.js`

---

## 🧩 Component Guide

### Core Components

**Navbar**
- Hide-on-scroll functionality
- Active section highlighting
- Mobile hamburger menu
- Language toggle (EN/AR)

**Hero**
- Video background (autoplay, loop, muted)
- Animated counter for units
- Property details display
- CTA buttons with modals

**Parallax Section**
- Scroll-triggered expand animation
- Horizontal image carousel
- Configurable scroll height

**AmenitiesSection**
- Orbital carousel component
- Service cards with icons
- RTL-specific positioning for Arabic

**Offerings**
- Tabbed interface (Residential/Commercial)
- Image carousel with pagination
- 3D tour iframe integration

**WhyInvest**
- Three sections with images and cards
- Investment advantage displays
- Responsive layout

**Locality**
- Connectivity information blocks
- Google Maps embed
- Distance/time display

**Contact**
- Contact form
- Call modal integration
- Mobile-specific phone dialer

---

## 🚢 Build & Deployment

### Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

### Deployment Platforms

**Vercel (Recommended)**
```bash
npm run build
vercel
```

**Other Platforms**
- Build output in `.next/` directory
- Run `npm run build` then deploy `.next/` folder

### Environment Variables
Create `.env.local`:
```
# Email service API key (if integrating contact form)
SENDGRID_API_KEY=your_key_here
```

---

## 🔧 Troubleshooting

### Images Not Loading
- Verify paths start with `/assets/` (public folder)
- Check file extensions match (`.webp`, `.jpg`, etc.)
- Ensure files exist in `public/assets/` directory

### TypeScript Errors
- Run `npm run build` to check for type errors
- Ensure path aliases in `tsconfig.json` are correct
- Check import paths match alias configuration

### Styling Issues
- Verify CSS Module imports: `import styles from './Component.module.css'`
- Check class names match between JSX and CSS
- Inspect browser DevTools for applied styles

### i18n Not Working
- Check `LanguageContext` is wrapping components in `layout.tsx`
- Verify translation keys exist in both `en.json` and `ar.json`
- Ensure `dir` attribute is set on `<html>` element

### Build Failures
- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version (18+ required)

### RTL Layout Issues
- Verify `html[dir="rtl"]` CSS selectors are correct
- Check Arabic font is loading (`IBM Plex Sans Arabic`)
- Ensure text direction is properly set in `LanguageContext`

---

## 📝 Code Examples

### Creating a New Component
```javascript
// app/alvia/components/NewSection/NewSection.jsx
'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import styles from './NewSection.module.css'

export default function NewSection() {
  const { t } = useLanguage()
  
  return (
    <section className={styles.section}>
      <h2>{t('newSection.heading')}</h2>
    </section>
  )
}
```

```css
/* app/alvia/components/NewSection/NewSection.module.css */
.section {
  padding: var(--space-8);
}

/* RTL support */
html[dir="rtl"] .section {
  text-align: right;
}
```

### Adding Animations
```javascript
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function AnimatedSection() {
  const [ref, inView] = useInView({ triggerOnce: true })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      Content
    </motion.div>
  )
}
```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [React Intl](https://formatjs.io/docs/react-intl/) (for advanced i18n)

---

## 🤝 Contributing

1. Follow the existing code style and architecture
2. Use TypeScript for new entry points (layout, pages)
3. Maintain RTL support for Arabic translations
4. Test on mobile, tablet, and desktop
5. Update translations in both `en.json` and `ar.json`

---

## 📄 License

Proprietary - All rights reserved © 2025 Alvia

---

**Last Updated:** 2025  
**Version:** 1.0.0  
**Maintainer:** Development Team
