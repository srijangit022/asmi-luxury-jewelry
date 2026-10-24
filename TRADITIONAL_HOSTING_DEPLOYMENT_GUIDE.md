# ASMI Luxury Haute Joaillerie — Traditional Web Hosting Deployment Guide

This guide explains how to deploy the standalone **ASMI Haute Joaillerie Luxury E-Commerce Website** with its built-in **Master Atelier Administration Console** to any traditional web hosting provider (cPanel, LiteSpeed, Apache, Nginx, or VPS).

---

## 💎 What Has Been Done & Configured

1. **WordPress Configurations Cleared from Root**:
   - All WordPress theme files (`functions.php`, `header.php`, `footer.php`, `front-page.php`, `woocommerce.php`, `index.php`, etc.) have been safely removed from the root directory and archived into `wordpress-theme/`.
   - The root directory now contains strictly clean, production-ready traditional hosting files with `index.html` as the primary entry point.

2. **Master Atelier Administration Console**:
   - The native **ASMI Atelier Console** is restored as the full, dedicated backend admin control panel.
   - Access it directly from the storefront footer by clicking **"Atelier Admin Console"** (or by opening `index.html` and clicking the gold lock icon).
   - **Default Admin Passkey**: `Asmi@2026`
   - Includes all 12 operational modules:
     - 📊 **Dashboard & Metrics** (Gross revenue, live inventory, orders counter)
     - 💎 **Product Catalog & Pricing** (Add/edit gemstones, metals, prices in INR/USD, stocks, SKUs)
     - 📁 **Categories Manager** (Pearls, Emeralds, Diamonds, Heirlooms)
     - 🎨 **Themes (1-5) & Branding** (Noir Gold, Ivory Silk, Emerald Palace, Rose Velvet, Midnight Sapphire)
     - 🎟️ **Coupons & Gift Cards** (Discount codes, digital gift card issuance)
     - 🚚 **Orders & Logistics** (5-Stage tracking timeline: Confirmed ➔ Hallmark ➔ Boxed ➔ In Transit ➔ Delivered)
     - 👥 **Patrons & Address Book** (Client details with up to 3 delivery addresses)
     - ⭐ **Client Reviews & Stories** (5-star ratings, testimonials, high-res patron photo lightbox)
     - ⚙️ **Store Settings & Payment Gateways** (Razorpay, UPI, PhonePe, Google Pay, COD, contact details)
     - 💬 **Customer Support & Live Chats** (Live client chat desk with audio chimes)
     - 🌐 **SEO & Meta Settings** (Google SERP preview, Open Graph, Twitter Cards, Schema.org)
     - ✨ **Hero Showcase & Section Customizer** (Live visual preview editor)

3. **Elimination of 403 Forbidden & 408 Request Time-Out Errors**:
   - `.htaccess` configured with LiteSpeed `E=noabort:1,E=noconntimeout:1` directives to prevent connection drops.
   - `DirectoryIndex index.html index.php` explicitly configured so Apache/LiteSpeed serves `index.html` instantly.
   - Zero hardcoded URLs or broken `/wp-content/themes/` paths; all assets load directly from `assets/images/`.

---

## 🚀 Deployment Options

### Option 1: Traditional Shared Hosting (cPanel / Apache / LiteSpeed) — Recommended

> **No Node.js setup needed!** The included `api.php` and `.htaccess` handle all database persistence directly into `data/*.json` files.

1. **Log in to cPanel** on your hosting account (e.g. `apnanursery.com` or your domain).
2. Open **File Manager** and navigate to your web root (usually `public_html/` or your subdomain folder).
3. **Upload** the archive:
   - File: `asmi-luxury-jewelry-traditional-hosting.zip`
4. **Extract** the zip file directly inside `public_html/`.
5. Ensure the extracted files sit directly inside `public_html/`:
   ```text
   public_html/
   ├── index.html
   ├── .htaccess
   ├── api.php
   ├── server.js
   ├── package.json
   ├── assets/
   ├── css/
   ├── js/
   └── data/
   ```
6. **Set File Permissions**:
   - Ensure the `data/` folder and `assets/images/` folder have **755** (or write) permissions so admin updates and image uploads can be saved.
7. **Visit your website** in your browser (`https://yourdomain.com`). It will load instantly!

---

### Option 2: Node.js Hosting (cPanel Node.js Selector, VPS, Render, Railway, DigitalOcean)

If your host supports Node.js:

1. Upload the project files to your server directory.
2. In your terminal or cPanel Node.js App interface:
   ```bash
   npm start
   ```
3. The server starts on port `8000` (or the port defined by `process.env.PORT`):
   ```text
   ✨ ASMI Luxury Haute Joaillerie Server is Live!
   🌐 URL: http://localhost:8000/
   💾 JSON Database: ./data
   ```

---

### Option 3: Pure Static Hosting (Netlify, Vercel, Cloudflare Pages, GitHub Pages)

1. Upload the files to your repository or static host.
2. The storefront and Master Atelier Console work out of the box with automatic `localStorage` database sync across all browser sessions.

---

## 🔑 Master Atelier Admin Console Access

| Feature | Detail |
| :--- | :--- |
| **Admin Trigger** | Click **"Atelier Admin Console"** at the bottom right of the footer |
| **Passkey** | `Asmi@2026` |
| **Change Passkey** | Open Admin Console ➔ Tab 8 (Settings) ➔ Security & Passkeys |
| **Live Sync** | Changes save to `data/*.json` and browser storage automatically |

---

## 🛠️ Verification Checklist

- [x] `index.html` loads cleanly with zero 403 or 408 errors.
- [x] All images and jewels display with 100% visibility.
- [x] Shopping Bag drawer, Wishlist, and Multi-Currency switcher (INR ₹ / USD $) work seamlessly.
- [x] Master Atelier Admin Console opens and saves products, pricing, and themes.
- [x] Customer Support live chat desk functions with instant audio chime.
- [x] Checkout modal generates tracking IDs, invoices, and cancellation workflows.
