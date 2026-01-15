<?php
 // Template Name: Fullwidth Page
?>
<?php get_header(); ?>
<?php $header_image_url = get_header_image(); // Retrieve the default header image

// If the header image is not set, use a fallback
if (!$header_image_url) {
	$header_image_url = get_template_directory_uri() . '/images/bg.jpg';
	// Default image URL
} ?>
<div class="parallax-blog" data-overlay-dark="4" style="background-image: url(<?php echo esc_url($header_image_url); ?>);"> </div>

<section id="primary" class="blog section">
	<div class="container">        
            <div class="row">
			<h1><?php the_title(); ?></h1>
			<?php the_content(); ?>
	</div>
</div>
</section>
<?php get_footer();