"use strict";
var skillsColor;
var skillsFill;

jQuery(document).on('ready', function () {

    jQuery(window).on('scroll', function () {
        animateElement();
    });

    //Fix for Split Section Backgroun on small resolutions
    setBackgroundColorSplitSection();
    //Fix z-index
    zIndexSectionFix();

    //Fix for Menu
    jQuery(".header-holder").sticky({topSpacing: 0});

    //Slow Scroll
    jQuery('#header-main-menu ul li a, .scroll').on("click", function (e) {
        if (jQuery(this).attr('href') === '#')
        {
            e.preventDefault();
        } else {
            if (jQuery(window).width() < 1024) {
                if (!jQuery(e.target).is('.sub-arrow'))
                {
                    jQuery('html, body').animate({scrollTop: jQuery(this.hash).offset().top - 77}, 1500);
                    jQuery('.menu-holder').removeClass('show');
                    jQuery('#toggle').removeClass('on');
                    return false;
                }
            } else
            {
                jQuery('html, body').animate({scrollTop: jQuery(this.hash).offset().top - 77}, 1500);
                return false;
            }
        }
    });

    //Logo Click Fix
    jQuery('.header-logo').on("click", function (e) {
        if (jQuery(".page-template-onepage").length) {
            e.preventDefault();
            jQuery('html, body').animate({scrollTop: 0}, 1500);
        }
    });

    jQuery(window).scrollTop(1);
    jQuery(window).scrollTop(0);

    //Placeholder show/hide
    jQuery('input, textarea').on("focus", function () {
        jQuery(this).data('placeholder', jQuery(this).attr('placeholder'));
        jQuery(this).attr('placeholder', '');
    });
    jQuery('input, textarea').on("blur", function () {
        jQuery(this).attr('placeholder', jQuery(this).data('placeholder'));
    });

    //Fit Video
    jQuery(".site-content").fitVids();

    //Fix for Default menu
    jQuery(".default-menu ul:first").addClass('sm sm-clean main-menu');

    //Set menu
    jQuery('.main-menu').smartmenus({
        subMenusSubOffsetX: 1,
        subMenusSubOffsetY: -8,
        markCurrentTree: true
    });

    var $mainMenu = jQuery('.main-menu').on('click', 'span.sub-arrow', function (e) {
        var obj = $mainMenu.data('smartmenus');
        if (obj.isCollapsible()) {
            var $item = jQuery(this).parent(),
                    $sub = $item.parent().dataSM('sub');
            $sub.dataSM('arrowClicked', true);
        }
    }).bind({
        'beforeshow.smapi': function (e, menu) {
            var obj = $mainMenu.data('smartmenus');
            if (obj.isCollapsible()) {
                var $menu = jQuery(menu);
                if (!$menu.dataSM('arrowClicked')) {
                    return false;
                }
                $menu.removeDataSM('arrowClicked');
            }
        }
    });


    //Show-Hide header sidebar
    jQuery('#toggle').on('click', multiClickFunctionStop);

});



jQuery(window).on('load', function () {
    //Set Istope Layout on Portfolio
    isotopeSetUp();

    // Animate the elemnt if is allready visible on load
    animateElement();

    //Fix for hash
    var hash = location.hash;
    if ((hash != '') && (jQuery(hash).length))
    {
        jQuery('html, body').animate({scrollTop: jQuery(hash).offset().top - 77}, 1);
    }

    //Slider Image Set Up
    imageSliderSettings();

    jQuery('.doc-loader').fadeOut(600);
});





//------------------------------------------------------------------------
//Helper Methods -->
//------------------------------------------------------------------------


var animateElement = function (e) {
    jQuery(".animate").each(function (i) {
        var top_of_object = jQuery(this).offset().top;
        var bottom_of_window = jQuery(window).scrollTop() + jQuery(window).height();
        if ((bottom_of_window - 70) > top_of_object) {
            jQuery(this).addClass('show-it');
        }
    });
};

var setBackgroundColorSplitSection = function () {
    jQuery(".section-title-holder").each(function () {
        jQuery(this).css("background-color", jQuery(this).data("background"));
    });
};

var multiClickFunctionStop = function (e) {
    jQuery('#toggle').off("click");
    jQuery('#toggle').toggleClass("on");
    if (jQuery('#toggle').hasClass("on"))
    {
        jQuery('.menu-holder').addClass('show');
        jQuery('#toggle').on("click", multiClickFunctionStop);
    } else
    {
        jQuery('.menu-holder').removeClass('show');
        jQuery('#toggle').on("click", multiClickFunctionStop);
    }
};


jQuery(window).on('scroll resize', function () {
    var currentSection = null;
    jQuery('.section, footer').each(function () {
        var element = jQuery(this).attr('id');
        if (jQuery('#' + element).is('*')) {
            if (jQuery(window).scrollTop() >= jQuery('#' + element).offset().top - 115)
            {
                currentSection = element;
            }
        }
    });

    jQuery('#header-main-menu ul li').removeClass('active').find('a[href*="#' + currentSection + '"]').parent().addClass('active');
});

function imageSliderSettings() {
    jQuery(".image-slider").each(function () {
        var id = jQuery(this).attr('id');
        var auto_value = window[id + '_auto'];
        var hover_pause = window[id + '_hover'];
        var speed_value = window[id + '_speed'];
        var items_value = window[id + '_items'];
        var dots_value = window[id + '_dots'];
        auto_value = (auto_value === 'true') ? true : false;
        hover_pause = (hover_pause === 'true') ? true : false;
        jQuery('#' + id).owlCarousel({
            loop: true,
            autoHeight: true,
            smartSpeed: 750,
            autoplay: auto_value,
            autoplayHoverPause: hover_pause,
            autoplayTimeout: speed_value,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                1024: {
                    items: items_value,
                }
            },
            dots: dots_value
        });
        jQuery(this).on('mouseleave', function () {
            jQuery(this).trigger('stop.owl.autoplay');
            jQuery(this).trigger('play.owl.autoplay', [auto_value]);
        })
    });
}

function zIndexSectionFix() {
    var numSection = jQuery(".page-template-onepage .section-wrapper").length + 2;
    jQuery('.page-template-onepage').find('.section-wrapper').each(function () {
        jQuery(this).css('zIndex', numSection);
        numSection--;
    });
}

function isotopeSetUp() {
    jQuery('.grid').isotope({
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
            columnWidth: '.grid-sizer',
            gutter: '.gutter-sizer'
        }
    });
}

function is_touch_device() {
    return !!('ontouchstart' in window);
}
