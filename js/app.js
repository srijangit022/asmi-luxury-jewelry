/**
 * ASMI - Main Application Controller
 */

// ==========================================================================
// 1. GLOBAL STATE & THEME CONTROLLER
// ==========================================================================

let activeCategory = "all";
window.activeCategory = activeCategory;
window.setActiveCategory = function(catId) {
  activeCategory = catId;
  window.activeCategory = catId;
  document.querySelectorAll(".filter-pill[data-category]").forEach(p => {
    p.classList.toggle("active", p.dataset.category === catId);
  });
  renderCatalog();
};
let activeSort = "coveted";
let activeSearchQuery = "";
let wishlistItems = JSON.parse(localStorage.getItem("asmi_wishlist") || "[]");

// Toast Notification Function
window.showToast = function(title, message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.innerHTML = `
    <div style="width: 32px; height: 32px; background: rgba(212, 175, 55, 0.15); border: 1px solid var(--gold-primary); display: flex; align-items: center; justify-content: center; color: var(--gold-primary); flex-shrink: 0;">
      <i class="fa-solid fa-gem text-xs"></i>
    </div>
    <div style="flex: 1; min-width: 0;">
      <p class="label-micro" style="color: var(--gold-primary); margin-bottom: 2px;">${title}</p>
      <p style="font-size: 0.8125rem; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${message}</p>
    </div>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3800);
};

window.showSavedToast = function(message) {
  window.showToast("Changes Saved Successfully", message || "Your updates have been applied universally.");
};

// Theme Mode Controller (Noir vs Light Mode)
function applyTheme(isLight) {
  if (window.asmiSync && typeof window.asmiSync.applyActiveTheme === "function") {
    const targetThemeId = isLight ? "theme-ivoire-gold" : (window.asmiSync.lastDarkThemeId || "theme-noir-gold");
    window.asmiSync.applyActiveTheme(targetThemeId, false, false);
  } else {
    if (isLight) {
      document.body.classList.add("light-mode");
      document.documentElement.classList.remove("dark");
      document.querySelectorAll(".theme-icon").forEach(icon => {
        icon.className = "fa-solid fa-sun theme-icon";
      });
      document.querySelectorAll(".theme-label").forEach(lbl => {
        lbl.textContent = "Light Mode";
      });
      localStorage.setItem("asmi_theme_mode", "light");
    } else {
      document.body.classList.remove("light-mode");
      document.documentElement.classList.add("dark");
      document.querySelectorAll(".theme-icon").forEach(icon => {
        icon.className = "fa-solid fa-moon theme-icon";
      });
      document.querySelectorAll(".theme-label").forEach(lbl => {
        lbl.textContent = "Dark Mode";
      });
      localStorage.setItem("asmi_theme_mode", "dark");
    }
  }
}

function toggleTheme() {
  const isLight = document.body.classList.contains("light-mode");
  applyTheme(!isLight);
  window.showToast("Changes Saved Successfully", !isLight ? "Switched to Light Mode." : "Switched to Dark Mode.");
}

// ==========================================================================
// 2. PRODUCT CATALOG RENDERING & FILTERING
// ==========================================================================

function getFilteredProducts() {
  let list = [...PRODUCTS_DATA];

  // Stock Availability Filter: Automatically hide products when stock reaches 0 from main storefront
  list = list.filter(p => (typeof p.stock === "number" ? p.stock > 0 : true));

  // Category filter
  if (activeCategory !== "all") {
    list = list.filter(p => p.category === activeCategory);
  }

  // Search filter
  if (activeSearchQuery.trim()) {
    const q = activeSearchQuery.toLowerCase().trim();
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.gemstone.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  // Sorting
  if (activeSort === "price-asc") {
    list.sort((a, b) => a.priceINR - b.priceINR);
  } else if (activeSort === "price-desc") {
    list.sort((a, b) => b.priceINR - a.priceINR);
  } else if (activeSort === "newest") {
    list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  } else {
    // Most popular
    list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating);
  }

  return list;
}

function renderCatalog() {
  const grid = document.getElementById("vaultProductsGrid");
  const countEl = document.getElementById("catalogResultsCount");
  if (!grid) return;

  const products = getFilteredProducts();

  if (countEl) {
    countEl.textContent = `Showing ${products.length} Jewelry Design${products.length === 1 ? '' : 's'}`;
  }

  if (products.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
        <i class="fa-solid fa-gem" style="font-size: 2.5rem; color: var(--gold-primary); margin-bottom: 1rem; opacity: 0.6;"></i>
        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--text-primary); margin-bottom: 0.5rem;">No Matching Jewelry Found</h3>
        <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1.5rem;">Try searching for pearls, green emeralds, or sparkling diamonds.</p>
        <button class="btn-secondary" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map(prod => {
    const isWishlisted = wishlistItems.includes(prod.id);
    const tagClass = prod.category === 'emeralds' ? 'tag-emerald' : prod.category === 'polki' ? 'tag-ruby' : '';

    return `
      <div class="product-card" data-id="${prod.id}">
        <div class="product-image-box">
          <span class="product-tag ${tagClass}">${prod.tag}</span>
          <img src="${resolveAssetUrl(prod.image)}" alt="${prod.name}" class="product-img" loading="lazy">
          
          <div class="product-quick-overlay">
            <button class="overlay-action-btn" onclick="openQuickView('${prod.id}')" title="Zoom & Details">
              <i class="fa-solid fa-magnifying-glass-plus"></i>
            </button>
            <button class="overlay-action-btn" onclick="toggleWishlist('${prod.id}')" title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}">
              <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart" style="${isWishlisted ? 'color: var(--ruby-primary);' : ''}"></i>
            </button>
            <button class="overlay-action-btn" onclick="quickAddProduct('${prod.id}')" title="Add to Bag">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>

        <div class="product-details">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
              <span class="label-micro" style="color: var(--gold-primary);">${prod.categoryLabel}</span>
              <div style="display: flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; color: var(--gold-primary);">
                <i class="fa-solid fa-star text-[10px]"></i>
                <span style="font-weight: 600; color: var(--text-primary);">${prod.rating}</span>
                <span style="color: var(--text-muted); font-size: 0.65rem;">(${prod.reviewsCount})</span>
              </div>
            </div>

            <h3 class="product-title" onclick="openQuickView('${prod.id}')" style="cursor: pointer;">
              ${prod.name}
            </h3>
            
            <p style="font-size: 0.75rem; color: var(--text-muted); font-weight: 300; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              ${prod.shortDesc}
            </p>
          </div>

          <div class="product-price-row">
            <div>
              <div class="price-display">${formatPrice(prod.priceINR, null, prod.priceUSD)}</div>
              <span class="label-micro" style="color: var(--text-muted);">${prod.hallmark}</span>
            </div>
            <button class="btn-add-bag" onclick="quickAddProduct('${prod.id}')">
              + Add To Bag
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function resetFilters() {
  activeCategory = "all";
  activeSort = "coveted";
  activeSearchQuery = "";
  
  document.querySelectorAll(".filter-pill").forEach(p => {
    p.classList.toggle("active", p.dataset.category === "all");
  });
  
  const sortSelect = document.getElementById("sortSelector");
  if (sortSelect) sortSelect.value = "coveted";
  
  const searchInput = document.getElementById("searchInputMain");
  if (searchInput) searchInput.value = "";
  
  renderCatalog();
}

function filterByCategory(category) {
  activeCategory = category;
  document.querySelectorAll(".filter-pill").forEach(p => {
    p.classList.toggle("active", p.dataset.category === category);
  });
  renderCatalog();
}

// ==========================================================================
// SEARCH CONTROLS (NAVBAR POPDOWN & REAL-TIME SEARCH)
// ==========================================================================

function openSearchBar() {
  const dropdown = document.getElementById("searchDropdown");
  if (!dropdown) return;
  dropdown.classList.add("active");
  dropdown.style.display = "block";
  const input = document.getElementById("searchInputMain");
  if (input) {
    setTimeout(() => {
      input.focus();
      input.select();
    }, 50);
  }
}

function closeSearchBar() {
  const dropdown = document.getElementById("searchDropdown");
  if (!dropdown) return;
  dropdown.classList.remove("active");
  dropdown.style.display = "none";
}

function toggleSearchBar() {
  const dropdown = document.getElementById("searchDropdown");
  if (!dropdown) return;
  const isVisible = dropdown.classList.contains("active") && dropdown.style.display !== "none";
  if (isVisible) {
    closeSearchBar();
  } else {
    openSearchBar();
  }
}

