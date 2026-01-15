<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package ellapress
 */

get_header();
?>

<div id="primary" class="site-body">
	<!--TITLE-->
<div class="page-title">
	<div class="pe-container">
		<h1><?php echo esc_html( get_theme_mod( 'ellapress_blog_heading_title', esc_html__('News & Blog', 'ellapress') ) ); ?></h1>
	</div>
</div> <!--end Title -->

				  <div class="container">
						<div class="row">
			<section class="col-lg-8">

		<?php
		if ( have_posts() ) :

			if ( is_home() && ! is_front_page() ) :
				?>
				<header>
					<h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
				</header>
				<?php
			endif;

			/* Start the Loop */
			while ( have_posts() ) :
				the_post();

				/*
				 * Include the Post-Type-specific template for the content.
				 * If you want to override this in a child theme, then include a file
				 * called content-___.php (where ___ is the Post Type name) and that will be used instead.
				 */
				get_template_part( 'template-parts/content', get_post_type() );

			endwhile;

			the_posts_navigation();

		else :

			get_template_part( 'template-parts/content', 'none' );

		endif;
		?>

</section> <!-- #end section -->

<div class="col-lg-4 sidebar"><?php get_sidebar(); ?></div>

        </div> <!-- #end row -->
    </div> <!-- #end container -->
	</div><!-- side-body -->
	<?php get_footer();

