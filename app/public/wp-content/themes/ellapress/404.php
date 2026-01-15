<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package ellapress
 */

get_header();
?>

<div id="primary" class="site-body">
   <div class="container">
		<div class="row">
			<sectdiion class="col-lg-12">

		<div class="error-404 not-found">
			<header class="page-header">
			<div class="page-title">
				<h1><?php esc_html_e( 'Oops! That page can&rsquo;t be found.', 'ellapress' ); ?></h1>
            </div>
			</header><!-- .page-header -->

			<div class="page-content">
				<p><?php esc_html_e( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', 'ellapress' ); ?></p>

					<?php
					get_search_form();

					?>
		

			</div><!-- .page-content -->
		</div><!-- .error-404 -->

	     	</sectdiion> 
		</div> <!-- #end row -->
		</div> <!-- #end container -->
	</div><!-- #main -->

<?php
get_footer();