function handleSearchSubmit(e) {
  if (e) e.preventDefault();
  const input = document.getElementById("searchInputMain");
  if (input) {
    activeCategory = "all";
    document.querySelectorAll(".filter-pill").forEach(p => {
      p.classList.toggle("active", p.dataset.category === "all");
    });
    activeSearchQuery = input.value.trim();
    renderCatalog();
    const vault = document.getElementById("vaultSection");
    if (vault) {
      vault.scrollIntoView({ behavior: "smooth" });
    }
    const count = getFilteredProducts().length;
    if (activeSearchQuery) {
      window.showToast("Search Results", `Found ${count} jewelry design${count === 1 ? '' : 's'} matching "${activeSearchQuery}"`);
    }
  }
}

function quickSearch(query) {
  const input = document.getElementById("searchInputMain");
  if (input) {
    input.value = query;
  }
  activeCategory = "all";
  document.querySelectorAll(".filter-pill").forEach(p => {
    p.classList.toggle("active", p.dataset.category === "all");
  });
  activeSearchQuery = query.trim();
  renderCatalog();
  const vault = document.getElementById("vaultSection");
  if (vault) {
    vault.scrollIntoView({ behavior: "smooth" });
  }
  const count = getFilteredProducts().length;
  window.showToast("Search Active", `Found ${count} design${count === 1 ? '' : 's'} for "${query}"`);
}

function clearSearch() {
  const input = document.getElementById("searchInputMain");
  if (input) {
    input.value = "";
    input.focus();
  }
  activeSearchQuery = "";
  renderCatalog();
  window.showToast("Search Reset", "Displaying all jewelry collections.");
}

// Quick Add Helper
function quickAddProduct(productId) {
  const prods = (typeof PRODUCTS_DATA !== 'undefined' && Array.isArray(PRODUCTS_DATA)) ? PRODUCTS_DATA : (window.PRODUCTS_DATA || []);
  let targetId = productId;
  let targetProd = prods.find(p => p.id === targetId);
  if (!targetProd && prods.length > 0) {
    targetProd = prods[0];
    targetId = targetProd ? targetProd.id : productId;
  }
  const cm = (typeof cartManager !== 'undefined' && cartManager) ? cartManager : window.cartManager;
  if (cm && typeof cm.addItem === 'function' && targetId) {
    cm.addItem(targetId, 1);
  }
  if (typeof openCartDrawer === 'function') {
    openCartDrawer();
  } else if (typeof window.openCartDrawer === 'function') {
    window.openCartDrawer();
  }
}
window.quickAddProduct = quickAddProduct;

function quickAddLookbook(lookbookIndex) {
  const s = (window.asmiSync && window.asmiSync.settings) || {};
  const prods = (typeof PRODUCTS_DATA !== 'undefined' && Array.isArray(PRODUCTS_DATA)) ? PRODUCTS_DATA : (window.PRODUCTS_DATA || []);
  
  let targetId = s[`lookbook${lookbookIndex}ProductId`] || '';
  let targetName = s[`lookbook${lookbookIndex}PieceName`] || s[`lookbook${lookbookIndex}Title`] || '';
  let targetImage = s[`lookbook${lookbookIndex}Image`] || '';
  let targetPrice = 0;

  // Find in active catalog to ensure piece was not deleted
  let matchedProd = prods.find(p => p.id === targetId);
  if (!matchedProd && prods.length > 0) {
    matchedProd = prods[lookbookIndex - 1] || prods[0];
  }

  if (matchedProd) {
    targetId = matchedProd.id;
    targetName = targetName || matchedProd.name;
    targetImage = targetImage || matchedProd.image;
    targetPrice = matchedProd.priceINR || 0;
  }

  const customData = {
    customName: targetName,
    customImage: targetImage,
    customPriceINR: targetPrice,
    customPriceUSD: Math.round(targetPrice * 0.012)
  };

  const cm = (typeof cartManager !== 'undefined' && cartManager) ? cartManager : window.cartManager;
  if (cm && typeof cm.addItem === 'function' && targetId) {
    cm.addItem(targetId, 1, "22K Gold Finish", "Standard", customData);
  }
  if (typeof openCartDrawer === 'function') {
    openCartDrawer();
  } else if (typeof window.openCartDrawer === 'function') {
    window.openCartDrawer();
  }
}
window.quickAddLookbook = quickAddLookbook;

function openLookbookQuickView(lookbookIndex) {
  const s = (window.asmiSync && window.asmiSync.settings) || {};
  const prods = (typeof PRODUCTS_DATA !== 'undefined' && Array.isArray(PRODUCTS_DATA)) ? PRODUCTS_DATA : (window.PRODUCTS_DATA || []);
  let targetId = s[`lookbook${lookbookIndex}ProductId`];

  let matchedProd = prods.find(p => p.id === targetId);
  if (!matchedProd && prods.length > 0) {
    matchedProd = prods[lookbookIndex - 1] || prods[0];
  }

  if (matchedProd) {
    openQuickView(matchedProd.id);
  } else if (window.showToast) {
    window.showToast("Notice", "This lookbook jewelry piece is no longer available in the catalog.");
  }
}
window.openLookbookQuickView = openLookbookQuickView;

/**
 * Resolves and opens the exact jewelry piece featured in the Hero Model Showcase
 */
function acquireHeroSet() {
  const s = (window.asmiSync && window.asmiSync.settings) || {};
  const currentTitle = (document.getElementById("heroFloatingTitle")?.textContent || s.heroFloatingTitle || "").trim();
  const prods = (typeof PRODUCTS_DATA !== 'undefined' && Array.isArray(PRODUCTS_DATA)) ? PRODUCTS_DATA : (window.PRODUCTS_DATA || []);
  
  let prod = null;

  // 1. Explicitly configured heroFloatingProductId
  if (s.heroFloatingProductId && prods.length > 0) {
    prod = prods.find(p => p.id === s.heroFloatingProductId);
  }

  // 2. Exact product name match (case-insensitive)
  if (!prod && currentTitle && prods.length > 0) {
    prod = prods.find(p => p.name && p.name.trim().toLowerCase() === currentTitle.toLowerCase());
  }

  // 3. Substring / partial title match
  if (!prod && currentTitle && prods.length > 0) {
    prod = prods.find(p => p.name && (
      p.name.toLowerCase().includes(currentTitle.toLowerCase()) ||
      currentTitle.toLowerCase().includes(p.name.toLowerCase())
    ));
  }

  // 4. Match display price if available
  if (!prod && prods.length > 0) {
    const priceText = (document.getElementById("heroFloatingPrice")?.textContent || s.heroFloatingPrice || "");
    const numPrice = parseInt(priceText.replace(/[^0-9]/g, ""), 10);
    if (!isNaN(numPrice) && numPrice > 0) {
      prod = prods.find(p => p.priceINR === numPrice);
    }
  }

  // 5. Fallback to first available product
  if (!prod && prods.length > 0) {
    prod = prods[0];
  }

  if (prod && typeof openQuickView === 'function') {
    openQuickView(prod.id);
  }
}
window.acquireHeroSet = acquireHeroSet;

// ==========================================================================
// 3. PRODUCT QUICK VIEW & MAGNIFICATION LOUPE MODAL
// ==========================================================================

let activeQuickViewProduct = null;
let currentSelectedFinish = "Champagne Gold (22K)";
let currentSelectedSize = '16" Choker Length';
let originalSiteSEO = null;

/**
 * Dynamic Product SEO & Schema.org JSON-LD Meta Updater
 * Applies product-specific title, description, keywords, canonical URL, OG tags, and rich snippet
 */
