<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package ellapress
 */

get_header();
?>

<div id="primary" class="site-body">
				  <div class="container">
						<div class="row">
			<section class="col-lg-8">

		<?php if ( have_posts() ) : ?>

			<header class="page-header">
			<div class="page-title">
				<h1>
					<?php
					/* translators: %s: search query. */
					printf( esc_html__( 'Search Results for: %s', 'ellapress' ), '<span>' . get_search_query() . '</span>' );
					?>
				</h1>
		</div>
			</header><!-- .page-header -->

			<?php
			/* Start the Loop */
			while ( have_posts() ) :
				the_post();

				/**
				 * Run the loop for the search to output the results.
				 * If you want to overload this in a child theme then include a file
				 * called content-search.php and that will be used instead.
				 */
				get_template_part( 'template-parts/content', 'search' );

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

