<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/archive-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 8.6.0
 */

defined( 'ABSPATH' ) || exit;

get_header( 'shop' ); ?>

<?php $show_sidebar = get_theme_mod( 'ellapress_woocommerce_sidebar_setting', 'yes' ); ?>
<?php $header_image_url = get_header_image(); // Retrieve the default header image

// If the header image is not set, use a fallback
if (!$header_image_url) {
	$header_image_url = get_template_directory_uri() . '/img/slide/1.jpg';
	// Default image URL
} ?>

<div class="parallax-blog" data-overlay-dark="4" style="background-image: url(<?php echo esc_url($header_image_url); ?>);"> </div>
	<div class="blog">
	  <div class="inner-blog">
	<div class="container">        
            <div class="row">
            <?php if ( $show_sidebar === 'yes' ) : ?>
    <div class="col-xl-9 col-lg-8">
<?php else : ?>
    <div class="col-lg-12">
<?php endif; ?>
<?php

/**
 * Hook: woocommerce_before_main_content.
 *
 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
 * @hooked woocommerce_breadcrumb - 20
 * @hooked WC_Structured_Data::generate_website_data() - 30
 */
do_action( 'woocommerce_before_main_content' );

/**
 * Hook: woocommerce_shop_loop_header.
 *
 * @since 8.6.0
 *
 * @hooked woocommerce_product_taxonomy_archive_header - 10
 */
do_action( 'woocommerce_shop_loop_header' );

if ( woocommerce_product_loop() ) {

	/**
	 * Hook: woocommerce_before_shop_loop.
	 *
	 * @hooked woocommerce_output_all_notices - 10
	 * @hooked woocommerce_result_count - 20
	 * @hooked woocommerce_catalog_ordering - 30
	 */
	do_action( 'woocommerce_before_shop_loop' );

	woocommerce_product_loop_start();

	if ( wc_get_loop_prop( 'total' ) ) {
		while ( have_posts() ) {
			the_post();

			/**
			 * Hook: woocommerce_shop_loop.
			 */
			do_action( 'woocommerce_shop_loop' );

			wc_get_template_part( 'content', 'product' );
		}
	}

	woocommerce_product_loop_end();

	/**
	 * Hook: woocommerce_after_shop_loop.
	 *
	 * @hooked woocommerce_pagination - 10
	 */
	do_action( 'woocommerce_after_shop_loop' );
} else {
	/**
	 * Hook: woocommerce_no_products_found.
	 *
	 * @hooked wc_no_products_found - 10
	 */
	do_action( 'woocommerce_no_products_found' );
}

/**
 * Hook: woocommerce_after_main_content.
 *
 * @hooked woocommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
 */
//do_action( 'woocommerce_after_main_content' ); ?>

</div> <!-- #woo main area -->
</div>
<?php wp_reset_postdata(); ?>

<?php if ( $show_sidebar === 'yes' ) : ?>
    <div class="col-xl-3 col-lg-4">
        <?php get_sidebar(); // Display the sidebar ?>
    </div>
<?php endif; ?>
</div> <!-- #end row -->
    </div> <!-- #end container -->
	</div><!-- #end inner blog -->
</div><!-- #end blog -->
<?php
/**
 * Hook: woocommerce_sidebar.
 *
 * @hooked woocommerce_get_sidebar - 10
 */

get_footer( 'shop' );
