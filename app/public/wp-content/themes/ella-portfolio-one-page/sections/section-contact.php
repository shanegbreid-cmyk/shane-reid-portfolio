<?php
/**
 * Template part for displaying Contact Section
 *
 * @package Ella_One_Page_Portfolio
 */

include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
$contact_title = get_theme_mod( 'ella_one_page_portfolio_contact_section_page_title', __( "Contact Us", 'ella-portfolio-one-page' ) );
$contact_subtitle = get_theme_mod( 'ella_one_page_portfolio_contact_section_subtitle', __( "Don't hesitate to get in touch with us", 'ella-portfolio-one-page' ) );
$contact_pretitle = get_theme_mod( 'ella_one_page_portfolio_contact_section_pretitle', __( "Pellentesque sapien purus, sagittis eu accumsan convallis, vehicula ut lectus. Fusce accumsan <strong>purus pretium ligula</strong> vehicula, ut interdum nisl vulputate. Vivamus ultrices luctus quam eu feugiat", 'ella-portfolio-one-page' ) );

$contact_information_title = get_theme_mod( 'ella_one_page_portfolio_contact_section_contactinfo_title', '' );
$contact_info_subtitle = get_theme_mod( 'ella_one_page_portfolio_contact_form_info_section_subtitle', '' );

$contact_section_form  = get_theme_mod( 'ella_one_page_contact_section_form' );

?>

  <?php if ( $contact_title ) : ?>
            <div class="col-lg-12">
                <div class="text-center">

                   <div class="sec-head custom-font text-center">
        <?php if ($contact_subtitle): ?>
            <h6 class="title-h6 wow fadeIn" data-wow-delay=".5s"><?php echo esc_html( $contact_subtitle ); ?></h6>
        <?php endif; ?>
        <?php if ($contact_title): ?>
            <h2 class="wow title-class"><?php echo esc_html( $contact_title ); ?></h2>
            <span class="tbg" style="font-size: 8vw"><?php echo esc_html( $contact_title ); ?></span>
        <?php endif; ?>
    </div>

      </div>
            </div> <!-- End Title -->
        <?php endif; ?>

        <div class="row">

<?php if ( $contact_section_form && $contact_information_title ) : ?>
        <div class="col-lg-6">
         <?php endif; ?>
         <?php if ($contact_information_title): ?>
        <div class="pe-block pe-view-layout-block pe-view-layout-block-11">
            <div class="pe-container">
  <h4 class="contactinfotitle"><?php echo wp_kses_post( $contact_information_title ); ?></h4>
<p><?php echo esc_html( $contact_info_subtitle ); ?></p>
<?php 
$contact_info = get_theme_mod( 'ella_one_page_portfolio_contact_section_contactinfo' ); 
if ( ! empty( $contact_info ) ) {
    echo wp_kses_post( $contact_info ); // Safely output the HTML content
}
?>
              </div>
            </div>
              <?php endif; ?>
        <?php if ( $contact_section_form && $contact_information_title ) : ?>         </div>
   <?php endif; ?>

 <?php if( is_plugin_active( 'contact-form-7/wp-contact-form-7.php' ) ){ ?>
   <?php if ( $contact_section_form && $contact_information_title ) : ?>

        <div class="col-lg-6">
             <?php endif; ?>
        <?php 
            echo do_shortcode( wp_kses_post( $contact_section_form ) );?>    
              <?php if ( $contact_section_form && $contact_information_title ) : ?>

         </div>
             <?php endif; ?>
<?php } ?>

 </div> <!-- End Row -->