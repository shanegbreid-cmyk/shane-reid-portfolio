<?php
if( ! function_exists( 'spirallite_register_custom_controls' ) ) :
/**
 * Register Custom Controls
*/
function spirallite_register_custom_controls( $wp_customize ){
    
    // Load our custom control.
    require_once get_stylesheet_directory() . '/inc/custom-controls/note/class-note-control.php';
    require_once get_stylesheet_directory() . '/inc/custom-controls/radioimg/class-radio-image-control.php';

    // Register the control type.
    $wp_customize->register_control_type( 'Spirallite_Radio_Image_Control' );
}
endif;
add_action( 'customize_register', 'spirallite_register_custom_controls' );