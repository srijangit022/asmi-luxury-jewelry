# 🚀 Complete Beginner's Step-by-Step Guide: Deploying ASMI on an Ubuntu VPS

> **Target Audience:** Complete beginners (no prior Linux / VPS experience required).  
> **Target OS:** Ubuntu 22.04 LTS or Ubuntu 24.04 LTS (DigitalOcean, Linode, Hostinger VPS, AWS EC2, Hetzner, Vultr).  
> **Stack Architecture:** Node.js + PM2 (Process Daemon) + Nginx (Reverse Proxy) + Certbot (Free HTTPS/SSL).  

---

## 🧭 Overview: What We Are Doing
When you buy a VPS (Virtual Private Server), you are given a fresh computer in the cloud with an IP address (e.g., `123.45.67.89`) and a `root` password.

We will complete **8 simple steps**:
1. Connect to the VPS from your Windows PC using SSH.
2. Update the server and install Node.js, Git, and Nginx.
3. Bring your project code onto the VPS (via GitHub or FileZilla/SCP).
4. Run the project in the background 24/7 using PM2.
5. Configure Nginx so your domain name points to the website.
6. Point your Domain's DNS to your VPS IP address.
7. Install a 100% Free SSL Certificate (`https://` padlock).
8. How to deploy future updates in 10 seconds.

---

## Step 1: Connect to Your Ubuntu VPS from Windows

You do **not** need to install third-party software; Windows has built-in SSH.

1. Open **PowerShell** or **Command Prompt** on your Windows PC.
2. Type the following command (replace `YOUR_SERVER_IP` with your actual VPS IP address):
   ```bash
   ssh root@YOUR_SERVER_IP
   ```
3. If asked: `Are you sure you want to continue connecting (yes/no)?`, type:
   ```text
   yes
   ```
   and press **Enter**.
4. Type your VPS password (provided by your hosting provider) and press **Enter**.
   *(Note: Linux does not show stars or characters while typing passwords for security—just type or right-click to paste, then press Enter).*

You are now inside your remote Ubuntu server! You will see a prompt like `root@ubuntu:~#`.

---

## Step 2: Update Server & Install Required Software

Copy and paste these commands into your server terminal one by one:

### 2.1 Update the package index
```bash
sudo apt update && sudo apt upgrade -y
```

### 2.2 Install Git, Curl, and Nginx
```bash
sudo apt install -y curl git nginx ufw
```

### 2.3 Install Node.js (Version 20 LTS)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```
Verify the installation:
```bash
node -v
npm -v
```
*(Should output `v20.x.x` and `10.x.x`)*

### 2.4 Install PM2 (Process Manager)
PM2 ensures your `server.js` never stops running, even if the server reboots or crashes:
```bash
sudo npm install -g pm2
```

---

## Step 3: Put Your Code on the Server

You have two easy ways to get your project files onto the server. **Option 3A (GitHub)** is the recommended industry standard.

### Option 3A: Via GitHub (Recommended)

1. Make sure you have pushed your project from Windows to GitHub (as described in your GitHub guide):
   ```powershell
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```
2. On your VPS terminal, navigate to `/var/www/` and clone your repository:
   ```bash
   cd /var/www
   sudo git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git asmi-store
   ```
3. Enter the project folder:
   ```bash
   cd /var/www/asmi-store
   ```
4. Install dependencies:
   ```bash
   sudo npm install --production
   ```

---

### Option 3B: Uploading the ZIP directly (Without GitHub)

If you haven't set up GitHub yet, upload [`asmi-luxury-jewelry-traditional-hosting.zip`](file:///c:/Asmi%202/asmi-luxury-jewelry-traditional-hosting.zip) using FileZilla or SCP from Windows:

1. **On your Windows PC PowerShell**, run:
   ```powershell
   scp "c:\Asmi 2\asmi-luxury-jewelry-traditional-hosting.zip" root@YOUR_SERVER_IP:/var/www/
   ```
2. **On your VPS terminal**, extract the zip:
   ```bash
   cd /var/www
   sudo apt install -y unzip
   sudo mkdir -p /var/www/asmi-store
   sudo unzip asmi-luxury-jewelry-traditional-hosting.zip -d /var/www/asmi-store
   cd /var/www/asmi-store
   sudo npm install --production
   ```

---

## Step 4: Start the Server with PM2 (24/7 Background Runner)