function applyProductSEO(prod) {
  if (!prod) return;

  if (!originalSiteSEO) {
    originalSiteSEO = {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
      keywords: document.querySelector('meta[name="keywords"]')?.getAttribute("content") || "",
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "",
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute("content") || "",
      ogDesc: document.querySelector('meta[property="og:description"]')?.getAttribute("content") || "",
      ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute("content") || "",
      twitterTitle: document.querySelector('meta[name="twitter:title"]')?.getAttribute("content") || "",
      twitterDesc: document.querySelector('meta[name="twitter:description"]')?.getAttribute("content") || "",
      twitterImage: document.querySelector('meta[name="twitter:image"]')?.getAttribute("content") || ""
    };
  }

  const title = prod.seoTitle || `${prod.name} | BIS Hallmarked Luxury Jewelry | ASMI`;
  const desc = prod.seoDescription || prod.description || prod.shortDesc || "";
  const keywords = prod.seoKeywords || `${prod.name}, ${prod.category}, fine handcrafted jewelry, asmi luxury collection`;
  const canonical = prod.seoCanonicalUrl || `https://asmijewelry.com/product/${prod.id}`;
  const ogTitle = prod.seoOgTitle || title;
  const ogDesc = prod.seoOgDescription || desc;
  const ogImage = resolveAssetUrl(prod.seoOgImage || prod.image);

  document.title = title;

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

  setMeta("description", desc);
  setMeta("keywords", keywords);
  if (prod.seoRobots) setMeta("robots", prod.seoRobots);

  setMeta("og:title", ogTitle, true);
  setMeta("og:description", ogDesc, true);
  if (ogImage) setMeta("og:image", ogImage, true);
  setMeta("og:type", "product", true);

  setMeta("twitter:title", ogTitle);
  setMeta("twitter:description", ogDesc);
  if (ogImage) setMeta("twitter:image", ogImage);
  if (prod.seoTwitterCard) setMeta("twitter:card", prod.seoTwitterCard);

  // Update Canonical
  let canonEl = document.querySelector('link[rel="canonical"]');
  if (!canonEl) {
    canonEl = document.createElement("link");
    canonEl.setAttribute("rel", "canonical");
    document.head.appendChild(canonEl);
  }
  canonEl.setAttribute("href", canonical);

  // Inject or update Schema.org Product JSON-LD Structured Data
  let jsonLdEl = document.getElementById("asmi-product-jsonld");
  if (!jsonLdEl) {
    jsonLdEl = document.createElement("script");
    jsonLdEl.id = "asmi-product-jsonld";
    jsonLdEl.type = "application/ld+json";
    document.head.appendChild(jsonLdEl);
  }

  const allImgs = (Array.isArray(prod.altImages) && prod.altImages.length > 0)
    ? prod.altImages.map(img => resolveAssetUrl(img))
    : [resolveAssetUrl(prod.image)];

  const schemaObj = {
    "@context": "https://schema.org/",
    "@type": prod.seoSchemaType || "Product",
    "name": prod.name,
    "image": allImgs,
    "description": desc,
    "sku": prod.sku || prod.id,
    "mpn": prod.sku || prod.id,
    "brand": {
      "@type": "Brand",
      "name": "ASMI Haute Joaillerie"
    },
    "offers": {
      "@type": "Offer",
      "url": canonical,
      "priceCurrency": "INR",
      "price": prod.priceINR,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": (prod.stock !== undefined && prod.stock > 0) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "ASMI's Collection"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": prod.rating || "5.0",
      "reviewCount": prod.reviewsCount || "38"
    }
  };

  jsonLdEl.textContent = JSON.stringify(schemaObj, null, 2);
}

function restoreSiteSEO() {
  if (!originalSiteSEO) return;
  document.title = originalSiteSEO.title;

  const setMeta = (name, content, isProp = false) => {
    const attr = isProp ? `property='${name}'` : `name='${name}'`;
    let el = document.querySelector(`meta[${attr}]`);
    if (el) {
      if (content) el.setAttribute("content", content);
      else el.remove();
    }
  };

  setMeta("description", originalSiteSEO.description);
  setMeta("keywords", originalSiteSEO.keywords);
  setMeta("og:title", originalSiteSEO.ogTitle, true);
  setMeta("og:description", originalSiteSEO.ogDesc, true);
  setMeta("og:image", originalSiteSEO.ogImage, true);
  setMeta("twitter:title", originalSiteSEO.twitterTitle);
  setMeta("twitter:description", originalSiteSEO.twitterDesc);
  setMeta("twitter:image", originalSiteSEO.twitterImage);

  let canonEl = document.querySelector('link[rel="canonical"]');
  if (canonEl && originalSiteSEO.canonical) {
    canonEl.setAttribute("href", originalSiteSEO.canonical);
  }

  const jsonLdEl = document.getElementById("asmi-product-jsonld");
  if (jsonLdEl) jsonLdEl.remove();
}

window.applyProductSEO = applyProductSEO;
window.restoreSiteSEO = restoreSiteSEO;

function openQuickView(productId) {
  let prod = PRODUCTS_DATA.find(p => p.id === productId);
  if (!prod && productId) {
    prod = PRODUCTS_DATA.find(p => p.name && p.name.trim().toLowerCase() === productId.trim().toLowerCase());
  }
  if (!prod) {
    if (productId && window.showToast) {
      window.showToast("Catalog Notice", "This jewelry piece is no longer available in the catalog.");
    }
    return;
  }

  activeQuickViewProduct = prod;
  currentSelectedFinish = prod.metal || "22K Champagne Gold Plating";
  currentSelectedSize = "Standard";

  const modal = document.getElementById("quickviewModalBackdrop");
  const imgEl = document.getElementById("qvImage");
  const titleEl = document.getElementById("qvTitle");
  const subtitleEl = document.getElementById("qvSubtitle");
  const priceEl = document.getElementById("qvPrice");
  const descEl = document.getElementById("qvDescription");
  const gemstoneEl = document.getElementById("qvGemstone");
  const accentEl = document.getElementById("qvAccent");
  const metalEl = document.getElementById("qvMetal");
  const hallmarkEl = document.getElementById("qvHallmark");
  const stockEl = document.getElementById("qvStock");

  if (imgEl) imgEl.src = resolveAssetUrl(prod.image);
  if (titleEl) titleEl.textContent = prod.name;
  if (subtitleEl) subtitleEl.textContent = prod.subtitle;
  if (priceEl) priceEl.textContent = formatPrice(prod.priceINR, null, prod.priceUSD);
  if (descEl) descEl.textContent = prod.description;
  if (gemstoneEl) gemstoneEl.textContent = prod.gemstone;
  if (accentEl) accentEl.textContent = prod.accentStones;
  if (metalEl) metalEl.textContent = prod.metal;
  if (hallmarkEl) hallmarkEl.textContent = prod.hallmark;
  if (stockEl) stockEl.textContent = `In Stock: ${prod.stock} Piece${prod.stock === 1 ? '' : 's'} Available`;

  // Render multi-angle gallery thumbnails (up to 10 angles)
  const allImages = (Array.isArray(prod.altImages) && prod.altImages.length > 0)
    ? prod.altImages.filter(img => img && img.trim())
    : [prod.image];

  const galleryContainer = document.getElementById("qvGalleryThumbnails");
  const countBadge = document.getElementById("qvImageCountBadge");
  if (countBadge) {
    countBadge.textContent = `${allImages.length} View${allImages.length === 1 ? '' : 's'}`;
  }

  if (galleryContainer) {
    galleryContainer.innerHTML = allImages.map((imgSrc, idx) => {
      const resolvedSrc = resolveAssetUrl(imgSrc);
      return `
      <button class="qv-thumb-btn ${idx === 0 ? 'active' : ''}" onclick="switchQuickViewImage('${resolvedSrc.replace(/'/g, "\\'")}', this)" title="View Angle ${idx + 1}" style="width: 52px; height: 52px; border-radius: 4px; overflow: hidden; border: 2px solid ${idx === 0 ? 'var(--gold-primary)' : 'var(--border-color)'}; background: #000; flex-shrink: 0; cursor: pointer; padding: 0;">
        <img src="${resolvedSrc}" alt="View Angle ${idx + 1}" style="width: 100%; height: 100%; object-fit: cover;" />
      </button>
    `;}).join("");
  }

  // Render option selectors
  renderQuickViewOptions(prod);

  // Apply product-specific SEO and Schema.org rich snippet
  applyProductSEO(prod);

  if (modal) modal.classList.add("active");
}

function switchQuickViewImage(imgUrl, btn) {
  const imgEl = document.getElementById("qvImage");
  if (imgEl) {
    imgEl.src = resolveAssetUrl(imgUrl);
  }
  document.querySelectorAll(".qv-thumb-btn").forEach(b => {
    b.classList.remove("active");
    b.style.borderColor = "var(--border-color)";
  });
  if (btn) {
    btn.classList.add("active");
    btn.style.borderColor = "var(--gold-primary)";
  }
}
window.switchQuickViewImage = switchQuickViewImage;

function closeQuickView() {
  const modal = document.getElementById("quickviewModalBackdrop");
  if (modal) modal.classList.remove("active");
  activeQuickViewProduct = null;
  restoreSiteSEO();
}

