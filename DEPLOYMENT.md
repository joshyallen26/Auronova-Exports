# Auronova Exports Pvt. Ltd. – Production Deployment Guide

This guide details the step-by-step procedures to deploy the Auronova Exports web platform and CMS administrative portal to a live production server.

---

## 1. Prerequisites & Hosting Environment

- **Node.js:** v20.x, v22.x LTS (Recommended: Node 22.x)
- **Database:** MongoDB 6.0+ (Local instance or MongoDB Atlas M0/M10+ Cluster)
- **Operating System:** Ubuntu 22.04 / 24.04 LTS, Debian 12, or managed PaaS (Vercel, Netlify, Railway, Render)
- **Domain & SSL:** Qualified domain name (e.g., `auronovaexports.com`) with active SSL/TLS certificate (Let's Encrypt or Cloudflare)

---

## 2. Environment Configuration

1. In your hosting environment or on the production server, create `.env.local` using `.env.example` as a template:

```bash
cp .env.example .env.local
```

2. Configure required production variables:

```ini
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://www.auronovaexports.com

# Production MongoDB Atlas URI
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/auronovaexports?retryWrites=true&w=majority

# Cryptographically strong 32+ character JWT secret (generate via: openssl rand -base64 32)
JWT_SECRET=c2VjdXJlX3JhbmRvbV9qd3Rfc2VjcmV0X2tleV8yMDI2X2F1cm9ub3Zh

# Initial Administrator Identity (Used on first bootstrap only)
ADMIN_NAME=Auronova Administrator
ADMIN_EMAIL=admin@auronovaexports.com
ADMIN_PASSWORD=ComplexPasswordHere!2026#

# SMTP Server for Enquiries and Password Reset Link Delivery
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@auronovaexports.com
SMTP_PASS=YourSmtpPasswordHere
SMTP_FROM="Auronova Exports Trade Desk" <exports@auronovaexports.com>
COMPANY_EXPORT_EMAIL=exports@auronovaexports.com
```

---

## 3. Deployment Option A: Managed PaaS (Vercel / Netlify)

1. **Repository Import:** Link the Git repository to Vercel or Netlify.
2. **Build Settings:**
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. **Environment Variables:**
   - Enter all variables from `.env.local` in the platform's Environment Variables dashboard.
4. **Deploy:** Trigger production build. Next.js will compile all 36+ static and SSR routes cleanly.

---

## 4. Deployment Option B: Linux Virtual Private Server (VPS / AWS EC2 / DigitalOcean)

### Step 1: Install Node.js and PM2
```bash
# Install Node.js 22 LTS
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 process manager
sudo npm install -g pm2
```

### Step 2: Clone and Build
```bash
git clone <repository_url> /var/www/auronovaexports
cd /var/www/auronovaexports

# Install dependencies
npm ci --only=production=false

# Compile production Next.js build
npm run build
```

### Step 3: Configure Storage Permissions
```bash
# Ensure storage directory for buyer specifications has write permissions
mkdir -p storage/rfq_uploads public/uploads
chmod -R 775 storage public/uploads
```

### Step 4: Start Process with PM2
```bash
# Start Next.js production server on port 3000
pm2 start npm --name "auronovaexports" -- start

# Save PM2 process list to start automatically on system reboot
pm2 save
pm2 startup
```

### Step 5: Nginx Reverse Proxy with HTTPS
Create `/etc/nginx/sites-available/auronovaexports.conf`:

```nginx
server {
    listen 80;
    server_name auronovaexports.com www.auronovaexports.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name auronovaexports.com www.auronovaexports.com;

    ssl_certificate /etc/letsencrypt/live/auronovaexports.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/auronovaexports.com/privkey.pem;

    client_max_body_size 15M;

    # Protect internal and RFQ uploads storage from direct HTTP access
    location ^~ /storage/ {
        deny all;
        return 404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/auronovaexports.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 5. Post-Deployment Verification

1. Open `https://www.auronovaexports.com` and verify the home page and key pages.
2. Visit `https://www.auronovaexports.com/sitemap.xml` and verify valid XML.
3. Visit `https://www.auronovaexports.com/robots.txt` and confirm `/admin` is disallowed.
4. Log into `https://www.auronovaexports.com/admin/login` using your configured production admin credentials.
5. Immediately navigate to **General Settings** (`/admin/settings`) and update your administrator password to a fresh, secure passphrase.
6. Submit a test commercial RFQ quotation through `/contact` and confirm receipt in `/admin/enquiries`.

