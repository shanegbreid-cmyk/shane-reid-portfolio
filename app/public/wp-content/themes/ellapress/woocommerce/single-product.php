<?php
get_header( 'shop' ); // This ensures WooCommerce uses your theme's header
?>
<?php $show_sidebar = get_theme_mod( 'ellapress_woocommerce_sidebar_setting', 'yes' ); ?>
<?php $header_image_url = get_header_image(); // Retrieve the default header image

// If the header image is not set, use a fallback
if (!$header_image_url) {
	$header_image_url = get_template_directory_uri() . '/img/slide/1.jpg';
	// Default image URL
} ?>

<div class="parallax-blog" data-overlay-dark="4" style="background-image: url(<?php echo esc_url($header_image_url); ?>);"> </div>
	<div id="primary" class="blog">
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
         */
        do_action( 'woocommerce_before_main_content' );
        ?>

        <?php
        while ( have_posts() ) :
            the_post();

            wc_get_template_part( 'content', 'single-product' );

        endwhile; // end of the loop.
        ?>

        <?php
        /**
         * Hook: woocommerce_after_main_content.
         */
        do_action( 'woocommerce_after_main_content' );
        ?>
   	<div class="bootom-border"></div>

</div>
<?php wp_reset_postdata(); ?>
<?php

// Conditionally display the sidebar if the setting is "Yes"
if ( $show_sidebar === 'yes' ) : ?>
    <div class="col-xl-3 col-lg-4">
        <?php get_sidebar(); // Display the sidebar ?>
    </div>
<?php endif; ?>

        </div> <!-- #end row -->
    </div> <!-- #end container -->
	</div><!-- #end inner blog -->
</div><!-- #end blog -->

<?php get_footer();
