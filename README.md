# Alvia Landing Page

A modern, single-page Next.js landing page for the Alvia real estate project in Muscat, Oman. Built with Next.js 14 App Router, CSS Modules, and Framer Motion for smooth animations.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with App Router, React 18, Framer Motion
- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop
- **Scroll Animations**: Smooth entrance animations and parallax effects
- **Complex Parallax Gallery**: Expand-to-fullscreen image carousel triggered by scroll
- **Interactive Sections**: 3D tour iframe, interactive map, contact form
- **Modular Architecture**: CSS Modules for scoped styling, reusable components
- **Type-Safe**: Structured data management with JSON and Markdown
- **Performance**: Optimized images with Next/Image, priority loading for hero assets

## 📁 Project Structure

```
alvia-landing/
├── app/
│   ├── globals.css           # Global styles and design tokens
│   ├── layout.jsx            # Root layout with Manrope font
│   ├── page.jsx              # Main page integrating all sections
│   └── api/
│       └── contact/
│           └── route.js      # Contact form API endpoint
├── components/
│   ├── Navbar/               # Navigation with hide-on-scroll
│   ├── Hero/                 # Hero section with two-column layout
│   ├── Parallax/             # Complex parallax image section
│   ├── Amenities/            # Amenities grid from JSON
│   ├── Offerings/            # Tabbed offerings with 3D tour
│   ├── WhyInvest/            # Investment advantages section
│   ├── Locality/             # Location info with map
│   ├── PaymentPlan/          # Payment plans with downloads
│   ├── About/                # About section with brand color
│   ├── Contact/              # Contact form
│   ├── Footer/               # Footer component
│   ├── Button/               # Reusable button component
│   └── Chip/                 # Tab chip component
├── data/
│   ├── alvia.md              # Main content in Markdown with frontmatter
│   ├── amenities.json        # Amenities list
│   └── offerings.json        # Residential & commercial offerings
├── public/
│   └── assets/               # All images, PDFs, and icons
├── package.json
├── next.config.js
└── README.md
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Design Tokens

All design tokens are defined in `app/globals.css`:

### Colors
- Primary: `#345273`
- Accent A (Dark): `#262626`
- Accent B (Gold): `#cca483`
- Grey variants for backgrounds and borders
- Text colors: Primary `#1A1A1A`, Secondary `#818181`

### Typography
- Font Family: Manrope (loaded via `next/font/google`)
- Responsive sizing with `clamp()` for fluid scaling
- h1: 104px → 36px on mobile
- h2: 96px → 32px on mobile
- h3: 28px → 24px on mobile

### Spacing
- Base unit: 4px
- Scale: 4, 8, 12, 16, 24, 32, 40, 48px
- Access via CSS variables: `var(--space-1)` through `var(--space-8)`

### Breakpoints
- Desktop: ≥ 1200px
- Tablet: 768px - 1199px
- Mobile: ≤ 767px

## 📝 Content Management

### Updating Text Content

Edit `data/alvia.md` to update:
- Hero information (title, location, property details)
- About Us content
- Image paths
- Brochure and payment plan file paths

Example:
```yaml
---
title: "Alvia"
subtitle: "We Redefine Lifestyle"
location: "Muscat, Oman"
propertyType: "Residential/Commercial"
units: "200+"
---

## About Us
Your content here...
```

### Updating Amenities

Edit `data/amenities.json`:
```json
[
  {
    "id": "unique-id",
    "icon": "/assets/amenities/icon.svg",
    "name": "Amenity Name"
  }
]
```

### Updating Offerings

Edit `data/offerings.json` for residential and commercial listings:
```json
{
  "residential": [
    {
      "id": "res-1",
      "title": "Studio Apartments",
      "subtitle": "Compact & Modern",
      "image": "/assets/offerings/residential/studio.jpg",
      "heightClass": "tall"
    }
  ],
  "commercial": [...]
}
```

## 🖼️ Asset Management

### Required Assets

