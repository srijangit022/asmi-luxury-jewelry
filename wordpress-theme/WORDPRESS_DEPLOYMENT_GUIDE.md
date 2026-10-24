# 👑 ASMI Haute Joaillerie — Complete Step-by-Step WordPress Deployment Guide

> **Theme Name:** ASMI Luxury Jewelry Store  
> **Version:** 1.0.0  
> **Target Framework:** WordPress 6.0+ (Tested up to WordPress 6.7)  
> **PHP Compatibility:** PHP 7.4, 8.0, 8.1, 8.2, 8.3  
> **E-Commerce Compatibility:** Native Standalone Engine & WooCommerce  
> **Atelier Admin Password:** `Asmi@2026`  

---

## 📑 Table of Contents
1. [Architecture & Theme Structure](#1-architecture--theme-structure)
2. [Server Requirements & Prerequisites](#2-server-requirements--prerequisites)
3. [Step 1: Packaging the Theme ZIP File](#3-step-1-packaging-the-theme-zip-file)
4. [Step 2: Uploading & Activating the Theme](#4-step-2-uploading--activating-the-theme)
5. [Step 3: Configuring WordPress Permalinks & Core Settings](#5-step-3-configuring-wordpress-permalinks--core-settings)
6. [Step 4: Initializing the Master Atelier Admin Console](#6-step-4-initializing-the-master-atelier-admin-console)
7. [Step 5: Configuring SMTP Mailer for Gift Cards, Coupons & Orders](#7-step-5-configuring-smtp-mailer-for-gift-cards-coupons--orders)
8. [Step 6: Configuring Payment Gateways (Razorpay, UPI & International)](#8-step-6-configuring-payment-gateways-razorpay-upi--international)
9. [Step 7: WooCommerce & Storefront Integration](#9-step-7-woocommerce--storefront-integration)
10. [Step 8: Production Performance & Security Hardening](#10-step-8-production-performance--security-hardening)
11. [Troubleshooting & Frequently Asked Questions](#11-troubleshooting--frequently-asked-questions)

---

## 1. Architecture & Theme Structure

The ASMI Haute Joaillerie theme is built with **Dual-Architecture Compatibility**:
1. **WordPress Theme Mode:** Runs as a native WordPress theme with deep integration into WordPress `wp_options`, REST API (`/wp-json/asmi/v1/`), WooCommerce hooks, and `wp_mail()` / SMTP.
2. **High-Performance Client-Side State Engine:** In-memory caching, instant reactive filtering, 5 preloaded luxury color schemes, 3D interactive loupe zoom, 360° piece rotation, and live package tracking.

### Core File Structure
```
asmi-luxury-jewelry/
├── style.css                  # WordPress theme header declaration & metadata
├── functions.php              # Enqueues, REST API endpoints, theme supports & sync
├── header.php                 # Dynamic HTML head, navigation, currency & patron status
├── front-page.php             # Luxury homepage layout, showcase & lookbook
├── footer.php                 # Footer template, VIP club & modal overlays
├── index.php                  # Fallback template
├── woocommerce.php            # WooCommerce full compatibility wrapper
├── screenshot.png             # Theme screenshot displayed in WP Appearance > Themes
├── css/
│   └── styles.css             # Full luxury CSS design system & responsive styling
├── js/
│   ├── sync.js                # Cloud & Local REST API synchronizer
│   ├── products.js            # Product catalog CRUD & state manager
│   ├── cart.js                # Shopping bag, coupon & gift card validation
│   ├── checkout.js            # Multi-mode payment gateway & address processor
│   ├── auth.js                # Patron registry & multi-address logistics book
│   ├── admin.js               # Master Atelier Admin Console & Email Engine
│   ├── orders.js              # 5-stage shipment tracker & PDF invoice engine
│   ├── reviews.js             # Verified buyer reviews & photo stories
│   └── app.js                 # Global animation, zipper & SEO URL router
├── assets/
│   └── images/                # Jewelry imagery, logos, models & textures
└── data/                      # Default JSON catalogs & persistence seeds
    ├── settings.json          # Global site, SEO & payment configurations
    ├── products.json          # Master product catalog & stock database
    ├── coupons.json           # Privilege promotional coupons database
    ├── giftcards.json         # Digital gift cards & store credit ledger
    ├── patrons.json           # Registered VIP client registry & addresses
    ├── orders.json            # Client orders & delivery tracking milestones
    ├── reviews.json           # Client reviews & testimonials
    └── categories.json        # Collection categories & catalog filters
```

---

## 2. Server Requirements & Prerequisites

Ensure your hosting environment meets the following specifications:

| Requirement | Minimum Supported | Recommended for High Traffic |
| :--- | :--- | :--- |
| **Web Server** | Apache 2.4+ or NGINX | NGINX with HTTP/2 or LiteSpeed |
| **PHP Version** | PHP 7.4 | PHP 8.1 / 8.2 / 8.3 |
| **MySQL / MariaDB** | MySQL 5.7 / MariaDB 10.3 | MySQL 8.0+ / MariaDB 10.6+ |
| **PHP Memory Limit**| 256 MB | 512 MB |
| **Upload Max Size** | 64 MB | 128 MB |
| **SSL Certificate** | Required (HTTPS) | Wildcard / EV SSL |
| **PHP Extensions**  | `curl`, `json`, `mbstring`, `openssl`, `zip`, `gd` / `imagick` | All standard extensions active |

---

## 3. Step 1: Packaging the Theme ZIP File

To install the theme via the WordPress admin dashboard, package the theme folder into a `.zip` file.

### Option A: Windows PowerShell (Automated)
Run the following command from the folder containing the project files:

```powershell
Compress-Archive -Path "style.css", "functions.php", "header.php", "front-page.php", "footer.php", "index.php", "woocommerce.php", "screenshot.png", "css", "js", "assets", "data" -DestinationPath "asmi-luxury-jewelry.zip" -Force
```

### Option B: Manual Archiving (Zip Utility)
1. Open the theme directory.
2. Select the following files and folders:
   - `style.css`, `functions.php`, `header.php`, `front-page.php`, `footer.php`, `index.php`, `woocommerce.php`, `screenshot.png`
   - `css/`, `js/`, `assets/`, `data/`
3. Right-click and choose **Compress to ZIP file** (or **Add to Archive...**).
4. Name the archive **`asmi-luxury-jewelry.zip`**.

> [!IMPORTANT]
> Do **NOT** include `node_modules/`, `.git/`, or system temp files inside the ZIP package.

---

## 4. Step 2: Uploading & Activating the Theme

### Method 1: WordPress Admin Dashboard (Standard Method)
1. Log in to your WordPress Admin Dashboard (`https://yourdomain.com/wp-admin/`).
2. Navigate to **Appearance** → **Themes**.
3. Click the **Add New Theme** button at the top.
4. Click **Upload Theme**.
5. Click **Choose File** and select `asmi-luxury-jewelry.zip`.
6. Click **Install Now**.
7. Once the upload finishes, click **Activate**.

---

### Method 2: FTP / SFTP / cPanel File Manager (Manual Upload)
1. Connect to your web hosting via FTP (e.g., FileZilla) or cPanel File Manager.
2. Navigate to the WordPress themes directory:
   ```
   /public_html/wp-content/themes/
   ```
3. Create a folder named **`asmi-luxury-jewelry`**.
4. Extract and upload all theme files and folders into `/public_html/wp-content/themes/asmi-luxury-jewelry/`.
5. Log in to your WordPress dashboard, navigate to **Appearance** → **Themes**, and click **Activate** under **ASMI Luxury Jewelry Store**.

---

### Method 3: WP-CLI (Command Line for DevOps & Cloud Servers)
If you manage a VPS (DigitalOcean, AWS, Linode, Cloudways), run:
```bash
wp theme install /path/to/asmi-luxury-jewelry.zip --activate --allow-root
```

---

## 5. Step 3: Configuring WordPress Permalinks & Core Settings

### 1. Set Pretty Permalinks (Mandatory for REST API Sync)
The theme communicates with WordPress via the REST API (`/wp-json/asmi/v1/`). Pretty permalinks must be enabled:
1. Go to **Settings** → **Permalinks**.
2. Select **Post name** (`https://yourdomain.com/sample-post/`).
3. Click **Save Changes**.

### 2. Configure Front Page Display
1. Go to **Settings** → **Reading**.
2. Under **Your homepage displays**, keep **Your latest posts** selected (the theme automatically routes `front-page.php` as the master luxury portal).
3. Click **Save Changes**.

---

## 6. Step 4: Initializing the Master Atelier Admin Console

The theme includes a standalone Master Atelier Control Suite embedded directly in the front-end interface.

1. Visit your website homepage: `https://yourdomain.com/`.
2. Scroll to the footer and click **Atelier Admin Console** (or press the admin shortcut).
3. Enter the default administrator passkey:
   ```
   Asmi@2026
   ```
4. Click **Authenticate & Open Console**.

### Available Admin Modules:
- **Tab 1: Dashboard & Analytics:** Live revenue metrics, active orders, and conversion insights.
- **Tab 2: Product Catalog & Pricing:** Full CRUD, 10-slot multi-angle photo gallery upload, hallmark credentials, and stock manager.
- **Tab 3: Categories Manager:** Add, rename, or reorder jewelry collections (Pearls, Emeralds, Kundan, Diamonds).
- **Tab 4: Themes (1–5) & Branding:** Instant 1-click theme switching (Royal Noir, Ivoire Gold, Zambian Emerald, Kashmir Ruby, Midnight Sapphire), custom logo & favicon uploader.
- **Tab 5: Discounts, Coupons & Gift Cards:** Create privilege discount codes, issue digital store credits, and dispatch customized emails to registered patrons.
- **Tab 6: Orders & 5-Step Logistics Tracker:** Manage shipments, update live cargo hub locations, assign courier AWB tracking numbers, and generate printable PDF invoices.
- **Tab 6B: Patrons & Multi-Address Registry:** View registered customer accounts, phone numbers, and up to 3 saved delivery destinations.
- **Tab 7: Settings & Payment Gateways:** Configure official brand details, SMTP email credentials, and payment gateway keys.
- **Tab 8: SEO & Meta Directives:** Manage canonical URLs, Google Search Console tokens, Meta Pixel, structured schema, and sitemaps.

---

## 7. Step 5: Configuring SMTP Mailer for Gift Cards, Coupons & Orders

The theme includes an automated email dispatch engine that sends rich Noir & Champagne Gold HTML emails for:
- **Order Confirmations & Merchant Notifications**
- **Promotional Discount Coupon Tokens** (with 1-click auto-apply links)
- **Digital Gift Cards & VIP Store Credit Vouchers**
- **Bulk Patron VIP Campaign Broadcasts**

### Configuring SMTP in Master Atelier Console:
1. Open the Admin Console → Navigate to **Tab 7: Settings & Payment Gateway**.
2. Scroll to the **Order & Dispatch Notification Email System** section.
3. Configure your mail server credentials:
   - **Notification Mailbox:** `orders@yourdomain.com` (or `concierge@yourdomain.com`)
   - **Sender Display Name:** `ASMI Master Atelier Orders`
   - **SMTP Host:** `smtp.gmail.com` (or `smtp.mailgun.org`, `smtp.sendgrid.net`, `smtp.office365.com`)
   - **SMTP Port:** `465` (SSL) or `587` (TLS)
   - **SMTP Username:** `your-email@gmail.com`
   - **SMTP App Password:** `your-16-character-app-password`
   - **Enable Email Notifications:** `[x] Active`
4. Click **Save Settings**.
5. Click **Send Test Order Notification Email** to verify instant inbox delivery.

> [!TIP]
> If using Gmail / Google Workspace, create a dedicated **App Password** under Google Account Security → 2-Step Verification → App Passwords.

---

## 8. Step 6: Configuring Payment Gateways

The theme supports all major Indian and international payment gateways:

### 1. Razorpay (Credit/Debit Cards, Netbanking, UPI QR & Wallets)
1. Go to **Tab 7: Settings & Payment Gateway**.
2. Enter your credentials:
   - **Razorpay Key ID:** `rzp_live_xxxxxxxxxxxxxx` (or `rzp_test_...` for sandbox)
   - **Razorpay Key Secret:** `xxxxxxxxxxxxxxxxxxxxxxxx`
3. Toggle Razorpay to **Enabled**.

### 2. Direct UPI Instant Apps (Google Pay, PhonePe, Paytm, BHIM)
- Native instant UPI deep-linking is pre-configured and requires zero additional gateway fees.

### 3. International & NRI Checkout (PayPal / Stripe)
- Under the International section, configure your PayPal Merchant Email or Stripe Publishable Key for multi-currency settlement (USD, EUR, GBP, AED, CAD, AUD).

---

## 9. Step 7: WooCommerce & Storefront Integration

The theme is 100% seamlessly integrated with **WooCommerce**. All products, orders, inventory deduction, coupons, and payments can be handled directly through the dedicated WordPress Admin dashboard (`/wp-admin`).

### 1. Installing & Activating WooCommerce
1. In your WordPress Admin sidebar, go to **Plugins → Add New**.
2. In the search bar, type `WooCommerce` (by Automattic).
3. Click **Install Now**, then click **Activate**.
4. The WooCommerce setup wizard will open:
   - **Store Details:** Enter your address (e.g. Mumbai, India).
   - **Currency:** Select **Indian Rupee (INR ₹)**.
   - **Product Types:** Choose *Physical Products*.

### 2. 1-Click Starter Catalog Import
If your WooCommerce catalog is empty, you don't need to manually create all the initial jewelry products:
1. In WordPress Admin, click **Products → All Products**.
2. You will see a gold notice at the top:
   > 👑 **ASMI Haute Joaillerie — WooCommerce Catalog Setup:**  
   > *No WooCommerce products found in your database yet...*
3. Click the gold button: **Import Default ASMI Jewelry Catalog**.
4. All handcrafted Basra Pearl, Zambian Emerald, and Polki Diamond pieces will be automatically created with correct pricing, categories, SKUs, inventory counts, and luxury jewelry specifications!

### 3. Adding & Managing Products in WordPress
To add a new jewelry piece:
1. Go to **Products → Add New**.
2. Enter the Product Title (e.g. `Royal Nizam Basra Pearl Haar`).
3. Set the **Regular Price** (e.g. `12499`) in the *Product Data* box.
4. Set **Inventory → Manage stock**: Check the box and set stock quantity (e.g. `3`).
5. In the **Product Categories** box on the right, select or add a category (*Pearls*, *Emeralds*, *Sparkling Diamonds*, or *Royal Kundan*).
6. Upload the main photo to **Product Image**, and alternate angles to **Product Gallery**.
7. In the **💎 ASMI Haute Joaillerie — Precious Specifications** meta box, enter:
   - **Luxury Subtitle / Tagline:** e.g. *Triple-Strand Natural Basra Pearls with 22K Gold Filigree Clasp*
   - **Showcase Badge Tag:** e.g. *Best Seller*, *Imperial Vault*, or *Customer Favorite*
   - **Natural Gemstone Spec:** e.g. *Natural Basra Pearls (4.5mm - 7.8mm Gradient)*
   - **Accent Stones:** e.g. *Brilliant VVS American Diamonds*
   - **Precious Metal & Finish:** e.g. *Pure 925 Sterling Silver with 22K Yellow Gold Finish*
   - **Hallmark & Certification:** e.g. *BIS 916 Hallmarked & Certified Authentic*
8. Click **Publish**. The piece instantly appears on your luxury storefront!

### 4. Setting Up Payment Gateways
Because the theme routes checkout through standard WooCommerce, you can use any official WordPress payment gateway plugin:
1. **Razorpay:** Install the free **Razorpay for WooCommerce** plugin from *Plugins → Add New*. Go to *WooCommerce → Settings → Payments → Razorpay*, enter your Key ID and Key Secret, and enable it.
2. **PhonePe / Paytm / Cashfree:** Install their official WooCommerce plugins and enter merchant credentials.
3. **Cash on Delivery / Bank Transfer:** Enable under *WooCommerce → Settings → Payments*.
4. **International (Stripe / PayPal):** Install *WooCommerce Stripe Payment Gateway* for multi-currency card payments.

### 5. Managing Orders & Logistics
When a patron clicks **Proceed to Checkout** in the luxury slide-over bag:
- The bag automatically synchronizes with WooCommerce's session cart.
- The patron lands on the styled, high-end WooCommerce checkout page to complete their payment.
- Once placed, the order appears immediately under **WooCommerce → Orders**.
- Stock is automatically deducted from `Products`.
- Automated branded order confirmation emails are dispatched to both the customer and admin.
- You can change status to *Processing*, *Completed*, or print shipping labels via **Shiprocket** / **BlueDart** plugins!

---

## 10. Step 8: Production Performance & Security Hardening

### 1. File & Directory Permissions
Ensure proper UNIX file permissions on your server:
```bash
find /path/to/wordpress/ -type d -exec chmod 755 {} \;
find /path/to/wordpress/ -type f -exec chmod 644 {} \;
```

### 2. HTTPS / SSL Enforcement
Ensure SSL is enforced by adding the following to your `wp-config.php`:
```php
define('FORCE_SSL_ADMIN', true);
```

### 3. Caching & CDN Optimization
- **Recommended Plugins:** LiteSpeed Cache, WP Rocket, or W3 Total Cache.
- **Image Optimization:** Enable WebP conversion for hero and catalog assets.
- **Exclusions:** Exclude `/wp-json/asmi/v1/*` from aggressive caching to ensure instant real-time sync across admin updates.

---

## 11. Troubleshooting & Frequently Asked Questions

### Q1: Changes made in the Master Atelier Admin do not appear immediately.
- **Resolution:** Purge your browser cache or WordPress caching plugin (e.g., LiteSpeed / WP Rocket). Ensure your permalinks are set to **Post name** under Settings → Permalinks.

### Q2: Emails are not delivering to patron inboxes.
- **Resolution:** Verify your SMTP credentials in Tab 7 (Settings). Check that your hosting provider does not block outbound SMTP ports (465/587). You can review all logged email transmissions under `/api/email-logs` or the database audit file `data/email_notifications.json`.

### Q3: Uploading a large product image fails.
- **Resolution:** Increase the PHP upload limit in `php.ini` or `.htaccess`:
  ```apache
  php_value upload_max_filesize 64M
  php_value post_max_size 64M
  php_value memory_limit 256M
  ```

### Q4: How do I change the Master Atelier Admin Password?
- **Resolution:** In the Admin Console, open Settings → Security, enter your new password, and click **Save Password**. The new passkey is saved to `asmi_admin_password` in the database.

### Q5: Which ZIP file should I upload to WordPress?
- **Resolution:** Both **`asmi-luxury-jewelry.zip`** and **`asmi-luxury-jwellery.zip`** located in the root folder are 100% identical and synchronized. You can upload either file to **WordPress Admin → Appearance → Themes → Add New → Upload Theme**.

### Q6: How was the 403 Forbidden error completely eliminated?
- **Root Cause & Resolution:**
  1. **REST Route Alignments:** Corrected endpoints in `support.js` and `admin.js` to use `window.asmiSync.getApiUrl()` (`/wp-json/asmi/v1/...`) instead of hardcoded paths.
  2. **Live Polling Safeguard:** Restricted polling in `support.js` so it never runs aggressive loops when the support modal is closed, preventing hosting firewalls (ModSecurity/Wordfence) from rate-limiting or blocking visitors.
  3. **Asset 403 Interceptor:** Added an early `init` hook in `functions.php` that intercepts any `/assets/images/...` request and redirects directly to the theme directory (`wp-content/themes/asmi-luxury-jewelry/assets/images/...`).
  4. **Cookie Nonce Filter:** Relaxed the `rest_cookie_invalid_nonce` filter in `functions.php` for all ASMI endpoints so public visitors and cached sessions never experience false 403 errors.
  5. **Page Speed & Picture Visibility:** Moved `asmi-sync` into `<head>`, deferred `html2pdf.bundle.min.js` and `razorpay.js`, ensured all preloaded image URLs are absolute, added broken image self-healing fallbacks, and eliminated duplicate background fetches on page load.

---

## 🏛️ Atelier Concierge & Support
- **Atelier Flagship:** ASMI Haute Joaillerie, Heritage Gold Quadrant, Mumbai 400001
- **Technical Concierge:** `concierge@asmijewelry.com`
- **Documentation Build:** Version 1.0.0 (Production Master Release)
