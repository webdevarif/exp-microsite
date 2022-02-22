    "use strict";

      
	$(window).on('load', function () {
		aosAnimation();
        buttonAnimation();
	});

	/*=============================================
		=    		 Aos Active  	         =
	=============================================*/
	function aosAnimation() {
		AOS.init({
			duration: 1000,
			mirror: true,
			once: true,
			disable: 'mobile',
		});
	}
   
	function buttonAnimation() {
	}
   
    /*--
        preloader
    -----------------------------------*/
     $(window).on('load', function(event) {
        $('.preloader').delay(500).fadeOut(500);
    });

    /*--
        Header toggle
    -----------------------------------*/
    $(".desktop-trigger").click(function() {
        $(this).toggleClass('active');
        $(".header-navigation").slideToggle();
    });


    /*--
        Header Sticky
    -----------------------------------*/

    // window.onscroll = function () {
    //     const left = document.getElementById("header");

    //     if (left.scrollTop > 50 || self.pageYOffset > 50) {
    //         left.classList.add("sticky")
    //     } else {
    //         left.classList.remove("sticky");
    //     }
    // }    




    
    // // Hide header on scroll down
    
    var doc = document.documentElement;
    var w   = window;

    /*
    define four variables: curScroll, prevScroll, curDirection, prevDirection
    */

    var curScroll;
    var prevScroll = w.scrollY || doc.scrollTop;
    var curDirection = 0;
    var prevDirection = 0;

    /*
    how it works:
    -------------
    create a scroll event listener
    create function to check scroll position on each scroll event,
    compare curScroll and prevScroll values to find the scroll direction
    scroll up - 1, scroll down - 2, initial - 0
    then set the direction value to curDirection
    compare curDirection and prevDirection
    if it is different, call a function to show or hide the header
    example:
    step 1: user scrolls down: curDirection 2, prevDirection 0 > hide header
    step 2: user scrolls down again: curDirection 2, prevDirection 2 > already hidden, do nothing
    step 3: user scrolls up: curDirection 1, prevDirection 2 > show header
    */

    var header = document.getElementById('header-sticky');
    var toggled;
    var threshold = 380;

    var checkScroll = function() {
    curScroll = w.scrollY || doc.scrollTop;
    if(curScroll > prevScroll) {
        // scrolled down
        curDirection = 2;
    }
    else {
        //scrolled up
        curDirection = 1;
    }

    if(curDirection !== prevDirection) {
        toggled = toggleHeader();
    }

    prevScroll = curScroll;
    if(toggled) {
        prevDirection = curDirection;
    }
    };

    var toggleHeader = function() { 
    toggled = true;
    // On scroll
    $(w).scroll(function(){
        // Hide header on scroll down
        if (curScroll >= threshold) {
            header.classList.add('sticky-fixed');
        }
        else {
            header.classList.remove('sticky-fixed');
        }
    });

    if(curDirection === 2 && curScroll > threshold) {
        header.classList.add('sticky-menu');
    }
    else if (curDirection === 1) {
        header.classList.remove('sticky-menu');
    }
    else {
        header.classList.add('sticky-fixed');
        toggled = false;
    }
    return toggled;
    };

    window.addEventListener('scroll', checkScroll);


    /*--
    parallax image
    -----------------------------------*/
    if ($('.single-properties-bg').length) {
        var image = document.getElementsByClassName('single-properties-bg');
        new simpleParallax(image, {
            delay: .6,
            transition: 'cubic-bezier(0,0,0,1)'
        });
    };

    
    /*--
        Mobile Menu 
    -----------------------------------*/

    /* Get Sibling */
    const getSiblings = function (elem) {
        const siblings = []
        let sibling = elem.parentNode.firstChild
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== elem) {
                siblings.push(sibling)
            }
            sibling = sibling.nextSibling
        }
        return siblings
    }

    /* Slide Up */
    const slideUp = (target, time) => {
        const duration = time ? time : 500;
        target.style.transitionProperty = 'height, margin, padding'
        target.style.transitionDuration = duration + 'ms'
        target.style.boxSizing = 'border-box'
        target.style.height = target.offsetHeight + 'px'
        target.offsetHeight
        target.style.overflow = 'hidden'
        target.style.height = 0
        window.setTimeout(() => {
            target.style.display = 'none'
            target.style.removeProperty('height')
            target.style.removeProperty('overflow')
            target.style.removeProperty('transition-duration')
            target.style.removeProperty('transition-property')
        }, duration)
    }

    /* Slide Down */
    const slideDown = (target, time) => {
        const duration = time ? time : 500;
        target.style.removeProperty('display')
        let display = window.getComputedStyle(target).display
        if (display === 'none') display = 'block'
        target.style.display = display
        const height = target.offsetHeight
        target.style.overflow = 'hidden'
        target.style.height = 0
        target.offsetHeight
        target.style.boxSizing = 'border-box'
        target.style.transitionProperty = 'height, margin, padding'
        target.style.transitionDuration = duration + 'ms'
        target.style.height = height + 'px'
        window.setTimeout(() => {
            target.style.removeProperty('height')
            target.style.removeProperty('overflow')
            target.style.removeProperty('transition-duration')
            target.style.removeProperty('transition-property')
        }, duration)
    }

    /* Slide Toggle */
    const slideToggle = (target, time) => {
        const duration = time ? time : 500;
        if (window.getComputedStyle(target).display === 'none') {
            return slideDown(target, duration)
        } else {
            return slideUp(target, duration)
        }
    }


    /*--
		Offcanvas/Collapseable Menu 
	-----------------------------------*/
    if ($('.offcanvas-menu').length) {
        const offCanvasMenu = function (selector) {
            const $offCanvasNav = document.querySelector(selector),
            $subMenu = $offCanvasNav.querySelectorAll('.sub-menu');
            $subMenu.forEach(function (subMenu) {
                const menuExpand = document.createElement('span')
                menuExpand.classList.add('menu-expand')
                // menuExpand.innerHTML = '+'
                subMenu.parentElement.insertBefore(menuExpand, subMenu)
                if (subMenu.classList.contains('mega-menu')) {
                    subMenu.classList.remove('mega-menu')
                    subMenu.querySelectorAll('ul').forEach(function (ul) {
                        ul.classList.add('sub-menu')
                        const menuExpand = document.createElement('span')
                        menuExpand.classList.add('menu-expand')
                        menuExpand.innerHTML = '+'
                        ul.parentElement.insertBefore(menuExpand, ul)
                    })
                }
            })

            $offCanvasNav.querySelectorAll('.menu-expand').forEach(function (item) {
                item.addEventListener('click', function (e) {
                    e.preventDefault()
                    const parent = this.parentElement
                    if (parent.classList.contains('active')) {
                        parent.classList.remove('active');
                        parent.querySelectorAll('.sub-menu').forEach(function (subMenu) {
                            subMenu.parentElement.classList.remove('active');
                            slideUp(subMenu)
                        })
                    } else {
                        parent.classList.add('active');
                        slideDown(this.nextElementSibling)
                        getSiblings(parent).forEach(function (item) {
                            item.classList.remove('active')
                            item.querySelectorAll('.sub-menu').forEach(function (subMenu) {
                                subMenu.parentElement.classList.remove('active');
                                slideUp(subMenu)
                            })
                        })
                    }
                })
            })
        }
        offCanvasMenu('.offcanvas-menu');
    }

    /*--
      nice select  
    -----------------------------------*/
	$('select').niceSelect();

    /*--
        banner slider
	-----------------------------------*/
    var swiper = new Swiper('.hero-container', {
        pagination: {
            el: ".hero-container .swiper-pagination",
            clickable: true,
        },
        loop: true,
        grabCursor: false,
        speed: 1000,
        paginationClickable: true,
        parallax: true,
        autoplay: false,
        effect: 'fade',
    });

    /*--
        Area Guide Slider
	-----------------------------------*/
    var autoplay = 5000;
    var swiper = new Swiper('.guide-container', {
        slidesPerView: 1,
        loop: true,
        speed: 800,
        lazy: true,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        navigation: {
            nextEl: '.guide-container .swiper-arrow.next',
            prevEl: '.guide-container .swiper-arrow.prev',
        },
        pagination: {
            el: ".guide-container .swiper-pagination",
            clickable: true,
        },
        autoplay: true,

    });

   /*--
    Slider Active
	-----------------------------------*/
    var autoplay = 5000;
    var swiper = new Swiper('.sold-container', {
        slidesPerView: 2,
        centeredSlides: true,
        paginationClickable: true,
        loop: true,
        slideToClickedSlide: true,
        breakpoints: {
            0: {
              slidesPerView: 1,
            },
            1399: {
              slidesPerView: 2,
            },
        },
        navigation: {
            nextEl: '.sold-container .swiper-arrow.next',
            prevEl: '.sold-container .swiper-arrow.prev',
        },
        pagination: {
            el: ".sold-container .swiper-pagination",
            clickable: true,
        },
        fadeEffect: {
            crossFade: true,
        },
    });

   /*--
    Slider Active
	-----------------------------------*/
    var autoplay = 5000;
    var swiper = new Swiper('.testimonial-active', {
        slidesPerView: 2,
        centeredSlides: true,
        paginationClickable: true,
        loop: true,
        spaceBetween: '10%',
        slideToClickedSlide: true,
        breakpoints: {
            0: {
              slidesPerView: 1,
            },
            992: {
              slidesPerView: 2,
            },
        },
        fadeEffect: {
            crossFade: true,
        },
    });


    /*--
        brand slider
	-----------------------------------*/
    var swiper = new Swiper('.brand-container', {
        slidesPerView: 7,
        spaceBetween: 10,
        centeredSlides: true,
        loop: true,        
        grabCursor: true,
        navigation: {
            nextEl: '.brand-container .swiper-button-next',
            prevEl: '.brand-container .swiper-button-prev',
        },
        breakpoints: {
            0: {
              slidesPerView: 2,
            },
            380: {
              slidesPerView: 3,
            },
            480: {
              slidesPerView: 4,
            },
            992: {
              slidesPerView: 5,
            },
            1200: {
                slidesPerView: 7,
            },
          },
    });

    /*--
    magnificPopup video view 
  -----------------------------------*/	
	$('.popup-video').magnificPopup({
		type: 'iframe'
	});

	$('.slide-popup-link').magnificPopup({
		type: 'image'
	});

    /*--
        AOS
    -----------------------------------*/

    AOS.init({
        duration: 1200,
        once: true,
    });


    /*--
        Back To Top
    -----------------------------------*/

    // Scroll Event
    $(window).on('scroll', function () {
        var scrolled = $(window).scrollTop();
        if (scrolled > 300) $('.scroll-top-btn').addClass('active');
        if (scrolled < 300) $('.scroll-top-btn').removeClass('active');
    });

    // Click Event
    $('.scroll-top-btn').on('click', function () {
        $("html, body").animate({
            scrollTop: "0"
        }, 1200);
    });

    if ($('.featured-grid-cube').length) {
        var image = document.getElementsByClassName('featured-grid-cube');
        new simpleParallax(image, {
            overflow: true
        });
    }






    
$( ".avs-button-inner" ).mouseenter(function(e) {
    var parentOffset = $(this).offset(); 
    
    var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;
    $(this).prev(".avs-button-circle").css({"left": relX, "top": relY });
    $(this).prev(".avs-button-circle").removeClass("desplode-circle");
    $(this).prev(".avs-button-circle").addClass("explode-circle");
    
    });
    
    $( ".avs-button-inner" ).mouseleave(function(e) {
    
        var parentOffset = $(this).offset(); 
    
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        $(this).prev(".avs-button-circle").css({"left": relX, "top": relY });
        $(this).prev(".avs-button-circle").removeClass("explode-circle");
        $(this).prev(".avs-button-circle").addClass("desplode-circle");
    });