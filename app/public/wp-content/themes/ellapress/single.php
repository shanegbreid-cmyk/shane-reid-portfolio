<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
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

			get_template_part( 'template-parts/content', get_post_type() );

			the_post_navigation(
				array(
					'prev_text' => '<span class="nav-subtitle">' . esc_html__( 'Previous:', 'ellapress' ) . '</span> <span class="nav-title">%title</span>',
					'next_text' => '<span class="nav-subtitle">' . esc_html__( 'Next:', 'ellapress' ) . '</span> <span class="nav-title">%title</span>',
				)
			);

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
