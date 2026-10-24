<?php
/**
 * Main Index Fallback Template
 *
 * @package ASMI_Jewelry
 */

get_header(); ?>

<main id="primary" class="site-main" style="min-height: 60vh; padding: 4rem 1.5rem; max-width: 1400px; margin: 0 auto;">
    <?php
    if (have_posts()) :
        while (have_posts()) :
            the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?> style="margin-bottom: 3rem;">
                <header class="entry-header" style="margin-bottom: 1.5rem;">
                    <?php the_title('<h1 class="entry-title" style="font-family: var(--font-serif); font-size: 2.5rem; color: var(--gold-primary);">', '</h1>'); ?>
                </header>

                <div class="entry-content" style="color: var(--text-secondary); line-height: 1.8; font-size: 1.05rem;">
                    <?php the_content(); ?>
                </div>
            </article>
            <?php
        endwhile;
    else :
        ?>
        <div class="no-content-notice" style="text-align: center; padding: 4rem 0;">
            <h2 style="font-family: var(--font-serif); color: var(--gold-primary);">No Content Found</h2>
            <p style="color: var(--text-muted);">The requested page or post could not be found.</p>
            <a href="<?php echo esc_url(home_url('/')); ?>" class="btn-primary" style="margin-top: 1.5rem; display: inline-flex;">Return to Atelier</a>
        </div>
        <?php
    endif;
    ?>
</main>

<?php
get_footer();
