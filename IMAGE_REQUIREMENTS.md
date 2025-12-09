# Salaam Cola Website - Image Requirements

This document lists all images needed for the Salaam Cola Malaysia website. Currently using Unsplash placeholders that should be replaced with actual brand assets.

---

## 1. Product Images

Each product needs **2 images** (main + secondary view). Recommended size: **800x800px** (square format).

| Product | File Name | Description | Current Placeholder |
|---------|-----------|-------------|---------------------|
| Mister Cola Classic | `mister-cola-classic-1.jpg` | Main product shot | Unsplash cola image |
| Mister Cola Classic | `mister-cola-classic-2.jpg` | Side/alternate view | Unsplash cola image |
| Mister Cola Zero | `mister-cola-zero-1.jpg` | Main product shot (black/silver theme) | Unsplash cola image |
| Mister Cola Lemon | `mister-cola-lemon-1.jpg` | Main product shot (yellow accent) | Unsplash lemon drink image |
| Mister Cola 6-Pack | `mister-cola-6pack-1.jpg` | Pack shot showing all bottles | Unsplash bottles image |

**Specifications:**
- Format: JPG or PNG (PNG if transparency needed)
- Resolution: 800x800px minimum
- Background: White/transparent for clean product shots
- Style: High-quality product photography with consistent lighting

---

## 2. Hero Section

| Image | File Name | Dimensions | Description |
|-------|-----------|------------|-------------|
| Hero Product | `hero-product.png` | 600x800px | Main floating bottle for hero section |
| Hero Background | `hero-bg.jpg` (optional) | 1920x1080px | Background image/gradient (currently CSS gradient) |

**Specifications:**
- Hero Product: PNG with transparent background for floating effect
- High resolution for retina displays
- Product should have dramatic lighting/shadows

---

## 3. Instagram Feed Images

6 images for the Instagram feed section. Size: **400x400px** (square).

| Position | File Name | Content Suggestion |
|----------|-----------|-------------------|
| 1 | `instagram-1.jpg` | Product lifestyle shot |
| 2 | `instagram-2.jpg` | Brand/community photo |
| 3 | `instagram-3.jpg` | Product close-up |
| 4 | `instagram-4.jpg` | Customer/event photo |
| 5 | `instagram-5.jpg` | Behind the scenes |
| 6 | `instagram-6.jpg` | Creative flat lay |

**Specifications:**
- Format: JPG
- Resolution: 400x400px minimum (square crop)
- Style: Match your actual Instagram feed aesthetic
- Can be pulled directly from your Instagram account

---

## 4. Retailer Logos

Logos for the "Where to Buy" section. Transparent PNG format.

| Retailer | File Name | Notes |
|----------|-----------|-------|
| AEON | `retailer-aeon.png` | Official logo |
| myNEWS | `retailer-mynews.png` | Official logo |
| 7-Eleven | `retailer-7eleven.png` | Official logo |
| Tesco | `retailer-tesco.png` | Official logo |
| Giant | `retailer-giant.png` | Official logo |
| KK Mart | `retailer-kkmart.png` | Official logo |

**Specifications:**
- Format: PNG with transparent background
- Height: 60-80px (width proportional)
- Color: Grayscale or original colors (site applies grayscale filter)

---

## 5. Section Background Images (Optional)

These sections currently use CSS gradients but can have background images.

| Section | File Name | Dimensions | Description |
|---------|-----------|------------|-------------|
| Taste Is Everything | `taste-bg.jpg` | 1920x1080px | Lifestyle/brand image |
| Giving Power | `giving-power-bg.jpg` | 1920x1080px | Community/impact image |
| About Page | `about-hero.jpg` | 1920x600px | Brand story banner |
| Contact Page | `contact-bg.jpg` | 1920x600px | Office/team image |

**Specifications:**
- Format: JPG (optimized for web)
- Style: Images should work with dark overlay for text readability
- Can use brand photography or stock images

---

## 6. Favicon & Meta Images

| Image | File Name | Dimensions | Usage |
|-------|-----------|------------|-------|
| Favicon | `favicon.ico` | 32x32px | Browser tab icon |
| Apple Touch Icon | `apple-touch-icon.png` | 180x180px | iOS home screen |
| OG Image | `og-image.jpg` | 1200x630px | Social media sharing |

---

## File Organization

Place all images in the following structure:

```
public/
├── images/
│   ├── products/
│   │   ├── mister-cola-classic-1.jpg
│   │   ├── mister-cola-classic-2.jpg
│   │   ├── mister-cola-zero-1.jpg
│   │   ├── mister-cola-lemon-1.jpg
│   │   └── mister-cola-6pack-1.jpg
│   ├── hero/
│   │   └── hero-product.png
│   ├── instagram/
│   │   ├── instagram-1.jpg
│   │   ├── instagram-2.jpg
│   │   ├── instagram-3.jpg
│   │   ├── instagram-4.jpg
│   │   ├── instagram-5.jpg
│   │   └── instagram-6.jpg
│   ├── retailers/
│   │   ├── retailer-aeon.png
│   │   ├── retailer-mynews.png
│   │   ├── retailer-7eleven.png
│   │   ├── retailer-tesco.png
│   │   ├── retailer-giant.png
│   │   └── retailer-kkmart.png
│   └── backgrounds/
│       ├── taste-bg.jpg
│       ├── giving-power-bg.jpg
│       ├── about-hero.jpg
│       └── contact-bg.jpg
├── favicon.ico
├── apple-touch-icon.png
└── og-image.jpg
```

---

## Image Optimization Tips

1. **Compress all images** before upload using tools like:
   - TinyPNG (https://tinypng.com)
   - Squoosh (https://squoosh.app)

2. **Use WebP format** for better compression (Next.js auto-converts)

3. **Provide 2x resolution** for retina displays when possible

4. **Keep file sizes under:**
   - Product images: < 200KB each
   - Hero images: < 500KB
   - Instagram images: < 100KB each
   - Background images: < 300KB

---

## Summary Checklist

- [ ] 5 Product images (minimum)
- [ ] 1 Hero product image
- [ ] 6 Instagram feed images
- [ ] 6 Retailer logos
- [ ] 4 Background images (optional)
- [ ] 3 Meta/favicon images
- [ ] Logo (already have)

**Total: ~25 images to prepare**
