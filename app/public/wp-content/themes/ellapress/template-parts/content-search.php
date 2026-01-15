<?php
/**
 * Template part for displaying results in search pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package ellapress
 */

?>

<div class="row pe-portfolio-scroller-item pe-load-more-item">
	<div class="col-lg-12">
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<!--<header class="entry-header">-->

		<?php the_title( sprintf( '<div class="row"><div class="span12 post-title"><h2 class="entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h2></div></div>' ); ?>

		<?php if ( 'post' === get_post_type() ) : ?>
			<div class="row">
			<div class="col-lg-12">
			   <div class="comments">
						<a href="#" title="comments">0</a>
						<i class="icon-comment"></i>
				</div>
		<div class="post-meta entry-meta">
			<?php
			ellapress_posted_by();
			ellapress_posted_on();
			?>
			<?php if ( 'post' === get_post_type() ) : ?>
	<span class="categories">
		<?php
		$categories_list = get_the_category_list( ', ' );
		if ( $categories_list ) {
			echo 'in ' . $categories_list; // already returns anchor tags
		}
		?>
		</span>
			<?php endif; ?>
		</div><!-- .entry-meta -->
		</div><!-- .column -->
		</div><!-- .row -->
		<?php endif; ?>
		<!--</header> .entry-header -->


	<?php ellapress_post_thumbnail(); ?>

	<div class="entry-summary">
		<?php the_excerpt(); ?>
	</div><!-- .entry-summary -->

	<footer class="entry-footer">
		<?php ellapress_entry_footer(); ?>
	</footer><!-- .entry-footer -->

</article><!-- #post-<?php the_ID(); ?> -->
</div> <!-- end col !-->
</div> <!-- end post !-->