function renderQuickViewOptions(prod) {
  const finishContainer = document.getElementById("qvFinishButtons");
  const sizeContainer = document.getElementById("qvSizeButtons");

  if (finishContainer) {
    finishContainer.innerHTML = "";
    if (finishContainer.parentElement) {
      finishContainer.parentElement.style.display = "none";
    }
  }

  if (sizeContainer) {
    sizeContainer.innerHTML = "";
    if (sizeContainer.parentElement) {
      sizeContainer.parentElement.style.display = "none";
    }
  }
}

function selectQuickViewFinish(finish) {
  currentSelectedFinish = finish;
}

function selectQuickViewSize(size) {
  currentSelectedSize = size;
}

function handleQuickViewAddToCart() {
  if (!activeQuickViewProduct) return;
  const finish = activeQuickViewProduct.metal || currentSelectedFinish || "22K Champagne Gold Plating";
  const size = "Standard";
  const cm = (typeof cartManager !== 'undefined' && cartManager) ? cartManager : window.cartManager;
  if (cm && typeof cm.addItem === 'function') {
    cm.addItem(activeQuickViewProduct.id, 1, finish, size);
  }
  closeQuickView();
  if (typeof openCartDrawer === 'function') {
    openCartDrawer();
  } else if (typeof window.openCartDrawer === 'function') {
    window.openCartDrawer();
  }
}

function handleQuickViewBuyNow() {
  if (!activeQuickViewProduct) return;
  const finish = activeQuickViewProduct.metal || currentSelectedFinish || "22K Champagne Gold Plating";
  const size = "Standard";
  checkoutManager.openCheckout({
    id: activeQuickViewProduct.id,
    quantity: 1,
    finish: finish,
    size: size
  });
}

// Loupe Magnifier Hover
function setupLoupeMagnifier() {
  const loupeBox = document.getElementById("qvLoupeBox");
  const loupeImg = document.getElementById("qvImage");
  if (!loupeBox || !loupeImg) return;

  loupeBox.addEventListener("mousemove", (e) => {
    const rect = loupeBox.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    loupeImg.style.transformOrigin = `${x}% ${y}%`;
    loupeImg.style.transform = "scale(2)";
  });

  loupeBox.addEventListener("mouseleave", () => {
    loupeImg.style.transformOrigin = "center center";
    loupeImg.style.transform = "scale(1)";
  });
}

// ==========================================================================
// 4. WISHLIST / VAULT DRAWER & CONTROLS
// ==========================================================================

function toggleWishlist(productId) {
  const idx = wishlistItems.indexOf(productId);
  const prod = PRODUCTS_DATA.find(p => p.id === productId);

  if (idx > -1) {
    wishlistItems.splice(idx, 1);
    if (window.showToast && prod) {
      window.showToast("Changes Saved Successfully", `${prod.name} removed from your saved list.`);
    }
  } else {
    wishlistItems.push(productId);
    if (window.showToast && prod) {
      window.showToast("Changes Saved Successfully", `${prod.name} saved to your favorites.`);
    }
  }

  localStorage.setItem("asmi_wishlist", JSON.stringify(wishlistItems));
  updateWishlistBadges();
  renderCatalog();
}

function updateWishlistBadges() {
  const count = wishlistItems.length;
  document.querySelectorAll(".wishlist-count-badge").forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  });
}

function openWishlistDrawer() {
  const drawer = document.getElementById("wishlistDrawer");
  const backdrop = document.getElementById("drawerBackdrop");
  renderWishlistItems();
  if (drawer) drawer.classList.add("active");
  if (backdrop) backdrop.classList.add("active");
}

function closeWishlistDrawer() {
  const drawer = document.getElementById("wishlistDrawer");
  const backdrop = document.getElementById("drawerBackdrop");
  if (drawer) drawer.classList.remove("active");
  if (backdrop && !document.getElementById("cartDrawer")?.classList.contains("active") && !document.getElementById("sideMenuDrawer")?.classList.contains("active")) {
    backdrop.classList.remove("active");
  }
}

