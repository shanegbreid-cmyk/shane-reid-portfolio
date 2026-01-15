<?php
/**
 * The header for our theme
 *
 * Displays <head> section and everything up to <div id="content">
 *
 * @package ellapress
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'ellapress' ); ?></a>

<div class="site-wrapper">
	<div class="head-wrapper">
		<?php
		// Section menu enable/disable setting
        $enable_about_section      = get_theme_mod('hs_about', '1');
        $enable_calltoaction       = get_theme_mod('hs_cta', true);
        $enable_services_section   = get_theme_mod('hs_service', true);
        $enable_testimonial_section       = get_theme_mod('hs_testimonial', true);
        $enable_team_section = get_theme_mod('team_hs_service', true);

		$enable_blog_section       = get_theme_mod('ella-portfolio-one-page_ed_blog_section', true);
		$enable_contact_section    = get_theme_mod('ella-portfolio-one-page_ed_contact_section', true);
		$enable_portfolio_section    = get_theme_mod('ella_one_page_portfolio_ed_portfolio_section', true);

		$disable_section_menu = get_theme_mod( 'ella_one_page_portfolio_ed_secion_menu', false );
		$home_link_label = get_theme_mod( 'ella_one_page_portfolio_home_link_label', __( 'Home', 'ella-portfolio-one-page' ) );
		?>
		
		<div class="pe-menu-sticky">
			<div class="pe-container">
				<header class="row">
					<div class="col-lg-12">
						
					<!-- Logo -->
						<?php
						if ( has_custom_logo() ) {
							$logo = wp_get_attachment_image_src( get_theme_mod( 'custom_logo' ), 'full' );
							echo '<a class="logo" href="' . esc_url( home_url( '/' ) ) . '">
									<img src="' . esc_url( $logo[0] ) . '" alt="' . esc_attr( get_bloginfo( 'name' ) ) . '">
								</a>';
						} else {
							echo '<a class="logo" href="' . esc_url( home_url( '/' ) ) . '">
									<h3 class="test-logo">' . esc_html( get_bloginfo( 'name' ) ) . '</h3>
								</a>';
						}
						?>

						<!-- Menu -->
						<nav id="site-navigation" class="pe-menu-main">
							<button class="menu-toggle-button" aria-controls="navigation" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'ellapress' ); ?></button>
							
							<ul id="navigation" class="pe-menu">
						
								<?php
                              //   if ( ! get_theme_mod( 'ella-portfolio-one-page_ed_home_link' ) ) :
                                 if ( ! $disable_section_menu && get_option( 'show_on_front' ) === 'page' ) : 
                                 ?>

								 	<?php if ( ! get_theme_mod( 'ella-portfolio-one-page_ed_home_link' ) ) : ?>
									<li class="<?php echo is_front_page() ? 'current-menu-item' : ''; ?>">
										<a href="<?php echo esc_url( home_url( is_front_page() ? '#section-splash' : '/' ) ); ?>">
											<?php echo esc_html( $home_link_label ); ?>
										</a>
									</li>
								<?php endif; ?>
					
									<?php if ( $enable_about_section ) { ?>
										<li><a href="<?php echo esc_url( home_url( '#section-about' ) ); ?>"><?php echo esc_html( get_theme_mod( 'about_title', __( 'About Us', 'ella-portfolio-one-page' ) ) ); ?></a></li>
								 <?php } ?>

								 <?php if ( $enable_portfolio_section ) { ?>
										<li><a href="<?php echo esc_url( home_url( '#section-portfolio' ) ); ?>"><?php echo esc_html( get_theme_mod( 'ella_one_page_portfolio_portfolio_title', __( 'Portfolio', 'ella-portfolio-one-page' ) ) ); ?></a></li>
								 <?php } ?>

									<?php if ( $enable_services_section ) { ?>
										<li><a href="<?php echo esc_url( home_url( '#section-services' ) ); ?>"><?php echo esc_html( get_theme_mod( 'service_title', __( 'Services', 'ella-portfolio-one-page' ) ) ); ?></a></li>
									 <?php } ?>

									<?php if ( $enable_team_section ) { ?>
										<li><a href="<?php echo esc_url( home_url( '#section-team' ) ); ?>"><?php echo esc_html( get_theme_mod( 'team_title', __( 'Team', 'ella-portfolio-one-page' ) ) ); ?></a></li>
								 <?php } ?>
                                  
								<?php if ( $enable_testimonial_section ) { ?>
										<li><a href="<?php echo esc_url( home_url( '#section-clients' ) ); ?>"><?php echo esc_html( get_theme_mod( 'testimonial_title', __( 'Client', 'ella-portfolio-one-page' ) ) ); ?></a></li>
								<?php } ?>

								 <?php if ( $enable_blog_section ) { ?>
										<li><a href="<?php echo esc_url( home_url( '#blog-section' ) ); ?>"><?php echo esc_html( get_theme_mod( 'ella_one_page_portfolio_blog_section_title', __( 'Blog', 'ella-portfolio-one-page' ) ) ); ?></a></li>
								 <?php } ?>

								  <?php if ( $enable_contact_section ) { ?>
										<li><a href="<?php echo esc_url( home_url( '#contact' ) ); ?>"><?php echo esc_html( get_theme_mod( 'ella_one_page_portfolio_contact_section_page_title', __( 'Contact Us', 'ella-portfolio-one-page' ) ) ); ?></a></li>
								 <?php } ?>

								<?php else : ?>
									<?php
									wp_nav_menu( array(
										'theme_location' => 'menu-1',
										'container'      => false,
										'items_wrap'     => '%3$s', // prevent extra <ul>
										'walker'         => new EllaPress_Custom_Walker_Nav_Menu(),
										'fallback_cb'    => 'ellapress_custom_menu_fallback',
									) );
									?>
								<?php endif; ?>
							</ul>

						</nav> <!-- End #site-navigation -->

						<!-- Off-canvas button -->
						<div class="pe-header-bar text-end">
							<button class="tp-offcanvas-open-btn">
								<span></span>
								<span></span>
							</button>
						</div>
					</div>
				</header>
			</div><!-- .pe-container -->
		</div><!-- .pe-menu-sticky -->
	</div><!-- .head-wrapper -->

	<div class="site-body">
