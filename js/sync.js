/**
 * ASMI - Universal Cloud & Local Server Persistence Synchronization Layer
 * 
 * Bridges Frontend State <--> Local Node.js JSON Database <--> Live WordPress MySQL Options
 * Ensures that changes made in the admin panel are permanently preserved across browser
 * restarts, incognito modes, multi-device access, and WordPress theme deployments.
 */

/**
 * Globally available Asset URL Resolver
 * Resolves relative paths (e.g. assets/images/...) to full WordPress theme URL
 */
function resolveAssetUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  let themeBase = "";
  if (typeof asmi_wp_data !== "undefined" && asmi_wp_data.themeUrl) {
    themeBase = asmi_wp_data.themeUrl.replace(/\/+$/, "") + "/";
  } else if (window.ASMI_THEME_URI) {
    themeBase = window.ASMI_THEME_URI.replace(/\/+$/, "") + "/";
  } else {
    const meta = document.querySelector('meta[name="asmi-theme-uri"]');
    if (meta && meta.getAttribute("content")) {
      themeBase = meta.getAttribute("content").replace(/\/+$/, "") + "/";
    } else {
      themeBase = "";
    }
  }
  return themeBase + path.replace(/^\/+/, "");
}
window.resolveAssetUrl = resolveAssetUrl;

// Universal Broken Image Auto-Recovery Safeguard:
// Ensures 100% of images on the site remain visible even if a CDN/media path fails
if (typeof window !== "undefined") {
  window.addEventListener("error", function(e) {
    if (e.target && e.target.tagName === "IMG") {
      const img = e.target;
      if (!img.dataset.hasFallback) {
        img.dataset.hasFallback = "true";
        const fallback = resolveAssetUrl("assets/images/emerald-necklace.jpg");
        if (img.src !== fallback) {
          img.src = fallback;
        }
      }
    }
  }, true);
}

// 5 Preloaded Luxury Color Themes
const ASMI_PRELOADED_THEMES = [
  {
    id: "theme-noir-gold",
    name: "Theme 1: Royal Noir & Champagne Gold",
    subtitle: "Signature Dark Masterpiece (Obsidian & 22K Gold Glow)",
    badge: "Default Dark",
    previewColor: "#D4AF37",
    previewBg: "#070707",
    vars: {
      "--bg-primary": "#070707",
      "--bg-secondary": "#0E0E0E",
      "--bg-surface": "#141414",
      "--bg-card": "#121212",
      "--bg-modal": "#0C0C0C",
      "--bg-plinth": "#181613",
      "--text-primary": "#FFFFFF",
      "--text-secondary": "#C7C4BE",
      "--text-muted": "#8A8780",
      "--gold-primary": "#D4AF37",
      "--gold-glow": "rgba(212, 175, 55, 0.45)",
      "--border-color": "rgba(212, 175, 55, 0.25)",
      "--border-hairline": "rgba(255, 255, 255, 0.12)"
    }
  },
  {
    id: "theme-ivoire-gold",
    name: "Theme 2: Ivoire & Imperial Gold",
    subtitle: "Signature Light Haute Joaillerie (Warm White & Gold)",
    badge: "Default Light",
    previewColor: "#8C6E17",
    previewBg: "#F9F7F2",
    vars: {
      "--bg-primary": "#F9F7F2",
      "--bg-secondary": "#EFEBE1",
      "--bg-surface": "#FFFFFF",
      "--bg-card": "#FFFFFF",
      "--bg-modal": "#FFFFFF",
      "--bg-plinth": "#F2ECE0",
      "--text-primary": "#111110",
      "--text-secondary": "#403D38",
      "--text-muted": "#757168",
      "--gold-primary": "#8C6E17",
      "--gold-glow": "rgba(140, 110, 23, 0.3)",
      "--border-color": "rgba(140, 110, 23, 0.35)",
      "--border-hairline": "rgba(0, 0, 0, 0.1)"
    }
  },
  {
    id: "theme-emerald-noir",
    name: "Theme 3: Zambian Emerald Noir",
    subtitle: "Deep Regal Colombian & Zambian Forest Green with Gold",
    badge: "Emerald Edition",
    previewColor: "#10B981",
    previewBg: "#051811",
    vars: {
      "--bg-primary": "#051811",
      "--bg-secondary": "#08241B",
      "--bg-surface": "#0C3024",
      "--bg-card": "#0A281E",
      "--bg-modal": "#061F16",
      "--bg-plinth": "#0E382A",
      "--text-primary": "#F0FDF4",
      "--text-secondary": "#BBF7D0",
      "--text-muted": "#6EE7B7",
      "--gold-primary": "#34D399",
      "--gold-glow": "rgba(52, 211, 153, 0.45)",
      "--border-color": "rgba(52, 211, 153, 0.3)",
      "--border-hairline": "rgba(255, 255, 255, 0.14)"
    }
  },
  {
    id: "theme-ruby-royale",
    name: "Theme 4: Kashmir Ruby Royale",
    subtitle: "Rich Pigeon-Blood Velvet Crimson & Rose Gold",
    badge: "Bridal Ruby",
    previewColor: "#E11D48",
    previewBg: "#19060B",
    vars: {
      "--bg-primary": "#19060B",
      "--bg-secondary": "#250911",
      "--bg-surface": "#340C18",
      "--bg-card": "#2B0A13",
      "--bg-modal": "#1E070D",
      "--bg-plinth": "#3E0F1D",
      "--text-primary": "#FFF1F2",
      "--text-secondary": "#FECDD3",
      "--text-muted": "#FDA4AF",
      "--gold-primary": "#FB7185",
      "--gold-glow": "rgba(251, 113, 133, 0.45)",
      "--border-color": "rgba(251, 113, 133, 0.3)",
      "--border-hairline": "rgba(255, 255, 255, 0.14)"
    }
  },
  {
    id: "theme-sapphire-atelier",
    name: "Theme 5: Midnight Sapphire & Diamond",
    subtitle: "Deep Celestial Ocean Navy & Brilliant Platinum",
    badge: "Sapphire Diamond",
    previewColor: "#38BDF8",
    previewBg: "#050D1A",
    vars: {
      "--bg-primary": "#050D1A",
      "--bg-secondary": "#09172B",
      "--bg-surface": "#0E223D",
      "--bg-card": "#0B1D34",
      "--bg-modal": "#061222",
      "--bg-plinth": "#122A4A",
      "--text-primary": "#F0F9FF",
      "--text-secondary": "#BAE6FD",
      "--text-muted": "#7DD3FC",
      "--gold-primary": "#38BDF8",
      "--gold-glow": "rgba(56, 189, 248, 0.45)",
      "--border-color": "rgba(56, 189, 248, 0.3)",
      "--border-hairline": "rgba(255, 255, 255, 0.14)"
    }
  }
];
window.PRELOADED_THEMES = ASMI_PRELOADED_THEMES;

