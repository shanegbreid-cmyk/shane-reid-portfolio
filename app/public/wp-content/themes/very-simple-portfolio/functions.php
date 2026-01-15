<?php

/**
 * Very Simple Portfolio - Minimalio Child Theme
 *
 * @package verysimpleportfolio
 */

//Add Minimalio default styles
add_action('wp_enqueue_scripts', 'very_simple_portfolio_theme_enqueue_styles', 97);
function very_simple_portfolio_theme_enqueue_styles()
{
    $parenthandle = 'parent-style';
    $theme = wp_get_theme();
    wp_enqueue_style(
        $parenthandle,
        get_template_directory_uri() . '/style.css',
        array(),  // if the parent theme code has a dependency, copy it to here
        $theme->parent()->get('Version')
    );
}

//Add Very Simple Portfolio styles
add_action('wp_enqueue_scripts', 'very_simple_portfolio_child_add_stylesheet', 99);
function very_simple_portfolio_child_add_stylesheet()
{
    wp_enqueue_style('very-simple-portfolio-child-style', get_stylesheet_directory_uri() . '/style.css', false, '1.0', 'all');
}


//Add Very Simple Portfolio custom styles
add_action('wp_enqueue_scripts', 'very_simple_portfolio_child_add_custom_stylesheet', 98);
function very_simple_portfolio_child_add_custom_stylesheet()
{
    wp_enqueue_style('very-simple-portfolio-child-custom-style', get_stylesheet_directory_uri() . '/assets/very-simple-portfolio-styles.css', false, '1.0', 'all');
}

//Make Very Simple Portfolio available for translation.
load_theme_textdomain('very-simple-portfolio', get_stylesheet_directory_uri() . '/languages');

// Set up the WordPress Theme logo feature.
add_theme_support( 'custom-logo' );


// Include files for the Very Simple Portfolio Customizer options
$very_simple_portfolio_includes = [
    '/very-simple-portfolio-customizer/very-simple-portfolio-customizer.php',
    '/very-simple-portfolio-customizer/very-simple-portfolio-theme-customizer.php',
    '/preview-content/preview-content.php',
    '/preview-content/admin-redirect.php',
    '/preview-content/welcome-notice.php'
];

foreach ($very_simple_portfolio_includes as $file) {
    $filepath = locate_template($file);
    if (! $filepath) {
        trigger_error(sprintf('Error locating /inc%s for inclusion', $file), E_USER_ERROR);
    }
    require_once $filepath;
}