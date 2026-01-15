<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
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

						<div class="pe-menu-sticky">

				<!--main bar-->
				<div class="pe-container"> 
					<header class="row">
						<div class="col-lg-12">
						 <!-- Logo -->
		 <?php $custom_logo_id = get_theme_mod( 'custom_logo' );
		$logo = wp_get_attachment_image_src( $custom_logo_id , 'full' );
		if ( has_custom_logo() ) {
			echo '<a class="logo" href="' . esc_url( home_url( '/' ) ) . '">
        <img src="' . esc_url( $logo[0] ) . '" alt="' . esc_attr( get_bloginfo( 'name' ) ) . '">
      </a>';
		} else {
			echo '<a class="logo" href="' . esc_url( home_url( '/' ) ) . '"><h3 class="test-logo">' . get_bloginfo('name') . '</h3></a>'; 
		} ?>
						
		 <!-- Menu -->
		 <nav id="site-navigation" class="pe-menu-main">
         <button class="menu-toggle-button" aria-controls="navigation" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'ellapress' ); ?></button>
            <!-- Close Button Inside Navbar Collapse with Focus Outline -->
            <?php
                wp_nav_menu( array(
                    'theme_location' => 'menu-1',
                    'container'      => false,
                    'menu_id'        => 'navigation',
                    'menu_class'     => 'pe-menu',
                    'walker'         => new EllaPress_Custom_Walker_Nav_Menu(),
                    'fallback_cb'    => 'ellapress_custom_menu_fallback',
                ) );
            ?>
        </nav> <!-- #end-menu -->

        <?php
            function ellapress_custom_menu_fallback() {
                if (current_user_can('manage_options')) {
                    echo '<ul class="pe-menu">';
                    echo '<li><a href="' . esc_url(admin_url('nav-menus.php')) . '">' . esc_html__('Click here to add a menu', 'ellapress') . '</a></li>';
                    echo '</ul>';
                }
            }
        ?>

							 <!-- Right Part -->
                  <div class="pe-header-bar text-end">
                     <button class="tp-offcanvas-open-btn">
                        <span></span>
                        <span></span>
                     </button>
                  </div> 

               
							
						</div>
					</header><!-- end header  -->
				</div><!--end container-->
			</div><!--end sticky bar-->
		</div> <!-- end head wrapper -->

		<div class="site-body">

	