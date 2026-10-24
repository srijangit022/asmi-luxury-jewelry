<?php
/**
 * ASMI Luxury Jewelry Store - Footer Template
 *
 * @package ASMI_Jewelry
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

  <!-- ==========================================================================
       MAIN FOOTER & VERIFIED PAYMENT GATEWAYS
       ========================================================================== -->
  <footer style="border-top: 1px solid var(--border-color); padding: 5rem 1.5rem 2rem 1.5rem;">
    <div style="max-width: 1400px; margin: 0 auto;">
      
      <!-- Newsletter Top Row -->
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 2rem; border-bottom: 1px solid var(--border-hairline); padding-bottom: 3.5rem; margin-bottom: 3.5rem;">
        <div>
          <span class="label-caps" style="color: var(--gold-primary); display: block; margin-bottom: 0.35rem;">VIP Club</span>
          <h3 style="font-size: 2rem; color: var(--text-primary);">Join the ASMI VIP Club</h3>
          <p style="font-size: 0.8125rem; color: var(--text-muted); margin-top: 0.25rem;">Get early access to new jewelry launches, special sales, and private design previews.</p>
        </div>
        <form onsubmit="event.preventDefault(); window.showToast('Subscribed', 'Thank you for joining the ASMI VIP Club!');" style="display: flex; gap: 0.5rem; width: 100%; max-width: 440px;">
          <input type="email" required placeholder="Enter your email address..." class="form-input" style="flex: 1;"/>
          <button type="submit" class="btn-primary" style="padding: 0.85rem 1.5rem; font-size: 0.6875rem;">Join VIP</button>
        </form>
      </div>

      <!-- Links Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2.5rem; margin-bottom: 3.5rem; font-size: 0.8125rem;">
        <div>
          <span style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--text-primary); display: block; margin-bottom: 0.5rem;">
            ASMI'S <span style="font-style: italic; color: var(--gold-primary);">Collection</span>
          </span>
          <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 1.5rem;">
            Creating timeless luxury jewelry with genuine pearls, emeralds, and sparkling stones since 2012.
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.6rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
            <a href="https://instagram.com/asmi_luxury_atelier" id="footerInstagramLink" target="_blank" style="width: 34px; height: 34px; border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; color: var(--text-primary); text-decoration: none;" title="Follow us on Instagram"><i class="fa-brands fa-instagram text-sm"></i></a>
            <a href="https://facebook.com/asmiclassicjewelry" id="footerFacebookLink" target="_blank" style="width: 34px; height: 34px; border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; color: var(--text-primary); text-decoration: none;" title="Follow us on Facebook"><i class="fa-brands fa-facebook text-sm"></i></a>
            <a href="https://wa.me/919876543210" id="footerWhatsappLink" target="_blank" style="width: 34px; height: 34px; border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; color: #10B981; text-decoration: none;" title="Chat with Concierge on WhatsApp"><i class="fa-brands fa-whatsapp text-sm"></i></a>
            <a href="tel:+919876543210" id="footerPhoneLink" style="width: 34px; height: 34px; border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; color: var(--gold-primary); text-decoration: none;" title="Call VIP Concierge"><i class="fa-solid fa-phone text-xs"></i></a>
            <a href="mailto:concierge@asmijewelry.com" id="footerEmailLink" style="width: 34px; height: 34px; border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; color: var(--text-primary); text-decoration: none;" title="Send Concierge Email"><i class="fa-regular fa-envelope text-xs"></i></a>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.35rem;">
            <span><i class="fa-solid fa-phone" style="color: var(--gold-primary); margin-right: 0.35rem;"></i> Direct: <strong id="footerPhoneText" style="color: var(--text-primary);">+91 98765 43210</strong></span>
            <span><i class="fa-brands fa-whatsapp" style="color: #10B981; margin-right: 0.35rem;"></i> WhatsApp: <strong id="footerWhatsappText" style="color: var(--text-primary);">+91 98765 43210</strong></span>
            <span><i class="fa-regular fa-envelope" style="color: var(--gold-primary); margin-right: 0.35rem;"></i> Email: <strong id="footerEmailText" style="color: var(--text-primary);">concierge@asmijewelry.com</strong></span>
            <span><i class="fa-solid fa-location-dot" style="color: var(--gold-primary); margin-right: 0.35rem;"></i> Atelier: <strong id="footerAddress" style="color: var(--text-secondary); font-weight: 500;">ASMI Flagship Atelier &amp; Vault, Heritage Gold Quadrant, Mumbai 400001</strong></span>
            <span><i class="fa-regular fa-clock" style="color: var(--gold-primary); margin-right: 0.35rem;"></i> Hours: <strong id="footerHours" style="color: var(--text-secondary); font-weight: 500;">Mon - Sat: 11:00 AM - 8:00 PM IST (Appointments Recommended)</strong></span>
          </div>
        </div>

        <div>
          <h4 class="label-caps" style="color: var(--text-primary); margin-bottom: 1rem;">Shop Categories</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem;">
            <li><a href="#vaultSection" style="color: var(--text-secondary); text-decoration: none;">Pearl Necklaces &amp; Chokers</a></li>
            <li><a href="#vaultSection" style="color: var(--text-secondary); text-decoration: none;">Zambian Emerald Sets</a></li>
            <li><a href="#vaultSection" style="color: var(--text-secondary); text-decoration: none;">Solitaire Rings &amp; Bangles</a></li>
            <li><a href="#vaultSection" style="color: var(--text-secondary); text-decoration: none;">Royal Kundan &amp; Polki</a></li>
          </ul>
        </div>

        <div>
          <h4 class="label-caps" style="color: var(--text-primary); margin-bottom: 1rem;">Customer Care</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem;">
            <li><a href="javascript:void(0)" onclick="supportManager.openSupportModal('ai')" style="color: var(--gold-primary); text-decoration: none; font-weight: 600;"><i class="fa-solid fa-wand-magic-sparkles text-xs" style="margin-right: 0.35rem;"></i>AI Jewelry Concierge</a></li>
            <li><a href="#consultationSection" style="color: var(--text-secondary); text-decoration: none;">Book Consultation</a></li>
            <li><a href="#" style="color: var(--text-secondary); text-decoration: none;">Jewelry Care Guide</a></li>
            <li><a href="#" style="color: var(--text-secondary); text-decoration: none;">Shipping &amp; Delivery Info</a></li>
            <li><a href="#" style="color: var(--text-secondary); text-decoration: none;">Authenticity Certificate</a></li>
          </ul>
        </div>

        <div>
          <h4 class="label-caps" style="color: var(--text-primary); margin-bottom: 1rem;">Trust &amp; Privacy</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem;">
            <li><a href="#" style="color: var(--text-secondary); text-decoration: none;">100% Genuine Guarantee</a></li>
            <li><a href="#" style="color: var(--text-secondary); text-decoration: none;">14-Day Free Returns</a></li>
            <li><a href="#" style="color: var(--text-secondary); text-decoration: none;">Privacy Policy</a></li>
            <li><a href="#" style="color: var(--text-secondary); text-decoration: none;">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <!-- Verified Payment Gateways Bar (Exclusively UPI) -->
      <div style="border-top: 1px solid var(--border-hairline); border-bottom: 1px solid var(--border-hairline); padding: 1.5rem 0; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1.5rem;">
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem;">
          <span class="label-micro" style="color: var(--text-secondary); font-weight: 600;">Accepted Payment Mode:</span>
          <span style="background: rgba(212, 175, 55, 0.12); border: 1px solid var(--gold-primary); padding: 0.35rem 0.65rem; font-size: 0.75rem; font-weight: 700; color: var(--gold-primary);"><i class="fa-solid fa-bolt" style="margin-right: 0.25rem;"></i> UPI QR &amp; Instant Apps</span>
          <span style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 0.35rem 0.65rem; font-size: 0.75rem; font-weight: 600; color: var(--text-primary);"><i class="fa-brands fa-google text-blue-400" style="margin-right: 0.25rem;"></i> Google Pay UPI</span>
          <span style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 0.35rem 0.65rem; font-size: 0.75rem; font-weight: 600; color: var(--text-primary);"><i class="fa-solid fa-mobile-screen-button text-purple-400" style="margin-right: 0.25rem;"></i> PhonePe</span>
          <span style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 0.35rem 0.65rem; font-size: 0.75rem; font-weight: 600; color: var(--text-primary);"><i class="fa-solid fa-wallet text-cyan-400" style="margin-right: 0.25rem;"></i> Paytm UPI</span>
          <span style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 0.35rem 0.65rem; font-size: 0.75rem; font-weight: 600; color: var(--text-primary);"><i class="fa-solid fa-building-columns text-emerald-400" style="margin-right: 0.25rem;"></i> BHIM / Any Bank UPI</span>
        </div>
      </div>

      <!-- Copyright Bottom -->
      <div style="padding-top: 1.5rem; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; font-size: 0.875rem; color: var(--text-primary); font-weight: 500; padding-left: clamp(0px, 8vw, 7.5rem);">
        <p style="margin: 0; color: var(--text-secondary); opacity: 0.9;">Handcrafted with love for fine pearls, emeralds &amp; luxury jewelry.</p>
        <div style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; margin-left: auto;">
          <p id="footerCopyright" style="margin: 0; color: var(--text-primary); opacity: 0.95; font-weight: 600;">© <?php echo date('Y'); ?> ASMI's Collection. All Rights Reserved.</p>
          <?php if (current_user_can('manage_options') || current_user_can('manage_woocommerce')) : ?>
            <a href="<?php echo esc_url(admin_url('edit.php?post_type=product')); ?>" style="background: rgba(212, 175, 55, 0.15); border: 1px solid var(--gold-primary); color: var(--gold-primary); padding: 0.45rem 0.95rem; font-size: 0.75rem; text-decoration: none; display: flex; align-items: center; gap: 0.35rem; font-weight: 600;" title="Manage Store in WordPress Dashboard">
              <i class="fa-solid fa-gauge-high text-xs"></i> WP Store Admin
            </a>
          <?php elseif (function_exists('is_user_logged_in') && is_user_logged_in()) : ?>
            <a href="<?php echo esc_url(admin_url()); ?>" style="background: rgba(212, 175, 55, 0.12); border: 1px solid var(--gold-primary); color: var(--gold-primary); padding: 0.45rem 0.95rem; font-size: 0.75rem; text-decoration: none; display: flex; align-items: center; gap: 0.35rem; font-weight: 600;" title="WordPress Dashboard">
              <i class="fa-solid fa-user-shield text-xs"></i> WP Dashboard
            </a>
          <?php else : ?>
            <a href="<?php echo esc_url(wp_login_url()); ?>" style="background: rgba(212, 175, 55, 0.12); border: 1px solid var(--gold-primary); color: var(--gold-primary); padding: 0.45rem 0.95rem; font-size: 0.75rem; text-decoration: none; display: flex; align-items: center; gap: 0.35rem; font-weight: 600;" title="Store Manager / Admin Login">
              <i class="fa-solid fa-lock text-xs"></i> Store Manager Login
            </a>
          <?php endif; ?>
        </div>
      </div>

    </div>
  </footer>



  <!-- ==========================================================================
       DRAWER BACKDROP & SIDE PANELS
       ========================================================================== -->
  <div class="drawer-backdrop" id="drawerBackdrop" onclick="closeCartDrawer(); closeWishlistDrawer(); closeSideMenu();"></div>

  <!-- ==========================================================================
       SIDE NAVIGATION MENU DRAWER (OPENS ON 3-LINE BUTTON CLICK)
       ========================================================================== -->
  <div class="side-drawer side-drawer-left" id="sideMenuDrawer">
    <div class="drawer-header" style="padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <span class="label-micro" style="color: var(--gold-primary); letter-spacing: 0.2em;">Exclusive Navigation</span>
        <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-primary); margin-top: 2px;">ASMI'S Collection</h3>
      </div>
      <button onclick="closeSideMenu()" style="background: none; border: none; color: var(--text-primary); cursor: pointer; font-size: 1.25rem;" title="Close Menu">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <div class="drawer-body" style="padding: 0; overflow-y: auto;">
      <!-- Mobile Patron VIP Auth Status Card -->
      <div id="mobilePatronAuthCard" style="padding: 1rem 1.5rem; background: var(--bg-card); border-bottom: 1px solid var(--border-color);"></div>

      <!-- VIP Quick Shortcut Banner for Mode Switcher, Orders & Reviews -->
      <div style="padding: 0.85rem 1.25rem; background: var(--bg-surface); border-bottom: 1px solid var(--border-color); display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem;">
        <button type="button" class="btn-secondary" style="padding: 0.55rem 0.4rem; font-size: 0.6875rem; display: flex; align-items: center; justify-content: center; gap: 0.35rem; white-space: nowrap;" onclick="toggleTheme()" title="Switch Light / Dark Mode">
          <i class="fa-solid fa-moon theme-icon" style="color: var(--gold-primary);"></i>
          <span class="theme-label" style="font-size: 0.65rem;">Theme</span>
        </button>
        <button type="button" class="btn-secondary" style="padding: 0.55rem 0.4rem; font-size: 0.6875rem; display: flex; align-items: center; justify-content: center; gap: 0.35rem; white-space: nowrap;" onclick="closeSideMenu(); ordersManager.openOrdersModal();">
          <i class="fa-solid fa-truck-fast" style="color: var(--gold-primary);"></i> Orders
        </button>
        <button type="button" class="btn-secondary" style="padding: 0.55rem 0.4rem; font-size: 0.6875rem; display: flex; align-items: center; justify-content: center; gap: 0.35rem; white-space: nowrap;" onclick="closeSideMenu(); document.getElementById('reviewsSection').scrollIntoView({behavior: 'smooth'});">
          <i class="fa-solid fa-star" style="color: var(--gold-primary);"></i> Reviews
        </button>
      </div>

      <nav class="side-nav-links">
        
        <!-- SECTION 1: CLIENT PORTAL & ORDERS -->
        <div style="padding: 0.85rem 1.5rem 0.35rem 1.5rem; background: rgba(212, 175, 55, 0.04); border-bottom: 1px solid var(--border-hairline);">
          <span class="label-micro" style="color: var(--gold-primary); letter-spacing: 0.16em;">Orders &amp; Patron Portal</span>
        </div>

        <!-- AI Jewelry Concierge -->
        <a href="javascript:void(0)" class="side-nav-item" onclick="closeSideMenu(); supportManager.openSupportModal('ai');">
          <div class="side-nav-icon" style="color: var(--gold-primary); background: rgba(212, 175, 55, 0.12); border-color: var(--gold-primary);">
            <i class="fa-solid fa-wand-magic-sparkles"></i>
          </div>
          <div class="side-nav-text">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
              <span class="side-nav-title" style="color: var(--gold-primary); font-weight: 600;">AI Jewelry Concierge</span>
              <span class="order-status-pill status-delivered" style="font-size: 0.55rem; padding: 0.2rem 0.45rem;">24/7 Live AI</span>
            </div>
            <span class="side-nav-desc">Instant guidance on hallmarks, sizing, gemstones &amp; orders</span>
          </div>
          <i class="fa-solid fa-chevron-right side-nav-arrow"></i>
        </a>

        <!-- 1. My Orders & Package Tracker -->
        <a href="javascript:void(0)" class="side-nav-item" onclick="closeSideMenu(); ordersManager.openOrdersModal();">
          <div class="side-nav-icon">
            <i class="fa-solid fa-truck-fast"></i>
          </div>
          <div class="side-nav-text">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
              <span class="side-nav-title">My Orders &amp; Tracking</span>
              <span class="order-status-pill status-transit" style="font-size: 0.55rem; padding: 0.2rem 0.45rem;">10-12 Days</span>
            </div>
            <span class="side-nav-desc">Track package live (5 milestones) &amp; order history</span>
          </div>
          <i class="fa-solid fa-chevron-right side-nav-arrow"></i>
        </a>

        <!-- 2. Patron Reviews & Photo Stories -->
        <a href="#reviewsSection" class="side-nav-item" onclick="closeSideMenu(); document.getElementById('reviewsSection').scrollIntoView({behavior: 'smooth'});">
          <div class="side-nav-icon">
            <i class="fa-solid fa-star"></i>
          </div>
          <div class="side-nav-text">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
              <span class="side-nav-title">Client Reviews &amp; Stories</span>
              <span class="verified-buyer-pill" style="font-size: 0.55rem; padding: 0.2rem 0.45rem;">★ 5.0 Rating</span>
            </div>
            <span class="side-nav-desc">Read reviews, browse photos in wide lightbox view</span>
          </div>
          <i class="fa-solid fa-chevron-right side-nav-arrow"></i>
        </a>

        <!-- 3. Write a Review Action -->
        <a href="javascript:void(0)" class="side-nav-item" onclick="closeSideMenu(); reviewsManager.openSubmitReviewModal();">
          <div class="side-nav-icon">
            <i class="fa-solid fa-pen-nib"></i>
          </div>
          <div class="side-nav-text">
            <span class="side-nav-title">Write a Review</span>
            <span class="side-nav-desc">Share rating, comments &amp; upload JPEG/PNG photo</span>
          </div>
          <i class="fa-solid fa-chevron-right side-nav-arrow"></i>
        </a>

        <!-- SECTION 2: VAULT & HIGH JEWELRY -->
        <div style="padding: 0.85rem 1.5rem 0.35rem 1.5rem; background: rgba(255, 255, 255, 0.02); border-bottom: 1px solid var(--border-hairline); border-top: 1px solid var(--border-hairline);">
          <span class="label-micro" style="color: var(--text-muted); letter-spacing: 0.16em;">High Jewelry Vault</span>
        </div>

        <!-- 4. Exclusive Jewelry -->
        <a href="#heroSection" class="side-nav-item" onclick="closeSideMenu();">
          <div class="side-nav-icon">
            <i class="fa-solid fa-gem"></i>
          </div>
          <div class="side-nav-text">
            <span class="side-nav-title">Exclusive Jewelry</span>
            <span class="side-nav-desc">Signature heirlooms, bespoke creations &amp; grand sets</span>
          </div>
          <i class="fa-solid fa-chevron-right side-nav-arrow"></i>
        </a>

        <!-- 5. Glowing Pearls -->
        <a href="#vaultSection" class="side-nav-item" onclick="closeSideMenu(); filterByCategory('pearls'); document.getElementById('vaultSection').scrollIntoView({behavior: 'smooth'});">
          <div class="side-nav-icon">
            <i class="fa-solid fa-circle-dot"></i>
          </div>
          <div class="side-nav-text">
            <span class="side-nav-title">Glowing Pearls</span>
            <span class="side-nav-desc">Basra, South Sea &amp; Tahitian hand-strung pearls</span>
          </div>
          <i class="fa-solid fa-chevron-right side-nav-arrow"></i>
        </a>

        <!-- 6. Royal Emeralds -->
        <a href="#vaultSection" class="side-nav-item" onclick="closeSideMenu(); filterByCategory('emeralds'); document.getElementById('vaultSection').scrollIntoView({behavior: 'smooth'});">
          <div class="side-nav-icon">
            <i class="fa-solid fa-crown"></i>
          </div>
          <div class="side-nav-text">
            <span class="side-nav-title">Royal Emeralds</span>
            <span class="side-nav-desc">Certified Colombian &amp; Zambian deep green emeralds</span>
          </div>
          <i class="fa-solid fa-chevron-right side-nav-arrow"></i>
        </a>

        <!-- 7. Sparkling Diamonds -->
        <a href="#vaultSection" class="side-nav-item" onclick="closeSideMenu(); filterByCategory('stones'); document.getElementById('vaultSection').scrollIntoView({behavior: 'smooth'});">
          <div class="side-nav-icon">
            <i class="fa-solid fa-ring"></i>
          </div>
          <div class="side-nav-text">
            <span class="side-nav-title">Sparkling Diamonds</span>
            <span class="side-nav-desc">Flawless cut solitaires, bridal chokers &amp; uncut Polki</span>
          </div>
          <i class="fa-solid fa-chevron-right side-nav-arrow"></i>
        </a>

        <!-- SECTION 3: ATELIER EXPERIENCES -->
        <div style="padding: 0.85rem 1.5rem 0.35rem 1.5rem; background: rgba(255, 255, 255, 0.02); border-bottom: 1px solid var(--border-hairline); border-top: 1px solid var(--border-hairline);">
          <span class="label-micro" style="color: var(--text-muted); letter-spacing: 0.16em;">Atelier Experiences</span>
        </div>



        <!-- 9. Style Gallery -->
        <a href="#editorialSection" class="side-nav-item" onclick="closeSideMenu(); document.getElementById('editorialSection').scrollIntoView({behavior: 'smooth'});">
          <div class="side-nav-icon">
            <i class="fa-solid fa-camera-retro"></i>
          </div>
          <div class="side-nav-text">
            <span class="side-nav-title">Style Gallery</span>
            <span class="side-nav-desc">High fashion editorial shoots &amp; styling inspiration</span>
          </div>
          <i class="fa-solid fa-chevron-right side-nav-arrow"></i>
        </a>

        <!-- 10. Why Choose Us -->
        <a href="#provenanceSection" class="side-nav-item" onclick="closeSideMenu(); document.getElementById('provenanceSection').scrollIntoView({behavior: 'smooth'});">
          <div class="side-nav-icon">
            <i class="fa-solid fa-award"></i>
          </div>
          <div class="side-nav-text">
            <span class="side-nav-title">Why Choose Us</span>
            <span class="side-nav-desc">BIS hallmark, 100% certified gemstones &amp; insured safe delivery</span>
          </div>
          <i class="fa-solid fa-chevron-right side-nav-arrow"></i>
        </a>
      </nav>

      <!-- SECTION 4: PREFERENCES & SETTINGS (MOBILE COMPATIBLE) -->
      <div style="padding: 0.85rem 1.5rem; background: var(--bg-surface); border-top: 1px solid var(--border-hairline); border-bottom: 1px solid var(--border-hairline); display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; flex-wrap: wrap;">
        <!-- Currency Selector -->
        <div style="display: flex; align-items: center; gap: 0.4rem;">
          <i class="fa-solid fa-globe" style="color: var(--gold-primary); font-size: 0.8rem;"></i>
          <span class="label-micro" style="color: var(--text-muted);">Currency:</span>
          <select id="currencySelectorDrawer" onchange="setCurrency(this.value)" class="currency-select-input" style="background: var(--bg-card); border: 1px solid var(--border-color); color: var(--gold-primary); font-size: 0.75rem; font-weight: 700; padding: 0.35rem 0.5rem; cursor: pointer; outline: none;">
            <option value="INR" style="background: var(--bg-surface); color: var(--text-primary);">₹ INR</option>
            <option value="USD" style="background: var(--bg-surface); color: var(--text-primary);">$ USD</option>
          </select>
        </div>

        <!-- Theme Toggle -->
        <button type="button" onclick="toggleTheme()" class="btn-secondary" style="padding: 0.4rem 0.75rem; font-size: 0.6875rem; display: flex; align-items: center; gap: 0.35rem;" title="Switch Dark / Light Mode">
          <i class="fa-solid fa-moon theme-icon" style="color: var(--gold-primary);"></i>
          <span class="theme-label" style="font-size: 0.65rem;">Dark Mode</span>
        </button>
      </div>

      <!-- Side Drawer Concierge & Quick Contact Box -->
      <div style="padding: 1.5rem; background: var(--bg-surface); border-top: 1px solid var(--border-color); margin-top: 0.5rem;">
        <span class="label-micro" style="color: var(--gold-primary); display: block; margin-bottom: 0.5rem;">Private Concierge Service</span>
        <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.4;">
          Speak with our certified master gemologist for custom jewelry commissions or valuation.
        </p>
        <a href="#consultationSection" class="btn-primary" style="width: 100%; text-align: center; display: block; padding: 0.65rem 1rem; font-size: 0.75rem;" onclick="closeSideMenu(); document.getElementById('consultationSection').scrollIntoView({behavior: 'smooth'});">
          <i class="fa-solid fa-calendar-check" style="margin-right: 0.4rem;"></i> Book Private Consultation
        </a>
        <div style="margin-top: 1rem; display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted);">
          <span><i class="fa-solid fa-phone" style="color: var(--gold-primary); margin-right: 0.3rem;"></i> +1 (800) ASMI-GEM</span>
          <span><i class="fa-solid fa-shield-halved" style="color: var(--gold-primary); margin-right: 0.3rem;"></i> Insured Vault</span>
        </div>
      </div>
    </div>
  </div>

  <!-- ==========================================================================
       SLIDING CART DRAWER
       ========================================================================== -->
  <div class="side-drawer" id="cartDrawer">
    <div class="drawer-header">
      <div>
        <span class="label-micro" style="color: var(--gold-primary);">Your Bag</span>
        <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-primary);">Shopping Bag</h3>
      </div>
      <button onclick="closeCartDrawer()" style="background: none; border: none; color: var(--text-primary); cursor: pointer; font-size: 1.25rem;">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <div class="drawer-body">
      <!-- Empty State -->
      <div id="cartEmptyState" style="text-align: center; padding: 4rem 1rem; display: none;">
        <i class="fa-solid fa-bag-shopping" style="font-size: 2.5rem; color: var(--gold-primary); opacity: 0.6; margin-bottom: 1rem;"></i>
        <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-primary); margin-bottom: 0.5rem;">Your Bag is Empty</h4>
        <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 1.5rem;">Discover our beautiful selection of natural pearls, green emeralds, and diamonds.</p>
        <button class="btn-primary" onclick="closeCartDrawer(); document.getElementById('vaultSection').scrollIntoView({behavior: 'smooth'});">
          Browse Jewelry
        </button>
      </div>

      <!-- Items List -->
      <div id="cartItemsList"></div>

      <!-- Coupon & Privilege Code Input -->
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 1rem; margin-top: 1.5rem;">
        <span class="label-micro" style="color: var(--gold-primary); display: block; margin-bottom: 0.35rem;">Have a Discount Code?</span>
        <div style="display: flex; gap: 0.5rem;">
          <input type="text" id="couponCodeInput" class="form-input" placeholder="e.g. ROYAL10, ASMI2025" style="padding: 0.5rem 0.75rem; font-size: 0.75rem; text-transform: uppercase;"/>
          <button class="btn-solid-dark" style="padding: 0.5rem 1rem; font-size: 0.6875rem;" onclick="cartManager.validateCoupon(document.getElementById('couponCodeInput').value); cartManager.saveCart();">
            Apply
          </button>
        </div>
        <p style="font-size: 0.65rem; color: var(--text-muted); margin-top: 0.35rem;">Tip: Use code <strong>ROYAL10</strong> for 10% off or <strong>ASMI500</strong> for ₹500 off.</p>
      </div>

      <!-- Gift wrap toggle -->
      <div style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-surface); border: 1px solid var(--border-color); padding: 0.85rem 1rem; margin-top: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <i class="fa-solid fa-gift" style="color: var(--gold-primary);"></i>
          <div>
            <p style="font-size: 0.8125rem; font-weight: 600; color: var(--text-primary);">Luxury Velvet Gift Box</p>
            <p class="label-micro" style="color: var(--text-muted);">Includes gold ribbon &amp; personalized message</p>
          </div>
        </div>
        <input type="checkbox" id="giftWrapCheck" onchange="cartManager.giftWrap = this.checked; cartManager.saveCart();" style="accent-color: var(--gold-primary); width: 16px; height: 16px; cursor: pointer;"/>
      </div>
    </div>

    <!-- Cart Summary & Proceed to Checkout -->
    <div class="drawer-footer" id="cartSummarySection">
      <div style="display: flex; justify-content: space-between; font-size: 0.8125rem; margin-bottom: 0.35rem;">
        <span style="color: var(--text-muted);">Subtotal:</span>
        <span id="cartSubtotalDisplay" style="color: var(--text-primary); font-weight: 600;">₹0</span>
      </div>
      
      <div id="cartDiscountRow" style="display: none; justify-content: space-between; font-size: 0.8125rem; margin-bottom: 0.35rem; color: #10B981;">
        <span>Special Discount:</span>
        <span id="cartDiscountDisplay" style="font-weight: 600;">-₹0</span>
      </div>

      <div style="display: flex; justify-content: space-between; font-size: 0.8125rem; margin-bottom: 0.35rem;">
        <span id="cartShippingLabel" style="color: var(--text-muted);">Delivery (Within 500gm):</span>
        <span id="cartShippingDisplay" style="color: var(--gold-primary); font-weight: 600;">₹50</span>
      </div>

      <div style="display: flex; justify-content: space-between; font-size: 0.8125rem; margin-bottom: 0.75rem;">
        <span style="color: var(--text-muted);">GST (3% Jewelry Tax):</span>
        <span id="cartTaxDisplay" style="color: var(--text-primary);">₹0</span>
      </div>

      <div style="display: flex; justify-content: space-between; font-size: 1.15rem; border-top: 1px solid var(--border-color); padding-top: 0.75rem; margin-bottom: 1.25rem;">
        <span style="font-family: var(--font-serif); font-weight: 600; color: var(--text-primary);">Total Amount:</span>
        <span id="cartTotalDisplay" style="font-family: var(--font-serif); color: var(--gold-primary); font-weight: 700;">₹0</span>
      </div>

      <button class="btn-primary" style="width: 100%;" onclick="checkoutManager.openCheckout()">
        <i class="fa-solid fa-lock" style="margin-right: 0.5rem;"></i> Proceed to Checkout
      </button>
    </div>
  </div>

  <!-- ==========================================================================
       WISHLIST VAULT DRAWER
       ========================================================================== -->
  <div class="side-drawer" id="wishlistDrawer">
    <div class="drawer-header">
      <div>
        <span class="label-micro" style="color: var(--gold-primary);">Saved Items</span>
        <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-primary);">Your Wishlist</h3>
      </div>
      <button onclick="closeWishlistDrawer()" style="background: none; border: none; color: var(--text-primary); cursor: pointer; font-size: 1.25rem;">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <div class="drawer-body" id="wishlistItemsList">
      <!-- Injected via app.js -->
    </div>
  </div>

  <!-- ==========================================================================
       PRODUCT QUICK VIEW & MAGNIFICATION LOUPE MODAL
       ========================================================================== -->
  <div class="quickview-modal-backdrop" id="quickviewModalBackdrop" onclick="if(event.target === this) closeQuickView();">
    <div class="quickview-modal-container">
      
      <div style="padding: 1rem 1.5rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
        <span class="label-caps" style="color: var(--gold-primary);">Jewelry Inspection &amp; Details</span>
        <button onclick="closeQuickView()" style="background: none; border: none; color: var(--text-primary); cursor: pointer; font-size: 1.25rem;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); flex: 1; overflow-y: auto;">
        
        <!-- Left Loupe Box with Multi-Image Gallery Thumbnails -->
        <div style="display: flex; flex-direction: column; background: var(--bg-surface); border-right: 1px solid var(--border-color);">
          <div class="loupe-container" id="qvLoupeBox" style="flex: 1; min-height: 380px;">
            <img src="" alt="Jewelry Inspection" class="loupe-image" id="qvImage"/>
            <div style="position: absolute; bottom: 1rem; inset-x: 0; text-align: center; pointer-events: none;">
              <span class="label-micro" style="background: rgba(0,0,0,0.7); color: #fff; padding: 0.35rem 0.75rem; border: 1px solid var(--border-color);">
                <i class="fa-solid fa-crosshairs" style="color: var(--gold-primary); margin-right: 0.35rem;"></i> Hover over image to zoom
              </span>
            </div>
          </div>

          <!-- Multi-Angle Gallery Thumbnails (Up to 10 Angles) -->
          <div style="padding: 0.85rem 1.25rem; border-top: 1px solid var(--border-hairline); background: var(--bg-card);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <span class="label-micro" style="color: var(--gold-primary);"><i class="fa-solid fa-images" style="margin-right: 0.3rem;"></i> Available Angles &amp; Views</span>
              <span id="qvImageCountBadge" class="label-micro" style="color: var(--text-muted);"></span>
            </div>
            <div id="qvGalleryThumbnails" style="display: flex; gap: 0.6rem; overflow-x: auto; padding-bottom: 0.35rem;"></div>
          </div>
        </div>

        <!-- Right Details & Customizer -->
        <div style="padding: 2rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3 id="qvTitle" style="font-size: 1.75rem; color: var(--text-primary); line-height: 1.2; margin-bottom: 0.25rem;"></h3>
            <p id="qvSubtitle" class="label-micro" style="color: var(--gold-primary); margin-bottom: 1rem;"></p>
            
            <div style="display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1.25rem;">
              <span id="qvPrice" class="price-display" style="font-size: 1.85rem;"></span>
              <span id="qvStock" class="label-micro" style="color: #10B981; font-weight: 700;"></span>
            </div>

            <p id="qvDescription" style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;"></p>

            <!-- Specs Grid -->
            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 1rem; font-size: 0.75rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Main Gemstone:</span>
                <span id="qvGemstone" style="color: var(--text-primary); font-weight: 600;"></span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Accent Stones:</span>
                <span id="qvAccent" style="color: var(--text-primary); font-weight: 600;"></span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Metal Material:</span>
                <span id="qvMetal" style="color: var(--text-primary); font-weight: 600;"></span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Hallmark:</span>
                <span id="qvHallmark" style="color: var(--gold-primary); font-weight: 700;"></span>
              </div>
            </div>

          </div>

          <!-- Actions -->
          <div style="display: flex; gap: 1rem; border-top: 1px solid var(--border-hairline); padding-top: 1.5rem;">
            <button class="btn-primary" style="flex: 1;" onclick="handleQuickViewBuyNow()">
              <i class="fa-solid fa-lock" style="margin-right: 0.5rem;"></i> Buy Now
            </button>
            <button class="btn-secondary" style="flex: 1;" onclick="handleQuickViewAddToCart()">
              + Add To Bag
            </button>
          </div>
        </div>

      </div>

    </div>
  </div>

  <!-- ==========================================================================
       MULTI-STEP CHECKOUT & PAYMENT GATEWAYS MODAL
       ========================================================================== -->
  <div class="checkout-modal-backdrop" id="checkoutModalBackdrop" onclick="if(event.target === this) checkoutManager.closeCheckout();">
    <div class="checkout-modal-container">
      
      <!-- Modal Header -->
      <div style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; background-color: var(--bg-surface);">
        <div>
          <span class="label-micro" style="color: var(--gold-primary);">256-Bit SSL Encrypted &amp; Protected</span>
          <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-primary);">Secure Checkout</h3>
        </div>
        <button onclick="checkoutManager.closeCheckout()" style="background: none; border: none; color: var(--text-primary); cursor: pointer; font-size: 1.25rem;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- Step Indicator Tabs -->
      <div class="checkout-step-indicator">
        <div class="step-tab active" data-step="1">
          <span>1. Delivery Address</span>
        </div>
        <div class="step-tab" data-step="2">
          <span>2. Payment Method</span>
        </div>
        <div class="step-tab" data-step="3">
          <span>3. Verification</span>
        </div>
        <div class="step-tab" data-step="4">
          <span>4. Order Confirmation</span>
        </div>
      </div>

      <!-- Modal Body -->
      <div style="padding: 2rem; flex: 1; overflow-y: auto;">
        
        <!-- STEP 1: SHIPPING & 3-ADDRESS LOGISTICS SELECTOR -->
        <div class="checkout-step-content" id="checkoutStep_1">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
            
            <div id="checkoutAddressSelectorContainer">
              <!-- Dynamically populated by checkoutManager.renderAddressSelector() -->
            </div>

            <!-- Order Preview in Step 1 -->
            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 1.5rem; height: fit-content;">
              <h4 class="label-caps" style="color: var(--text-primary); margin-bottom: 1rem;">Order Summary</h4>
              <div id="checkoutSummaryList"></div>
            </div>

          </div>
        </div>

        <!-- STEP 2: MULTI-OPTION PAYMENT GATEWAY (UPI, CARDS, NET BANKING, 0% EMI, INTERNATIONAL, WALLETS) -->
        <div class="checkout-step-content" id="checkoutStep_2" style="display: none;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.5rem;">
            <div>
              <span class="label-caps" style="color: var(--gold-primary); display: block; margin-bottom: 0.2rem;">Step 2: Choose Payment Method</span>
              <h4 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-primary); margin: 0;">Haute Joaillerie Secure Gateway</h4>
            </div>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <span style="background: rgba(212, 175, 55, 0.12); border: 1px solid var(--gold-primary); color: var(--gold-primary); padding: 0.35rem 0.75rem; font-size: 0.6875rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.35rem;">
                <i class="fa-solid fa-lock"></i> 256-Bit SSL
              </span>
              <span style="background: rgba(16, 185, 129, 0.12); border: 1px solid #10B981; color: #10B981; padding: 0.35rem 0.75rem; font-size: 0.6875rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.35rem;">
                <i class="fa-solid fa-shield-halved"></i> 100% Insured
              </span>
            </div>
          </div>

          <!-- Payment Method Category Selection Tabs -->
          <div class="pay-method-nav" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.5rem; margin-bottom: 1.25rem;">
            <button type="button" class="pay-tab-btn active" data-paytab="upi" onclick="checkoutManager.switchPaymentTab('upi')">
              <i class="fa-solid fa-bolt" style="font-size: 1.1rem;"></i>
              <span>UPI &amp; QR</span>
            </button>
            <button type="button" class="pay-tab-btn" data-paytab="card" onclick="checkoutManager.switchPaymentTab('card')">
              <i class="fa-solid fa-credit-card" style="font-size: 1.1rem;"></i>
              <span>Credit / Debit</span>
            </button>
            <button type="button" class="pay-tab-btn" data-paytab="netbanking" onclick="checkoutManager.switchPaymentTab('netbanking')">
              <i class="fa-solid fa-building-columns" style="font-size: 1.1rem;"></i>
              <span>Net Banking</span>
            </button>
            <button type="button" class="pay-tab-btn" data-paytab="international" onclick="checkoutManager.switchPaymentTab('international')">
              <i class="fa-solid fa-globe" style="font-size: 1.1rem;"></i>
              <span>PayPal / Global</span>
            </button>
          </div>

          <!-- PANEL 1: UPI & DYNAMIC QR -->
          <div id="payPanel_upi" class="pay-panel" style="display: block;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; align-items: start; background: var(--bg-surface); border: 1px solid var(--border-color); padding: 1.5rem;">
              
              <!-- Left: Dynamic QR Code Box -->
              <div style="text-align: center; background: var(--bg-card); border: 1px solid var(--border-color); padding: 1.25rem; position: relative;">
                <span class="label-micro" style="color: var(--gold-primary); letter-spacing: 0.1em; display: block; margin-bottom: 0.5rem;">
                  ✦ SCAN WITH ANY UPI APP ✦
                </span>

                <!-- SVG Realistic UPI QR Frame -->
                <div class="upi-qr-box" style="width: 170px; height: 170px; margin: 0 auto 0.75rem auto; padding: 8px; background: #fff; border: 2px solid var(--gold-primary); box-shadow: 0 8px 24px rgba(212, 175, 55, 0.25);">
                  <svg viewBox="0 0 100 100" style="width: 100%; height: 100%;">
                    <rect width="100" height="100" fill="#ffffff"/>
                    <rect x="8" y="8" width="28" height="28" fill="#111111"/>
                    <rect x="13" y="13" width="18" height="18" fill="#ffffff"/>
                    <rect x="16" y="16" width="12" height="12" fill="#8C6E17"/>
                    
                    <rect x="64" y="8" width="28" height="28" fill="#111111"/>
                    <rect x="69" y="13" width="18" height="18" fill="#ffffff"/>
                    <rect x="72" y="16" width="12" height="12" fill="#8C6E17"/>
                    
                    <rect x="8" y="64" width="28" height="28" fill="#111111"/>
                    <rect x="13" y="69" width="18" height="18" fill="#ffffff"/>
                    <rect x="16" y="72" width="12" height="12" fill="#8C6E17"/>
                    
                    <rect x="42" y="12" width="16" height="8" fill="#111"/>
                    <rect x="42" y="24" width="8" height="16" fill="#111"/>
                    <rect x="54" y="24" width="6" height="8" fill="#111"/>
                    <rect x="42" y="44" width="16" height="16" fill="#8C6E17"/>
                    <rect x="12" y="44" width="20" height="6" fill="#111"/>
                    <rect x="24" y="54" width="10" height="6" fill="#111"/>
                    <rect x="64" y="44" width="28" height="8" fill="#111"/>
                    <rect x="64" y="56" width="10" height="24" fill="#111"/>
                    <rect x="78" y="56" width="14" height="8" fill="#111"/>
                    <rect x="78" y="68" width="14" height="24" fill="#111"/>
                    <rect x="42" y="64" width="16" height="8" fill="#111"/>
                    <rect x="42" y="76" width="8" height="16" fill="#111"/>
                    <rect x="54" y="84" width="6" height="8" fill="#8C6E17"/>
                  </svg>
                </div>

                <p style="font-size: 0.8125rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.15rem;">ASMI HAUTE JOAILLERIE ATELIER</p>
                <p class="label-micro" style="color: var(--text-muted); margin-bottom: 0.5rem;">Official UPI ID: <strong style="color: var(--gold-primary);">asmi.jewelry@icici</strong></p>

                <button type="button" class="btn-solid-dark" style="font-size: 0.6875rem; padding: 0.35rem 0.75rem;" onclick="navigator.clipboard?.writeText('asmi.jewelry@icici'); if (window.showToast) window.showToast('UPI Copied', 'Official UPI ID copied: asmi.jewelry@icici');">
                  <i class="fa-regular fa-copy" style="margin-right: 0.35rem; color: var(--gold-primary);"></i> Copy UPI ID
                </button>
              </div>

              <!-- Right: UPI Apps & VPA Field -->
              <div>
                <span class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.5rem;">Select Your UPI App:</span>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 0.4rem; margin-bottom: 1rem;">
                  <button type="button" class="pay-sub-pill active" data-upiapp="Google Pay" onclick="checkoutManager.setUpiApp('Google Pay')">
                    <i class="fa-brands fa-google text-blue-400"></i> GPay
                  </button>
                  <button type="button" class="pay-sub-pill" data-upiapp="PhonePe" onclick="checkoutManager.setUpiApp('PhonePe')">
                    <i class="fa-solid fa-mobile-screen-button text-purple-400"></i> PhonePe
                  </button>
                  <button type="button" class="pay-sub-pill" data-upiapp="Paytm" onclick="checkoutManager.setUpiApp('Paytm')">
                    <i class="fa-solid fa-wallet text-cyan-400"></i> Paytm
                  </button>
                  <button type="button" class="pay-sub-pill" data-upiapp="BHIM" onclick="checkoutManager.setUpiApp('BHIM')">
                    <i class="fa-solid fa-building-columns text-emerald-400"></i> BHIM
                  </button>
                  <button type="button" class="pay-sub-pill" data-upiapp="CRED" onclick="checkoutManager.setUpiApp('CRED')">
                    <i class="fa-solid fa-shield-halved text-amber-400"></i> CRED
                  </button>
                  <button type="button" class="pay-sub-pill" data-upiapp="Amazon Pay" onclick="checkoutManager.setUpiApp('Amazon Pay')">
                    <i class="fa-brands fa-amazon text-yellow-400"></i> Amazon
                  </button>
                </div>

                <div style="margin-bottom: 1rem;">
                  <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Or Enter UPI ID / Virtual Payment Address (VPA)</label>
                  <div style="display: flex; gap: 0.5rem;">
                    <input type="text" id="upi_vpa_input_wp" class="form-input" placeholder="e.g. yourname@okhdfcbank" value="patron@upi" style="font-size: 0.8125rem; flex: 1;"/>
                    <button type="button" class="btn-secondary" style="padding: 0 0.85rem; font-size: 0.6875rem;" onclick="if (window.showToast) window.showToast('UPI Request Sent', 'Payment collect request transmitted to your UPI App.');">
                      Request
                    </button>
                  </div>
                </div>

                <div style="background: rgba(212, 175, 55, 0.06); border: 1px solid var(--border-hairline); padding: 0.75rem; font-size: 0.72rem; color: var(--text-secondary); line-height: 1.4;">
                  <div style="display: flex; align-items: center; gap: 0.35rem; color: var(--gold-primary); font-weight: 700; margin-bottom: 0.2rem;">
                    <i class="fa-solid fa-shield-check"></i> Instant NPCI UPI Authorization
                  </div>
                  <p style="margin: 0; font-size: 0.68rem; color: var(--text-muted);">Zero convenience surcharge. Orders verified in real time with instant BIS 916 Hallmark certificate issuance.</p>
                </div>
              </div>

            </div>
          </div>

          <!-- PANEL 2: CREDIT & DEBIT CARDS -->
          <div id="payPanel_card" class="pay-panel" style="display: none;">
            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 1.5rem;">
              
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem; border-bottom: 1px solid var(--border-hairline); padding-bottom: 0.75rem;">
                <span class="label-micro" style="color: var(--text-muted);">Supported Global Cards:</span>
                <div style="display: flex; gap: 0.5rem; font-size: 1.25rem; color: var(--gold-primary);">
                  <i class="fa-brands fa-cc-visa" title="Visa"></i>
                  <i class="fa-brands fa-cc-mastercard" title="MasterCard"></i>
                  <i class="fa-brands fa-cc-amex" title="American Express"></i>
                  <i class="fa-brands fa-cc-diners-club" title="Diners Club"></i>
                  <i class="fa-regular fa-credit-card" title="RuPay Global"></i>
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
                <div>
                  <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Card Number *</label>
                  <div style="position: relative;">
                    <input type="text" id="card_number_input" maxlength="19" class="form-input" placeholder="4111 2222 3333 4444" style="font-size: 0.875rem; letter-spacing: 0.1em; font-family: monospace; padding-right: 2.5rem;" oninput="checkoutManager.formatCardInput(this)"/>
                    <i class="fa-solid fa-credit-card" id="cardBrandIcon_wp" style="position: absolute; right: 0.85rem; top: 50%; transform: translateY(-50%); color: var(--gold-primary); font-size: 1rem;"></i>
                  </div>
                </div>

                <div>
                  <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Cardholder Name (as on card) *</label>
                  <input type="text" id="card_holder_input" class="form-input" placeholder="e.g. PRIYA SHARMA" style="font-size: 0.8125rem; text-transform: uppercase;" value="VALUED PATRON"/>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                  <div>
                    <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Expiry Date (MM/YY) *</label>
                    <input type="text" id="card_expiry_input" maxlength="5" class="form-input" placeholder="MM/YY" style="font-size: 0.875rem; text-align: center; font-family: monospace;" oninput="checkoutManager.formatExpiryInput(this)"/>
                  </div>
                  <div>
                    <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">CVV / CVC (3-4 Digits) *</label>
                    <div style="position: relative;">
                      <input type="password" id="card_cvv_input" maxlength="4" class="form-input" placeholder="•••" style="font-size: 0.875rem; text-align: center; letter-spacing: 0.2em; font-family: monospace;"/>
                      <i class="fa-solid fa-lock" style="position: absolute; right: 0.85rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 0.75rem;" title="3 digits on back or 4 digits on Amex front"></i>
                    </div>
                  </div>
                </div>

                <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; color: var(--text-secondary); cursor: pointer; margin-top: 0.25rem;">
                  <input type="checkbox" id="card_save_checkbox_wp" checked style="accent-color: var(--gold-primary);"/>
                  <span>Securely save this card for future acquisitions (RBI Tokenized &amp; 100% Encrypted)</span>
                </label>

                <div style="background: rgba(212, 175, 55, 0.06); border: 1px solid var(--border-hairline); padding: 0.75rem; font-size: 0.72rem; color: var(--text-secondary); display: flex; align-items: center; gap: 0.5rem;">
                  <i class="fa-solid fa-shield-halved" style="color: var(--gold-primary); font-size: 1.1rem; flex-shrink: 0;"></i>
                  <span>Transactions are routed through <strong>3D Secure 2.0 OTP Authorization</strong> directly with your issuing bank.</span>
                </div>
              </div>

            </div>
          </div>

          <!-- PANEL 3: NET BANKING (50+ BANKS) -->
          <div id="payPanel_netbanking" class="pay-panel" style="display: none;">
            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 1.5rem;">
              
              <span class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.75rem;">Popular Indian &amp; Global Banks:</span>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.6rem; margin-bottom: 1.25rem;">
                <button type="button" class="pay-bank-card selected" data-bank="HDFC Bank" onclick="checkoutManager.setBank('HDFC Bank')">
                  <i class="fa-solid fa-building-columns" style="font-size: 1.2rem; color: #004C8F;"></i>
                  <span>HDFC Bank</span>
                </button>
                <button type="button" class="pay-bank-card" data-bank="ICICI Bank" onclick="checkoutManager.setBank('ICICI Bank')">
                  <i class="fa-solid fa-building-columns" style="font-size: 1.2rem; color: #B02A30;"></i>
                  <span>ICICI Bank</span>
                </button>
                <button type="button" class="pay-bank-card" data-bank="State Bank of India (SBI)" onclick="checkoutManager.setBank('State Bank of India (SBI)')">
                  <i class="fa-solid fa-building-columns" style="font-size: 1.2rem; color: #2D68C4;"></i>
                  <span>SBI</span>
                </button>
                <button type="button" class="pay-bank-card" data-bank="Axis Bank" onclick="checkoutManager.setBank('Axis Bank')">
                  <i class="fa-solid fa-building-columns" style="font-size: 1.2rem; color: #97144D;"></i>
                  <span>Axis Bank</span>
                </button>
                <button type="button" class="pay-bank-card" data-bank="Kotak Mahindra Bank" onclick="checkoutManager.setBank('Kotak Mahindra Bank')">
                  <i class="fa-solid fa-building-columns" style="font-size: 1.2rem; color: #EE1C25;"></i>
                  <span>Kotak Bank</span>
                </button>
                <button type="button" class="pay-bank-card" data-bank="Punjab National Bank (PNB)" onclick="checkoutManager.setBank('Punjab National Bank (PNB)')">
                  <i class="fa-solid fa-building-columns" style="font-size: 1.2rem; color: #A20A27;"></i>
                  <span>PNB</span>
                </button>
              </div>

              <div>
                <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Or Select from 50+ Other Scheduled Banks</label>
                <select id="netbanking_bank_select" class="form-input" style="font-size: 0.8125rem;" onchange="checkoutManager.setBank(this.value)">
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
                  <option value="Axis Bank">Axis Bank</option>
                  <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                  <option value="Punjab National Bank (PNB)">Punjab National Bank (PNB)</option>
                  <option value="Bank of Baroda">Bank of Baroda</option>
                  <option value="IndusInd Bank">IndusInd Bank</option>
                  <option value="IDFC FIRST Bank">IDFC FIRST Bank</option>
                  <option value="Federal Bank">Federal Bank</option>
                  <option value="Yes Bank">Yes Bank</option>
                  <option value="Canara Bank">Canara Bank</option>
                  <option value="Union Bank of India">Union Bank of India</option>
                  <option value="Standard Chartered Bank">Standard Chartered Bank</option>
                  <option value="HSBC India">HSBC India</option>
                  <option value="Citi Bank India">Citi Bank India</option>
                  <option value="RBL Bank">RBL Bank</option>
                  <option value="DBS Bank">DBS Bank India</option>
                  <option value="Bandhan Bank">Bandhan Bank</option>
                  <option value="South Indian Bank">South Indian Bank</option>
                  <option value="Indian Bank">Indian Bank</option>
                  <option value="Central Bank of India">Central Bank of India</option>
                </select>
              </div>

              <div style="margin-top: 1rem; background: rgba(212, 175, 55, 0.06); border: 1px solid var(--border-hairline); padding: 0.75rem; font-size: 0.72rem; color: var(--text-secondary);">
                <i class="fa-solid fa-arrow-up-right-from-square" style="color: var(--gold-primary); margin-right: 0.35rem;"></i>
                You will be seamlessly connected to your bank's secure netbanking portal to authorize payment.
              </div>

            </div>
          </div>

          <!-- PANEL 5: INTERNATIONAL & PAYPAL -->
          <div id="payPanel_international" class="pay-panel" style="display: none;">
            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 1.5rem;">
              
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; border-bottom: 1px solid var(--border-hairline); padding-bottom: 0.75rem;">
                <div>
                  <span class="label-caps" style="color: var(--gold-primary); font-size: 0.7rem;">Global Patrons &amp; NRI Concierge</span>
                  <h4 style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--text-primary); margin: 0.15rem 0 0 0;">Worldwide Multi-Currency Checkout</h4>
                </div>
                <span class="category-badge" style="background: rgba(212, 175, 55, 0.15); color: var(--gold-primary); font-size: 0.65rem;">
                  <i class="fa-solid fa-plane"></i> Global Insured Air Transit
                </span>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.75rem; margin-bottom: 1.25rem;">
                <button type="button" class="pay-bank-card selected" data-intl="PayPal Express" onclick="checkoutManager.setInternational('PayPal Express')">
                  <i class="fa-brands fa-paypal" style="font-size: 1.5rem; color: #003087;"></i>
                  <span>PayPal Express</span>
                  <span class="label-micro" style="color: #10B981; font-size: 0.6rem;">Instant NRI Checkout</span>
                </button>
                <button type="button" class="pay-bank-card" data-intl="Stripe Global 3DS" onclick="checkoutManager.setInternational('Stripe Global 3DS')">
                  <i class="fa-brands fa-stripe" style="font-size: 1.5rem; color: #635BFF;"></i>
                  <span>Stripe Global 3DS</span>
                  <span class="label-micro" style="color: var(--gold-primary); font-size: 0.6rem;">135+ Currencies</span>
                </button>
                <button type="button" class="pay-bank-card" data-intl="Armored Wire Transfer (SWIFT)" onclick="checkoutManager.setInternational('Armored Wire Transfer (SWIFT)')">
                  <i class="fa-solid fa-landmark-flag" style="font-size: 1.5rem; color: var(--gold-primary);"></i>
                  <span>Royal SWIFT Wire</span>
                  <span class="label-micro" style="color: var(--text-muted); font-size: 0.6rem;">Bespoke Vault Protocol</span>
                </button>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div>
                  <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Settlement Currency</label>
                  <select id="intl_currency_select" class="form-input" style="font-size: 0.8125rem;">
                    <option value="USD">USD ($) - United States Dollar</option>
                    <option value="EUR">EUR (€) - Eurozone</option>
                    <option value="GBP">GBP (£) - British Pound</option>
                    <option value="AED">AED (د.إ) - UAE Dirham</option>
                    <option value="CAD">CAD ($) - Canadian Dollar</option>
                    <option value="AUD">AUD ($) - Australian Dollar</option>
                    <option value="SGD">SGD ($) - Singapore Dollar</option>
                  </select>
                </div>
                <div>
                  <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Country of Origin</label>
                  <input type="text" id="intl_country_input" class="form-input" placeholder="e.g. United States / UAE / UK" value="United States" style="font-size: 0.8125rem;"/>
                </div>
              </div>

              <div style="background: rgba(212, 175, 55, 0.06); border: 1px solid var(--border-hairline); padding: 0.75rem; font-size: 0.72rem; color: var(--text-secondary);">
                <i class="fa-solid fa-passport" style="color: var(--gold-primary); margin-right: 0.35rem;"></i>
                Includes 100% Comprehensive Transit Insurance, Customs Documentation, &amp; BIS Authenticity Certificate translation.
              </div>

            </div>
          </div>


          <!-- Action Buttons -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.75rem; border-top: 1px solid var(--border-hairline); padding-top: 1.5rem; flex-wrap: wrap; gap: 0.75rem;">
            <button type="button" class="btn-secondary" onclick="checkoutManager.goToStep(1)">
              <i class="fa-solid fa-arrow-left" style="margin-right: 0.5rem;"></i> Back to Address
            </button>
            <button type="button" class="btn-primary" id="btnCompletePayment" onclick="checkoutManager.processPayment()" style="padding: 0.85rem 1.75rem; font-size: 0.8125rem;">
              <i class="fa-solid fa-shield-check" style="margin-right: 0.5rem; color: var(--gold-primary);"></i> Confirm &amp; Authorize Payment
            </button>
          </div>
        </div>

        <!-- STEP 3: SECURITY AUTHENTICATION PROGRESS -->
        <div class="checkout-step-content" id="checkoutStep_3" style="display: none; text-align: center; padding: 4rem 1rem;">
          <div class="animate-spin-slow" style="width: 80px; height: 80px; border: 3px solid var(--border-color); border-top-color: var(--gold-primary); margin: 0 auto 2rem auto;"></div>
          <span class="label-caps" style="color: var(--gold-primary); display: block; margin-bottom: 0.5rem;">Secure Bank Verification</span>
          <h3 id="paymentStatusText" style="font-family: var(--font-serif); font-size: 1.75rem; color: var(--text-primary); margin-bottom: 1.5rem;">
            Connecting with secure bank server...
          </h3>
          <div style="width: 100%; max-width: 440px; height: 6px; background: var(--bg-surface); border: 1px solid var(--border-color); margin: 0 auto; overflow: hidden;">
            <div id="paymentProgressBar" style="width: 15%; height: 100%; background: var(--gold-primary); transition: width 0.4s ease;"></div>
          </div>
        </div>

        <!-- STEP 4: ORDER CONFIRMATION & CERTIFICATE RECEIPT -->
        <div class="checkout-step-content" id="checkoutStep_4" style="display: none;">
          <div id="orderConfirmationContent"></div>
        </div>

      </div>

    </div>
  </div>

  <!-- ==========================================================================
       MY ORDERS MODAL & ORDER HISTORY
       ========================================================================== -->
  <div class="orders-modal-backdrop" id="ordersModalBackdrop" onclick="if(event.target === this) ordersManager.closeOrdersModal();">
    <div class="orders-modal-container">
      <div style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; background-color: var(--bg-surface); flex-shrink: 0;">
        <div>
          <span class="label-micro" style="color: var(--gold-primary);">Real-Time Order &amp; Delivery Tracking</span>
          <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-primary);">My Orders &amp; Heirloom Shipments</h3>
        </div>
        <button onclick="ordersManager.closeOrdersModal()" style="background: none; border: none; color: var(--text-primary); cursor: pointer; font-size: 1.25rem;" title="Close Orders">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="orders-modal-scrollable" id="ordersListContainer" tabindex="0">
        <!-- Rendered by ordersManager.renderOrdersList() -->
      </div>
    </div>
  </div>

  <!-- ==========================================================================
       5-STAGE PACKAGE TRACKER MODAL (10-12 DAYS DELIVERY TIMELINE)
       ========================================================================== -->
  <div class="orders-modal-backdrop" id="trackerModalBackdrop" onclick="if(event.target === this) ordersManager.closePackageTracker();">
    <div class="orders-modal-container" style="max-width: 680px;">
      <div style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; background-color: var(--bg-surface); flex-shrink: 0;">
        <div>
          <span class="label-micro" style="color: var(--gold-primary);"><i class="fa-solid fa-shield-halved"></i> 100% Insured Armored Transit</span>
          <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-primary);">Track Your Package (5 Milestones)</h3>
        </div>
        <button onclick="ordersManager.closePackageTracker()" style="background: none; border: none; color: var(--text-primary); cursor: pointer; font-size: 1.25rem;" title="Close Tracker">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="orders-modal-scrollable" id="trackerModalScrollContainer" tabindex="0">
        <!-- Package Info Summary Card -->
        <div style="background-color: var(--bg-surface); border: 1px solid var(--border-color); padding: 1.25rem; margin-bottom: 1.75rem;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <span class="label-micro" style="color: var(--text-muted); display: block;">Order Reference</span>
              <span id="trk_orderId" style="font-family: monospace; font-size: 0.875rem; font-weight: 700; color: var(--gold-primary);">ASM-2026-784109</span>
            </div>
            <div>
              <span class="label-micro" style="color: var(--text-muted); display: block;">Tracking AWB Number</span>
              <span id="trk_trackingId" style="font-family: monospace; font-size: 0.875rem; font-weight: 700; color: var(--text-primary);">ASMI-BD-894021-IN</span>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; border-top: 1px solid var(--border-hairline); padding-top: 0.75rem;">
            <div>
              <span class="label-micro" style="color: var(--text-muted); display: block;">Armored Carrier</span>
              <span id="trk_courier" style="font-size: 0.8125rem; font-weight: 600; color: var(--text-primary);">BlueDart Armored Logistics</span>
            </div>
            <div>
              <span class="label-micro" style="color: var(--text-muted); display: block;">Delivery Span (10 to 12 Days)</span>
              <span id="trk_deliverySpan" style="font-size: 0.8125rem; font-weight: 600; color: #10B981;">10 - 12 Business Days</span>
            </div>
          </div>
        </div>

        <!-- 5-Stage Step-by-Step Milestones Timeline -->
        <div id="trackerStepsContainer" style="padding: 0 0.5rem;">
          <!-- Dynamically generated 5 steps with live statuses -->
        </div>
      </div>
    </div>
  </div>

  <!-- ==========================================================================
       SUBMIT REVIEW & PHOTO UPLOAD MODAL
       ========================================================================== -->
  <div class="orders-modal-backdrop" id="reviewModalBackdrop" onclick="if(event.target === this) reviewsManager.closeSubmitReviewModal();">
    <div class="orders-modal-container" style="max-width: 640px;">
      <div style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; background-color: var(--bg-surface);">
        <div>
          <span class="label-micro" style="color: var(--gold-primary);">Client Experience &amp; Authenticity</span>
          <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-primary);">Share Your Jewelry Review</h3>
        </div>
        <button onclick="reviewsManager.closeSubmitReviewModal()" style="background: none; border: none; color: var(--text-primary); cursor: pointer; font-size: 1.25rem;" title="Close Review Modal">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div style="padding: 1.5rem 2rem; flex: 1; overflow-y: auto;">
        <form id="submitReviewForm" onsubmit="reviewsManager.handleReviewSubmit(event)" style="display: flex; flex-direction: column; gap: 1.25rem;">
          
          <!-- Product Selector -->
          <div>
            <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Select Jewelry Piece *</label>
            <select id="rev_product" required class="form-input"></select>
          </div>

          <!-- Interactive Star Rating Picker (1 to 5 Stars) -->
          <div>
            <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Your Rating *</label>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <div style="display: flex; gap: 0.25rem;">
                <button type="button" class="star-picker-btn" data-value="1" onclick="reviewsManager.setRating(1)" title="1 Star"><i class="fa-solid fa-star" style="color: var(--gold-primary);"></i></button>
                <button type="button" class="star-picker-btn" data-value="2" onclick="reviewsManager.setRating(2)" title="2 Stars"><i class="fa-solid fa-star" style="color: var(--gold-primary);"></i></button>
                <button type="button" class="star-picker-btn" data-value="3" onclick="reviewsManager.setRating(3)" title="3 Stars"><i class="fa-solid fa-star" style="color: var(--gold-primary);"></i></button>
                <button type="button" class="star-picker-btn" data-value="4" onclick="reviewsManager.setRating(4)" title="4 Stars"><i class="fa-solid fa-star" style="color: var(--gold-primary);"></i></button>
                <button type="button" class="star-picker-btn" data-value="5" onclick="reviewsManager.setRating(5)" title="5 Stars"><i class="fa-solid fa-star" style="color: var(--gold-primary);"></i></button>
              </div>
              <span id="starRatingLabel" style="font-size: 0.8125rem; font-weight: 600; color: var(--gold-primary); margin-left: 0.5rem;">5 Stars - Exceptional Haute Joaillerie!</span>
            </div>
          </div>

          <!-- Reviewer Info -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
              <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Your Name *</label>
              <input type="text" id="rev_name" required class="form-input" placeholder="e.g. Priyadarshini Mehta"/>
            </div>
            <div>
              <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">City / State *</label>
              <input type="text" id="rev_city" required class="form-input" placeholder="e.g. Mumbai, Maharashtra"/>
            </div>
          </div>

          <!-- Headline / Title -->
          <div>
            <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Headline / Title *</label>
            <input type="text" id="rev_title" required class="form-input" placeholder="e.g. Absolute Royalty! Stunning Luster and Finish"/>
          </div>

          <!-- Comment Text -->
          <div>
            <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Your Detailed Review *</label>
            <textarea id="rev_comment" required rows="4" class="form-input" placeholder="Tell other patrons about the shine, pearl quality, packaging, and how it felt wearing it..."></textarea>
          </div>

          <!-- JPEG / PNG Image Upload Dropzone -->
          <div>
            <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Upload Product Photo (JPEG or PNG)</label>
            <div class="image-dropzone" onclick="document.getElementById('reviewImageInput').click();">
              <input type="file" id="reviewImageInput" accept="image/jpeg,image/png,image/webp" style="display: none;" onchange="reviewsManager.handleImageUpload(event)" />
              <i class="fa-solid fa-cloud-arrow-up" style="font-size: 1.75rem; color: var(--gold-primary); margin-bottom: 0.5rem; display: block;"></i>
              <p style="font-size: 0.8125rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem;">
                Click to Upload Jewelry Photo
              </p>
              <p class="label-micro" style="color: var(--text-muted);">
                Supports JPEG and PNG formats (Max 10MB). Opens in wide lightbox view.
              </p>
            </div>
            <div id="uploadedPhotoPreview" style="margin-top: 0.75rem; display: none;"></div>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn-primary" style="padding: 0.85rem; font-size: 0.75rem; margin-top: 0.5rem;">
            Publish Review Universally
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- ==========================================================================
       WIDE VIEW FULL-SCREEN PHOTO LIGHTBOX MODAL
       ========================================================================== -->
  <div class="photo-lightbox-backdrop" id="photoLightboxModal" onclick="if(event.target === this) reviewsManager.closePhotoLightbox();">
    <div class="photo-lightbox-box">
      <!-- Lightbox Header -->
      <div style="padding: 1rem 1.5rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; background-color: var(--bg-surface);">
        <div>
          <span class="label-micro" style="color: var(--gold-primary);"><i class="fa-solid fa-camera"></i> Verified Patron High-Res Photo</span>
          <h3 id="lightboxJewelTitle" style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-primary); margin-top: 2px;">ASMI Masterpiece</h3>
        </div>
        <button onclick="reviewsManager.closePhotoLightbox()" style="background: none; border: none; color: var(--text-primary); cursor: pointer; font-size: 1.4rem; padding: 0.25rem;" title="Close Wide View">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- Stage -->
      <div class="lightbox-image-stage">
        <img id="lightboxFullImage" src="" alt="Full-size client jewelry photo" />
      </div>

      <!-- Lightbox Footer -->
      <div style="padding: 1rem 1.5rem; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; background-color: var(--bg-card); flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <p id="lightboxReviewer" style="font-size: 0.875rem; font-weight: 600; color: var(--text-primary);"></p>
          <span id="lightboxDate" class="label-micro" style="color: var(--text-muted);"></span>
        </div>
        <div id="lightboxStars" style="display: flex; gap: 0.25rem; font-size: 0.875rem;"></div>
      </div>
    </div>
  </div>

  <!-- ==========================================================================
       ORDER ITEM CANCELLATION MODAL
       ========================================================================== -->
  <div class="orders-modal-backdrop" id="orderCancelModalBackdrop" onclick="if(event.target === this) ordersManager.closeCancelItemModal();">
    <div class="orders-modal-container" style="max-width: 580px;">
      <div style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; background-color: var(--bg-surface);">
        <div>
          <span class="label-micro" style="color: #ef4444;"><i class="fa-solid fa-ban"></i> Item Cancellation Protocol</span>
          <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-primary); margin-top: 2px;">Cancel Ordered Item</h3>
        </div>
        <button onclick="ordersManager.closeCancelItemModal()" style="background: none; border: none; color: var(--text-primary); cursor: pointer; font-size: 1.25rem;" title="Close">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div style="padding: 1.5rem; flex: 1; overflow-y: auto;">
        <form onsubmit="ordersManager.submitCancelItem(event)" style="display: flex; flex-direction: column; gap: 1.25rem;">
          <input type="hidden" id="cancelModalOrderNumber" value="" />
          <input type="hidden" id="cancelModalItemId" value="" />
          <input type="hidden" id="cancelModalItemIndex" value="0" />

          <!-- Selected Item Preview -->
          <div id="cancelItemSummary"></div>

          <div>
            <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Reason for Cancellation *</label>
            <select id="cancelReasonSelect" required class="form-input" style="font-size: 0.8125rem;">
              <option value="Changed mind / Ordered by mistake">Changed mind / Ordered by mistake</option>
              <option value="Selected incorrect necklace length or gold finish">Selected incorrect necklace length or gold finish</option>
              <option value="Found alternative heirloom design">Found alternative heirloom design</option>
              <option value="Delivery window timeline (10-12 days) not suitable">Delivery window timeline (10-12 days) not suitable</option>
              <option value="Bespoke customization / custom order request">Bespoke customization / custom order request</option>
              <option value="Other reason">Other reason</option>
            </select>
          </div>

          <div>
            <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Additional Notes / Comments for Master Atelier Desk (Optional)</label>
            <textarea id="cancelReasonNotes" class="form-input" rows="3" placeholder="Provide any extra details or instructions regarding your refund/exchange..."></textarea>
          </div>

          <!-- Email notification disclosure box -->
          <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3); padding: 1rem; border-radius: 6px; font-size: 0.775rem; color: var(--text-secondary); line-height: 1.5;">
            <i class="fa-solid fa-envelope-circle-check" style="color: #ef4444; margin-right: 0.35rem;"></i>
            <strong>Instant Email Notifications:</strong> Upon confirming cancellation, our Master Atelier Admin is immediately dispatched an alert email containing all your patron details, order info, and reason. A cancellation confirmation receipt is also delivered to your registered email address.
          </div>

          <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 0.5rem;">
            <button type="button" class="btn-secondary" onclick="ordersManager.closeCancelItemModal()" style="font-size: 0.75rem; padding: 0.75rem 1.25rem;">
              Keep Item
            </button>
            <button type="submit" class="btn-primary" style="background: #ef4444; border-color: #ef4444; color: #fff; font-size: 0.75rem; padding: 0.75rem 1.5rem;">
              <i class="fa-solid fa-ban" style="margin-right: 0.35rem;"></i> Confirm Item Cancellation
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- ==========================================================================
       CUSTOMER SUPPORT & HAUTE JOAILLERIE AI CONCIERGE MODAL
       ========================================================================== -->
  <div class="asmi-support-modal-backdrop" id="asmiSupportModal" onclick="if(event.target === this) supportManager.closeSupportModal();">
    <div class="asmi-support-modal-container">
      <!-- Luxury Gold Top Shimmer Line -->
      <div class="support-gold-shimmer-bar"></div>

      <!-- Modal Header -->
      <div class="asmi-support-header">
        <div style="display: flex; align-items: center; gap: 0.85rem; min-width: 0;">
          <div class="support-header-avatar">
            <i class="fa-solid fa-crown"></i>
            <span class="avatar-online-dot"></span>
          </div>
          <div style="min-width: 0;">
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-primary); margin: 0; white-space: nowrap; letter-spacing: 0.02em;">ASMI Atelier Concierge</h3>
              <span class="support-status-chip"><span class="chip-dot"></span> 24/7 Live AI</span>
            </div>
            <p class="label-micro" style="color: var(--text-muted); margin: 0.2rem 0 0 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              Hotline: <span id="suppHeaderPhone" style="color: var(--gold-primary); font-family: monospace; font-weight: 700;">+91 98765 43210</span> &bull; <span id="suppHeaderEmail">support@asmijewelry.com</span>
            </p>
          </div>
        </div>

        <div class="support-header-actions">
          <button type="button" onclick="supportManager.resetAiChat()" class="support-tool-btn" title="Restart Conversation">
            <i class="fa-solid fa-rotate-left"></i>
          </button>
          <button type="button" onclick="supportManager.closeSupportModal()" class="support-tool-btn close-btn" title="Close Concierge">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <!-- Tab Switcher (AI Concierge vs Live Admin Chat) -->
      <div class="asmi-support-tab-nav">
        <button id="suppTabAiBtn" class="support-tab-btn active" onclick="supportManager.switchChatTab('ai')">
          <i class="fa-solid fa-sparkles gold-glow-icon"></i> AI Concierge Assistant
        </button>
        <button id="suppTabAdminBtn" class="support-tab-btn" onclick="supportManager.switchChatTab('admin')">
          <i class="fa-solid fa-user-shield"></i> Master Jeweler Admin
        </button>
      </div>

      <!-- Mode 1: AI Chat Assistant View -->
      <div id="suppAiView" class="asmi-support-content-view">
        <!-- Quick Carousel Shortcuts -->
        <div class="support-carousel-strip">
          <button class="support-shortcut-pill" onclick="supportManager.sendAiMessage('How do I cancel an ordered item?')">
            <i class="fa-solid fa-ban" style="color: #ef4444;"></i> Cancel Item
          </button>
          <button class="support-shortcut-pill" onclick="supportManager.sendAiMessage('Where is my package / Track order')">
            <i class="fa-solid fa-truck-fast" style="color: var(--gold-primary);"></i> Track Package (10-12 Days)
          </button>
          <button class="support-shortcut-pill" onclick="supportManager.sendAiMessage('Tell me about BIS 916 Hallmark and certificate')">
            <i class="fa-solid fa-certificate" style="color: #10B981;"></i> BIS 916 Hallmark
          </button>
          <button class="support-shortcut-pill" onclick="supportManager.sendAiMessage('Custom Bridal Sizing & Lengths')">
            <i class="fa-solid fa-ruler" style="color: #3B82F6;"></i> Custom Sizing
          </button>
          <button class="support-shortcut-pill" onclick="supportManager.sendAiMessage('How to care for natural pearls and emeralds?')">
            <i class="fa-solid fa-gem" style="color: #D4AF37;"></i> Pearl Care
          </button>
          <button class="support-shortcut-pill" onclick="supportManager.switchChatTab('admin')">
            <i class="fa-solid fa-comments" style="color: #A855F7;"></i> Live Admin Desk
          </button>
        </div>

        <!-- Chat Conversation Messages Body -->
        <div class="asmi-chat-messages-body" id="suppAiMessagesBody">
          <!-- Dynamically rendered AI and Patron bubbles -->
        </div>

        <!-- Luxury Interactive Composer -->
        <div class="asmi-chat-composer">
          <div class="composer-input-wrapper">
            <i class="fa-solid fa-sparkles composer-sparkle-icon"></i>
            <input type="text" id="suppAiInput" placeholder="Ask anything about orders, item cancellations, sizing, hallmark..." class="composer-text-input" autocomplete="off" onkeydown="if(event.key === 'Enter') supportManager.sendAiMessage();" />
            <button type="button" class="composer-mic-btn" onclick="supportManager.sendAiMessage('Tell me about BIS 916 Hallmark certification')" title="Quick Prompt suggestions">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
            </button>
          </div>
          <button class="composer-send-btn" onclick="supportManager.sendAiMessage();" title="Send Question (Enter)">
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>

      <!-- Mode 2: Live Admin Chat View -->
      <div id="suppAdminView" class="asmi-support-content-view" style="display: none;">
        <div id="suppAdminMessagesContainer" style="height: 100%; display: flex; flex-direction: column;">
          <!-- Dynamically rendered thread list & conversation stream -->
        </div>
      </div>
    </div>
  </div>

  <!-- Floating AI Jewelry Concierge Action Charm (Bottom Left) -->
  <div id="asmiSupportWidgetTrigger" class="asmi-support-floating-pill" onclick="supportManager.openSupportModal('ai')" title="AI Jewelry Concierge - 24/7 Bespoke Guidance">
    <div class="pulse-ring"></div>
    <div class="floating-pill-content">
      <div class="floating-charm-crest">
        <i class="fa-solid fa-wand-magic-sparkles"></i>
        <span class="charm-pulse-dot"></span>
      </div>
      <div class="floating-text-stack">
        <span class="pill-label">AI Jewelry Concierge</span>
        <span class="pill-sub">24/7 Fine Jewelry AI</span>
      </div>
      <i class="fa-solid fa-sparkles gold-glow-icon"></i>
    </div>
  </div>

  <!-- ==========================================================================
       PATRON AUTHENTICATION & REGISTRATION MODAL (SIGN IN VS SIGN UP)
       ========================================================================== -->
  <div class="patron-modal-backdrop" id="patronAuthModal" onclick="if(event.target === this) authManager.closeAuthModal();">
    <div class="patron-auth-card" style="max-width: 520px; max-height: 90vh; overflow-y: auto;">
      <button type="button" onclick="authManager.closeAuthModal()" class="modal-close-btn" title="Close Authentication" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.25rem; z-index: 10;">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <!-- Gated Purchase Alert Callout -->
      <div id="authCheckoutGateNotice" style="display: none; background: rgba(212, 175, 55, 0.12); border: 1px solid var(--gold-primary); padding: 0.85rem 1rem; margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <i class="fa-solid fa-lock" style="color: var(--gold-primary); font-size: 1.1rem; flex-shrink: 0;"></i>
          <div>
            <strong style="color: var(--gold-primary); font-size: 0.8125rem; display: block;">Mandatory Patron Verification</strong>
            <p id="authCheckoutGateText" class="label-micro" style="color: var(--text-primary); margin: 0; line-height: 1.4;">
              Signing up and creating an account with your delivery address is mandatory to acquire jewelry from ASMI.
            </p>
          </div>
        </div>
      </div>

      <!-- Main Header -->
      <div style="text-align: center; margin-bottom: 1.25rem;">
        <div class="patron-auth-badge-icon">
          <i class="fa-solid fa-crown"></i>
        </div>
        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--text-primary); margin-bottom: 0.25rem;">ASMI Atelier VIP Portal</h3>
        <p style="font-size: 0.8125rem; color: var(--text-muted); line-height: 1.4; max-width: 380px; margin: 0 auto;">
          Sign in or register your customer profile to save delivery addresses, track insured shipments, and access heirloom collections.
        </p>
      </div>

      <!-- Mode Switcher Tabs: Sign In vs Create Account -->
      <div class="auth-method-tabs" style="margin-bottom: 1.25rem;">
        <button type="button" class="auth-method-tab active" id="authTabModeSignin" onclick="authManager.setAuthMode('signin')">
          <i class="fa-solid fa-right-to-bracket"></i> Sign In
        </button>
        <button type="button" class="auth-method-tab" id="authTabModeSignup" onclick="authManager.setAuthMode('signup')">
          <i class="fa-solid fa-user-plus"></i> Create Account (Mandatory)
        </button>
      </div>

      <!-- ================= VIEW A: SIGN IN ================= -->
      <div id="authViewSignin">
        <!-- STEP 1: Method Selection (Google 1-Click / Phone / Email) -->
        <div id="authStep_1">
          <!-- 1-Click Google / Gmail Button -->
          <button type="button" class="btn-google-auth" onclick="authManager.signInWithGoogle()" title="Sign In with Google Account">
            <svg class="google-svg-icon" viewBox="0 0 48 48" style="width: 20px; height: 20px; flex-shrink: 0;">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            <span style="font-weight: 600;">Continue with Google (Gmail)</span>
          </button>

          <div class="auth-divider-line">
            <span>OR SIGN IN WITH OTP</span>
          </div>

          <!-- Method Selector Tabs (Phone vs Email) -->
          <div class="auth-method-tabs" style="margin-bottom: 1rem;">
            <button type="button" class="auth-method-tab active" id="authTabPhone" onclick="authManager.setAuthMethod('phone')">
              <i class="fa-solid fa-mobile-screen"></i> Mobile OTP
            </button>
            <button type="button" class="auth-method-tab" id="authTabEmail" onclick="authManager.setAuthMethod('email')">
              <i class="fa-regular fa-envelope"></i> Email / Gmail OTP
            </button>
          </div>

          <form onsubmit="authManager.handleSendOTP(event)" style="display: flex; flex-direction: column; gap: 0.85rem;">
            <div>
              <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Your Full Name (Optional)</label>
              <input type="text" id="authNameInput" class="form-input" placeholder="e.g. Gayatri Roy" autocomplete="name"/>
            </div>

            <!-- Phone Number Input -->
            <div id="authPhoneGroup">
              <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Indian Mobile Number *</label>
              <div style="display: flex; gap: 0.5rem;">
                <div style="padding: 0.65rem 0.85rem; background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--gold-primary); font-weight: 700; font-size: 0.8125rem; display: flex; align-items: center; gap: 0.35rem; flex-shrink: 0;">
                  <span>🇮🇳 +91</span>
                </div>
                <input type="tel" id="authPhoneInput" class="form-input" placeholder="98765 43210" maxlength="14" autocomplete="tel"/>
              </div>
            </div>

            <!-- Email Input -->
            <div id="authEmailGroup" style="display: none;">
              <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Gmail or Personal Email Address *</label>
              <input type="email" id="authEmailInput" class="form-input" placeholder="patron@gmail.com" autocomplete="email"/>
            </div>

            <button type="submit" class="btn-primary" style="padding: 0.85rem; font-size: 0.75rem; width: 100%; margin-top: 0.35rem;">
              <i class="fa-solid fa-paper-plane" style="margin-right: 0.4rem;"></i> Send 4-Digit Verification Passcode
            </button>

            <div style="text-align: center; margin-top: 0.25rem; font-size: 0.7rem; color: var(--text-muted); display: flex; align-items: center; justify-content: center; gap: 0.35rem;">
              <i class="fa-solid fa-shield-halved" style="color: var(--gold-primary);"></i>
              <span>256-Bit Encrypted OTP Verification | Perpetual VIP Recognition</span>
            </div>
          </form>
        </div>

        <!-- STEP 2: OTP Verification Screen -->
        <div id="authStep_2" style="display: none;">
          <div style="text-align: center; margin-bottom: 1.25rem;">
            <div class="patron-auth-badge-icon" style="background: rgba(16, 185, 129, 0.15); border-color: #10B981; color: #10B981;">
              <i class="fa-solid fa-key"></i>
            </div>
            <span class="label-caps" style="color: #10B981; display: block; margin-bottom: 0.25rem; font-size: 0.65rem;">Passcode Verification</span>
            <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-primary); margin-bottom: 0.35rem;">Enter Verification Code</h3>
            <p style="font-size: 0.8125rem; color: var(--text-muted); line-height: 1.4;">
              We've sent a 4-digit code to <strong id="otpTargetDisplay" style="color: var(--text-primary);">+91 98765 43210</strong>
            </p>
          </div>

          <!-- Live OTP Delivery Confirmation Card -->
          <div id="otpDeliveryNotice" style="background: rgba(212, 175, 55, 0.08); border: 1px solid rgba(212, 175, 55, 0.25); padding: 0.85rem 1rem; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.65rem; border-radius: 2px;">
            <i class="fa-solid fa-paper-plane" id="otpDeliveryIcon" style="color: var(--gold-primary); font-size: 1.1rem; flex-shrink: 0;"></i>
            <span id="otpDeliveryText" style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.45;">
              A confidential 4-digit verification code has been dispatched. Please enter it below.
            </span>
          </div>

          <!-- 4 Digit Boxes -->
          <div class="otp-boxes-grid">
            <input type="text" id="otpDigit_1" maxlength="1" class="otp-box-input" oninput="authManager.handleDigitInput(1, event)" onkeydown="authManager.handleDigitKeyDown(1, event)" autocomplete="off" />
            <input type="text" id="otpDigit_2" maxlength="1" class="otp-box-input" oninput="authManager.handleDigitInput(2, event)" onkeydown="authManager.handleDigitKeyDown(2, event)" autocomplete="off" />
            <input type="text" id="otpDigit_3" maxlength="1" class="otp-box-input" oninput="authManager.handleDigitInput(3, event)" onkeydown="authManager.handleDigitKeyDown(3, event)" autocomplete="off" />
            <input type="text" id="otpDigit_4" maxlength="1" class="otp-box-input" oninput="authManager.handleDigitInput(4, event)" onkeydown="authManager.handleDigitKeyDown(4, event)" autocomplete="off" />
          </div>

          <button type="button" class="btn-primary" style="padding: 0.85rem; font-size: 0.75rem; width: 100%; margin-bottom: 1rem;" onclick="authManager.verifyOTP()">
            <i class="fa-solid fa-shield-halved" style="margin-right: 0.4rem;"></i> Verify OTP &amp; Enter Atelier
          </button>

          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; border-top: 1px solid var(--border-hairline); padding-top: 1rem;">
            <button type="button" class="btn-link-action" onclick="authManager.backToStep1()">
              <i class="fa-solid fa-arrow-left"></i> Change Destination
            </button>
            <div>
              <span id="otpTimerText" style="color: var(--text-muted);">Resend in <strong id="otpCountdown" style="color: var(--gold-primary);">30</strong>s</span>
              <button type="button" id="otpResendBtn" class="btn-link-action" style="display: none; color: var(--gold-primary);" onclick="authManager.resendOTP()">
                <i class="fa-solid fa-rotate-right"></i> Resend OTP Code
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= VIEW B: CREATE ACCOUNT / REGISTRATION (MANDATORY ADDRESS) ================= -->
      <div id="authViewSignup" style="display: none;">
        <form onsubmit="authManager.handlePatronSignUp(event)" style="display: flex; flex-direction: column; gap: 0.85rem;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem;">
            <div>
              <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Full Legal Name *</label>
              <input type="text" id="signup_name" required class="form-input" placeholder="e.g. Gayatri Roy" autocomplete="name"/>
            </div>
            <div>
              <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Email Address *</label>
              <input type="email" id="signup_email" required class="form-input" placeholder="name@domain.com" autocomplete="email"/>
            </div>
          </div>

          <div>
            <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Mobile Number (For Courier OTP &amp; Updates) *</label>
            <div style="display: flex; gap: 0.5rem;">
              <div style="padding: 0.65rem 0.85rem; background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--gold-primary); font-weight: 700; font-size: 0.8125rem; display: flex; align-items: center; gap: 0.35rem; flex-shrink: 0;">
                <span>🇮🇳 +91</span>
              </div>
              <input type="tel" id="signup_phone" required class="form-input" placeholder="98765 43210" maxlength="14" autocomplete="tel"/>
            </div>
          </div>

          <!-- Mandatory Delivery Address Group -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 1rem; margin-top: 0.35rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem;">
              <span class="label-caps" style="color: var(--gold-primary); font-size: 0.72rem;">
                <i class="fa-solid fa-map-location-dot" style="margin-right: 0.3rem;"></i> Delivery Logistics Address
              </span>
              <span class="label-micro" style="color: #10B981; font-weight: 700;">Address 1 of 3 (Primary)</span>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 0.75rem;">
              <div>
                <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.2rem;">Address Tag *</label>
                <select id="signup_addr_tag" class="form-input" style="font-size: 0.78rem;">
                  <option value="Primary Residence">Primary Residence</option>
                  <option value="Corporate Office">Corporate Office</option>
                  <option value="Heritage Villa">Heritage Villa</option>
                  <option value="Vacation Home">Vacation Home</option>
                </select>
              </div>
              <div>
                <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.2rem;">PIN Code (6 Digits) *</label>
                <input type="text" id="signup_addr_pincode" required maxlength="6" class="form-input" placeholder="e.g. 400018" style="font-size: 0.78rem;"/>
              </div>
            </div>

            <div style="margin-bottom: 0.75rem;">
              <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.2rem;">Flat, Building, Street Address *</label>
              <input type="text" id="signup_addr_street" required class="form-input" placeholder="e.g. 402, Sea Face Manor, Worli Sea Face" style="font-size: 0.78rem;"/>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem;">
              <div>
                <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.2rem;">Landmark / Area</label>
                <input type="text" id="signup_addr_landmark" class="form-input" placeholder="Near Promenade" style="font-size: 0.78rem;"/>
              </div>
              <div>
                <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.2rem;">City *</label>
                <input type="text" id="signup_addr_city" required class="form-input" value="Mumbai" style="font-size: 0.78rem;"/>
              </div>
              <div>
                <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.2rem;">State *</label>
                <input type="text" id="signup_addr_state" required class="form-input" value="Maharashtra" style="font-size: 0.78rem;"/>
              </div>
            </div>
          </div>

          <button type="submit" class="btn-primary" style="padding: 0.85rem; font-size: 0.78rem; width: 100%; margin-top: 0.5rem;">
            <i class="fa-solid fa-user-check" style="margin-right: 0.4rem;"></i> Create Account &amp; Save Details
          </button>

          <p class="label-micro" style="text-align: center; color: var(--text-muted); margin: 0.25rem 0 0 0;">
            By signing up, your details and addresses will be synced with the Atelier Logistics Panel for armored BlueDart dispatch. You can add up to 3 addresses later in your profile.
          </p>
        </form>
      </div>

    </div>
  </div>

  <!-- ==========================================================================
       PATRON ACCOUNT & VIP PROFILE MODAL (WITH 3-ADDRESS BOOK)
       ========================================================================== -->
  <div class="patron-modal-backdrop" id="patronAccountModal" onclick="if(event.target === this) authManager.closeAccountModal();">
    <div class="patron-account-card" style="max-width: 580px; max-height: 90vh; overflow-y: auto;">
      <button type="button" onclick="authManager.closeAccountModal()" class="modal-close-btn" title="Close Profile" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.25rem; z-index: 10;">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <div style="display: flex; align-items: center; gap: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1.25rem; margin-bottom: 1.25rem;">
        <div id="accPatronAvatar" class="patron-avatar-large">G</div>
        <div>
          <span class="label-micro" style="color: var(--gold-primary); letter-spacing: 0.15em;">Recognized VIP Patron</span>
          <h3 id="accPatronName" style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--text-primary); margin: 0; line-height: 1.2;">Gayatri Roy</h3>
          <span id="accPatronTier" class="label-micro" style="color: #10B981; font-weight: 700;">👑 Royal Heirloom Patron</span>
        </div>
      </div>

      <!-- Patron Specs Card -->
      <div class="patron-details-panel">
        <div style="display: flex; justify-content: space-between; font-size: 0.8125rem;">
          <span style="color: var(--text-muted);">Member Passkey ID:</span>
          <span id="accPatronMemberId" style="font-family: monospace; font-weight: 700; color: var(--gold-primary);">ASMI-VIP-9160</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.8125rem;">
          <span style="color: var(--text-muted);">Registered Phone:</span>
          <span id="accPatronPhone" style="font-weight: 600; color: var(--text-primary);">+91 98200 12345</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.8125rem;">
          <span style="color: var(--text-muted);">Registered Email:</span>
          <span id="accPatronEmail" style="font-weight: 600; color: var(--text-primary);">gayatri.roy@gmail.com</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.8125rem;">
          <span style="color: var(--text-muted);">Member Since:</span>
          <span id="accPatronJoined" style="color: var(--text-secondary);">January 2025</span>
        </div>
      </div>

      <!-- Address Book Container (Up to 3 Delivery Addresses) -->
      <div id="accountAddressBookContainer"></div>

      <!-- Action Buttons -->
      <div style="display: flex; flex-direction: column; gap: 0.65rem; margin-top: 1.5rem;">
        <button type="button" class="btn-primary" style="padding: 0.75rem; font-size: 0.75rem; width: 100%;" onclick="authManager.closeAccountModal(); ordersManager.openOrdersModal();">
          <i class="fa-solid fa-truck-fast" style="margin-right: 0.4rem;"></i> Track My Orders &amp; Logistics (5 Steps)
        </button>
        <button type="button" class="btn-secondary" style="padding: 0.75rem; font-size: 0.75rem; width: 100%;" onclick="authManager.closeAccountModal(); document.getElementById('reviewsSection').scrollIntoView({behavior: 'smooth'});">
          <i class="fa-solid fa-star" style="margin-right: 0.4rem; color: var(--gold-primary);"></i> View Reviews &amp; Upload Jewelry Photos
        </button>
        <button type="button" class="btn-solid-dark" style="padding: 0.75rem; font-size: 0.75rem; width: 100%; border-color: #EF4444; color: #EF4444; margin-top: 0.25rem;" onclick="authManager.logout()">
          <i class="fa-solid fa-right-from-bracket" style="margin-right: 0.4rem;"></i> Sign Out / Switch Account
        </button>
      </div>
    </div>
  </div>

  <!-- ==========================================================================
       MASTER ATELIER BACKEND ADMIN LOGIN MODAL
       ========================================================================== -->
  <div class="admin-login-backdrop" id="adminLoginModal" onclick="if(event.target === this) adminManager.closeLoginModal();">
    <div class="admin-login-card">
      <button onclick="adminManager.closeLoginModal()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.25rem;" title="Close">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <div style="width: 54px; height: 54px; border-radius: 50% !important; background: rgba(212, 175, 55, 0.15); border: 1.5px solid var(--gold-primary); display: flex; align-items: center; justify-content: center; color: var(--gold-primary); margin: 0 auto 1.25rem auto; font-size: 1.35rem;">
        <i class="fa-solid fa-shield-halved"></i>
      </div>

      <span class="label-caps" style="color: var(--gold-primary); display: block; margin-bottom: 0.25rem;">Authorized Personnel Only</span>
      <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--text-primary); margin-bottom: 0.5rem;">Master Atelier Console</h3>
      <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 1.75rem;">
        Enter administrator passkey to manage products, pricing, themes (1-5), orders, coupons, SEO &amp; branding.
      </p>

      <form onsubmit="adminManager.handleLogin(event)" style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <label class="label-micro" style="color: var(--text-muted); display: block; text-align: left; margin-bottom: 0.35rem;">Administrator Passkey *</label>
          <input type="password" id="adminPasswordInput" required class="form-input" placeholder="Enter password (e.g. Asmi@2026)" autocomplete="current-password" style="letter-spacing: 2px; text-align: center;" />
        </div>

        <button type="submit" class="btn-primary" style="padding: 0.85rem; font-size: 0.75rem; width: 100%;">
          <i class="fa-solid fa-key" style="margin-right: 0.4rem;"></i> Authenticate &amp; Open Console
        </button>
      </form>
    </div>
  </div>

  <!-- ==========================================================================
       DATA PURGE & FACTORY RESET CONFIRMATION MODAL
       ========================================================================== -->
  <div class="admin-login-backdrop" id="adminDataResetModal" onclick="if(event.target === this) adminManager.closeDataResetModal();">
    <div class="admin-login-card" style="max-width: 500px !important;">
      <button onclick="adminManager.closeDataResetModal()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.25rem;" title="Close Modal">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <div style="width: 54px; height: 54px; border-radius: 50% !important; background: rgba(239, 68, 68, 0.15); border: 1.5px solid #EF4444; display: flex; align-items: center; justify-content: center; color: #EF4444; margin: 0 auto 1.25rem auto; font-size: 1.35rem;">
        <i class="fa-solid fa-triangle-exclamation"></i>
      </div>

      <span class="label-caps" style="color: #EF4444; display: block; margin-bottom: 0.25rem;">Irreversible Administrative Action</span>
      <h3 id="dataResetModalTitle" style="font-family: var(--font-serif); font-size: 1.45rem; color: var(--text-primary); margin-bottom: 0.5rem;">Confirm Data Wipe</h3>
      <p id="dataResetModalDesc" style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.5;">
        This action will permanently delete database records. This cannot be undone.
      </p>

      <form onsubmit="adminManager.executeDataReset(event)" style="display: flex; flex-direction: column; gap: 1rem; text-align: left;">
        <input type="hidden" id="dataResetScopeInput" value="all" />

        <div class="wipe-products-toggle" style="display: flex; align-items: center; gap: 0.65rem; background: rgba(0,0,0,0.25); padding: 0.75rem 1rem; border: 1px solid var(--border-color); border-radius: 4px;">
          <input type="checkbox" id="dataResetWipeProducts" style="accent-color: #EF4444; width: 16px; height: 16px;" />
          <label for="dataResetWipeProducts" style="font-size: 0.78rem; color: var(--text-primary); cursor: pointer;">
            Wipe products completely (uncheck to retain default catalog)
          </label>
        </div>

        <div>
          <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">
            Type <strong style="color: #EF4444; letter-spacing: 1px;">PURGE</strong> or <strong style="color: #EF4444;">DELETE</strong> to authorize *
          </label>
          <input type="text" id="dataResetConfirmInput" required class="form-input" placeholder="Type PURGE to confirm" autocomplete="off" style="text-align: center; font-weight: 700; letter-spacing: 2px; color: #EF4444; border-color: rgba(239, 68, 68, 0.5);" />
        </div>

        <div style="display: flex; gap: 0.75rem; margin-top: 0.5rem;">
          <button type="button" class="btn-secondary" onclick="adminManager.closeDataResetModal()" style="flex: 1; padding: 0.75rem; font-size: 0.75rem;">
            Cancel
          </button>
          <button type="submit" class="btn-solid-dark" style="flex: 1.5; padding: 0.75rem; font-size: 0.75rem; background: #DC2626; color: #fff; border: none; font-weight: 700;">
            <i class="fa-solid fa-trash-can" style="margin-right: 0.35rem;"></i> Authorize &amp; Wipe
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- ==========================================================================
       MASTER ATELIER FULL ADMINISTRATION CONSOLE DASHBOARD
       ========================================================================== -->
  <div class="admin-panel-backdrop" id="adminPanelModal">
    <div class="admin-panel-container">
      
      <!-- Top Admin Bar -->
      <div class="admin-header-bar">
        <div class="admin-header-branding">
          <div class="admin-header-icon">
            <i class="fa-solid fa-gem"></i>
          </div>
          <div>
            <span class="label-micro" style="color: var(--gold-primary); letter-spacing: 0.18em;">Master Atelier Control Panel</span>
            <h3 style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--text-primary); margin: 0; line-height: 1.2;">ASMI Administration Console</h3>
          </div>
        </div>

        <div class="admin-header-actions">
          <div class="admin-live-sync-badge">
            <span class="live-status-dot"></span> <span>Live Sync Active</span>
          </div>
          <button type="button" class="btn-secondary admin-header-btn" onclick="adminManager.exportDataToPDF()" title="Export Executive Store Report as PDF file">
            <i class="fa-solid fa-file-pdf" style="margin-right: 0.35rem; color: #EF4444;"></i> Export PDF
          </button>
          <button type="button" class="btn-secondary admin-header-btn" onclick="adminManager.switchTab('database')" title="Database Reset, Settings Rollback & Disaster Recovery">
            <i class="fa-solid fa-database" style="margin-right: 0.35rem; color: var(--gold-primary);"></i> Data Ops
          </button>
          <button type="button" class="btn-secondary admin-header-btn" onclick="adminManager.switchTab('settings')" title="Configure Store Settings, Payment Gateways & API Credentials">
            <i class="fa-solid fa-gear" style="margin-right: 0.35rem; color: var(--gold-primary);"></i> Settings
          </button>
          <button type="button" class="btn-secondary admin-header-btn" onclick="adminManager.closeAdminPanel()" title="Exit admin console and view public website">
            <i class="fa-solid fa-eye" style="margin-right: 0.35rem;"></i> View Storefront
          </button>
          <button type="button" class="btn-solid-dark admin-header-btn admin-logout-header-btn" onclick="adminManager.logout()" title="Securely lock and log out of admin console">
            <i class="fa-solid fa-right-from-bracket" style="margin-right: 0.35rem;"></i> Logout
          </button>
        </div>
      </div>

      <!-- Main Layout -->
      <div class="admin-body-layout">
        <!-- Sidebar Navigation -->
        <div class="admin-sidebar-nav">
          <div class="admin-sidebar-tabs">
            <button type="button" class="admin-tab-btn active" data-tab="dashboard" onclick="adminManager.switchTab('dashboard')">
              <i class="fa-solid fa-chart-pie"></i> Dashboard &amp; Analytics
            </button>
            <button type="button" class="admin-tab-btn" data-tab="products" onclick="adminManager.switchTab('products')">
              <i class="fa-solid fa-gem"></i> Product Catalog &amp; Pricing
            </button>
            <button type="button" class="admin-tab-btn" data-tab="categories" onclick="adminManager.switchTab('categories')">
              <i class="fa-solid fa-layer-group"></i> Categories Manager
            </button>
            <button type="button" class="admin-tab-btn" data-tab="themes" onclick="adminManager.switchTab('themes')">
              <i class="fa-solid fa-palette"></i> Themes (1-5) &amp; Branding
            </button>
            <button type="button" class="admin-tab-btn" data-tab="discounts" onclick="adminManager.switchTab('discounts')">
              <i class="fa-solid fa-ticket"></i> Coupons &amp; Gift Cards
            </button>
            <button type="button" class="admin-tab-btn" data-tab="orders" onclick="adminManager.switchTab('orders')">
              <i class="fa-solid fa-truck-fast"></i> Orders &amp; Logistics (5 Steps)
            </button>
            <button type="button" class="admin-tab-btn" data-tab="patrons" onclick="adminManager.switchTab('patrons')">
              <i class="fa-solid fa-users"></i> Patrons &amp; Logistics (3 Addrs)
            </button>
            <button type="button" class="admin-tab-btn" data-tab="reviews" onclick="adminManager.switchTab('reviews')">
              <i class="fa-solid fa-star" style="color: var(--gold-primary);"></i> Client Reviews &amp; Stories
            </button>
            <button type="button" class="admin-tab-btn" data-tab="settings" onclick="adminManager.switchTab('settings')">
              <i class="fa-solid fa-gear" style="color: var(--gold-primary);"></i> Settings &amp; Payment Gateway
            </button>
            <button type="button" class="admin-tab-btn" data-tab="support" onclick="adminManager.switchTab('support')">
              <i class="fa-solid fa-headset" style="color: var(--gold-primary);"></i> Customer Support &amp; Chats
            </button>
            <button type="button" class="admin-tab-btn" data-tab="seo" onclick="adminManager.switchTab('seo')">
              <i class="fa-solid fa-globe"></i> SEO &amp; Meta Settings
            </button>
            <button type="button" class="admin-tab-btn" data-tab="hero" onclick="adminManager.switchTab('hero')">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Hero Section &amp; Showcase
            </button>
            <button type="button" class="admin-tab-btn" data-tab="sections" onclick="adminManager.switchTab('sections')">
              <i class="fa-solid fa-shapes"></i> All Sections Customizer
            </button>
            <button type="button" class="admin-tab-btn" data-tab="database" onclick="adminManager.switchTab('database')">
              <i class="fa-solid fa-database" style="color: var(--gold-primary);"></i> Data &amp; Backup Operations
            </button>
          </div>

          <!-- Bottom Pinned Exit Actions -->
          <div class="admin-sidebar-footer">
            <button type="button" class="admin-tab-btn admin-exit-btn" onclick="adminManager.closeAdminPanel()" title="Exit admin console and view the live website">
              <i class="fa-solid fa-arrow-up-right-from-square" style="color: var(--gold-primary);"></i> View Storefront
            </button>
            <button type="button" class="admin-tab-btn admin-logout-btn" onclick="adminManager.logout()" title="Securely lock and log out of the admin console">
              <i class="fa-solid fa-right-from-bracket" style="color: #EF4444;"></i> Logout Console
            </button>
          </div>
        </div>

        <!-- Content Stage -->
        <div class="admin-content-stage">
          <!-- Panel 1: Dashboard -->
          <div class="admin-tab-panel" id="adminPanel_dashboard">
            <div id="adminDashboardMetrics"></div>
          </div>

          <!-- Panel 2: Products -->
          <div class="admin-tab-panel" id="adminPanel_products" style="display: none;">
            <!-- View A: Products List Table -->
            <div id="adminProductsListView">
              <div id="adminProductsTableContainer"></div>
            </div>

            <!-- View B: Inline Product Editor Form -->
            <div id="adminProductsEditorView" style="display: none;">
              <div class="admin-editor-card">
                <div class="admin-editor-header">
                  <div style="display: flex; align-items: center; gap: 1rem;">
                    <button type="button" class="btn-secondary" onclick="adminManager.closeProductForm()" style="font-size: 0.75rem; padding: 0.45rem 0.85rem;">
                      <i class="fa-solid fa-arrow-left" style="margin-right: 0.4rem;"></i> Back to Products
                    </button>
                    <div>
                      <span class="label-micro" style="color: var(--gold-primary); letter-spacing: 0.12em;">Master Atelier Catalog Editor</span>
                      <h3 id="adminProductFormTitle" style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-primary); margin: 0;">Add New Jewelry Masterpiece</h3>
                    </div>
                  </div>
                  <div style="display: flex; gap: 0.5rem;">
                    <button type="button" class="btn-secondary" onclick="adminManager.closeProductForm()" style="font-size: 0.75rem; padding: 0.5rem 1rem;">Cancel</button>
                    <button type="button" class="btn-primary" onclick="document.getElementById('adminProductEditorForm').requestSubmit()" style="font-size: 0.75rem; padding: 0.5rem 1.25rem;">
                      <i class="fa-solid fa-floppy-disk" style="margin-right: 0.4rem;"></i> Save to Catalog
                    </button>
                  </div>
                </div>

                <form id="adminProductEditorForm" onsubmit="adminManager.handleProductSave(event)" style="display: flex; flex-direction: column; gap: 1.25rem; padding-top: 1.5rem;">
                  <input type="hidden" id="pform_id" />

                  <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1.25rem;">
                    <div>
                      <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Jewelry Masterpiece Name *</label>
                      <input type="text" id="pform_name" required class="form-input" placeholder="e.g. The Royal Colombian Emerald Choker"/>
                    </div>
                    <div>
                      <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Category *</label>
                      <select id="pform_category" class="form-input"></select>
                    </div>
                  </div>

                  <div>
                    <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Subtitle / Highlights</label>
                    <input type="text" id="pform_subtitle" class="form-input" placeholder="e.g. Natural AAA Lustre Pearls with 22K Gold Borders"/>
                  </div>

                  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 1rem;">
                    <div>
                      <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Price (INR ₹) *</label>
                      <input type="number" id="pform_price" required min="1" class="form-input" placeholder="e.g. 7499" oninput="adminManager.syncUsdPriceFromInr(this.value)"/>
                    </div>
                    <div>
                      <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Price (USD $) *</label>
                      <input type="number" id="pform_price_usd" required min="1" class="form-input" placeholder="e.g. 90"/>
                    </div>
                    <div>
                      <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">
                        Available Quantity * <span style="color: #10B981;">(0 = Hidden)</span>
                      </label>
                      <input type="number" id="pform_stock" required min="0" class="form-input" placeholder="e.g. 4" oninput="adminManager.updateStockNotice(this.value)"/>
                      <span id="pform_stockNotice" class="label-micro" style="display: block; margin-top: 0.25rem; color: #10B981;">
                        <i class="fa-solid fa-circle-check"></i> Live on Storefront
                      </span>
                    </div>
                    <div>
                      <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">SKU Serial Code</label>
                      <input type="text" id="pform_sku" class="form-input" placeholder="e.g. ASM-PR-8901"/>
                    </div>
                  </div>

                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
                    <div>
                      <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Main Gemstone Details</label>
                      <input type="text" id="pform_gemstone" class="form-input" placeholder="e.g. Natural Zambian Emerald (6.5 Carats)"/>
                    </div>
                    <div>
                      <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Accent Stones</label>
                      <input type="text" id="pform_accent" class="form-input" placeholder="e.g. VVS-Clarity American Diamonds"/>
                    </div>
                  </div>

                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
                    <div>
                      <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Metal / Material</label>
                      <input type="text" id="pform_metal" class="form-input" placeholder="e.g. 22K Solid Gold Finish over 925 Silver"/>
                    </div>
                    <div>
                      <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Hallmark Certification</label>
                      <input type="text" id="pform_hallmark" class="form-input" placeholder="e.g. BIS Hallmarked &amp; Certified Authentic"/>
                    </div>
                  </div>

                  <!-- 10-Image Haute Joaillerie Multi-Angle Gallery Manager -->
                  <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 1.25rem; margin-top: 0.5rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.75rem;">
                      <div>
                        <h4 class="label-caps" style="color: var(--gold-primary); font-size: 0.8125rem;">
                          <i class="fa-solid fa-images" style="margin-right: 0.35rem;"></i> Product Images Gallery (10 Upload Slots)
                        </h4>
                        <p class="label-micro" style="color: var(--text-muted);">
                          Upload up to 10 photos of this piece (Close-up loupe, hallmark stamp, 360° views, model wearing). Slot 1 is the Cover.
                        </p>
                      </div>
                      <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <button type="button" class="btn-secondary" style="font-size: 0.72rem; padding: 0.45rem 0.85rem;" onclick="document.getElementById('pform_bulk_files').click();">
                          <i class="fa-solid fa-cloud-arrow-up" style="margin-right: 0.35rem;"></i> Batch Upload Multiple Files
                        </button>
                        <input type="file" id="pform_bulk_files" accept="image/*" multiple style="display: none;" onchange="adminManager.handleBulkGalleryUpload(event)" />
                      </div>
                    </div>

                    <!-- 10 Dynamic Slot Containers -->
                    <div class="gallery-slots-grid" id="pformGallerySlots"></div>
                  </div>

                  <div>
                    <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Short Card Description</label>
                    <textarea id="pform_shortDesc" rows="2" class="form-input" placeholder="Brief summary shown on catalog cards..."></textarea>
                  </div>

                  <div>
                    <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Full Story Description</label>
                    <textarea id="pform_desc" rows="3" class="form-input" placeholder="Full handcrafted artisanal description shown in quick view inspection..."></textarea>
                  </div>

                  <!-- Per-Product SEO & Google Search Optimization Suite -->
                  <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 1.25rem; margin-top: 0.5rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.75rem;">
                      <div>
                        <h4 class="label-caps" style="color: var(--gold-primary); font-size: 0.8125rem; display: flex; align-items: center; gap: 0.4rem; margin: 0 0 0.25rem 0;">
                          <i class="fa-solid fa-magnifying-glass-chart"></i> Product SEO &amp; Google Search Optimization
                        </h4>
                        <p class="label-micro" style="color: var(--text-muted); margin: 0;">
                          Configure individual search engine meta tags, focus keywords, Open Graph social cards, canonical slugs, and Google rich snippet controls for this piece.
                        </p>
                      </div>
                      <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <button type="button" class="btn-secondary" style="font-size: 0.72rem; padding: 0.45rem 0.85rem;" onclick="adminManager.autoOptimizeCurrentProductSEO()">
                          <i class="fa-solid fa-wand-magic-sparkles" style="color: var(--gold-primary); margin-right: 0.35rem;"></i> Auto-Generate AI SEO
                        </button>
                      </div>
                    </div>

                    <!-- Realtime Google Product SERP Preview for this item -->
                    <div style="background: #ffffff; border-radius: 8px !important; padding: 1rem 1.25rem; margin-bottom: 1.25rem; border: 1px solid #e2e8f0; box-shadow: 0 1px 4px rgba(0,0,0,0.06);">
                      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                        <div style="display: flex; align-items: center; gap: 0.45rem;">
                          <div style="width: 20px; height: 20px; border-radius: 50% !important; background: #f1f3f4; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; color: #1a73e8; font-weight: 700;">A</div>
                          <span style="font-size: 0.72rem; color: #202124; font-weight: 500;">ASMI Haute Joaillerie</span>
                          <span id="pform_serpPreviewUrl" style="font-size: 0.68rem; color: #4d5156;">https://asmijewelry.com › product › royal-emerald</span>
                        </div>
                        <span style="font-size: 0.65rem; padding: 2px 6px; background: #e8f0fe; color: #1a73e8; border-radius: 4px; font-weight: 600;">Live Google SERP Snippet</span>
                      </div>
                      <h4 id="pform_serpPreviewTitle" style="font-family: Arial, sans-serif; font-size: 1.05rem; color: #1a0dab; font-weight: 400; margin: 0.15rem 0 0.25rem 0; line-height: 1.3;">
                        Royal Zambian Emerald Choker Necklace | 22K Gold BIS Hallmarked | ASMI
                      </h4>
                      <div style="display: flex; align-items: center; gap: 0.35rem; font-size: 0.72rem; margin-bottom: 0.35rem;">
                        <span style="color: #fbbc04;">★★★★★</span>
                        <span id="pform_serpPreviewRating" style="font-weight: 700; color: #202124;">5.0</span>
                        <span id="pform_serpPreviewReviews" style="color: #70757a;">(38 reviews)</span>
                        <span style="color: #70757a;">·</span>
                        <span id="pform_serpPreviewPrice" style="font-weight: 600; color: #202124;">₹8,999</span>
                        <span style="color: #70757a;">·</span>
                        <span id="pform_serpPreviewStock" style="color: #188038; font-weight: 600;">In Stock</span>
                      </div>
                      <p id="pform_serpPreviewDesc" style="font-family: Arial, sans-serif; font-size: 0.78rem; color: #4d5156; line-height: 1.45; margin: 0;">
                        Discover the handcrafted Royal Zambian Emerald Choker Necklace at ASMI. Featuring a 7.2-carat vivid green emerald with VVS American diamonds in 22K gold.
                      </p>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                      <!-- Meta Title with Counter -->
                      <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                          <label class="label-micro" style="color: var(--text-muted);">Product Meta Title (&lt;title&gt;) *</label>
                          <span id="pform_titleCharCount" class="label-micro" style="color: #10B981; font-weight: 700;">0 / 60 optimal</span>
                        </div>
                        <input type="text" id="pform_seoTitle" class="form-input" placeholder="e.g. Royal Zambian Emerald Choker Necklace | 22K Gold BIS Hallmarked | ASMI" oninput="adminManager.updateProductSERPPreview()"/>
                      </div>

                      <!-- Meta Description with Counter -->
                      <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                          <label class="label-micro" style="color: var(--text-muted);">Product Meta Description (&lt;meta name="description"&gt;) *</label>
                          <span id="pform_descCharCount" class="label-micro" style="color: #10B981; font-weight: 700;">0 / 160 optimal</span>
                        </div>
                        <textarea id="pform_seoDescription" rows="2" class="form-input" placeholder="e.g. Handcrafted 7.2ct Zambian emerald with sparkling diamond borders in 22K gold. BIS hallmarked heirloom quality." oninput="adminManager.updateProductSERPPreview()"></textarea>
                      </div>

                      <!-- Focus Keyword & Canonical URL -->
                      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
                        <div>
                          <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Focus SEO Keyword</label>
                          <input type="text" id="pform_seoFocusKeyword" class="form-input" placeholder="e.g. zambian emerald choker necklace"/>
                        </div>
                        <div>
                          <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Canonical URL / Slug (&lt;link rel="canonical"&gt;)</label>
                          <input type="text" id="pform_seoCanonicalUrl" class="form-input" placeholder="https://asmijewelry.com/product/royal-zambian-emerald-choker" oninput="adminManager.updateProductSERPPreview()"/>
                        </div>
                      </div>

                      <!-- Keywords & Robots Directive -->
                      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1.25rem;">
                        <div>
                          <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Product SEO Keywords (Comma Separated)</label>
                          <input type="text" id="pform_seoKeywords" class="form-input" placeholder="e.g. zambian emerald choker, 22k gold emerald necklace, bis hallmark"/>
                        </div>
                        <div>
                          <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Robots Indexing Directive</label>
                          <select id="pform_seoRobots" class="form-input">
                            <option value="index, follow">index, follow (Indexed)</option>
                            <option value="noindex, follow">noindex, follow (Hidden from search)</option>
                            <option value="index, nofollow">index, nofollow</option>
                            <option value="noindex, nofollow">noindex, nofollow</option>
                          </select>
                        </div>
                      </div>

                      <!-- Open Graph & Social Card Configurations -->
                      <div style="background: var(--bg-surface); border: 1px solid var(--border-hairline); padding: 1rem; border-radius: 4px;">
                        <span class="label-micro" style="color: var(--gold-primary); display: block; margin-bottom: 0.75rem; font-weight: 700;">
                          <i class="fa-solid fa-share-nodes" style="margin-right: 0.3rem;"></i> Social Media &amp; WhatsApp Open Graph (OG) Overrides
                        </span>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 0.75rem;">
                          <div>
                            <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Social Share Headline (og:title)</label>
                            <input type="text" id="pform_seoOgTitle" class="form-input" placeholder="Defaults to Product Meta Title if left empty"/>
                          </div>
                          <div>
                            <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Social Card Format</label>
                            <select id="pform_seoTwitterCard" class="form-input">
                              <option value="summary_large_image">summary_large_image (Large Photo Card)</option>
                              <option value="summary">summary (Compact Card)</option>
                            </select>
                          </div>
                        </div>
                        <div style="margin-bottom: 0.75rem;">
                          <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Social Share Description (og:description)</label>
                          <input type="text" id="pform_seoOgDescription" class="form-input" placeholder="Defaults to Meta Description if left empty"/>
                        </div>
                        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1rem;">
                          <div>
                            <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Social Share Image URL (og:image / twitter:image)</label>
                            <input type="text" id="pform_seoOgImage" class="form-input" placeholder="Defaults to Slot 1 Cover Photo if left empty"/>
                          </div>
                          <div>
                            <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Schema.org Type</label>
                            <select id="pform_seoSchemaType" class="form-input">
                              <option value="Product">Product (Recommended)</option>
                              <option value="IndividualProduct">IndividualProduct</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-hairline); padding-top: 1.25rem; flex-wrap: wrap; gap: 1rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                      <input type="checkbox" id="pform_featured" style="accent-color: var(--gold-primary); width: 18px; height: 18px; cursor: pointer;"/>
                      <label for="pform_featured" class="label-micro" style="color: var(--text-primary); cursor: pointer; font-weight: 600;">Feature on Home Top Showcase</label>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                      <label class="label-micro" style="color: var(--text-muted);">Badge Tag:</label>
                      <input type="text" id="pform_tag" class="form-input" style="width: 160px; padding: 0.4rem 0.6rem; font-size: 0.75rem;" placeholder="e.g. Best Seller"/>
                    </div>
                  </div>

                  <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1rem; border-top: 1px solid var(--border-color); padding-top: 1.25rem;">
                    <button type="button" class="btn-secondary" onclick="adminManager.closeProductForm()" style="padding: 0.75rem 1.5rem; font-size: 0.75rem;">Cancel</button>
                    <button type="submit" class="btn-primary" style="padding: 0.75rem 2rem; font-size: 0.75rem;">
                      <i class="fa-solid fa-floppy-disk" style="margin-right: 0.4rem;"></i> Save to Catalog
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Panel 3: Categories -->
          <div class="admin-tab-panel" id="adminPanel_categories" style="display: none;">
            <div id="adminCategoriesContainer"></div>
          </div>

          <!-- Panel 4: Themes & Branding -->
          <div class="admin-tab-panel" id="adminPanel_themes" style="display: none;">
            <div id="adminThemesContainer"></div>
          </div>

          <!-- Panel 5: Discounts & Coupons -->
          <div class="admin-tab-panel" id="adminPanel_discounts" style="display: none;">
            <div id="adminDiscountsContainer"></div>
          </div>

          <!-- Panel 6: Orders & Logistics -->
          <div class="admin-tab-panel" id="adminPanel_orders" style="display: none;">
            <div id="adminOrdersContainer"></div>
          </div>

          <!-- Panel 6B: Patrons & Logistics Address Book -->
          <div class="admin-tab-panel" id="adminPanel_patrons" style="display: none;">
            <div id="adminPatronsContainer"></div>
          </div>

          <!-- Panel 7: SEO -->
          <div class="admin-tab-panel" id="adminPanel_seo" style="display: none;">
            <div id="adminSEOContainer"></div>
          </div>

          <!-- Panel 8: Contact, Social & Security Settings -->
          <div class="admin-tab-panel" id="adminPanel_settings" style="display: none;">
            <div id="adminSettingsContainer"></div>
          </div>

          <!-- Panel 9: Hero Section & Showcase Editor -->
          <div class="admin-tab-panel" id="adminPanel_hero" style="display: none;">
            <div id="adminHeroContainer"></div>
          </div>

          <!-- Panel 10: All Sections Customizer -->
          <div class="admin-tab-panel" id="adminPanel_sections" style="display: none;">
            <div id="adminSectionsContainer"></div>
          </div>

          <!-- Panel 11: Client Reviews & Stories Manager -->
          <div class="admin-tab-panel" id="adminPanel_reviews" style="display: none;">
            <div id="adminReviewsContainer"></div>
          </div>

          <!-- Panel 12: Customer Support & Live Chats -->
          <div class="admin-tab-panel" id="adminPanel_support" style="display: none;">
            <div id="adminSupportContainer"></div>
          </div>

          <!-- Panel 13: Data Operations, Version Snapshots & Backups -->
          <div class="admin-tab-panel" id="adminPanel_database" style="display: none;">
            <div id="adminDatabaseContainer"></div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- Toast Notification Container -->
  <div class="toast-container" id="toastContainer"></div>

  <!-- Printable Invoice Template -->
  <div id="printableInvoice"></div>

  <!-- Printable Executive PDF Report Template -->
  <div id="printableExecutiveReport" style="display: none;"></div>

  <?php wp_footer(); ?>
</body>
</html>
