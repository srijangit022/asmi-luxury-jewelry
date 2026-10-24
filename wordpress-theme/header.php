<?php
/**
 * ASMI Luxury Jewelry Store - Header Template
 *
 * @package ASMI_Jewelry
 */

if (!defined('ABSPATH')) {
    exit;
}
?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="scroll-smooth">
<head>
  <meta charset="<?php bloginfo('charset'); ?>"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover"/>
  <meta name="theme-color" content="#070707" id="metaThemeColor"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
  <meta name="format-detection" content="telephone=no"/>
  
  <!-- ASMI Luxury Asset Resolver Meta -->
  <meta name="asmi-theme-uri" content="<?php echo esc_url(ASMI_THEME_URI); ?>"/>
  <link rel="dns-prefetch" href="//fonts.googleapis.com"/>
  <link rel="dns-prefetch" href="//cdnjs.cloudflare.com"/>

  <script>
    window.ASMI_THEME_URI = "<?php echo esc_js(ASMI_THEME_URI); ?>";
    window.ASMI_SITE_URL = "<?php echo esc_js(home_url('/')); ?>";
  </script>

  <script>
    (function() {
      try {
        var s = JSON.parse(localStorage.getItem("asmi_site_settings") || "{}");
        if (s.announcementActive === false) {
          document.documentElement.classList.add("hide-announcement");
        }
      } catch (e) {}
    })();
  </script>
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php
if (function_exists('wp_body_open')) {
    wp_body_open();
}
?>

  <!-- ==========================================================================
       SPARKLING DIAMOND STARS BACKGROUND
       ========================================================================== -->
  <div class="luxury-bg-canvas-wrapper" id="luxuryBgWrapper" aria-hidden="true">
    <canvas id="luxuryBgCanvas"></canvas>
    <div class="luxury-bg-vignette"></div>
  </div>

  <?php 
  $ann_settings = get_option('asmi_site_settings', array());
  if (empty($ann_settings) && file_exists(get_template_directory() . '/data/settings.json')) {
    $ann_settings = json_decode(file_get_contents(get_template_directory() . '/data/settings.json'), true);
  }
  $ann_active = !isset($ann_settings['announcementActive']) || $ann_settings['announcementActive'] !== false;
  $ann_text = !empty($ann_settings['announcementText']) ? $ann_settings['announcementText'] : '✦ COMPLIMENTARY INSURED ARMORED DELIVERY & BIS 916 HALLMARK CERTIFICATION ACROSS INDIA ✦';
  ?>
  <!-- Top Announcement Ribbon Bar -->
  <div id="siteAnnouncementBanner" class="announcement-ribbon<?php echo !$ann_active ? ' hidden-ribbon' : ''; ?>" style="<?php echo !$ann_active ? 'display: none !important;' : ''; ?>">
    <span id="announcementBannerText"><?php echo esc_html($ann_text); ?></span>
  </div>

  <!-- ==========================================================================
       MAIN NAVIGATION HEADER
       ========================================================================== -->
  <header class="main-header" id="mainHeader">
    <div class="header-container">
      
      <!-- Left: 3-Line Menu Trigger & Brand Logo -->
      <div class="nav-left-group">
        <!-- Three-line Menu Button -->
        <button class="side-menu-trigger" onclick="openSideMenu()" title="Open Navigation Menu" aria-label="Open Navigation Menu">
          <span class="hamburger-lines">
            <span class="line line1"></span>
            <span class="line line2"></span>
            <span class="line line3"></span>
          </span>
          <span class="label-caps" style="font-size: 0.6875rem; letter-spacing: 0.12em;">Menu</span>
        </button>

        <!-- Brand Logo -->
        <a href="<?php echo esc_url(home_url('/')); ?>" class="brand-logo">
          <?php if (has_custom_logo()) : ?>
            <?php the_custom_logo(); ?>
          <?php else : ?>
            <span class="brand-logo-text">
              ASMI'S <span style="font-style: italic; color: var(--gold-primary); font-weight: 300;">Collection</span>
            </span>
            <span class="brand-logo-sub">
              Fine Pearls &amp; Handcrafted Jewelry
            </span>
          <?php endif; ?>
        </a>
      </div>

      <!-- Center: VIP Concierge & AI Jewelry Concierge Calling Options -->
      <div class="nav-center-group" style="display: flex; align-items: center; gap: 0.6rem;">
        <a href="tel:+919876543210" class="nav-phone-pill" id="navPhoneLink" title="Call VIP Concierge Support">
          <i class="fa-solid fa-phone"></i>
          <span class="phone-text" id="navPhoneText">+91 98765 43210</span>
        </a>
        <a href="javascript:void(0)" onclick="supportManager.openSupportModal('ai')" class="nav-phone-pill nav-ai-concierge-pill" id="navAiConciergeHeaderPill" title="AI Jewelry Concierge - 24/7 Fine Jewelry Guidance">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span class="phone-text">AI Jewelry Concierge</span>
        </a>
      </div>

      <!-- Right: Currency, Dark/Light Mode, Search, Wishlist, Bag, Book Call -->
      <div class="nav-actions">
        <!-- Multi-Currency Switcher (INR / USD) -->
        <div class="nav-currency-pill" title="Select Store Currency (INR / USD)">
          <i class="fa-solid fa-globe" style="font-size: 0.72rem; color: var(--gold-primary); margin-right: 0.2rem;"></i>
          <select id="currencySelectorHeader" onchange="setCurrency(this.value)" class="currency-select-input" style="background: transparent; border: none; color: var(--gold-primary); font-size: 0.75rem; font-weight: 700; cursor: pointer; outline: none;">
            <option value="INR" style="background: var(--bg-surface); color: var(--text-primary);">₹ INR</option>
            <option value="USD" style="background: var(--bg-surface); color: var(--text-primary);">$ USD</option>
          </select>
        </div>

        <!-- Dark / Light Mode Switcher Pill -->
        <button class="nav-theme-btn" id="headerThemeToggle" onclick="toggleTheme()" title="Switch between Dark (Noir) and Light (Ivoire) Modes" aria-label="Toggle Dark/Light Mode">
          <i class="fa-solid fa-moon theme-icon"></i>
          <span class="theme-label">Dark Mode</span>
        </button>

        <!-- Search Bar Button -->
        <button onclick="toggleSearchBar()" class="nav-icon-btn" title="Search Luxury Jewelry (Press Ctrl+K or /)" aria-label="Search Jewelry">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>

        <!-- Wishlist Button -->
        <button onclick="openWishlistDrawer()" class="nav-icon-btn" title="Saved Favorites" aria-label="Wishlist">
          <i class="fa-regular fa-heart"></i>
          <span class="wishlist-count-badge" style="position: absolute; top: -4px; right: -4px; background: var(--ruby-primary); color: #fff; font-size: 0.625rem; font-weight: 700; width: 18px; height: 18px; border-radius: 50% !important; display: none; align-items: center; justify-content: center; border: 1px solid var(--bg-primary);">0</span>
        </button>

        <!-- Shopping Bag Button -->
        <button onclick="openCartDrawer()" class="nav-icon-btn" title="Shopping Bag" aria-label="Shopping Bag">
          <i class="fa-solid fa-bag-shopping"></i>
          <span class="cart-count-badge" style="position: absolute; top: -4px; right: -4px; background: var(--gold-primary); color: #070707; font-size: 0.625rem; font-weight: 700; width: 18px; height: 18px; border-radius: 50% !important; display: none; align-items: center; justify-content: center; border: 1px solid var(--bg-primary);">0</span>
        </button>

        <!-- My Orders & Tracking Button -->
        <button onclick="ordersManager.openOrdersModal()" class="nav-icon-btn" title="My Orders &amp; Package Tracking" aria-label="My Orders">
          <i class="fa-solid fa-truck-fast"></i>
        </button>

        <!-- AI Jewelry Concierge Button -->
        <button onclick="supportManager.openSupportModal('ai')" class="nav-icon-btn nav-ai-concierge-btn" id="navAiConciergeBtn" title="AI Jewelry Concierge (24/7 Intelligent Fine Jewelry Assistant)" aria-label="AI Jewelry Concierge">
          <span class="nav-ai-icon-box">
            <i class="fa-solid fa-wand-magic-sparkles"></i>
            <span class="ai-micro-tag">AI</span>
          </span>
        </button>

        <!-- Patron Account / Sign In Pill -->
        <button class="nav-auth-btn" id="navAuthBtn" onclick="authManager.handleNavAuthClick()" title="Patron Login / VIP Portal" aria-label="Patron Account">
          <i class="fa-solid fa-user" id="navAuthIcon"></i>
          <span class="nav-auth-text" id="navAuthText">Sign In / VIP</span>
        </button>

        <!-- Book Consultation Action -->
        <a href="#consultationSection" class="btn-primary" style="padding: 0.55rem 1.15rem; font-size: 0.6875rem; white-space: nowrap;">
          Book Call
        </a>
      </div>
    </div>

    <!-- Interactive Search Bar Popdown -->
    <div id="searchDropdown" class="search-popdown-bar">
      <div class="search-popdown-inner">
        <form onsubmit="handleSearchSubmit(event)" style="display: flex; align-items: center; gap: 0.85rem; width: 100%;">
          <i class="fa-solid fa-magnifying-glass" style="color: var(--gold-primary); font-size: 1.1rem; flex-shrink: 0;"></i>
          <input type="text" id="searchInputMain" class="search-input-field" placeholder="Search by gemstone, pearl necklace, green emerald ring, choker set, diamond earrings..." autocomplete="off"/>
          <button type="button" id="clearSearchBtn" onclick="clearSearch()" style="background: none; border: none; color: var(--text-muted); cursor: pointer; padding: 0.3rem; font-size: 0.9rem;" title="Clear Search">
            <i class="fa-solid fa-circle-xmark"></i>
          </button>
          <button type="submit" class="btn-primary" style="padding: 0.55rem 1.25rem; font-size: 0.75rem; white-space: nowrap;">
            Search Catalog
          </button>
          <button type="button" onclick="closeSearchBar()" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.25rem; padding: 0.35rem;" title="Close Search">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </form>
        
        <!-- Popular Quick Search Suggestions -->
        <div class="search-suggestions-row">
          <span class="label-micro" style="color: var(--gold-primary);">Popular Searches:</span>
          <button type="button" class="search-tag-pill" onclick="quickSearch('pearl')">Glowing Pearls</button>
          <button type="button" class="search-tag-pill" onclick="quickSearch('emerald')">Green Emeralds</button>
          <button type="button" class="search-tag-pill" onclick="quickSearch('diamond')">Diamonds</button>
          <button type="button" class="search-tag-pill" onclick="quickSearch('ring')">Solitaire Rings</button>
          <button type="button" class="search-tag-pill" onclick="quickSearch('choker')">Choker Sets</button>
          <button type="button" class="search-tag-pill" onclick="quickSearch('polki')">Royal Polki Kundan</button>
        </div>
      </div>
    </div>
  </header>
