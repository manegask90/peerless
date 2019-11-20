$(document).ready(function () {
  $(document).on('click', '.open-account-nav', function () {
    $('body').addClass('account-nav-open');
    $('html').addClass('no-scrolling-ios');
    $('body').addClass('no-scrolling-ios');
  });
  $('.basel-my-account-sidebar-overlay').on('click', function () {
    $('body').removeClass('account-nav-open');
    $('html').removeClass('no-scrolling-ios');
    $('body').removeClass('no-scrolling-ios');
  });


  var $sticky = $('.basel-my-account-sidebar');
  var $stickyStopper = $('.footer-container');
  var $right_content = $(".shopify-MyAccount-content");
  
  if (!!$sticky.offset()) { // make sure ".sticky" element exists
    var generalSidebarHeight = $sticky.innerHeight();
    var generalSidebarWidth = $sticky.innerWidth();
    var stickyTop = $sticky.offset().top;
    var stickOffset = 150;
    var stickyStopperPosition = $stickyStopper.offset().top;
    var stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
    var diff = stopPoint - stickOffset / 2;

    // Initial Action 

    if ($right_content.height() > $sticky.height()) {
      var windowTop = $(window).scrollTop(); // returns number

      if (stopPoint < windowTop ) {
        $sticky.css({ position: 'absolute', top: diff });
      } else if (stickyTop < windowTop+stickOffset) {
        //$sticky.css({ position: 'fixed', top: stickOffset, width: generalSidebarWidth });
        $sticky.css({ position: 'fixed', top: stickOffset });
      } else {
        $sticky.css({position: 'absolute', top: 'initial'});
      }
    }

    $(window).on('orientationchange', function () {
      $sticky = $('.basel-my-account-sidebar');
      $stickyStopper = $('.footer-container');
      $right_content = $(".shopify-MyAccount-content");
      
      generalSidebarHeight = $sticky.innerHeight();
      generalSidebarWidth = $sticky.innerWidth();
      stickyTop = $sticky.offset().top;
      stickOffset = 150;
      stickyStopperPosition = $stickyStopper.offset().top;
      stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
      diff = stopPoint - stickOffset / 2;
    });


    $(window).scroll(function(){ // scroll event
      if ($right_content.height() > $sticky.height()) {
        stickyStopperPosition = $stickyStopper.offset().top;
        stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
        diff = stopPoint - stickOffset / 2;

        var windowTop = $(window).scrollTop(); // returns number

        if (stopPoint < windowTop + 50) {
          // $sticky.css({ position: 'absolute', top: "initial" });
          $sticky.css({ position: 'absolute', top:  $right_content.height() - $sticky.find('> div').height() + 64 });

        } else if (stickyTop < windowTop+stickOffset) {
          $sticky.css({ position: 'fixed', top: stickOffset });
          //$sticky.css({ position: 'fixed', top: stickOffset, width: generalSidebarWidth });
        } else {
          $sticky.css({position: 'absolute', top: "initial"});
        }
      }
    });
  }
});