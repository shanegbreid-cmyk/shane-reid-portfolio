<?php
/**
 * Singleton class for handling the theme's customizer integration.
 *
 * @since  eCommerce Plus1.0.0
 * @access public
 */
final class ellapress_Customize {

	/**
	 * Returns the instance.
	 *
	 * @since1.0.0
	 * @access public
	 * @return object
	 */
	public static function get_instance() {

		static $instance = null;

		if ( is_null( $instance ) ) {
			$instance = new self;
			$instance->setup_actions();
		}

		return $instance;
	}

	/**
	 * Constructor method.
	 *
	 * @since1.0.0
	 * @access private
	 * @return void
	 */
	private function __construct() {}

	/**
	 * Sets up initial actions.
	 *
	 * @since1.0.0
	 * @access private
	 * @return void
	 */
	private function setup_actions() {

		// Register panels, sections, settings, controls, and partials.
		add_action( 'customize_register', array( $this, 'sections' ) );

		// Register scripts and styles for the controls.
		add_action( 'customize_controls_enqueue_scripts', array( $this, 'enqueue_control_scripts' ), 0 );
	}

	/**
	 * Sets up the customizer sections.
	 *
	 * @since1.0.0
	 * @access public
	 * @param  object  $manager
	 * @return void
	 */
	public function sections( $manager ) {

		// Load custom sections.
		require trailingslashit( get_template_directory()) . 'inc/go-pro/section-pro.php' ;

		// Register custom section types.
		$manager->register_section_type( 'ellapress_Customize_Section_Pro' );

		// Register sections.
		$manager->add_section(
			new ellapress_Customize_Section_Pro(
				$manager,
				'ellapress',
				array(
					'title'    => esc_html__( 'PRO Available','ellapress' ),
					'pro_text' => esc_html__( 'Upgrade To Pro','ellapress' ),
					'pro_url'  => esc_url( 'https://pixelonetry.com/downloads/ella-premium-one-page-wordpress-theme/' )
				)
			)
		);
	}

	/**
	 * Loads theme customizer CSS.
	 *
	 * @since1.0.0
	 * @access public
	 * @return void
	 */
	public function enqueue_control_scripts() {

		wp_enqueue_script( 'ellapress-customize-controls', trailingslashit( get_template_directory_uri() ) . 'inc/go-pro/customize-controls.js', array( 'customize-controls' ) );

		wp_enqueue_style( 'ellapress-customize-controls', trailingslashit( get_template_directory_uri() ) . 'inc/go-pro/customize-controls.css' );
	}
}

// Doing this customizer thang!
ellapress_Customize::get_instance();
