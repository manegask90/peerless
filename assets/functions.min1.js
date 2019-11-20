var baselThemeModule;

(function($) {
    "use strict";

    baselThemeModule = (function() {
        var baselTheme = {
            popupEffect: 'mfp-move-horizontal',
             shopLoadMoreBtn : '.basel-products-load-more.load-on-scroll',
            supports_html5_storage: false,
            ajaxLinks: '.basel-product-categories a, .basel-products-shop-view a, .widget_product_categories a, .widget_layered_nav_filters a, .filters-area a, .shopify-pagination a, .basel-shopify-layered-nav a, .widget_product_tag_cloud a'
        };

        /* Storage Handling */
        try {
            baselTheme.supports_html5_storage = ( 'sessionStorage' in window && window.sessionStorage !== null );

            window.sessionStorage.setItem( 'basel', 'test' );
            window.sessionStorage.removeItem( 'basel' );
        } catch( err ) {
            baselTheme.supports_html5_storage = false;
        }

        return {

            init: function() {
                this.headerBanner();
                this.fixedHeaders();

                this.verticalHeader();

                this.splitNavHeader();

                this.visibleElements();

                this.bannersHover();
                this.shopcarousel();
                this.inscarousel();
                this.instagram();
                this.parallax();

                this.googleMap();

                this.scrollTop();

                this.quickViewInit();

                this.quickShop();

                this.sidebarMenu();

                //this.addToCart();

                this.AJAXAddToCart();

                this.AJAXFormAddToCart();

                this.productImages();

                this.productImagesGallery();

                this.stickyDetails();

                this.mfpPopup();

                //this.swatchesVariations();

                this.swatchesOnGrid();
                this.swatchesOnBGGrid();
                // section off
                this.blogMasonry();

                this.blogLoadMore();

                this.productsLoadMore();

                this.productsTabs();
                this.productsGalaxyTabs();

                //this.portfolioLoadMore();

                this.equalizeColumns();

                this.menuSetUp();

                this.menuOffsets();

                this.onePageMenu();

                this.mobileNavigation();

                this.simpleDropdown();

                //this.shopifyWrappTable();

                //this.autoloadCompare();
                
                this.wishList();
                this.loginWishlist();
                this.removeWishlist();

                //this.compare();

                this.gl_save_note();

                this.promoPopup();

                this.cookiesPopup();

                this.productVideo();

                this.product360Button();

                // this.btnsToolTips();

                this.stickyFooter();

                //this.updateWishListNumberInit();

                this.cartWidget();

                this.ajaxFilters();

                this.shopPageInit();

                this.filtersArea();

                this.categoriesMenu();

                this.searchFullScreen();

                this.loginTabs();

                this.productAccordion();

                this.productCompact();

                this.countDownTimer();

                this.mobileFastclick();

                this.nanoScroller();
                this.videoPoster();

                this.RTL();

               // this.ShopifychangeItem();

                this.AJAXRemoveFromCart();

                this.shopifyQuantity();
                this.loginSidebar();

                this.showcaseGet();
                this.showChatBot();
                this.cartSaveProducts();
                // this.animatePagination();

                // this.shopify_3_0();

                $(window).resize();

                $('body').addClass('document-ready');

                // $(document.body).on('updated_cart_totals', function() {
                //     baselThemeModule.shopifyWrappTable();
                // });

            },
            // shopify_3_0: function() {
            //     if ( theme.wc_version == 'old' ) {
            //         var that = this;
            //         $( 'body' ).on( 'shopify_init_gallery', function() {
            //             if ( $.isFunction( $.fn.zoom ) ) {
            //                 that.init_zoom();
            //             }
            //         });
            //     }
            // },

            cartSaveProducts: function() {
                // var cart = "null";
            },

            init_zoom: function() {
                return;
                var zoom_target = $( '.shopify-product-gallery__image' ),
                    enable_zoom = false;

                if ( ! wc_single_product_params.flexslider_enabled ) {
                    zoom_target = zoom_target.first();
                }

                $( zoom_target ).each( function( index, target ) {
                    var image = $( target ).find( 'img' );
                      
                    if ( image.attr( 'width' ) > $( '.shopify-product-gallery' ).width() ) {
                        enable_zoom = true;
                        return false;
                    }
                } );

                // But only zoom if the img is larger than its container.
                if ( enable_zoom ) {
                    zoom_target.trigger( 'zoom.destroy' );
                    // zoom_target.zoom({
                    //     touch: false
                    // });
                }
            },
            showChatBot : function(){
                var link = $('.cancelInner .chatbot-link');
                var menuLink = $('.menu-item-chat a');
                link.click(function() {
                    $('.cancelWrap').removeClass('visible');
                    if (tidioChatApi) {
                        tidioChatApi.open();
                        $('body').removeClass('hidden-chat');
                    }
                });
                // tidioChatApi.hide(); 
                menuLink.click(function(e) {
                    e.preventDefault();
                    if (tidioChatApi) {
                        $('body').removeClass('hidden-chat');
                        tidioChatApi.open();
                    }
                })
            },
            productHover : function(){

                $('.shopify-hover-base').each(function(){

                    var $product = $(this);

                    $product.imagesLoaded(function() {

                        // Read more details button

                        var btnHTML = '<a href="#" class="more-details-btn"><span>' + 'more' + '</a></span>',
                            content = $product.find('.hover-content'),
                            inner = content.find('.hover-content-inner'),
                            contentHeight = content.outerHeight(),
                            innerHeight = inner.outerHeight(),
                            delta = innerHeight - contentHeight;

                        if( content.hasClass( 'more-description' ) ) return;

                        if( delta > 30 ) {
                            content.addClass('more-description');
                            content.append(btnHTML);
                        } else if( delta > 0 ) {
                            content.css( 'height', contentHeight + delta );
                        }

                        // Bottom block height

                        reculc( $product );
                    });

                });

                $('body').on('click', '.more-details-btn', function(e) {
                    e.preventDefault();
                    $(this).parent().addClass('show-full-description');
                        reculc( $(this).parents('.shopify-hover-base') );
                });

                if( $(window).width() < 992 ) {
                    $('.shopify-hover-base').on('click', function( e ) {
                        var hoverClass = 'state-hover';
                        if( ! $(this).hasClass(hoverClass) ) {
                            e.preventDefault();
                            $('.' + hoverClass ).removeClass(hoverClass);
                            $(this).addClass(hoverClass);
                        }
                    });
                }

                var reculc = function( $el ) {

                    if( $el.hasClass('product-in-carousel') ) {
                        return;
                    }

                    var heightHideInfo = $el.find('.fade-in-block').outerHeight();

                    $el.find('.content-product-imagin').css({
                        marginBottom : -heightHideInfo
                    });

                    $el.addClass('hover-ready'); 
                };

                $('.product-grid-item').each(function() {
                    var $el = $(this),
                        widthHiddenInfo = $el.outerWidth();

                    if( widthHiddenInfo < 255 || $(window).width() <= 1024 ) {
                        $el.removeClass('hover-width-big').addClass('hover-width-small'); 
                    } else {
                        $el.removeClass('hover-width-small').addClass('hover-width-big'); 
                    }
                })

            },
          
            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Login sidebar
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
             
            loginSidebar: function() {
                var body = $( 'body' );
                
                $( '.login-side-opener' ).on( 'click', function ( e ) {
                    e.preventDefault();
                    if( isOpened() ) {
                        closeWidget();
                    } else {
                        setTimeout( function() {
                            openWidget();
                        }, 10);
                    }
                });
                
                body.on( 'click touchstart', '.basel-close-side', function() {
                    if( isOpened() ) closeWidget();
                });

                body.on( 'click', '.widget-close', function( e ) {
                    e.preventDefault();
                    if( isOpened() ) closeWidget();
                });
                
                var closeWidget = function() {
                    body.removeClass( 'basel-login-side-opened' );
                };

                var openWidget = function() {
                    body.addClass( 'basel-login-side-opened' );
                };
                
                var isOpened = function() {
                    return body.hasClass( 'basel-login-side-opened' );
                };

            },
          
            
            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Header banner
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
             
            headerBanner: function() {
                var banner_version = theme.basel_settings.header_banner_version,
                    banner_btn = theme.basel_settings.close_banner_btn,
                    banner_enabled = theme.basel_settings.header_banner_enabled;
                if( $.cookie( 'basel_tb_banner_' + banner_version ) == 'closed' || banner_enabled == false ) return;
                var banner = $( '.header-banner' );
                
                $( 'body' ).addClass( 'header-banner-display' );
            
                banner.on( 'click', '.close-header-banner', function( e ) {
                    e.preventDefault();
                    closeBanner();
                })

                var closeBanner = function() {
                    $( 'body' ).removeClass( 'header-banner-display' ).addClass( 'header-banner-hide' );
                    $.cookie( 'basel_tb_banner_' + banner_version, 'closed', { expires: 60, path: '/' } );
                };

            },
          
           videoPoster: function() {
                $( '.basel-video-poster-wrapper' ).on( 'click', function() {
                    var videoWrapper = $( this ),
                        video = videoWrapper.siblings( 'iframe' ),
                        videoScr =  video.attr( 'src' ),
                        videoNewSrc = videoScr + '&autoplay=1';

                    if  ( videoScr.indexOf( 'vimeo.com' ) + 1 ) {
                        videoNewSrc = videoScr + '?autoplay=1';
                    }
                    video.attr( 'src',videoNewSrc );
                    videoWrapper.addClass( 'hidden-poster' );
                })
            },
          
            fixedHeaders: function(){

                var getHeaderHeight = function() {
                    var headerHeight = header.outerHeight();

                    if( body.hasClass( 'sticky-navigation-only' ) ) {
                        headerHeight = header.find( '.navigation-wrap' ).outerHeight();
                    }

                    return headerHeight;
                };

                var headerSpacer = function() {
                    if(stickyHeader.hasClass(headerStickedClass)) return;
                    $('.header-spacing').height(getHeaderHeight()).css('marginBottom', 40);
                };

                var body = $("body"),
                    header = $(".main-header"),
                    stickyHeader = header,
                    headerHeight = getHeaderHeight(),
                    headerStickedClass = "act-scroll",
                    stickyClasses = '',
                    stickyStart = 0,
                    links = header.find('.main-nav .menu>li>a');

                if( ! body.hasClass('enable-sticky-header') || body.hasClass('global-header-vertical') || header.length == 0 ) return;

                var logo = header.find(".site-logo").clone().html(),
                    navigation = header.find(".main-nav").clone().html(),
                    rightColumn = header.find(".right-column").clone().html(),
                    topBar = body.find(".topbar-wrapp").clone().html();

                var headerClone = [
                    '<div class="sticky-header header-clone">',
                        '<div class="topbar-wrapp color-scheme-light">' + topBar + '</div>',
                        '<div class="container">',
                            '<div class="site-logo">' + logo + '</div>',
                            '<div class="main-nav site-navigation basel-navigation">' + navigation + '</div>',
                            '<div class="right-column">' + rightColumn + '</div>',
                        '</div>',
                    '</div>',
                ].join('');


                if( $('.topbar-wrapp').length > 0 ) {
                    stickyStart = $('.topbar-wrapp').outerHeight();
                }
                  if( $( '.header-banner' ).length > 0 && body.hasClass( 'header-banner-display' ) ) {
                    stickyStart += $( '.header-banner' ).outerHeight();
                }

                if( body.hasClass( 'sticky-header-real' ) ) {
                    var headerSpace = $('<div/>').addClass('header-spacing');
                    header.before(headerSpace);

                    $(window).on('resize', headerSpacer);

                    var timeout;

                    $(window).on("scroll", function(e){
                        if($(this).scrollTop() > stickyStart){
                            stickyHeader.addClass(headerStickedClass);
                        }else {
                            stickyHeader.removeClass(headerStickedClass);
                            clearTimeout( timeout );
                            timeout = setTimeout(function() {
                                headerSpacer();
                            }, 200);
                        }
                    });

                } else if( body.hasClass( 'sticky-header-clone' ) ) {
                    header.before( headerClone );
                    stickyHeader = $('.sticky-header');
                }

                // Change header height smooth on scroll
                if( body.hasClass( 'basel-header-smooth' ) ) {

                    $(window).on("scroll", function(e){
                        var space = ( 120 - $(this).scrollTop() ) / 2;

                        if(space >= 60 ){
                            space = 60;
                        } else if( space <= 30 ) {
                            space = 30;
                        }
                        links.css({
                            paddingTop: space,
                            paddingBottom: space
                        });
                    });

                }

                if(body.hasClass("basel-header-overlap") || body.hasClass( 'sticky-navigation-only' )){
                }


                if(!body.hasClass("basel-header-overlap") && body.hasClass("sticky-header-clone")){
                    header.attr('class').split(' ').forEach(function(el) {
                        if( el.indexOf('main-header') == -1 && el.indexOf('header-') == -1) {
                            stickyClasses += ' ' + el;
                        }
                    });

                    stickyHeader.addClass(stickyClasses);

                     $(window).on("scroll", function(e){
                        if($(this).scrollTop() > headerHeight + 30){
                            stickyHeader.addClass(headerStickedClass);
                        }else {
                            stickyHeader.removeClass(headerStickedClass);
                        }
                    });
                }

                body.addClass('sticky-header-prepared');
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Vertical header
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

             verticalHeader: function() {

                var $header = $('.header-vertical').first();

                if( $header.length < 1 ) return;

                var $body, $window, $sidebar, top = false,
                    bottom = false, windowWidth, adminOffset, windowHeight, lastWindowPos = 0,
                    topOffset = 0, bodyHeight, headerHeight, resizeTimer, Y = 0, delta,
                    headerBottom, viewportBottom, scrollStep;

                $body          = $( document.body );
                $window        = $( window );
                adminOffset    = $body.is( '.admin-bar' ) ? $( '#wpadminbar' ).height() : 0;

                $window
                    .on( 'scroll', scroll )
                    .on( 'resize', function() {
                        clearTimeout( resizeTimer );
                        resizeTimer = setTimeout( resizeAndScroll, 500 );
                    } );

                resizeAndScroll();

                for ( var i = 1; i < 6; i++ ) {
                    setTimeout( resizeAndScroll, 100 * i );
                }


                // Sidebar scrolling.
                function resize() {
                    windowWidth = $window.width();

                    if ( 1024 > windowWidth ) {
                        top = bottom = false;
                        $header.removeAttr( 'style' );
                    }
                }

                function scroll() {
                    var windowPos = $window.scrollTop();

                    if ( 1024 > windowWidth ) {
                        return;
                    }

                    headerHeight   = $header.height();
                    headerBottom   = headerHeight + $header.offset().top;
                    windowHeight   = $window.height();
                    bodyHeight     = $body.height();
                    viewportBottom = windowHeight + $window.scrollTop();
                    delta          = headerHeight - windowHeight;
                    scrollStep     = lastWindowPos - windowPos;

                    // If header height larger than window viewport
                    if ( delta > 0 ) {
                        // Scroll down
                        if ( windowPos > lastWindowPos ) {

                            // If bottom overflow

                            if( headerBottom > viewportBottom ) {
                                Y += scrollStep;
                            }

                            if( Y < -delta ) {
                                bottom = true;
                                Y = -delta;
                            }

                            top = false;

                        } else if ( windowPos < lastWindowPos )  { // Scroll up

                            // If top overflow

                            if( $header.offset().top < $window.scrollTop() ) {
                                Y += scrollStep;
                            }

                            if( Y >= 0 ) {
                                top = true;
                                Y = 0;
                            }

                            bottom = false;

                        } else {

                            if( headerBottom < viewportBottom ) {
                                Y = windowHeight - headerHeight;
                            }

                            if( Y >= 0 ) {
                                top = true;
                                Y = 0;
                            }
                        }
                    } else {
                        Y = 0;
                    }

                    // Change header Y coordinate
                    $header.css({
                        top: Y
                    });

                    lastWindowPos = windowPos;
                }

                function resizeAndScroll() {
                    resize();
                    scroll();
                }

             },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Split navigation header
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            splitNavHeader: function() {

                var header = $('.header-split');

                if( header.length <= 0 ) return;

                var navigation = header.find('.main-nav'),
                    navItems = navigation.find('.menu > li'),
                    itemsNumber = navItems.length,
                    rtl = $('body').hasClass('rtl'),
                    midIndex = parseInt( itemsNumber/2 + 0.5 * rtl - .5 ),
                    midItem = navItems.eq( midIndex ),
                    logo = header.find('.site-logo .basel-logo-wrap > a'),
                    logoWidth,
                    leftWidth = 0,
                    rule = ( ! rtl ) ? 'marginRight' : 'marginLeft',
                    rightWidth = 0;

                var recalc = function() {
                    logoWidth = logo.outerWidth(),
                    leftWidth = 5,
                    rightWidth = 0;

                    for (var i = itemsNumber - 1; i >= 0; i--) {
                        var itemWidth = navItems.eq(i).outerWidth();
                        if( i > midIndex ) {
                            rightWidth += itemWidth;
                        } else {
                            leftWidth += itemWidth;
                        }
                    };

                    var diff = leftWidth - rightWidth;

                    if( rtl ) {
                        if( leftWidth > rightWidth ) {
                            navigation.find('.menu > li:first-child').css('marginRight', -diff);
                        } else {
                            navigation.find('.menu > li:last-child').css('marginLeft', diff + 5);
                        }
                    } else {
                        if( leftWidth > rightWidth ) {
                            navigation.find('.menu > li:last-child').css('marginRight', diff + 5);
                        } else {
                            navigation.find('.menu > li:first-child').css('marginLeft', -diff);
                        }
                    }

                    midItem.css(rule, logoWidth);
                };

                logo.imagesLoaded(function() {
                    recalc();
                    header.addClass('menu-calculated');
                });

                $(window).on('resize', recalc);

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Counter shortcode method
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            counterShortcode: function(counter) {
                if( counter.attr('data-state') == 'done' || counter.text() != counter.data('final') ) {
                    return;
                }
                counter.prop('Counter',0).animate({
                    Counter: counter.text()
                }, {
                    duration: 3000,
                    easing: 'swing',
                    step: function (now) {
                        if( now >= counter.data('final')) {
                            counter.attr('data-state', 'done');
                        }
                        counter.text(Math.ceil(now));
                    }
                });
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Activate methods in viewport
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            visibleElements: function() {
                $('.basel-counter .counter-value').each(function(){
                    $(this).waypoint(function(){
                        baselThemeModule.counterShortcode($(this));
                    }, { offset: '100%' });
                });

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Compare button
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            compare: function() {
                var body                = $("body"),
                    button              = $("a.compare"),
                    compareNotification = $('.compare-notification'),
                    maxProductToComare  = 3;

                body.on("click", '.compare-notification', function () {
                    hideCompareNorification();
                });

                body.on("click", "a.compare", function() {
                    body.addClass("compare-overflow-hidden");
                    $(this).addClass("loading");
                    var $this = $(this), handle = $this.data('pid'),
                        holder = $("#compare-content"), 
                        ls = gl_Currency.cookie.tearead('tea-compare');
                    if(ls != null && ls != ''){ 
                        ls = ls.split(',');
                    } else {
                        ls = new Array();
                    }
                    if( ls.indexOf(handle)< 0 && $(this).hasClass('added') === false /*&& ls.length < maxProductToComare*/ ){
                        ls.push(handle);
                        //gl_Currency.cookie.teawrite('tea-compare',ls.join(','));
                        var ls_ = ls.join(',');
                        if (ls_.substring(0, 1) == ',') { 
                          ls_ = ls_.substring(1);
                        }
                        gl_Currency.cookie.teawrite('tea-compare',ls_);
                    }
                    // if ( ls.length == maxProductToComare && ls.indexOf(handle) == -1 ) {
                    //     showCompareFull();
                    //     setTimeout(hideCompareNorification, 10000);
                    //     //return;
                    // }

                    // if ( ls.length < 2 ) {
                    //     showAddMoreToCompare();
                    //     $this.removeClass("loading");
                    //     setTimeout(hideCompareNorification, 10000);
                    //     return;
                    // }
                    if( $(this).hasClass('added') === false || $.trim($("#compare-content").html()).length === 0 ) {
                        setTimeout(function () {
                            $("#compare-content").html(' ').addClass('loading');
                        })

                        var productComarition = $.ajax({
                            url: '/apps/peerless/product-compare',
                            data: {
                                products: ls.join(','),
                                lang: getCurrentLanguage(),
                            },
                            type: "GET",
                            error: function (error) {
                                console.log(error);
                            }
                        });

                        var comparePage = $.ajax({
                            url: '/pages/compare/'+ls,
                            dataType: 'html',
                            type: 'GET',
                            success: function(response) {
                            },
                            error: function(data) {
                                console.log('ajax error');
                            },
                            complete: function() {
                           }
                        });

                        $.when(productComarition, comparePage).done(function (prodComp, compPage) {
                            var comparePageHtml = $(compPage[0]);

                            if (prodComp[1] == 'success') {
                                var compArr = [],
                                    prodCompHtml = '';

                                prodComp[0].productResp.map(function (productData, productKey) {

                                    productData.map(function(specCat, specCatKey) {
                                        if (!compArr[specCatKey]) {
                                            compArr[specCatKey] = [];
                                            compArr[specCatKey].push([specCat.cat_name]);
                                        }

                                        specCat.specification.map(function (spec, specKey) {
                                            if (!compArr[specCatKey][specKey+1]) {
                                                compArr[specCatKey][specKey+1] = [];
                                                compArr[specCatKey][specKey+1].push(spec.name);
                                            }

                                            compArr[specCatKey][specKey+1]
                                                .push({
                                                    value: spec.value,
                                                    handle: spec.productHandle
                                                });
                                        });
                                    });
                                });

                                compArr.map(function (prodCompCatsArr) {
                                    prodCompCatsArr.map(function (catArr) {
                                        var rowHTML = '';

                                        if (catArr.length === 1) {
                                            rowHTML = '<tr class="cat-label"><th>'+catArr[0]+'</th><td colspan='+
                                                prodComp[0].productResp.length+'></td></tr>';
                                        } else {
                                            rowHTML = '<tr>';
                                            var cellClass = 'even'
                                            catArr.map(function(specArr, specArrKey) {
                                                if (specArrKey === 0) {
                                                    rowHTML += '<th>'+specArr+'</th>';
                                                } else {
                                                    cellClass = cellClass == 'odd' ? 'even' : 'odd';
                                                    rowHTML += '<td class="'+cellClass+' gl_'+specArr.handle+'">'+specArr.value+'</td>';
                                                }
                                            });
                                            rowHTML += '</tr>';
                                        }
                                        prodCompHtml += rowHTML;
                                    });
                                });

                                comparePageHtml.find('tbody').append(prodCompHtml);
                            }

                            $("#compare-content").html(comparePageHtml).removeClass('loading');
                            // init ratings
                            window.SPR.initDomEls();
                            window.SPR.loadBadges();

                            $this.removeClass("loading");
                            body.addClass("compare-opened");
                            $('[data-pid="'+handle + '"]' ).addClass('added').html('<span class="basel-tooltip-label">'+theme.strings.added_label+'</span>'+theme.strings.added_label);
                            //currency
                            baselThemeModule.gl_currency();
                        });
                    } else {
                        $this.removeClass("loading");
                        body.addClass("compare-opened");
                        
                       //currency
                        baselThemeModule.gl_currency();
                    }
                    $('.compare').colorbox({
                        inline:true, 
                        title: false,
                        width: '90%',
                        height: '90%'
                    });

                    $(window).resize(function() {
                        $('.compare').colorbox.resize({
                            title: false,
                            width: '90%',
                            height: '90%'
                        });
                    });
                });

                body.on('click', '#cboxClose, #cboxOverlay', function() {
                    
                    body.removeClass("compare-overflow-hidden");
                    body.removeClass("compare-opened");
                    $.colorbox.remove();
                });
                body.bind("keydown.cbox_close", function (e) {
                    if (e.keyCode === 27) {
                        e.preventDefault();
                        body.removeClass("compare-opened");
                    }
                });
                body.on('click', '#compare-content .product-remove', function(ev) {
                    ev.preventDefault();
                    var $this = $(this),
                        handle = $this.attr('data-rev'),
                        holder = $("#compare-content");
                    $('[data-pid="'+handle + '"]' ).removeClass('added').html('<span class="basel-tooltip-label">'+theme.strings.compare+'</span>'+theme.strings.compare);                
                    var ls = decodeURI(gl_Currency.cookie.tearead('tea-compare'));
                    //ls = ls.replace(handle+',','').replace(handle,'');
                    //ls = ls.replace(handle,'');
                    if(ls != null){ 
                        ls = ls.split(',');
                    }
                    ls = jQuery.grep(ls, function(value) {
                        return value != handle;
                    });
                    //ls.splice($.inArray(handle ,ls),1);
                    ls  = $.trim(ls);
                    gl_Currency.cookie.teawrite('tea-compare',ls);
                    $('.gl_'+handle).remove();
                    
                    $('#compare-content .cat-label td').attr('colspan', $('#compare-content tr.remove td').length);
                    if(ls.length === 0 ) {
                        holder.find('tbody').html('<tr class="no-products odd"><td>'+theme.strings.no_compare+'</td></tr>');
                    }
                });

                function showAddMoreToCompare() {
                    compareNotification.find('.inner').text('Please add more that one product to compare.');
                    compareNotification.addClass('visible');
                }
                function showCompareFull() {
                    compareNotification.find('.inner').text('Only 3 products can be added to compare. Please remove one to add new.');
                    compareNotification.addClass('visible');
                }
                function hideCompareNorification() {
                    compareNotification.removeClass('visible');
                }
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Promo popup
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            promoPopup: function() {
                var promo_version = theme.basel_settings.promo_version;
                if( theme.basel_settings.enable_popup != 'yes' || ( theme.basel_settings.promo_popup_hide_mobile == 'yes' && $(window).width() < 768 ) ) return;
                var popup = $( '.nathan-promo-popup' ),
                    shown = false,
                    pages = $.cookie('basel_shown_pages');

                if( ! pages ) pages = 0;

                if( pages < theme.basel_settings.popup_pages) {
                    pages++;
                    $.cookie('basel_shown_pages', pages, { expires: 7, path: '/' } );
                    return false;
                }

                var showPopup = function() {
                    if ($('.nathan-promo-popup').length > 0) {
                        $.magnificPopup.open({
                            items: {
                                src: '.nathan-promo-popup'
                            },
                            type: 'inline',
                            removalDelay: 400, //delay removal by X to allow out-animation
                            callbacks: {
                                beforeOpen: function() {
                                    this.st.mainClass = 'basel-popup-effect';
                                },
                                open: function() {
                                // Will fire when this exact popup is opened
                                // this - is Magnific Popup object
                                },
                                close: function() {
                                    $.cookie('basel_popup_' + promo_version, 'shown', { expires: 7, path: '/' } );
                                }
                                // e.t.c.
                            }
                        });
                    }
                };

                if ( $.cookie('basel_popup_' + promo_version) != 'shown' ) {
                    if( theme.basel_settings.popup_event == 'scroll' ) {
                        $(window).scroll(function() {
                            if( shown ) return false;
                            if( $(document).scrollTop() >= theme.basel_settings.popup_scroll ) {
                                showPopup();
                                shown = true;
                            }
                        });
                    } else {
                        setTimeout(function() {
                            showPopup();
                        }, theme.basel_settings.popup_delay );
                    }
                }

                $('.basel-open-popup').on('click',function(){
                    showPopup();
                })
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Product video button
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            productVideo: function() {
                $('.product-video-button a').magnificPopup({
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    disableOn: false,
                    fixedContentPos: false
                });
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Product 360 button
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            product360Button: function() {
                $('.product-360-button a').magnificPopup({
                    type: 'inline',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    disableOn: false,
                    preloader: false,
                    fixedContentPos: false,
                    callbacks: {
                        open: function() {
                            $(window).resize()
                        },
                    },

                });
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Cookies law
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            cookiesPopup: function() {
                  var cookies_version = theme.basel_settings.cookies_version;
                if( $.cookie( 'basel_cookies_' + cookies_version ) == 'accepted' || $('.basel-cookies-popup').length < 1 ) return;
                var popup = $( '.basel-cookies-popup' );

                setTimeout(function() {
                    popup.addClass('popup-display');
                    popup.on('click', '.cookies-accept-btn', function(e) {
                        e.preventDefault();
                        acceptCookies();
                    })
                }, 2500 );

                var acceptCookies = function() {
                    popup.removeClass('popup-display').addClass('popup-hide');
                    $.cookie('basel_cookies_'+ cookies_version, 'accepted', { expires: 60, path: '/' } );
                };
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Google map
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            googleMap: function() {
                var gmap = $(".google-map-container-with-content");

                $(window).resize(function() {
                    gmap.css({
                        'height': gmap.find('.basel-google-map.with-content').outerHeight()
                    })
                });

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * mobile responsive navigation
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            // shopifyWrappTable: function() {

            //     var wooTable = $(".shopify .shop_table");

            //     var cartTotals = $(".shopify .cart_totals table");

            //     var wishList = $("#yith-wcwl-form .shop_table");

            //     wooTable.wrap("<div class='responsive-table'></div>");

            //     cartTotals.wrap("<div class='responsive-table'></div>");

            //     wishList.wrap("<div class='responsive-table'></div>");

            // },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Menu preparation
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            menuSetUp: function() {
                var hasChildClass = 'menu-item-has-children',
                    mainMenu = $('.basel-navigation').find('ul.menu'),
                    lis = mainMenu.find(' > li'),
                    openedClass = 'item-menu-opened';

                lis.has('.sub-menu-dropdown').addClass(hasChildClass);

                mainMenu.on('click', ' > .item-event-click.menu-item-has-children > a', function(e) {
                    e.preventDefault();
                    if(  ! $(this).parent().hasClass(openedClass) ) {
                        $('.' + openedClass).removeClass(openedClass);
                    }
                    $(this).parent().toggleClass(openedClass);
                });

                $(document).click(function(e) {
                    var target = e.target;
                    if ( $('.' + openedClass).length > 0 && ! $(target).is('.item-event-hover') && ! $(target).parents().is('.item-event-hover') && !$(target).parents().is('.' + openedClass + '')) {
                        mainMenu.find('.' + openedClass + '').removeClass(openedClass);
                        return false;
                    }
                });

                var menuForIPad = function() {
                    if( $(window).width() <= 1024 ) {
                        mainMenu.find(' > .item-event-hover').each(function() {
                            $(this).data('original-event', 'hover').removeClass('item-event-hover').addClass('item-event-click');
                        });
                    } else {
                        mainMenu.find(' > .item-event-click').each(function() {
                            if( $(this).data('original-event') == 'hover' ) {
                                $(this).removeClass('item-event-click').addClass('item-event-hover');
                            }
                        });
                    }
                };

                $(window).on('resize', menuForIPad);
            },
            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Keep navigation dropdowns in the screen
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            menuOffsets: function() {

                var $window = $(window),
                    $header = $('.main-header'),
                    mainMenu = $('.main-nav').find('ul.menu'),
                    lis = mainMenu.find(' > li.menu-item-design-sized');


                mainMenu.on('hover', ' > li', function(e) {
                    setOffset( $(this) );
                });

                var setOffset = function( li ) {

                    var dropdown = li.find(' > .sub-menu-dropdown'),
                        siteWrapper = $('.website-wrapper');


                    dropdown.attr('style', '');

                    var dropdownWidth = dropdown.outerWidth(),
                        dropdownOffset = dropdown.offset(),
                        screenWidth = $window.width(),
                        bodyRight = siteWrapper.outerWidth() + siteWrapper.offset().left,
                        viewportWidth = ( $('body').hasClass('wrapper-boxed') || $('body').hasClass('wrapper-boxed-small') ) ? bodyRight : screenWidth;

                        if( ! dropdownWidth || ! dropdownOffset ) return;

                        if( $('body').hasClass('rtl') && dropdownOffset.left <= 0 && li.hasClass( 'menu-item-design-sized' ) && ! $header.hasClass('header-vertical') ) {
                            // If right point is not in the viewport
                            var toLeft = - dropdownOffset.left;

                            dropdown.css({
                                right: - toLeft - 10
                            });

                            var beforeSelector = '.' + li.attr('class').split(' ').join('.') + '> .sub-menu-dropdown:before',
                                arrowOffset = toLeft + li.width()/2;

                        } else if( dropdownOffset.left + dropdownWidth >= viewportWidth && li.hasClass( 'menu-item-design-sized' ) && ! $header.hasClass('header-vertical') ) {
                            // If right point is not in the viewport
                            var toRight = dropdownOffset.left + dropdownWidth - viewportWidth;

                            dropdown.css({
                                left: - toRight - 10
                            });

                            var beforeSelector = '.' + li.attr('class').split(' ').join('.') + '> .sub-menu-dropdown:before',
                                arrowOffset = toRight + li.width()/2;

                        }

                        // Vertical header fit
                        if( $header.hasClass('header-vertical') ) {

                            var bottom = dropdown.offset().top + dropdown.outerHeight(),
                                viewportBottom = $window.scrollTop() + $window.outerHeight();

                            if( bottom > viewportBottom ) {
                                dropdown.css({
                                    top: viewportBottom - bottom - 10
                                });
                            }
                        }
                };

                lis.each(function() {
                    setOffset( $(this) );
                    $(this).addClass('with-offsets');
                });

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * One page menu
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            onePageMenu: function() {

                var scrollToRow = function(hash) {
                    var row = $('.vc_row#' + hash);

                    if( row.length < 1 ) return;

                    var position = row.offset().top;

                    $('html, body').stop().animate({
                        scrollTop: position - 150
                    }, 800, function() {
                        activeMenuItem(hash);
                    });
                };

                var activeMenuItem = function(hash) {
                    var itemHash;
                    $('.onepage-link').each(function() {
                        itemHash = $(this).find('> a').attr('href').split('#')[1];

                        if( itemHash == hash ) {
                            $('.onepage-link').removeClass('current-menu-item');
                            $(this).addClass('current-menu-item');
                        }

                    });
                };

                // $('body').on('click', '.onepage-link > a', function(e) {
                //     var $this = $(this),
                //         hash = $this.attr('href').split('#')[1];

                //     if( $('.gl_row#' + hash).length < 1 ) return;

                //     e.preventDefault();

                //     scrollToRow(hash);

                //     // close mobile menu
                //     $('.basel-close-side').trigger('click');
                // });

                if( $('.onepage-link').length > 0 ) {
                    $('.entry-content > .gl_row').waypoint(function() {
                        var hash = $(this).attr('id');
                        activeMenuItem(hash);
                    }, { offset: 0 });

                    $('.onepage-link').removeClass('current-menu-item');


                    // URL contains hash
                    // var locationHash = window.location.hash.split('#')[1];

                    // if(window.location.hash.length > 1) {
                    //     setTimeout(function(){
                    //         scrollToRow(locationHash);
                    //     }, 500);
                    // }

                }
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * mobile responsive navigation
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            mobileNavigation: function() {

                var body = $("body"),
                    mobileNav = $(".mobile-nav"),
                    wrapperSite = $(".website-wrapper"),
                    dropDownCat = $(".mobile-nav .site-mobile-menu .menu-item-has-children"),
                    elementIcon = '<span class="icon-sub-menu"></span>',
                    butOpener = $(".icon-sub-menu");

                dropDownCat.append(elementIcon);

                mobileNav.on("click", ".icon-sub-menu", function(e) {
                    e.preventDefault();
                    var el = $(this).closest( 'li' );
                    if ($(this).parent().hasClass("opener-page")) {
                        $(this).parent().removeClass("opener-page").find("> ul").slideUp(200);
                        $(this).parent().removeClass("opener-page").find("> .sub-menu-dropdown >.container > ul").slideUp(200);
                        $(this).parent().find('> .icon-sub-menu').removeClass("up-icon");
                    } else {
                        $(this).parent().addClass("opener-page").find("> ul").slideDown(200);
                        $(this).parent().addClass("opener-page").find(">.sub-menu-dropdown >.container > ul").slideDown(200);
                        $(this).parent().find('> .icon-sub-menu').addClass("up-icon");
                    }
                });
                body.on("click", ".mobile-nav-icon", function() {

                    if (body.hasClass("act-mobile-menu")) {
                        closeMenu();
                    } else {
                        openMenu();
                    }

                });

                body.on("click touchstart", ".basel-close-side", function() {
                    closeMenu();
                });

                function openMenu() {
                    body.addClass("act-mobile-menu");
                    wrapperSite.addClass("left-wrapp");
                    $('html').addClass('no-scrolling-ios');
                    $('body').addClass('no-scrolling-ios');
                }

                function closeMenu() {
                    body.removeClass("act-mobile-menu");
                    wrapperSite.removeClass("left-wrapp");
                    $('html').removeClass('no-scrolling-ios');
                    $('body').removeClass('no-scrolling-ios');
                }
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Simple dropdown for category select on search form
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            simpleDropdown: function() {
                $('.input-dropdown-inner').each(function() {
                    var dd = $(this);
                    var btn = dd.find('> a');
                     var input = dd.find('> input');
                    var list = dd.find('> ul'); //.dd-list-wrapper

                    $(document).click(function(e) {
                        var target = e.target;
                        if (dd.hasClass('dd-shown') && !$(target).is('.input-dropdown-inner') && !$(target).parents().is('.input-dropdown-inner')) {
                            hideList();
                            return false;
                        }
                    });

                    btn.on('click', function(e) {
                        e.preventDefault();
                        if (dd.hasClass('dd-shown')) {
                          hideList();
                        } else {
                          $('.input-dropdown-inner.dd-shown > ul').slideUp(100);
                          $('.input-dropdown-inner.dd-shown').removeClass('dd-shown');
                          showList();
                        }
                        return false;
                    });

                    list.on('click', 'a', function(e) {
                        e.preventDefault();
                        var value = $(this).data('val');
                        var label = $(this).text();
                        list.find('.current-item').removeClass('current-item');
                        $(this).parent().addClass('current-item');
                        if (value != 0) {
                            list.find('li:first-child').show();
                        } else if (value == 0) {
                            list.find('li:first-child').hide();
                        }
                       var form = $(this).closest('form.has-categories-dropdown');
                        form.attr('action','/search/collections/'+value);
                        btn.text(label);
                        input.val(value);
                        hideList();
                    });

                    function showList() {
                        dd.addClass('dd-shown');
                        list.slideDown(100);

                        // $(".dd-list-wrapper .basel-scroll").nanoScroller({
                        //     paneClass: 'basel-scroll-pane',
                        //     sliderClass: 'basel-scroll-slider',
                        //     contentClass: 'basel-scroll-content',
                        //     preventPageScrolling: false
                        // });
                    }

                    function hideList() {
                        dd.removeClass('dd-shown');
                        list.slideUp(100);
                    }
                });

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Function to make columns the same height
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            equalizeColumns: function() {

                $.fn.basel_equlize = function(options) {

                    var settings = $.extend({
                        child: "",
                    }, options);

                    var that = this;

                    if (settings.child != '') {
                        that = this.find(settings.child);
                    }

                    var resize = function() {

                        var maxHeight = 0;
                        var height;
                        that.each(function() {
                            $(this).attr('style', '');
                            //if ($(window).width() > 767 && $(this).outerHeight() > maxHeight)
                              if ($(this).outerHeight() > maxHeight)
                                maxHeight = $(this).outerHeight();
                        });

                        that.each(function() {
                          $(this).css({'height': maxHeight+"px" });
//                             $(this).css({
//                                 Height: maxHeight
//                             });
                        });

                    }

                    $(window).bind('resize', function() {
                        resize();
                    });
                    setTimeout(function() {
                        resize();
                    }, 200);
                    setTimeout(function() {
                        resize();
                    }, 500);
                    setTimeout(function() {
                        resize();
                    }, 800);
                }

                $('.equal-columns').each(function() {
                    $(this).basel_equlize({
                        child: ' [class*=col-] .product-element-top'
                    });
                });
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Enable masonry grid for blog
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            blogMasonry: function() {
                if (typeof($.fn.isotope) == 'undefined' || typeof($.fn.imagesLoaded) == 'undefined') return;
                var $container = $('.masonry-container');

                // initialize Masonry after all images have loaded
                $container.imagesLoaded(function() {
                    $container.isotope({
                        gutter: 0,
                        isOriginLeft: ! $('body').hasClass('rtl'),
                        itemSelector: '.blog-design-masonry, .blog-design-mask, .masonry-item'
                    });
                });

                $('.masonry-filter').on('click', 'a', function(e) {
                    e.preventDefault();
                    $('.masonry-filter').find('.filter-active').removeClass('filter-active');
                    $(this).addClass('filter-active');
                    var filterValue = $(this).attr('data-filter');
                    $container.isotope({
                        filter: filterValue
                    });
                });

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Load more button for blog shortcode
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            blogLoadMore: function() {

                $('.basel-blog-load-more').on('click', function(e) {
                    e.preventDefault();
                    var $this = $(this),
                        holder = $this.parent().siblings('.basel-blog-holder'),
                        tea_ajaxurl = $(this).attr('href');

                    $this.addClass('loading');

                    $.ajax({
                        url: tea_ajaxurl,
                        dataType: 'html',
                        type: 'GET',
                        success: function(data) {
                            data = jQuery(data);
                            var html = data.find('#tea_data_blog').html(),
                                data_status = data.find('#tea_data_arrow').attr("data-status"),
                                data_load_more = data.find('#tea_section_next').attr("href"),
                                items = $(html);
                                if( holder.hasClass('masonry-container') ) {
                                    // initialize Masonry after all images have loaded
                                    holder.append(items).isotope( 'appended', items );
                                    holder.imagesLoaded().progress(function() {
                                      holder.isotope('layout');
                                    });
                                } else {
                                    holder.append(html);
                                }
                              if( data_status == 'have-posts' ) {
                                   $this.attr("href", data_load_more);
                               } else {
                                   $this.hide();
                               }
                        },
                        error: function(data) {
                            console.log('ajax error');
                        },
                        complete: function() {
                            $this.removeClass('loading');
                        },
                    });

                });

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Load more button for products shortcode
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            productsLoadMore: function() {
               var process = false, intervalID;
                $('.basel-products-element').each(function() {
                    var $this = $(this),
                        // cache = [],
                        inner = $this.find('.basel-products-holder');

                    if( ! inner.hasClass('pagination-arrows') && ! inner.hasClass('pagination-more-btn') ) return;

                    // cache[1] = {
                    //     items: inner.html(),
                    //     status: 'have-posts'
                    // };

                    $this.on('recalc', function() {
                        calc();
                    });

                    if( inner.hasClass('pagination-arrows') ) {
                        $(window).resize(function() {
                            calc();
                        });
                    }

                    var calc = function() {
                        var height = inner.outerHeight();
                        $this.stop().css({height: height});
                    };

                    // sticky buttons

                    var body = $('body'),
                        btnWrap = $this.find('.products-footer'),
                        btnLeft = btnWrap.find('.basel-products-load-prev'),
                        btnRight = btnWrap.find('.basel-products-load-next'),
                        loadWrapp = $this.find('.basel-products-loader'),
                        scrollTop,
                        holderTop,
                        btnLeftOffset,
                        btnRightOffset,
                        holderBottom,
                        holderHeight,
                        holderWidth,
                        btnsHeight,
                        offsetArrow = 50,
                        offset,
                        windowWidth;

                    if( body.hasClass('rtl') ) {
                        btnLeft = btnRight;
                        btnRight = btnWrap.find('.basel-products-load-prev');
                    }

                    $(window).scroll(function() {
                        buttonsPos();
                    });

                    function buttonsPos() {

                        offset = $(window).height() / 2;

                        windowWidth = $(window).outerWidth(true) + 17;

                        holderWidth = $this.outerWidth(true) + 10;

                        scrollTop = $(window).scrollTop();

                        holderTop = $this.offset().top - offset;

                        btnLeftOffset = $this.offset().left - offsetArrow;

                        btnRightOffset = btnLeftOffset + holderWidth + offsetArrow;

                        btnsHeight = btnLeft.outerHeight();

                        holderHeight = $this.height() - 50 - btnsHeight;

                        holderBottom = holderTop + holderHeight;

                        if(windowWidth <= 1047 && windowWidth >= 992 || windowWidth <= 825 && windowWidth >= 768 ) {
                            btnLeftOffset += 18;
                            btnRightOffset -= 18;
                        }

                        if(windowWidth < 768 || body.hasClass('wrapper-boxed') || body.hasClass('wrapper-boxed-small') || $('.main-header').hasClass('header-vertical') ) {
                            btnLeftOffset += 51;
                            btnRightOffset -= 51;
                        }

                        btnLeft.css({
                            'left' : btnLeftOffset + 'px'
                        });

                        // Right arrow position for vertical header
                        // if( $('.main-header').hasClass('header-vertical') && ! body.hasClass('rtl') ) {
                        //     btnRightOffset -= $('.main-header').outerWidth();
                        // } else if( $('.main-header').hasClass('header-vertical') && body.hasClass('rtl') ) {
                        //     btnRightOffset += $('.main-header').outerWidth();
                        // }

                        btnRight.css({
                            'left' : btnRightOffset + 'px'
                        });


                        if (scrollTop < holderTop || scrollTop > holderBottom) {
                            btnWrap.removeClass('show-arrow');
                            loadWrapp.addClass('hidden-loader');
                        } else {
                            btnWrap.addClass('show-arrow');
                            loadWrapp.removeClass('hidden-loader');
                        }

                    };

                    // $this.find('.basel-products-load-more:not(.loading)').on('click', function(e) {
                    //     e.preventDefault();
                    //     var $this = $(this),
                    //         holder = $this.parent().siblings('.basel-products-holder'),
                    //         tea_ajaxurl = $(this).attr('href');
                    //     loadProducts(holder, tea_ajaxurl, $this, function(data) {
                    //         data = jQuery(data);
                    //         var html = data.find('#tea_data_products').html(),
                    //             data_status = data.find('#tea_data_arrow').attr("data-status"),
                    //             data_load_more = data.find('#tea_section_next').attr("href");
                    //         if( holder.hasClass('grid-masonry') ) {
                    //             isotopeAppend(holder, html);
                    //         } else {
                    //              holder.append(html);
                    //         }
                    //         if( data_status == 'have-posts' ) {
                    //             $this.attr("href", data_load_more);
                    //         } else {
                    //             $this.hide();
                    //         }
                    //     });
                    // });

                    $this.find('.basel-products-load-prev, .basel-products-load-next').on('click', function(e) {
                        e.preventDefault();
                        if (process) return;
                        process = true;
                        clearInterval(intervalID);

                        var $this = $(this),
                            holder = $this.parent().siblings('.basel-products-holder'),
                            next = $this.parent().find('.basel-products-load-next'),
                            prev = $this.parent().find('.basel-products-load-prev'),
                            tea_ajaxurl = $(this).attr('href');

                        loadProducts(holder, tea_ajaxurl, $this, function(data) {
                           data = jQuery(data);
                           var html = data.find('#tea_data_products').html(),
                                tea_url_prev = data.find('#tea_section_previous').attr('href'),
                                tea_class_prev = data.find('#tea_section_previous').attr('class'),
                                tea_url_nev = data.find('#tea_section_next').attr('href'),
                                tea_class_nev = data.find('#tea_section_next').attr('class');
                               // var pagination = data.find('#tea_data_arrow').html();
                               holder.addClass('basel-animated-products').html( html );
                               prev.attr({ href: tea_url_prev, class: tea_class_prev });
                               next.attr({ href: tea_url_nev, class: tea_class_nev });
                               // arrow.html( pagination );

                            // if( data.items ) {
                                // holder.html(data.items).attr('data-paged', paged);
                                holder.imagesLoaded().progress(function() {
                                    holder.parent().trigger('recalc');
                                    // $(window).trigger('rebuttonpos');
                                    // calc();
                                    // buttonsPos();
                                });

                                // buttonsPos();
                            // }

                            if( $(window).width() < 768 ) {
                                $('html, body').stop().animate({
                                    scrollTop: holder.offset().top - 150
                                }, 400);
                            }
                            var iter = 0;
                            intervalID = setInterval(function() {
                                holder.find('.product-grid-item').eq(iter).addClass('basel-animated');
                                iter++;
                            }, 100);
                        });

                    });
                });
               baselThemeModule.clickOnScrollButton(baselTheme.shopLoadMoreBtn, false);
              $(document).off('click', '.basel-products-load-more').on('click', '.basel-products-load-more', function(e) {
                e.preventDefault();
                if (process) return;
                process = true;
                var $this = $(this),
                    holder = $this.parent().siblings('.basel-products-holder'),
                    tea_ajaxurl = $(this).attr('href');
                loadProducts(holder, tea_ajaxurl, $this, function(data) {
                  data = jQuery(data);
                  var html = data.find('#tea_data_products').html(),
                      result = data.find('#shopify_result_count').html(),
                      data_status = data.find('#tea_data_arrow').attr("data-status"),
                      data_load_more = data.find('#tea_section_next').attr("href");
                  if( holder.hasClass('grid-masonry') ) {
                    isotopeAppend(holder, html);
                  } else {
                    holder.append(html);
                  }
                  if ($(".shopify-result-count").length > 0) {
                    $('.shopify-result-count').text(result);
                  }
                  holder.imagesLoaded().progress(function() {
                    baselThemeModule.clickOnScrollButton(baselTheme.shopLoadMoreBtn, true);
                  });
                  if( data_status == 'have-posts' ) {
                    $this.attr("href", data_load_more);
                  } else {
                    $this.hide().remove();
                  }
                });
              });

                var loadProducts = function(holder, ajaxurl, btn, callback) {

                    holder.addClass('loading').parent().addClass('element-loading');

                    btn.addClass('loading');

                    $.ajax({
                        dataType: "html",
                        type: 'GET',
                        url: ajaxurl,
                        success: function(data) {
                            callback( data );
                        },
                        error: function(data) {
                            console.log('ajax error');
                        },
                        complete: function() {
                            //countDown
                            baselThemeModule.countDownTimer();
                           //product review
                           baselThemeModule.gl_productreviews();
                           baselThemeModule.autoloadCompare();
                            holder.removeClass('loading').parent().removeClass('element-loading');
                            btn.removeClass('loading');
                          if (holder.hasClass('equal-columns')) {
                          holder.basel_equlize({
                              child: '> [class*=col-] .product-element-top'
                          });
                          }
                            //currency
                           baselThemeModule.gl_currency();
                            process = false;
                            // process = false;
                            // baselThemeModule.compare();
                        },
                    });
                };

                var isotopeAppend = function(el, items) {
                    // initialize Masonry after all images have loaded
                    var items = $(items);
                    el.append(items).isotope( 'appended', items );
                    el.isotope('layout');
                    setTimeout(function() {
                        el.isotope('layout');
                    }, 100);
                    el.imagesLoaded().progress(function() {
                        el.isotope('layout');
                    });
                };

            },

             /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Helper function that make btn click when you scroll page to it
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            clickOnScrollButton: function( btnClass, destroy ) {
                if( typeof $.waypoints != 'function' ) return;
                
                var $btn = $(btnClass);
                if( destroy ) {
                    $btn.waypoint('destroy');
                }

                $btn.waypoint(function(){
                    $btn.trigger('click');
                }, { offset: '100%' });
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Products tabs element AJAX loading
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            productsGalaxyTabs: function() {
              $("body").on("click", "ul.gl_tta-tabs-list li a, ul.tabs li a", function(b) {
                  b.preventDefault();
                  var c = $(this)
                    , d = c.closest(".tab-collection, .shopify-tabs")
                    , e = d.find("ul.gl_tta-tabs-list, ul.tabs");
                  e.find("li").removeClass("gl_active"),
                  d.find(".gl_tta-panel, .panel:not(.panel .panel)").removeClass("gl_active"),
                  c.closest("li").addClass("gl_active"),
                  d.find(c.attr("href")).addClass("gl_active")
              });
            },
            
            productsTabs: function() {
                //var process = false;

                $('.basel-products-tabs').each(function() {
                    var $this = $(this),
                        $inner = $this.find('.basel-tab-content'),
                        $nt_ajax = $this.find('.products_nt_ajax'),
                        cache = [];
                    // if( $inner.find('.owl-carousel').length < 1 ) {
                    //     cache[0] = {
                    //         html: $inner.html()
                    //     };
                    // }

                    $this.find('.products-tabs-title li').on('click', function(e) {
                        e.preventDefault();

                        var $this = $(this),
                            ajaxurl = $this.data('atts'),
                            index = $this.index();

                        //if( process || $this.hasClass('active-tab-title') ) return; process = true;

                        loadTab(ajaxurl, index, $inner, $this, cache,  function(data) {
                            // if( data.html ) {
                            //     $inner.html(data.html);
                            //     // baselThemeModule.btnsToolTips();
                            //     baselThemeModule.shopMasonry();
                            //     baselThemeModule.productsLoadMore();
                            // }
                            //data = jQuery(data);
                            $inner.html(data);
                            baselThemeModule.shopMasonry();
                            baselThemeModule.productsLoadMore();
                        });

                    });

                    var $nav = $this.find('.tabs-navigation-wrapper'),
                        $subList = $nav.find('ul'),
                        time = 300;

                    $nav.on('click', '.open-title-menu', function() {
                        var $btn = $(this);

                        if( $subList.hasClass('list-shown') ) {
                            $btn.removeClass('toggle-active');
                            $subList.removeClass('list-shown');
                        } else {
                            $btn.addClass('toggle-active');
                            $subList.addClass('list-shown');
                            setTimeout(function() {
                                $('body').one('click', function(e) {
                                    var target = e.target;
                                    if ( ! $(target).is('.tabs-navigation-wrapper') && ! $(target).parents().is('.tabs-navigation-wrapper')) {
                                        $btn.removeClass('toggle-active');
                                        $subList.removeClass('list-shown');
                                        return false;
                                    }
                                });
                            },10);
                        }

                    })
                    .on('click', 'li', function() {
                        var $btn = $nav.find('.open-title-menu'),
                            text = $(this).text();

                        if( $subList.hasClass('list-shown') ) {
                            $btn.removeClass('toggle-active').text(text);
                            $subList.removeClass('list-shown');
                        }
                    });

                });

                var loadTab = function(ajaxurl, index, holder, btn, cache, callback) {

                    btn.parent().find('.active-tab-title').removeClass('active-tab-title');
                    btn.addClass('active-tab-title')

                    // if( cache[index] ) {
                    //     holder.addClass('loading');
                    //     setTimeout(function() {
                    //         callback(cache[index]);
                    //         holder.removeClass('loading');
                    //         process = false;
                    //     }, 300);
                    //     return;
                    // }

                    holder.addClass('loading').parent().addClass('element-loading');

                    btn.addClass('loading');

                    $.ajax({
                        dataType: "html",
                        type: 'GET',
                        url: ajaxurl,
                        success: function(data) {
                            //cache[index] = data;
                            callback( data );
                        },
                        error: function(data) {
                            console.log('ajax error');
                        },
                        complete: function() {
                            //process = false;
                          if ($('.products_nt_ajax').hasClass('equal-columns')) {
                          $('.products_nt_ajax.equal-columns').basel_equlize({
                              child: ' [class*=col-] .product-element-top'
                          });
                          }
                            //countDown
                            baselThemeModule.countDownTimer();
                           //product review
                           baselThemeModule.gl_productreviews();
                           baselThemeModule.autoloadCompare();
                          holder.removeClass('loading').parent().removeClass('element-loading');
                            btn.removeClass('loading');
                           baselThemeModule.gl_currency();
                        },
                    });
                };
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Load more button for portfolio shortcode
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            // portfolioLoadMore: function() {

            //     if( typeof $.waypoints != 'function' ) return;

            //     var waypoint = $('.basel-portfolio-load-more.load-on-scroll').waypoint(function(){
            //             $('.basel-portfolio-load-more.load-on-scroll').trigger('click');
            //         }, { offset: '100%' }),
            //         process = false;

            //     $('.basel-portfolio-load-more').on('click', function(e) {
            //         e.preventDefault();

            //         if( process ) return;

            //         process = true;

            //         var $this = $(this),
            //             holder = $this.parent().parent().find('.basel-portfolio-holder'),
            //             source = holder.data('source'),
            //             action = 'basel_get_portfolio_' + source,
            //             ajaxurl = theme.ajaxurl,
            //             dataType = 'json',
            //             method = 'POST',
            //             timeout,
            //             atts = holder.data('atts'),
            //             paged = holder.data('paged');

            //         $this.addClass('loading');

            //         var data = {
            //             atts: atts,
            //             paged: paged,
            //             action: action
            //         };

            //         if( source == 'main_loop' ) {
            //             ajaxurl = $(this).attr('href');
            //             method = 'GET';
            //             data = {};
            //         }


            //         $.ajax({
            //             url: ajaxurl,
            //             data: data,
            //             dataType: dataType,
            //             method: method,
            //             success: function(data) {

            //                 var items = $(data.items);

            //                 if( items ) {
            //                     if( holder.hasClass('masonry-container') ) {
            //                         // initialize Masonry after all images have loaded
            //                         holder.append(items).isotope( 'appended', items );
            //                         holder.imagesLoaded().progress(function() {
            //                             holder.isotope('layout');

            //                             clearTimeout(timeout);

            //                             timeout = setTimeout(function() {
            //                                 $('.basel-portfolio-load-more.load-on-scroll').waypoint('destroy');
            //                                 waypoint = $('.basel-portfolio-load-more.load-on-scroll').waypoint(function(){
            //                                     $('.basel-portfolio-load-more.load-on-scroll').trigger('click');
            //                                 }, { offset: '100%' });
            //                             }, 1000);
            //                         });
            //                     } else {
            //                         holder.append(items);
            //                     }

            //                     holder.data('paged', paged + 1);

            //                     $this.attr('href', data.nextPage);
            //                 }

            //                 baselThemeModule.mfpPopup();

            //                 if( data.status == 'no-more-posts' ) {
            //                     $this.hide();
            //                 }

            //             },
            //             error: function(data) {
            //                 console.log('ajax error');
            //             },
            //             complete: function() {
            //                 $this.removeClass('loading');
            //                 process = false;
            //             },
            //         });

            //     });

            // },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Enable masonry grid for shop isotope type
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            shopMasonry: function() {
                if (typeof($.fn.isotope) == 'undefined' || typeof($.fn.imagesLoaded) == 'undefined') return;
                var $container = $('.elements-grid.grid-masonry');
                // initialize Masonry after all images have loaded
                $container.imagesLoaded(function() {
                    $container.isotope({
                        isOriginLeft: ! $('body').hasClass('rtl'),
                        itemSelector: '.category-grid-item, .product-grid-item',
                    });
                });

                // Categories masonry
                $(window).resize(function() {
                    $(".categories-masonry").each(function (index) {
                        var $catsContainer = $(this);
                        var colWidth = ( $catsContainer.hasClass( 'categories-style-masonry' ) )  ? '.category-grid-item' : '.col-md-3.category-grid-item' ;
                        $catsContainer.imagesLoaded(function() {
                            $catsContainer.isotope({
                                resizable: false,
                                isOriginLeft: ! $('body').hasClass('rtl'),
                                layoutMode: 'packery',
                                packery: {
                                    gutter: 0,
                                    columnWidth: colWidth
                                },
                                itemSelector: '.category-grid-item',
                                // masonry: {
                                    // gutter: 0
                                // }
                            });
                        });
                    });
                });

            },

            collectionMasonry: function() {
                if (typeof($.fn.isotope) == 'undefined' || typeof($.fn.imagesLoaded) == 'undefined') return;
                var $container = $('.elements-grid.grid-masonry');
                // initialize Masonry after all images have loaded
                $container.imagesLoaded(function() {
                    $container.isotope({
                        isOriginLeft: ! $('body').hasClass('rtl'),
                        itemSelector: '.category-grid-item, .product-grid-item',
                        layoutMode: 'fitRows',
                    });
                });
            },
            // Categories carousel
            shopcarousel: function() {
               if (typeof($.fn.owlCarousel) == 'undefined' || typeof($.fn.imagesLoaded) == 'undefined') return;
               $(".gl_carousel_data").each(function (index) {
                  var items_no = $(this).data('items'),
                     nav = $(this).data('nav'),
                     dots = $(this).data('dots'),
                     medium = $(this).data('medium'),
                       small = $(this).data('small'),
                     time = $(this).data('time'),
                     loop = $(this).data('loop'),
                     autoplay = $(this).data('autoplay'),
                     tablet = $(this).data('tablet') ? $(this).data('tablet') : 3,
                     mobile = $(this).data('mobile') ? $(this).data('mobile') : 2,
                     autoheight = $(this).data('autoheight');
                  var options = {
                        rtl: $('body').hasClass('rtl'),
                        items: items_no, 
                        responsive: {
                           992: { items: items_no },
                           768: { items: tablet },
                           480: { items: mobile },
                           // 0: { items: typeof small == 'undefined' ? 1:small }
                           0: { items: mobile }
                        },
                        autoplay: autoplay,
                        autoplayTimeout: time,
                        dots: dots,
                        nav: nav,
                        autoHeight: typeof autoheight == 'undefined' ? false:autoheight,
                        slideBy:  'page',
                        navText:false,
                        loop: loop,
                        mouseDrag: false,
                        touchDrag: false,
                        onRefreshed: function() {
                           $(window).resize();
                        },
                  };
                  $(this).owlCarousel(options);
               });
            },

            instagram: function() {
              $(".gl_instagram").each(function (index) {
                var user_name = $(this).data('username'),
                     limit = $(this).data('limit'),
                     target = $(this).data('target'),
                     img_size = $(this).data('size'),
                     ul_ins = $(this).find(".instagram-pics");
                    $.ajax({
                      url: 'https://api.teathemes.net/instagram?username='+user_name,
                      dataType: 'json',
                      type: 'GET',
                      success: function(responsive) {
                        var html = '',
                            img_url = null,
                            data = responsive.entry_data.ProfilePage[0].user.media.nodes;
                        $.each(data,function(index,element){
                          if(index >= limit ) return 0;
                          var img_url_150 = element.thumbnail_resources[0].src,
                            img_url_240 = element.thumbnail_resources[1].src,
                            img_url_320 = element.thumbnail_resources[2].src,
                            img_url_480 = element.thumbnail_resources[3].src,
                            img_url_640 = element.thumbnail_resources[4].src;
                          html += '<li><a href="//instagram.com/p/'+element.code+'" target="'+target+'"></a><div class="wrapp-pics"><img src="'+img_url_150+'" data-src="'+img_url_150+'" data-sizes="auto" data-srcset="'+img_url_150+' 150w,'+img_url_240+' 240w,'+img_url_320+' 320w,'+img_url_480+' 480w,'+img_url_640+' 640w" class="w__100 lazyload" alt="'+user_name+'"><div class="jas-wrap-lazy"></div><div class="hover-mask"></div></div></li>';
                        
                        });
                        ul_ins.html(html);
                      },
                      error: function(data) {
                        console.log('ajax error');
                      },
                      complete: function() {
                        baselThemeModule.ntInscarousel();
                      }
                    }); 
              });
            },

            inscarousel: function() {
               if (typeof($.fn.owlCarousel) == 'undefined' || typeof($.fn.imagesLoaded) == 'undefined') return;
               $(".ins-owl-carousel").each(function (index) {
                  var items_no = $(this).data('items'),
                     nav = $(this).data('nav'),
                     dots = $(this).data('dots'),
                     medium = $(this).data('medium'),
                     small = $(this).data('small'),
                     ex_small = $(this).data('exsmall'),
                     time = $(this).data('time'),
                     loop = $(this).data('loop'),
                     autoplay = $(this).data('autoplay');
                  var options = {
                        rtl: $('body').hasClass('rtl'),
                        items: items_no, 
                        responsive: {
                           979: { items: items_no },
                           768: { items: medium },
                           479: { items: small },
                           0: { items: ex_small  }
                        },
                        autoplay: autoplay,
                        autoplayTimeout: time,
                        dots: dots,
                        nav: nav,
                        autoHeight: true,
                        slideBy:  'page',
                        navText:false,
                        loop: loop,
                        onRefreshed: function() {
                           $(window).resize();
                        }
                  };
                  //$(this).addClass('owl-carousel');
                  $(this).owlCarousel(options);
               });
            },
              ntInscarousel: function() {
               if (typeof($.fn.owlCarousel) == 'undefined' || typeof($.fn.imagesLoaded) == 'undefined') return;
               $(".nt-ins-owl-carousel").each(function (index) {
                  var items_no = $(this).data('items'),
                     nav = $(this).data('nav'),
                     dots = $(this).data('dots'),
                     medium = $(this).data('medium'),
                     small = $(this).data('small'),
                     ex_small = $(this).data('exsmall'),
                     time = $(this).data('time'),
                     loop = $(this).data('loop'),
                     autoplay = $(this).data('autoplay');
                  var options = {
                        rtl: $('body').hasClass('rtl'),
                        items: items_no, 
                        responsive: {
                           979: { items: items_no },
                           768: { items: medium },
                           479: { items: small },
                           0: { items: ex_small  }
                        },
                        autoplay: autoplay,
                        autoplayTimeout: time,
                        dots: dots,
                        nav: nav,
                        autoHeight: false,
                        slideBy:  'page',
                        navText:false,
                        loop: loop,
                        onRefreshed: function() {
                           $(window).resize();
                        }
                  };
                  $(this).addClass('owl-carousel');
                  $(this).owlCarousel(options);
               });
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * MEGA MENU
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            sidebarMenu: function() {
                var heightMegaMenu = $(".widget_nav_mega_menu").height();
                var heightMegaNavigation = $(".categories-menu-dropdown").height();
                var subMenuHeight = $(".widget_nav_mega_menu ul > li.menu-item-design-sized > .sub-menu-dropdown, .widget_nav_mega_menu ul > li.menu-item-design-full-width > .sub-menu-dropdown");
                var megaNavigationHeight = $(".categories-menu-dropdown ul > li.menu-item-design-sized > .sub-menu-dropdown, .categories-menu-dropdown ul > li.menu-item-design-full-width > .sub-menu-dropdown");
                subMenuHeight.css(
                    "min-height", heightMegaMenu + "px"
                );

                megaNavigationHeight.css(
                    "min-height", heightMegaNavigation + "px"
                );
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Product thumbnail images & photo swipe gallery
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            productImages: function() {


                // Init photoswipe

                var currentImage,
                    $productGallery = $('.shopify-product-gallery'),
                    $mainImages = $('.shopify-product-gallery__wrapper'),
                    $thumbs = $productGallery.find('.thumbnails'),
                    currentClass = 'current-image',
                    gallery = $('.photoswipe-images'),
                    PhotoSwipeTrigger = '.basel-show-product-gallery',
                    galleryType = 'photo-swipe'; // magnific photo-swipe

                $thumbs.addClass('thumbnails-ready');

                if( $productGallery.hasClass( 'image-action-popup') ) {
                    PhotoSwipeTrigger += ', .shopify-product-gallery__image a';
                }

                $productGallery.on('click', '.shopify-product-gallery__image a', function(e) {
                    e.preventDefault();
                });

                $productGallery.on('click', PhotoSwipeTrigger, function(e) {
                    e.preventDefault();

                    currentImage = $(this).attr('href');

                    if( galleryType == 'magnific' ) {
                        $.magnificPopup.open({
                            type: 'image',
                            image: {
                                verticalFit: false
                            },
                            items: getProductItems(),
                            gallery: {
                                enabled: true,
                                navigateByImgClick: false
                            },
                        }, 0);
                    }

                    if( galleryType == 'photo-swipe' ) {

                        // build items array
                        var items = getProductItems();

                        callPhotoSwipe( getCurrentGalleryIndex(e), items );

                    }

                });

                $thumbs.on('click', '.image-link', function(e) {
                    e.preventDefault();

                    // if( $thumbs.hasClass('thumbnails-large') ) {
                    //     var index = $(e.currentTarget).index() + 1;
                    //     var items = getProductItems();
                    //     callPhotoSwipe(index, items);
                    //     return;
                    // }

                    // var href = $(this).attr('href'),
                    //     src  = $(this).attr('data-single-image'),
                    //     width = $(this).attr('data-width'),
                    //     height = $(this).attr('data-height'),
                    //     title = $(this).attr('title');

                    // $thumbs.find('.' + currentClass).removeClass(currentClass);
                    // $(this).addClass(currentClass);

                    // if( $mainImages.find('img').attr('src') == src ) return;

                    // $mainImages.addClass('loading-image').attr('href', href).find('img').attr('src', src).attr('srcset', src).one('load', function() {
                    //     $mainImages.removeClass('loading-image').data('width', width).data('height', height).attr('title', title);
                    // });

                });

                gallery.each(function() {
                    var $this = $(this);
                    $this.on('click', 'a', function(e) {
                        e.preventDefault();
                        var index = $(e.currentTarget).data('index') - 1;
                        var items = getGalleryItems($this, []);
                        callPhotoSwipe(index, items);
                    } );
                })

                var callPhotoSwipe = function( index, items ) {
                    var pswpElement = document.querySelectorAll('.pswp')[0];

                    if( $('body').hasClass('rtl') ) {
                        index = items.length - index - 1;
                        items = items.reverse();
                    }

                    // define options (if needed)
                    var options = {
                        // optionName: 'option value'
                        // for example:
                        index: index, // start at first slide
                        getThumbBoundsFn: function(index) {

                            // // get window scroll Y
                            // var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                            // // optionally get horizontal scroll

                            // // get position of element relative to viewport
                            // var rect = $target.offset();

                            // // w = width
                            // return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};

                        }
                    };

                    // Initializes and opens PhotoSwipe
                    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
                    gallery.init();
                };

                var getCurrentGalleryIndex = function( e ) {
                    if( $mainImages.hasClass('owl-carousel') )
                        return $mainImages.find('.owl-item.active').index();
                    else return $(e.currentTarget).parent().index();
                };

                var getProductItems = function() {
                    var items = [];

                    $mainImages.find('figure a img').each(function() {
                        var src = $(this).data('large_image'),
                            width = $(this).data('large_image_width'),
                            height = $(this).data('large_image_height'),
                            title = $(this).attr('title');
                            items.push({
                                src: src,
                                w: width,
                                h: height,
                                title: ( theme.product_images_captions == 'yes' ) ? title : false
                            });

                    });
                    return items;
                };

                var getGalleryItems = function( $gallery, items ) {
                    var src, width, height, title;

                    $gallery.find('a').each(function() {
                        src = $(this).attr('href');
                        width = $(this).data('width');
                        height = $(this).data('height');
                        title = $(this).attr('title');
                        if( ! isItemInArray(items, src) ) {
                            items.push({
                                src: src,
                                w: width,
                                h: height,
                                title: title
                            });
                        }
                    });
                    return items;
                };

                var isItemInArray = function( items, src ) {
                    var i;
                    for (i = 0; i < items.length; i++) {
                        if (items[i].src == src) {
                            return true;
                        }
                    }

                    return false;
                };

                /* Fix zoom for first item firstly */

                if( $productGallery.hasClass( 'image-action-zoom') ) {
                    var zoom_target   = $( '.shopify-product-gallery__image img' );
                    var image_to_zoom = zoom_target.find( 'img' );

                    // But only zoom if the img is larger than its container.
                    zoom_target.each(function() {
                      var $this = $(this);
                      if ( $this.attr( 'data-large_image_width' ) > $( '.shopify-product-gallery__image' ).width() ) {
                        $this.trigger( 'zoom.destroy' );
                        var zoom_parent = $this.closest('.shopify-product-gallery__image')
                        // zoom_parent.zoom({
                        //   url: $this.attr( 'data-large_image' ), 
                        //   touch: false
                        // });
                      }
                    });
                }

            },

            productImagesGallery: function() {


                var $mainImages = $('.shopify-product-gallery__image:eq(0) img'),
                    $thumbs = $('.images .thumbnails'), // magnific photo-swipe
                    $mainOwl;

                if( theme.product_gallery.images_slider ) {
                    initMainGallery();
                }

                if( theme.product_gallery.thumbs_slider.enabled && theme.product_gallery.images_slider ) {
                    initThumbnailsMarkup();
                    if( theme.product_gallery.thumbs_slider.position == 'left' && jQuery(window).width() > 991 ) {
                        initThumbnailsVertical();
                    } else {
                        initThumbnailsHorizontal();
                    }
                }
                function initMainGallery() {
                    $('.shopify-product-gallery__wrapper').addClass('owl-carousel').owlCarousel({
                        rtl: $('body').hasClass('rtl'),
                        items: 1,
                        autoplay: false,
                        dots: false,
                        nav: false,
                        autoheight: true,
                        navText:false,
                        loop: false,
                        animateOut: 'fadeOut',
                        onRefreshed: function() {
                            $(window).resize();
                        }
                    });

                    $mainOwl = $('.shopify-product-gallery__wrapper').owlCarousel();
                };

                function initThumbnailsMarkup() {
                    var markup = '';

                    $('.shopify-product-gallery__image').each(function() {
                        if( $(this).data('variant_id') != undefined && $(this).data('lenght') != undefined ) {
                           markup += '<img data-variant_id="' + $(this).data('variant_id') + '" data-lenght="' + $(this).data('lenght') + '" data-one="' + $(this).data('one') + '" data-two="' + $(this).data('two') + '" data-three="' + $(this).data('three') + '" src="' + $(this).data('thumb') + '" alt="' + $(this).data('alt') + '" data-image-id="' + $(this).data('id') + '"  />';
                        } else {
                           markup += '<img src="' + $(this).data('thumb') + '" alt="' + $(this).data('alt') + '" data-image-id="' + $(this).data('id') + '"  />';
                        }
                    });

                    $thumbs.append(markup);

                };

                function initThumbnailsVertical() {
                    $thumbs.slick({
                        slidesToShow: theme.product_gallery.thumbs_slider.items.vertical_items,
                        slidesToScroll: theme.product_gallery.thumbs_slider.items.vertical_items,
                        vertical: true,
                        verticalSwiping: true,
                        infinite: false,
                    });
                    $thumbs.on('click', 'img', function(e) {
                        var i = $(this).index();
                        $mainOwl.trigger('to.owl.carousel', i);
                    });

                    $mainOwl.on('changed.owl.carousel', function(e) {
                        var i = e.item.index;
                        $thumbs.slick('slickGoTo', i);
                        $thumbs.find('.active-thumb').removeClass('active-thumb');
                        $thumbs.find('img').eq(i).addClass('active-thumb');
                    });
                    $thumbs.find("img").eq(0).addClass("active-thumb");
                };

                function initThumbnailsHorizontal() {
                    $thumbs.addClass('owl-carousel').owlCarousel({
                        rtl: $('body').hasClass('rtl'),
                        items: theme.product_gallery.thumbs_slider.items.desktop,
                        responsive: {
                            979: {
                                items: theme.product_gallery.thumbs_slider.items.desktop
                            },
                            768: {
                                items: theme.product_gallery.thumbs_slider.items.desktop_small
                            },
                            479: {
                                items: theme.product_gallery.thumbs_slider.items.tablet
                            },
                            0: {
                                items: theme.product_gallery.thumbs_slider.items.mobile
                            }
                        },
                        dots:false,
                        nav: true,
                        // mouseDrag: false,
                        navText: false,
                    });
                    var $thumbsOwl = $thumbs.owlCarousel();

                    $thumbs.on('click', '.owl-item', function(e) {
                        var i = $(this).index();
                        $thumbsOwl.trigger('to.owl.carousel', i);
                        $mainOwl.trigger('to.owl.carousel', i);
                    });

                    $mainOwl.on('changed.owl.carousel', function(e) {
                        var i = e.item.index;
                        $thumbsOwl.trigger('to.owl.carousel', i);
                        $thumbs.find('.active-thumb').removeClass('active-thumb');
                        $thumbs.find('.owl-item').eq(i).addClass('active-thumb');
                    });
                    $thumbs.find(".owl-item").eq(0).addClass("active-thumb");
                };

                // Update first thumbnail on variation change

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Sticky details block for special product type
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            stickyDetails: function() {
                if( ! $('body').hasClass('basel-product-design-sticky') || ! $('body').hasClass('template-product')) return;
                 if ($( window ).width() <=768) {
                    var topOffset = 90;
                 } else {
                    var topOffset = 130;
                 }
                var details = $('.entry-summary'),
                    detailsInner = details.find('.summary-inner'),
                    detailsWidth = details.width(),
                    images = $('.product-images'),
                    thumbnails = images.find('.shopify-product-gallery__wrapper a'),
                    offsetThumbnils,
                    viewportHeight = $(window).height(),
                    imagesHeight = images.outerHeight(),
                    maxWidth = 600,
                    innerWidth,
                    detailsHeight = details.outerHeight(),
                    scrollTop = $(window).scrollTop(),
                    imagesTop =  images.offset().top,
                    detailsLeft =  details.offset().left + 15,
                    imagesBottom = imagesTop + imagesHeight;
                    if ($( window ).width() <=768) {
                       var detailsBottom = 350 + scrollTop + topOffset + detailsHeight;
                    } else {
                       var detailsBottom = scrollTop + topOffset + detailsHeight;
                    }
                details.css({
                    height: detailsHeight
                });

                $(window).resize(function() {
                    recalculate();
                });

                $(window).scroll(function() {
                    onscroll();
                    animateThumbnails();
                });

                images.imagesLoaded(function() {
                    recalculate();
                });
                function animateThumbnails() {
                    viewportHeight = $(window).height();
                    thumbnails.each(function(){
                        offsetThumbnils = $(this).offset().top;
                        if(scrollTop > (offsetThumbnils - viewportHeight + 20)) {
                           $(this).addClass('animate-images');
                        }

                    });
                }

                function onscroll() {
                    scrollTop = $(window).scrollTop();
                    detailsBottom = scrollTop + topOffset + detailsHeight;
                    detailsWidth = details.width();
                    detailsLeft =  details.offset().left + 15;
                    imagesTop =  images.offset().top;
                    imagesBottom = imagesTop + imagesHeight;

                    if (detailsWidth > maxWidth) {
                        innerWidth = (detailsWidth - maxWidth) / 2;
                        detailsLeft = detailsLeft + innerWidth;
                    }

                    // Fix after scroll the header
                    if( scrollTop + topOffset >= imagesTop ) {
                        details.addClass('block-sticked');

                        detailsInner.css({
                            top: topOffset,
                            left: detailsLeft,
                            width: detailsWidth,
                            position: 'fixed',
                            transform:'translateY(-20px)'
                        });
                    } else {
                        details.removeClass('block-sticked');
                        detailsInner.css({
                            top: 'auto',
                            left: 'auto',
                            width: 'auto',
                            position: 'relative',
                            transform:'translateY(0px)'
                        });
                    }



                    // When rich the bottom line
                    if( detailsBottom > imagesBottom ) {
                        details.addClass('hide-temporary');
                    } else {
                        details.removeClass('hide-temporary');
                    }
                };


                function recalculate() {
                    viewportHeight = $(window).height();
                    detailsHeight = details.outerHeight();
                    imagesHeight = images.outerHeight();

                    // If enought space in the viewport
                    if( detailsHeight < ( viewportHeight - topOffset ) ) {
                        details.addClass('in-viewport').removeClass('not-in-viewport');
                    } else {
                        details.removeClass('in-viewport').addClass('not-in-viewport');
                    }
                    onscroll();
                        animateThumbnails();
                };

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Use magnific popup for images
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            mfpPopup: function() {
                /*$('.image-link').magnificPopup({
                    type:'image'
                });*/

                $('.gallery').magnificPopup({
                    delegate: ' > a',
                    type: 'image',
                    image: {
                        verticalFit: true
                    },
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true
                    },
                });

                $('[data-rel="mfp"]').magnificPopup({
                    type: 'image',
                    image: {
                        verticalFit: true
                    },
                    gallery: {
                        enabled: false,
                        navigateByImgClick: false
                    },
                });

                $('[data-rel="mfp[projects-gallery]"]').magnificPopup({
                    type: 'image',
                    image: {
                        verticalFit: true
                    },
                    gallery: {
                        enabled: true,
                        navigateByImgClick: false
                    },
                });

                if ($('.jas-magnific-image').length > 0) {
                  $('.jas-magnific-image').magnificPopup({
                     type: 'image',
                     tLoading: '<div class="loader"><div class="loader-inner"></div></div>',
                     removalDelay: 500,
                     callbacks: {
                        beforeOpen: function() {
                           this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                           this.st.mainClass = this.st.el.attr('data-effect');
                        }
                     }
                  });
                }

                $(document).on('click', '.mfp-img', function() {
                    var mfp = jQuery.magnificPopup.instance; // get instance
                    mfp.st.image.verticalFit = !mfp.st.image.verticalFit; // toggle verticalFit on and off
                    mfp.currItem.img.removeAttr('style'); // remove style attribute, to remove max-width if it was applied
                    mfp.updateSize(); // force update of size
                });
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * shopify adding to cart
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            addToCart: function() {
              var timeoutNumber = 0;
              if( theme.add_to_cart_action == 'popup' ) {
                  var html = [
                      '<div class="added-to-cart">',
                          '<p>' + theme.strings.added_to_cart + '</p>',
                          '<a href="#" class="btn btn-style-link close-popup">' + theme.strings.continue_shopping + '</a>',
                          '<a href="/cart" class="btn btn-color-primary view-cart">' + theme.strings.view_cart + '</a>',
                      '</div>',
                  ].join("");
                  $.magnificPopup.open({
                      callbacks: {
                          beforeOpen: function() {
                              this.st.mainClass = baselTheme.popupEffect + '  cart-popup-wrapper';
                          },
                      },
                      items: {
                          src: '<div class="white-popup add-to-cart-popup popup-added_to_cart">' + html + '</div>',
                          type: 'inline'
                      }
                  });

                  $('.white-popup').on('click', '.close-popup', function(e) {
                      e.preventDefault();
                      $.magnificPopup.close();
                  });

              } else if( theme.add_to_cart_action == 'widget' ) {
                  clearTimeout(timeoutNumber);
                  if( $('.cart-widget-opener a').length > 0 ) {
                        if( $('body').hasClass('open_gl_quick_view') ) {
                           $.magnificPopup.close();
                        }
                      $('.cart-widget-opener a').trigger('click');
                  } else if( $('.shopping-cart a').length > 0 ) {
                     $('.shopping-cart .dropdown-wrap-cat').addClass('display-widget');

                     if( $('body').hasClass('open_gl_quick_view') ) {
                        $.magnificPopup.close();
                     }
                     if ($(window).scrollTop() > 100 && $('body').hasClass('enable-sticky-header') == false ){
                        $('html, body').animate({
                           scrollTop: 0
                        }, 1000);
                     }
                     timeoutNumber = setTimeout(function() {
                        $('.display-widget').removeClass('display-widget');
                     }, 3500 );

                  } else {
                     $('.main-header .dropdown-wrap-cat').addClass('display-widget');
                     if( $('body').hasClass('open_gl_quick_view') ) {
                        $.magnificPopup.close();
                     }
                     if ($(window).scrollTop() > 100 && $('body').hasClass('enable-sticky-header') == false ) {
                        $('html, body').animate({
                           scrollTop: 0
                        }, 1000);
                     }
                      timeoutNumber = setTimeout(function() {
                          $('.display-widget').removeClass('display-widget');
                      }, 3500 );
                  }
              }
               if( $('body').hasClass('open_gl_quick_view') ) {
                  $('body').removeClass('open_gl_quick_view');
               }
            },

            // Login before using wishlist
            loginWishlist: function() {
               if( theme.basel_settings.wishlist == 'no' ) return;
               var body = $("body");
               body.on('click', '.nitro_wishlist_login', function(event) {
                  event.preventDefault();
                  var $this = $(this);
                  $this.parent().addClass("feid-in");
                  var html = [
                      '<div class="added-to-cart">',
                          '<p>' + theme.strings.info_wishlist + '</p>',
                          '<a href="#" class="btn btn-style-link close-popup">' + theme.strings.continue_shopping + '</a>',
                          '<a href="/account/login" class="btn btn-color-primary view-cart">' + theme.strings.login + '</a>',
                      '</div>',
                  ].join("");
                  // Append new quantity selector then remove original
                  $.magnificPopup.open({
                      callbacks: {
                          beforeOpen: function() {
                              this.st.mainClass = baselTheme.popupEffect + '  cart-popup-wrapper';
                          },
                           close: function() {
                            $this.parent().removeClass("feid-in");
                           }
                      },
                      items: {
                          src: '<div id="login-wishlist" class="gl_login-wishlist white-popup add-to-cart-popup popup-added_to_cart">' + html + '</div>',
                          type: 'inline'
                      }
                  });

                  $('.gl_login-wishlist').on('click', '.close-popup', function(e) {
                      e.preventDefault();
                      $.magnificPopup.close();
                  });
                }); 
            },
            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * add class in wishlist
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            wishList: function() {
                if( theme.basel_settings.wishlist == 'no' ) return;
                var body = $("body");
                body.on("click", ".gl_add_wishlist > a", function(event) {
                    event.preventDefault();
                    var $this = $(this),
                        holder = $this.closest('.yith-wcwl-add-to-wishlist'),
                        pr_this = holder.find('.gl_add_wishlist'),
                        load = holder.find('.gl_adding_wishlist'),
                        remove = holder.find('.gl_remove_wishlist');

                    if (globalWishlistCounter >= 20){
                    $.magnificPopup.open({
                        items: {
                            src: '<div id="text-popup-anim"><p>Sorry but you may add only 20 products to your saved products</p></div>',
                            type: 'inline'
                        }
                        });
                        xhr.abort();
                    }
                    pr_this.hide();
                    load.show();
                    
                
                    var xhr = $.ajax({
                        url: 'https://nitro-wishlist.teathemes.net?shop='+ Shopify.shop,
                        type: 'POST',
                        cache: true,
                        data: $this.data(),
                        success: function(data,status) {
                            try{
                               data = $.parseJSON(data);
                            }
                            catch(ex){
                               //console.log(ex);
                            }
                            if(data.status == 'success' && status == 'success')
                            {
                            //    if ( data.data && data.ids){};
                               globalWishlistCounter = data.data.ids.length;
                               remove.show();
                               load.hide();
                               pr_this.hide();
                               $('.gl_count_wishlist').html(function(i, val) { return val*1+1 });
                            }else{
                               load.hide();
                               pr_this.show();
                               console.log('Error: '+data.message);
                            }
                        },
                        error: function(data) {
                            load.hide();
                            pr_this.show();
                            if(data.status==404) {
                               alert('This feature is not available because there is no  Nitro Wishlist app installed. Please install Nitro Wishlist app first  when using Wishlist in Shop.');
                            } else {
                               console.log('Error: '+data.message);
                            }
                        },
                    });
                });
            },
            // Remove wishlist
             removeWishlist: function() {
                if( theme.basel_settings.wishlist == 'no' ) return;
                var body = $("body");
                body.on("click", ".remove_popup", function(event){
                    $(this).closest('td.product-remove').find('.del_popup_wrapper').addClass("opened");
                });
                body.on("click", ".del_popup_wrapper", function(event){
                    if(event.target == this){
                        $(".del_popup_wrapper").removeClass("opened");
                    }
                });
                body.on("click", ".del_popup_cancel", function(event){
                    $(".del_popup_wrapper").removeClass("opened");
                });
                body.on("click", ".gl_remove_wishlist1 > a, .remove_from_wishlist", function(event) {
                    event.preventDefault();
                    var $this = $(this),
                        value = $(this).data('id');
                    $.ajax({
                        url: 'https://nitro-wishlist.teathemes.net?shop='+ Shopify.shop,
                        type: 'POST',
                        data: $this.data(),
                        // beforeSend: function(data){
                        //    $.blockUI({
                        //       message: null,
                        //       css: {
                        //         backgroundColor: '#fff',
                        //         opacity: 0.6
                        //       }
                        //     });
                        // },
                        success: function(data,status) {
                            try{
                               data = $.parseJSON(data);
                            }
                            catch(ex){
                               //console.log(ex);
                            }
                            if(data.status == 'success' && status == 'success') {
                                globalWishlistCounter = data.data.ids.length;
                                $('.gl_count_wishlist').html(function(i, val) { return val*1-1 });
                                $("#yith-wcwl-row-" + value).remove();
                                var rowCount = $('.wishlist_table > tbody > tr').length;
                                if (rowCount < 1) {
                                    $('.wishlist_table tbody').empty();
                                    $('.wishlist_table tbody').append('<tr><td colspan="6" class="wishlist-empty">'+ theme.strings.nowishlist +'</td>');
                                } 
                                // NITRO_WISHLIST_COUNT = data.data.ids.length;
                            } else {
                               console.log('Error: '+data.message);
                            }
                        },
                        error: function(data) {
                            $( '.loader' ).remove();
                            console.log('Error: '+data.message);
                        },
                        // complete: function() {
                        //     setTimeout(function() {
                        //       $.unblockUI();
                        //     }, 200);
                        // }
                    });
                    $(this).closest('td.product-remove').find('.del_popup_wrapper').removeClass("opened");
               });
            }, 

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Side shopping cart widget
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            cartWidget: function() {
                var widget = $('.cart-widget-opener'),
                    btn = widget.find('a'),
                    body = $('body');

                widget.on('click', 'a', function(e) {
                    e.preventDefault();

                    // if( ! theme.use_ajax_add_to_cart ) {
                    //     window.location.href = '/cart';
                    //     return;
                    // }

                    if( isOpened() ) {
                        closeWidget();
                    } else {
                        setTimeout( function() {
                            openWidget();
                        }, 10);
                    }

                });

                body.on("click touchstart", ".basel-close-side", function() {
                    if( isOpened() ) {
                        closeWidget();
                    }
                });

                body.on("click", ".widget-close", function( e ) {
                    e.preventDefault();
                    if( isOpened() ) {
                        closeWidget();
                    }
                });

                var closeWidget = function() {
                    $('.website-wrapper').removeClass('basel-wrapper-shifted');
                    $('body').removeClass('basel-cart-opened');
                };

                var openWidget = function() {
                    $('.website-wrapper').addClass('basel-wrapper-shifted');
                    $('body').addClass('basel-cart-opened');

                };

                var isOpened = function() {
                    return $('body').hasClass('basel-cart-opened');
                };
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Banner hover effect with jquery panr
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            bannersHover: function() {
                $(".promo-banner.hover-4").panr({
                    sensitivity: 20,
                    scale: false,
                    scaleOnHover: true,
                    scaleTo: 1.15,
                    scaleDuration: .34,
                    panY: true,
                    panX: true,
                    panDuration: 0.5,
                    resetPanOnMouseLeave: true
                });
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Parallax effect
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            parallax: function() {
                $('.parallax-yes').each(function() {
                    var $bgobj = $(this);
                    $(window).scroll(function() {
                        var yPos = -($(window).scrollTop() / $bgobj.data('speed'));
                        var coords = 'center ' + yPos + 'px';
                        $bgobj.css({
                            backgroundPosition: coords
                        });
                    });
                });

                $('.basel-parallax').each(function(){
                    var $this = $(this);
                    if($this.hasClass('spb_column')) {
                        $this.find('> .gl_column-inner').parallax("50%", 0.3);
                    } else {
                        $this.parallax("50%", 0.3);
                    }
                });

            },

            fullWidthRow: function() {
               var $elements = $('[data-sp-full-width="true"]');
               $.each($elements, function(key, item) {
                   var $el = $(this);
                   $el.addClass("sp_hidden");
                   var $el_full = $el.next(".sp_row-full-width");
                   if ($el_full.length || ($el_full = $el.parent().next(".sp_row-full-width")), $el_full.length) {
                       var el_margin_left = parseInt($el.css("margin-left"), 10),
                           el_margin_right = parseInt($el.css("margin-right"), 10),
                           offset = 0 - $el_full.offset().left - el_margin_left,
                           width = $(window).width();
                       if ($el.css({
                               position: "relative",
                               left: offset,
                               "box-sizing": "border-box",
                               width: $(window).width()
                           }), !$el.data("spStretchContent")) {
                           var padding = -1 * offset;
                           0 > padding && (padding = 0);
                           var paddingRight = width - padding - $el_full.width() + el_margin_left + el_margin_right;
                           0 > paddingRight && (paddingRight = 0), $el.css({
                               "padding-left": padding + "px",
                               "padding-right": paddingRight + "px"
                           })
                       }
                       $el.attr("data-sp-full-width-init", "true"), $el.removeClass("sp_hidden"), $(document).trigger("sp-full-width-row-single", {
                           el: $el,
                           offset: offset,
                           marginLeft: el_margin_left,
                           marginRight: el_margin_right,
                           elFull: $el_full,
                           width: width
                       })
                   }
               }), $(document).trigger("sp-full-width-row", $elements)
           },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Scroll top button
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            scrollTop: function() {
                //Check to see if the window is top if not then display button
                $(window).scroll(function() {
                    if ($(this).scrollTop() > 100) {
                        $('.scrollToTop').addClass('button-show');
                    } else {
                        $('.scrollToTop').removeClass('button-show');
                    }
                });

                //Click event to scroll to top
                $('.scrollToTop').click(function() {
                    $('html, body').animate({
                        scrollTop: 0
                    }, 800);
                    return false;
                });
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Quick View
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            quickViewInit: function() {
                var that = this;
                // Open popup with product info when click on Quick View button
                $(document).on('click', '.open-quick-view', function(e) {
                    e.preventDefault();
                    var url_quick = $(this).attr('data-get'),
                        btn = $(this);
                    btn.addClass('loading');
                    $('body').addClass('open_gl_quick_view')
                    that.quickViewLoad(url_quick,btn);
                });
            },

            quickViewLoad: function(url,btn) {
                $.ajax({
                    url: url,
                    dataType: 'html',
                    type: 'GET',
                    success: function(data) {
                        // Open directly via API
                        $.magnificPopup.open({
                            items: {
                                src: '<div class="mfp-with-anim white-popup popup-quick-view" id="content_quickview">' + data + '</div>', // can be a HTML string, jQuery object, or CSS selector
                                type: 'inline'
                            },
                            removalDelay: 500, //delay removal by X to allow out-animation
                            callbacks: {
                                beforeOpen: function() {
                                    this.st.mainClass = baselTheme.popupEffect;
                                },
                                open: function() {
                                    $('.product-images-slider_on').addClass('owl-carousel').owlCarousel({
                                       rtl: jQuery('body').hasClass('rtl'),
                                       items: 1, 
                                       dots:false,
                                       nav: true,
                                       animateOut: 'fadeOut',
                                       navText: false
                                     });
                                    baselThemeModule.countDownTimer(); //countDown
                                    baselThemeModule.gl_currency(); //currency
                                    baselThemeModule.autoloadCompare();
                                    setTimeout(function() {
                                          baselThemeModule.nanoScroller();
                                    }, 300);
                                    baselThemeModule.simpleDropdown();
                                     //product review
                                     if ($(".shopify-product-reviews-badge").length > 0 && theme.gl_productreviews ) {
                                        return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
                                     }
                                },
                                close: function() {
                                  $( '#content_quickview' ).empty();
                              }
                            },
                        });
                    },
                    complete: function() {
                        btn.removeClass('loading');
                    },
                    error: function() {
                      console.log('Quick view error');
                    },
                });
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Quick Shop
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            quickShop: function() {

                var btnSelector = '.btn-quick-shop';

                $(document).on('click', btnSelector, function( e ) {
                    e.preventDefault();

                    var $this = $(this),
                        $product = $this.parents('.product'),
                        $content = $product.find('.quick-shop-form'),
                        ajaxurl = $(this).attr('data-get'),
                        loadingClass = 'btn-loading';
                    if( $this.hasClass(loadingClass) ) return;


                    // Simply show quick shop form if it is already loaded with AJAX previously
                    if( $product.hasClass('quick-shop-loaded') ) {
                        $product.addClass('quick-shop-shown');
                        return;
                    }

                    $this.addClass(loadingClass);
                    $product.addClass('loading-quick-shop');

                    $.ajax({
                        url: ajaxurl,
                        dataType: 'html',
                        type: 'GET',
                        success: function(data) {

                            // insert variations form
                            $content.append(data);
                            if( theme.basel_settings.enable_variant_simple == 'yes' ){ baselThemeModule.simpleDropdown();}
                            baselThemeModule.gl_currency();
                            // $( '.variations_form' ).each( function() {
                            //     $( this ).wc_variation_form().find('.variations select:eq(0)').change();
                            // });
                            // $('.variations_form').trigger('wc_variation_form');
                            //$('body').trigger('basel-quick-view-displayed');
                            //baselThemeModule.swatchesVariations();
                            // baselThemeModule.btnsToolTips();

                        },
                        complete: function() {
                            $this.removeClass(loadingClass);
                            $product.removeClass('loading-quick-shop');
                            $product.addClass('quick-shop-shown quick-shop-loaded');
                        },
                        error: function() {
                          console.log('Quick Shop error');
                        },
                    });

                })

                .on('click', '.quick-shop-close', function() {
                    var $this = $(this),
                        $product = $this.parents('.product'),
                        $content = $product.find('.quick-shop-form');
                    // $product.removeClass('quick-shop-shown');
                    $product.removeClass('quick-shop-shown quick-shop-loaded');
                    $content.html('');

                });
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * ToolTips titles
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            // btnsToolTips: function() {

            //     $('.basel-tooltip, .product-actions-btns > a, .product-grid-item .add_to_cart_button, .quick-view a, .product-compare-button a, .product-grid-item .yith-wcwl-add-to-wishlist a').each(function() {
            //         $(this).find('.basel-tooltip-label').remove();
            //         $(this).addClass('basel-tooltip').prepend('<span class="basel-tooltip-label">' + $(this).text() +'</span>');
            //     });

            // },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Sticky footer: margin bottom for main wrapper
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            stickyFooter: function() {

                if( ! $('body').hasClass( 'sticky-footer-on' ) || $(window).width() < 991 ) return;

                var $footer = $('.footer-container'),
                    $footerContent = $footer.find('.main-footer, .copyrights-wrapper .container'),
                    footerHeight = $footer.outerHeight(),
                    $page = $('.main-page-wrapper'),
                    $doc = $(document),
                    $window = $(window),
                    docHeight = $doc.outerHeight(),
                    windowHeight = $window.outerHeight(),
                    position,
                    bottomSpace,
                    opacity;

                var footerOffset = function() {
                    $page.css({
                        marginBottom: $footer.outerHeight()
                    })
                };

                var footerEffect = function() {
                    position        = $doc.scrollTop();
                    docHeight       = $doc.outerHeight();
                    windowHeight    = $window.outerHeight();
                    bottomSpace     = ( docHeight - (position + windowHeight) );
                    footerHeight    = $footer.outerHeight();
                    opacity         = parseFloat( (bottomSpace ) / footerHeight).toFixed(5);

                    $footer.removeClass('footer-act-sticky');
                    // If scrolled to footer
                    if( bottomSpace > footerHeight ) return;

                    $footerContent.css({
                        opacity: (1 - opacity)
                    });

                    $footer.addClass('footer-act-sticky');

                };

                $window.on('resize', footerOffset);
                $window.on('scroll', footerEffect);

                $footer.imagesLoaded(function() {
                    footerOffset();
                });

            },
            swatchesOnGrid: function() {

                $('body').on('click', '.jas_swatch_on_img:not(.current-swatch)', function() {
                  var src, dtsrc, srcset;

                  var imageSrc = $(this).data('src'),
                      imagedtSrc = $(this).data('dtsrc'),
                      imageSrcset = $(this).data('srcset'),
                      aspectratio = $(this).data('aspectratio');

                  if( typeof imageSrc == 'undefined' ) return;

                  var product = $(this).parents('.product-grid-item'),
                      image = product.find('img').first(),
                      src_img = image.attr('data-chksrc');

                  $(this).parent().find('.current-swatch').removeClass('current-swatch');
                  $(this).addClass('current-swatch');
                  product.addClass('product-swatched');
                  src = imageSrc;
                  dtsrc= imagedtSrc;
                  srcset = imageSrcset;

                  if( src == src_img ) return;
                  product.addClass('loading-image');
                  image.attr('src', src).attr('data-src', dtsrc).attr('data-aspectratio', aspectratio).removeClass('lazyautosizes lazyloaded').addClass('lazyload lazypreload').removeClass('lazyautosizes lazyloaded').addClass('lazyload lazypreload').one('load', function() {
                    image.attr('data-chksrc', src);
                    product.removeClass('loading-image');
                  });

                });

              },
                swatchesOnBGGrid: function() {

                  $('body').on('click', '.jas_swatch_on_bg:not(.current-swatch)', function() {

                    var imagebg = $(this).data('bgset'),
                        imageSrc = $(this).data('src');

                    var product = $(this).parents('.jas-grid-item'),
                        image = product.find('.jas-pr-image-link'),
                        src_img = image.attr('data-chksrc');

                    $(this).parent().find('.current-swatch').removeClass('current-swatch');
                    $(this).addClass('current-swatch');
                    product.addClass('product-swatched');
                    if( imageSrc  == src_img ) return;
                    product.addClass('loading-image');
                    image.attr('data-bgset', imagebg).removeClass('lazyautosizes lazyloaded').addClass('lazyload lazypreload').imagesLoaded( { background: true }, function() {
                      image.attr('data-chksrc', imageSrc);
                      product.removeClass('loading-image');
                    });

                  });

                },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Ajax filters
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            ajaxFilters: function() {
                if( ! $('body').hasClass('basel-ajax-shop-on') ) return;

                var that = this,
                    products = $('.products');

                $('body').on('click', '.shopify-pagination a', function(e) {
                    scrollToTop();
                });

                $(document).pjax(baselTheme.ajaxLinks, '.main-page-wrapper', {
                    timeout: 5000,
                    fragment: '.main-page-wrapper',
                    scrollTo: false
                });


                $( document ).on( 'change', 'select.orderby', function() {
                    var form = $( '.x-ordering'),
                        valueSelected = $(this).find(':selected').data('value');
                    $.pjax({
                        container: '.main-page-wrapper',
                        timeout: 4000,
                        url: valueSelected,
                        fragment: '.main-page-wrapper',
                        scrollTo: false
                    });

                //    return false;
                });
                // $('.shopify-ordering' ).on( 'change', 'select.orderby', function() {
                //     //$( this ).closest( 'form' ).find('[name="_pjax"]').remove();
                //   $( this ).closest( 'form' ).submit();
                // });

                $(document).on('pjax:error', function(xhr, textStatus, error, options) {
                    console.log('pjax error ' + error);
                });

                $(document).on('pjax:start', function(xhr, options) {
                    $('body').addClass('basel-loading');
                });

                $(document).on('pjax:complete', function(xhr, textStatus, options) {
                    // var color_curent = $('.gl_color_filter li.with-swatch-color.chosen:first').data('filter');
                    // if (color_curent != undefined ) { 
                    //   $('.swatches-on-grid:not(.current-swatch) .bg_'+color_curent).trigger('click');
                    // }
                    if ($('#shopify-section-promo_banner_collection .promo-banner').length > 0) {
                     that.bannersHover();
                    }
                    that.gl_currency();
                    that.countDownTimer();
                    that.shopPageInit();
                    scrollToTop();
                    that.gl_productreviews();
                    $('body').removeClass('basel-loading');

                });

                $(document).on('pjax:end', function(xhr, textStatus, options) {

                    $('body').removeClass('basel-loading');

                });

                var scrollToTop = function() {
                    var scrollTo = $('.main-page-wrapper').offset().top - 100;

                    $('html, body').stop().animate({
                        scrollTop: scrollTo
                    }, 400);
                };

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * init shop page JS functions
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            shopPageInit: function() {
                // $('.shopify-ordering' ).on( 'change', 'select.orderby', function() {
                //     //$( this ).closest( 'form' ).find('[name="_pjax"]').remove();
                //   $( this ).closest( 'form' ).submit();
                // });
                this.shopMasonry();
              if( $('.products').hasClass('equal-columns')) {
                  setTimeout(function(){
                    $('.products.equal-columns').basel_equlize({
                      child: ' [class*=col-] .product-element-top'
                    });
                  }, 400);
                  setTimeout(function(){$('.grid-masonry').isotope('layout');}, 600);
                  setTimeout(function(){$('.grid-masonry').isotope('layout');}, 1000);
                }
                //this.filtersArea();
                this.categorysearch();
                //this.productHover();
                //this.ajaxSearch();
                this.compare();
                //this.autoloadCompare();
                //this.filterDropdowns();
                this.categoriesMenuBtns();
                this.categoriesAccordion();
                //this.shopifyPriceSlider();
                this.nanoScroller();
                 baselThemeModule.clickOnScrollButton( baselTheme.shopLoadMoreBtn , false );
                // $('.shopify-ordering' ).on( 'change', 'select.orderby', function() {
                //     //$( this ).closest( 'form' ).find('[name="_pjax"]').remove();
                //   $( this ).closest( 'form' ).submit();
                // });
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Add filters dropdowns compatibility
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            // filterDropdowns: function() {

            //     $('.basel-shopify-layered-nav').on('change', 'select', function() {
            //         var slug = $( this ).val();

            //         var href = $(this).data('filter-url').replace('BASEL_FILTER_VALUE', slug);

            //         $(this).siblings('.filter-pseudo-link').attr('href', href);

            //          var event;
            //          var pseudoLink = $(this).siblings('.filter-pseudo-link');

            //          //This is true only for IE,firefox
            //          if(document.createEvent){
            //          // To create a mouse event , first we need to create an event and then initialize it.
            //             event = document.createEvent("MouseEvent");
            //             event.initMouseEvent("click",true,true,window,0,0,0,0,0,false,false,false,false,0,null);
            //          }
            //          else{
            //             event = new MouseEvent('click', {
            //                 'view': window,
            //                 'bubbles': true,
            //                 'cancelable': true
            //             });
            //          }

            //          pseudoLink[0].dispatchEvent(event);
            //     });
            //  },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Back in history
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            backHistory: function() {
                history.go(-1);

                setTimeout(function(){
                    $('.filters-area').removeClass('filters-opened').stop().hide();
                    $('.open-filters').removeClass('btn-opened');
                    if( $(window).width() < 992 ) {
                        $('.basel-product-categories').removeClass('categories-opened').stop().hide();
                        $('.basel-show-categories').removeClass('button-open');
                    }
                }, 20);


            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Categories menu for mobile
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            categoriesMenu: function() {
                if( $(window).width() > 991 ) return;

                var categories = $('.basel-product-categories'),
                    subCategories = categories.find('li > ul'),
                    button = $('.basel-show-categories'),
                    time = 200;


                //this.categoriesMenuBtns();

                $('body').on('click','.icon-drop-category', function(){
                    if($(this).parent().find('> ul').hasClass('child-open')){
                        $(this).removeClass("basel-act-icon").parent().find('> ul').slideUp(time).removeClass('child-open');
                    }else {
                        $(this).addClass("basel-act-icon").parent().find('> ul').slideDown(time).addClass('child-open');
                    }
                });

                $('body').on('click', '.basel-show-categories', function(e) {
                    e.preventDefault();

                    if( isOpened() ) {
                        closeCats();
                    } else {
                        //setTimeout(function() {
                            openCats();
                        //}, 50);
                    }
                });

                $('body').on('click', '.basel-product-categories a', function(e) {
                    closeCats();
                    categories.stop().attr('style', '');
                });

                var isOpened = function() {
                    return $('.basel-product-categories').hasClass('categories-opened');
                };

                var openCats = function() {
                    $('.basel-product-categories').addClass('categories-opened').stop().slideDown(time);
                    $('.basel-show-categories').addClass('button-open');

                };

                var closeCats = function() {
                    $('.basel-product-categories').removeClass('categories-opened').stop().slideUp(time);
                    $('.basel-show-categories').removeClass('button-open');
                };
            },


            categoriesMenuBtns: function() {
                if( $(window).width() > 991 ) return;

                var categories = $('.basel-product-categories'),
                    subCategories = categories.find('li > ul'),
                    iconDropdown = '<span class="icon-drop-category"></span>';

                categories.addClass('responsive-cateogires');
                subCategories.parent().addClass('has-sub').prepend(iconDropdown);
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Categories toggle accordion
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            categoriesAccordion: function() {
                if( theme.categories_toggle == 'no' ) return;

                var $widget = $('.widget_product_categories'),
                    $list = $widget.find('.product-categories'),
                    $openBtn = $('<div class="basel-cats-toggle" />'),
                    time = 300;

                $list.find('.cat-parent').append( $openBtn );

                $list.on('click', '.basel-cats-toggle', function() {
                    var $btn = $(this),
                        $subList = $btn.prev();

                    if( $subList.hasClass('list-shown') ) {
                        $btn.removeClass('toggle-active');
                        $subList.stop().slideUp(time).removeClass('list-shown');
                    } else {
                        $subList.parent().parent().find('> li > .list-shown').slideUp().removeClass('list-shown');
                        $subList.parent().parent().find('> li > .toggle-active').removeClass('toggle-active');
                        $btn.addClass('toggle-active');
                        $subList.stop().slideDown(time).addClass('list-shown');
                    }
                });

                if( $list.find(' > li.current-cat.cat-parent, > li.current-cat-parent').length > 0 ) {
                    $list.find(' > li.current-cat.cat-parent, > li.current-cat-parent').find('> .basel-cats-toggle').click();
                }

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * shopify price filter slider with ajax
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            // shopifyPriceSlider: function() {

            //     // shopify_price_slider_params is required to continue, ensure the object exists
            //     if ( typeof shopify_price_slider_params === 'undefined' || $( '.price_slider_amount #min_price' ).length < 1 || ! $.fn.slider ) {
            //         return false;
            //     }

            //     // Get markup ready for slider
            //     $( 'input#min_price, input#max_price' ).hide();
            //     $( '.price_slider, .price_label' ).show();

            //     // Price slider uses jquery ui
            //     var min_price = $( '.price_slider_amount #min_price' ).data( 'min' ),
            //         max_price = $( '.price_slider_amount #max_price' ).data( 'max' ),
            //         current_min_price = parseInt( min_price, 10 ),
            //         current_max_price = parseInt( max_price, 10 );

            //     if ( $('.products').attr('data-min_price') && $('.products').attr('data-min_price').length > 0 ) {
            //         current_min_price = parseInt( $('.products').attr('data-min_price'), 10 );
            //     }
            //     if ( $('.products').attr('data-max_price') && $('.products').attr('data-max_price').length > 0 ) {
            //         current_max_price = parseInt( $('.products').attr('data-max_price'), 10 );
            //     }

            //     $( '.price_slider' ).slider({
            //         range: true,
            //         animate: true,
            //         min: min_price,
            //         max: max_price,
            //         values: [ current_min_price, current_max_price ],
            //         create: function() {

            //             $( '.price_slider_amount #min_price' ).val( current_min_price );
            //             $( '.price_slider_amount #max_price' ).val( current_max_price );

            //             $( document.body ).trigger( 'price_slider_create', [ current_min_price, current_max_price ] );
            //         },
            //         slide: function( event, ui ) {

            //             $( 'input#min_price' ).val( ui.values[0] );
            //             $( 'input#max_price' ).val( ui.values[1] );

            //             $( document.body ).trigger( 'price_slider_slide', [ ui.values[0], ui.values[1] ] );
            //         },
            //         change: function( event, ui ) {

            //             $( document.body ).trigger( 'price_slider_change', [ ui.values[0], ui.values[1] ] );
            //         }
            //     });

            //     setTimeout(function() {
            //         $( document.body ).trigger( 'price_slider_create', [ current_min_price, current_max_price ] );
            //     }, 10);
            // },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Filters area
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            filtersArea: function() {
                var filters = $('.filters-area'),
                    btn = $('.open-filters'),
                    time = 200;

                $('body').on('click', '.open-filters', function(e) {
                    e.preventDefault();

                    if( isOpened() ) {
                        closeFilters();
                    } else {
                        openFilters();
                    }

                });

                $('body').on('click', baselTheme.ajaxLinks, function() {
                    if( isOpened() ) {
                        closeFilters();
                    }
                });

                var isOpened = function() {
                    filters = $('.filters-area')
                    return filters.hasClass('filters-opened');
                };

                var closeFilters = function() {
                    filters = $('.filters-area')
                    filters.removeClass('filters-opened');
                    filters.stop().slideUp(time);
                    $('.open-filters').removeClass('btn-opened');
                };

                var openFilters = function() {
                    filters = $('.filters-area')
                    filters.addClass('filters-opened');
                    filters.stop().slideDown(time);
                    $('.open-filters').addClass('btn-opened');
                    setTimeout(function() {
                        baselThemeModule.nanoScroller();
                    }, time);
                };
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Ajax Search for products
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
             ajaxSearch: function() {
                if( theme.basel_settings.ajax_search == 'no' || theme.basel_settings.header_search_category == 'yes' ) return;
                var currentAjaxRequest = null,
                  search_form = $('form.basel-ajax-search');
                search_form.each(function() {
                  var input = $(this).find('input[name="q"]');
                  input.attr('autocomplete', 'off').bind('keyup', function() {
                    $('.autocomplete-suggestions').html('').hide();
                     var term = $(this).val(),
                        form = $(this).closest('form');
                     if (term.trim() == '') {
                         $('.autocomplete-suggestions').hide();
                     }else{
                        if( theme.basel_settings.ajax_search_product == 'yes' ) {
                           var searchURL = '/search?type=product&q=' + term;
                        } else {
                           var searchURL = '/search?q=' + term;
                        }
                        form.addClass('search-loading');
                        if (currentAjaxRequest != null) currentAjaxRequest.abort();
                        currentAjaxRequest = jQuery.get(searchURL + '&view=json', function(data) {
                           $('.autocomplete-suggestions').html(data);
                           setTimeout(function() {
                             form.removeClass('search-loading');    
                           }, 300);   
                        });
                       setTimeout(function() {
                         baselThemeModule.gl_currency();
                         $('.autocomplete-suggestions').show();    
                       }, 1500); 
                     }
                  });
               });
               $('body').bind('click', function(){
                  $('.autocomplete-suggestions').hide();
                  $('form#searchform').removeClass('search-loading');
              });
            },
            categorysearch: function() {
                if( theme.basel_settings.header_search_category == 'no' ) return;
               var currentAjaxRequest = null,
                  categories_form = $('form.has-categories-dropdown'),
                  input = categories_form.find('input[name="q"]');
               input.attr('autocomplete', 'off').bind('keyup', function() {
                 $('.autocomplete-suggestions').html('').hide();
                   var term = input.val(), categories = $('#product_cat').val();
                  var searchURL = '/search/collections/'+categories+'?type=product&q=' + term;
                  if (term.trim() == '') {
                     $('.autocomplete-suggestions').hide();
                  }else{
                     categories_form.addClass('search-loading');
                     if (currentAjaxRequest != null) currentAjaxRequest.abort();
                     currentAjaxRequest = jQuery.get(searchURL + '&view=json', function(data) {
                        $('.autocomplete-suggestions').html(data);
                        setTimeout(function() {
                          categories_form.removeClass('search-loading');    
                        }, 300);   
                     });
                     setTimeout(function() {
                         baselThemeModule.gl_currency();
                         $('.autocomplete-suggestions').show();    
                     }, 1500); 
                  }
               });
               $('body').bind('click', function(){
                  $('.autocomplete-suggestions').hide();
                  $('form#searchform').removeClass('search-loading');
               });
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Search full screen
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            searchFullScreen: function() {

                var body = $('body'),
                    searchWrapper = $('.basel-search-wrapper'),
                    offset = 0;

                if( ! searchWrapper.find('.searchform').hasClass('basel-ajax-search') && $('.search-button').hasClass('basel-search-dropdown') ) return;

                body.on('click', '.search-button > a', function(e) {
                    e.preventDefault();
                    if( $('.sticky-header.act-scroll').length > 0 ) {
                        searchWrapper = $('.sticky-header .basel-search-wrapper');
                    } else {
                        searchWrapper = $('.main-header .basel-search-wrapper');
                    }
                    if( isOpened() ) {
                        closeWidget();
                    } else {
                        setTimeout( function() {
                            openWidget();
                        }, 10);
                    }
                })


                body.on("click", ".basel-close-search, .main-header, .sticky-header, .topbar-wrapp, .main-page-wrapper", function(event) {

                    if ( ! $(event.target).is('.basel-close-search') && $(event.target).closest(".basel-search-wrapper").length ) return;

                    if( isOpened() ) {
                        closeWidget();
                    }
                });

                var closeWidget = function() {
                    $('body').removeClass('basel-search-opened');
                    searchWrapper.removeClass('search-overlap');
                };

                var openWidget = function() {
                    var bar = $('#wpadminbar').outerHeight();

                    var offset = $('.main-header').outerHeight() + bar;

                    if( ! $('.main-header').hasClass('act-scroll') ) {
                        offset += $('.topbar-wrapp').outerHeight();
                    }

                    if( $('.sticky-header').hasClass('header-clone') && $('.sticky-header').hasClass('act-scroll') ) {
                        offset = $('.sticky-header').outerHeight() + bar;
                    }

                    if( $('.main-header').hasClass('header-menu-top') && $('.header-spacing') ) {
                        offset = $('.header-spacing').outerHeight() + bar;
                    }


                    searchWrapper.css('top', offset);

                    $('body').addClass('basel-search-opened');
                    searchWrapper.addClass('search-overlap');
                    setTimeout(function() {
                        searchWrapper.find('input[type="text"]').focus();
                        $(window).one('scroll', function() {
                            if( isOpened() ) {
                                closeWidget();
                            }
                        });
                    }, 300);
                };

                var isOpened = function() {
                    return $('body').hasClass('basel-search-opened');
                };
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Login tabs for my account page
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            loginTabs: function() {
                var tabs = $('.basel-register-tabs'),
                    btn = tabs.find('.basel-switch-to-register'),
                    login = tabs.find('.col-login'),
                    register = tabs.find('.col-register'),
                    classOpened = 'active-register',
                    loginLabel = btn.data('login'),
                    registerLabel = btn.data('register');

                btn.click(function(e) {
                    e.preventDefault();

                    if( isShown() ) {
                        hideRegister();
                    } else {
                        showRegister();
                    }

                    var scrollTo = $('.main-page-wrapper').offset().top - 100;

                    if( $(window).width() < 768 ) {
                        $('html, body').stop().animate({
                            scrollTop: tabs.offset().top - 50
                        }, 400);
                    }
                });

                var showRegister = function() {
                    tabs.addClass(classOpened);
                    btn.text(loginLabel);
                };

                var hideRegister = function() {
                    tabs.removeClass(classOpened);
                    btn.text(registerLabel);
                };

                var isShown = function() {
                    return tabs.hasClass(classOpened);
                };
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Product accordion
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            productAccordion: function() {
                var $accordion = $('.tabs-layout-accordion');

                var time = 300;

                var hash  = window.location.hash;
                var url   = window.location.href;

                if ( hash.toLowerCase().indexOf( 'comment-' ) >= 0 || hash === '#reviews' || hash === '#tab-reviews' ) {
                    $accordion.find('.tab-title-reviews').addClass('active');
                } else if ( url.indexOf( 'comment-page-' ) > 0 || url.indexOf( 'cpage=' ) > 0 ) {
                    $accordion.find('.tab-title-reviews').addClass('active');
                } else {
                    $accordion.find('.basel-accordion-title').first().addClass('active');
                }

                $accordion.on('click', '.basel-accordion-title', function( e ) {
                    e.preventDefault();

                    var $this = $(this),
                        $panel = $this.siblings('.shopify-Tabs-panel');

                    if( $this.hasClass('active') ) {
                        $this.removeClass('active');
                        $panel.stop().slideUp(time);
                    } else {
                        $accordion.find('.basel-accordion-title').removeClass('active');
                        $accordion.find('.shopify-Tabs-panel').slideUp();
                        $this.addClass('active');
                        $panel.stop().slideDown(time);
                    }

                    $(window).resize();

                    setTimeout( function() {
                        $(window).resize();
                    }, time);

                } );
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Compact product layout
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            productCompact: function() {
                $(".product-design-compact .basel-scroll").nanoScroller({
                    paneClass: 'basel-scroll-pane',
                    sliderClass: 'basel-scroll-slider',
                    contentClass: 'basel-scroll-content',
                    preventPageScrolling: false
                });
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Sale final date countdown
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            countDownTimer: function() {

                $('.basel-timer').each(function() {
                   $(this).countdown($(this).data('end-date'), function(event) {
                        $(this).html(event.strftime(''
                            + '<span class="countdown-days">%-D <span>' + theme.basel_settings.countdown_days + '</span></span> '
                            + '<span class="countdown-hours">%H <span>' + theme.basel_settings.countdown_hours + '</span></span> '
                            + '<span class="countdown-min">%M <span>' + theme.basel_settings.countdown_mins + '</span></span> '
                            + '<span class="countdown-sec">%S <span>' + theme.basel_settings.countdown_sec + '</span></span>'));
                    });
                });
             },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Remove click delay on mobile
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            mobileFastclick: function() {

                if ('addEventListener' in document) {
                    document.addEventListener('DOMContentLoaded', function() {
                        FastClick.attach(document.body);
                    }, false);
                }

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Init nanoscroller
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            nanoScroller: function() {
                $(".basel-scroll").nanoScroller({
                    paneClass: 'basel-scroll-pane',
                    sliderClass: 'basel-scroll-slider',
                    contentClass: 'basel-scroll-content',
                    preventPageScrolling: false
                });

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Fix RTL issues
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            RTL: function() {
                if( ! $('body').hasClass('rtl') ) return;

                $(document).on("gl-full-width-row", function(event, el) {
                    var $rows = $( '[data-gl-full-width="true"]' );
                    $rows.each(function() {
                        var $this = $(this),
                            left = parseInt( $this.css("left"), 10 );

                        $this.css({
                            left: -left
                        });

                        if( $('.main-header').hasClass('header-vertical') ) {
                            var paddingLeft = $this.css('padding-left'),
                                paddingRight = $this.css('padding-right');

                            $this.css({
                                paddingLeft: paddingRight,
                                paddingRight: paddingLeft
                            });

                        }
                    });
                })
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Fix comments
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            // shopifyComments: function() {
            //     var hash  = window.location.hash;
            //     var url   = window.location.href;

            //     if ( hash.toLowerCase().indexOf( 'comment-' ) >= 0 || hash === '#reviews' || hash === '#tab-reviews' || url.indexOf( 'comment-page-' ) > 0 || url.indexOf( 'cpage=' ) > 0 ) {

            //         setTimeout(function() {
            //             window.scrollTo(0, 0);
            //         }, 1);

            //         setTimeout(function() {
            //             $('html, body').stop().animate({
            //                 scrollTop: $(hash).offset().top-100
            //             }, 400);
            //         }, 10);

            //     }
            // },
             autoloadCompare: function() {
              if( theme.basel_settings.compare == 'no' ) return;
                var ls = gl_Currency.cookie.tearead('tea-compare');
                 if(ls != null){ 
                  ls = ls.split(',');
                  ls.map(function(elem, index) {
                     $('[data-pid="'+elem+'"]' ).addClass('added').html('<span class="basel-tooltip-label">'+theme.strings.added_label+'</span>'+theme.strings.added_label);
                  });
                 }else{
                   ls = new Array();
                 }
             },
             gl_currency: function() {
                var gl_Currency_cookie = gl_Currency.cookie.read();
                if( gl_Currency_cookie == null || gl_Currency_cookie == theme.shop_currency ) return;
                Currency.convertAll(shopCurrency, gl_Currency.cookie.read());
             },
             gl_productreviews: function() {
                if(theme.gl_productreviews && $(".spr-badge").length > 0 ) {
                    $.getScript(window.location.protocol + "//productreviews.shopifycdn.com/assets/v4/spr.js");
                }
             },
             gl_save_note: function() {
              if(theme.basel_settings.save_note == 'yes') {
                // Save note anytime it's changed
                $(document.body).on('change', '#CartSpecialInstructions', function() {
                  var newNote = $(this).val(),
                      $widget = $('.widget_shopping_cart'),
                      $checkout = $('.checkout');
                  // Update the cart note in case they don't click update/checkout
                  $widget.addClass('removing-process');
                  $checkout.attr('disabled', 'disabled').css('pointer-events', 'none');
                  $.ajax({
                    type: 'POST',
                    url: '/cart/update.js',
                    data: 'note=' + baselThemeModule.attributeToString(newNote),
                    dataType: 'json',
                    success:function( cart ) {
                    },
                    error: function(XMLHttpRequest, textStatus) {
                      baselThemeModule.onError(XMLHttpRequest, textStatus);
                    },
                    complete: function() {
                      $widget.removeClass('removing-process');
                      $checkout.removeAttr("disabled").css('pointer-events', 'auto');
                    }
                  });
                });
              }
             },
             attributeToString: function(attribute) {
              if ((typeof attribute) !== 'string') {
                // Converts to a string.
                attribute += '';
                if (attribute === 'undefined') {
                  attribute = '';
                }
              }
              // Removing leading and trailing whitespace.
              return jQuery.trim(attribute);
            },
             
             /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Error functionality with AJAX
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            onError: function(XMLHttpRequest, textStatus) {
              // Shopify returns a description of the error in XMLHttpRequest.responseText.
              // It is JSON.
              // Example: {"description":"The product 'Amelia - Small' is already sold out.","status":500,"message":"Cart Error"}
              var data = eval('(' + XMLHttpRequest.responseText + ')');
              alert(data.message + '(' + data.status  + '): ' + data.description);
            },
            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Add from cart functionality with AJAX
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            AJAXFormAddToCart: function() {
                $( document ).on('click', '.ajax_form_cart', function(e) {
                    e.preventDefault();

                    if( ! theme.ability_add_to_cart ) {
                        // Only logged in user can add product to cart
                        window.location = '/account/login' + '?redirect=' + window.location.pathname;
                        return;
                    }
                    var $this = $(this);
                    $(this).attr('disabled', 'disabled').css('pointer-events', 'none').addClass('loading');

                    var variant_id = $this.closest('form').find('select[name="id"]').val(),
                        sku = $this.closest('form').find('select[name="id"] option[value="'+variant_id+'"]').data('sku'),
                        qry = $this.closest('form').find('input[name="quantity"]').val();

                    var data = {
                        quantity: qry, 
                        id:variant_id
                    };

                    if (sku) {
                        data['properties'] = {};
                        data['properties'][' '] = sku;
                    }
                    $.ajax({
                        type: 'POST',
                        url: '/cart/add.js',
                        data: data,
                        dataType: 'json',
                        success:function( cart ) {
                              $.get('/cart?view=json', function(data) {
                                /*optional stuff to do after success */
                                $('.widget_shopping_cart_content').html(data);
                              });
                              $.getJSON('/cart.js', function(cart) {
                                $(".cartCount").html(cart.item_count);
                                $(".basel-cart-subtotal >span").html(Shopify.formatMoney(cart.total_price, theme.moneyFormat));
                              });
                              baselThemeModule.gl_currency();
                              baselThemeModule.addToCart();
                        },
                        error: function(XMLHttpRequest, textStatus) {
                          baselThemeModule.onError(XMLHttpRequest, textStatus);
                        },
                        complete: function() {
                          $this.removeAttr("disabled").css('pointer-events', 'auto').removeClass("loading");
                        }
                    });
                })
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Add to cart functionality with AJAX
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            AJAXAddToCart: function() {


                var itemId = null;
                $(document).on('click', '.quantity_open_btn', function(event){
                    event.preventDefault();
                    $(this).parent().children( "div.shopify_quantity_wrapper" ).css("display", "flex");
                    $(this).toggleClass("button_used");
                });
                $( document ).on('click', '.ajax_add_to_cart', function(e) {
                    e.preventDefault();
                    if( ! theme.ability_add_to_cart ) {
                        // Only logged in user can add product to cart
                        window.location = '/account/login' + '?redirect=' + window.location.pathname;
                        return;
                    }
                    var $this = $(this),
                        variant_id = $this.data('pid'),
                        sku = $this.data('sku');
                    $(this).attr('disabled', 'disabled').css('pointer-events', 'none').addClass('loading');

                    var data = {id:variant_id};
                    if ($(this).parent().children("div.shopify_quantity").children("input[name=quantity]")) {
                        data['quantity'] = $(this).parent().children("div.shopify_quantity").children("input[name=quantity]").val();
                    }

                    if (sku) {
                        data['properties'] = {};
                        data['properties'][' '] = sku;
                    }
                    $.ajax({
                        type: 'POST',
                        url: '/cart/add.js',
                        data: data,
                        dataType: 'json',
                        success:function( cart ) {
                            $.get('/cart?view=json', function(data) {
                              /*optional stuff to do after success */
                              $('.widget_shopping_cart_content').html(data);
                            });
                            $.getJSON('/cart.js', function(cart) {
                              $(".cartCount").html(cart.item_count);
                              $(".basel-cart-subtotal >span").html(Shopify.formatMoney(cart.total_price, theme.moneyFormat));
                            });
                            baselThemeModule.gl_currency();
                            baselThemeModule.addToCart();
                        },
                        error: function(XMLHttpRequest, textStatus) {
                            baselThemeModule.onError(XMLHttpRequest, textStatus);
                        },
                        complete: function() {
                            $this.removeAttr("disabled").css('pointer-events', 'auto').removeClass("loading");
                        }
                        /*success:function( cart ) {
                            if (theme.use_ajax_add_to_cart) {
                                $($this).closest('td.product-add-to-cart').find('.shopify_quantity.quantity').css("display", "none");
                                // $('div.shopify_quantity')
                              $.get('/cart?view=json', function(data) {
                                   /*optional stuff to do after success */
                                   /*$('.widget_shopping_cart_content').html(data);
                                 });
                              $.getJSON('/cart.js', function(cart) {
                                $(".cartCount").html(cart.item_count);
                                $(".basel-cart-subtotal >span").html(Shopify.formatMoney(cart.total_price, theme.moneyFormat));
                              });
                              baselThemeModule.gl_currency();
                              if( $this.hasClass('add_compare') === false ){
                                 baselThemeModule.addToCart();
                              }
                              $this.removeAttr("disabled").css('pointer-events', 'auto').removeClass("ajax_add_to_cart loading").addClass('added_to_cart').text(theme.strings.view_cart).attr({ href:"/cart"});
                            }else{
                              window.location.href = '/cart';  
                            }
                        },
                        error: function(XMLHttpRequest, textStatus) {
                          $this.removeAttr("disabled").css('pointer-events', 'auto').removeClass("loading");
                          baselThemeModule.onError(XMLHttpRequest, textStatus);
                        }*/
                    });
                })
            },
            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Remove from cart functionality with AJAX
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            AJAXRemoveFromCart: function() {
                $( document ).on('click', '.widget_shopping_cart .remove', function(e) {
                    e.preventDefault();

                    var $this = $(this),
                        $widget = $('.widget_shopping_cart'),
                        remove_item = $this.data('remove_item'),
                        variant_id = $this.data('product_id');

                    $widget.addClass('removing-process');
                    $.ajax({
                        type: 'POST',
                        url: '/cart/change.js',
                        data:  'quantity=0&id='+variant_id,
                        dataType: 'json',
                        success:function( cart ) {
                          $.get('/cart?view=json', function(data) {
                               /*optional stuff to do after success */
                               $('.widget_shopping_cart_content').html(data);
                             });
                          $.getJSON('/cart.js', function(cart) {
                            $(".cartCount").html(cart.item_count);
                            $(".basel-cart-subtotal >span").html(Shopify.formatMoney(cart.total_price, theme.moneyFormat));
                          });
                          baselThemeModule.gl_currency();
                        },
                        error: function() {
                           baselThemeModule.onError(XMLHttpRequest, textStatus);
                        },
                        complete: function() {
                            $widget.removeClass('removing-process');
                        }
                    });
                })
            },
              

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Quantityt +/-
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            shopifyQuantity: function() {
              function ShopifyCartChange(variant_id, quantity, callback) {
                var params = {
                  type: 'POST',
                  url: '/cart/change.js',
                  data:  'quantity='+quantity+'&id='+variant_id,
                  dataType: 'json',
                  success: function(cart) {
                    if(!theme.use_ajax_add_to_cart) {
                        window.location.reload();
                        return;
                    }

                    if ((typeof callback) === 'function') {
                      callback(cart);
                    }
                    else {
//                       Shopify.onCartUpdate(cart);
                    }
                  },
                  error: function(XMLHttpRequest, textStatus) {
                     baselThemeModule.onError(XMLHttpRequest, textStatus);
                  }
                };
                jQuery.ajax(params);
              }
              function formatMoney(cents, format) {
                var value = '';
                var patt = /\{\{\s*(\w+)\s*\}\}/;
                var formatString = (format || '$');
                switch(formatString.match(patt)[1]) {
                case 'amount':
                  value = floatToString(cents/100.0, 2).replace(/(\d+)(\d{3}[\.,]?)/,'$1 $2');
                  break;
                case 'amount_no_decimals':
                  value = floatToString(cents/100.0, 0).replace(/(\d+)(\d{3}[\.,]?)/,'$1 $2');
                  break;
                case 'amount_with_comma_separator':
                  value = floatToString(cents/100.0, 2).replace(/\./, ',').replace(/(\d+)(\d{3}[\.,]?)/,'$1.$2');
                  break;
                }    
                return value;
              };
                        if ( ! String.prototype.getDecimals ) {
                    String.prototype.getDecimals = function() {
                        var num = this,
                            match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                        if ( ! match ) {
                            return 0;
                        }
                        return Math.max( 0, ( match[1] ? match[1].length : 0 ) - ( match[2] ? +match[2] : 0 ) );
                    }
                }
				
              $( document ).on( 'change keyup', '.custom-qty', function() {
              	var $this = $(this);
                var vid = $this.data('vid'),val = parseInt($this.val()), format = $this.data('format'),price = $this.data('price'), max = $this.attr('max');
                if(isNaN(val)) return 0;
                
                max = isNaN(parseInt(max)) ? 9999: parseInt(max);
                if(val > max )
                {
                	$this.attr('value', max).val(max);
                }
                val = (val > max) ? max : val;
                
                if(val == 0 ){
                	$this.closest('tr').remove();
                  	$this.closest('li').remove();
                }
                ShopifyCartChange(vid,val, function(res){
                	 $('.total .shopify-Price-amount, .order-total .shopify-Price-amount,.cart-subtotal .shopify-Price-amount,.basel-cart-subtotal .shopify-Price-amount').html(format.replace(/\{\{.*\}\}/,formatMoney(res.total_price)));
                  	$this.closest('tr').find('.product-subtotal .shopify-Price-amount').html(format.replace(/\{\{.*\}\}/,formatMoney(price * val)  ));
                  $('.cartCount').html(res.item_count);
                  baselThemeModule.gl_currency();
                });
              });
                $( document ).on( 'click', '.plus, .minus', function() {
                    // Get values
                    var $qty        = $( this ).closest( '.quantity' ).find( '.qty'),
                        currentVal  = parseFloat( $qty.val() ),
                        max         = parseFloat( $qty.attr( 'max' ) ),
                        min         = parseFloat( $qty.attr( 'min' ) ),
                        step        = $qty.attr( 'step' );

                    // Format values
                    if ( ! currentVal || currentVal === '' || currentVal === 'NaN' ) currentVal = 0;
                    if ( max === '' || max === 'NaN' ) max = '';
                    if ( min === '' || min === 'NaN' ) min = 0;
                    if ( step === 'any' || step === '' || step === undefined || parseFloat( step ) === 'NaN' ) step = 1;

                    // Change the value
                    if ( $( this ).is( '.plus' ) ) {
                        if ( max && ( currentVal >= max ) ) {
                            $qty.val( max );
                        } else {
                            $qty.val( ( currentVal + parseFloat( step )).toFixed( step.getDecimals() ) );
                        }
                    } else {
                        if ( min && ( currentVal <= min ) ) {
                            $qty.val( min );
                        } else if ( currentVal > 0 ) {
                            $qty.val( ( currentVal - parseFloat( step )).toFixed( step.getDecimals() ) );
                        }
                    }

                    // Trigger change event
                    $qty.trigger( 'change' );
                });

            },

            showcaseGet: function() {
                var tab = $('#tab-showcase .shogun-root');
                if (tab.length > 0 ) {
                    var tabGet = tab.html().trim();

                    if (tab && tabGet === '') {
                        $('.sp-tabs li.showcase_tab').hide();
                        $('.sp-tabs li.showcase_tab').removeClass('active');
                        setTimeout(function(){
                            $('.sp-tabs li:visible:first a').click();
                          }, 1000);
                    }
                }
            }
        }
    }());

})(jQuery);


jQuery(document).ready(function() {

    baselThemeModule.init();
  $( ".menu-section .menu-item-has-children" ).hover(function() {
      var $this = $(this);
        //clearTimeout(timer);
      $this.addClass('nt_hover');
    }, function(){
      var $this = $(this);
      timer = setTimeout(function(){
       $this.removeClass('nt_hover');
     }, 100); 
  });

  // add target to href
  $('.site-navigation a, .menu-mobile-nav-container a').each(function () {
    if ($(this).attr('href').indexOf('configurator') != -1) {
        $(this).attr('target', '_blank');
    }
  });

});
jQuery( window ).load( function() {
    baselThemeModule.shopMasonry();
});


function displayErrors (errors, passWrap) {
    var errHTML = '';
    if (Array.isArray(errors)) {
      errors.forEach(function (err) {
        if (err.message) {
          errHTML += "<div class='error-item alert alert-danger'>"+err.message+"</div>";
        } else {
          errHTML += "<div class='error-item alert alert-danger'>"+err+"</div>";
        }
      });
    } else if (typeof errors == 'string') {
      errHTML = "<div class='error-item alert alert-danger'>"+errors+"</div>";;
    } else {
      Object.keys(errors).forEach(function (errKey) {
        errHTML += "<div class='error-item alert alert-danger'>"+errKey + ' '+errors[errKey]+"</div>";
      });
    }
    $(passWrap).html(errHTML);
}

function displaySuccess(message, passWrap) {
    $(passWrap).html("<div class='alert alert-success'>"+message+"</div>");
}

function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function showLoginErrors(errorObj) {
    Object.keys(errorObj).forEach(function (elementSelector) {
        $("<span class='error-item alert alert-danger'>"+errorObj[elementSelector]+"</span>")
            .insertAfter('#'+elementSelector);
    });
}

function logoutUser () {
    $.ajax({
        type: "GET",
        url: '/account/logout',
    });
}

function storeUserCredential (data) {
    window.localStorage.setItem('user', JSON.stringify({
        email: data.email,
        pass: data.pass,
    }));
}


$(function(){
    $('.product-related-documentation-scroll-to').on('click', function(e){
        e.preventDefault();
        var $header = $('header.main-header');
        var scrollToPos = $('#product-related-documentation').offset().top - ($header.height() + $header.offset().top);
        $(window).scrollTop(scrollToPos);
    });
});

function getAceessToken(data, onSucess) {
    if(typeof onSucess === 'undefined') {
        var onSucess = null
    }
    var mutation = "\n mutation {\n customerAccessTokenCreate(input: {\n email: \""+data.email+"\"\n password: \""+data.pass+"\"\n }){\n          customerAccessToken {\n accessToken\n expiresAt\n }\n }\n }\n";

    $.ajax({
        type:"POST",
        url: window.location.origin + '/api/graphql',
        dataType: 'json',
        crossDomain: true,
        headers: {
            "X-Shopify-Storefront-Access-Token": storefrontToken,
            'Content-Type': 'application/graphql',
        },
        data: mutation,
        success: function(response){
            if (response.data.customerAccessTokenCreate.customerAccessToken && response.data.customerAccessTokenCreate.customerAccessToken.accessToken) {
                var accessToken = response.data.customerAccessTokenCreate.customerAccessToken.accessToken
                localStorage.setItem('accessToken', accessToken);
            }
            if (onSucess) onSucess();
        },
        error: function(data){
            console.log(data);
        }
    });
}

var handleAjax = function (url, data, method, onSucess, onComplete, onError) {
    if(typeof onSucess === 'undefined') {
        var onSucess = null
    } else if(typeof onComplete === 'undefined') {
        var onComplete = null
    } else if(typeof onError === 'undefined') {
        var onError = null
    }
    $.ajax({
        type: method,
        dataType: 'json',
        crossDomain: true,
        url: url,
        data: data,
        success: function (resp) {
            if (onSucess)
                onSucess(resp)
        },
        error: function (error) {
            if (onError)
                onError(error);
        },
        complete: function () {
            if (onComplete)
                onComplete();
        }
    });
}


$('.close-cancel-wrap').on('click', function () {
    var parent = $(this).closest('.cancelWrap');
    parent.removeClass('visible')
});

window.FilterUpdater = function() {
    var FilterUpdater = {
        itemsToAppendIn: {
            'ais-facet-meta.specifications.weight_capacity_kg': 'Weight Capacity',
            'ais-facet-meta.specifications.product_dimensions_inch_width': 'Product Dimensions Width',
            'ais-facet-meta.specifications.product_dimensions_inch_height': 'Product Dimensions Height',
            'ais-facet-meta.specifications.product_dimensions_inch_depth': 'Product Dimensions Depth',
            'ais-facet-meta.specifications.mounting_pattern_inch_width': 'Mounting Pattern Width',
            'ais-facet-meta.specifications.mounting_pattern_inch_height': 'Mounting Pattern Height'
        },

        jqDomItemsToAppendIn: [],

        pairItems: [
            'ais-facet-meta.specifications.weight_capacity_lb',
            'ais-facet-meta.specifications.product_dimensions_mm_width',
            'ais-facet-meta.specifications.product_dimensions_mm_height',
            'ais-facet-meta.specifications.product_dimensions_mm_depth',
            'ais-facet-meta.specifications.mounting_pattern_mm_width',
            'ais-facet-meta.specifications.mounting_pattern_mm_height'
        ],

        jqDomPairItems: [],

        init: function() {
            this.jqDomItemsToAppendIn = this.initJqItemsToAppendIn();
            this.jqDomPairItems = this.initJqPairItems();
            this.updateAppendViews();
            this.CompatibilityFilterUpdater.init();
            this.VesaFilterUpdater.init();
        },

        initJqItemsToAppendIn: function() {
            var jqDomItemsToAppendIn = []
            for(var k in this.itemsToAppendIn) {
                var item = document.getElementsByClassName(k)[0];
                if(typeof item === 'object') {
                    item.dataset.title = this.itemsToAppendIn[k];
                    jqDomItemsToAppendIn.push($(item));
                }
            }
            return jqDomItemsToAppendIn;
        },

        initJqPairItems: function() {
            var jqDomPairItems = []
            for(var k in this.pairItems) {
                var item = document.getElementsByClassName(this.pairItems[k])[0];
                if(typeof item === 'object') {
                    item.classList.add('hidden');
                    item.querySelector('.ais-facet--header').classList.add('hidden');
                    jqDomPairItems.push($(item));
                }
            }
            return jqDomPairItems;
        },

        updateAppendViews: function() {
            for(var k in this.jqDomItemsToAppendIn) {
                if(typeof this.pairItems[k] !== 'undefined') {
                    this.updateTitle(this.jqDomItemsToAppendIn[k]);
                    this.addAndInitRadio(this.jqDomItemsToAppendIn[k], this.jqDomPairItems[k], this.pairItems[k]);
                }
            }
        },

        updateTitle: function($elem) {
            $elem.find('.ais-facet--header').text($elem.data().title);
        },

        addAndInitRadio: function($elem, $pairElem, name) {
            if(name.indexOf('weight_capacity_lb') !== -1) {
                $elem.find('.ais-facet--header').after(this.radioTemplate(name, 'kg', 'lb'));
            } else {
                $elem.find('.ais-facet--header').after(this.radioTemplate(name, 'in', 'cm'));
            }
            this.initRadioChange($elem, $pairElem, name);
        },


        radioTemplate: function(name, label1Title, label2Title) {
            if(this.isMetric(name.replace('ais-facet-', ''))) {
                return '<div class="ais-facet--radio-wrapper clearfix">\
                <div class="col-xs-5 ais-facet--radio-item radio first-radio"><label>\
                <input class="radio-tabs" type="radio" name="'+ name +'">\
                <i></i><span>'+ label1Title +'</span></label></div>\
                <div class="col-xs-5 col-xs-offset-2 ais-facet--radio-item radio last-radio"><label>\
                <input class="radio-tabs" type="radio" name="'+ name +'" checked>\
                <i></i><span>'+ label2Title +'</span></label></div>\
                </div>';
            } else {
                return '<div class="ais-facet--radio-wrapper clearfix">\
                <div class="col-xs-5 ais-facet--radio-item radio first-radio"><label>\
                <input class="radio-tabs" type="radio" name="'+ name +'" checked>\
                <i></i><span>'+ label1Title +'</span></label></div>\
                <div class="col-xs-5 col-xs-offset-2 ais-facet--radio-item radio last-radio"><label>\
                <input class="radio-tabs" type="radio" name="'+ name +'">\
                <i></i><span>'+ label2Title +'</span></label></div>\
                </div>';
            }
        },

        showActiveWeightCapacity: function() {
            var $weightCapacity = $(document.getElementsByClassName('ais-facet-meta.specifications.weight_capacity_kg'));
            $weightCapacity.find('[data-reactroot]').css('display', '');
        },

        initRadioChange: function($elem, $pairElem, name) {
            if(this.isMetric(name.replace('ais-facet-', ''))) {
                $elem.find('.ais-facet--body').addClass('hidden');
                $pairElem.removeClass('hidden');
            }
            this.showActiveWeightCapacity();
            $elem.find('.radio-tabs').on('change', function(){
                this.removeActiveFilter($elem.data().title);
                $elem.find('.ais-facet--body').toggleClass('hidden');
                $pairElem.toggleClass('hidden');
                this.showActiveWeightCapacity();
            }.bind(this));

            
                if(name.indexOf('weight_capacity_lb') !== -1) {
                    $elem.find('.radio-tabs').last().click();
                }
            
        },

        removeActiveFilter: function(title) {
            $('.ais-current-refined-values--label').each(function(key, item) {
                if(item.innerText.toLowerCase().indexOf(title.toLowerCase()) !== -1) {
                    $(item).parent().trigger('click');
                }
            });
        },

        isMetric: function(mm_val) {
            return window.location.href.toLowerCase().indexOf(mm_val) !== -1
        },

        CompatibilityFilterUpdater: {
            compatibilityWrapper: 'ais-facet-named_tags.SKU',
            $compatibilityWrapper: null,
            $template: null,
            COMPATIBILITY_TAG: 'named_tags.SKU',
            mainPageWrapper: '.main-page-wrapper',
            currentFilter: '.current_named_tags_sku',
            monitor: undefined,

            init: function() {
                this.monitor = $.cookie('mountsForMonitor');
                this.initJqObj();
                // this.render();
                // this.initEvents();
                this.attachHeading();
                if(this.getMonitor() !== null) {
                    $('.ais-results-as-block').addClass('loading-compatibility');
                }
                // this.hideCompatibility();
                // if(this.$template.find('[type="checkbox"]')[0].checked === false) {
                //     $('.search-mountfinder-results').remove();
                // }
            },

            initJqObj: function() {
                var obj = document.getElementsByClassName(this.compatibilityWrapper);
                if(typeof obj !== 'undefined') {
                    this.$compatibilityWrapper = $(obj);
                }
                this.$template = $(this.compatibilityTemplate());
            },

            getMonitor: function() {
                var monitor = $.cookie('mountsForMonitor');
                if(typeof monitor !== 'undefined') {
                    try {
                        return JSON.parse(monitor);
                    } catch(e) {
                        console.error(e);
                    }
                }
                return null;
            },

            render: function() {
                if(typeof this.monitor !== 'undefined') {
                    this.$compatibilityWrapper.append(this.$template);
                }
            },

            hideCompatibility: function() {
                var items = document.querySelectorAll(this.currentFilter);
                for(var indx = 0; indx < items.length; indx++) {
                    $(items[indx]).parent().parent().parent().addClass('hidden');
                }
            },

            attachHeading: function() {
                if(window.location.pathname === '/search' ) {
                    var titleText = 'Compatible with ';

                    var monitor = this.getMonitor()
                    if(monitor !== null) {
                        $(this.mainPageWrapper).before('<div class="search-mountfinder-results">\
                            <div class="container">\
                            <h2 class="clearfix">' + titleText + monitor.display_manufacturer + ' model "' + monitor.display_part_number + '"<a href="clear" class="clear-search-monitor pull-right"><small>Clear</small></a></h2>\
                            </div>\
                        </div>');
                    }
                }
            },

            compatibilityTemplate: function() {
                return '<div class="ais-refinement-list--header ais-facet--header ais-header">Compatibility</div>\
                <div class="ais-body ais-refinement-list--body ais-facet--body">\
                <div class="ais-refinement-list--list">\
                <div class="\
                    compatibility-checkbox-wrapper ais-refinement-list--item ais-facet--item '+ (this.inputShouldBeChecked() ? 'ais-refinement-list--item__active ais-facet--active' : '') +'\
                ">\
                    <label class="ais-facet--label" title="Show mounts that require an adaptor">\
                        <input '+ (this.inputShouldBeChecked() ? 'checked' : '') 
                                +' type="checkbox" value="'+ this.monitor+'" />\
                        Show mounts that require an adaptor\
                    </label>\
                </div></div></div>';
            },

            inputShouldBeChecked: function() {
                return window.location.href.indexOf(this.COMPATIBILITY_TAG) !== -1;
            },

            initEvents: function() {
                this.$template.find('[type="checkbox"]').on('change', function(e) {
                    if(e.target.checked) {
                        this.getCompatibilityFilter(e.target.value);
                    } else {
                        this.removeCompatibilityFilter(e);
                    }
                }.bind(this));
            },

            getCompatibilityFilter: function(monitor) {
                $.get('/apps/peerless/monitor-finder/search-product', {
                    query: monitor
                }, function(response) {
                    if(response.count > 0) {
                        this.HandleUrl.init(response.items, this);
                        window.location = this.HandleUrl.toString();
                    }
                }.bind(this))
            },

            removeCompatibilityFilter: function(e) {
                $('.search-mountfinder-results').remove();
                $('.ais-current-refined-values--link').each(function(key, item) {
                    if(item.innerText.toLowerCase().indexOf('compatibility') !== -1) {
                        item.click();
                    }
                }.bind(this));
                $(e.target).parent().parent().removeClass('ais-refinement-list--item__active ais-facet--active');
            },

            HandleUrl: {
                items: [],
                url: '',
                parent: null,

                init: function(items, parent) {
                    this.items = items;
                    this.url = window.location.href;
                    this.parent = parent;

                    if(window.location.search.length === 0) {
                        this.url += '?';
                    }
                },

                reworkUrl: function() {
                    var urlArr = this.url.split('&');
                    var newUrlArr = [];
                    if(urlArr.length > 1) {
                        for(var i = 0; i < urlArr.length; i++) {
                            if(urlArr[i].toLowerCase().indexOf(this.parent.COMPATIBILITY_TAG.toLowerCase()) === -1) {
                                newUrlArr.push(urlArr[i]);
                            }
                        }
                        this.url = newUrlArr.join('&');
                    }
                },

                removePreviousCompatibility: function() {
                    this.reworkUrl();
                },

                buildNewCompatibility: function() {
                    for(var indx = 0; indx < this.items.length; indx++) {
                        this.url += '&dFR['+this.parent.COMPATIBILITY_TAG+']['+indx+']='+this.items[indx];
                    }
                },

                toString: function() {
                    this.removePreviousCompatibility();
                    this.buildNewCompatibility();
                    return this.url;
                }
            }
        },


        VesaFilterUpdater: {

            vesaWrapper: 'ais-facet-named_tags.Vesa%20SKU',
            $vesaWrapper: null,
            $template: null,
            COMPATIBILITY_TAG: 'named_tags.Vesa SKU',
            currentFilter: '.current_named_tags_vesa_sku',

            init: function() {
                this.buildObj();
                this.render();
                this.initEvents();
                this.hideCompatibility();
            },

            buildObj: function() {
                this.$vesaWrapper = $(document.getElementsByClassName(this.vesaWrapper));
                this.$vesaWrapper.find('.ais-body').addClass('hidden');
                this.$template = $(this.inputsTemplate());
            },

            initEvents: function() {
                this.$template.find('form').on('submit', function(e) {
                    e.preventDefault();
                    $.get('/apps/peerless/vesa', {
                        'x': this.$template.find('input[name="x"]').val(),
                        'y': this.$template.find('input[name="y"]').val()
                    }, function(response) {
                        if(response.total > 0) {
                            this.HandleUrl.init(response.items, this);
                            window.location = this.HandleUrl.toString();
                        }
                    }.bind(this))
                }.bind(this))
            },

            hideCompatibility: function() {
                var items = document.querySelectorAll(this.currentFilter);
                for(var indx = 0; indx < items.length; indx++) {
                    $(items[indx]).parent().parent().parent().addClass('hidden');
                }
            },

            render: function() {
                this.$vesaWrapper.find('.ais-refinement-list').append(this.$template);
            },

            inputsTemplate: function() {
                return '<div class="ais-body ais-price-ranges--body ais-facet--body">\
                <div>\
                  <form class="ais-price-ranges--form row">\
                    <label class="ais-price-ranges--label col-xs-5">\
                      <input type="number" name="x" class="ais-price-ranges--input" required>\
                    </label>\
                    <span class="ais-price-ranges--separator col-xs-2 text-center">-</span>\
                    <label class="ais-price-ranges--label col-xs-5">\
                      <input type="number" name="y" class="ais-price-ranges--input" required>\
                    </label>\
                    <button class="ais-price-ranges--button" type="submit">Apply &gt;</button>\
                  </form>\
                </div>\
              </div>';
            },

            HandleUrl: {
                items: [],
                url: '',
                parent: null,

                init: function(items, parent) {
                    this.items = items;
                    this.url = window.location.href;
                    this.parent = parent;

                    if(window.location.search.length === 0) {
                        this.url += '?';
                    }
                },

                reworkUrl: function() {
                    var urlArr = this.url.split('&');
                    var newUrlArr = [];
                    if(urlArr.length > 1) {
                        for(var i = 0; i < urlArr.length; i++) {
                            if(urlArr[i].toLowerCase().indexOf(this.parent.COMPATIBILITY_TAG.toLowerCase()) === -1) {
                                newUrlArr.push(urlArr[i]);
                            }
                        }
                        this.url = newUrlArr.join('&');
                    }
                },

                removePreviousCompatibility: function() {
                    this.reworkUrl();
                },

                buildNewCompatibility: function() {
                    for(var indx = 0; indx < this.items.length; indx++) {
                        this.url += '&dFR['+this.parent.COMPATIBILITY_TAG+']['+indx+']='+this.items[indx];
                    }
                },

                toString: function() {
                    this.removePreviousCompatibility();
                    this.buildNewCompatibility();
                    return this.url;
                }
            }
        }
    };
    FilterUpdater.init();
};
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}


if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }
    
    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

$(document).on('click', '.login-link', function (e) {
    e.preventDefault();  
    var that = $(this),
        currentLink = window.location.pathname;
    window.location = that.attr('href') + "?redirect="+ currentLink;
});

$(function() {
    $('form.searchform').submit(function(e){
        e.preventDefault();
    });

    var shouldRemoveCookie = function() {
        if(window.location.href.indexOf('search') !== -1 || window.location.href.indexOf('collections') !== -1) {
            return false;
        }
        return (document.referrer.indexOf('collections') !== -1 || document.referrer.indexOf('search')) && window.location.href.indexOf('products/') === -1;
    },

    setMonitorHeading = function() {
        var getMonitor = function() {
            var monitor = $.cookie('mountsForMonitor');
            if(typeof monitor !== 'undefined') {
                try {
                    return JSON.parse(monitor);
                } catch(e) {
                    console.error(e);
                }
            }
            return null;
        };
        var renderSingleText = function() {
            if(window.location.href.indexOf('products/') !== -1) {
                return '<a class="pull-right" style="margin-left: 5px; margin-right: 5px;" href="#"><small> | </small></a> <a href="'+ document.referrer +'" class="pull-right"><small>view results</small></a>';
            } else {
                return '';
            }
        };
        var monitor = getMonitor();
        var titleText = 'Compatible with ';
        if(window.location.href.indexOf('products/') !== -1 && monitor !== null) {
            $('.main-page-wrapper').before('<div class="search-mountfinder-results">\
                <div class="container">\
                <h2 class="clearfix">' + titleText + monitor.display_manufacturer + ' model "' + monitor.display_part_number + '"<a href="clear" class="clear-search-monitor pull-right"><small>Clear</small></a>'+ renderSingleText() +'</h2>\
                </div>\
            </div>');
        }
    }

    if(shouldRemoveCookie()) {
        $.removeCookie('mountsForMonitor', { path: '/' });
    }
    setMonitorHeading();

    $(document).on('click', '.clear-search-monitor, .ais-current-refined-values--clear-all', function(e) {
        e.preventDefault();
        $('.search-mountfinder-results').remove();
        $.removeCookie('mountsForMonitor', { path: '/' });
        window.activeCustomFilters.compatibity = '';
        window.location.href = window.location.origin + window.location.pathname;
        // if(!$(this).hasClass('ais-current-refined-values--clear-all')) {
        //     var $filterClearer = $('.ais-current-refined-values--clear-all');
        //     if($filterClearer.length > 0 && $filterClearer[0].nodeName === 'A') {
        //         window.location.href = $filterClearer[0].href;
        //     }
        // }
    });
})


// Translate langify
$(document).ready(function(){ 

    window.lang = langify.helper.getSelectedLanguage();
    window.currentLanguage = getCurrentLanguageTranslations();


    $('form#ic_signupform').find("input[name='data[fname]']").each(function(ev) {
        $(this).attr("placeholder", currentLanguage.first_name);
    });
    $('form#ic_signupform').find("input[name='data[lname]']").each(function(ev) {
        $(this).attr("placeholder", currentLanguage.last_name);
    });
    $('form#ic_signupform').find("input[name='data[email]']").each(function(ev) {
        $(this).attr("placeholder", currentLanguage.email);
    });
    $('form#ic_signupform').find("input[name='data[title]']").each(function(ev) {
        $(this).attr("placeholder", currentLanguage.job);
    });
    $('form#ic_signupform').find("input[name='data[companywebsite]']").each(function(ev) {
        $(this).attr("placeholder", currentLanguage.company);
    });
    $('form#ic_signupform select[name="data[country]"] option').eq(0).text(currentLanguage.country);
    $('form#ic_signupform input[type=submit]').val(currentLanguage.sign_up);

    function replacePlaceholder(elem, val) {
        
    }
});

//logout clear cart

$('.logout').on('click', function (e) {
    e.preventDefault();
    var cookieCart = $.cookie("cart"),
    userEmail = $(".logout").attr( "data-customeremail" );  
    $.cookie("cartUser", cookieCart);
    $.cookie("cart", null);
  	$.cookie('userEmail', userEmail);
    clearCart(
        function () {window.location = '/account/logout';}, 
        function () {window.location = '/account/logout';}
    );
});

function clearCart (onSuccess, onError) {
    $.ajax({
        url: 'cart/clear.js',
        method: "POST",
        success: function () {
            onSuccess();
        },
        error: function () {
            onError();
        }
    });
}

// links to regionals site



if ($("ul").hasClass("english-site")) {
    $(".ly73952").click(function (e) {
        e.preventDefault();
        window.location.replace("https://de.peerless-av.com/");
    });
    $(".ly77552").click(function (e) {
        e.preventDefault();
        window.location.replace("https://fr.peerless-av.com//");
    });
    $(".ly73951").click(function (e) {
        e.preventDefault();
        window.location.replace("https://eu.peerless-av.com/");
    });
    $(".ly73954").click(function (e) {
        e.preventDefault();
        window.location.replace("https://eu.peerless-av.com/");
    });
};

if ($("ul").hasClass("germany-site")) {
    $(".ly73952").click(function (e) {
        e.preventDefault();
        window.location.replace("https://de.peerless-av.com/");
    });
    $(".ly77552").click(function (e) {
        e.preventDefault();
        window.location.replace("https://fr.peerless-av.com//");
    });
    $(".ly73951").click(function (e) {
        e.preventDefault();
        window.location.replace("https://eu.peerless-av.com/");
    });
    $(".ly73954").click(function (e) {
        e.preventDefault();
        window.location.replace("https://eu.peerless-av.com/");
    });
};

if ($("ul").hasClass("france-site")) {
    $(".ly73952").click(function (e) {
        e.preventDefault();
        window.location.replace("https://de.peerless-av.com/");
    });
    $(".ly77552").click(function (e) {
        e.preventDefault();
        window.location.replace("https://fr.peerless-av.com//");
    });
    $(".ly73951").click(function (e) {
        e.preventDefault();
        window.location.replace("https://eu.peerless-av.com/");
    });
    $(".ly73954").click(function (e) {
        e.preventDefault();
        window.location.replace("https://eu.peerless-av.com/");
    });
};


if( $( "ul" ).hasClass( "latin-america-site")){
    $( "#ly73951" ).click(function(e) {
    e.preventDefault();
    window.location.replace("#");
    });
    $( "#ly73954" ).click(function(e) {
    e.preventDefault();
    window.location.replace("#");
    });
};
