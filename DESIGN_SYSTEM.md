# Maskan Design System (مسكن)

Real Estate Platform - Arabic RTL with English Support

## 1. Brand Feel

**Trustworthy, modern, clean, airy.**

- Lots of white space
- Large property photography
- Calm blues with warm orange used only for primary actions and highlights
- Professional and approachable

---

## 2. Color Tokens

### Light Theme

| Token | Value | Usage |
|-------|-------|-------|
| `bg-page` | `#F8FAFC` | Main page background |
| `bg-surface` | `#FFFFFF` | Cards, header, modals |
| `bg-subtle` | `#F1F5F9` | Input backgrounds, table headers, chips |
| `border` | `#E2E8F0` | Standard borders |
| `border-strong` | `#CBD5E1` | Emphasized borders |
| `text-primary` | `#0F172A` | Primary text content |
| `text-secondary` | `#475569` | Secondary text |
| `text-muted` | `#64748B` | Muted/helper text |
| `primary` | `#1E3A8A` | Brand color, links, heading accents |
| `primary-hover` | `#1E40AF` | Primary hover state |
| `primary-soft` | `#DBEAFE` | Selected states, soft badges |
| `accent` | `#F97316` | Main CTAs: search, send, publish |
| `accent-hover` | `#EA580C` | Accent hover state |
| `accent-soft` | `#FFEDD5` | Accent background tints |
| `on-accent` | `#111827` | Text on orange buttons (readable contrast) |
| `on-primary` | `#FFFFFF` | Text on primary buttons |
| `success` | `#16A34A` | Published, replied, WhatsApp green `#25D366` |
| `success-soft` | `#DCFCE7` | Success background |
| `warning` | `#D97706` | Draft, new inquiry |
| `warning-soft` | `#FEF3C7` | Warning background |
| `danger` | `#DC2626` | Delete, errors, sold |
| `danger-soft` | `#FEE2E2` | Danger background |
| `info` | `#0284C7` | Informational states |
| `info-soft` | `#E0F2FE` | Info background |

### Dark Theme

| Token | Value | Usage |
|-------|-------|-------|
| `bg-page` | `#0B1220` | Main page background |
| `bg-surface` | `#111A2E` | Cards, header, modals |
| `bg-subtle` | `#172036` | Input backgrounds, table headers, chips |
| `border` | `#243049` | Standard borders |
| `border-strong` | `#34435F` | Emphasized borders |
| `text-primary` | `#F1F5F9` | Primary text content |
| `text-secondary` | `#CBD5E1` | Secondary text |
| `text-muted` | `#94A3B8` | Muted/helper text |
| `primary` | `#60A5FA` | Links, accents |
| `primary-button` | `#2563EB` | Filled primary buttons with white text |
| `primary-hover` | `#3B82F6` | Primary hover state |
| `primary-soft` | `#1E2F55` | Selected states, soft backgrounds |
| `accent` | `#FB923C` | Main CTAs |
| `accent-hover` | `#F97316` | Accent hover state |
| `accent-soft` | `#3A2312` | Accent background tints |
| `on-accent` | `#111827` | Text on accent buttons |
| `on-primary` | `#FFFFFF` | Text on primary buttons |
| `success` | `#4ADE80` | Success states |
| `success-soft` | `#12301F` | Success background |
| `warning` | `#FBBF24` | Warning states |
| `warning-soft` | `#35290C` | Warning background |
| `danger` | `#F87171` | Danger states |
| `danger-soft` | `#3A1618` | Danger background |
| `info` | `#38BDF8` | Info states |
| `info-soft` | `#0C2A3D` | Info background |

**Dark Mode Rules:**
- No pure black, no pure white
- Use borders more than shadows to separate surfaces
- Dim photos slightly (brightness 0.9)
- Theme toggle (sun/moon icon) in header on public pages and top bar on admin pages

---

## 3. Typography

### Font Family
- **Primary:** Cairo (headings and UI)
- **Fallback:** Tajawal
- **Language:** Arabic first, numbers in Latin digits (1, 2, 3) for prices and counts

### Type Scale

