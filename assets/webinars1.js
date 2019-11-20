Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('contains', function(arg1, arg2, options) {
  return arg1.indexOf(arg2) !== -1 ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('truncatePin', function(that){
  if (!that.phone || !that.phone_pin) return '';

  return that.phone.replace(that.phone_pin, '');
});

Handlebars.registerHelper('maskPhone', function (that){
  return maskString(that.phone, '+X (XSX) XXX-XXXX', {X: /\d/, S: /[1-9]/});
});

$.fn.serializeObj = function () {
  var serializedArray = $(this).serializeArray();
  var data = {};
  serializedArray.forEach(function(obj){
    data[obj.name] = obj.value;
  });
  return data;
}


function Webinars () {
	var _this = this;
	this.api                  = '/apps/peerless/webinars/get-events';
	this.apiEvent             = '/apps/peerless/webinars/get-event';
	this.webinarSource        = document.getElementById('webinar-template').innerHTML;
	this.webinarTemplate      = Handlebars.compile(this.webinarSource);
	this.webinars             = null;
	this.upcomingWebinars     = [];
	this.upcomingWebinarsHTML = [];
	this.pastWebinars         = [];
	this.pastWebinarsHTML     = [];
	this.today                = new Date();
	this.activeTab            = 'upcoming';

	this.getEvents = function () {
		handleAjax(
			this.api,
			'',
			'GET',
			function (response) {
				if (response.data.bodyContent) {
					_this.webinars = response.data.bodyContent;
					_this.addImgUrl();
					_this.sortWebinars();
					_this.generateUpcomingWrbinarsHTML();
					_this.generatePastWrbinarsHTML();

					_this.insertUpcomingWebinars();
					_this.initViewDetails();
				}
			}
		);
	}

	this.addImgUrl = function(){
		if (this.webinars.lenght == 0) return;

		this.webinars.forEach(function(webinar){
			if(webinar.sessionName.toLowerCase().indexOf('gold') != -1){
				return webinar.image = '//cdn.shopify.com/s/files/1/0026/4083/8771/t/2/assets/gold.png?750003';
			}
			else if(webinar.sessionName.toLowerCase().indexOf('bronze') != -1){
				return webinar.image = '//cdn.shopify.com/s/files/1/0026/4083/8771/t/2/assets/bronze.png?750003';
			}
			else if(webinar.sessionName.toLowerCase().indexOf('platinum') != -1){
				return webinar.image = '//cdn.shopify.com/s/files/1/0026/4083/8771/t/2/assets/platinum.png?750003';
			}
			else if(webinar.sessionName.toLowerCase().indexOf('silver') != -1){
				return webinar.image = '//cdn.shopify.com/s/files/1/0026/4083/8771/t/2/assets/silver.png?750003';
            }  
            else if(webinar.sessionName.toLowerCase().indexOf('diamond') != -1){
				return webinar.image = '//cdn.shopify.com/s/files/1/0026/4083/8771/t/2/assets/diamond.png?750003';  
			}
			return webinar.image = '//cdn.shopify.com/s/files/1/0026/4083/8771/t/2/assets/default_webinar_image.png?750003';
		})
	}

	this.getEvent = function (id, btn, eventObj) {
		handleAjax(
			this.apiEvent+'/'+id,
			'',
			"GET",
			function (response) {
				if (response.data) {
					eventObj.fullEvent = response.data;
					window.location = response.data.bodyContent.Attendees.joinURLForAttendees;
				}
			},
			function () {
				btn.removeClass('loading');
			},
			);
		}

	this.sortWebinars = function () {
		for (var w = 0; w < this.webinars.length; w++ ) {
      this.formatTime(this.webinars[w]);
			this.webinars[w].status = this.webinars[w].status.split("_").join(" ");
			if (this.webinars[w].startDateObj.getTime() < this.today.getTime()) {
        this.pastWebinars.push(this.webinars[w]);
			} else {
				this.upcomingWebinars.push(this.webinars[w]);
			}
    }
    this.pastWebinars.reverse();
  }
  
  this.formatTime = function (webinar) {
    webinar.startDateObj = new Date(webinar.startDate);
    webinar.endDateObj = new Date(webinar.endDate);

    // add 0 to month;
    var month = this.addTimeLeadingZero(webinar.startDateObj.getMonth() + 1)

    var day = this.addTimeLeadingZero(webinar.startDateObj.getDate());

    webinar.date = month + "/" + day + "/" +
        webinar.startDateObj.getFullYear();

		var timeStartFormat = this.addTimeLeadingZero(webinar.startDateObj.getHours());
		var timeEndFormat = this.addTimeLeadingZero(webinar.endDateObj.getHours());
		var timeEndMin = this.addTimeLeadingZero(webinar.endDateObj.getMinutes());
		var timeStartFormatPM = true;
		var timeEndFormatPM = true;
		
		
		if (timeStartFormat > 11 && timeStartFormat != 12) {
			timeStartFormat = (timeStartFormat - 12) + ":" + timeEndMin;
		} else if (timeStartFormat == 12) {
			timeStartFormat = timeStartFormat + ":" + timeEndMin;
		} else {
			timeStartFormat = timeStartFormat + ":" + timeEndMin;
			timeStartFormatPM = false;
		}
		
		if (timeEndFormat > 11 && timeEndFormat != 12) {
			timeEndFormat = (timeEndFormat - 12) + ":" + timeEndMin;
		} else if (timeEndFormat == 12) {
			timeEndFormat = timeEndFormat + ":" + timeEndMin;
		} else {
			timeEndFormat = timeEndFormat + ":" + timeEndMin;
			timeEndFormatPM = false;
		}
		
		if (timeStartFormatPM && timeEndFormatPM) {
			webinar.time = timeStartFormat 
					+ ' - ' 
					+ timeEndFormat
					+ " pm" 
					+ " CST";
		} else if (!timeStartFormatPM && !timeEndFormatPM) {
			webinar.time = timeStartFormat 
					+ ' - ' 
					+ timeEndFormat
					+ " am" 
					+ " CST";
		} else if (!timeStartFormatPM && timeEndFormatPM) {
			webinar.time = timeStartFormat 
					+ " am"
					+ ' - ' 
					+ timeEndFormat
					+ " pm" 
					+ " CST";
		} else if (timeStartFormatPM && !timeEndFormatPM) {
			webinar.time = timeStartFormat 
					+ " pm"
					+ ' - ' 
					+ timeEndFormat
					+ " am" 
					+ " CST";
		}
		else {
			webinar.time = timeStartFormat 
				+ ' - ' 
				+ timeEndFormat
				+ " CST";
		}
				
  }

	this.addTimeLeadingZero = function (number) {
		return number < 10 ? "0" + number : number;
	}

	this.generateUpcomingWrbinarsHTML = function () {
		if (this.upcomingWebinars.length == 0) return;
		this.upcomingWebinarsHTML = this.upcomingWebinars.map(function (webinar) {
			return _this.webinarTemplate(webinar);
		});
	}

	this.generatePastWrbinarsHTML = function () {
		if (this.pastWebinars.length == 0) return;
		this.pastWebinarsHTML = this.pastWebinars.map(function (webinar) {
			return _this.webinarTemplate(webinar);
		});
	}

	this.generateWrbinarsHTML = function (arr) {
		if (arr.length == 0) return;
		return arr.map(function (webinar) {
			return _this.webinarTemplate(webinar);
		});
	}

	this.insertUpcomingWebinars = function () {
		$('.webinars-list-wrap').html(this.upcomingWebinarsHTML);
	}

	this.insertPastWebinars = function () {
		$('.webinars-list-wrap').html(this.pastWebinarsHTML);
	}

	this.insertWebinars = function (arr) {
		$('.webinars-list-wrap').html(arr);
	}

	this.initTabs = function () {
		$('.tabs-wrapper li').on('click', function (evt) {
			var that   = $(evt.currentTarget);
			if (that.hasClass('active')) return; // id tab active exit fucntion

			var target = that.find('a').data('target');

			$('.tabs-wrapper li.active').removeClass('active');
			that.addClass('active');

			if (target == 'past') {
				this.insertPastWebinars();
				this.activeTab = 'past';
			} else {
				this.insertUpcomingWebinars();
				this.activeTab = 'upcoming';
			}
		}.bind(this));
	}

	this.initViewDetails = function () {
		jQuery('.posts-list').preloader('stop');
		$('.posts-list').on('click', '.article-actions a', function (evt) {
			var that   = $(evt.currentTarget),
					parent = that.closest('.article-item'),
					id     = parent.data('id'),
					eventObj = this.getEventObj(id);

			if (!eventObj.fullEvent) {
				that.addClass('loading');
				this.getEvent(id, that, eventObj);
			} else {
				window.location = eventObj.fullEvent.bodyContent.attenddes.joinURLForattendees
			}
		}.bind(this));
	}

	this.getEventObj = function (id) {
		return this.webinars.find(function (webinar) { return webinar.sessionKey == id; });
	}

	this.initSearch = function (){
		$('#search-input').on('input', function (evt) {
			var value = evt.currentTarget.value.toLowerCase();
			var serchArr = [];
			if (this.activeTab == 'past') {
				serchArr = this.pastWebinars;
			} else if (this.activeTab == 'upcoming') {
				serchArr = this.upcomingWebinars;
			}

			var resArr = serchArr.filter(function (webinar) {
				var desc        = webinar.description.toLowerCase(),
						sessionName = webinar.sessionName.toLowerCase();
				return desc.includes(value) || sessionName.includes(value);
			});
			this.insertWebinars(this.generateWrbinarsHTML(resArr));
		}.bind(this));
	}

	this.init = function () {
		this.getEvents();
		this.initTabs();
		this.initSearch();
	}
}

// Preloader
(function($) {
	var actions = {
			start: function() {
					var $preloader = $("<div id='jpreloader' class='preloader-overlay'><div class='loader1'><img src='https://cdn.shopify.com/s/files/1/0026/4083/8771/files/45.svg?217056'></div></div>");
					$preloader.css({
							'width': '100%',
							'height': '100%',
							'left': '0',
							'top': '25px',
							'z-index': '100',
							'position': 'absolute',
							'text-align': 'center'
					});
					this.append($preloader);
			},

			stop: function() {
					this.find('.preloader-overlay').remove();
			}
	};
	
	$.fn.preloader = function(action) {        
			actions[action].apply(this);
			return this;
	};
}(jQuery));

jQuery(document).ready(function () {
	var webinars = new Webinars();
	webinars.init();
	jQuery('.posts-list').preloader('start');
});