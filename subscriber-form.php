<?php
/** 
 * Plugin Name: Stvdy Contact Form 
 * Plugin URI:   
 * Description:  Stvdy Contact Form 
 * Version:      0.0.1
 * Author:  Christopher Amirian     
 * Author URI:   christopher.am
 * License:      
*/

	
function chr_enqueue_scripts() {
	wp_enqueue_style('chr-style-css', plugins_url('/assets/style.css',__FILE__ ));	
 	wp_enqueue_script('chr-js',  plugins_url('/assets/main.js', __FILE__ ), array('jquery'), null, true );
  	wp_localize_script('chr-js','settings',array(
    	'ajaxurl' => admin_url( 'admin-ajax.php' ),
	 	'nonce'   => wp_create_nonce('ajax-nonce'),
	 	'error'   => __( 'Sorry, something went wrong. Please try again', 'subscribeme' )
  ));

}
add_action('wp_enqueue_scripts', 'chr_enqueue_scripts');

add_action( 'wp_ajax_send_form', 'send_form' );
add_action( 'wp_ajax_nopriv_send_form', 'send_form' );

function send_form() {

	if ( ! wp_verify_nonce( $_POST['nonce'], 'ajax-nonce' ) ) {
		die ( 'Busted!');
	}

	$data = $_POST;
	$admin = get_option('admin_email');
	$subject = "New subscriber";
	$message = "You have new subscriber ".sanitize_email($data['email'])." ";
	$headers = array('Content-Type: text/html; charset=UTF-8');

	$result = wp_mail( $admin, $subject, $message, $headers);
	if ( $result == true ) {
		wp_send_json_success( __( 'Subscribed successfully!', 'subscribeme' ) );

    } else {
        wp_send_json_error();
    }    

}


include_once( plugin_dir_path(__FILE__) . '/form.php' );