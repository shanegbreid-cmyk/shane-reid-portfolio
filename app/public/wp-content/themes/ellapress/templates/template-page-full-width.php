<?php 
/**
Template Name:Page Full Width
*/

get_header();
?>
<div id="primary" class="site-body">
<div class="page-title">
	<div class="pe-container">
    <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
	</div>
</div>

<div class="container">

<section id="post-section" class="entry-content pe-portfolio-scroller-item">
                    <?php the_post(); ?>
                    <article class="post-items">
                        <div class="post-content">
                            <?php
                                the_content();
                            ?>
                        </div>
                    </article>					
                    <?php
						if( $post->comment_status == 'open' ) { 
							 comments_template( '', true ); // show comments 
						}
					?>
    </section>

    </div><!-- pe-container -->
    </div><!-- END site body -->

	
<?php get_footer(); ?>