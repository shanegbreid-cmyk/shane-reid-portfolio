<?php
class EllaPress_Custom_Walker_Nav_Menu extends Walker_Nav_Menu {
    // Start new levels (submenus)
    function start_lvl( &$output, $depth = 0, $args = null ) {
        $indent = str_repeat("\t", $depth);
        $output .= "\n{$indent}<ul role=\"menu\" class=\"dropdown-menu last\">\n"; // Submenu class
    }

    // Start individual menu items
    function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
        $indent = ($depth) ? str_repeat("\t", $depth) : '';

        $classes = empty($item->classes) ? array() : (array) $item->classes;

        // Check if the menu item has children
        $has_children = in_array('menu-item-has-children', $classes);
        if ($has_children) {
            $classes[] = 'dropdown'; // Add class for menu items with children
        }

        // Add nav-item class to each li
        $classes[] = 'nav-item';

        // Prepare class names for li
        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
        $class_names = ' class="' . esc_attr($class_names) . '"';
        $output .= $indent . '<li id="menu-item-' . $item->ID . '"' . $class_names . '>';

        // Set attributes for the anchor tag
        $atts = array();
        $atts['title'] = !empty($item->attr_title) ? $item->attr_title : '';
        $atts['href'] = !empty($item->url) ? esc_url($item->url) : '';

        // Add nav-link class only for top-level items
        if ($depth === 0) {
            $atts['class'] = 'nav-link'; // Only add for top-level items
        } else {
            // For child items, no class is added
            $atts['class'] = ''; // No class for child items
        }

        // Build attributes string
        $attributes = '';
        foreach ($atts as $attr => $value) {
            if (!empty($value)) {
                $attributes .= ' ' . $attr . '="' . esc_attr($value) . '"';
            }
        }

        // Construct item output
        $item_output = $args->before;
        $item_output .= '<a' . $attributes . '>';
        $item_output .= $args->link_before . apply_filters('the_title', $item->title, $item->ID) . $args->link_after;

        // Add caret if it's a dropdown
        if ($has_children) {
            $item_output .= ' <b class="icon-down-open-mini"></b>';
        }

        $item_output .= '</a>';
        $item_output .= $args->after;

        // Append the constructed item to the output
        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }
}
?>