| Level | Desktop | Mobile | Weight | Usage |
|-------|---------|--------|--------|-------|
| Display | 48px / 56px | 32px / 40px | Bold | Hero headline only |
| H1 | 36px / 44px | 26px / 34px | Bold | Page titles |
| H2 | 28px / 36px | 22px / 30px | Bold | Section titles |
| H3 | 22px / 30px | 18px / 26px | Semibold | Card titles |
| H4 | 18px / 26px | 16px / 24px | Semibold | Subsections |
| Body L | 18px / 30px | 18px / 30px | Regular | Large body text |
| Body | 16px / 28px | 16px / 28px | Regular | Standard text |
| Body S | 14px / 24px | 14px / 24px | Regular | Small text |
| Caption | 12px / 18px | 12px / 18px | Medium | Labels, metadata |

### Typography Rules
- **Price text:** Cairo Bold, primary color (light) / text-primary (dark)
- **Arabic line height:** Generous (1.6-1.75)
- **Letter spacing:** Never use letter-spacing on Arabic text

---

## 4. Layout, Spacing, Radius, Shadow

### Grid System
- **Columns:** 12
- **Max content width:** 1280px
- **Gutter:** 24px
- **Page padding:** 24px desktop / 16px mobile

### Spacing Scale (4px base)
`4, 8, 12, 16, 24, 32, 48, 64, 96`

**Section vertical spacing:** 64px desktop / 40px mobile

### Border Radius
- **sm:** 8px (inputs, chips)
- **md:** 12px (cards, buttons)
- **lg:** 16px (hero search card, modals)
- **full:** Pills, avatars

### Shadows (Light Theme Only)
- **sm:** `0 1px 2px rgba(15, 23, 42, 0.06)`
- **md:** `0 4px 16px rgba(15, 23, 42, 0.08)`
- **lg:** `0 12px 32px rgba(15, 23, 42, 0.12)`

**Dark mode:** Replace shadows with 1px border + subtle surface elevation

### Breakpoints
- **Mobile:** 390px
- **Tablet:** 768px
- **Desktop:** 1440px

---

## 5. Components

### Buttons

**Dimensions:** Height 48px desktop / 44px mobile, radius 12px, font 16px semibold

**Variants:**

| Variant | Background | Text | Usage |
|---------|------------|------|-------|
| Primary CTA | `accent` | `on-accent` | بحث, إرسال الاستفسار, حفظ ونشر |
| Secondary | `primary` (light) / `primary-button` (dark) | `on-primary` | اتصل الآن, + إضافة عقار |
| Outline | Transparent | `text-primary` | Secondary actions |
| Ghost | Transparent | `primary` | Tertiary actions |
| WhatsApp | `#25D366` | White | WhatsApp actions (same both themes) |
| Danger | `danger` | White | Delete, remove |

**States:**
- **Hover:** Use `-hover` color variants
- **Focus:** 2px primary ring with 2px offset
- **Disabled:** 40% opacity, no hover
- **Loading:** Spinner replacing icon

**Small size:** Height 36px, font 14px

### Inputs

**Dimensions:** Height 48px, radius 8px, background `bg-subtle`, 1px `border`

**Elements:**
- **Label:** Above field (Body S, text-secondary)
- **Placeholder:** text-muted
- **Helper text:** Body S below field

**States:**
- **Focus:** border `primary` + 3px `primary-soft` ring
- **Error:** `danger` border + red helper text with icon
- **Success:** `success` border
- **Disabled:** Reduced opacity

**Special inputs:**
- **Select:** Chevron on LEFT side (RTL)
- **Number inputs:** Unit suffix (ج.م / م²)
- **Textarea:** Min height 120px
- **Checkbox/Radio:** 20px with primary fill
- **Pill buttons:** Selected = `primary-soft` bg + `primary` border + `primary` text

**Search form card:** bg-surface, radius 16px, shadow lg, 24px padding, tabs on top (active tab = accent underline + bold)

### Property Card

**Structure:**
- Background: `bg-surface`, 1px border, radius 12px
- **Hover:** Lift 4px + shadow md
- **Image:** 4:3 ratio, radius 12px on top, lazy loaded

**Badges on image (top-right):**
- للبيع: `primary-soft` bg / `primary` text
- للإيجار: `success-soft` bg / `success` text
- مميز: `accent` bg / `on-accent` text + star icon

**Content (16px padding):**
- Price: H3 Bold
- Title: Body, 2 lines max, ellipsis
- Location: Pin icon + Body S muted
- Divider
- Icons row: bed, bath, area with Body S text

