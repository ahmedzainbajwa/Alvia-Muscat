# 🚀 Alvia Landing - Quick Start Guide

## Get Running in 3 Steps

### 1. Install Dependencies
```bash
cd alvia-landing
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Visit **http://localhost:3000**

---

## 📂 Project Overview

This is a **production-ready Next.js 14 landing page** with:

- ✅ **10 Custom Sections** (Hero, Parallax, Amenities, etc.)
- ✅ **Framer Motion Animations**
- ✅ **Responsive Design** (Mobile/Tablet/Desktop)
- ✅ **Markdown + JSON Data Management**
- ✅ **35+ Placeholder Assets** (ready to replace)
- ✅ **Contact Form with API Route**

---

## 🎯 What to Do Next

### Option A: Test & Explore (5 min)
1. Browse the landing page at localhost:3000
2. Test responsive views (resize browser)
3. Try the parallax scroll effect
4. Submit the contact form
5. Check different sections

### Option B: Customize Content (15 min)
1. **Edit text:** Open `data/alvia.md`
2. **Update offerings:** Edit `data/offerings.json`
3. **Change amenities:** Edit `data/amenities.json`
4. **Modify colors:** Update `app/globals.css`

### Option C: Replace Assets (30 min)
1. Read: `public/assets/ASSETS-README.md`
2. Prepare your images/PDFs
3. Replace files in `/public/assets/` folders
4. Keep same filenames or update paths in JSON

---

## 📋 File Guide

| File | Purpose |
|------|---------|
| `app/page.jsx` | Main page - imports all sections |
| `app/globals.css` | Design tokens & global styles |
| `data/alvia.md` | Main content (text, links, settings) |
| `data/amenities.json` | Amenities list |
| `data/offerings.json` | Residential & commercial offerings |
| `components/*/` | Individual section components |

---

## 🔧 Common Tasks

### Change Primary Color
```css
/* app/globals.css */
--color-primary: #345273; /* Change this */
```

### Update Logo
Replace: `public/assets/hero/logo.png` (120x40px)

### Edit Hero Text
```yaml
# data/alvia.md (frontmatter)
title: "Your Title"
subtitle: "Your Tagline"
```

### Add New Amenity
```json
// data/amenities.json
{
  "id": "new-amenity",
  "icon": "/assets/amenities/icon.svg",
  "name": "New Amenity Name"
}
```

### Configure Contact Form Email
Edit: `app/api/contact/route.js`

---

## 📦 Build for Production

```bash
# Build optimized version
npm run build

# Test production build locally
npm start

# Deploy to Vercel
vercel
```

---

## 🆘 Troubleshooting

**Issue: Images not loading**
- Check paths start with `/assets/`
- Verify files exist in `public/assets/`

**Issue: Build fails**
- Run: `rm -rf .next node_modules`
- Then: `npm install && npm run build`

**Issue: Fonts not showing**
- Check internet connection (loads from Google Fonts)
- Fallback: Arial will be used

**Issue: Parallax not smooth**
- Adjust `SCROLL_HEIGHT` in `components/Parallax/ParallaxSection.jsx`
- Try: 200 (faster) or 400 (slower)

---

## 📚 Documentation

- **Full README:** `README.md`
- **Project Summary:** `PROJECT-SUMMARY.md`
- **Assets Guide:** `public/assets/ASSETS-README.md`

---

## ⚡ Performance Tips

1. **Optimize Images:** Use TinyPNG before uploading
2. **Convert to WebP:** Better compression than JPG
3. **Lazy Load:** Images auto lazy-load (except hero)
4. **Minimize PDFs:** Keep brochures under 5MB

---

## 🎨 Design System

**Colors:**
- Primary: `#345273`
- Accent Gold: `#cca483`
- Dark: `#262626`

**Font:** Manrope (Google Fonts)

**Spacing:** 4px base unit (4, 8, 12, 16, 24, 32, 40, 48)

---

## ✅ Pre-Launch Checklist

Before going live:

- [ ] Replace all placeholder images
- [ ] Update all text in `data/alvia.md`
- [ ] Add real logo
- [ ] Configure contact form email
- [ ] Test on mobile devices
- [ ] Test all PDF downloads
- [ ] Verify 3D tour iframe
- [ ] Check Google Maps embed
- [ ] Run: `npm run build` (no errors)
- [ ] Set up domain & SSL
- [ ] Add Google Analytics (optional)

---

**Need Help?** Check `README.md` for detailed documentation.

**Ready to Deploy?** Run `npm run build` then deploy to Vercel.

