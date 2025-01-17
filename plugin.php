<?php
/**
 * Plugin Name:       Gutenberg Blocks
 * Description:       An addon for Gutenberg plugin.
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           0.1.0
 * Author:            DevAqsa
 * Author URI:        https://devaqsa.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       devaqsa-gutenberg-blocks
 */

 namespace devaqsa\GutenbergBlocks;

 if (!defined('ABSPATH')) {
   header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found');
   exit;
 }

 define('GUTENBERG_BLOCKS_VERSION', '0.1.0');
 define('GUTENBERG_BLOCKS_URL', plugin_dir_url( __FILE__ ));
 define('GUTENBERG_BLOCKS_INC_URL', GUTENBERG_BLOCKS_URL . 'includes/');

 /**
	* Loads PSR-4-style plugin classes.
	*/
 function classloader($class) {
	 static $ns_offset;
	 if (strpos($class, __NAMESPACE__ . '\\') === 0) {
		 if ($ns_offset === NULL) {
			 $ns_offset = strlen(__NAMESPACE__) + 1;
		 }
		 include __DIR__ . '/inc/' . strtr(substr($class, $ns_offset), '\\', '/') . '.php';
	 }
 }
 spl_autoload_register(__NAMESPACE__ . '\classloader');

 add_action('plugins_loaded', __NAMESPACE__ . '\Plugin::loadTextDomain');
 add_action('init', __NAMESPACE__ . '\Plugin::perInit', 0);
 add_action('init', __NAMESPACE__ . '\Plugin::init', 20);
//add_action('admin_init', __NAMESPACE__ . '\Admin::init');

function enqueue_testimonial_carousel_assets() {
    // Enqueue Slick Slider CSS
    wp_enqueue_style(
        'slick-carousel-css',
        'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css',
        array(),
        '1.8.1'
    );
    
    // Enqueue Slick Slider Theme CSS
    wp_enqueue_style(
        'slick-carousel-theme',
        'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css',
        array(),
        '1.8.1'
    );
    
    // Enqueue jQuery (WordPress should already have this)
    wp_enqueue_script('jquery');
    
    // Enqueue Slick Slider JS
    wp_enqueue_script(
        'slick-carousel-js',
        'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',
        array('jquery'),
        '1.8.1',
        true
    );
    
    // Enqueue your frontend JS
    wp_enqueue_script(
        'testimonial-carousel-frontend',
        plugin_dir_url(__FILE__) . 'frontend.js',
        array('jquery', 'slick-carousel-js'),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'enqueue_testimonial_carousel_assets');