All assets are in `/public/assets/`. See `/public/assets/ASSETS-README.md` for detailed requirements.

#### Quick Reference:

1. **Logo** (`/assets/hero/logo.png`): 120x40px
2. **Parallax Images** (`/assets/parallax/01-03.jpg`): 1920x1080px
3. **Amenity Icons** (`/assets/amenities/*.svg`): 24x24px SVG
4. **Offering Images**:
   - Residential: 5 images (600x800px)
   - Commercial: 4 images (600x800px)
5. **Why Invest Images**: 3 images (see ASSETS-README)
6. **Payment Plans**: PNG previews + PDF downloads
7. **Brochures**: Commercial & Residential PDFs

### Replacing Assets

1. Prepare your assets following the size guidelines
2. Replace files in respective folders under `/public/assets/`
3. Keep the same filenames or update paths in `data/alvia.md`
4. Optimize images before uploading (use TinyPNG, ImageOptim, etc.)

**Important**: The logo is used in multiple places. Replace both:
- `/public/assets/hero/logo.png` (navbar)
- `/public/assets/hero/logo.svg` (optional vector version)

## ⚙️ Customization

### Adjusting Parallax Scroll Speed

Edit `/components/Parallax/ParallaxSection.jsx`:
```javascript
const SCROLL_HEIGHT = 300 // Higher = slower transitions (in vh)
```

### Modifying Colors

Update design tokens in `app/globals.css`:
```css
:root {
  --color-primary: #345273;  /* Change to your brand color */
}
```

### Changing Fonts

Update in `app/layout.jsx`:
```javascript
import { YourFont } from 'next/font/google'

const yourFont = YourFont({
  subsets: ['latin'],
  display: 'swap',
})
```

### Updating Contact Form

The contact form API is a stub at `/app/api/contact/route.js`. 

**To integrate a real email service**:
1. Install email service SDK (e.g., `npm install @sendgrid/mail`)
2. Add API key to environment variables (`.env.local`)
3. Update the POST handler in `route.js`

Example with SendGrid:
```javascript
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// In POST handler:
await sgMail.send({
  to: 'sales@majdoman.com',
  from: 'noreply@alvia.com',
  subject: `New Contact: ${name}`,
  html: `...`
})
```

## 🎭 Animations

All animations use Framer Motion:
- **Fade-in on scroll**: Uses `react-intersection-observer`
- **Parallax effects**: Uses `useScroll` and `useTransform`
- **Navbar hide/show**: Custom scroll listener

To disable animations, remove `motion.*` components and replace with regular HTML elements.

## 📱 Responsive Behavior

- **Desktop (≥1200px)**: Full layout with all features
- **Tablet (768-1199px)**: Adjusted spacing, some columns stack
- **Mobile (≤767px)**: Single column, hamburger menu, touch-optimized

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm run build
# Connect to Vercel via GitHub or CLI
vercel
```

### Other Platforms
```bash
npm run build
npm start
```

Build output is in `.next/` directory.

## 🔧 Troubleshooting

### Images not loading
- Ensure all image paths in JSON/MD files start with `/assets/`
- Check that files exist in `/public/assets/`
- Verify Next.js `images` config in `next.config.js`

### Parallax not working
- Check browser console for errors
- Ensure Framer Motion is installed: `npm install framer-motion`
- Try adjusting `SCROLL_HEIGHT` in ParallaxSection

### Contact form not submitting
- Check browser console for API errors
- Verify `/app/api/contact/route.js` exists
- Ensure fetch URL matches your domain

### Fonts not loading
- Verify Manrope import in `app/layout.jsx`
- Check network tab for font loading errors
- Try clearing Next.js cache: `rm -rf .next`

## 📄 License

This project is proprietary. All rights reserved © 2025 Alvia.

## 🤝 Support

For questions or issues:
- Email: ahmed.zain@dubizzlelabs.com

---

**Built by Ahmed Zain with ❤️ for Bayut**

