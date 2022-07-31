(function($) {
    $( '#submit' ).click(function( e ) {

      e.preventDefault();

      // Disable button after user submit
      $('#submit').addClass('opc');  
      $('#submit').prop('disabled', true);
      
      // Validate email
      function isValidEmailAddress(emailValue) {
          var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
          return pattern.test(emailValue);
          
        }
      const emailValue =  $( '#email' ).val();
        if ( emailValue.length === 0 ) {
          $( '.msg' ).text( 'This field can not be empty' );
          $('#submit').removeClass('opc');
          $('#submit').prop('disabled', false);    


          return false;
        } 
        else if ( emailValue.length > 30 ) {
          $( '.msg' ).text( 'You can not type more than 30 characters' );
          $('#submit').removeClass('opc');
          $('#submit').prop('disabled', false);  

          return false;
        } 
        else if( !isValidEmailAddress( emailValue ) ) {
          $( '.msg' ).text( 'Email is not valid' );
          $('#submit').removeClass('opc');
          $('#submit').prop('disabled', false);  

          return false;
        }
        
        // Set ajax data
        var data = {
            'action' : 'send_form',
            'nonce': settings.nonce, 
            'email' : $('#email').val()
        };
        $.ajax({
          type: 'POST',
          url: settings.ajaxurl,
          data: data,
                         
          success: function (response) {

            // Enable button after ajax response
            $('#submit').removeClass('opc');
            $('#submit').prop('disabled', false);  
              if (!$.trim(response)){
                $( '.msg' ).html( settings.error );

              }
              else{
                $('.msg').html( response.data );

              }
          },
          
  
      });
        
      

});
})(jQuery);