Inside `/var/www/asmi-store`:

1. Start your Node.js server:
   ```bash
   pm2 start server.js --name "asmi-luxury"
   ```
2. View the running process status:
   ```bash
   pm2 status
   ```
   *(You should see `asmi-luxury` with status `online` on Port 8000).*

3. Make PM2 automatically start on server reboot:
   ```bash
   pm2 startup
   ```
   *(Copy and paste the line PM2 outputs, then press Enter)*.
4. Save the process list:
   ```bash
   pm2 save
   ```

To check live server logs anytime:
```bash
pm2 logs asmi-luxury
```

---

## Step 5: Configure Nginx Reverse Proxy

By default, your Node.js server runs internally on port `8000`. We configure Nginx so visitors who type your domain or IP address on Port 80/443 reach your store.

### 5.1 Create Nginx configuration file
```bash
sudo nano /etc/nginx/sites-available/asmi
```

### 5.2 Paste the following configuration:
*(Replace `yourdomain.com` and `www.yourdomain.com` with your actual domain name, or use your VPS IP if you don't have a domain yet).*

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Maximum file upload size for jewelry photos
    client_max_body_size 50M;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

*To save in Nano editor:* Press `Ctrl + O`, then press `Enter`. Then press `Ctrl + X` to exit.

### 5.3 Enable the configuration and test Nginx:
```bash
# Link the site to enabled sites
sudo ln -s /etc/nginx/sites-available/asmi /etc/nginx/sites-enabled/

# Remove default welcome page
sudo rm -f /etc/nginx/sites-enabled/default

# Test configuration for syntax errors
sudo nginx -t
```
*(You must see: `syntax is ok` and `test is successful`)*.

### 5.4 Restart Nginx:
```bash
sudo systemctl restart nginx
```

Now, if you open `http://YOUR_SERVER_IP/` in your web browser, **your live ASMI jewelry store will appear!**

---

## Step 6: Connect Your Domain Name (DNS Setup)

To use your custom domain (e.g., `asmijewelry.com`):

1. Log into your domain registrar (GoDaddy, Namecheap, Hostinger, Cloudflare, etc.).
2. Open **DNS Management** for your domain.
3. Add two **A Records**:
   - **Type:** `A` | **Name/Host:** `@` | **Value/Points to:** `YOUR_SERVER_IP` | **TTL:** `Automatic` (or `300`)
   - **Type:** `A` | **Name/Host:** `www` | **Value/Points to:** `YOUR_SERVER_IP` | **TTL:** `Automatic` (or `300`)
4. Wait 5–15 minutes for DNS propagation.

---

## Step 7: Install Free SSL Certificate (`https://` Green Lock)

Once your domain is pointing to your server IP:

1. Install Certbot for Nginx:
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   ```
2. Request and install your free SSL certificate:
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```
3. Follow the prompts:
   - Enter your email address (for certificate renewal notices).
   - Press `Y` to agree to the Terms of Service.
   - Choose whether to share your email (usually `N`).
4. Certbot will automatically configure SSL and redirect all `http://` traffic to `https://`.

Test automatic renewal (runs silently in the background forever):
```bash
sudo certbot renew --dry-run
```

---

## Step 8: Configure Server Firewall (Security Best Practice)

Lock down your Ubuntu server so only necessary web traffic is allowed:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
sudo ufw status
```

---

## 🔄 How to Push Updates from Windows to Live VPS (in 10 Seconds)

Whenever you edit files on your Windows computer:

### 1. On your Windows PC:
```powershell
git add .
git commit -m "Updated jewelry prices and styles"
git push origin main
```

### 2. On your VPS terminal:
```bash
cd /var/www/asmi-store
git pull origin main
pm2 restart asmi-luxury
```
Done! Your live store is updated with zero downtime.

---

## 🛠️ Helpful VPS Cheat Sheet

| Task | Command |
| :--- | :--- |
| **Check server status** | `pm2 status` |
| **View live logs & errors** | `pm2 logs asmi-luxury` |
| **Restart website server** | `pm2 restart asmi-luxury` |
| **Restart Nginx** | `sudo systemctl restart nginx` |
| **Test Nginx config** | `sudo nginx -t` |
| **Check server memory usage**| `free -m` |
| **Check disk space** | `df -h` |
| **Reboot VPS** | `sudo reboot` |
