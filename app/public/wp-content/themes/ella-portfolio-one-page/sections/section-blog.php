<?php
/**
 * Template part for displaying Blog Section
 *
 * @package ella_one_page_portfolio
 */

// Enable or disable the blog section
$enable_blog_section = get_theme_mod( 'ella-portfolio-one-page_ed_blog_section', true );

// Blog section settings from Customizer
$blog_section_title = get_theme_mod( 'ella_one_page_portfolio_blog_section_title', __( "Latest News", 'ella-portfolio-one-page' ) );
$blog_section_subtitle = get_theme_mod( 'ella_one_page_portfolio_blog_section_subtitle', __( "Our Latest News Is very Elagent", 'ella-portfolio-one-page' ) );
$blog_section_view_all = get_theme_mod( 'ella_one_page_portfolio_blog_section_view_all', __( 'View All Blogs', 'ella-portfolio-one-page' ) );
$blog_section_content  = get_theme_mod( 'ella_one_page_portfolio_blog_section_content' );
$blog_page             = get_option( 'page_for_posts' );

// Only proceed if section is enabled
if ( $enable_blog_section ) :
?>
<section id="blog-section" class="section blog-section">
    <div class="container">
        <?php if ( $blog_section_title ) : ?>
            <div class="col-lg-12">
                <div class="text-center">

                   <div class="sec-head custom-font text-center">
        <?php if ($blog_section_subtitle): ?>
            <h6 class="title-h6 wow fadeIn" data-wow-delay=".5s"><?php echo esc_html( $blog_section_subtitle ); ?></h6>
        <?php endif; ?>
        <?php if ($blog_section_title): ?>
            <h2 class="wow title-class"><?php echo esc_html( $blog_section_title ); ?></h2>
            <span class="tbg" style="font-size: 8vw"><?php echo esc_html( $blog_section_title ); ?></span>
        <?php endif; ?>
    </div>

                </div>
            </div>
        <?php endif; ?>

        <?php
        // Show latest 3 blog posts
        $blog_qry = new WP_Query( array(
            'posts_per_page'      => 3,
            'ignore_sticky_posts' => true,
        ) );

        if ( $blog_qry->have_posts() ) : ?>
            <div class="front-blog mt-5">
                <div class="row">
                    <?php while ( $blog_qry->have_posts() ) : $blog_qry->the_post(); ?>
                        <div class="col-lg-4 col-md-6 mb-4">
                            <div class="post">
                                <div class="post-hover-effect">
                                    <a href="<?php the_permalink(); ?>" class="post-thumbnail">
                                        <?php
                                        if ( has_post_thumbnail() ) {
                                            the_post_thumbnail( 'ella-portfolio-one-page-blog', array( 'itemprop' => 'image' ) );
                                        }
                                        ?>
                                    </a>
                                </div>
                                <header class="entry-header">
                                    <h2 class="entry-title">
                                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                    </h2>
                                </header>
                                <div class="entry-content">
                                    <?php the_excerpt(); ?>
                                </div>
                                <div class="entry-meta">
                                    <span class="posted-on">
                                        <a href="<?php the_permalink(); ?>">
                                            <time datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>">
                                                <?php echo esc_html( get_the_date() ); ?>
                                            </time>
                                        </a>
                                    </span>
                                    <?php esc_html_e( '/', 'ella-portfolio-one-page' ); ?>
                                    <span class="comments-link">
                                        <a href="<?php the_permalink(); ?>">
                                            <?php
                                            printf(
                                                esc_html( _nx( '%1$s Comment', '%1$s Comments', get_comments_number(), 'comments title', 'ella-portfolio-one-page' ) ),
                                                number_format_i18n( get_comments_number() )
                                            );
                                            ?>
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    <?php endwhile; wp_reset_postdata(); ?>
                </div>

                <?php if ( $blog_page ) : ?>
                    <div class="text-center mt-4">
                        <a href="<?php echo esc_url( get_permalink( $blog_page ) ); ?>" class="btn btn-contour btn-big">
                            <?php echo esc_html( $blog_section_view_all ); ?>
                        </a>
                    </div>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>
</section>
<?php endif; ?>
