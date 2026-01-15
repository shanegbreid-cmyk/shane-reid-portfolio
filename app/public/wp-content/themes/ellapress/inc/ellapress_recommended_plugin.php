<?php
add_action( 'after_setup_theme', 'ellapress_init_customizer_notify', 1 );
function ellapress_init_customizer_notify() {
	load_theme_textdomain( 'ellapress', get_template_directory() . '/languages' );

	require get_template_directory() . '/inc/customizer-notify/ellapress-notify.php';

	$ellapress_config_customizer = array(
		'recommended_plugins'       => array(
			'pixelonetry-companion' => array(
				'recommended' => true,
				'description' => sprintf(__('Install and activate <strong>Pixelonetry Companion</strong> plugin for taking full advantage of all the features this theme has to offer EllaPress.', 'ellapress')),
			),
		),
		'recommended_actions'       => array(),
		'recommended_actions_title' => esc_html__( 'Recommended Actions', 'ellapress' ),
		'recommended_plugins_title' => esc_html__( 'Recommended Plugin', 'ellapress' ),
		'install_button_label'      => esc_html__( 'Install and Activate', 'ellapress' ),
		'activate_button_label'     => esc_html__( 'Activate', 'ellapress' ),
		'ellapress_deactivate_button_label'   => esc_html__( 'Deactivate', 'ellapress' ),
	);

	EllaPress_Customizer_Notify::init( apply_filters( 'ellapress_customizer_notify_array', $ellapress_config_customizer ) );
}
