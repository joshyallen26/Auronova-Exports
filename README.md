# Auronova Exports Pvt. Ltd. – International Spice Export Platform & CMS

**Auronova Exports Pvt. Ltd.** is an international spice trading and agricultural export enterprise headquartered in the Cochin Port zone, Kerala, India. This repository powers the public B2B export website, product catalogue, international RFQ quotation portal, and the integrated administrative Content Management System (CMS).

---

## 1. System Overview & Technology Stack

- **Framework:** Next.js 15.5+ (Pages Router)
- **Runtime:** Node.js 22 LTS / React 19
- **Styling:** Tailwind CSS v4, Manrope typography, custom corporate palette
- **Database & Persistence:**
  - **Primary:** MongoDB 6.0+ with Mongoose ODM
  - **High-Availability Fallback:** Resilient local JSON data store (`.data/content-store.json`) ensuring uninterrupted builds and offline preview
- **Authentication:**
  - JWT (JSON Web Tokens) with 24-hour expiration
  - HttpOnly, Secure, SameSite=Lax session cookies
  - Passwords hashed with bcrypt (12 salt rounds)
  - Rate limiting & brute-force account locking
  - Cryptographic single-use password reset tokens (SHA-256)
- **Document & Media Storage:**
  - Public marketing media in `/public/uploads/`
  - Confidential buyer specification RFQ files quarantined in `/storage/rfq_uploads/` with admin-only authenticated access
- **Email Integration:** Server-side Nodemailer for RFQ notifications and password reset links

---

## 2. Directory Structure

```
auronovaexports/
├── public/                     # Public static assets, images, logos
│   ├── images/                 # Optimized spice photography & logos
│   ├── robots.txt              # Search engine directives (blocks /admin, /api)
│   └── uploads/                # Public CMS uploaded images
├── storage/                    # Secure non-public storage
│   └── rfq_uploads/            # Buyer RFQ attachments (admin download only)
├── src/
│   ├── components/             # Reusable UI, layout & section components
│   │   ├── admin/              # CMS admin headers, layout, forms, toasts
│   │   ├── layout/             # Header, Footer, Layout wrapper
│   │   ├── sections/           # Hero, Products, Sourcing, Ports, Certifications
│   │   └── ui/                 # Buttons, badges, cookie consent, modals
│   ├── context/                # WebsiteDataContext (CMS dynamic data provider)
│   ├── data/                   # Static data definitions (spices, 18 ports)
│   ├── lib/                    # Core libraries
│   │   ├── auth.js             # Authentication, JWT, bcrypt, rate limiting, reset tokens
│   │   ├── db.js               # MongoDB connection pool & caching
│   │   ├── dataService.js      # Data access layer (Mongo + fallback sync)
│   │   ├── env.js              # Environment validation & site URL helpers
│   │   └── models/             # Mongoose schemas (AdminUser, Product, Enquiry, etc.)
│   ├── pages/                  # Next.js Pages Router
│   │   ├── admin/              # Administrative CMS pages (Login, Dashboard, Products, etc.)
│   │   ├── api/                # Secure server-side API endpoints
│   │   │   ├── admin/          # Protected admin endpoints (requireAdminAuth)
│   │   │   ├── contact.js      # Commercial RFQ form submission endpoint
│   │   │   └── upload.js       # Secure buyer file upload endpoint
│   │   ├── about.jsx           # About Us & Company Roots
│   │   ├── contact.jsx         # Commercial RFQ Quotation Page
│   │   ├── faq.jsx             # Comprehensive B2B Trade FAQ
│   │   ├── index.jsx           # Home Page
│   │   ├── products.jsx        # Complete Product Catalogue
│   │   ├── shipping.jsx        # Incoterms, MOQ, Kerala Ports & Logistics
│   │   ├── sourcing.jsx        # Farm-to-Vessel Quality Framework
│   │   ├── privacy-policy.jsx  # Privacy & Data Handling Policy
│   │   ├── terms.jsx           # Commercial Terms & Conditions
│   │   ├── shipping-policy.jsx # Export Shipping Protocols
│   │   ├── sitemap.jsx         # HTML Sitemap
│   │   └── sitemap.xml.js      # Dynamic XML Sitemap for Search Engines
│   └── styles/
│       └── globals.css         # Global Tailwind styles & Manrope font import
├── .env.example                # Safe environment variable template
├── DEPLOYMENT.md               # Production deployment instructions
├── PRODUCTION_CHECKLIST.md     # Production readiness & QA checklist
├── SECURITY_AUDIT.md           # Security vulnerability audit & hardening details
└── COPYRIGHT_ASSET_REVIEW.md   # Asset provenance and licensing audit
```

---

## 3. Getting Started (Development Mode)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### Step 3: Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public website.

---

## 4. Administrative CMS Portal

- **Login URL:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Initial Setup:** On first boot with a clean database, initial admin provisioning uses credentials specified in your environment variables.
- **Account Settings:** Authenticated administrators can update their handle or change their password via `/admin/settings` after verifying their current password.
- **Password Reset:** If forgotten, administrators can request a single-use time-limited reset link at `/admin/forgot-password`.

---

## 5. Production Build & Deployment

To compile an optimized production build:
```bash
npm run build
npm run start
```
For full deployment instructions on Linux VPS (Ubuntu/Nginx/PM2) or PaaS platforms (Vercel, Netlify), see [DEPLOYMENT.md](file:///e:/Websites/auronovaexports/DEPLOYMENT.md).

---

## 6. Security & Legal Documentation

- [SECURITY_AUDIT.md](file:///e:/Websites/auronovaexports/SECURITY_AUDIT.md) – Detailed remediation matrix covering rate limiting, anti-enumeration, file uploads, and session handling.
- [COPYRIGHT_ASSET_REVIEW.md](file:///e:/Websites/auronovaexports/COPYRIGHT_ASSET_REVIEW.md) – Licensing evaluation of photography, fonts, design assets, and npm packages.
- [PRODUCTION_CHECKLIST.md](file:///e:/Websites/auronovaexports/PRODUCTION_CHECKLIST.md) – Complete pre-launch verification checklist.
