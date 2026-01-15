<?php
/**
 * ellapress Theme Customizer
 *
 * @package ellapress
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function ellapress_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

	if ( isset( $wp_customize->selective_refresh ) ) {
		$wp_customize->selective_refresh->add_partial(
			'blogname',
			array(
				'selector'        => '.site-title a',
				'render_callback' => 'ellapress_customize_partial_blogname',
			)
		);
		$wp_customize->selective_refresh->add_partial(
			'blogdescription',
			array(
				'selector'        => '.site-description',
				'render_callback' => 'ellapress_customize_partial_blogdescription',
			)
		);
	}
}
add_action( 'customize_register', 'ellapress_customize_register' );

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function ellapress_customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function ellapress_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function ellapress_customize_preview_js() {
	wp_enqueue_script( 'ellapress-customizer', get_template_directory_uri() . '/js/customizer.js', array( 'customize-preview' ), ELLAPRESS_VERSION, true );
}
require get_template_directory() . '/inc/ellapress_recommended_plugin.php';
add_action( 'customize_preview_init', 'ellapress_customize_preview_js' );

/**
 * PRO PAGE

 */

 require get_template_directory() . '/inc/go-pro/class-customize.php';


/*-----------------------------------------------------------------------------------*/
/*	Customizer
/*-----------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------*/
/*	Theme Info 
/*-----------------------------------------------------------------------------------*/
function ellapress_themeinfo_settings( $wp_customize ) {
	$wp_customize->add_section( 'theme_info', array(
		'title'       => __( 'Demo & Documentation', 'ellapress' ),
		'priority'    => 6,
	) );
	
	/** Important Links */
	$wp_customize->add_setting( 'theme_info_theme',
		array(
			'default' => '',
			'sanitize_callback' => 'wp_kses_post',
		)
	);

	$theme_info = '';
	//$theme_info .= sprintf( '<p>' . __( 'Demo Link: %1$sClick here.%2$s', 'ellapress' ) . '</p>', '<a href="' . esc_url( 'https://demo.pixelonetry.com/ellolite/' ) . '" target="_blank">', '</a>' );
	$theme_info .= sprintf( '<p>' . __( 'Pro Demo Link: %1$sClick here.%2$s', 'ellapress' ) . '</p>', '<a href="' . esc_url( 'https://pixelonetry.com/previews/?theme=ella-premium' ) . '" target="_blank">', '</a>' );
	$theme_info .= sprintf( '<p>' . __( 'Documentation: %1$sClick here.%2$s', 'ellapress' ) . '</p>', '<a href="' . esc_url( 'https://pixelonetry.com/docs/spirallite/' ) . '" target="_blank">', '</a>' );
	//$theme_info .= sprintf( '<p>' . __( 'Video Tutorial: %1$sClick here.%2$s', 'ellapress' ) . '</p>', '<a href="' . esc_url( 'https://www.youtube.com/watch?v=NVbuDPmXuaU' ) . '" target="_blank">', '</a>' );
	//$theme_info .= sprintf( '<p>' . __( 'Rate The Theme: %1$sClick here.%2$s', 'ellapress' ) . '</p>', '<a href="' . esc_url( 'https://wordpress.org/support/theme/ella/reviews/#new-post' ) . '" target="_blank">', '</a>' );
	$theme_info .= sprintf( '<p>' . __( 'Submit Ticket: %1$sClick here.%2$s', 'ellapress' ) . '</p>', '<a href="' . esc_url( 'https://pixelonetry.freshdesk.com/support/tickets/new' ) . '" target="_blank">', '</a>' );

	$wp_customize->add_control( new WP_Customize_Control( $wp_customize,
		'theme_info_theme',
		array(
			'section'     => 'theme_info',
			'description' => $theme_info,
			'type'        => 'hidden', // Optional, can hide the control input
		)
	)); 
}
add_action( 'customize_register', 'ellapress_themeinfo_settings' );
/*-----------------------------------------------------------------------------------*/
/*	Common 
/*-----------------------------------------------------------------------------------*/
function ellapress_my_register_additional_customizer_settings( $wp_customize ) {
	
	$wp_customize->add_section(
		'ellapress_blog_setting', 
		array(
			'title' => esc_html__( 'Blog Settings', 'ellapress' ),
			'priority' => 30,
		)
	);
	
	/** Blog Head Title */
	$wp_customize->add_setting(
		'ellapress_blog_heading_title',
		array(
			'default' => __( 'News & Blog', 'ellapress' ),
			'sanitize_callback' => 'sanitize_text_field',
		)
	);
	
	$wp_customize->add_control(
		'ellapress_blog_heading_title',
		array(
			'label' => __( 'Blog Head Title', 'ellapress' ),
			'section' => 'ellapress_blog_setting', // Corrected 'panel' to 'section'
			'type' => 'text',
		)
	);

	/** Blog Head Subtitle */
	/*$wp_customize->add_setting(
		'ellapress_blog_heading_subtitle',
		array(
			'default' => __( 'Currient Reading', 'ellapress' ),
			'sanitize_callback' => 'sanitize_text_field',
		)
	);
	
	$wp_customize->add_control(
		'ellapress_blog_heading_subtitle',
		array(
			'label' => __( 'Blog Head Subtitle', 'ellapress' ),
			'section' => 'ellapress_blog_setting', // Corrected 'panel' to 'section'
			'type' => 'text',
		)
	);*/
	
 }
 add_action( 'customize_register', 'ellapress_my_register_additional_customizer_settings' );

 function ellapress_footer_customizer_settings( $wp_customize ) {

 /**  
 *  Section Footer
 */

$wp_customize->add_section(
	'ellapress_footer',
	array(
		'title' => __( 'Footer', 'ellapress' ),
		'description' => __( 'Footer Settings ', 'ellapress' ),
		'priority' => 40,
	)
  );

	// Footer Logo
    $wp_customize->add_setting(
		'footer_logo', // Setting ID
		array(
			'default'           => get_template_directory_uri() . '/img/footer_logo.png', 
			'sanitize_callback' => 'esc_url_raw', // Sanitize to ensure it's a valid URL
		)
	);
	
	$wp_customize->add_control(
		new WP_Customize_Image_Control( // Use the WP_Customize_Image_Control class
			$wp_customize, // Pass the customizer object
		'footer_logo', // Control ID
			array(
				'label'    => __( 'Footer Logo', 'ellapress' ), // Control label
				'section'  => 'ellapress_footer', // Section where it appears
			)
		)
	);

 $wp_customize->add_setting(
	'ellapress_copyright',
	array(
		'default' => sprintf(__('© 2025 %s - WordPress Theme.', 'ellapress'), get_bloginfo('name')),
		'sanitize_callback' => 'wp_kses_post',
	)
);

$wp_customize->add_control(
	'ellapress_copyright',
	array(
		'label' => __( 'Copyright', 'ellapress' ),
		'section' => 'ellapress_footer',
		'type' => 'textarea',
	)
);
}
add_action( 'customize_register', 'ellapress_footer_customizer_settings' );

