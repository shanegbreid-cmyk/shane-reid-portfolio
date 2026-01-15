<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package ellapress
 */

?>
<!--new post-->
<div class="row pe-portfolio-scroller-item pe-load-more-item">
	<div class="col-lg-12">
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
<!--<header class="entry-header">-->
		<?php
		if ( is_singular() ) :
			the_title( '<div class="row"><div class="span12 post-title"><h2 class="entry-title">', '</h2></div></div>' );
		else :
			the_title( '<div class="row"><div class="span12 post-title"><h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2></div></div>' );
		endif;

		if ( 'post' === get_post_type() ) :
			?>
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

	<div class="row">
				<div class="span12">
	<div class="entry-content">
		<?php
		if ( is_singular() ) :
		the_content(
			sprintf(
				wp_kses(
					/* translators: %s: Name of current post. Only visible to screen readers */
					__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'ellapress' ),
					array(
						'span' => array(
							'class' => array(),
						),
					)
				),
				wp_kses_post( get_the_title() )
			)
		);
		else :
			the_excerpt();
			echo '<a href="' . esc_url( get_permalink() ) . '" class="read-more">' . esc_html__( '(MORE…)', 'ellapress' ) . '</a>';
		endif;

		wp_link_pages(
			array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'ellapress' ),
				'after'  => '</div>',
			)
		);
		?>
<!-- Post Tags -->
<?php
if ( 'post' === get_post_type() ) {
	$tags_list = get_the_tag_list( '', '', '' );

	if ( $tags_list ) {
		echo '<div class="tags">' . $tags_list . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}
?>
<!-- .end post tags -->
 
								
	</div><!-- .entry-content -->
	</div><!-- .span -->
	</div><!-- .row -->

	<footer class="entry-footer">
		<?php ellapress_entry_footer(); ?>
	</footer><!-- .entry-footer -->

	<?php if( is_single() ) {?>
	<!-- .author-content -->
	<div class="author-post clearfix">
        <?php $avatar = get_avatar( get_the_author_meta( 'ID' ), $size = 75 ); ?>
        <?php if( $avatar ) : ?>
          <div class="author-image"> 
            <a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>"><?php echo $avatar; ?></a>
          </div>
        <?php endif; ?>
        <div class="author-details">
        <h6><a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>"><?php echo esc_html( get_the_author() ); ?></a></h6>
        <p><?php echo esc_html( get_the_author_meta('description') ); ?></p>
        </div> 
      </div> <!-- .author-content -->
	  <?php }?>

</article><!-- #post-<?php the_ID(); ?> -->
</div> <!-- end col !-->
</div> <!-- end post !-->

