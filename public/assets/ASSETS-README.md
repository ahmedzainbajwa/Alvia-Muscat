# Assets Directory Structure

This directory contains all the static assets for the Alvia landing page.

## Directory Structure

```
/public/assets/
├── hero/
│   ├── logo.png (120x40px) - Main logo
│   └── logo.svg - SVG version of logo
├── parallax/
│   ├── 01.jpg (1920x1080px) - First parallax image
│   ├── 02.jpg (1920x1080px) - Second parallax image
│   └── 03.jpg (1920x1080px) - Third parallax image
├── amenities/
│   ├── pool.svg - Pool icon
│   ├── gym.svg - Gym icon
│   ├── playground.svg - Playground icon
│   ├── garden.svg - Garden icon
│   ├── parking.svg - Parking icon
│   ├── security.svg - Security icon
│   ├── retail.svg - Retail icon
│   ├── mosque.svg - Mosque icon
│   ├── community.svg - Community center icon
│   └── maintenance.svg - Maintenance icon
├── offerings/
│   ├── residential/
│   │   ├── studio.jpg (600x800px)
│   │   ├── 1bed.jpg (600x800px)
│   │   ├── 2bed.jpg (600x800px)
│   │   ├── 3bed.jpg (600x800px)
│   │   └── penthouse.jpg (600x800px)
│   └── commercial/
│       ├── retail.jpg (600x800px)
│       ├── office.jpg (600x800px)
│       ├── restaurant.jpg (600x800px)
│       └── service.jpg (600x800px)
├── whyinvest/
│   ├── image-1.jpg (1200x466px) - Top full-width image
│   ├── image-2.jpg (600x360px) - Bottom left image
│   └── image-3.jpg (600x360px) - Bottom right image
├── paymentplan/
│   ├── plan-1.png (800x1000px)
│   ├── plan-1.pdf - Downloadable PDF version
│   ├── plan-2.png (800x1000px)
│   └── plan-2.pdf - Downloadable PDF version
└── brochures/
    ├── commercial-brochure.pdf
    └── residential-brochure.pdf
```

## How to Replace Assets

### 1. Logo (Required)
- Replace `/public/assets/hero/logo.png` with your actual logo
- Recommended size: 120x40px (or maintain aspect ratio)
- Format: PNG with transparency or SVG

### 2. Parallax Images (Required)
- Replace files in `/public/assets/parallax/`
- Recommended size: 1920x1080px (16:9 ratio)
- Format: JPG or WebP
- Ensure high quality for fullscreen display

### 3. Amenity Icons (Required)
- Replace SVG icons in `/public/assets/amenities/`
- Recommended size: 24x24px
- Format: SVG (scalable)
- Use consistent stroke width and style

### 4. Offering Images (Required)
- Replace images in respective folders under `/public/assets/offerings/`
- Residential: 5 images
- Commercial: 4 images
- Recommended size: 600x800px (portrait)
- Format: JPG or WebP

### 5. Why Invest Images (Required)
- Replace `/public/assets/whyinvest/image-1.jpg` (large, 1200x466px)
- Replace `/public/assets/whyinvest/image-2.jpg` and `image-3.jpg` (600x360px each)
- Format: JPG or WebP

### 6. Payment Plans (Required)
- Replace PNG previews and PDF downloads in `/public/assets/paymentplan/`
- PNG: 800x1000px or similar aspect ratio
- PDF: Actual payment plan documents

### 7. Brochures (Required)
- Replace PDFs in `/public/assets/brochures/`
- Format: PDF
- Ensure files are optimized for web delivery

## Asset Optimization Tips

1. **Images**: Compress JPG/PNG images using tools like TinyPNG or ImageOptim
2. **SVGs**: Optimize SVG files using SVGO
3. **PDFs**: Keep file sizes under 5MB for better download experience
4. **Naming**: Keep filenames lowercase with hyphens (no spaces)

## Placeholder Assets

Current placeholder assets are provided for development purposes.
Replace all placeholders before deploying to production.

