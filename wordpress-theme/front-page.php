<?php
/**
 * ASMI Luxury Jewelry Store - Front Page Template (Haute Joaillerie Atelier Homepage)
 *
 * @package ASMI_Jewelry
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header(); 

$asmi_settings = get_option('asmi_site_settings', asmi_get_default_json('settings.json'));
$asmi_hero_img = !empty($asmi_settings['heroModelImage']) ? $asmi_settings['heroModelImage'] : 'assets/images/hero-pearl-model.jpg';
$asmi_lb1_img  = !empty($asmi_settings['lookbook1Image']) ? $asmi_settings['lookbook1Image'] : 'assets/images/hero-pearl-model.jpg';
$asmi_lb2_img  = !empty($asmi_settings['lookbook2Image']) ? $asmi_settings['lookbook2Image'] : 'assets/images/muse-emerald-model.jpg';
$asmi_lb3_img  = !empty($asmi_settings['lookbook3Image']) ? $asmi_settings['lookbook3Image'] : 'assets/images/muse-polki-model.jpg';
?>

  <!-- ==========================================================================
       HERO - LUXURY DARK MONOCHROME & GOLD ATELIER SHOWCASE
       ========================================================================== -->
  <section class="hero-diagonal-section unzipped" id="heroSection">
    
    <!-- Left: Black Section (Typography & Luxury Writings) -->
    <div class="hero-black-pane">
      <div class="hero-black-content">
        
        <!-- Luxury Badge -->
        <div class="hero-black-badge">
          <span class="dot"></span>
          <span class="label-caps" id="heroBadgeText" style="color: var(--gold-primary); font-size: 0.6875rem; letter-spacing: 0.16em;">New Haute Joaillerie 2025</span>
        </div>

        <!-- Main Headline -->
        <h1 class="hero-black-title">
          <span id="heroTitleTop">Discover Handcrafted</span> <br/>
          <span class="gold-gradient-text" id="heroTitleHighlight" style="font-style: italic; font-weight: 400;">Luxury &amp; Elegance</span>
        </h1>

        <!-- Subheading -->
        <p class="hero-black-desc" id="heroDescription">
          A breathtaking collection of glowing Basra pearls, royal Colombian emeralds, and sparkling uncut diamonds — crafted with love for timeless royal elegance.
        </p>

        <!-- CTA Buttons -->
        <div class="hero-black-actions">
          <a href="#vaultSection" class="btn-primary" id="heroCtaPrimaryLink" onclick="filterByCategory('pearls'); document.getElementById('vaultSection').scrollIntoView({behavior: 'smooth'});">
            <span id="heroCtaPrimaryText">Explore Pearl Sets</span>
          </a>
          <a href="#vaultSection" class="btn-hero-white" id="heroCtaSecondaryLink" onclick="document.getElementById('vaultSection').scrollIntoView({behavior: 'smooth'});">
            <i class="fa-solid fa-gem text-xs"></i>
            <span id="heroCtaSecondaryText">Curated Vault</span>
          </a>
        </div>

        <!-- Spec Trust Counters -->
        <div class="hero-black-stats">
          <div>
            <p class="hero-stat-value" id="heroStat1Value">Grade AAA</p>
            <p class="hero-stat-label" id="heroStat1Label">Natural Luster Pearls</p>
          </div>
          <div>
            <p class="hero-stat-value" id="heroStat2Value">VVS1 Sparkle</p>
            <p class="hero-stat-label" id="heroStat2Label">Certified Gemstones</p>
          </div>
          <div>
            <p class="hero-stat-value" id="heroStat3Value">Pure 22K</p>
            <p class="hero-stat-label" id="heroStat3Label">BIS Hallmark Gold</p>
          </div>
        </div>

      </div>
    </div>

    <!-- Right: White Section with Model (Model has black background inside frame) -->
    <div class="hero-white-pane">
      <div class="hero-model-showcase">
        
        <div class="hero-model-frame">
          <img src="<?php echo esc_url(asmi_resolve_image_url($asmi_hero_img)); ?>" fetchpriority="high" decoding="async" alt="Indian royal model wearing handcrafted glowing multi-strand pearl jewelry set" class="hero-model-img" id="heroModelImg"/>
        </div>

        <!-- Masterpiece Showcase Card (Positioned outside the image frame) -->
        <div class="hero-floating-card">
          <div style="min-width: 0; display: flex; flex-direction: column; gap: 2px;">
            <span class="label-micro" id="heroFloatingSubtitle" style="color: var(--gold-primary); letter-spacing: 0.12em; font-size: 0.65rem; line-height: 1; display: block;">Asmi's Limited Collection</span>
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <h3 id="heroFloatingTitle" style="font-family: var(--font-serif); font-size: 0.92rem; color: var(--text-primary); margin: 0; line-height: 1.25; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 250px;">Wine Royal Fresh Water Pearl with AD</h3>
              <p id="heroFloatingPrice" style="font-family: var(--font-serif); font-size: 0.95rem; color: var(--gold-primary); font-weight: 700; margin: 0; line-height: 1.25; white-space: nowrap;">₹2,340</p>
            </div>
          </div>
          <button class="btn-primary" id="heroFloatingBtn" style="padding: 0.45rem 1rem; font-size: 0.7rem; white-space: nowrap; flex-shrink: 0;" onclick="acquireHeroSet()">
            <span id="heroFloatingBtnText">Acquire Set</span>
          </button>
        </div>

      </div>
    </div>

    <!-- ==========================================================================
         AUTHENTIC 3D JACKET UNZIPPING OVERLAY & METALLIC CHAIN
         ========================================================================== -->
    <div class="fat-zipper-overlay" id="fatZipperOverlay">
      
      <!-- 3D Perspective Stage -->
      <div class="jacket-3d-stage">
        
        <!-- Left Jacket Panel (Foldable Lapel & Leather Shell) -->
        <div class="jacket-panel jacket-panel-left" id="jacketFlapLeft" onclick="openHeroZipper()">
          <!-- Outer Leather Shell -->
          <div class="jacket-shell">
            <div class="jacket-leather-texture"></div>
            <div class="jacket-stitch-line stitch-left"></div>
            <div class="jacket-lapel-emboss">
              <span class="brand-monogram">ASMI</span>
              <span class="brand-tagline">Haute Joaillerie Atelier</span>
            </div>
          </div>

          <!-- Left Zipper Tape & Chunky Silver Teeth -->
          <div class="zipper-tape-edge zipper-tape-left">
            <div class="zipper-top-stop left-stop"></div>
            <div class="zipper-chunky-teeth teeth-left"></div>
          </div>

          <!-- Dynamic Cloth Fold Shadow -->
          <div class="jacket-fold-shadow"></div>
        </div>

        <!-- Right Jacket Panel (Foldable Lapel & Leather Shell) -->
        <div class="jacket-panel jacket-panel-right" id="jacketFlapRight" onclick="openHeroZipper()">
          <!-- Outer Leather Shell -->
          <div class="jacket-shell">
            <div class="jacket-leather-texture"></div>
            <div class="jacket-stitch-line stitch-right"></div>
            <div class="jacket-lapel-emboss">
              <span class="vault-seal"><i class="fa-solid fa-gem" style="color: var(--gold-primary); margin-right: 0.35rem;"></i> ROYAL VAULT</span>
              <span class="brand-tagline">Fine Pearls &amp; Emeralds</span>
            </div>
          </div>

          <!-- Right Zipper Tape & Chunky Silver Teeth -->
          <div class="zipper-tape-edge zipper-tape-right">
            <div class="zipper-top-stop right-stop"></div>
            <div class="zipper-chunky-teeth teeth-right"></div>
          </div>

          <!-- Dynamic Cloth Fold Shadow -->
          <div class="jacket-fold-shadow"></div>
        </div>

      </div>

      <!-- Heavy-Duty Metal Slider & Pull Tab Assembly -->
      <div class="fat-zipper-slider-assembly" id="fatZipperSliderAssembly" onclick="toggleHeroZipper(event)" title="Click or scroll down to unzip the jacket">
        <!-- Slider Head (Chunky Metal Casting) -->
        <div class="zipper-slider-head">
          <div class="slider-side-ridge left-ridge"></div>
          <div class="slider-channel"></div>
          <div class="slider-side-ridge right-ridge"></div>
          <div class="slider-bridge-crown"></div>
        </div>
        
        <!-- Swivel Ring Link -->
        <div class="zipper-swivel-link"></div>

        <!-- Chunky Metal Pull Tab (Exact reference from heavy jacket zip) -->
        <div class="fat-zipper-puller">
          <div class="puller-grip-slots">
            <span></span><span></span><span></span>
          </div>
          <span class="puller-logo-text">ASMI</span>
          <div class="puller-hole-cutout"></div>
        </div>

        <!-- Action Prompt Badge -->
        <div class="zipper-action-badge" id="zipperActionBadge">
          <i class="fa-solid fa-angles-down animate-bounce-custom"></i>
          <span>Click Zip or Scroll Down to Open Jacket</span>
        </div>
      </div>

    </div>

    <!-- Re-Zip Floating Button (Visible when unzipped) -->
    <button class="hero-rezip-btn" id="heroRezipBtn" onclick="toggleHeroZipper(event)" title="Zip Up Jacket">
      <i class="fa-solid fa-lock"></i>
      <span>Zip Up Jacket</span>
    </button>

  </section>



  <!-- ==========================================================================
       THE IMPERIAL JEWELRY VAULT (CATALOG & FILTERS)
       ========================================================================== -->
  <section class="vault-section" id="vaultSection">
    <div style="max-width: 1400px; margin: 0 auto;">
      
      <!-- Catalog Header & Controls -->
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 1.5rem; margin-bottom: 2.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1.5rem;">
        <div>
          <span class="label-caps" id="catalogBadgeText" style="color: var(--gold-primary); display: block; margin-bottom: 0.35rem;">Curated Collections</span>
          <h2 id="catalogHeading" style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 300; color: var(--text-primary);">
            Explore Our Luxury Jewelry
          </h2>
          <p id="catalogSubtitle" style="font-size: 0.8125rem; color: var(--text-muted); margin-top: 0.25rem;">
            Displaying all handcrafted pieces
          </p>
        </div>

        <!-- Filter Pills -->
        <div class="category-filter-row" style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
          <button class="filter-pill active" data-category="all">All Jewelry</button>
          <button class="filter-pill" data-category="pearls">Glowing Pearls</button>
          <button class="filter-pill" data-category="emeralds">Green Emeralds</button>
          <button class="filter-pill" data-category="stones">Sparkling Diamonds</button>
          <button class="filter-pill" data-category="polki">Royal Kundan</button>
        </div>

        <!-- Sort Select -->
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <label class="label-micro" style="color: var(--text-muted);">Sort By:</label>
          <select id="sortSelector" style="background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-primary); padding: 0.4rem 0.75rem; font-size: 0.75rem; cursor: pointer;">
            <option value="coveted">Most Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest Designs</option>
          </select>
        </div>
      </div>

      <!-- Dynamic Product Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem;" id="vaultProductsGrid">
        <!-- Injected via app.js -->
      </div>

      <!-- Bespoke Commission Banner -->
      <div style="background: linear-gradient(90deg, var(--bg-secondary) 0%, var(--bg-surface) 50%, var(--bg-secondary) 100%); border: 1px solid var(--border-color); padding: 2.5rem; margin-top: 4rem; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1.5rem;">
        <div>
          <h3 style="font-family: var(--font-serif); font-size: 1.75rem; color: var(--text-primary);">Looking for Custom Wedding Jewelry?</h3>
          <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-top: 0.25rem;">Our master jewelers create customized bridal necklaces with natural pearls and certified emeralds tailored to your vision.</p>
        </div>
        <a href="#consultationSection" class="btn-primary">
          Book Design Session
        </a>
      </div>

    </div>
  </section>

  <!-- ==========================================================================
       EDITORIAL HIGH-FASHION CAMPAIGN (LOOKBOOK)
       ========================================================================== -->
  <section class="editorial-section" id="editorialSection">
    <div style="max-width: 1400px; margin: 0 auto;">
      
      <div style="text-align: center; max-width: 700px; margin: 0 auto 3.5rem auto;">
        <span class="label-caps" style="color: var(--gold-primary); display: block; margin-bottom: 0.35rem;">Style Lookbook</span>
        <h2 style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 300; color: var(--text-primary);">
          Worn by Modern Icons
        </h2>
        <p style="font-style: italic; font-family: var(--font-serif); color: var(--text-secondary); margin-top: 0.5rem; font-size: 1.05rem;">
          "Timeless royal charm crafted for the modern woman."
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2.5rem;">
        
        <!-- Editorial Muse 1 - Pearl Cascade -->
        <div class="editorial-card">
          <img src="<?php echo esc_url(asmi_resolve_image_url($asmi_lb1_img)); ?>" loading="lazy" decoding="async" id="lookbook1Img" alt="Indian royal model wearing glowing natural pearl set" class="editorial-img"/>
          
          <!-- Hotspot 1 -->
          <div class="hotspot-pin" style="top: 55%; left: 48%;">
            <div class="hotspot-dot">
              <i class="fa-solid fa-plus"></i>
            </div>
            <div class="hotspot-card-popover">
              <span class="label-micro" style="color: var(--gold-primary);">Featured Look</span>
              <h4 style="font-family: var(--font-serif); font-size: 0.95rem; color: var(--text-primary); margin: 2px 0;">Multi-Strand Pearl Necklace Set</h4>
              <p style="font-family: var(--font-serif); color: var(--gold-primary); font-weight: 600; font-size: 1rem; margin-bottom: 0.5rem;">₹7,499</p>
              <button class="btn-primary" style="padding: 0.35rem 0.75rem; font-size: 0.6rem; width: 100%;" onclick="quickAddLookbook(1)">
                Get The Look
              </button>
            </div>
          </div>

          <div style="position: absolute; bottom: 0; inset-x: 0; background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 100%); padding: 1.5rem; display: flex; justify-content: space-between; align-items: flex-end;">
            <div>
              <span class="label-micro" style="color: var(--gold-primary);">Style 01</span>
              <p style="font-family: var(--font-serif); font-size: 1.2rem; color: #FFFFFF;">The Royal Pearl Cascade</p>
            </div>
            <button class="btn-primary" style="padding: 0.4rem 0.85rem; font-size: 0.65rem;" onclick="openLookbookQuickView(1)">
              View Piece
            </button>
          </div>
        </div>

        <!-- Editorial Muse 2 - Colombian Emerald -->
        <div class="editorial-card">
          <img src="<?php echo esc_url(asmi_resolve_image_url($asmi_lb2_img)); ?>" loading="lazy" decoding="async" id="lookbook2Img" alt="Indian bride wearing Colombian green emerald and diamond choker set" class="editorial-img"/>
          
          <!-- Hotspot 2 -->
          <div class="hotspot-pin" style="top: 52%; left: 50%;">
            <div class="hotspot-dot">
              <i class="fa-solid fa-plus"></i>
            </div>
            <div class="hotspot-card-popover">
              <span class="label-micro" style="color: var(--gold-primary);">Masterpiece</span>
              <h4 style="font-family: var(--font-serif); font-size: 0.95rem; color: var(--text-primary); margin: 2px 0;">Imperial Emerald Choker</h4>
              <p style="font-family: var(--font-serif); color: var(--gold-primary); font-weight: 600; font-size: 1rem; margin-bottom: 0.5rem;">₹8,999</p>
              <button class="btn-primary" style="padding: 0.35rem 0.75rem; font-size: 0.6rem; width: 100%;" onclick="quickAddLookbook(2)">
                Get The Look
              </button>
            </div>
          </div>

          <div style="position: absolute; bottom: 0; inset-x: 0; background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 100%); padding: 1.5rem; display: flex; justify-content: space-between; align-items: flex-end;">
            <div>
              <span class="label-micro" style="color: var(--gold-primary);">Style 02</span>
              <p style="font-family: var(--font-serif); font-size: 1.2rem; color: #FFFFFF;">Imperial Green Emerald</p>
            </div>
            <button class="btn-primary" style="padding: 0.4rem 0.85rem; font-size: 0.65rem;" onclick="openLookbookQuickView(2)">
              View Piece
            </button>
          </div>
        </div>

        <!-- Editorial Muse 3 - Ruby & Polki Kundan -->
        <div class="editorial-card">
          <img src="<?php echo esc_url(asmi_resolve_image_url($asmi_lb3_img)); ?>" loading="lazy" decoding="async" id="lookbook3Img" alt="Indian royal muse wearing Burmese ruby and uncut diamond Polki choker set" class="editorial-img"/>
          
          <!-- Hotspot 3 -->
          <div class="hotspot-pin" style="top: 50%; left: 50%;">
            <div class="hotspot-dot">
              <i class="fa-solid fa-plus"></i>
            </div>
            <div class="hotspot-card-popover">
              <span class="label-micro" style="color: var(--gold-primary);">Royal Bridal</span>
              <h4 style="font-family: var(--font-serif); font-size: 0.95rem; color: var(--text-primary); margin: 2px 0;">Ruby &amp; Polki Kundan Set</h4>
              <p style="font-family: var(--font-serif); color: var(--gold-primary); font-weight: 600; font-size: 1rem; margin-bottom: 0.5rem;">₹7,999</p>
              <button class="btn-primary" style="padding: 0.35rem 0.75rem; font-size: 0.6rem; width: 100%;" onclick="quickAddLookbook(3)">
                Get The Look
              </button>
            </div>
          </div>

          <div style="position: absolute; bottom: 0; inset-x: 0; background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 100%); padding: 1.5rem; display: flex; justify-content: space-between; align-items: flex-end;">
            <div>
              <span class="label-micro" style="color: var(--gold-primary);">Style 03</span>
              <p style="font-family: var(--font-serif); font-size: 1.2rem; color: #FFFFFF;">Royal Ruby &amp; Polki</p>
            </div>
            <button class="btn-primary" style="padding: 0.4rem 0.85rem; font-size: 0.65rem;" onclick="openLookbookQuickView(3)">
              View Piece
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ==========================================================================
       ARTISANAL PROVENANCE & TRUST PILLARS
       ========================================================================== -->
  <section style="padding: 5rem 1.5rem; border-top: 1px solid var(--border-color);" id="provenanceSection">
    <div style="max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
      
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 2rem; text-align: center;">
        <div style="width: 50px; height: 50px; border-radius: 50% !important; background: rgba(212,175,55,0.1); border: 1px solid var(--gold-primary); display: flex; align-items: center; justify-content: center; color: var(--gold-primary); margin: 0 auto 1.25rem auto;">
          <i class="fa-solid fa-hands-holding-circle text-lg"></i>
        </div>
        <h3 style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--text-primary); margin-bottom: 0.5rem;">100% Handcrafted</h3>
        <p style="font-size: 0.8125rem; color: var(--text-muted); line-height: 1.6;">Every stone and pearl is hand-set with precision by fourth-generation master artisans.</p>
      </div>

      <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 2rem; text-align: center;">
        <div style="width: 50px; height: 50px; border-radius: 50% !important; background: rgba(212,175,55,0.1); border: 1px solid var(--gold-primary); display: flex; align-items: center; justify-content: center; color: var(--gold-primary); margin: 0 auto 1.25rem auto;">
          <i class="fa-solid fa-certificate text-lg"></i>
        </div>
        <h3 style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--text-primary); margin-bottom: 0.5rem;">Certified Quality</h3>
        <p style="font-size: 0.8125rem; color: var(--text-muted); line-height: 1.6;">Each jewel comes with an authentic laboratory certificate for metal purity and stone quality.</p>
      </div>

      <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 2rem; text-align: center;">
        <div style="width: 50px; height: 50px; border-radius: 50% !important; background: rgba(212,175,55,0.1); border: 1px solid var(--gold-primary); display: flex; align-items: center; justify-content: center; color: var(--gold-primary); margin: 0 auto 1.25rem auto;">
          <i class="fa-solid fa-shield-halved text-lg"></i>
        </div>
        <h3 style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--text-primary); margin-bottom: 0.5rem;">Insured Safe Delivery</h3>
        <p style="font-size: 0.8125rem; color: var(--text-muted); line-height: 1.6;">Shipped in tamper-proof sealed velvet luxury boxes with 100% transit insurance worldwide.</p>
      </div>

    </div>
  </section>

  <!-- ==========================================================================
       COMMUNITY & CLIENT REVIEWS SHOWCASE (UNIVERSAL REVIEWS & PHOTO GALLERY)
       ========================================================================== -->
  <section class="reviews-section" id="reviewsSection">
    <div style="max-width: 1400px; margin: 0 auto;">
      
      <!-- Section Header -->
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 1.5rem; margin-bottom: 2.5rem; border-bottom: 1px solid var(--border-hairline); padding-bottom: 1.5rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
            <span class="label-caps" style="color: var(--gold-primary);">Haute Joaillerie Patrons</span>
            <span class="verified-buyer-pill"><i class="fa-solid fa-circle-check"></i> 100% Authentic Feedback</span>
          </div>
          <h2 style="font-size: 2.25rem; font-weight: 300; color: var(--text-primary);">
            Client Reviews &amp; <span class="gold-gradient-text" style="font-style: italic;">Heirloom Stories</span>
          </h2>
          <p id="reviewsCountBadge" style="font-size: 0.8125rem; color: var(--text-muted); margin-top: 0.35rem;">
            Based on Verified Client Reviews
          </p>
        </div>

        <!-- Rating overview & CTA -->
        <div style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
          <div style="text-align: right;">
            <div style="display: flex; align-items: center; gap: 0.35rem; justify-content: flex-end;">
              <span id="reviewsAvgScore" style="font-family: var(--font-serif); font-size: 1.75rem; font-weight: 700; color: var(--gold-primary);">5.0 / 5.0</span>
              <div style="color: var(--gold-primary); font-size: 0.875rem;">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
            </div>
            <p class="label-micro" style="color: var(--text-muted);">Exceptional Client Satisfaction</p>
          </div>

          <button class="btn-primary" onclick="reviewsManager.openSubmitReviewModal()" style="padding: 0.75rem 1.4rem;">
            <i class="fa-solid fa-pen-nib" style="margin-right: 0.4rem;"></i> Write a Review
          </button>
        </div>
      </div>

      <!-- Filter Pills Row -->
      <div class="reviews-filter-bar">
        <span class="label-micro" style="color: var(--gold-primary); margin-right: 0.5rem; align-self: center;">Filter Reviews:</span>
        <button class="review-filter-pill active" data-filter="all" onclick="reviewsManager.renderHomeReviews('all')">
          <i class="fa-solid fa-list-ul"></i> All Reviews
        </button>
        <button class="review-filter-pill" data-filter="photos" onclick="reviewsManager.renderHomeReviews('photos')">
          <i class="fa-solid fa-camera"></i> With Photos (Wide View)
        </button>
        <button class="review-filter-pill" data-filter="5stars" onclick="reviewsManager.renderHomeReviews('5stars')">
          <i class="fa-solid fa-star"></i> 5-Star Heirlooms
        </button>
        <button class="review-filter-pill" data-filter="pearls" onclick="reviewsManager.renderHomeReviews('pearls')">
          <i class="fa-solid fa-circle-dot"></i> Pearl Collections
        </button>
        <button class="review-filter-pill" data-filter="emeralds" onclick="reviewsManager.renderHomeReviews('emeralds')">
          <i class="fa-solid fa-gem"></i> Emerald Sets
        </button>
      </div>

      <!-- Reviews Grid (Rendered dynamically by ReviewsManager) -->
      <div class="reviews-grid" id="homeReviewsGrid"></div>

    </div>
  </section>

  <!-- ==========================================================================
       VIP ATELIER CONSULTATION & REVIEWS
       ========================================================================== -->
  <section style="padding: 6rem 1.5rem;" id="consultationSection">
    <div style="max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 3.5rem; align-items: center;">
      
      <!-- Left Patron Accolades -->
      <div>
        <span class="label-caps" style="color: var(--gold-primary); display: block; margin-bottom: 0.35rem;">Happy Customers</span>
        <h2 style="font-size: 2.5rem; font-weight: 300; color: var(--text-primary); margin-bottom: 1.5rem;">
          Loved by Buyers Worldwide
        </h2>

        <div style="background-color: var(--bg-card); border: 1px solid var(--border-color); padding: 2rem; margin-bottom: 1.5rem;">
          <div style="display: flex; gap: 0.25rem; color: var(--gold-primary); margin-bottom: 1rem; font-size: 0.875rem;">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <p style="font-family: var(--font-serif); font-style: italic; color: var(--text-secondary); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.25rem;">
            "The Zambian emerald choker was the highlight of my wedding reception. The sparkle and quality are simply unbelievable, and everyone kept asking where I got it!"
          </p>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 36px; height: 36px; border-radius: 50% !important; background: rgba(212,175,55,0.15); border: 1px solid var(--gold-primary); color: var(--gold-primary); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8125rem;">
              MS
            </div>
            <div>
              <p style="font-size: 0.8125rem; font-weight: 600; color: var(--text-primary);">Meera Singhania</p>
              <p class="label-micro" style="color: var(--text-muted);">Verified Buyer • Custom Wedding Set</p>
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; text-align: center;">
          <div style="border: 1px solid var(--border-hairline); padding: 1rem;">
            <p style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--gold-primary);">4.98 / 5.0</p>
            <p class="label-micro" style="color: var(--text-muted); margin-top: 2px;">Average Rating (840+ Reviews)</p>
          </div>
          <div style="border: 1px solid var(--border-hairline); padding: 1rem;">
            <p style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--gold-primary);">100%</p>
            <p class="label-micro" style="color: var(--text-muted); margin-top: 2px;">Authentic Certification</p>
          </div>
        </div>
      </div>

      <!-- Right VIP Salon Consultation Booking Form -->
      <div style="background-color: var(--bg-card); border: 1px solid var(--gold-primary); padding: 2.5rem; box-shadow: var(--shadow-plinth); position: relative;">
        <span class="product-tag tag-ruby" style="top: -12px; right: 2rem; left: auto;">VIP Booking</span>
        
        <h3 style="font-size: 1.85rem; color: var(--text-primary); margin-bottom: 0.5rem;">Book a Free Design Consultation</h3>
        <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-bottom: 1.75rem;">
          Talk directly with our jewelry designers to customize your necklace length, pearl color, or design a custom bridal set.
        </p>

        <form id="consultationForm" onsubmit="handleConciergeSubmit(event)" style="display: flex; flex-direction: column; gap: 1rem;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
              <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Your Full Name *</label>
              <input type="text" required class="form-input" placeholder="e.g. Aaryahi Roy"/>
            </div>
            <div>
              <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Email Address *</label>
              <input type="email" required class="form-input" placeholder="name@domain.com"/>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
              <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Phone / WhatsApp Number</label>
              <input type="tel" class="form-input" placeholder="+91 98200 12345"/>
            </div>
            <div>
              <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Meeting Type</label>
              <select class="form-input">
                <option>Virtual Video Call (Zoom / WhatsApp)</option>
                <option>Flagship Store Visit</option>
                <option>Custom Wedding Consultation</option>
              </select>
            </div>
          </div>

          <div>
            <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Any Special Request or Message</label>
            <textarea class="form-input" rows="3" placeholder="Tell us about your favorite stones, wedding date, or custom size requirements..."></textarea>
          </div>

          <button type="submit" class="btn-primary" style="margin-top: 0.5rem;">
            Request Consultation
          </button>

          <div id="consultationSuccess" style="display: none;"></div>
        </form>
      </div>

    </div>
  </section>

  <!-- ==========================================================================
       CUSTOMER SUPPORT & AI CONCIERGE SECTION
       ========================================================================== -->
  <section class="support-showcase-section" id="supportSection">
    <div style="max-width: 1400px; margin: 0 auto;">
      <!-- Section Header -->
      <div style="text-align: center; max-width: 780px; margin: 0 auto 3.5rem;">
        <span class="label-caps" style="color: var(--gold-primary);"><i class="fa-solid fa-headset" style="margin-right: 0.4rem;"></i> 24/7 PATRON CONCIERGE &amp; HELP DESK</span>
        <h2 style="font-family: var(--font-serif); font-size: 2.65rem; font-weight: 300; color: var(--text-primary); margin: 0.4rem 0 0.85rem;">
          Customer Support &amp; AI Concierge
        </h2>
        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
          Experience effortless luxury assistance. Consult our interactive AI assistant for instant answers, chat live with our Master Atelier Admins, or manage one-click item cancellations with immediate email receipts.
        </p>
      </div>

      <!-- 4 Pillars Support Grid -->
      <div class="support-cards-grid">
        <!-- Card 1: AI Concierge -->
        <div class="support-card-item highlight-card">
          <div class="support-card-icon gold">
            <i class="fa-solid fa-sparkles"></i>
          </div>
          <div class="support-card-badge">Instant 24/7</div>
          <h3 class="support-card-title">AI Jewelry Concierge</h3>
          <p class="support-card-desc">
            Instant guidance on BIS 916 hallmark authenticity, custom choker sizing, gemstone care, and order shipment milestone tracking.
          </p>
          <button class="btn-primary support-card-btn" onclick="supportManager.openSupportModal('ai')">
            <i class="fa-solid fa-comments" style="margin-right: 0.35rem;"></i> Ask AI Assistant
          </button>
        </div>

        <!-- Card 2: Live Admin Chat -->
        <div class="support-card-item">
          <div class="support-card-icon emerald">
            <i class="fa-solid fa-user-shield"></i>
          </div>
          <div class="support-card-badge">Master Artisans</div>
          <h3 class="support-card-title">Live Atelier Admin Chat</h3>
          <p class="support-card-desc">
            Direct dialogue with our master jewelers and administrators for bespoke commissions, custom necklace lengths, and urgent inquiries.
          </p>
          <button class="btn-secondary support-card-btn" onclick="supportManager.openSupportModal('admin')">
            <i class="fa-solid fa-crown" style="margin-right: 0.35rem; color: var(--gold-primary);"></i> Chat with Admin
          </button>
        </div>

        <!-- Card 3: Order Item Cancellations -->
        <div class="support-card-item">
          <div class="support-card-icon ruby">
            <i class="fa-solid fa-box-open"></i>
          </div>
          <div class="support-card-badge">Self-Service</div>
          <h3 class="support-card-title">Item Cancellations &amp; Returns</h3>
          <p class="support-card-desc">
            Easily cancel individual ordered items from your dashboard. Instant email alerts are sent to the admin with patron details and to your registered inbox.
          </p>
          <button class="btn-secondary support-card-btn" onclick="ordersManager.openOrdersModal()">
            <i class="fa-solid fa-ban" style="margin-right: 0.35rem; color: #ef4444;"></i> Manage / Cancel Items
          </button>
        </div>

        <!-- Card 4: Official Hotline & Contact -->
        <div class="support-card-item">
          <div class="support-card-icon sapphire">
            <i class="fa-solid fa-phone-volume"></i>
          </div>
          <div class="support-card-badge">Configured Desk</div>
          <h3 class="support-card-title">Direct Helpline &amp; Email</h3>
          <p class="support-card-desc">
            Connect directly with our dedicated concierge specialists via phone, WhatsApp hotline, or private email assistance.
          </p>
          <div class="support-direct-contacts">
            <a href="tel:+919876543210" id="suppDirectPhoneLink" class="support-direct-link">
              <i class="fa-solid fa-phone"></i> <span id="suppDirectPhoneText">+91 98765 43210</span>
            </a>
            <a href="mailto:support@asmijewelry.com" id="suppDirectEmailLink" class="support-direct-link">
              <i class="fa-solid fa-envelope"></i> <span id="suppDirectEmailText">support@asmijewelry.com</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Quick Support FAQ Strip -->
      <div class="support-faq-strip">
        <div class="support-faq-item">
          <div class="support-faq-q"><i class="fa-solid fa-circle-question gold-icon"></i> How do item cancellations work?</div>
          <p class="support-faq-a">You can cancel any item before delivery in your "My Orders" tab. Our Master Atelier Admin is immediately emailed with all your patron details, and a cancellation confirmation receipt is delivered to your inbox.</p>
        </div>
        <div class="support-faq-item">
          <div class="support-faq-q"><i class="fa-solid fa-truck-fast gold-icon"></i> When will my package arrive?</div>
          <p class="support-faq-a">Every heirloom is securely transported via BlueDart Armored Express Logistics with an estimated delivery window of 10 to 12 business days and 5-stage milestone tracking.</p>
        </div>
        <div class="support-faq-item">
          <div class="support-faq-q"><i class="fa-solid fa-certificate gold-icon"></i> Are all gemstones &amp; gold certified?</div>
          <p class="support-faq-a">Yes. Every piece features official government BIS 916 laser hallmarking and arrives with an embossed Certificate of Authenticity with serialized QR verification.</p>
        </div>
      </div>
    </div>
  </section>

<?php
get_footer();