function renderWishlistItems() {
  const listEl = document.getElementById("wishlistItemsList");
  if (!listEl) return;

  if (wishlistItems.length === 0) {
    listEl.innerHTML = `
      <div style="text-align: center; padding: 4rem 1rem;">
        <i class="fa-regular fa-heart" style="font-size: 2.5rem; color: var(--gold-primary); opacity: 0.6; margin-bottom: 1rem;"></i>
        <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-primary); margin-bottom: 0.5rem;">Your Wishlist is Empty</h4>
        <p style="font-size: 0.8125rem; color: var(--text-muted);">Save your favorite pearl, emerald, and diamond pieces by tapping the heart icon on any card.</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = wishlistItems.map(id => {
    const prod = PRODUCTS_DATA.find(p => p.id === id);
    if (!prod) return '';

    return `
      <div class="cart-item-row">
        <img src="${resolveAssetUrl(prod.image)}" alt="${prod.name}" class="cart-item-thumb">
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <h4 style="font-family: var(--font-serif); font-size: 0.95rem; color: var(--text-primary); line-height: 1.25;">${prod.name}</h4>
            <button onclick="toggleWishlist('${prod.id}'); renderWishlistItems();" style="background: none; border: none; color: var(--text-muted); cursor: pointer;"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <p style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--gold-primary); font-weight: 600; margin: 0.35rem 0;">
            ${formatPrice(prod.priceINR, null, prod.priceUSD)}
          </p>
          <button class="btn-primary" style="padding: 0.4rem 0.85rem; font-size: 0.65rem;" onclick="cartManager.addItem('${prod.id}', 1); toggleWishlist('${prod.id}'); renderWishlistItems(); openCartDrawer();">
            Move to Shopping Bag
          </button>
        </div>
      </div>
    `;
  }).join("");
}

// ==========================================================================
// 5. DRAWER CONTROLS (CART, WISHLIST & SIDE NAVIGATION MENU)
// ==========================================================================

function openSideMenu() {
  const drawer = document.getElementById("sideMenuDrawer");
  const backdrop = document.getElementById("drawerBackdrop");
  if (drawer) drawer.classList.add("active");
  if (backdrop) backdrop.classList.add("active");
}

function closeSideMenu() {
  const drawer = document.getElementById("sideMenuDrawer");
  const backdrop = document.getElementById("drawerBackdrop");
  if (drawer) drawer.classList.remove("active");
  if (backdrop && !document.getElementById("cartDrawer")?.classList.contains("active") && !document.getElementById("wishlistDrawer")?.classList.contains("active")) {
    backdrop.classList.remove("active");
  }
}

function openCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("drawerBackdrop");
  cartManager.renderCartDrawer();
  if (drawer) drawer.classList.add("active");
  if (backdrop) backdrop.classList.add("active");
}

function closeCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("drawerBackdrop");
  if (drawer) drawer.classList.remove("active");
  if (backdrop && !document.getElementById("wishlistDrawer")?.classList.contains("active") && !document.getElementById("sideMenuDrawer")?.classList.contains("active")) {
    backdrop.classList.remove("active");
  }
}

// ==========================================================================
// 6. 360° ATELIER TURNTABLE & 3D PHYSICAL ROTATION ENGINE
// ==========================================================================

const PIECES_360_DATA = {
  "pearl-choker": {
    id: "asmi-custom-1791976015427",
    title: "Wine Royal Fresh Water Pearl with AD",
    category: "Glowing Pearls Collection",
    price: 2340,
    image: "assets/images/prod-asmi-custom-1791976015427-1792741714178-5r87t.png",
    gemstone: "100% Real Fresh Water Round Pearl",
    accent: "American Diamonds",
    metal: "Silver Polish AD Paisley",
    hallmark: "IGL Certified Authentic",
    finish: "Silver Polish",
    size: "18\" Approx"
  },
  "emerald-choker": {
    id: "asmi-em-001",
    title: "Royal Zambian Emerald & Diamond Choker",
    category: "Royal Emeralds Collection",
    price: 8999,
    image: "assets/images/emerald-necklace.jpg",
    gemstone: "Natural Zambian Emerald (7.2 Carats)",
    accent: "Sparkling American Diamonds (VVS Clarity)",
    metal: "Pure 925 Sterling Silver with 22K Gold Finish",
    hallmark: "BIS Hallmarked & Certified Authentic",
    finish: "22K Gold Plated",
    size: "16\" Choker"
  },
  "emerald-ring": {
    id: "asmi-st-001",
    title: "Floral Diamond Brooch & Choker Pendant",
    category: "Sparkling Diamonds Collection",
    price: 3499,
    image: "assets/images/diamond-brooch.png",
    gemstone: "Micro-Set VVS-Grade American Diamonds",
    accent: "Petal Cut Sparkle Stones",
    metal: "Pure 925 Sterling Silver with Rhodium Polish",
    hallmark: "BIS 925 Stamp Guaranteed",
    finish: "Rhodium Polish",
    size: "2-in-1 Brooch / Pendant"
  },
  "polki-set": {
    id: "asmi-em-003",
    title: "The Sitara Emerald & Button Pearl Choker",
    category: "Royal Emeralds Collection",
    price: 6999,
    image: "assets/images/emerald-sitara.png",
    gemstone: "Rich Forest Green Emeralds & Natural Button Pearls",
    accent: "Baguette & Round Diamond Accents",
    metal: "22K Gold Plated Finish",
    hallmark: "BIS Hallmarked & Insured",
    finish: "22K Gold Plated",
    size: "Adjustable Choker"
  }
};

let current360PieceKey = "pearl-choker";
let current360Degrees = 0;
let auto360Timer = null;
let is360Zoomed = false;
let is360Bright = false;

function getAngleDescription(deg) {
  const norm = ((Math.round(deg) % 360) + 360) % 360;
  if (norm >= 340 || norm <= 20) return `${norm}° — Frontal Masterpiece View`;
  if (norm > 20 && norm < 70) return `${norm}° — Right Facet Lustre`;
  if (norm >= 70 && norm <= 110) return `${norm}° — Right Profile Silhouette`;
  if (norm > 110 && norm < 160) return `${norm}° — Three-Quarter Back View`;
  if (norm >= 160 && norm <= 200) return `${norm}° — Reverse Clasp & Gold Setting`;
  if (norm > 200 && norm < 250) return `${norm}° — Three-Quarter Left View`;
  if (norm >= 250 && norm <= 290) return `${norm}° — Left Profile Silhouette`;
  return `${norm}° — Left Facet Lustre`;
}

function render360Rotation() {
  const wrapper = document.getElementById("turntableObjectWrapper");
  const img = document.getElementById("turntableImage");
  const glint = document.getElementById("turntableGlint");
  const shadow = document.getElementById("turntableShadow");
  const desc = document.getElementById("degreeIndicator");
  const slider = document.getElementById("rotationSlider");

  const normalized = ((Math.round(current360Degrees) % 360) + 360) % 360;
  const rad = (normalized * Math.PI) / 180;

  // 1. 3D Continuous Perspective Rotation
  if (wrapper) {
    const scaleVal = is360Zoomed ? 1.35 : 1;
    wrapper.style.transform = `rotateY(${normalized}deg) scale(${scaleVal})`;
  }

  // 2. Dynamic Specular Glint & Light Reflection across 360°
  if (glint) {
    const glintX = Math.round(50 + Math.sin(rad) * 35);
    const glintY = Math.round(40 + Math.cos(rad) * 20);
    const glintOpacity = 0.25 + Math.abs(Math.cos(rad)) * 0.45;
    glint.style.background = `radial-gradient(circle at ${glintX}% ${glintY}%, rgba(255, 255, 255, 0.95) 0%, rgba(212, 175, 55, 0.2) 35%, transparent 65%)`;
    glint.style.opacity = glintOpacity.toString();
  }

  // 3. Dynamic Plinth Shadow Scaling & Offset
  if (shadow) {
    const scaleX = 0.85 + Math.abs(Math.cos(rad)) * 0.15;
    const skewX = Math.sin(rad) * 12;
    shadow.style.transform = `rotateX(65deg) scale(${scaleX}, 0.9) skewX(${skewX}deg)`;
  }

  // 4. Optical Lighting / Filter on the Jewelry Image
  if (img) {
    const brightness = (0.92 + Math.cos(rad * 2) * 0.12) * (is360Bright ? 1.25 : 1);
    const contrast = is360Bright ? 1.2 : 1.05;
    const shadowOffsetX = Math.sin(rad) * -12;
    img.style.filter = `brightness(${brightness.toFixed(2)}) contrast(${contrast}) drop-shadow(${shadowOffsetX.toFixed(1)}px 16px 25px rgba(0,0,0,0.65))`;
  }

  // 5. Update HUD and Slider
  if (desc) {
    desc.textContent = `Angle: ${getAngleDescription(normalized)}`;
  }
  if (slider && document.activeElement !== slider) {
    slider.value = normalized;
  }
}

function set360Angle(deg) {
  current360Degrees = ((Number(deg) % 360) + 360) % 360;
  render360Rotation();
}

function rotate360Step(stepDeg) {
  current360Degrees = ((current360Degrees + stepDeg) % 360 + 360) % 360;
  render360Rotation();
}

function switch360Piece(pieceKey, btnElement) {
  let data = PIECES_360_DATA[pieceKey];
  if (!data) return;
  const prods = (typeof PRODUCTS_DATA !== 'undefined' && Array.isArray(PRODUCTS_DATA)) ? PRODUCTS_DATA : (window.PRODUCTS_DATA || []);
  const matching = prods.find(p => p.id === data.id);
  if (matching) {
    data = {
      ...data,
      title: matching.name || data.title,
      price: matching.priceINR || data.price,
      image: matching.image || data.image,
      gemstone: matching.gemstone || data.gemstone,
      accent: matching.accentStones || data.accent,
      metal: matching.metal || data.metal,
      hallmark: matching.hallmark || data.hallmark
    };
  }
  current360PieceKey = pieceKey;

  // Update tabs
  document.querySelectorAll(".atelier-tab-btn").forEach(btn => btn.classList.remove("active"));
  if (btnElement) {
    btnElement.classList.add("active");
  } else {
    const matchingBtn = document.querySelector(`.atelier-tab-btn[onclick*="${pieceKey}"]`);
    if (matchingBtn) matchingBtn.classList.add("active");
  }

  // Update Turntable Image for the selected piece
  const img = document.getElementById("turntableImage");
  if (img) {
    img.src = resolveAssetUrl(data.image);
    img.alt = `360 View of ${data.title}`;
  }

  // Update Details Panel
  const catTag = document.getElementById("atelierCategoryTag");
  const titleEl = document.getElementById("atelierPieceTitle");
  const priceEl = document.getElementById("atelierPiecePrice");
  const gemEl = document.getElementById("atelierGemstone");
  const accentEl = document.getElementById("atelierAccent");
  const metalEl = document.getElementById("atelierMetal");
  const hallEl = document.getElementById("atelierHallmark");
  const buyBtn = document.getElementById("atelierBuyBtn");
  const qvBtn = document.getElementById("atelierQuickViewBtn");

  if (catTag) catTag.textContent = data.category;
  if (titleEl) titleEl.textContent = data.title;
  if (priceEl) priceEl.textContent = formatPrice(data.price);
  if (gemEl) gemEl.textContent = data.gemstone;
  if (accentEl) accentEl.textContent = data.accent;
  if (metalEl) metalEl.textContent = data.metal;
  if (hallEl) hallEl.textContent = data.hallmark;

  if (buyBtn) {
    buyBtn.onclick = () => {
      if (window.checkoutManager) {
        window.checkoutManager.openCheckout({
          id: data.id,
          quantity: 1,
          finish: data.finish,
          size: data.size
        });
      }
    };
  }

  if (qvBtn) {
    qvBtn.onclick = () => {
      if (typeof window.openQuickView === "function") {
        window.openQuickView(data.id);
      }
    };
  }

  render360Rotation();
}

function toggle360AutoSpin() {
  const btn = document.getElementById("autoSpinBtn");
  const lbl = document.getElementById("autoSpinLabel");

  if (auto360Timer) {
    clearInterval(auto360Timer);
    auto360Timer = null;
    if (lbl) lbl.textContent = "Auto Spin";
    if (btn) btn.classList.remove("active");
  } else {
    if (lbl) lbl.textContent = "Stop Orbit";
    if (btn) btn.classList.add("active");
    auto360Timer = setInterval(() => {
      current360Degrees = (current360Degrees + 1) % 360;
      render360Rotation();
    }, 30);
  }
}

// ==========================================================================
// 7. FAT JACKET ZIPPER HERO CONTROLLER
// ==========================================================================
// 7. FAT JACKET ZIPPER CONTROLLER (HIGH-PERFORMANCE RAF ENGINE)
// ==========================================================================

let isHeroUnzipped = false;

function playZipperSound(unzip = true) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    const dur = 0.12;

    osc.type = "sine";
    if (unzip) {
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + dur);
    } else {
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + dur);
    }

    gain.gain.setValueAtTime(0.025, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + dur);
  } catch(e) {}
}

function openHeroZipper(showToastNotification = false) {
  const hero = document.getElementById("heroSection");
  if (!hero || hero.classList.contains("unzipped")) return;
  
  window.requestAnimationFrame(() => {
    hero.classList.add("unzipped");
    isHeroUnzipped = true;
    playZipperSound(true);
    if (showToastNotification && window.showToast) {
      window.showToast("Collection Unzipped", "Welcome to ASMI Haute Joaillerie.");
    }
  });
}

function closeHeroZipper(showToastNotification = true) {
  const hero = document.getElementById("heroSection");
  if (!hero || !hero.classList.contains("unzipped")) return;
  
  window.requestAnimationFrame(() => {
    hero.classList.remove("unzipped");
    isHeroUnzipped = false;
    playZipperSound(false);
    if (showToastNotification && window.showToast) {
      window.showToast("Vault Locked", "Zipper closed.");
    }
  });
}

function toggleHeroZipper(e) {
  if (e) e.stopPropagation();
  if (isHeroUnzipped) {
    closeHeroZipper(true);
  } else {
    openHeroZipper(true);
  }
}

// ==========================================================================
// 8. CURRENCY CONTROLLER (INR ₹ & USD $)
// ==========================================================================

function setCurrency(currencyCode = "INR") {
  const code = (currencyCode === "USD") ? "USD" : "INR";
  currentCurrency = code;
  localStorage.setItem("asmi_currency", code);

  // Sync all currency selectors across header / modal / UI
  document.querySelectorAll(".currency-select-input, #currencySelector, #currencySelectorHeader").forEach(el => {
    el.value = code;
  });

  // Re-render catalog, cart & quickview with active currency prices
  renderCatalog();
  if (window.cartManager) {
    cartManager.updateBadges();
    cartManager.renderCartDrawer();
  }
  if (window.adminManager && typeof window.adminManager.renderProductsTable === "function") {
    window.adminManager.renderProductsTable();
  }

  // Update 360 spec price
  if (typeof PIECES_360_DATA !== "undefined" && typeof current360PieceKey !== "undefined") {
    const currPiece = PIECES_360_DATA[current360PieceKey];
    const specPriceEl = document.getElementById("atelierPiecePrice");
    if (specPriceEl && currPiece) {
      specPriceEl.textContent = formatPrice(currPiece.price);
    }
  }

  window.dispatchEvent(new CustomEvent("currencyChanged", { detail: { currency: code } }));
}

function toggleCurrency() {
  const next = (currentCurrency === "INR") ? "USD" : "INR";
  setCurrency(next);
}

// ==========================================================================
// 9. VIP CONCIERGE APPOINTMENT SCHEDULING
// ==========================================================================

function handleConciergeSubmit(e) {
  e.preventDefault();
  const form = document.getElementById("consultationForm");
  if (!form) return;

  const refCode = `ASMI-BOOK-${Math.floor(1000 + Math.random() * 9000)}`;
  const successEl = document.getElementById("consultationSuccess");
  
  if (successEl) {
    successEl.innerHTML = `
      <div style="background: rgba(212, 175, 55, 0.15); border: 1px solid var(--gold-primary); padding: 1rem; color: var(--gold-primary); margin-top: 1rem;">
        <i class="fa-solid fa-check-circle" style="margin-right: 0.5rem;"></i>
        <strong>Design Consultation Confirmed (Booking ID: ${refCode})</strong>
        <p style="font-size: 0.75rem; color: var(--text-primary); margin-top: 0.25rem;">
          Our jewelry designer will reach out to you via WhatsApp and Email within 4 business hours.
        </p>
      </div>
    `;
    successEl.style.display = "block";
  }

  form.reset();
  window.showToast("Changes Saved Successfully", `Consultation appointment confirmed. Booking ID: ${refCode}`);
}

// ==========================================================================
// 10. INITIALIZATION
// ==========================================================================

// Storefront Settings Controller
function applyStorefrontSettings() {
  try {
    const raw = localStorage.getItem("asmi_site_settings");
    const s = raw ? JSON.parse(raw) : {};
    if (window.asmiSync && typeof window.asmiSync.applyAllStorefrontCustomizations === "function") {
      window.asmiSync.applyAllStorefrontCustomizations(s);
    }
  } catch (e) {}
}

document.addEventListener("DOMContentLoaded", () => {
  // 0. Apply Storefront Settings (Universal Customizations from Admin)
  applyStorefrontSettings();

  // Dynamic Category Filter Pills from Admin
  if (window.asmiSync && typeof window.asmiSync.syncStorefrontCategoryPills === "function") {
    try {
      const cats = JSON.parse(localStorage.getItem("asmi_categories_data") || "[]");
      if (Array.isArray(cats) && cats.length > 0) {
        window.asmiSync.syncStorefrontCategoryPills(cats);
      }
    } catch(e) {}
  }

  // 1. Initialize Theme Mode
  const savedTheme = localStorage.getItem("asmi_theme_mode");
  if (savedTheme === "light") {
    applyTheme(true);
  } else {
    const s = JSON.parse(localStorage.getItem("asmi_site_settings") || "{}");
    if (s.activeThemeId && window.asmiSync) {
      window.asmiSync.applyActiveTheme(s.activeThemeId, false, true);
    } else {
      applyTheme(false); // Default Noir Mode
    }
  }

  // 2. Initialize Currency
  const savedCurrency = localStorage.getItem("asmi_currency") || "INR";
  currentCurrency = (savedCurrency === "USD") ? "USD" : "INR";
  document.querySelectorAll(".currency-select-input, #currencySelector, #currencySelectorHeader").forEach(el => {
    el.value = currentCurrency;
  });

  // 3. Render Catalog
  renderCatalog();
  cartManager.updateBadges();
  updateWishlistBadges();
  setupLoupeMagnifier();

  // Initialize 360 Studio Turntable
  render360Rotation();

  // Initialize Home Reviews & Orders List
  if (window.reviewsManager) {
    window.reviewsManager.renderHomeReviews("all");
  }
  if (window.ordersManager) {
    window.ordersManager.renderOrdersList();
  }

  // 4. Category Filter Event Listeners
  document.querySelectorAll(".filter-pill[data-category]").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".filter-pill[data-category]").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeCategory = pill.dataset.category;
      renderCatalog();
    });
  });

  // 5. Sort Selector Listener
  const sortSelect = document.getElementById("sortSelector");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      activeSort = e.target.value;
      renderCatalog();
    });
  }

  // 6. Search Input Listener (Live Search)
  const searchInput = document.getElementById("searchInputMain");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      activeCategory = "all";
      document.querySelectorAll(".filter-pill").forEach(p => {
        p.classList.toggle("active", p.dataset.category === "all");
      });
      activeSearchQuery = e.target.value;
      renderCatalog();
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearchSubmit(e);
      }
    });
  }

  // Global Keyboard Shortcuts (Ctrl+K or / to open search, Escape to close)
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey && e.key.toLowerCase() === "k") || (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA")) {
      e.preventDefault();
      openSearchBar();
    }
    if (e.key === "Escape") {
      closeSearchBar();
    }
  });

  // 7. Interactive 360° Cursor Drag Controller (Physically rotate jewelry product continuously with cursor)
  const ttBox = document.getElementById("turntableBox");
  if (ttBox) {
    let isDragging = false;
    let startX = 0;
    let startAngle = 0;

    const startDrag = (clientX) => {
      isDragging = true;
      startX = clientX;
      startAngle = current360Degrees;
      ttBox.classList.add("dragging");
      ttBox.classList.add("has-interacted");

      // Pause auto-spin during user manual interaction
      if (auto360Timer) {
        toggle360AutoSpin();
      }
    };

    const moveDrag = (clientX) => {
      if (!isDragging) return;
      const deltaX = clientX - startX;
      // Dragging left or right physically turns the jewelry piece continuously (0.75 deg per px)
      current360Degrees = ((startAngle - deltaX * 0.75) % 360 + 360) % 360;
      render360Rotation();
    };

    const stopDrag = () => {
      if (isDragging) {
        isDragging = false;
        ttBox.classList.remove("dragging");
      }
    };

    // Mouse Events
    ttBox.addEventListener("mousedown", (e) => {
      e.preventDefault();
      startDrag(e.clientX);
    });

    window.addEventListener("mousemove", (e) => {
      if (isDragging) {
        e.preventDefault();
        moveDrag(e.clientX);
      }
    });

    window.addEventListener("mouseup", stopDrag);

    // Touch Events for Mobile / Tablet
    ttBox.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        startDrag(e.touches[0].clientX);
      }
    }, { passive: true });

    ttBox.addEventListener("touchmove", (e) => {
      if (isDragging && e.touches.length === 1) {
        moveDrag(e.touches[0].clientX);
      }
    }, { passive: true });

    ttBox.addEventListener("touchend", stopDrag);
    ttBox.addEventListener("touchcancel", stopDrag);
  }

  // Turntable Slider & Buttons
  const slider = document.getElementById("rotationSlider");
  if (slider) {
    slider.addEventListener("input", (e) => {
      current360Degrees = parseFloat(e.target.value) || 0;
      render360Rotation();
    });
  }

  const prev360Btn = document.getElementById("prevAngleBtn");
  if (prev360Btn) {
    prev360Btn.addEventListener("click", () => rotate360Step(-45));
  }

  const next360Btn = document.getElementById("nextAngleBtn");
  if (next360Btn) {
    next360Btn.addEventListener("click", () => rotate360Step(45));
  }

  const autoSpinBtn = document.getElementById("autoSpinBtn");
  if (autoSpinBtn) {
    autoSpinBtn.addEventListener("click", toggle360AutoSpin);
  }

  // 360 Loupe & Lighting Contrast
  const zoomBtn = document.getElementById("zoomToggleBtn");
  const lightBtn = document.getElementById("lightToggleBtn");

  if (zoomBtn) {
    zoomBtn.addEventListener("click", () => {
      is360Zoomed = !is360Zoomed;
      zoomBtn.classList.toggle("active", is360Zoomed);
      render360Rotation();
    });
  }

  if (lightBtn) {
    lightBtn.addEventListener("click", () => {
      is360Bright = !is360Bright;
      lightBtn.classList.toggle("active", is360Bright);
      render360Rotation();
    });
  }

  // Credit card live formatting in checkout
  const cardInput = document.getElementById("card_number");
  const cardDisplay = document.getElementById("cardNumDisplay");
  if (cardInput && cardDisplay) {
    cardInput.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, "").substring(0, 16);
      let formatted = val.match(/.{1,4}/g)?.join(" ") || "•••• •••• •••• ••••";
      e.target.value = val.match(/.{1,4}/g)?.join(" ") || "";
      cardDisplay.textContent = formatted;
    });
  }

  const cardHolderInput = document.getElementById("card_holder");
  const cardHolderDisplay = document.getElementById("cardHolderDisplay");
  if (cardHolderInput && cardHolderDisplay) {
    cardHolderInput.addEventListener("input", (e) => {
      cardHolderDisplay.textContent = e.target.value.toUpperCase() || "GAYATRI ROY";
    });
  }

  const cardExpiryInput = document.getElementById("card_expiry");
  const cardExpiryDisplay = document.getElementById("cardExpiryDisplay");
  if (cardExpiryInput && cardExpiryDisplay) {
    cardExpiryInput.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, "").substring(0, 4);
      if (val.length >= 2) {
        val = val.substring(0, 2) + "/" + val.substring(2);
      }
      e.target.value = val;
      cardExpiryDisplay.textContent = val || "MM/YY";
    });
  }
  // 8. Fat Jacket Zipper Controller & Scroll / Wheel Unzip Triggers (Ultra-Smooth RAF Engine)
  const heroSection = document.getElementById("heroSection");
  if (heroSection) {
    heroSection.classList.add("unzipped");
    isHeroUnzipped = true;

    // High-performance RAF scroll listener
    let scrollRafTicking = false;
    window.addEventListener("scroll", () => {
      if (!scrollRafTicking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 15 && !isHeroUnzipped) {
            openHeroZipper(false);
          }
          scrollRafTicking = false;
        });
        scrollRafTicking = true;
      }
    }, { passive: true });

    // Smooth wheel trigger (instant response without blocking scroll)
    window.addEventListener("wheel", (e) => {
      if (e.deltaY > 5 && !isHeroUnzipped) {
        openHeroZipper(false);
      }
    }, { passive: true });

    // Touch swipe unzip for mobile devices
    let touchStartY = 0;
    heroSection.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) touchStartY = e.touches[0].clientY;
    }, { passive: true });

    heroSection.addEventListener("touchmove", (e) => {
      if (e.touches.length === 1 && !isHeroUnzipped) {
        const deltaY = e.touches[0].clientY - touchStartY;
        if (Math.abs(deltaY) > 15) {
          openHeroZipper(false);
        }
      }
    }, { passive: true });
  }

  // 9. Direct Product SEO URL Routing (?product=id or #product/id)
  const urlParams = new URLSearchParams(window.location.search);
  const prodParam = urlParams.get("product");
  const hash = window.location.hash;
  if (prodParam) {
    setTimeout(() => openQuickView(prodParam), 250);
  } else if (hash && hash.startsWith("#product/")) {
    const hashId = hash.replace("#product/", "").trim();
    setTimeout(() => openQuickView(hashId), 250);
  }

  // 10. Direct Privilege Coupon & Digital Gift Card Auto-Application (?coupon=CODE or ?giftcard=CODE)
  const couponParam = urlParams.get("coupon") || urlParams.get("promo");
  const giftCardParam = urlParams.get("giftcard") || urlParams.get("voucher");
  if (couponParam && window.cartManager) {
    setTimeout(() => {
      const res = window.cartManager.validateCoupon(couponParam, true);
      if (res && res.valid && window.showToast) {
        window.showToast("Privilege Token Applied", `Coupon [${couponParam.toUpperCase()}] is active for your shopping bag!`);
      }
    }, 400);
  } else if (giftCardParam && window.cartManager) {
    setTimeout(() => {
      const res = window.cartManager.validateCoupon(giftCardParam, true);
      if (res && res.valid && window.showToast) {
      }
    }, 400);
  }

  // 11. Direct Admin Console & Orders Deep Linking (?admin=open or ?orders=open or #openAdmin or #orders)
  const adminParam = urlParams.get("admin");
  const ordersParam = urlParams.get("orders");
  if ((adminParam === "open" || hash === "#openAdmin" || hash === "#admin")) {
    window.open("admin.html", "_blank");
  } else if ((ordersParam === "open" || hash === "#orders" || hash === "#my-orders") && window.ordersManager) {
    setTimeout(() => {
      window.ordersManager.openOrdersModal();
    }, 300);
  }

  // 12. Initialize Atmospheric Royal Luxury Background (Jaali Lattice, Auroras & Diamond Stardust)
  initLuxuryBackgroundEngine();
});

// ==========================================================================
// 12. ATMOSPHERIC ROYAL LUXURY BACKGROUND ENGINE
// ==========================================================================

function initLuxuryBackgroundEngine() {
  const canvas = document.getElementById("luxuryBgCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = window.innerWidth;
  let height = window.innerHeight;
  let animationFrameId = null;
  let rawMouseX = -1000;
  let rawMouseY = -1000;
  let targetMouseX = 0;
  let targetMouseY = 0;
  let mouseX = 0;
  let mouseY = 0;

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas, { passive: true });

  window.addEventListener("mousemove", (e) => {
    rawMouseX = e.clientX;
    rawMouseY = e.clientY;
    targetMouseX = (e.clientX / width - 0.5) * 2;
    targetMouseY = (e.clientY / height - 0.5) * 2;
  }, { passive: true });

  window.addEventListener("mouseleave", () => {
    rawMouseX = -1000;
    rawMouseY = -1000;
    targetMouseX = 0;
    targetMouseY = 0;
  }, { passive: true });

  // Sparkling Stars Particle Population
  const STAR_COUNT = Math.min(85, Math.max(48, Math.floor((width * height) / 20000)));
  const stars = [];

  for (let i = 0; i < STAR_COUNT; i++) {
    const isGold = Math.random() < 0.35;
    const isLarge = Math.random() < 0.22;
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: isLarge ? (1.8 + Math.random() * 1.6) : (0.9 + Math.random() * 1.1),
      baseAlpha: isLarge ? (0.35 + Math.random() * 0.45) : (0.2 + Math.random() * 0.4),
      vy: -(0.18 + Math.random() * 0.35),
      vx: (Math.random() - 0.5) * 0.18,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.02 + Math.random() * 0.04,
      isGold: isGold,
      isLarge: isLarge,
      sparkleTimer: Math.floor(Math.random() * 160),
      sparkleLife: 0,
      sparkleMaxLife: 45 + Math.floor(Math.random() * 25),
      rotation: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.015
    });
  }

  // Draw 4-Pointed or 8-Pointed Brilliant Diamond Flare Star
  function drawSparkleStar(cx, cy, radius, alpha, isGold, isEightPoint) {
    ctx.save();
    ctx.translate(cx, cy);

    const isLightMode = document.body.classList.contains("light-mode");
    const colorCore = isLightMode
      ? (isGold ? `rgba(180, 130, 20, ${alpha})` : `rgba(30, 30, 30, ${alpha})`)
      : (isGold ? `rgba(255, 245, 200, ${alpha})` : `rgba(255, 255, 255, ${alpha})`);
    const colorGlow = isLightMode
      ? (isGold ? `rgba(212, 175, 55, ${alpha * 0.5})` : `rgba(100, 100, 100, ${alpha * 0.4})`)
      : (isGold ? `rgba(235, 205, 120, ${alpha * 0.75})` : `rgba(220, 240, 255, ${alpha * 0.75})`);

    // Radiant soft flare aura
    const glowRadius = radius * 3.5;
    const aura = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius);
    aura.addColorStop(0, colorGlow);
    aura.addColorStop(1, "transparent");
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
    ctx.fill();

    // Primary 4-pointed diamond star rays
    ctx.fillStyle = colorGlow;
    ctx.beginPath();
    ctx.moveTo(0, -radius * 3.2);
    ctx.lineTo(radius * 0.35, -radius * 0.35);
    ctx.lineTo(radius * 3.2, 0);
    ctx.lineTo(radius * 0.35, radius * 0.35);
    ctx.lineTo(0, radius * 3.2);
    ctx.lineTo(-radius * 0.35, radius * 0.35);
    ctx.lineTo(-radius * 3.2, 0);
    ctx.lineTo(-radius * 0.35, -radius * 0.35);
    ctx.closePath();
    ctx.fill();

    // Secondary 8-pointed diagonal rays for spectacular glints
    if (isEightPoint) {
      ctx.save();
      ctx.rotate(Math.PI / 4);
      ctx.beginPath();
      const diagRay = radius * 2.0;
      const diagW = radius * 0.25;
      ctx.moveTo(0, -diagRay);
      ctx.lineTo(diagW, -diagW);
      ctx.lineTo(diagRay, 0);
      ctx.lineTo(diagW, diagW);
      ctx.lineTo(0, diagRay);
      ctx.lineTo(-diagW, diagW);
      ctx.lineTo(-diagRay, 0);
      ctx.lineTo(-diagW, -diagW);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Crisp bright central star core
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.75, 0, Math.PI * 2);
    ctx.fillStyle = colorCore;
    ctx.fill();

    ctx.restore();
  }

  // Draw Standard Ambient Twinkling Star (Faceted Cross Shape)
  function drawTwinklingStar(cx, cy, radius, alpha, isGold, rot) {
    ctx.save();
    ctx.translate(cx, cy);
    if (rot) ctx.rotate(rot);

    const isLightMode = document.body.classList.contains("light-mode");
    const color = isLightMode
      ? (isGold ? `rgba(180, 130, 20, ${alpha})` : `rgba(40, 40, 40, ${alpha})`)
      : (isGold ? `rgba(255, 235, 175, ${alpha})` : `rgba(255, 255, 255, ${alpha})`);

    // 4-pointed micro diamond cross
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, -radius * 2.2);
    ctx.lineTo(radius * 0.32, -radius * 0.32);
    ctx.lineTo(radius * 2.2, 0);
    ctx.lineTo(radius * 0.32, radius * 0.32);
    ctx.lineTo(0, radius * 2.2);
    ctx.lineTo(-radius * 0.32, radius * 0.32);
    ctx.lineTo(-radius * 2.2, 0);
    ctx.lineTo(-radius * 0.32, -radius * 0.32);
    ctx.closePath();
    ctx.fill();

    // Central bright dot
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = isLightMode ? "#222" : "#FFFFFF";
    ctx.fill();

    ctx.restore();
  }

  let isPageVisible = !document.hidden;
  document.addEventListener("visibilitychange", () => {
    isPageVisible = !document.hidden;
    if (isPageVisible && !animationFrameId) {
      loop();
    }
  });

  function loop() {
    if (!isPageVisible) {
      animationFrameId = null;
      return;
    }

    // Smooth subtle mouse inertia
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];

      // Slow celestial drift with depth-based parallax
      s.y += s.vy;
      s.x += s.vx + (mouseX * (s.isLarge ? 0.16 : 0.08));
      s.rotation += s.rotSpeed;

      // Wrap-around boundaries
      if (s.y < -25) { s.y = height + 25; s.x = Math.random() * width; }
      if (s.x < -25) s.x = width + 25;
      if (s.x > width + 25) s.x = -25;

      // Organic twinkling pulsation
      s.phase += s.phaseSpeed;
      const currentAlpha = Math.max(0.12, Math.min(0.98, s.baseAlpha + Math.sin(s.phase) * 0.38));

      // Trigger diamond flare glints periodically
      s.sparkleTimer++;
      if (s.sparkleTimer > 140 && Math.random() < 0.022 && s.sparkleLife <= 0) {
        s.sparkleLife = s.sparkleMaxLife;
        s.sparkleTimer = 0;
      }

      if (s.sparkleLife > 0) {
        s.sparkleLife--;
        const progress = s.sparkleLife / s.sparkleMaxLife;
        const flareAlpha = Math.sin(progress * Math.PI) * 0.98;
        const isEightPoint = s.isLarge && (i % 3 === 0);
        drawSparkleStar(s.x, s.y, s.size * 2.8, flareAlpha, s.isGold, isEightPoint);
      } else {
        // Draw elegant twinkling star
        drawTwinklingStar(s.x, s.y, s.size, currentAlpha, s.isGold, s.rotation);
      }
    }

    animationFrameId = requestAnimationFrame(loop);
  }

  animationFrameId = requestAnimationFrame(loop);
}

// Global Window Exports
window.applyProductSEO = applyProductSEO;
window.restoreSiteSEO = restoreSiteSEO;
window.openSearchBar = openSearchBar;
window.closeSearchBar = closeSearchBar;
window.toggleSearchBar = toggleSearchBar;
window.handleSearchSubmit = handleSearchSubmit;
window.quickSearch = quickSearch;
window.clearSearch = clearSearch;
window.openSideMenu = openSideMenu;
window.closeSideMenu = closeSideMenu;
window.openCartDrawer = openCartDrawer;
window.closeCartDrawer = closeCartDrawer;
window.openWishlistDrawer = openWishlistDrawer;
window.closeWishlistDrawer = closeWishlistDrawer;
window.openQuickView = openQuickView;
window.closeQuickView = closeQuickView;
window.handleQuickViewAddToCart = handleQuickViewAddToCart;
window.handleQuickViewBuyNow = handleQuickViewBuyNow;
window.toggleWishlist = toggleWishlist;
window.toggleTheme = toggleTheme;
window.toggleCurrency = toggleCurrency;
window.setCurrency = setCurrency;
window.renderCatalog = renderCatalog;
window.resetFilters = resetFilters;
window.quickAddLookbook = quickAddLookbook;
window.openLookbookQuickView = openLookbookQuickView;
window.filterByCategory = filterByCategory;
window.switch360Piece = switch360Piece;
window.rotate360Step = rotate360Step;
window.set360Angle = set360Angle;
window.toggle360AutoSpin = toggle360AutoSpin;
window.render360Rotation = render360Rotation;
window.openHeroZipper = openHeroZipper;
window.closeHeroZipper = closeHeroZipper;
window.toggleHeroZipper = toggleHeroZipper;
window.handleConciergeSubmit = handleConciergeSubmit;
window.initLuxuryBackgroundEngine = initLuxuryBackgroundEngine;

function exportStorefrontCataloguePDF() {
  const currentCat = (typeof activeCategory !== 'undefined' && activeCategory !== 'all') ? activeCategory : null;
  if (window.adminManager && typeof window.adminManager.exportProductsPDF === 'function') {
    window.adminManager.exportProductsPDF(currentCat);
  } else if (typeof window.exportProductsCatalogPDF === 'function') {
    window.exportProductsCatalogPDF(currentCat);
  } else {
    if (window.showToast) {
      window.showToast("Loading Engine", "Initializing high-resolution PDF catalogue engine...");
    }
    const script = document.createElement("script");
    script.src = "js/admin.js";
    script.onload = () => {
      if (window.adminManager) {
        window.adminManager.exportProductsPDF(currentCat);
      }
    };
    document.head.appendChild(script);
  }
}
window.exportStorefrontCataloguePDF = exportStorefrontCataloguePDF;
