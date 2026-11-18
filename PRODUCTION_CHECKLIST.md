# Auronova Exports Pvt. Ltd. – Production Readiness Checklist

This checklist confirms that the Auronova Exports website and its administrative CMS portal satisfy all operational, security, legal, and QA requirements before public go-live.

---

## 1. Security & Authentication Checklist

- [x] **Zero Hardcoded Credentials:** No admin passwords or emails are hardcoded in frontend components, bundles, or public HTML.
- [x] **Secure Password Hashing:** Passwords hashed with bcrypt (12 salt rounds).
- [x] **Brute-Force Protection:** Rate limiting active on `/api/admin/auth/login` and `/api/admin/auth/forgot-password`; account locks after 5 failed attempts for 15 minutes.
- [x] **Anti-Enumeration Protections:** Generic authentication error messages prevent user enumeration.
- [x] **Admin Account Management:** Authenticated admin can change username and password from `/admin/settings` with current password verification.
- [x] **Forgot Password Workflow:** Single-use, cryptographically generated (32-byte), time-limited (1 hour) SHA-256 hashed token mechanism verified.
- [x] **Session Cookie Security:** HttpOnly, SameSite=Lax, Secure (in production), 24h expiration.
- [x] **Protected Admin Endpoints:** All `/api/admin/*` endpoints enforced with `requireAdminAuth`.
- [x] **Confidential Buyer Document Storage:** RFQ specification uploads stored in non-public `storage/rfq_uploads/` directory; downloads restricted to authenticated administrators.
- [x] **Upload Restrictions:** Strict extension and MIME type whitelist; 10MB limit; executable file types blocked.
- [x] **Path Traversal Mitigations:** Strict `path.basename()` sanitization on file access and deletion.
- [x] **NoSQL Injection Mitigations:** Regex search inputs sanitized against special character injection.
- [x] **Security HTTP Headers:** HSTS, X-Frame-Options (SAMEORIGIN), X-Content-Type-Options (nosniff), Referrer-Policy, Permissions-Policy, removal of `X-Powered-By`.

---

## 2. Business Content, Credibility & Compliance

- [x] **Company Identity:** Registered entity name (Auronova Exports Pvt. Ltd.), Cochin Port Zone address, phone/WhatsApp, and official email verified across Header, Footer, and Contact pages.
- [x] **No Invention of Credentials:** APEDA, Spices Board of India, and FSSAI are displayed only with verified capability tags without inventing statutory registration numbers.
- [x] **COO & Phytosanitary Distinction:** Certificate of Origin and Phytosanitary documentation clearly marked as shipment-specific inspections rather than permanent entity certifications.
- [x] **Prohibited Terms Excluded:** No mentions of custom grades/grading, essential oils, or extraction.
- [x] **Prohibited Certification Claims Excluded:** ASTA, ESA, HACCP, and FDA are NOT claimed as company certifications or memberships.
- [x] **Kerala Port Network:** All 18 ports listed in `src/data/ports.js`; Cochin Seaport (ICTT Vallarpadam) clearly highlighted as the primary international container gateway; non-major ports accurately designated as coastal/heritage without overstating spice cargo handling.
- [x] **Turmeric Sourcing:** Erode, Tamil Nadu, accurately highlighted alongside Alleppey for turmeric sourcing.
- [x] **Catalogue Integrity:** Red Chilli remains prominently featured alongside all 11 core Indian spices.
- [x] **Test Data Cleanup:** Dummy sample inquiries purged; system ready for real commercial RFQ leads.

---

## 3. Legal, Privacy & Policies

- [x] **Privacy Policy (`/privacy-policy`):** Full disclosure of RFQ data collection, specification storage, and buyer confidentiality protocols.
- [x] **Terms & Conditions (`/terms`):** Export trading terms, Incoterms governance (FOB Cochin, CIF, CFR), sample policies, and legal jurisdiction.
- [x] **Export Shipping Policy (`/shipping-policy`):** Container stuffing protocols, documentation dossier, and dispatch timelines from Cochin Port.
- [x] **Cookie Consent Banner:** Functional and persistent cookie notification component active across public pages.
- [x] **Legal Disclaimers:** Clarified that legal policies are subject to final corporate legal counsel review.

---

## 4. Technical QA, Performance & Build

- [x] **Routing & Navigation:** Home, Products, Sourcing & Quality, Shipping & Pricing, About, FAQ, Contact/Quote, and legal pages tested and functional.
- [x] **Search Engine Optimization:** Unique meta titles, descriptions, canonical links, and Open Graph tags on all routes.
- [x] **Robots.txt & Sitemap:** `robots.txt` disallows `/admin`, `/api/`, `/storage/`; dynamic XML sitemap generated at `/sitemap.xml`.
- [x] **Clean Next.js Build:** `npm run build` passes with zero errors; all static pages and SSR endpoints compile cleanly.
- [x] **JavaScript/JSX Only:** Strict adherence to `.js` and `.jsx` without TypeScript files in `src/`.
- [x] **Manrope Typography & Styling:** Premium brand aesthetic and color palette (`#24251F`, `#FAF7F0`, `#D6A441`, `#526747`, `#4A2C20`, `#E8E0D2`) preserved.
- [x] **Responsive Layout:** Responsive across mobile, tablet, and desktop viewports.

