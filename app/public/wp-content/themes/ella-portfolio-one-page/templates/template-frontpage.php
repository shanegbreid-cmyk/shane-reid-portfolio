<?php
/**
 * Template Name: Home Page
 */

get_header();

// Get theme mods
$enable_about_section      = get_theme_mod('hs_about', '1');
$enable_calltoaction       = get_theme_mod('hs_cta', true);
$enable_services_section   = get_theme_mod('hs_service', true);
$enable_testimonial_section       = get_theme_mod('hs_testimonial', true);
$enable_team_section = get_theme_mod('team_hs_service', true);
$enable_blog_section       = get_theme_mod('ella-portfolio-one-page_ed_blog_section', true);
$enable_contact_section    = get_theme_mod('ella-portfolio-one-page_ed_contact_section', true);
$enable_portfolio_section    = get_theme_mod('ella_one_page_portfolio_ed_portfolio_section', true);

?>

<?php
    echo "<!-- SLIDER Section -->";
    do_action('elina_section_slider');
?>

<?php
// Call to Action Section
if ( $enable_calltoaction && function_exists('pixelonetry_companion_elina_cta') ) {
    pixelonetry_companion_elina_cta();
}
?>

<?php
if ( $enable_about_section && function_exists('pixelonetry_ella_about') ) {
    echo "<!-- About Section -->";
    pixelonetry_ella_about();
} else {
    echo "<!-- About Section Disabled -->";
}
?>

<?php
// Blog Section
if ( $enable_portfolio_section ) :
?>

    <?php get_template_part('sections/section', 'portfolio'); ?>

<?php endif; ?>


<?php
// Services Section
if ( $enable_services_section && function_exists('pixelonetry_ella_service') ) {
    pixelonetry_ella_service();
}
?>

<?php
// Services Section
if ( $enable_testimonial_section && function_exists('pixelonetry_ella_testimonial') ) {
    pixelonetry_ella_testimonial();
}
?>

<?php
if ( $enable_testimonial_section ) {
    echo "<!-- Testimonial Section -->";
    do_action('elina_section_testimonial');
} 
?>

<?php
// Team Section
if ( $enable_team_section && function_exists('pixelonetry_ella_team') ) {
    pixelonetry_ella_team();
}
?>

<?php
// Blog Section
if ( $enable_blog_section ) :
?>
     <?php get_template_part('sections/section', 'blog'); ?>
<?php endif; ?>

<?php
// Contact Section
if ( $enable_contact_section ) :
?>
<section id="contact" class="pe-main-section pe-view-layout-block pe-view-layout-block-9 pe-style-light section">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <?php get_template_part('sections/section', 'contact'); ?>
            </div>
        </div>
    </div>
</section>
<?php endif; ?>

<?php get_footer(); ?>
