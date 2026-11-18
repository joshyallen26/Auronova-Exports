# Auronova Exports Pvt. Ltd. – Comprehensive Security Audit & Hardening Report

**Audit Date:** November 2026  
**Status:** Remediated & Production Hardened  
**Target Environment:** Next.js 15 Pages Router, Node.js v22, MongoDB & Mongoose  

---

## 1. Executive Summary

A comprehensive, zero-trust security audit and vulnerability assessment was performed across the Auronova Exports web application and its CMS administrative portal. All critical, high, and medium-severity findings have been actively remediated and tested. The application now implements defense-in-depth security principles across authentication, session management, file uploads, database operations, and HTTP network headers.

---

## 2. Vulnerability Assessment & Remediation Matrix

| ID | Category | Severity | Issue Identified | Remediation Action Taken | Verification Status |
| :--- | :--- | :---: | :--- | :--- | :---: |
| **SEC-01** | Authentication | **CRITICAL** | Hardcoded default admin credentials displayed in frontend login form (`useState` and UI assist box). | Removed pre-filled credentials completely; eliminated credentials display box; converted inputs to unpopulated state. | **RESOLVED** |
| **SEC-02** | Authentication | **CRITICAL** | Hardcoded JWT secret fallback and plain-text credentials fallback in server code. | Replaced with dynamic environment variable enforcement; ephemeral random cryptographic secret generated if unset; removed plain-text check. | **RESOLVED** |
| **SEC-03** | Brute Force | **HIGH** | No rate limiting on `/api/admin/auth/login` or password reset endpoints. | Added sliding-window rate limiter; tracks IP & email; locks accounts after 5 consecutive failures for 15 minutes. | **RESOLVED** |
| **SEC-04** | User Enumeration | **MEDIUM** | Informative error messages indicating whether email or password was invalid. | Unified authentication failure responses to generic message: *"Invalid email or password. Please verify your credentials."* | **RESOLVED** |
| **SEC-05** | Account Security | **HIGH** | Missing Forgot Password / Reset Password workflow; simulated account update. | Built cryptographically secure, single-use, 60-minute SHA-256 token reset workflow; implemented live account settings with mandatory current password verification. | **RESOLVED** |
| **SEC-06** | File Storage | **HIGH** | Buyer RFQ specification documents were stored directly in `public/uploads/`, allowing unauthenticated public inspection. | Relocated RFQ uploads to `storage/rfq_uploads/` outside public web root; created protected `/api/admin/enquiries/file` endpoint requiring admin authentication. | **RESOLVED** |
| **SEC-07** | Path Traversal | **HIGH** | Deletion in `/api/admin/media` and file serving did not sanitize incoming filenames against `../` path traversal. | Applied `path.basename()` sanitization and strict directory boundary containment validation. | **RESOLVED** |
| **SEC-08** | File Upload Security | **HIGH** | File upload endpoint validated MIME type only, vulnerable to extension spoofing. | Implemented strict whitelist validation for both MIME type and file extension (`.pdf`, `.docx`, `.xlsx`, `.csv`, `.txt`, `.jpg`, `.png`, `.webp`); rejected all executable scripts. | **RESOLVED** |
| **SEC-09** | Injection | **MEDIUM** | Unsanitized search inputs in `getEnquiries` allowed regex character injection in Mongo queries. | Implemented regex character escaping (`replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")`) before constructing query filters. | **RESOLVED** |
| **SEC-10** | HTTP Headers | **MEDIUM** | Missing modern HTTP security headers and Next.js version banner exposed in responses. | Configured HSTS (`max-age=63072000`), `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, and disabled `poweredByHeader`. | **RESOLVED** |
| **SEC-11** | SEO / Privacy | **MEDIUM** | Search engines could index administrative pages and upload directories. | Generated `public/robots.txt` explicitly disallowing `/admin`, `/api/`, and `/storage/`; generated dynamic XML sitemap excluding admin routes. | **RESOLVED** |
| **SEC-12** | Spam / Flooding | **LOW** | Potential for duplicate RFQ quote submissions from repeated button clicks. | Added in-memory duplicate submission cache (30-second deduplication per email + payload signature) and honeypot field. | **RESOLVED** |

---

## 3. Detailed Component Hardening

### 3.1 Authentication & Password Storage
- **Algorithm:** Password hashing utilizes **bcrypt** with **12 salt rounds**.
- **Password Policy:** Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 numeric digit, and 1 special symbol.
- **Session Tokens:** JSON Web Tokens (JWT) signed with 256-bit secret, set to expire in **24 hours**.
- **Cookies:** Cookie configuration enforced:
  - `HttpOnly`: true (mitigates XSS token theft)
  - `SameSite`: Lax (CSRF mitigation)
  - `Secure`: true in production (enforces HTTPS transmission)

### 3.2 Forgot Password Architecture
```
[Admin Request] -> /api/admin/auth/forgot-password -> (Rate Limit Check)
                                                   -> (Lookup Email)
                                                   -> Generic 200 OK Response
                                                   -> Generate 32-byte crypto token
                                                   -> Store SHA-256 hash in DB (1h expiry)
                                                   -> Dispatch reset link via SMTP
[Admin Click]   -> /admin/reset-password?token=... -> Validates strength & match
                                                   -> Hashes new password (bcrypt 12)
                                                   -> Invalidates token & sessions
```

### 3.3 Data Storage & Confidentiality
- Buyer files containing proprietary price bids or chemical formulations are quarantined in `storage/rfq_uploads/` with zero direct HTTP accessibility.
- Access requires a valid Bearer token or HttpOnly cookie through `/api/admin/enquiries/file`.

---

## 4. Production Security Checklist

- [x] All default passwords removed from public code.
- [x] Environment variables excluded from Git (`.gitignore` verified).
- [x] Secure password reset token generation using `crypto.randomBytes(32)`.
- [x] Single-use token invalidation verified.
- [x] Rate limiting active on all authentication endpoints.
- [x] Path traversal protections verified on file handling.
- [x] Security headers active in `next.config.mjs`.
- [x] Robots.txt blocks administrative crawling.
- [x] NoSQL injection sanitization active.

