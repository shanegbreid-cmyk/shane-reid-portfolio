<?php
$title    = get_theme_mod('ella_one_page_portfolio_portfolio_title', 'PORTFOLIO');
$subtitle = get_theme_mod('ella_one_page_portfolio_portfolio_subtitle', 'Best Features');

$fallback_posts = get_posts(array(
    'numberposts' => 10,
    'post_status' => 'publish',
));

$selected_posts = [];
for ($i = 1; $i <= 10; $i++) {
    $post_id = get_theme_mod("ella_one_page_portfolio_portfolio_section_post_$i");
    if (!$post_id && isset($fallback_posts[$i - 1])) {
        $post_id = $fallback_posts[$i - 1]->ID;
    }
    if ($post_id) {
        $selected_posts[] = $post_id;
    }
}

// Categories
$all_cats = [];
foreach ($selected_posts as $post_id) {
    $post_cats = wp_get_post_categories($post_id);
    $all_cats = array_merge($all_cats, $post_cats);
}
$all_cats = array_unique($all_cats);
?>

<section class="pe-main-section pe-style-light" id="section-portfolio" style="padding:60px 0">
    <div class="sec-head custom-font text-center">
        <?php if ($subtitle): ?>
            <h6 class="title-h6 wow fadeIn" data-wow-delay=".5s"><?php echo esc_html($subtitle); ?></h6>
        <?php endif; ?>
        <?php if ($title): ?>
            <h2 class="wow title-class"><?php echo esc_html($title); ?></h2>
            <span class="tbg" style="font-size:10vw"><?php echo esc_html($title); ?></span>
        <?php endif; ?>
    </div>

    <div class="peEllaFilter portfolio">
        <!-- Filter Buttons -->
        <div class="pe-container filter text-center mb-4">
            <nav class="project-filter pe-menu-main">
                <ul class="pe-menu d-inline-block peIsotopeFilter">
                    <li><a class="active" data-group="all" href="#">All</a></li>
                    <?php foreach ($all_cats as $cat_id):
                        $cat = get_category($cat_id);
                        if ($cat): ?>
                            <li><a data-group="<?php echo esc_attr($cat->slug); ?>" href="#"><?php echo esc_html($cat->name); ?></a></li>
                    <?php endif; endforeach; ?>
                </ul>
            </nav>
        </div>

        <!-- Portfolio Grid -->
        <div id="portfolio-grid" class="portfolio-grid peIsotopeGrid">
            <?php foreach ($selected_posts as $post_id):
                $post = get_post($post_id); 
                if (!$post) continue; 
                setup_postdata($post);

                $post_title = get_the_title($post);
                $post_link  = get_permalink($post);
                $post_thumb = get_the_post_thumbnail_url($post, 'large');
                $post_cats  = get_the_category($post_id);
                $post_desc  = has_excerpt($post) ? get_the_excerpt($post) : '';
                $groups = array_map(fn($c) => $c->slug, $post_cats);
            ?>
            <div class="portfolio-item peIsotopeItem" data-groups='<?php echo json_encode($groups); ?>'>
                <div class="portfolio-thumb">
                    <a href="<?php echo esc_url($post_link); ?>">
                        <img src="<?php echo esc_url($post_thumb); ?>" alt="<?php echo esc_attr($post_title); ?>">
                        <div class="cell-title">
                            <div class="overlay-content">
                                <h4><?php echo esc_html($post_title); ?></h4>
                                <?php if ($post_desc): ?>
                                    <p><?php echo esc_html($post_desc); ?></p>
                                <?php endif; ?>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <?php endforeach; wp_reset_postdata(); ?>
        </div>
    </div>
</section>

<script>

</script>
