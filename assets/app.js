$(document).ready(function ($) {
  $('#contact_form').attr('novalidate', 'novalidate');

  $('.contact_form_care_page').on('submit',function(e){
    var that = $(this),
        f_name = that.find('input[name="contact[name][first]"]').val(),
        errorBox_f_name = that.find('input[name="contact[name][first]"]').parent().parent().parent().find('.error-box'),
        l_name = that.find('input[name="contact[name][last]"]').val(),
        errorBox_l_name = that.find('input[name="contact[name][last]"]').parent().parent().parent().find('.error-box'),
        email = that.find('input[name="contact[email]"]'),
        email_val = email.val(),
        errorBox_email = email.parent().parent().parent().find('.error-box.email'),
        phone_parent = that.find('.phone-wrapper'),
        phone = that.find('input[name="contact[phone]"]').val(),
        message = that.find('textarea[name="contact[body]"]'),
        errorBox_message = that.find('textarea[name="contact[body]"]').parent().parent().parent().find('.error-box.message'),
        error = false;
    if(f_name == ''){
      errorBox_f_name.show();
      error = true;
    }else{
      errorBox_f_name.hide();
    }


    if(l_name == ''){
      errorBox_l_name.show();
      error = true;
    }else{
      errorBox_l_name.hide();
    }


    if(phone_parent.hasClass('active') && phone == ''){
      error = true;
      phone_parent.find('.error-box').show();
    }else{
      phone_parent.find('.error-box').hide();
    }


    if(message.val() == ''){
      errorBox_message.show();
      error = true;
    }else{
      errorBox_message.hide();
    }

    
    if(email_val == ''){
      error = true;
      errorBox_email.text('Email Address is required.');
      errorBox_email.show();
    }else if (email_val.indexOf('@') === -1) {
         error = true;
       errorBox_email.text('Please include an \'@\' in the email addres. \''+email_val+'\' is missing an \'@\'');
       errorBox_email.show();
    } else if (!validateEmail(email_val)) {
       error = true;
       errorBox_email.text('Please enter valid email.');
       errorBox_email.show();
    } else {
       // hide error box
       errorBox_email.hide();
    }

    if(error){
      e.preventDefault();
    }





  });




 //  $('.contact_form_care_page').on('submit', function (e) {
 //      var that       = $(this),
	// 		emailField = that.find('input[type="email"]'),
	// 		$mc4wpResponse = that.find('.mc4wp-response'),
	// 		// errorBox   = form.find('.error-box');
	// 		errorBox   = emailField.parent().parent().find('.error-box');
	// 		if($mc4wpResponse.length > 0) {
	// 			$mc4wpResponse.remove();
	// 		}

 //    if (emailField.length && !emailField[0].validity.valid && emailField[0].validity.valueMissing) {
 //    	e.preventDefault();
	// 	// please fill field
	// 	errorBox.find('span').text('Please fill this field.');
	// 	errorBox.show();
 //    } else if (emailField.val().indexOf('@') === -1) {
 //    	e.preventDefault();
	// 	errorBox.find('span').text('Please include an \'@\' in the email addres. \''+emailField.val()+'\' is missing an \'@\'');
	// 	errorBox.show()
 //    } else if (!validateEmail(emailField.val())) {
 //    	e.preventDefault();
 //    	errorBox.find('span').text('Please enter valid email.');
	// 	errorBox.show();
	// } else {
 //    	// hide error box
 //    	errorBox.hide();
 //    }
 //  });

  // $('#contact_form_care_page').on('submit', function (e) {
  //   e.preventDefault();
  //   var that         = $(this);
  //     form           = $(this).closest('form'),
  //     emailField     = form.find('input[type="email"]'),
  //     $mc4wpResponse = form.find('.mc4wp-response'),
  //     errorBox       = emailField.parent().parent().find('.error-box'),
  //     requiredFileds = form.find('[required]'),
  //     error          = false;

  //     requiredFileds.each(function () {
  //       if ($(this).val() == '') {
  //         error = true;
  //         $(this).parent().find('.error-box').show();
  //       } else {
  //         $(this).parent().find('.error-box').show();
  //       }

  //     });
  //     console.log(error);
  // });

  $('.custom-page-cards .custom-page-card').click(function () {
  	var index = $(this).index('.custom-page-card');
    $('.custom-page-slider').trigger('to.owl.carousel', index);
  });
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}