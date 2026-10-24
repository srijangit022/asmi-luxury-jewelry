<?php
/**
 * ASMI Luxury Jewelry Store - WooCommerce Wrapper Template
 *
 * Used for standard WooCommerce catalog archives, product categories, and single products.
 *
 * @package ASMI_Jewelry
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header(); ?>

<main id="primary" class="site-main asmi-woocommerce-main" style="min-height: 70vh; padding: 4rem 1.5rem; max-width: 1400px; margin: 0 auto;">
    <div class="woocommerce-container" style="background: var(--bg-card); border: 1px solid var(--border-color); padding: clamp(1.5rem, 4vw, 3rem); box-shadow: var(--shadow-plinth); border-radius: 6px;">
        <?php if (!is_singular('product')) : ?>
            <div style="margin-bottom: 2rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
                <div>
                    <span class="label-caps" style="color: var(--gold-primary); display: block; margin-bottom: 0.35rem; letter-spacing: 0.15em;">Imperial Showcase</span>
                    <h1 style="font-family: var(--font-serif); font-size: clamp(2rem, 3.5vw, 2.75rem); color: var(--text-primary); font-weight: 300; margin: 0;">
                        <?php woocommerce_page_title(); ?>
                    </h1>
                </div>
                <a href="<?php echo esc_url(home_url('/#vaultSection')); ?>" class="btn-secondary" style="font-size: 0.75rem; text-decoration: none;">
                    <i class="fa-solid fa-arrow-left" style="margin-right: 0.35rem;"></i> Return to Atelier
                </a>
            </div>
        <?php endif; ?>

        <?php woocommerce_content(); ?>
    </div>
</main>

<?php
get_footer();
