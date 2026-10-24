<?php
/**
 * ASMI Luxury Jewelry Store - Single Page Template
 *
 * @package ASMI_Jewelry
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header(); ?>

<main id="primary" class="site-main asmi-page-wrapper" style="min-height: 70vh; padding: 4rem 1.5rem; max-width: 1400px; margin: 0 auto;">
    <?php
    while (have_posts()) :
        the_post();
        ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <?php if (!is_front_page()) : ?>
                <header class="entry-header" style="margin-bottom: 2.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1.5rem;">
                    <span class="label-caps" style="color: var(--gold-primary); display: block; margin-bottom: 0.35rem; letter-spacing: 0.15em;">ASMI Haute Joaillerie</span>
                    <?php the_title('<h1 class="entry-title" style="font-family: var(--font-serif); font-size: clamp(2rem, 3.5vw, 2.75rem); color: var(--text-primary); font-weight: 300; margin: 0;">', '</h1>'); ?>
                </header>
            <?php endif; ?>

            <div class="entry-content asmi-woocommerce-page-content" style="color: var(--text-secondary); line-height: 1.8; font-size: 1rem;">
                <?php the_content(); ?>
            </div>
        </article>
        <?php
    endwhile;
    ?>
</main>

<?php
get_footer();
