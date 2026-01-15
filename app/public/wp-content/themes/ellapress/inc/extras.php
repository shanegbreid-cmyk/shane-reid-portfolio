<?php
/**
 * Callback for Social Links  
 */
function ellapress_social_cb() {
    $facebook  = get_theme_mod('ellapress_facebook', 'https://www.facebook.com/' );
    $twitter   = get_theme_mod('ellapress_twitter', 'https://www.twitter.com/' );
    $pinterest = get_theme_mod('ellapress_pinterest', 'https://www.pinterest.com/' );
    $linkedin    = get_theme_mod( 'ellapress_linkedin' );
    $instagram = get_theme_mod('ellapress_instagram', 'https://www.instagram.com/' );
    $youtube     = get_theme_mod( 'ellapress_youtube' );
    $tiktok      = get_theme_mod( 'ellapress_tiktok' );

    if ( $facebook || $twitter || $pinterest || $linkedin || $instagram || $youtube || $tiktok ) { ?>
        <div class="social-media-wrap">
        <div class="social-media">
            <?php 
                if ( $facebook ) echo '<a class="facebook" href="' . esc_url( $facebook ) . '" target="_blank" title="' . esc_attr__( 'Facebook', 'ellapress' ) . '" data-original-title="Facebook"><i class="icon-facebook"></i></a>';
                if ( $twitter ) echo '<a class="twitter" href="' . esc_url( $twitter ) . '" target="_blank" title="' . esc_attr__( 'Twitter', 'ellapress' ) . '" data-original-title="Twitter"><i class="icon-twitter"></i></a>'; 
                if ( $pinterest ) echo '<a class="pinterest" href="' . esc_url( $pinterest ) . '" target="_blank" title="' . esc_attr__( 'Pinterest', 'ellapress' ) . '" data-original-title="Pinterest"><i class="icon-pinterest"></i></a>';
                if ( $linkedin ) echo '<a class="linkedin" href="' . esc_url( $linkedin ) . '" target="_blank" title="' . esc_attr__( 'LinkedIn', 'ellapress' ) . '" data-original-title="Linkedin"><i class="icon-linkedin"></i></a>';
                if ( $instagram ) echo '<a class="instagram" href="' . esc_url( $instagram ) . '" target="_blank" title="' . esc_attr__( 'Instagram', 'ellapress' ) . '" data-original-title="Instagram"><i class="icon-instagram"></i></a>';
                if ( $youtube ) echo '<a class="youtube" href="' . esc_url( $youtube ) . '" target="_blank" title="' . esc_attr__( 'YouTube', 'ellapress' ) . '" data-original-title="Youtube"><i class="icon-youtube"></i></a>';
                if ( $tiktok ) echo '<a class="tiktok" href="' . esc_url( $tiktok ) . '" target="_blank" title="' . esc_attr__( 'TikTok', 'ellapress' ) . '" data-original-title="Tiktok"><i class="icon-tiktok"></i></a>';
            ?>
        </div>
        </div>
    <?php }
}
add_action( 'ellapress_social', 'ellapress_social_cb' );
?>
<?php
/*******************************************************************************
 *  Get Started Notice
 *******************************************************************************/

add_action( 'wp_ajax_ellapress_dismissed_notice_handler', 'ellapress_ajax_notice_handler' );

/**
 * AJAX handler to store the state of dismissible notices.
 */
function ellapress_ajax_notice_handler() {
    if ( isset( $_POST['type'] ) ) {
        // Pick up the notice "type" - passed via jQuery (the "data-notice" attribute on the notice)
        $type = sanitize_text_field( wp_unslash( $_POST['type'] ) );
        // Store it in the options table
        update_option( 'dismissed-' . $type, TRUE );
    }
}

function ellapress_deprecated_hook_admin_notice() {
        // Check if it's been dismissed...
        if ( ! get_option('dismissed-get_started', FALSE ) ) {
            // Added the class "notice-get-started-class" so jQuery pick it up and pass via AJAX,
            // and added "data-notice" attribute in order to track multiple / different notices
            // multiple dismissible notice states ?>
            <div class="updated notice notice-get-started-class is-dismissible" data-notice="get_started">
                <div class="ellapress-getting-started-notice clearfix">
                    <div class="ellapress-theme-screenshot">
                        <img src="<?php echo esc_url( get_stylesheet_directory_uri() ); ?>/screenshot.png" class="screenshot" alt="<?php esc_attr_e( 'Theme Screenshot', 'ellapress' ); ?>" />
                    </div><!-- /.ellapress-theme-screenshot -->
                    <div class="ellapress-theme-notice-content">
                        <h2 class="ellapress-notice-h2">
                            <?php
                        printf(
                        /* translators: 1: welcome page link starting html tag, 2: welcome page link ending html tag. */
                            esc_html__( 'Welcome! Thank you for choosing %1$s!', 'ellapress' ), '<strong>'. wp_get_theme()->get('Name'). '</strong>' );
                        ?>
                        </h2>

                        <p class="plugin-install-notice"><?php echo sprintf(__('Install and activate <strong>Pixelonetry Companion</strong> plugin for taking full advantage of all the features this theme has to offer.', 'ellapress')) ?></p>

                        <a class="ellapress-btn-get-started button button-primary button-hero ellapress-button-padding" href="#" data-name="" data-slug=""><?php esc_html_e( 'Get started with EllaPress', 'ellapress' ) ?></a><span class="ellapress-push-down">
                        <?php
                            /* translators: %1$s: Anchor link start %2$s: Anchor link end */
                            printf(
                                'or %1$sCustomize theme%2$s</a></span>',
                                '<a target="_blank" href="' . esc_url( admin_url( 'customize.php' ) ) . '">',
                                '</a>'
                            );
                        ?>
                    </div><!-- /.ellapress-theme-notice-content -->
                </div>
            </div>
        <?php }
}

add_action( 'admin_notices', 'ellapress_deprecated_hook_admin_notice' );

/*******************************************************************************
 *  Plugin Installer
 *******************************************************************************/

add_action( 'wp_ajax_install_act_plugin', 'ellapress_admin_install_plugin' );

function ellapress_admin_install_plugin() {
    /**
     * Install Plugin.
     */
    include_once ABSPATH . '/wp-admin/includes/file.php';
    include_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
    include_once ABSPATH . 'wp-admin/includes/plugin-install.php';

    if ( ! file_exists( WP_PLUGIN_DIR . '/pixelonetry-companion' ) ) {
        $api = plugins_api( 'plugin_information', array(
            'slug'   => sanitize_key( wp_unslash( 'pixelonetry-companion' ) ),
            'fields' => array(
                'sections' => false,
            ),
        ) );

        $skin     = new WP_Ajax_Upgrader_Skin();
        $upgrader = new Plugin_Upgrader( $skin );
        $result   = $upgrader->install( $api->download_link );
    }

    // Activate plugin.
    if ( current_user_can( 'activate_plugin' ) ) {
        $result = activate_plugin( 'pixelonetry-companion/pixelonetry-companion.php' );
    }
}	