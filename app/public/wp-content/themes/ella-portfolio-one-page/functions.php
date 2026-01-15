<?php
/**
 * Functions for ELLA Corporate Child Theme
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

 function ella_portfolio_one_page_child_theme_setup() {
    // Add support for the title tag
    add_theme_support( 'title-tag' );

    // Add support for automatic feed links
    add_theme_support( 'automatic-feed-links' );
}
add_action( 'after_setup_theme', 'ella_portfolio_one_page_child_theme_setup' );

function ella_portfolio_one_page_child_theme_widgets_init() {
    register_sidebar( array(
       'name'          => esc_html__( 'Sidebar', 'ella-portfolio-one-page' ),
        'id'            => 'sidebar-1',
        'description'   => esc_html__( 'Add widgets here.', 'ella-portfolio-one-page' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ) );
}
add_action( 'widgets_init', 'ella_portfolio_one_page_child_theme_widgets_init' );


/**
 * Enqueue parent and child theme styles, and custom parent CSS
 */
function ella_portfolio_one_page_enqueue_styles() {
    // Enqueue parent style
    wp_enqueue_style(
        'ello-parent-style',
        get_template_directory_uri() . '/style.css'
    );
     wp_enqueue_script(
        'ella-custom-js',
        get_stylesheet_directory_uri() . '/js/custom.js',
        array('jquery'), // or [] if no dependencies
        '1.0.0', // version
        true // load in footer
    );
}
add_action( 'wp_enqueue_scripts', 'ella_portfolio_one_page_enqueue_styles' );

/**
     * Sanitization Functions
     * 
     * @link https://github.com/WPTRT/code-examples/blob/master/customizer/sanitization-callbacks.php 
    */    
    function ella_one_page_portfolio_sanitize_checkbox( $checked ){
        // Boolean check.
	   return ( ( isset( $checked ) && true == $checked ) ? true : false );
    }
    
    function ella_one_page_portfolio_sanitize_checkbox_select( $input, $setting ) {
    	// Ensure input is a slug.
    	$input = sanitize_key( $input );
    	// Get list of choices from the control associated with the setting.
    	$choices = $setting->manager->get_control( $setting->id )->choices;
    	// If the input is a valid key, return it; otherwise, return the default.
    	return ( array_key_exists( $input, $choices ) ? $input : $setting->default );
    }
    
    function ella_one_page_portfolio_sanitize_checkbox_number_absint( $number, $setting ) {
    	// Ensure $ella_one_page_portfolio_number is an absolute integer (whole number, zero or greater).
    	$number = absint( $number );
    	// If the input is an absolute integer, return it; otherwise, return the default
    	return ( $number ? $number : $setting->default );
    }
    
    function ella_one_page_portfolio_sanitize_checkbox_email( $email, $setting ) {
    	// Sanitize $input as a hex value without the hash prefix.
    	$email = sanitize_email( $email );    	
    	// If $email is a valid email, return it; otherwise, return the default.
    	return ( !empty( $email ) ? $email : $setting->default );
    }
    
    function ella_one_page_portfolio_sanitize_checkbox_css( $css ){
    	return wp_strip_all_tags( $css );
    }   
    
    function ella_one_page_portfolio_sanitize_checkbox_multiple_check( $values ) {    
        $multi_values = !is_array( $values ) ? explode( ',', $values ) : $values;    
        return !empty( $multi_values ) ? array_map( 'sanitize_text_field', $multi_values ) : array();
    }

	function ella_one_page_portfolio_sanitize_multiple_check( $values ) {    
        $multi_values = !is_array( $values ) ? explode( ',', $values ) : $values;    
        return !empty( $multi_values ) ? array_map( 'sanitize_text_field', $multi_values ) : array();
    }
    

		/** Radio Sanitize */
	function spirallite_sanitize_radio( $input, $setting ) {
		// Ensure input is a slug.
		$input = sanitize_key( $input );
		// Get list of choices from the control associated with the setting.
		$choices = $setting->manager->get_control( $setting->id )->choices;
		// If the input is a valid key, return it; otherwise, return the default.
		return ( array_key_exists( $input, $choices ) ? $input : $setting->default );
	}  

    /**
 * Remove default WordPress Header Text Color option
 */
