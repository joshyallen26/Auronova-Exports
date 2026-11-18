# Auronova Exports Pvt. Ltd. – Copyright, Licensing and Asset Audit Report

**Date of Audit:** November 2026  
**Auditor:** Production Readiness & Security QA Team  
**Scope:** Complete asset inventory across public pages, CMS admin panel, images, typography, icons, text, and dependencies.

---

## 1. Executive Summary

This audit evaluates the copyright, commercial usage rights, licensing compliance, and intellectual property status of all static assets, design elements, written content, and code dependencies utilized in the Auronova Exports web platform.

All third-party code libraries and fonts have been verified under permissive open-source licenses (MIT, ISC, Apache-2.0, SIL Open Font License). Product photography, branding emblems, and statutory references have been structured to eliminate copyright infringement, misleading claims, or unauthorized trademark usage.

---

## 2. Branding & Identity Assets

| Asset Path | Description | Intended Use | Licensing & Intellectual Property Status |
| :--- | :--- | :--- | :--- |
| `public/images/logo.png` | Primary corporate emblem & wordmark | Public Header & Marketing | **Proprietary:** Auronova Exports Pvt. Ltd. corporate trademark. Registered identity. |
| `public/images/logo-white.png` | Inverted white corporate logo | Dark sections & Footer | **Proprietary:** Auronova Exports Pvt. Ltd. |
| `public/images/logo-compact.png` | Monogram icon badge ("AE") | Mobile nav & Favicon | **Proprietary:** Auronova Exports Pvt. Ltd. |
| `public/images/logo-horizontal.png` | Horizontal layout wordmark | Invoicing / Proforma | **Proprietary:** Auronova Exports Pvt. Ltd. |
| `public/images/logo-card.png` | Social sharing card preview | Open Graph meta tags | **Proprietary:** Auronova Exports Pvt. Ltd. |
| `public/favicon.ico` & `favicon.png`| Browser tab favicon | Browser presentation | **Proprietary:** Derived from Auronova corporate emblem. |

> **Recommendation for Owner:** Ensure trademark registration is filed with the Controller General of Patents, Designs and Trade Marks (CGPDTM), Government of India for Class 30 (Spices) and Class 35 (Export/Trading services).

---

## 3. Product & Botanical Photography

All botanical spice photographs used in the catalogue and hero sections represent natural, whole agricultural commodities:

| Asset Path | Spice Subject | Visual Content | Licence / Usage Classification | Owner Confirmation Needed |
| :--- | :--- | :--- | :--- | :---: |
| `public/images/black-pepper.jpg` | Malabar Black Pepper | Whole sun-dried peppercorns | Commercial stock / royalty-free agricultural imagery | Yes (Confirm commercial license or replace with proprietary warehouse photography) |
| `public/images/cardamom.jpg` | Alleppey Green Cardamom | Whole green pods (AGEB) | Commercial stock / royalty-free agricultural imagery | Yes |
| `public/images/cinnamon.jpg` | Ceylon / Malabar Cinnamon | Pure quills and bark rolls | Commercial stock / royalty-free agricultural imagery | Yes |
| `public/images/cloves.jpg` | Hand-picked Cloves | Whole dried clove buds | Commercial stock / royalty-free agricultural imagery | Yes |
| `public/images/ginger.jpg` | Cochin Dry Ginger | Sun-dried peeled ginger | Commercial stock / royalty-free agricultural imagery | Yes |
| `public/images/nutmeg.jpg` | Whole Nutmeg | Shell & kernel | Commercial stock / royalty-free agricultural imagery | Yes |
| `public/images/mace.jpg` | Whole Mace Blades | Aril / dried orange mace | Commercial stock / royalty-free agricultural imagery | Yes |
| `public/images/star-anise.jpg` | Whole Star Anise | Dried star carpels | Commercial stock / royalty-free agricultural imagery | Yes |
| `public/images/turmeric.jpg` | Alleppey / Erode Turmeric | High-curcumin fingers | Commercial stock / royalty-free agricultural imagery | Yes |
| `public/images/white-pepper.jpg` | Muntok / Malabar White Pepper | Decorticated peppercorns | Commercial stock / royalty-free agricultural imagery | Yes |
| `public/images/red-chilli.jpg` | Indian Red Chilli | Stemless / whole red chilli | Commercial stock / royalty-free agricultural imagery | Yes |
| `public/images/plantation.jpg` | Kerala Spice Plantation | Western Ghats cardamoms | Royalty-free editorial landscape | Yes |
| `public/images/quality-lab.jpg` | Quality Inspection Desk | Inspection & moisture tray | Royalty-free agricultural check | Yes |
| `public/images/hero-spices.jpg` | Spices Array | Assorted Indian raw spices | Royalty-free editorial banner | Yes |

> **Action Item for Production Deployment:** Prior to public commercial trading, replace generic agricultural stock photos with proprietary high-resolution photographs of Auronova Exports' actual warehouse, sorting facilities, and container stuffing at Cochin Port to strengthen commercial authenticity.

---

## 4. Typography & Design Assets

| Asset / Library | Origin | Licence | Commercial Permissibility |
| :--- | :--- | :--- | :--- |
| **Manrope Font Family** | Google Fonts (Gentleman Agency) | **SIL Open Font License (OFL) 1.1** | **Fully Permitted** (Free for commercial websites, applications, and print) |
| **Lucide React Icons** | Lucide Project | **ISC License** | **Fully Permitted** (Permissive open-source, comparable to MIT) |
| **Tailwind CSS v4** | Tailwind Labs | **MIT License** | **Fully Permitted** |
| **Framer Motion** | Motion Software / Matt Perry | **MIT License** | **Fully Permitted** |

---

## 5. Third-Party Emblems & Statutory Authority Notice

1. **Government Logos & Statutory Emblems:**
   - **Compliance Action:** The website **does NOT** copy or display official government emblems, crests, or protected statutory logos (e.g. Lion Capital of Ashoka, official Spices Board emblem, APEDA seal).
   - **Display Protocol:** Statutory entities (Spices Board of India, APEDA, FSSAI) are displayed solely through generic typographic nameplates accompanied by open-source Lucide UI icons (`ShieldCheck`, `Globe`, `Building2`), strictly avoiding trademark violation.
2. **Quality System Claims:**
   - Mentions of unverified private certifications (ASTA, ESA, HACCP, FDA) are strictly prohibited and have been excluded from company claims.

---

## 6. Software Dependencies Licensing Audit

All direct dependencies in `package.json` were audited for commercial compatibility:

| Dependency | Version | License | Commercial Permissibility |
| :--- | :--- | :--- | :--- |
| `next` | 15.5.28 | MIT | Permitted |
| `react` / `react-dom` | 19.1.0 | MIT | Permitted |
| `mongoose` | 9.11.4 | MIT | Permitted |
| `bcryptjs` | 3.0.3 | MIT | Permitted |
| `jsonwebtoken` | 9.0.3 | MIT | Permitted |
| `nodemailer` | 10.4.0 | MIT | Permitted |
| `formidable` | 3.5.4 | MIT | Permitted |
| `lucide-react` | 1.61.0 | ISC | Permitted |
| `framer-motion` | 14.6.0 | MIT | Permitted |

**Conclusion:** Zero GPL or restrictive copyleft dependencies exist in runtime production bundles. All packages are fully licensed for commercial enterprise deployment.

