# 🏛️ ASMI Haute Joaillerie — Complete Production Deployment & GitHub Version Control Guide

> **Document Type:** Production Architecture & Deployment Standard  
> **Platform Version:** 2.0.0 (Haute Joaillerie Universal Edition)  
> **Repository Root:** `c:\Asmi 2`  
> **Version Control:** Git & GitHub  
> **Target Production Environments:** Traditional cPanel / LiteSpeed / Apache, Node.js VPS / Cloud (Render/Railway), and WordPress / WooCommerce  

---

## 📑 Table of Contents
1. [Architecture & Which Folder Goes to Production?](#1-architecture--which-folder-goes-to-production)
2. [Step-by-Step: Setting Up GitHub Version Control](#2-step-by-step-setting-up-github-version-control)
3. [Automated cPanel Deployment via GitHub (Zero-Touch CI/CD)](#3-automated-cpanel-deployment-via-github-zero-touch-cicd)
4. [Deployment Method A: Traditional Shared Hosting (cPanel / Apache / LiteSpeed)](#4-deployment-method-a-traditional-shared-hosting-cpanel--apache--litespeed)
5. [Deployment Method B: Node.js Cloud / VPS (Render, Railway, Ubuntu + PM2)](#5-deployment-method-b-nodejs-cloud--vps-render-railway-ubuntu--pm2)
6. [Deployment Method C: WordPress + WooCommerce Theme Production](#6-deployment-method-c-wordpress--woocommerce-theme-production)
7. [Production Data Persistence & Git Best Practices](#7-production-data-persistence--git-best-practices)
8. [Final Pre-Flight Production Checklist](#8-final-pre-flight-production-checklist)

---

## 1. Architecture & Which Folder Goes to Production?

The workspace at `c:\Asmi 2` is organized as a **Universal E-Commerce Monorepo**. Depending on where you are deploying, choose the exact deployment target below:

```
c:\Asmi 2/                         <-- GITHUB REPOSITORY ROOT (Track this entire folder in Git)
├── index.html                     <-- Production Storefront Entry Point (Standalone / cPanel / Node)
├── admin.html                     <-- Production Master Atelier Admin Suite (12 Modules)
├── server.js                      <-- Production Node.js Server & REST API Engine
├── api.php                        <-- Alternative PHP REST API Engine (For Shared cPanel without Node)
├── .htaccess                      <-- LiteSpeed / Apache Routing & 408/403 Timeout Preventer
├── package.json                   <-- Node dependencies (Nodemailer, etc.)
├── .gitignore                     <-- Git ignore rules for production hygiene
├── .cpanel.yml                    <-- Automated cPanel Git deployment script
├── assets/                        <-- High-resolution jewelry photography & brand imagery
├── css/                           <-- Haute Joaillerie Luxury CSS Design System (styles.css)
├── js/                            <-- Client e-commerce runtime (sync, cart, checkout, admin, etc.)
├── data/                          <-- JSON Database (settings, products, orders, reviews, patrons)
│
├── wordpress-theme/               <-- WORDPRESS THEME SOURCE (Use only for WordPress installations)
│   ├── style.css                  <-- WP Theme declaration
│   ├── functions.php              <-- WP REST API & WooCommerce hooks
│   ├── front-page.php             <-- WP Homepage template
│   ├── header.php & footer.php    <-- WP Nav & Footer templates
│   └── build-theme-zip.ps1        <-- Theme bundler script
│
└── asmi-luxury-jewelry.zip        <-- Compiled WordPress theme package (Install via WP Admin)
```

### 🎯 Production Target Matrix

| Production Destination | Which Files / Folder to Deploy? | Deployment Package / Method | Entry Point |
| :--- | :--- | :--- | :--- |
| **Traditional cPanel / Apache / LiteSpeed Shared Hosting** | The **root files** (`index.html`, `admin.html`, `api.php`, `.htaccess`, `assets/`, `css/`, `js/`, `data/`) | Upload `asmi-luxury-jewelry-traditional-hosting.zip` OR deploy via **cPanel Git Version Control** | `https://yourdomain.com/index.html` |
| **Node.js Cloud Hosting (Render, Railway, Heroku, VPS)** | The **entire root repository** (`server.js`, `package.json`, `index.html`, `admin.html`, `assets/`, `css/`, `js/`, `data/`) | Connect GitHub repository directly for continuous deployment | `server.js` (Port `8000` or `process.env.PORT`) |
| **WordPress + WooCommerce Hosting** | The **compiled theme ZIP** (`asmi-luxury-jewelry.zip`) | Upload via **WordPress Admin ➔ Appearance ➔ Themes ➔ Add New ➔ Upload Theme** | WordPress Homepage (`front-page.php`) |

> [!IMPORTANT]
> **For GitHub Version Control:** You push the **entire `c:\Asmi 2` folder** to your GitHub repository. It holds all your code, design assets, and WordPress theme sources in one place.

---

## 2. Step-by-Step: Setting Up GitHub Version Control

Follow these exact steps from your Windows PowerShell or Command Prompt to initialize and push your repository to GitHub.

### Step 2.1: Verify Git Installation
Make sure Git is available in your shell:
```powershell
git --version
```
*(Should return `git version 2.x.x`)*

### Step 2.2: Create a New Repository on GitHub
1. Open your browser and go to [GitHub.com](https://github.com/new).
2. Log into your account and click the **+** icon in the top right ➔ **New repository**.
3. Fill in the repository details:
   - **Repository name:** `asmi-luxury-jewelry` (or your preferred name)
   - **Description:** `ASMI Haute Joaillerie Luxury E-Commerce Platform & WordPress Theme`
   - **Visibility:** `Private` (Recommended for proprietary business code) or `Public`
   - **Initialize repository with:** **DO NOT** check *Add a README*, *Add .gitignore*, or *Choose a license* (we already have local files).
4. Click **Create repository**.
5. Copy the HTTPS repository URL (e.g., `https://github.com/your-username/asmi-luxury-jewelry.git`).

### Step 2.3: Initialize Git Locally in `c:\Asmi 2`
Open PowerShell, navigate to the project directory, and initialize Git:

```powershell
# 1. Initialize local repository
git init

# 2. Configure your identity (if not already set)
git config user.name "Your Name"
git config user.email "your-email@example.com"

# 3. Verify .gitignore is active
git status
```
*(You will see that `node_modules/` and large `.zip` files are automatically excluded).*

### Step 2.4: Stage and Make the Initial Commit
```powershell
# 1. Stage all project files
git add .

# 2. Commit the code
git commit -m "feat: initial commit of ASMI Haute Joaillerie platform and theme"

# 3. Set the default branch to main
git branch -M main
```

### Step 2.5: Link Local Repository to GitHub and Push
Replace `your-username` and `asmi-luxury-jewelry` with your actual GitHub username and repository name:

```powershell
# 1. Add GitHub remote
git remote add origin https://github.com/your-username/asmi-luxury-jewelry.git

# 2. Push to GitHub
git push -u origin main
```

> [!TIP]
> **Authentication Note:** If prompted for credentials, use your GitHub username and a **Personal Access Token (PAT)** or authenticate via the GitHub Credential Manager browser prompt.

### Step 2.6: Daily Development & Version Control Workflow
Whenever you make updates to products, stylesheets, or features:
```powershell
# Check what has changed
git status

# Stage updated files
git add .

# Commit with a descriptive message
git commit -m "update: enhanced hero button contrast and updated category catalog"

# Push to production repository
git push origin main
```

---

## 3. Automated cPanel Deployment via GitHub (Zero-Touch CI/CD)

If your live production website runs on cPanel (e.g. on Hostinger, Bluehost, GoDaddy, A2Hosting, Namecheap), you can connect cPanel directly to your GitHub repository so that **pushing to GitHub automatically updates your live site!**

### Step 3.1: Create `.cpanel.yml` in Project Root
The repository already contains `.cpanel.yml` configured to copy the production files directly into your hosting document root (`public_html`):

```yaml
---
deployment:
  tasks:
    - export DEPLOYPATH=/home/YOUR_CPANEL_USERNAME/public_html/
    - /bin/cp -R index.html admin.html api.php .htaccess assets css js data $DEPLOYPATH
    - /bin/chmod -R 755 $DEPLOYPATH/data
    - /bin/chmod -R 755 $DEPLOYPATH/assets
```

### Step 3.2: Connect GitHub in cPanel
1. Log in to your hosting **cPanel**.
2. Under the **Files** section, click **Git™ Version Control**.
3. Click **Create**.
4. Configure the repository:
   - **Clone URL:** Paste your GitHub repository URL (`https://github.com/your-username/asmi-luxury-jewelry.git`).
   - **Repository Path:** `/home/username/repositories/asmi-luxury-jewelry`
   - **Repository Name:** `asmi-luxury-jewelry`
5. Click **Create**.
6. Once cloned, click **Manage** next to the repository.
7. Click the **Pull or Deploy** tab ➔ **Deploy HEAD Commit**.
8. Your live website is now deployed at your domain! Any future commit pushed to GitHub can be updated with one click on **Update from Remote**.

---

## 4. Deployment Method A: Traditional Shared Hosting (cPanel / Apache / LiteSpeed)

Use this method if you do not want to use Git on the server and prefer uploading via cPanel File Manager or FTP.

### Step 4.1: Build the Traditional Hosting ZIP
Run the included PowerShell build script:
```powershell
powershell -ExecutionPolicy Bypass -File "c:\Asmi 2\build-traditional-zip.ps1"
```
This produces `c:\Asmi 2\asmi-luxury-jewelry-traditional-hosting.zip` containing strictly the clean web files.

### Step 4.2: Upload & Extract
1. Open cPanel ➔ **File Manager** ➔ open `public_html/`.
2. Upload `asmi-luxury-jewelry-traditional-hosting.zip`.
3. Right-click the uploaded ZIP ➔ **Extract** ➔ extract directly into `public_html/`.
4. Ensure the files sit directly under `public_html/` (not inside a subfolder):
   ```text
   public_html/
   ├── index.html
   ├── admin.html
   ├── api.php
   ├── .htaccess
   ├── assets/
   ├── css/
   ├── js/
   └── data/
   ```

### Step 4.3: Set Permissions
- Set `data/` folder permissions to **755** (or **775**).
- Set `assets/images/` folder permissions to **755** (or **775**).
This ensures order records, patron details, reviews, and uploaded photos can be saved.

### Step 4.4: Verify Your Live Storefront
Open `https://yourdomain.com`. The storefront will load with instant local-cloud synchronization!

---

## 5. Deployment Method B: Node.js Cloud / VPS (Render, Railway, Ubuntu + PM2)

Use this method if you are running the high-performance Node.js backend server (`server.js`).

### Option 1: Render.com / Railway.app (Zero-Config Cloud Hosting)
1. Push your repository to GitHub (as described in Section 2).
2. Log into [Render.com](https://render.com) or [Railway.app](https://railway.app).
3. Click **New +** ➔ **Web Service** ➔ Select your GitHub repository (`asmi-luxury-jewelry`).
4. Configure service parameters:
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Auto-Deploy:** `Yes` (Deploys automatically on every `git push origin main`)
5. Add Environment Variables:
   - `PORT`: `8000` (or leave default assigned by host)
   - `NODE_ENV`: `production`
6. Click **Deploy Web Service**. Render/Railway will build and launch your live URL (e.g. `https://asmi-luxury.onrender.com`).

---

### Option 2: Self-Managed Ubuntu VPS (DigitalOcean, Linode, AWS EC2, Hetzner)

#### 1. Connect to your VPS and install Node.js & Git:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

#### 2. Clone your GitHub repository:
```bash
cd /var/www
sudo git clone https://github.com/your-username/asmi-luxury-jewelry.git asmi-store
cd /var/www/asmi-store
sudo npm install --production
```

#### 3. Start the application with PM2 daemon:
```bash
pm2 start server.js --name "asmi-luxury"
pm2 startup
pm2 save
```

#### 4. Configure Nginx Reverse Proxy (`/etc/nginx/sites-available/asmi`):
```nginx
server {
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

#### 5. Enable site and install free SSL certificate:
```bash
sudo ln -s /etc/nginx/sites-available/asmi /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 6. Deployment Method C: WordPress + WooCommerce Theme Production

If your production site is hosted on a WordPress engine (e.g. WP Engine, Hostinger WordPress, Kinsta):

### Step 6.1: Build the Theme ZIP
Run the PowerShell bundler:
```powershell
powershell -ExecutionPolicy Bypass -File "c:\Asmi 2\wordpress-theme\build-theme-zip.ps1"
```
This generates the fresh, installable `c:\Asmi 2\asmi-luxury-jewelry.zip`.

### Step 6.2: Install into WordPress
1. Log in to your **WordPress Admin Panel** (`https://yourdomain.com/wp-admin`).
2. Go to **Appearance ➔ Themes ➔ Add New Theme**.
3. Click **Upload Theme** at the top.
4. Select `asmi-luxury-jewelry.zip` from your computer.
5. Click **Install Now** and then click **Activate**.

### Step 6.3: Configure Permalinks
1. In WP Admin, go to **Settings ➔ Permalinks**.
2. Select **Post name** (`/%postname%/`).
3. Click **Save Changes** (this flushes rewrite rules for the `/wp-json/asmi/v1/` REST endpoints).

---

## 7. Production Data Persistence & Git Best Practices

When deploying to production with GitHub, manage your database and secrets cleanly:

### What to Track vs. Ignore in Git
- **Track:** Default seed catalogs (`data/products.json`, `data/settings.json`, `data/categories.json`).
- **Protect in Production:** Live transaction records (`data/orders.json`, `data/patrons.json`).
  > On a live production server, live orders and patrons are continuously written to `data/orders.json` and `data/patrons.json`. When pulling new code updates from GitHub (`git pull`), avoid overwriting your live customer order history.

### Safe Production Update Command (VPS / Server)
```bash
# Stash any server-side database file changes before pulling
git stash

# Pull the latest code updates
git pull origin main

# Re-apply the live database changes
git stash pop

# Restart process
pm2 restart asmi-luxury
```

---

## 8. Final Pre-Flight Production Checklist

Before officially announcing your storefront to clients, complete this 6-point checklist:

- [ ] **1. Change Default Admin Passkey:**  
  Log in to the **Master Atelier Admin Console** (`admin.html` or footer trigger with `Asmi@2026`). Navigate to **Tab 8 (Store Settings)** ➔ update the **Master Admin Passkey** to a secure private passkey.
- [ ] **2. Configure Real Contact Details:**  
  Update your official WhatsApp number, Atelier concierge phone, and contact email in **Tab 8 (Settings)**.
- [ ] **3. Configure Live Payment Gateway:**  
  Set your live **UPI ID / QR Code** or active **Razorpay Key ID & Key Secret** in **Settings ➔ Payment Gateways**.
- [ ] **4. Configure SMTP Email Dispatcher:**  
  Ensure customer orders, OTP verification passcodes, and gift cards send real emails by configuring SMTP (Host, Port, User, App Password) in `data/settings.json` or via Admin Tab 8.
- [ ] **5. SSL HTTPS Certificate:**  
  Confirm that your domain forces `https://` with a valid SSL padlock.
- [ ] **6. Verify Storefront Light & Dark Modes:**  
  Toggle between Dark (Noir) and Light (Ivoire) mode using the top navbar switch to ensure all typography and button labels ("Explore Pearl Sets") remain crisp and visible.

---

### 👑 Congratulations!
Your **ASMI Haute Joaillerie** e-commerce flagship is fully version-controlled, production-hardened, and ready to welcome patrons worldwide.