function ellapress_social_customizer_settings( $wp_customize ) {

	/*-----------------------------------------------------------------------------------*/
/*	Social Setting
/*-----------------------------------------------------------------------------------*/

$wp_customize->add_section(
	'ellapress_social_settings',
	array(
		'title' => __( 'Social Settings', 'ellapress' ),
		'description' => __( 'Leave blank if you do not want to show the social link.', 'ellapress' ),
		'priority' => 40,
	)
);

/** Facebook */
$wp_customize->add_setting(
	'ellapress_facebook',
	array(
		'default' => '',
		'sanitize_callback' => 'esc_url_raw',
	)
);

$wp_customize->add_control(
	'ellapress_facebook',
	array(
		'label' => __( 'Facebook', 'ellapress' ),
		'section' => 'ellapress_social_settings',
		'type' => 'text',
	)
);

/** Twitter */
$wp_customize->add_setting(
	'ellapress_twitter',
	array(
		'default' => '',
		'sanitize_callback' => 'esc_url_raw',
	)
);

$wp_customize->add_control(
	'ellapress_twitter',
	array(
		'label' => __( 'Twitter', 'ellapress' ),
		'section' => 'ellapress_social_settings',
		'type' => 'text',
	)
);

/** Pinterest */
$wp_customize->add_setting(
	'ellapress_pinterest',
	array(
		'default' => '',
		'sanitize_callback' => 'esc_url_raw',
	)
);

$wp_customize->add_control(
	'ellapress_pinterest',
	array(
		'label' => __( 'Pinterest', 'ellapress' ),
		'section' => 'ellapress_social_settings',
		'type' => 'text',
	)
);

/** LinkedIn */
$wp_customize->add_setting(
	'ellapress_linkedin',
	array(
		'default' => '',
		'sanitize_callback' => 'esc_url_raw',
	)
);

$wp_customize->add_control(
	'ellapress_linkedin',
	array(
		'label' => __( 'LinkedIn', 'ellapress' ),
		'section' => 'ellapress_social_settings',
		'type' => 'text',
	)
);

/** Instagram Plus */
$wp_customize->add_setting(
	'ellapress_instagram',
	array(
		'default' => '',
		'sanitize_callback' => 'esc_url_raw',
	)
);

$wp_customize->add_control(
	'ellapress_instagram',
	array(
		'label' => __( 'Instagram', 'ellapress' ),
		'section' => 'ellapress_social_settings',
		'type' => 'text',
	)
);

/** Youtube Plus */
$wp_customize->add_setting(
	'ellapress_youtube',
	array(
		'default' => '',
		'sanitize_callback' => 'esc_url_raw',
	)
);

$wp_customize->add_control(
	'ellapress_youtube',
	array(
		'label' => __( 'YouTube', 'ellapress' ),
		'section' => 'ellapress_social_settings',
		'type' => 'text',
	)
);

/** Tiktok */
$wp_customize->add_setting(
	'ellapress_tiktok',
	array(
		'default' => '',
		'sanitize_callback' => 'esc_url_raw',
	)
);

$wp_customize->add_control(
	'ellapress_tiktok',
	array(
		'label' => __( 'Tiktok', 'ellapress' ),
		'section' => 'ellapress_social_settings',
		'type' => 'text',
	)
);


/**  
 *  Section WooCommerce
 */

  // Add WooCommerce Sidebar Section
  $wp_customize->add_section( 'ellapress_woocommerce_sidebar_section', array(
	'title'       => __( 'WooCommerce Sidebar', 'ellapress' ),
	'priority'    => 30,
	'description' => __( 'Enable or disable sidebars.', 'ellapress' ),
) );

// Add Setting for WooCommerce Sidebar
$wp_customize->add_setting( 'ellapress_woocommerce_sidebar_setting', array(
	'default'   => 'yes', // Default value is 'yes'
	'transport' => 'refresh',
	'sanitize_callback' => 'ellapress_sanitize_woocommerce_sidebar_setting',
) );

// Add Control for WooCommerce Sidebar
$wp_customize->add_control( 'ellapress_woocommerce_sidebar_control', array(
	'label'    => __( 'Display WooCommerce Sidebar?', 'ellapress' ),
	'section'  => 'ellapress_woocommerce_sidebar_section',
	'settings' => 'ellapress_woocommerce_sidebar_setting',
	'type'     => 'radio',
	'choices'  => array(
		'yes' => __( 'Yes', 'ellapress' ),
		'no'  => __( 'No', 'ellapress' ),
	),
) );

// Sanitize the setting value
function ellapress_sanitize_woocommerce_sidebar_setting( $input ) {
$valid = array( 'yes', 'no' );
return ( in_array( $input, $valid, true ) ) ? $input : 'yes';
}

}
add_action( 'customize_register', 'ellapress_social_customizer_settings' );


