$('document').ready(function(){
  if($('body').hasClass("template-index")){
    // $(".calender").css('display','block');
    // $(".calender").appendTo("#shopify-section-1533811084876 > .gl_row");
    // $( "" ).append();
    $(".contact-forms").css('display','block');
    $( "#shopify-section-1533812163717 .lazy_bg .text-center" ).append($(".contact-forms"));
  }
  
  $('body').on('change', '#customer_accounttype', function(e) {
    $('.basel-registration-page.basel-register-tabs.active-register').height($('.basel-registration-page .col-register-change').height());
  });
  
  $('body').on('click', '.basel-registration-page .basel-switch-to-register', function(e) {
    hideRecoverPasswordForm();
    if($('.basel-registration-page').hasClass("active-register")){
        $('.basel-registration-page.basel-register-tabs.active-register').height($('.basel-registration-page .col-register-change').height());
    }else{
        $('.basel-registration-page').height('auto');
    }
  });
  
  $('.timeline-Tweet-media').css('display','none');
  $('.products-footer a').text('SHOW MORE RESULTS');
  
  
  // set your twitter id
  /* var user = 'manikan81216695';
     
    $.ajax({
     type: "GET",
     dataType: "json",
     url: "https://search.twitter.com/search.json?q=from:"+user+"&rpp=1&callback=?",
     success: function(data){
        $("#shopify-section-1533812289937").text(data.results[0].text);
     }
   }); 
  */
  	if (window.location.search) {
  		var searchParams = new URLSearchParams(window.location.search.slice(1));
  		if (searchParams.get('subscribed') == 'true') {
  			$('#gl_contact .info-box').html('<div class="alert alert-success">Thank you! You was successfuly sibscribed!</div>');
  		}
  	}
});