**Rent display:** Show "/ شهريًا" in caption size

### Badges / Chips

**Status badges** (pill, caption size, soft bg + strong text):
- منشور: success
- مسودة: warning
- مباع: danger
- جديد: info
- تم الرد: success

**Filter chips:** bg-subtle with × button to remove

### Header (Public)

**Dimensions:** Height 72px, bg-surface, bottom border, sticky

**Layout:**
- Logo: Right side (RTL)
- Nav links: Center
- Theme toggle + WhatsApp button: Left side

**Mobile:** Logo + hamburger drawer

### Footer

**Light theme:** bg-primary (#1E3A8A), white text
**Dark theme:** bg-surface with top border, slate-300 text

**Layout:** 4 columns, copyright row at bottom

### Admin Layout

**Sidebar:**
- Width: 260px
- Position: Right side (RTL)
- Background: bg-surface with border-left
- Active item: `primary-soft` bg + `primary` text + 3px `accent` bar on right edge

**Top bar:**
- Height: 64px
- Page title, theme toggle, admin avatar menu

**Content area:** bg-page

**Tables:**
- Header row: bg-subtle
- Row height: 64px
- Hover: bg-subtle
- 1px row dividers
- Sticky header

**Stat cards:**
- Icon in soft colored circle
- Big number (H1)
- Label (Body S muted)
- Small trend indicator

**Charts:**
- Primary line: #1E3A8A (light) / #60A5FA (dark)
- Accent highlights: accent color
- Grid lines: border color (soft)

### Overlays and Feedback

**Modal:**
- Radius: 16px
- Backdrop: rgba(15, 23, 42, 0.5)

**Side drawer:** 420px for inquiry details

**Lightbox:** Near-black backdrop with arrows and counter

**Toasts:**
- Position: Top-center
- Radius: 12px
- Colored icon (success/danger)

**Skeleton loaders:** bg-subtle with soft shimmer

**Empty states:**
- Simple line illustration in primary-soft
- Short text
- One action button

**Accordion (FAQ):**
- Bordered rows
- Plus/minus icon on LEFT (RTL)
- Open state: primary-soft background

**Breadcrumb:**
- Body S, muted
- Chevron separators pointing LEFT (RTL)

**Pagination:**
- 40px square buttons
- Radius 8px
- Active: primary fill

---

## 6. Icons and Imagery

### Icons
- **Library:** Lucide (outline, 1.75px stroke)
- **Default size:** 20px
- **Navigation size:** 24px
- **RTL:** Flip directional icons (arrows, chevrons, back/next)

### Photography
- Bright natural-light real estate photography
- Modern Egyptian compounds and apartments
- Hero uses dark gradient overlay: rgba(15, 23, 42, 0.55) for text readability

### Logo
- Simple wordmark "مسكن" in Cairo ExtraBold
- Small house-roof mark above first letter
- Primary color in light theme, white in dark theme

---

## 7. RTL Rules

**Layout mirroring:**
- Logo and sidebar: Right side
- Text: Right-aligned by default
- Directional icons: Flipped
- Form labels: Aligned right

**LTR exceptions:**
- Phone numbers
- Prices
- Email addresses
(Keep inline LTR direction for these elements)

---

## 8. Accessibility

**Requirements:**
- Text contrast: At least 4.5:1 in both themes
- Touch targets: Minimum 44px
- Focus indicators: Visible focus ring on every interactive element
- Color independence: Never rely on color alone for status (always add text or icon)
- Screen reader support: Proper ARIA labels and semantic HTML
- Keyboard navigation: Full support for keyboard-only users

---

## Implementation Notes

1. **CSS Variables:** Implement all color tokens as CSS custom properties
2. **Theme switching:** JavaScript toggle between light/dark classes
3. **Font loading:** Use next/font for Cairo and Tajawal with proper fallbacks
4. **RTL support:** Use `dir="rtl"` on HTML element, mirror Tailwind utilities
5. **Responsive:** Mobile-first approach with breakpoint modifiers
6. **Performance:** Optimize images, lazy load below fold, tree-shake unused CSS

---

**Version:** 1.0  
**Last Updated:** 2026-11-15  
**Owner:** Maskan Development Team
