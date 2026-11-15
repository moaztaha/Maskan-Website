# Maskan - Quick Start Guide

## 🚀 Running the Development Server

```bash
# Install dependencies (if not already done)
pnpm install

# Start the development server
pnpm dev
```

The application will be available at: **http://localhost:3000**

---

## 📁 Project Structure

```
maskan/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (public)/                 # Public pages group
│   │   │   ├── layout.tsx           # Header + Footer wrapper
│   │   │   └── page.tsx             # Homepage ✅
│   │   ├── admin/                    # Admin dashboard (empty)
│   │   ├── api/                      # API routes (empty)
│   │   ├── layout.tsx               # Root layout (fonts, RTL)
│   │   └── globals.css              # Design system CSS
│   │
│   ├── components/
│   │   ├── ui/                       # Reusable UI components
│   │   │   ├── Button.tsx           ✅
│   │   │   ├── Input.tsx            ✅
│   │   │   ├── Select.tsx           ✅
│   │   │   └── Badge.tsx            ✅
│   │   ├── layout/
│   │   │   ├── Header.tsx           ✅
│   │   │   └── Footer.tsx           ✅
│   │   ├── home/                     # Homepage-specific sections
│   │   │   ├── HeroSection.tsx      ✅
│   │   │   ├── SearchCard.tsx       ✅
│   │   │   ├── FeaturedProperties.tsx ✅
│   │   │   └── CallToAction.tsx     ✅
│   │   └── property/
│   │       └── PropertyCard.tsx     ✅
│   │
│   ├── lib/
│   │   ├── constants/
│   │   │   ├── locations.ts         ✅ (Egyptian cities/areas)
│   │   │   └── property.ts          ✅ (Property types, statuses)
│   │   ├── mock-data/
│   │   │   └── properties.ts        ✅ (6 featured properties)
│   │   └── utils/
│   │       ├── format-price.ts      ✅ (Currency formatting)
│   │       └── cn.ts                ✅ (Class merger)
│   │
│   ├── hooks/                        # Custom React hooks (empty)
│   ├── server/                       # Server-side code (empty)
│   └── types/                        # TypeScript types (empty)
│
├── public/                           # Static assets
├── DESIGN_SYSTEM.md                 ✅ Complete design spec
├── HOMEPAGE_IMPLEMENTATION.md       ✅ Implementation details
└── package.json
```

---

## ✅ What's Implemented

### Homepage Sections
1. **Hero Section** - Full-width banner with "ابحث عن منزلك المثالي"
2. **Search Card** - Property search with tabs (Sale/Rent) and filters
3. **Featured Properties** - 6-card grid of property listings
4. **Call to Action** - "هل تريد بيع عقارك؟" section with contact options

### Layout
- **Header** - Sticky navigation with logo, menu, and WhatsApp button
- **Footer** - Four-column footer with links and social media

### UI Components
- Button (6 variants: primary, secondary, outline, ghost, danger, whatsapp)
- Input (with label and error support)
- Select (custom styled with RTL chevron)
- Badge (5 color variants)

### Design System
- Complete CSS variables (light + dark themes)
- Cairo & Tajawal Arabic fonts
- RTL layout support
- Responsive breakpoints
- Accessibility features

---

## 🎨 Design System Colors

### Light Theme
- **Primary:** #1E3A8A (Blue)
- **Accent:** #F97316 (Orange)
- **Background:** #F8FAFC
- **Surface:** #FFFFFF

### Dark Theme
- **Primary:** #60A5FA (Light Blue)
- **Accent:** #FB923C (Light Orange)
- **Background:** #0B1220
- **Surface:** #111A2E

---

## 🔧 Configuration Files

### TypeScript (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]  ✅ Configured
    }
  }
}
```

### Package Manager
- Using **pnpm** (specified in package.json)
- All dependencies installed
- No additional packages needed for homepage

---

## 📱 Responsive Breakpoints

- **Mobile:** < 768px (single column)
- **Tablet:** 768px - 1440px (2 columns)
- **Desktop:** > 1440px (3 columns)

---

## 🌐 Language & Direction

- **Language:** Arabic (ar)
- **Direction:** RTL (Right-to-Left)
- **Fonts:** Cairo (primary), Tajawal (fallback)
- **Numbers:** LTR format (1,234,567)

---

## 🧪 Testing the Homepage

1. **Start dev server:**
   ```bash
   pnpm dev
   ```

2. **Open browser:**
   - Navigate to `http://localhost:3000`

3. **Verify:**
   - ✅ Hero section displays with image
   - ✅ Search card shows tabs (للبيع / للإيجار)
   - ✅ 6 property cards render in grid
   - ✅ Call-to-action section appears
   - ✅ Header and footer are visible
   - ✅ Mobile menu works on small screens
   - ✅ RTL layout is correct (logo on right)

---

## 📝 Mock Data

The homepage uses **realistic Egyptian real estate data**:
- 6 featured properties
- Mix of apartments, villas, penthouses, townhouses
- Locations: Cairo, New Cairo, Giza, Sheikh Zayed, 6th October
- Prices: 1.5M - 8.5M EGP (sale), 15K - 25K EGP/month (rent)
- High-quality Unsplash images

Data location: `src/lib/mock-data/properties.ts`

---

## 🚧 What's NOT Implemented (Yet)

- Theme toggle functionality (button exists but doesn't switch themes)
- Search form submission/filtering
- Property detail pages
- Admin dashboard
- Database connection
- Authentication
- API routes
- Contact form backend

---

## 🛠️ Next Development Steps

1. **Theme Toggle**
   - Add state management for light/dark mode
   - Store preference in localStorage
   - Toggle `.dark` class on `<html>` element

2. **Property Detail Page**
   - Create `src/app/(public)/properties/[slug]/page.tsx`
   - Gallery, description, amenities, contact form

3. **Properties Listing**
   - Create `src/app/(public)/properties/page.tsx`
   - Filterable grid, pagination, sorting

4. **Admin Dashboard**
   - Property management (CRUD)
   - Inquiries management
   - Analytics/statistics

---

## 📚 Documentation

- **DESIGN_SYSTEM.md** - Complete design specifications
- **HOMEPAGE_IMPLEMENTATION.md** - Detailed component breakdown
- **SETUP_COMPLETE.md** - Design system setup summary

---

## 🐛 Troubleshooting

### Dev server won't start
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Try again
pnpm dev
```

### Fonts not loading
- Check internet connection (Google Fonts CDN)
- Verify @import in globals.css
- Clear browser cache

### Styles not applying
- Ensure Tailwind CSS is processing correctly
- Check browser console for errors
- Verify CSS variable names match

---

## 💡 Tips

1. **RTL Development:**
   - Test layout changes in both LTR and RTL
   - Use `.ltr-inline` class for numbers/prices
   - Flip directional icons manually

2. **Responsive Design:**
   - Mobile-first approach
   - Test at 390px, 768px, 1440px breakpoints
   - Use Chrome DevTools device toolbar

3. **Performance:**
   - Images are lazy-loaded by default
   - Consider Next.js Image component for optimization
   - Monitor bundle size in production build

---

**Ready to Start?** Run `pnpm dev` and open http://localhost:3000 🚀
