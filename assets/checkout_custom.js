jQuery(document).ready(function($){
	$(".field").each(function(){
		// if($(this).data('address-field') == 'address1') {
		// 	$(this).find('.field__label').text('Address 1');
		// }
		// if($(this).data('address-field') == 'address2') {
		// 	$(this).find('.field__label').text('Address 2');
		// }
		if($(this).find('.field__label').text() == 'Stored addresses') {
			$(this).removeClass("field--required");
			$(this).find(".field__input-wrapper").removeClass("field__input-wrapper--select");
		}
	});
	$(".section--shipping-address .section__content .fieldset").append("<div class='field custom-field'><p>Don’t see the location you are looking for? We only ship to the continential US.</p></div>");
	
	if(typeof customerTags !== 'undefined' && (customerTags.indexOf('B2B Admin') != -1 || customerTags.indexOf('B2B Join') != -1 )) {
		$(".section--shipping-method .section__header .section__title").append("<span class='shipping-tooltip'><span class='tooltip-content'>Learn more about shipping costs by reading about our <a href='/pages/dealer-freight-program' target='_blank'>dealer frieght program</a></span></span>");
	}
});