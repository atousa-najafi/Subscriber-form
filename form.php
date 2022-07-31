<?php


function contact_form_func(){
	?>
 <form method="POST" action="" id="contact-form">
	<div class="form-area">
		<input type="email" id="email" name="email" placeholder="<?php echo __( 'Mail', 'subscribeme' ) ?>"/>
		<input type="submit" id="submit" value="Subscribe"/>		
	</div>	
	<div class="msg"></div>                            
</form>

<?php
}

function register_shortcodes(){
	add_shortcode( 'chr_contact_form', 'contact_form_func' );

 }
 add_action( 'init', 'register_shortcodes');
 
 
?>
