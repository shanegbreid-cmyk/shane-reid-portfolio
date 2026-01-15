<?php

class EllaPress_Customizer_Notify {

	private $recommended_actions;

	
	private $recommended_plugins;

	
	private static $instance;

	
	private $recommended_actions_title;

	
	private $recommended_plugins_title;

	
	private $dismiss_button;

	
	private $install_button_label;

	
	private $activate_button_label;

	
	private $ellapress_deactivate_button_label;
	

	private $config;

	public static function init( $config ) {
		if ( ! isset( self::$instance ) && ! ( self::$instance instanceof EllaPress_Customizer_Notify ) ) {
			self::$instance = new EllaPress_Customizer_Notify;
			if ( ! empty( $config ) && is_array( $config ) ) {
				self::$instance->config = $config;
				self::$instance->setup_config();
				self::$instance->setup_actions();
			}
		}

	}
	
	public function setup_config() {

		global $ellapress_customizer_notify_recommended_plugins;
		global $ellapress_customizer_notify_recommended_actions;

		global $install_button_label;
		global $activate_button_label;
		global $ellapress_deactivate_button_label;

		$this->recommended_actions = isset( $this->config['recommended_actions'] ) ? $this->config['recommended_actions'] : array();
		$this->recommended_plugins = isset( $this->config['recommended_plugins'] ) ? $this->config['recommended_plugins'] : array();

		$this->recommended_actions_title = isset( $this->config['recommended_actions_title'] ) ? $this->config['recommended_actions_title'] : '';
		$this->recommended_plugins_title = isset( $this->config['recommended_plugins_title'] ) ? $this->config['recommended_plugins_title'] : '';
		$this->dismiss_button            = isset( $this->config['dismiss_button'] ) ? $this->config['dismiss_button'] : '';

		$ellapress_customizer_notify_recommended_plugins = array();
		$ellapress_customizer_notify_recommended_actions = array();

		if ( isset( $this->recommended_plugins ) ) {
			$ellapress_customizer_notify_recommended_plugins = $this->recommended_plugins;
		}

		if ( isset( $this->recommended_actions ) ) {
			$ellapress_customizer_notify_recommended_actions = $this->recommended_actions;
		}

		$install_button_label    = isset( $this->config['install_button_label'] ) ? $this->config['install_button_label'] : '';
		$activate_button_label   = isset( $this->config['activate_button_label'] ) ? $this->config['activate_button_label'] : '';
		$ellapress_deactivate_button_label = isset( $this->config['ellapress_deactivate_button_label'] ) ? $this->config['ellapress_deactivate_button_label'] : '';

	}

	
	public function setup_actions() {

		// Register the section
		add_action( 'customize_register', array( $this, 'ellapress_plugin_notification_customize_register' ) );

		// Enqueue scripts and styles
		add_action( 'customize_controls_enqueue_scripts', array( $this, 'ellapress_customizer_notify_scripts_for_customizer' ), 0 );

		/* ajax callback for dismissable recommended actions */
		add_action( 'wp_ajax_quality_customizer_notify_dismiss_action', array( $this, 'ellapress_customizer_notify_dismiss_recommended_action_callback' ) );

		add_action( 'wp_ajax_ti_customizer_notify_dismiss_recommended_plugins', array( $this, 'ellapress_customizer_notify_dismiss_recommended_plugins_callback' ) );

	}

	
	public function ellapress_customizer_notify_scripts_for_customizer() {

		//wp_enqueue_style( 'ellapress-customizer-notify-css', ELLAPRESS_PARENT_INC_URI . '/customizer/customizer-notify/css/ellapress-customizer-notify.css', array());
		//wp_enqueue_style('ellapress-customizer-notify-css', get_stylesheet_uri());
		wp_enqueue_style('ellapress-customizer-notify-css', get_template_directory_uri() . '/inc/customizer-notify/css/ellapress-customizer-notify.css');


		wp_enqueue_style( 'ellapress-plugin-install' );
		wp_enqueue_script( 'ellapress-plugin-install' );
		wp_add_inline_script( 'ellapress-plugin-install', 'var pagenow = "customizer";' );

		wp_enqueue_script( 'ellapress-updates' );
		//wp_enqueue_script( 'ellapress-customizer-notify-js', ELLAPRESS_PARENT_INC_URI . '/inc/customizer-notify/js/ellapress-notify.js', array( 'customize-controls' ));
		wp_enqueue_script('ellapress-customizer-notify-js', get_template_directory_uri() . '/inc/customizer-notify/js/ellapress-notify.js', array('jquery'), null, true);

		wp_localize_script(
			'ellapress-customizer-notify-js', 'EllaPressCustomizercompanionObject', array(
				'ellapress_ajaxurl'            => esc_url(admin_url( 'admin-ajax.php' )),
				'ellapress_template_directory' => esc_url(get_template_directory_uri()),
				'ellapress_base_path'          => esc_url(admin_url()),
				'ellapress_activating_string'  => __( 'Activating', 'ellapress' ),
			)
		);

	}

	
	public function ellapress_plugin_notification_customize_register( $wp_customize ) {

		
		//require ELLAPRESS_PARENT_INC_DIR . '/inc/customizer-notify/ellapress-notify-section.php';
		require get_template_directory() . '/inc/customizer-notify/ellapress-notify-section.php';

		$wp_customize->register_section_type( 'EllaPress_Customizer_Notify_Section' );

		$wp_customize->add_section(
			new EllaPress_Customizer_Notify_Section(
				$wp_customize,
				'EllaPress-customizer-notify-section',
				array(
					'title'          => $this->recommended_actions_title,
					'plugin_text'    => $this->recommended_plugins_title,
					'dismiss_button' => $this->dismiss_button,
					'priority'       => 0,
				)
			)
		);

	}

	
	public function ellapress_customizer_notify_dismiss_recommended_action_callback() {

		global $ellapress_customizer_notify_recommended_actions;

		$action_id = ( isset( $_GET['id'] ) ) ? $_GET['id'] : 0;

		echo esc_html($action_id); 

		if ( ! empty( $action_id ) ) {

			
			if ( get_theme_mod( 'ellapress_customizer_notify_show' ) ) {

				$ellapress_customizer_notify_show_recommended_actions = get_theme_mod( 'ellapress_customizer_notify_show' );
				switch ( $_GET['todo'] ) {
					case 'add':
						$ellapress_customizer_notify_show_recommended_actions[ $action_id ] = true;
						break;
					case 'dismiss':
						$ellapress_customizer_notify_show_recommended_actions[ $action_id ] = false;
						break;
				}
				echo esc_html($ellapress_customizer_notify_show_recommended_actions);
				
			} else {
				$ellapress_customizer_notify_show_recommended_actions = array();
				if ( ! empty( $ellapress_customizer_notify_recommended_actions ) ) {
					foreach ( $ellapress_customizer_notify_recommended_actions as $ellapress_lite_customizer_notify_recommended_action ) {
						if ( $ellapress_lite_customizer_notify_recommended_action['id'] == $action_id ) {
							$ellapress_customizer_notify_show_recommended_actions[ $ellapress_lite_customizer_notify_recommended_action['id'] ] = false;
						} else {
							$ellapress_customizer_notify_show_recommended_actions[ $ellapress_lite_customizer_notify_recommended_action['id'] ] = true;
						}
					}
					echo esc_html($ellapress_customizer_notify_show_recommended_actions);
				}
			}
		}
		die(); 
	}

	
	public function ellapress_customizer_notify_dismiss_recommended_plugins_callback() {

		$action_id = ( isset( $_GET['id'] ) ) ? $_GET['id'] : 0;

		echo esc_html($action_id); 

		if ( ! empty( $action_id ) ) {

			$ellapress_lite_customizer_notify_show_recommended_plugins = get_theme_mod( 'ellapress_customizer_notify_show_recommended_plugins' );

			switch ( $_GET['todo'] ) {
				case 'add':
					$ellapress_lite_customizer_notify_show_recommended_plugins[ $action_id ] = false;
					break;
				case 'dismiss':
					$ellapress_lite_customizer_notify_show_recommended_plugins[ $action_id ] = true;
					break;
			}
			echo esc_html($ellapress_customizer_notify_show_recommended_actions);
		}
		die(); 
	}

}