(function() {
  class AsmiSyncManager {
    constructor() {
      this.isWordPress = typeof asmi_wp_data !== "undefined" && Boolean(asmi_wp_data.restUrl || asmi_wp_data.rest_url);
      this.isInitialized = false;
      this.pendingSync = false;
      this.lastDarkThemeId = "theme-noir-gold";

      // 1. Cross-Tab Real-time Broadcast Channel
      this.broadcastChannel = null;
      if (typeof BroadcastChannel !== "undefined") {
        try {
          this.broadcastChannel = new BroadcastChannel("asmi_sync_channel");
          this.broadcastChannel.onmessage = (event) => {
            if (event.data && event.data.type && event.data.data) {
              console.log(`[ASMI Sync] Cross-tab real-time update received: ${event.data.type}`);
              this.applyHydratedData({ [event.data.type]: event.data.data }, true);
            }
          };
        } catch (e) {
          console.warn("[ASMI Sync] BroadcastChannel initialization skipped:", e);
        }
      }

      // 2. Cross-Tab Storage Event Fallback (Guaranteed cross-process/cross-tab pulse)
      if (typeof window !== "undefined") {
        window.addEventListener("storage", (e) => {
          if (!e.key || !e.newValue) return;
          try {
            if (e.key === "asmi_sync_pulse") {
              const pulse = JSON.parse(e.newValue);
              if (pulse && pulse.type && pulse.data) {
                console.log(`[ASMI Sync] Cross-tab storage pulse detected for ${pulse.type}`);
                this.applyHydratedData({ [pulse.type]: pulse.data }, true);
                return;
              }
            }
            const parsed = JSON.parse(e.newValue);
            const keyMap = {
              "asmi_site_settings": "settings",
              "asmi_categories_data": "categories",
              "asmi_products_data": "products",
              "asmi_reviews_data": "reviews",
              "asmi_coupons_data": "coupons",
              "asmi_giftcards_data": "giftcards",
              "asmi_orders_data": "orders",
              "asmi_patrons_db": "patrons",
              "asmi_patrons_data": "patrons"
            };
            const type = keyMap[e.key];
            if (type) {
              console.log(`[ASMI Sync] LocalStorage storage event detected for ${type}`);
              this.applyHydratedData({ [type]: parsed }, true);
            }
          } catch (err) {}
        });
      }
    }

    /**
     * Resolves the appropriate REST API endpoint based on running environment
     */
    getApiUrl(endpoint) {
      const cleanEndpoint = endpoint.replace(/^\/+/, "");
      if (typeof asmi_wp_data !== "undefined" && (asmi_wp_data.restUrl || asmi_wp_data.rest_url)) {
        const restBase = (asmi_wp_data.restUrl || asmi_wp_data.rest_url).replace(/\/+$/, "") + "/";
        return `${restBase}asmi/v1/${cleanEndpoint}`;
      }
      return `/api/${cleanEndpoint}`;
    }

    /**
     * Generates request headers including WordPress REST API nonces and Admin Keys
     */
    getHeaders(isMutation = false) {
      const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
      };
      if (isMutation && this.isWordPress && typeof asmi_wp_data !== "undefined" && asmi_wp_data.nonce && (asmi_wp_data.isAdmin || asmi_wp_data.isLoggedIn)) {
        headers["X-WP-Nonce"] = asmi_wp_data.nonce;
      }
      const adminPass = localStorage.getItem("asmi_admin_password") || "Asmi@2026";
      if (isMutation) {
        headers["X-ASMI-Admin-Key"] = adminPass;
      }
      return headers;
    }

    /**
     * Universally saves data to BOTH local browser storage AND permanent server database
     * and broadcasts to all other open tabs in real-time.
     */
    async save(type, data) {
      // 1. Instant local client cache update
      let storageKey = `asmi_${type}_data`;
      if (type === "settings") storageKey = "asmi_site_settings";
      if (type === "patrons") {
        storageKey = "asmi_patrons_db";
        try { localStorage.setItem("asmi_patrons_data", JSON.stringify(data)); } catch(e) {}
      }
      try {
        localStorage.setItem(storageKey, JSON.stringify(data));
      } catch (storageErr) {
        console.warn(`[ASMI Sync] LocalStorage write error for ${type}:`, storageErr);
      }

      // 2. Instantly update all live UI modules in DOM
      this.applyHydratedData({ [type]: data }, false);

      // 3. Broadcast to all other open tabs (Admin & Storefront) for zero-lag instant sync
      if (this.broadcastChannel) {
        try {
          this.broadcastChannel.postMessage({ type, data, timestamp: Date.now() });
        } catch (e) {}
      }
      try {
        localStorage.setItem("asmi_sync_pulse", JSON.stringify({ type, data, timestamp: Date.now() }));
      } catch (e) {}

      // 4. Dispatch event for local window listeners
      window.dispatchEvent(new CustomEvent("asmi:sync-updated", {
        detail: { type, data }
      }));

      // 5. Asynchronously persist to Server Database (Node.js JSON file or WordPress wp_options)
      const url = this.getApiUrl(type);
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: this.getHeaders(true),
          body: JSON.stringify(data)
        });
        if (res.ok) {
          const resData = await res.json();
          console.log(`[ASMI Sync] Persisted ${type} successfully to permanent server database.`, resData);
          return true;
        } else {
          console.warn(`[ASMI Sync] Server returned status ${res.status} when saving ${type}`);
        }
      } catch (netErr) {
        console.log(`[ASMI Sync] Notice: Running in client-cache mode. Server sync unavailable (${netErr.message})`);
      }
      return false;
    }

    /**
     * Upload an image (base64 Data URL) to the server to store in assets/images/
     */
    async uploadImage(dataUrl) {
      if (!dataUrl || !dataUrl.startsWith("data:")) return dataUrl;
      try {
        const res = await fetch(this.getApiUrl("upload"), {
          method: "POST",
          headers: this.getHeaders(true),
          body: JSON.stringify({ dataUrl })
        });
        if (res.ok) {
          const result = await res.json();
          if (result.success && result.url) {
            return result.url;
          }
        }
      } catch (e) {
        console.warn("[ASMI Sync] Image upload to server skipped, using dataUrl fallback", e);
      }
      return dataUrl;
    }

    /**
     * Hydrates frontend state from the server database (or preloaded WordPress options)
     */
    async hydrateAll() {
      // Step 1: Instant hydration from preloaded options if present
      if (this.isWordPress && typeof asmi_wp_data !== "undefined" && asmi_wp_data.preloaded) {
        this.applyHydratedData(asmi_wp_data.preloaded);
        if (asmi_wp_data.preloaded.products && !asmi_wp_data.isAdmin) {
          return;
        }
      }

      // Step 2: Fresh background fetch to ensure updates bypass page caching
      try {
        const res = await fetch(this.getApiUrl("sync"), {
          method: "GET",
          headers: this.getHeaders(false),
          cache: "no-cache"
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            console.log("[ASMI Sync] Synced latest catalog & settings from Server Database.");
            this.applyHydratedData(json.data);
            return;
          }
        }
      } catch (err) {
        console.log("[ASMI Sync] Server sync background query complete.");
      }
    }

    /**
     * Applies color palette variables and theme mode universally to DOM
     */
    applyActiveTheme(themeId, notify = false, skipPersist = false) {
      const themes = window.PRELOADED_THEMES || ASMI_PRELOADED_THEMES;
      const theme = themes.find(t => t.id === themeId) || themes[0];
      const root = document.documentElement;

      if (theme && theme.vars) {
        Object.entries(theme.vars).forEach(([key, val]) => {
          root.style.setProperty(key, val);
        });
      }

      if (themeId === "theme-ivoire-gold") {
        document.body.classList.add("light-mode");
        root.classList.remove("dark");
        document.querySelectorAll(".theme-icon").forEach(icon => {
          icon.className = "fa-solid fa-sun theme-icon";
        });
        document.querySelectorAll(".theme-label").forEach(lbl => {
          lbl.textContent = "Light Mode";
        });
        localStorage.setItem("asmi_theme_mode", "light");
      } else {
        document.body.classList.remove("light-mode");
        root.classList.add("dark");
        document.querySelectorAll(".theme-icon").forEach(icon => {
          icon.className = "fa-solid fa-moon theme-icon";
        });
        document.querySelectorAll(".theme-label").forEach(lbl => {
          lbl.textContent = "Dark Mode";
        });
        localStorage.setItem("asmi_theme_mode", "dark");
        this.lastDarkThemeId = themeId;
      }

      if (!skipPersist) {
        try {
          const s = JSON.parse(localStorage.getItem("asmi_site_settings") || "{}");
          if (s.activeThemeId !== themeId) {
            s.activeThemeId = themeId;
            localStorage.setItem("asmi_site_settings", JSON.stringify(s));
          }
        } catch (e) {}
      }

      if (notify && window.showToast) {
        window.showToast("Changes Saved Successfully", `${theme.name} is now live universally.`);
      }
    }

    /**
     * Dynamically renders and binds category filter pills on Storefront
     */
    syncStorefrontCategoryPills(categories) {
      const filterRow = document.querySelector(".category-filter-row");
      if (!filterRow) return;

      const cats = Array.isArray(categories) && categories.length > 0 
        ? categories 
        : JSON.parse(localStorage.getItem("asmi_categories_data") || "[]");

      if (!cats || cats.length === 0) return;

      const activeCat = (typeof window.activeCategory !== "undefined") 
        ? window.activeCategory 
        : (typeof activeCategory !== "undefined" ? activeCategory : "all");

      filterRow.innerHTML = `
        <button class="filter-pill ${activeCat === 'all' ? 'active' : ''}" data-category="all">
          <i class="fa-solid fa-gem"></i> All Jewelry
        </button>
        ${cats.map(c => `
          <button class="filter-pill ${activeCat === c.id ? 'active' : ''}" data-category="${c.id}">
            <i class="fa-solid ${c.icon || 'fa-sparkles'}"></i> ${c.label}
          </button>
        `).join("")}
      `;

      // Reattach clean event listeners
      filterRow.querySelectorAll(".filter-pill[data-category]").forEach(pill => {
        pill.addEventListener("click", () => {
          filterRow.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
          pill.classList.add("active");
          const targetCat = pill.dataset.category;
          window.activeCategory = targetCat;
          if (typeof activeCategory !== "undefined") {
            try { activeCategory = targetCat; } catch(e) {}
          }
          if (typeof window.renderCatalog === "function") {
            window.renderCatalog();
          } else if (typeof renderCatalog === "function") {
            renderCatalog();
          }
        });
      });
    }

    /**
     * Universally applies EVERY admin setting to Storefront DOM elements
     */
    applyAllStorefrontCustomizations(s) {
      if (!s || typeof s !== "object") return;

      // 1. Brand Logo Text & Custom Logo Image & Tagline
      const brandLogoLink = document.querySelector(".brand-logo");
      const brandNameEls = document.querySelectorAll(".brand-logo-text, #brandLogoText");
      if (s.brandLogoText) {
        brandNameEls.forEach(el => {
          if (s.brandLogoText.includes("Collection")) {
            el.innerHTML = s.brandLogoText.replace("Collection", '<span style="font-style: italic; color: var(--gold-primary); font-weight: 300;">Collection</span>');
          } else {
            el.textContent = s.brandLogoText;
          }
        });
      }

      if (brandLogoLink) {
        let customImg = brandLogoLink.querySelector(".custom-brand-logo-img");
        if (s.customLogoUrl) {
          if (!customImg) {
            customImg = document.createElement("img");
            customImg.className = "custom-brand-logo-img";
            customImg.style.maxHeight = "40px";
            customImg.style.width = "auto";
            customImg.style.objectFit = "contain";
            customImg.style.marginRight = "0.5rem";
            customImg.alt = "Brand Logo";
            brandLogoLink.insertBefore(customImg, brandLogoLink.firstChild);
          }
          customImg.src = resolveAssetUrl(s.customLogoUrl);
          customImg.style.display = "inline-block";
        } else if (customImg) {
          customImg.remove();
        }
      }

      const brandSubEls = document.querySelectorAll(".brand-logo-sub");
      if (s.brandTagline || s.brandSubtitle) {
        brandSubEls.forEach(el => {
          el.textContent = s.brandTagline || s.brandSubtitle;
        });
      }

      // 2. Custom Favicon
      if (s.customFaviconUrl) {
        let fav = document.querySelector("link[rel*='icon']");
        if (!fav) {
          fav = document.createElement("link");
          fav.rel = "shortcut icon";
          document.head.appendChild(fav);
        }
        fav.href = resolveAssetUrl(s.customFaviconUrl);
      }

      // 3. Top Announcement Ribbon
      this.applySiteSettingsToDOM(s);

      // 4. Header CTA
      const headerCta = document.getElementById("headerCtaBtn") || document.querySelector(".nav-book-call-btn");
      if (headerCta) {
        if (s.headerCtaText) headerCta.textContent = s.headerCtaText;
        if (s.headerCtaLink) headerCta.href = s.headerCtaLink;
      }

      // 5. SEO & Document Title Directives
      if (s.siteTitle && document.title) {
        document.title = s.siteTitle;
      }

      const setMeta = (name, content, isProp = false) => {
        if (!content) return;
        const attr = isProp ? `property='${name}'` : `name='${name}'`;
        let el = document.querySelector(`meta[${attr}]`);
        if (!el) {
          el = document.createElement("meta");
          if (isProp) el.setAttribute("property", name);
          else el.setAttribute("name", name);
          document.head.appendChild(el);
        }
        el.setAttribute("content", content);
      };

      setMeta("description", s.metaDescription);
      setMeta("keywords", s.metaKeywords);
      setMeta("author", s.authorName);
      setMeta("robots", s.robotsIndex);
      setMeta("og:title", s.ogTitle || s.siteTitle, true);
      setMeta("og:description", s.ogDescription || s.metaDescription, true);
      if (s.ogImage) setMeta("og:image", resolveAssetUrl(s.ogImage), true);
      setMeta("og:site_name", s.ogSiteName || "ASMI's Collection", true);
      setMeta("twitter:card", s.twitterCard || "summary_large_image");
      setMeta("twitter:title", s.ogTitle || s.siteTitle);
      setMeta("twitter:description", s.ogDescription || s.metaDescription);
      if (s.ogImage) setMeta("twitter:image", resolveAssetUrl(s.ogImage));

      // 6. Hero Showcase Section
      const setText = (id, val) => {
        if (!val) return;
        const el = document.getElementById(id);
        if (el) el.textContent = val;
      };
      const setHtml = (id, html) => {
        if (!html) return;
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
      };

      setText("heroBadgeText", s.heroBadgeText);
      setText("heroTitleTop", s.heroTitleTop);
      setText("heroTitleHighlight", s.heroTitleHighlight);
      setText("heroDescription", s.heroDescription);
      setText("heroCtaPrimaryText", s.heroCtaPrimaryText);
      setText("heroCtaSecondaryText", s.heroCtaSecondaryText);
      setText("heroStat1Value", s.heroStat1Value);
      setText("heroStat1Label", s.heroStat1Label);
      setText("heroStat2Value", s.heroStat2Value);
      setText("heroStat2Label", s.heroStat2Label);
      setText("heroStat3Value", s.heroStat3Value);
      setText("heroStat3Label", s.heroStat3Label);
      // 6. Hero Masterpiece Card (Align with active catalog)
      const catalog = (window.PRODUCTS_DATA && Array.isArray(window.PRODUCTS_DATA) && window.PRODUCTS_DATA.length > 0) ? window.PRODUCTS_DATA : [];
      let heroProd = catalog.find(p => p.id === s.heroFloatingProductId);
      if (!heroProd && catalog.length > 0) {
        heroProd = catalog.find(p => p.name && s.heroFloatingTitle && p.name.trim().toLowerCase() === s.heroFloatingTitle.trim().toLowerCase()) || catalog[0];
      }
      if (heroProd) {
        setText("heroFloatingTitle", s.heroFloatingTitle || heroProd.name);
        setText("heroFloatingPrice", s.heroFloatingPrice || (typeof formatPrice === 'function' ? formatPrice(heroProd.priceINR, null, heroProd.priceUSD) : `₹${heroProd.priceINR}`));
      } else {
        setText("heroFloatingTitle", s.heroFloatingTitle);
        setText("heroFloatingPrice", s.heroFloatingPrice);
      }
      setText("heroFloatingSubtitle", s.heroFloatingSubtitle);
      setText("heroFloatingBtnText", s.heroFloatingBtnText);
      const heroFloatBtn = document.getElementById("heroFloatingBtn");
      if (heroFloatBtn) {
        if (heroProd) {
          heroFloatBtn.setAttribute("data-product-id", heroProd.id);
        } else if (s.heroFloatingProductId) {
          heroFloatBtn.setAttribute("data-product-id", s.heroFloatingProductId);
        }
        heroFloatBtn.onclick = () => {
          if (typeof acquireHeroSet === "function") {
            acquireHeroSet();
          } else if (typeof openQuickView === "function" && heroProd) {
            openQuickView(heroProd.id);
          }
        };
      }

      const heroPrimaryLink = document.getElementById("heroCtaPrimaryLink");
      if (heroPrimaryLink && s.heroCtaPrimaryLink) heroPrimaryLink.href = s.heroCtaPrimaryLink;
      const heroSecondaryLink = document.getElementById("heroCtaSecondaryLink");
      if (heroSecondaryLink && s.heroCtaSecondaryLink) heroSecondaryLink.href = s.heroCtaSecondaryLink;

      const heroImg = document.getElementById("heroModelImg") || document.querySelector(".hero-model-img");
      if (heroImg && s.heroModelImage) {
        heroImg.src = resolveAssetUrl(s.heroModelImage);
      }

      // 7. Curated Vault / Catalog Section
      setText("catalogBadgeText", s.catalogBadgeText);
      setText("catalogHeading", s.catalogHeading);
      setText("catalogSubtitle", s.catalogSubtitle);
      setText("catalogBespokeTitle", s.catalogBespokeTitle);
      setText("catalogBespokeDesc", s.catalogBespokeDesc);
      setText("catalogBespokeBtnText", s.catalogBespokeBtnText);

      // 8. Style Lookbook & Editorial 3 Muses (Auto-align with active catalog pieces)
      setText("editorialBadge", s.editorialBadge);
      setText("editorialHeading", s.editorialHeading);
      if (s.editorialQuote) {
        const quoteEl = document.getElementById("editorialQuote");
        if (quoteEl) quoteEl.textContent = `"${s.editorialQuote.replace(/^"|"$/g, '')}"`;
      }

      const setImgSrc = (id, src) => {
        if (!src) return;
        const el = document.getElementById(id);
        if (el) el.src = resolveAssetUrl(src);
      };

      [1, 2, 3].forEach(num => {
        const prodId = s[`lookbook${num}ProductId`];
        const matchingProd = catalog.find(p => p.id === prodId);
        if (matchingProd) {
          setImgSrc(`lookbook${num}Img`, s[`lookbook${num}Image`] || matchingProd.image);
          setText(`lookbook${num}PieceName`, s[`lookbook${num}PieceName`] || matchingProd.name);
          setText(`lookbook${num}Price`, s[`lookbook${num}Price`] || (typeof formatPrice === 'function' ? formatPrice(matchingProd.priceINR, null, matchingProd.priceUSD) : `₹${matchingProd.priceINR}`));
        } else if (catalog.length > 0) {
          // If configured product was deleted from catalog, fall back to active catalog piece
          const fallback = catalog[num - 1] || catalog[0];
          if (fallback) {
            setImgSrc(`lookbook${num}Img`, fallback.image);
            setText(`lookbook${num}PieceName`, fallback.name);
            setText(`lookbook${num}Price`, (typeof formatPrice === 'function' ? formatPrice(fallback.priceINR, null, fallback.priceUSD) : `₹${fallback.priceINR}`));
          }
        } else {
          setImgSrc(`lookbook${num}Img`, s[`lookbook${num}Image`]);
          setText(`lookbook${num}PieceName`, s[`lookbook${num}PieceName`]);
          setText(`lookbook${num}Price`, s[`lookbook${num}Price`]);
        }
        setText(`lookbook${num}Style`, s[`lookbook${num}Style`]);
        setText(`lookbook${num}Title`, s[`lookbook${num}Title`]);
      });

      // 9. Artisanal Provenance (4 Pillars)
      setText("pillar1Title", s.pillar1Title);
      setText("pillar1Desc", s.pillar1Desc);
      setText("pillar2Title", s.pillar2Title);
      setText("pillar2Desc", s.pillar2Desc);
      setText("pillar3Title", s.pillar3Title);
      setText("pillar3Desc", s.pillar3Desc);
      setText("pillar4Title", s.pillar4Title);
      setText("pillar4Desc", s.pillar4Desc);

      // 10. Reviews & Stories Section Header
      setText("reviewsBadge", s.reviewsBadge);
      if (s.reviewsHeading) {
        const revHead = document.getElementById("reviewsHeading");
        if (revHead) {
          revHead.innerHTML = s.reviewsHeading.includes("Heirloom Stories")
            ? s.reviewsHeading.replace("Heirloom Stories", '<span class="gold-gradient-text" style="font-style: italic;">Heirloom Stories</span>')
            : s.reviewsHeading;
        }
      }
      setText("reviewsCountBadge", s.reviewsSubtitle);
      setText("reviewsAvgScore", s.reviewsAvgRating);

      // 11. VIP Consultation Section
      setText("consultationBadge", s.consultationBadge);
      setText("consultationHeading", s.consultationHeading);
      if (s.consultationFeaturedQuote) {
        const cQuote = document.getElementById("consultationFeaturedQuote");
        if (cQuote) cQuote.textContent = `"${s.consultationFeaturedQuote.replace(/^"|"$/g, '')}"`;
      }
      setText("consultationFeaturedAuthor", s.consultationFeaturedAuthor);
      setText("consultationFeaturedMeta", s.consultationFeaturedMeta);
      setText("consultationStat1Val", s.consultationStat1Val);
      setText("consultationStat1Lbl", s.consultationStat1Lbl);
      setText("consultationStat2Val", s.consultationStat2Val);
      setText("consultationStat2Lbl", s.consultationStat2Lbl);
      setText("consultationCardTitle", s.consultationCardTitle);
      setText("consultationCardDesc", s.consultationCardDesc);

      // 12. Footer Newsletter & Brand
      setText("footerNewsletterBadge", s.footerNewsletterBadge);
      setText("footerNewsletterTitle", s.footerNewsletterTitle);
      setText("footerNewsletterDesc", s.footerNewsletterDesc);
      if (s.footerBrandTitle) {
        const fBrand = document.getElementById("footerBrandTitle");
        if (fBrand) {
          fBrand.innerHTML = s.footerBrandTitle.replace("Collection", '<span style="font-style: italic; color: var(--gold-primary);">Collection</span>');
        }
      }
      setText("footerAboutText", s.footerAboutText);

      // 13. Contact, Phone, WhatsApp, Email & Social Links
      const phone = s.officialPhone || "+91 98765 43210";
      const cleanPhone = phone.replace(/[^0-9+]/g, '');
      const whatsapp = s.officialWhatsapp || "+91 98765 43210";
      const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, '');
      const email = s.officialEmail || "concierge@asmijewelry.com";
      const fbUrl = s.officialFacebook || "https://facebook.com/asmiclassicjewelry";
      const igUrl = s.officialInstagram || "https://instagram.com/asmi_luxury_atelier";

      // Nav Phone
      const navPhoneLink = document.getElementById("navPhoneLink");
      const navPhoneText = document.getElementById("navPhoneText");
      if (navPhoneLink) navPhoneLink.href = `tel:${cleanPhone}`;
      if (navPhoneText) navPhoneText.textContent = phone;

      // Footer Phone
      const footerPhoneLink = document.getElementById("footerPhoneLink");
      const footerPhoneText = document.getElementById("footerPhoneText");
      if (footerPhoneLink) footerPhoneLink.href = `tel:${cleanPhone}`;
      if (footerPhoneText) footerPhoneText.textContent = phone;

      // Footer WhatsApp
      const footerWhatsappLink = document.getElementById("footerWhatsappLink");
      const footerWhatsappText = document.getElementById("footerWhatsappText");
      if (footerWhatsappLink) footerWhatsappLink.href = `https://wa.me/${cleanWhatsapp}`;
      if (footerWhatsappText) footerWhatsappText.textContent = whatsapp;

      // Footer Email
      const footerEmailLink = document.getElementById("footerEmailLink");
      const footerEmailText = document.getElementById("footerEmailText");
      if (footerEmailLink) footerEmailLink.href = `mailto:${email}`;
      if (footerEmailText) footerEmailText.textContent = email;

      // Social Links
      const footerFbLink = document.getElementById("footerFacebookLink");
      if (footerFbLink) footerFbLink.href = fbUrl;
      const footerIgLink = document.getElementById("footerInstagramLink");
      if (footerIgLink) footerIgLink.href = igUrl;

      // Address, Hours, Copyright
      const addrEl = document.getElementById("footerAddress") || document.querySelector(".footer-address");
      if (addrEl && s.footerAddress) addrEl.textContent = s.footerAddress;
      const hoursEl = document.getElementById("footerHours") || document.querySelector(".footer-hours");
      if (hoursEl && (s.supportHours || s.footerHours)) hoursEl.textContent = s.supportHours || s.footerHours;
      const copyEl = document.getElementById("footerCopyright") || document.querySelector(".footer-copyright");
      if (copyEl && s.footerCopyright) copyEl.textContent = s.footerCopyright;

      // 14. Active Theme
      if (s.activeThemeId) {
        this.applyActiveTheme(s.activeThemeId, false, true);
      }
    }

    /**
     * Ingests retrieved server data and updates all in-memory arrays and UI modules universally
     */
    applyHydratedData(data, fromSync = false) {
      if (!data) return;

      // 1. Products Catalog
      if (Array.isArray(data.products)) {
        window.PRODUCTS_DATA = data.products;
        try {
          localStorage.setItem("asmi_products_data", JSON.stringify(data.products));
        } catch (e) {}
      }

      // 2. Site & SEO Settings
      if (data.settings && typeof data.settings === "object") {
        try {
          localStorage.setItem("asmi_site_settings", JSON.stringify(data.settings));
        } catch (e) {}
        this.applyAllStorefrontCustomizations(data.settings);
        if (window.adminManager) {
          window.adminManager.siteSettings = { ...window.adminManager.siteSettings, ...data.settings };
          if (typeof window.adminManager.applyAllSectionsSettings === "function") {
            window.adminManager.applyAllSectionsSettings();
          }
          if (typeof window.adminManager.applyBrandAssets === "function") {
            window.adminManager.applyBrandAssets();
          }
          if (typeof window.adminManager.applySEOSettings === "function") {
            window.adminManager.applySEOSettings();
          }
          if (typeof window.adminManager.applyContactAndSocialSettings === "function") {
            window.adminManager.applyContactAndSocialSettings();
          }
          if (typeof window.adminManager.applyHeroSettings === "function") {
            window.adminManager.applyHeroSettings();
          }
          if (typeof window.adminManager.applyActiveTheme === "function" && data.settings.activeThemeId) {
            window.adminManager.applyActiveTheme(data.settings.activeThemeId, false, true);
          }
        }
      }

      // 3. Coupons & Offers
      if (Array.isArray(data.coupons)) {
        try {
          localStorage.setItem("asmi_coupons_data", JSON.stringify(data.coupons));
        } catch (e) {}
        if (window.adminManager) {
          window.adminManager.coupons = data.coupons;
        }
      }

      // 4. Categories & Category Filter Pills
      if (Array.isArray(data.categories)) {
        try {
          localStorage.setItem("asmi_categories_data", JSON.stringify(data.categories));
        } catch (e) {}
        this.syncStorefrontCategoryPills(data.categories);
        if (window.adminManager) {
          window.adminManager.categories = data.categories;
          if (typeof window.adminManager.syncCategoryPillsUI === "function") {
            window.adminManager.syncCategoryPillsUI();
          }
        }
      }

      // 5. Orders & Logistics
      if (Array.isArray(data.orders)) {
        try {
          localStorage.setItem("asmi_orders_data", JSON.stringify(data.orders));
        } catch (e) {}
        if (window.ordersManager) {
          window.ordersManager.orders = data.orders;
        }
      }

      // 6. Client Reviews
      if (Array.isArray(data.reviews)) {
        try {
          localStorage.setItem("asmi_reviews_data", JSON.stringify(data.reviews));
        } catch (e) {}
        if (window.reviewsManager) {
          window.reviewsManager.reviews = data.reviews;
          if (typeof window.reviewsManager.renderHomeReviews === "function") {
            window.reviewsManager.renderHomeReviews("all");
          }
        }
      }

      // 7. Patrons & Logistics Client Addresses
      if (Array.isArray(data.patrons)) {
        try {
          localStorage.setItem("asmi_patrons_db", JSON.stringify(data.patrons));
          localStorage.setItem("asmi_patrons_data", JSON.stringify(data.patrons));
        } catch (e) {}
        if (window.authManager) {
          window.authManager.patronsDB = data.patrons;
          if (typeof window.authManager.syncCurrentPatronFromDB === "function") {
            window.authManager.syncCurrentPatronFromDB();
          }
        }
      }

      // Trigger Storefront & Admin UI Re-renders
      if (typeof window.renderCatalog === "function") window.renderCatalog();
      else if (typeof renderCatalog === "function") renderCatalog();
      if (typeof window.renderFeaturedGrid === "function") window.renderFeaturedGrid();
      if (window.reviewsManager && typeof window.reviewsManager.renderHomeReviews === "function") {
        window.reviewsManager.renderHomeReviews("all");
      }
      if (window.adminManager && typeof window.adminManager.renderDashboard === "function") {
        if (window.adminManager.activeTab === "dashboard") window.adminManager.renderDashboard();
      }
    }

    /**
     * Universally apply critical site settings (e.g. top announcement ribbon) directly to DOM
     * Works on both public storefront (index.html) and admin console (admin.html)
     */
    applySiteSettingsToDOM(settings) {
      if (!settings) return;
      const banner = document.getElementById("siteAnnouncementBanner") || document.querySelector(".announcement-ribbon") || document.getElementById("announcementBar");
      const textEl = document.getElementById("announcementBannerText") || document.getElementById("announcementText") || (banner ? banner.querySelector("span") : null);

      if (banner) {
        if (settings.announcementActive === false) {
          banner.style.display = "none";
          banner.classList.add("hidden-ribbon");
          document.documentElement.classList.add("hide-announcement");
        } else if (settings.announcementActive === true) {
          banner.style.display = "block";
          banner.classList.remove("hidden-ribbon");
          document.documentElement.classList.remove("hide-announcement");
        }
      }
      if (textEl && typeof settings.announcementText === "string") {
        textEl.textContent = settings.announcementText;
      }
    }
  }

  // Export singleton instance to window
  window.asmiSync = new AsmiSyncManager();

  // Instantly apply locally cached settings & categories to eliminate lag and flicker
  try {
    const cachedSettings = JSON.parse(localStorage.getItem("asmi_site_settings") || "{}");
    if (cachedSettings && typeof cachedSettings === "object") {
      window.asmiSync.applyAllStorefrontCustomizations(cachedSettings);
    }
    const cachedCats = JSON.parse(localStorage.getItem("asmi_categories_data") || "[]");
    if (Array.isArray(cachedCats) && cachedCats.length > 0) {
      window.asmiSync.syncStorefrontCategoryPills(cachedCats);
    }
  } catch (e) {}

  // Auto-hydrate when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      // Re-apply immediately when DOM elements are created
      try {
        const cachedSettings = JSON.parse(localStorage.getItem("asmi_site_settings") || "{}");
        if (cachedSettings && typeof cachedSettings === "object") {
          window.asmiSync.applyAllStorefrontCustomizations(cachedSettings);
        }
        const cachedCats = JSON.parse(localStorage.getItem("asmi_categories_data") || "[]");
        if (Array.isArray(cachedCats) && cachedCats.length > 0) {
          window.asmiSync.syncStorefrontCategoryPills(cachedCats);
        }
      } catch (e) {}

      window.asmiSync.hydrateAll();
    });
  } else {
    window.asmiSync.hydrateAll();
  }
})();
