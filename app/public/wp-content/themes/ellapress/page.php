<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package ellapress
 */

get_header();
?>

<div id="primary" class="site-body">
				  <div class="container">
						<div class="row">
			<section class="col-lg-8">
		<?php
		while ( have_posts() ) :
			the_post();

			get_template_part( 'template-parts/content', 'page' );

			// If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) :
				comments_template();
			endif;

		endwhile; // End of the loop.
		?>

		</section> <!-- #end section -->

<div class="col-lg-4 sidebar"><?php get_sidebar(); ?></div>

        </div> <!-- #end row -->
    </div> <!-- #end container -->
	</div><!-- side-body -->
	<?php get_footer();
