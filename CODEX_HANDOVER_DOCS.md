# VSZAPOWER B2B Store — Codex & Agent Handover Documentation
> **Document Version**: 2.0 (Full Handover Specs)  
> **Last Updated**: August 1, 2026  
> **Repository**: `666lvdeshui-ux/vszapower-store` (Branch: `main`)  
> **Official Domain**: [https://www.vszapower.com](https://www.vszapower.com)  
> **Company Legal Entity**: VSZAPOWER Limited (微贊控股（香港）有限公司)  
> **Official Contact Email**: `666lvdeshui@gmail.com`  

---

## 📌 Executive Summary & Project Positioning

VSZAPOWER (vszapower.com) is a high-conversion, B2B wholesale-focused official store built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS / Custom CSS Tokens**, and **Supabase**.

### Primary Business Goal
To convert social media traffic (e.g. TikTok B2B lead generation ads/bio links) and organic search engine traffic (Google SEO/GEO) into high-value wholesale B2B inquiries for rechargeable coin cell batteries (LIR2032/LIR2025/LIR2450) and smart dual-slot button battery chargers.

### Critical Product Rules (DO NOT BREAK)
1. **100% B2B Wholesale Focus**: No retail C-end or low-single-unit pricing. Minimum Order Quantity (MOQ) is `100 Pcs` across all product items.
2. **Zero Temu / Retail Branding**: All legacy e-commerce / retail references (e.g., Temu) have been strictly replaced with `✓ 1,480+ Verified Reviews` / `Verified Purchase` / `Verified Buyers`.
3. **Seamless Lead Capture & PDF Auto-Popup**: When a buyer submits an inquiry or clicks `Download 2026 Wholesale Catalog (PDF)`, the system automatically captures their contact info, syncs it to Supabase & Email (`666lvdeshui@gmail.com`), and immediately opens the official wholesale quotation page (`/VSZAPOWER_2026_Official_Wholesale_Quotation.html`) in a new tab.

---

## 🛠 Tech Stack & Core Libraries

- **Framework**: Next.js 14.2.5 (App Router)
- **Language**: TypeScript 5.5.3
- **Styling**: Tailwind CSS + Custom CSS Variables in `app/globals.css` (Dark/Light mode compliant)
- **Database & Auth**: Supabase JS Client (`@supabase/supabase-js` v2.45.0) + Local Mock Fallback (`lib/store.ts`)
- **Icons**: Lucide React (`lucide-react` v0.428.0)
- **Deployment**: Vercel (Cron enabled via `vercel.json` for auto news publishing)

---

## 📁 Repository Directory Structure

```
vszapower-store/
├── app/                                  # Next.js 14 App Router Page Directory
│   ├── page.tsx                          # Main B2B Wholesale Landing Page
│   ├── layout.tsx                        # Root Layout with Theme & Language Providers
│   ├── globals.css                       # Design System, Dark/Light Mode & CSS Tokens
│   ├── sitemap.ts                        # SEO XML Sitemap Generator
│   ├── robots.ts                         # SEO Robots.txt Configuration
│   ├── admin/                            # B2B Admin Background Dashboard (/admin)
│   │   └── page.tsx
│   ├── academy/                          # Battery Knowledge Base & SEO Blog (/academy)
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── api/                              # REST API Route Handlers
│       ├── inquiries/route.ts            # POST: Record B2B Wholesale Leads
│       ├── products/route.ts             # GET/POST: Product Catalog CRUD
│       ├── posts/route.ts                # GET/POST: SEO Articles CRUD
│       ├── reviews/route.ts              # GET: Verified Buyer Reviews API
│       ├── banners/route.ts              # B2B Promotional Banner API
│       ├── upload/route.ts               # Product Image / Attachment Upload Handler
│       ├── videos/route.ts               # Video Showcase API
│       └── cron/publish-news/route.ts    # Vercel Cron Daily News Publisher
├── components/                           # React UI Components
│   ├── Header.tsx                        # Main B2B Navigation Header & Quick Inquiry CTAs
│   ├── Footer.tsx                        # Global Footer with Company Credentials
│   ├── HeroSection.tsx                   # High-Impact Factory & Product Hero Section
│   ├── HeroCarousel.tsx                  # Promotional Banner Carousel
│   ├── ProductGrid.tsx                   # Product Grid & Wholesale Inquiry Modals
│   ├── CatalogDownloadModal.tsx          # 1-Click Catalog Download & PDF Auto-Popup Modal
│   ├── CertificationsSection.tsx         # 8 International Export Certifications Showcase
│   ├── ContactSection.tsx                # Direct Wholesale Inquiry Form
│   ├── FactoryShowcase.tsx               # 10,000 m² Source Factory & OEM/ODM Capabilities
│   ├── ReviewSection.tsx                 # Verified Buyer Testimonials & Trust Badges
│   ├── StarterKitBundle.tsx              # LIR2032 Dual Charger Starter Pack Feature
│   ├── VideoSection.tsx                  # Product Demonstration & Factory Video Section
│   ├── BatteryMatcher.tsx                # Interactive Coin Cell Compatibility Tool
│   ├── GeoSeoStructuredData.tsx          # Google Rich Snippet & Geo SEO Injection
│   ├── GeoTechSpecs.tsx                  # Technical Battery Specification Table
│   ├── LanguageSwitcher.tsx              # 14-Language Dropdown Selector
│   └── admin/                            # Admin Management Sub-components
│       ├── InquiryManager.tsx            # B2B Lead Management & Status Tracking
│       ├── ProductManager.tsx            # Product CRUD & MOQ Management
│       ├── PostManager.tsx               # SEO Article Publishing Tool
│       └── VideoManager.tsx              # Video Resource Manager
├── context/                              # React Context State Providers
│   ├── LanguageContext.tsx               # Global 14-Language i18n Context
│   └── ThemeContext.tsx                  # Dark / Light Mode Context
├── lib/                                  # Business Logic, Data Store & Utilities
│   ├── supabase.ts                       # Supabase Client Init & Fallback Mock Store
│   ├── store.ts                          # Server-side Local Storage & Helper Functions
│   ├── i18n.ts                           # Static UI Translations (14 Languages)
│   ├── dynamicI18n.ts                    # Dynamic Product/Article Pre-translation Engine
│   └── productImages.ts                  # High-Resolution Product SVG & Image Mappings
├── public/                               # Static Web Assets
│   ├── VSZAPOWER_2026_Official_Wholesale_Quotation.html # Official PDF Printable Sheet
│   ├── VSZAPOWER_2026_Wholesale_Product_Catalog.pdf    # Catalog Asset
│   ├── favicon.png / icon.png / logo.svg                # Brand Icons
│   └── products/                             # Local Product Images
├── scripts/                              # Helper Build Scripts
├── vercel.json                           # Vercel Deployment & Cron Specs
├── supabase_schema.sql                   # Supabase Database DDL Schema
└── PROJECT_TECHNICAL_DOCS.md             # High-level Technical Overview
```

---

## 🔑 Key Workflows & Business Logic

### 1. Lead Capture & Instant Quotation PDF Workflow
- **Trigger**: User clicks `Download 2026 Wholesale Catalog (PDF)` or submits a quote form in `ContactSection.tsx`, `ProductGrid.tsx`, or `CatalogDownloadModal.tsx`.
- **API Call**: Invokes `POST /api/inquiries` with payload:
  ```json
  {
    "name": "Buyer Name",
    "contact": "buyer@company.com",
    "company": "Company Name Inc.",
    "country": "United States",
    "product": "2026 Official Wholesale Quotation PDF",
    "message": "Downloaded wholesale catalog"
  }
  ```
- **Database Action**: Saved to Supabase table `inquiries` (status: `new`).
- **Instant Response**: Client script immediately opens `window.open('/VSZAPOWER_2026_Official_Wholesale_Quotation.html', '_blank')`.

### 2. Pricing Engine & Official B2B Quote Sheet
- **File**: `public/VSZAPOWER_2026_Official_Wholesale_Quotation.html`
- **FOB Pricing Formula**:
  $$\text{FOB Unit Price (USD)} = \frac{\text{Base RMB Cost} + 20.00\,\text{RMB}}{7.20\,\text{Exchange Rate}}$$
- **5-Pack Adjustment**: All **5-Pack (5pcs papercard)** items have an additional **+$1.00 USD** added to final quote (e.g. $3.70 → $4.70).
- **Photos Matching**: Each row in the HTML quote displays dual product photos (Charger + 2PCS/5PCS Papercard Packaging).
- **VIP Header**: Features `VIP ACCESS VERIFIED ✓` header, `VSZAPOWER Limited` company info, and `Print / Save as PDF` button.

### 3. Internationalization (14 Languages)
- **Supported Languages**:
  `en` (English), `zh-CN` (Simplified Chinese), `de` (German), `ja` (Japanese), `es` (Spanish), `ko` (Korean), `he` (Hebrew), `ar` (Arabic), `fr` (French), `pt` (Portuguese), `ru` (Russian), `vi` (Vietnamese), `zh-HK` (Traditional Chinese HK), `zh-TW` (Traditional Chinese TW).
- **Files**:
  - `lib/i18n.ts`: Main translation dictionary for all UI keys.
  - `lib/dynamicI18n.ts`: Pre-translates product descriptions and SEO blog titles dynamically into the active language.
  - `context/LanguageContext.tsx`: Wraps app layout, detects browser language, handles RTL switching for Arabic/Hebrew.

---

## 🗄 Database Schema (`supabase_schema.sql`)

### Key Tables
1. **`inquiries`**:
   - `id` (UUID, PK)
   - `name` (TEXT)
   - `contact` (TEXT, Email/Phone)
   - `company` (TEXT)
   - `country` (TEXT)
   - `product` (TEXT)
   - `message` (TEXT)
   - `status` (`new` | `contacted` | `resolved`)
   - `created_at` (TIMESTAMPTZ)
2. **`products`**:
   - `id` (TEXT, PK)
   - `slug` (TEXT, Unique)
   - `title` (TEXT)
   - `price` (NUMERIC, Wholesale Price)
   - `category` (TEXT)
   - `image_url` (TEXT)
   - `certifications` (JSONB)
   - `specs` (JSONB)
3. **`posts`**:
   - `id` (TEXT, PK)
   - `slug` (TEXT)
   - `title` (TEXT)
   - `content` (TEXT)
   - `category` (TEXT)
   - `published_at` (TIMESTAMPTZ)

---

## ⚙️ Environment Variables (`.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=https://opvfguxhmgxrgufyedlh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable__FGFmoi0YT4dJ8UH70idcw_QZ8qoVub
```

*Note: If Supabase variables are missing, `lib/supabase.ts` gracefully degrades to the local mock store `lib/store.ts` without crashing.*

---

## 🛠 Commands for Future AI Agents / Developers

### 1. Start Local Development Server
```bash
npm run dev
# Opens at http://localhost:3000
```

### 2. Verify TypeScript Types & Production Build
```bash
npx tsc --noEmit
npm run build
```

### 3. Deploy to Production (Vercel)
```bash
git add .
git commit -m "feat/fix: your commit message"
git push origin main
# Automated Vercel build will trigger on main push
```

---

## 📋 Checklist for Codex / Successor Agents

When picking up new tasks on this codebase, always follow these principles:
- [ ] **Maintain B2B Tone**: Keep wording focused on bulk orders, FOB prices, MOQ 100 pcs, and factory manufacturing capabilities.
- [ ] **Preserve Double-Sync**: Ensure any new inquiry forms call `/api/inquiries` and trigger catalog/quote PDF opens when appropriate.
- [ ] **Check i18n Coverage**: When adding UI text, add corresponding keys in `lib/i18n.ts` for all 14 supported languages.
- [ ] **Test Production Build**: Run `npm run build` before pushing to avoid breaking Vercel automated deployments.

---
*End of Codex Handover Document.*
