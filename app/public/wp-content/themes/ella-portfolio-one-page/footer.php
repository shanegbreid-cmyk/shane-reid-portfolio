<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package ellapress
 */

?>

</div> <!-- END site body -->

<div class="footer" id="footer">
		<section class="foot-lower">
			<div class="pe-container">
									<div class="row">
									<div class="logo-foot">
	<a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php esc_attr_e( 'Home', 'ella-portfolio-one-page' ); ?>">
		<?php 
		$footer_logo = get_theme_mod( 'footer_logo', get_template_directory_uri() . '/img/footer_logo.png' ); 
		if ( $footer_logo ) : ?>
			<img src="<?php echo esc_url( $footer_logo ); ?>" width="auto" height="84" alt="<?php esc_attr_e( 'Ella Corporate', 'ella-portfolio-one-page' ); ?>">
		<?php endif; ?>
	</a>
</div>

					</div>
					<!-- Copyright -->
					<?php
    $ellapress_copyright = get_theme_mod('ellapress_copyright', sprintf( __('© 2025 %s - WordPress Theme.', 'ella-portfolio-one-page'), get_bloginfo('name')));
    ?>

								<div class="row">
					<div class="col-lg-12 copyright">
					<span>
                        <?php echo wp_kses_post( $ellapress_copyright ); ?>
                        <?php esc_html_e( 'Created by', 'ella-portfolio-one-page' ); ?>
                    </span>
<a href="https://pixelonetry.com/downloads/ella-portfolio-one-page-wordpress-theme/"><?php esc_html_e( 'Ella Portfolio One Page WordPress Theme', 'ella-portfolio-one-page' ); ?></a>	|
<a href="<?php echo esc_url( __( 'https://wordpress.org/', 'ella-portfolio-one-page' ) ); ?>">
            <span>
                <?php
                /* translators: %s: CMS name, i.e. WordPress. */
                printf( esc_html__( 'PROUDLY POWERED BY %s', 'ella-portfolio-one-page' ), 'WORDPRESS' );
                ?>
            </span>
        </a>			
	</div>
				</div>
				<div class="row">
				<?php do_action( 'ellapress_social' ); ?>
				</div>
			</div>
		</section>
	</div> <!-- end footer -->
 
</div> <!-- END site wrapper -->

<?php wp_footer(); ?>
<!-- Child Theme Scripts (loaded after parent theme scripts) -->


</body>
</html>