function ella_one_page_portfolio_remove_header_textcolor_option( $wp_customize ) {
    // Only remove the control — not the setting.
    if ( $wp_customize->get_control( 'header_textcolor' ) ) {
        $wp_customize->remove_control( 'header_textcolor' );
    }
}
add_action( 'customize_register', 'ella_one_page_portfolio_remove_header_textcolor_option', 20 );


 /**
 * Customizer additions.
 */
require get_stylesheet_directory() . '/inc/custom-controls/custom-control.php';

/**
 * Function to get Sections 
 */
/**
 * Get enabled front-page sections
 */


/*-----------------------------------------------------------------------------------*/
/*	Customizer
/*-----------------------------------------------------------------------------------*/
function ella_one_page_portfolio_my_register_additional_customizer_settings( $wp_customize ) {

	 /* Option list of all categories */
	 $args = array(
		'type'         => 'post',
		'orderby'      => 'name',
		'order'        => 'ASC',
		'hide_empty'   => 1,
		'hierarchical' => 1,
		'taxonomy'     => 'category'
	 ); 
	 $option_categories = array();
	 $category_lists = get_categories( $args );
	 $option_categories[''] = __( 'Choose Category', 'ella-portfolio-one-page' );
	 foreach( $category_lists as $category ){
		 $option_categories[$category->term_id] = $category->name;
	 }
	 
	 $option_cat = array();
	 foreach( $category_lists as $cat ){
		 $option_cat[$cat->term_id] = $cat->name;
	 }
		 
	 /* Option list of all post */	
	 $options_posts = array();
	 $options_posts_obj = get_posts('posts_per_page=-1');
	 $options_posts[''] = __( 'Choose Post', 'ella-portfolio-one-page' );
	 foreach ( $options_posts_obj as $posts ) {
		 $options_posts[$posts->ID] = $posts->post_title;
	 }
	 
	 /* Option list of all pages */	
	 $options_pages = array();
	 $options_pages_obj = get_posts('posts_per_page=-1&post_type=page');
	 $options_pages[''] = __( 'Choose Page', 'ella-portfolio-one-page' );
	 foreach ( $options_pages_obj as $pages ) {
		 $options_pages[$pages->ID] = $pages->post_title;
	 }

	$wp_customize->add_section( 'theme_info', array(
		'title'       => __( 'Demo & Documentation', 'ella-portfolio-one-page' ),
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
	$theme_info .= sprintf( '<p>' . __( 'Demo Link: %1$sClick here.%2$s', 'ella-portfolio-one-page' ) . '</p>', '<a href="' . esc_url( 'https://pixelonetry.com/previews/?theme=spiral-lite' ) . '" target="_blank">', '</a>' );
	$theme_info .= sprintf( '<p>' . __( 'Pro Demo Link: %1$sClick here.%2$s', 'ella-portfolio-one-page' ) . '</p>', '<a href="' . esc_url( 'https://pixelonetry.com/previews/?theme=spiral' ) . '" target="_blank">', '</a>' );
	$theme_info .= sprintf( '<p>' . __( 'Documentation Link: %1$sClick here.%2$s', 'ella-portfolio-one-page' ) . '</p>', '<a href="' . esc_url( 'https://pixelonetry.com/docs/spirallite/' ) . '" target="_blank">', '</a>' );
	$theme_info .= sprintf( '<p>' . __( 'Video Tutorial: %1$sClick here.%2$s', 'ella-portfolio-one-page' ) . '</p>', '<a href="' . esc_url( 'https://www.youtube.com/watch?v=6FyecnWnJtk' ) . '" target="_blank">', '</a>' );
	$theme_info .= sprintf( '<p>' . __( 'Submit Ticket: %1$sClick here.%2$s', 'ella-portfolio-one-page' ) . '</p>', '<a href="' . esc_url( 'https://pixelonetry.freshdesk.com/support/tickets/new' ) . '" target="_blank">', '</a>' );
	$theme_info .= sprintf( '<p>' . __( 'Rate This Theme: %1$sClick here.%2$s', 'ella-portfolio-one-page' ) . '</p>', '<a href="' . esc_url( 'https://wordpress.org/support/theme/spiral-lite-one-page/reviews/#new-post' ) . '" target="_blank">', '</a>' );

	
	$wp_customize->add_control( new WP_Customize_Control( $wp_customize,
		'theme_info_theme',
		array(
			'section'     => 'theme_info',
			'description' => $theme_info,
			'type'        => 'hidden', // Optional, can hide the control input
		)
	));
	 
	
	  /** Section Menu Setting */
	  $wp_customize->add_section(
        'ella_one_page_portfolio_section_menu_setting',
        array(
            'title'     => __( 'Front Page Menu', 'ella-portfolio-one-page' ),
            'priority'  => 19,
            'capability'=> 'edit_theme_options',
        )
    );    
    
    /** Enable/Disable Home Link */
    $wp_customize->add_setting(
        'ella-portfolio-one-page_ed_home_link',
        array(
            'default' => '',
            'sanitize_callback' => 'ella_one_page_portfolio_sanitize_checkbox',
        )
    );
    
    $wp_customize->add_control(
        'ella-portfolio-one-page_ed_home_link',
        array(
            'label' => __( 'Disable Home Link', 'ella-portfolio-one-page' ),
            'description' => __( 'Enable to disable Home Link', 'ella-portfolio-one-page' ),
            'section' => 'ella_one_page_portfolio_section_menu_setting',
            'type' => 'checkbox',
        )
    );
    
    /** Enable/Disable Section Menu */
    $wp_customize->add_setting(
        'ella_one_page_portfolio_ed_secion_menu',
        array(
            'default' => '',
            'sanitize_callback' => 'ella_one_page_portfolio_sanitize_checkbox',
        )
    );
    
    $wp_customize->add_control(
        'ella_one_page_portfolio_ed_secion_menu',
        array(
            'label' => __( 'Disable Front Section Menu', 'ella-portfolio-one-page' ),
            'description' => __( 'Enable to disable Front Page Section Menu', 'ella-portfolio-one-page' ),
            'section' => 'ella_one_page_portfolio_section_menu_setting',
            'type' => 'checkbox',
        )
    );
    
    /** Home Link Label */
    $wp_customize->add_setting(
        'ella_one_page_portfolio_home_link_label',
        array(
            'default' => __( 'Home', 'ella-portfolio-one-page' ),
            'sanitize_callback' => 'sanitize_text_field',
        )
    );
    $wp_customize->add_control(
        'ella_one_page_portfolio_home_link_label',
        array(
            'label' => __( 'Home Link Label', 'ella-portfolio-one-page' ),
            'section' => 'ella_one_page_portfolio_section_menu_setting',
            'type' => 'text',
        )
    );
    /** Section Menu Setting Ends */

	 /** Social Settings */
    
/** Portfolio Section */
   $wp_customize->add_section(
    'ella_one_page_portfolio_portfolio_section',
    array(
        'title'    => __( 'Portfolio Section', 'ella-portfolio-one-page' ),
        'priority' => 6,
        'panel'    => 'elina_frontpage_sections',
    )
);

// Enable/Disable Portfolio Section
$wp_customize->add_setting(
    'ella_one_page_portfolio_ed_portfolio_section',
    array(
        'default' => true,
        'sanitize_callback' => 'ella_one_page_portfolio_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'ella_one_page_portfolio_ed_portfolio_section',
    array(
        'label'   => __( 'Enable Portfolio Section', 'ella-portfolio-one-page' ),
        'section' => 'ella_one_page_portfolio_portfolio_section',
        'type'    => 'checkbox',
    )
);

// Portfolio Title
$wp_customize->add_setting(
    'ella_one_page_portfolio_portfolio_title',
    array(
        'default'           => __( 'PORTFOLIO', 'ella-portfolio-one-page' ),
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'ella_one_page_portfolio_portfolio_title',
    array(
        'label'   => __( 'Section Title', 'ella-portfolio-one-page' ),
        'section' => 'ella_one_page_portfolio_portfolio_section',
        'type'    => 'text',
    )
);

// Portfolio Sub-title
$wp_customize->add_setting(
    'ella_one_page_portfolio_portfolio_subtitle',
    array(
        'default'           => __( 'Best Features', 'ella-portfolio-one-page' ),
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'ella_one_page_portfolio_portfolio_subtitle',
    array(
        'label'   => __( 'Section Subtitle', 'ella-portfolio-one-page' ),
        'section' => 'ella_one_page_portfolio_portfolio_section',
        'type'    => 'text',
    )
);

// Fetch the latest 10 posts
$latest_posts = get_posts( array(
    'numberposts' => 10,
    'post_status' => 'publish',
) );

// Store the post IDs as defaults
$default_post_ids = wp_list_pluck( $latest_posts, 'ID' );

// Loop and set each default
for ( $i = 1; $i <= 10; $i++ ) {
    $default = isset( $default_post_ids[$i - 1] ) ? $default_post_ids[$i - 1] : '';

    $wp_customize->add_setting(
        "ella_one_page_portfolio_portfolio_section_post_$i",
        array(
            'default'           => $default,
            'sanitize_callback' => 'ella_one_page_portfolio_sanitize_checkbox_select',
        )
    );

    $wp_customize->add_control(
        "ella_one_page_portfolio_portfolio_section_post_$i",
        array(
            'label'   => sprintf( __( 'Select Post %d', 'ella-portfolio-one-page' ), $i ),
            'section' => 'ella_one_page_portfolio_portfolio_section',
            'type'    => 'select',
            'choices' => $options_posts,
        )
    );
}

/** Note */
$wp_customize->add_setting(
	'portfolio_sec_unlock',
	array(
		'default'           => '',
		'sanitize_callback' => 'wp_kses_post' 
	)
);

$wp_customize->add_control(
	new SpiralLite_Note_Control_Note_Control( 
		$wp_customize,
		'portfolio_sec_unlock',
		array(
			'section'     => 'ella_one_page_portfolio_portfolio_section',
			'description' => sprintf( __( '%1$sUpgrade to Pro use unlimited portfolio.%2$s %3$sUpgrade to Pro%4$s ', 'ella-portfolio-one-page' ),'<div class="pro-version-button"><span>', '</span>', '<a href="https://pixelonetry.com/downloads/ella-premium-one-page-wordpress-theme/" target="_blank">', '</a></div>' ),
		)
	)
 );	

    /** Portfolio Section Ends */

     /** Blog Sections */
	 $wp_customize->add_section(
        'ella_one_page_portfolio_blog_section',
        array(
            'title' => __( 'Blog Section', 'ella-portfolio-one-page' ),
            'priority' => 7,
            'panel' => 'elina_frontpage_sections',
        )
    );

	// Blog Header Section // 
	$wp_customize->add_setting(
		'blog_head_setting_options'
			,array(
			'capability'     	=> 'edit_theme_options',
			'sanitize_callback' => 'spirallite_sanitize_text',
			'priority' => 2,
		)
	);

	$wp_customize->add_control(
	'blog_head_setting_options',
		array(
			'type' => 'hidden',
			'label' => __('Settings','ella-portfolio-one-page'),
			'section' => 'ella_one_page_portfolio_blog_section',
		)
	);
    
    /** Enable/Disable Blog Section */
    $wp_customize->add_setting(
        'ella-portfolio-one-page_ed_blog_section',
        array(
            'default' => true,
            'sanitize_callback' => 'ella_one_page_portfolio_sanitize_checkbox',
        )
    );
    
    $wp_customize->add_control(
        'ella-portfolio-one-page_ed_blog_section',
        array(
            'label' => __( 'Enable Blog Section', 'ella-portfolio-one-page' ),
            'section' => 'ella_one_page_portfolio_blog_section',
            'type' => 'checkbox',
        )
    );

	// Blog Header Section // 
	$wp_customize->add_setting(
		'blog_head_header_options'
			,array(
			'capability'     	=> 'edit_theme_options',
			'sanitize_callback' => 'spirallite_sanitize_text',
			'priority' => 4,
		)
	);

	$wp_customize->add_control(
	'blog_head_header_options',
		array(
			'type' => 'hidden',
			'label' => __('Header','ella-portfolio-one-page'),
			'section' => 'ella_one_page_portfolio_blog_section',
		)
	);
    
    /** Blog Section Menu Title */
    $wp_customize->add_setting(
        'ella_one_page_portfolio_blog_section_menu_title',
        array(
			'default'           => __( 'BLOG', 'ella-portfolio-one-page' ),
            'sanitize_callback' => 'sanitize_text_field',
        )
    );
    
    $wp_customize->add_control(
        'ella_one_page_portfolio_blog_section_menu_title',
        array(
            'label' => __( 'Blog Section Menu Title', 'ella-portfolio-one-page' ),
            'section' => 'ella_one_page_portfolio_blog_section',
            'type' => 'text',
        )
    );
    
    /** Blog Section Title */
    $wp_customize->add_setting(
        'ella_one_page_portfolio_blog_section_title',
        array(
            'default'           => __( 'Latest News', 'ella-portfolio-one-page' ),
            'sanitize_callback' => 'sanitize_text_field',
        )
    );
    
    $wp_customize->add_control(
        'ella_one_page_portfolio_blog_section_title',
        array(
            'label' => __( 'Blog Section Title', 'ella-portfolio-one-page' ),
            'section' => 'ella_one_page_portfolio_blog_section',
            'type' => 'text'
        )
    );

	$wp_customize->add_setting(
        'ella_one_page_portfolio_blog_section_subtitle',
        array(
			'default'           => __( "Spiral is customizable fully responsive", 'ella-portfolio-one-page' ),
            'sanitize_callback' => 'sanitize_text_field',
        )
    );
    
    $wp_customize->add_control(
        'ella_one_page_portfolio_blog_section_subtitle',
        array(
            'label' => __( 'Subtitle', 'ella-portfolio-one-page' ),
            'section' => 'ella_one_page_portfolio_blog_section',
            'type' => 'text',
        )
    );
    
    /** Blog Section Content */
    $wp_customize->add_setting(
        'ella_one_page_portfolio_blog_section_content',
        array(
            'default' => '',
            'sanitize_callback' => 'sanitize_text_field',
        )
    );
    
    $wp_customize->add_control(
        'ella_one_page_portfolio_blog_section_content',
        array(
            'label' => __( 'Blog Section Content', 'ella-portfolio-one-page' ),
            'section' => 'ella_one_page_portfolio_blog_section',
            'type' => 'text'
        )
    );

    /** Blog View All Text */
    $wp_customize->add_setting(
        'ella_one_page_portfolio_blog_section_view_all',
        array(
            'default' => __( 'View All Blogs', 'ella-portfolio-one-page' ),
            'sanitize_callback' => 'sanitize_text_field',
        )
    );
    
    $wp_customize->add_control(
        'ella_one_page_portfolio_blog_section_view_all',
        array(
            'label' => __( 'Blog View All Text', 'ella-portfolio-one-page' ),
            'section' => 'ella_one_page_portfolio_blog_section',
            'type' => 'text',
        )
    );
    /** Blog Sections Ends */


    /** Contact Section */
    $wp_customize->add_section(
        'ella_one_page_portfolio_contact_section',
        array(
            'title' => __( 'Contact Section', 'ella-portfolio-one-page' ),
            'priority' => 8,
            'panel' => 'elina_frontpage_sections',
        )
    );

	// Contact Section Setting Section // 
	$wp_customize->add_setting(
		'contact_section_head_setting_options'
			,array(
			'capability'     	=> 'edit_theme_options',
			'sanitize_callback' => 'spirallite_sanitize_text',
			'priority' => 2,
		)
	);

	$wp_customize->add_control(
	'contact_section_head_setting_options',
		array(
			'type' => 'hidden',
			'label' => __('Settings','ella-portfolio-one-page'),
			'section' => 'ella_one_page_portfolio_contact_section',
		)
	);
    
    /** Enable/Disable Contact Section */
    $wp_customize->add_setting(
        'ella-portfolio-one-page_ed_contact_section',
        array(
            'default' => true,
            'sanitize_callback' => 'ella_one_page_portfolio_sanitize_checkbox',
        )
    );
    
    $wp_customize->add_control(
        'ella-portfolio-one-page_ed_contact_section',
        array(
            'label' => __( 'Enable Contact Section', 'ella-portfolio-one-page' ),
            'section' => 'ella_one_page_portfolio_contact_section',
            'type' => 'checkbox',
        )
    );

	// Contact Section Header Section // 
		$wp_customize->add_setting(
			'contact_section_head_header_options'
				,array(
				'capability'     	=> 'edit_theme_options',
				'sanitize_callback' => 'spirallite_sanitize_text',
				'priority' => 4,
			)
		);
	
		$wp_customize->add_control(
		'contact_section_head_header_options',
			array(
				'type' => 'hidden',
				'label' => __('Header','ella-portfolio-one-page'),
				'section' => 'ella_one_page_portfolio_contact_section',
			)
		);
    
    /** Contact Section Menu Title */
    $wp_customize->add_setting(
        'ella_one_page_portfolio_contact_section_menu_title',
        array(
			'default'           => __( 'CONTACT US', 'ella-portfolio-one-page' ),
			//'default' => '',
            'sanitize_callback' => 'sanitize_text_field',
        )
    );
    
    $wp_customize->add_control(
        'ella_one_page_portfolio_contact_section_menu_title',
        array(
            'label' => __( 'Contact Section Menu Title', 'ella-portfolio-one-page' ),
            'section' => 'ella_one_page_portfolio_contact_section',
            'type' => 'text',
        )
    );

    /** Contact Section Page Title */

    $wp_customize->add_setting(
        'ella_one_page_portfolio_contact_section_page_title',
        array(
			'default'           => __( 'Contact Us', 'ella-portfolio-one-page' ),
            'sanitize_callback' => 'sanitize_text_field',
        )
    );
    
    $wp_customize->add_control(
        'ella_one_page_portfolio_contact_section_page_title',
        array(
            'label' => __( 'Contact Section Title', 'ella-portfolio-one-page' ),
            'section' => 'ella_one_page_portfolio_contact_section',
            'type' => 'text',
        )
    );

	 /** Subtitle, Pretitle, Font */

	$wp_customize->add_setting(
        'ella_one_page_portfolio_contact_section_subtitle',
        array(
			'default'           => __( "Don't hesitate to get in touch with us", 'ella-portfolio-one-page' ),
            'sanitize_callback' => 'sanitize_text_field',
        )
    );
    
    $wp_customize->add_control(
        'ella_one_page_portfolio_contact_section_subtitle',
        array(
            'label' => __( 'Subtitle', 'ella-portfolio-one-page' ),
            'section' => 'ella_one_page_portfolio_contact_section',
            'type' => 'text',
        )
    );

	$wp_customize->add_setting(
        'ella_one_page_portfolio_contact_section_pretitle',
        array(
			'default'        => __( "Donec porttitor velit eget lectus ac turpis.", 'ella-portfolio-one-page' ),
            'sanitize_callback' => 'sanitize_text_field',
        )
    );
    
    $wp_customize->add_control(
        'ella_one_page_portfolio_contact_section_pretitle',
        array(
            'label' => __( 'Pretitle', 'ella-portfolio-one-page' ),
            'section' => 'ella_one_page_portfolio_contact_section',
            'type' => 'text',
        )
    );

	// Contact Section Contetn Section // 
	$wp_customize->add_setting(
		'contact_section_head_contactinfo_options'
			,array(
			'capability'     	=> 'edit_theme_options',
			'sanitize_callback' => 'spirallite_sanitize_text',
			'priority' => 6,
		)
	);

	$wp_customize->add_control(
	'contact_section_head_contactinfo_options',
		array(
			'type' => 'hidden',
			'label' => __('Contact Information','ella-portfolio-one-page'),
			'section' => 'ella_one_page_portfolio_contact_section',
		)
	);

	
	$wp_customize->add_setting(
        'ella_one_page_portfolio_contact_section_contactinfo_title',
        array(
			'default'        => __( "If you have a project you would like to discuss, <br />get in touch with us.", 'ella-portfolio-one-page' ),
            'sanitize_callback' => 'wp_kses_post',
        )
    );
    
    $wp_customize->add_control(
        'ella_one_page_portfolio_contact_section_contactinfo_title',
        array(
            'label' => __( 'Title', 'ella-portfolio-one-page' ),
            'section' => 'ella_one_page_portfolio_contact_section',
            'type' => 'text',
        )
    );

	$wp_customize->add_setting(
        'ella_one_page_portfolio_contact_form_info_section_subtitle',
        array(
			'default'           => __( "Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a purus. Ella Studio", 'ella-portfolio-one-page' ),
            'sanitize_callback' => 'sanitize_text_field',
        )
    );
    
    $wp_customize->add_control(
        'ella_one_page_portfolio_contact_form_info_section_subtitle',
        array(
            'label' => __( 'Subtitle', 'ella-portfolio-one-page' ),
            'section' => 'ella_one_page_portfolio_contact_section',
            'type' => 'text',
        )
    );
	
	$wp_customize->add_setting(
		'ella_one_page_portfolio_contact_section_contactinfo',
		array(
			'default'           => __( "<p><strong>Ella Studio</strong><br />
	24 Rue de Saint Martin<br />
	New York City, NY 07020<br />
	United States</p>
	<p><span class='phone'>+1 (0) 123 456 78</span><br />
	<a href='mailto:hello@emailaddress.com'>hello@ella.com</a></p>", 'ella-portfolio-one-page' ),
			'sanitize_callback' => 'wp_kses_post', // Use wp_kses_post to allow only safe HTML
		)
	);

	$wp_customize->add_control(
		'ella_one_page_portfolio_contact_section_contactinfo',
		array(
			'label'   => __( 'Contact Information', 'ella-portfolio-one-page' ),
			'section' => 'ella_one_page_portfolio_contact_section',
			'type'    => 'textarea',
		)
	);
    
	// Contact Section Contetn Section // 
	$wp_customize->add_setting(
		'contact_section_head_contetn_options'
			,array(
			'capability'     	=> 'edit_theme_options',
			'sanitize_callback' => 'spirallite_sanitize_text',
			'priority' => 7,
		)
	);

	$wp_customize->add_control(
	'contact_section_head_contetn_options',
		array(
			'type' => 'hidden',
			'label' => __('Content','ella-portfolio-one-page'),
			'section' => 'ella_one_page_portfolio_contact_section',
		)
	);
    
    /** Contact Section Contact Form */
    $wp_customize->add_setting(
        'ella_one_page_contact_section_form',
        array(
            'default' => '',
            'sanitize_callback' => 'wp_kses_post',
        )
    );
    
    $wp_customize->add_control(
        'ella_one_page_contact_section_form',
        array(
            'label' => __( 'Contact Section Contact Form', 'ella-portfolio-one-page' ),
            'description' => __( 'Enter the Contact Form 7 Shortcode. You will find shortcode in the Contact Forms Section Ex. Default. [contact-form-7 id="c84748e" title="Contact form 1"]', 'ella-portfolio-one-page' ),
            'section' => 'ella_one_page_portfolio_contact_section',
            'type' => 'text',
        )
    );   

    /** Contact Section Ends*/
    
}
add_action( 'customize_register', 'ella_one_page_portfolio_my_register_additional_customizer_settings' );

/**
 * Admin Notice for Ella One Portfolio One Page (Child Theme)
 */


function ella_portfolio_one_page_child_theme_remove_parent_admin_notice() {
    remove_action('admin_notices', 'ellapress_admin_notice');
}

add_action('init', 'ella_portfolio_one_page_child_theme_remove_parent_admin_notice'); // Remove the parent theme's notice

