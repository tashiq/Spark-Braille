(function ($) {

	"use strict";

	var cfg = {
		defAnimation: "fadeInUp",    // default css animation
		scrollDuration: 800,           // smoothscroll duration
		sendURL: "https://script.google.com/macros/s/AKfycby_3nmQKQ0ELygkultZREWn7DaLPO4EVtV3F7XLfUKOoy5OyUVY7rHmW2-LJHvk6xeX/exec"					// email to send contact form data to.
	},

		$WIN = $(window);


	// Add the User Agent to the <html>
	// will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
	var doc = document.documentElement;
	doc.setAttribute('data-useragent', navigator.userAgent);


	/* Preloader
	 * -------------------------------------------------- */
	var ssPreloader = function () {

		$WIN.on('load', function () {

			// force page scroll position to top at page refresh
			$('html, body').animate({ scrollTop: 0 }, 'normal');

			// will first fade out the loading animation
			$("#loader").fadeOut("slow", function () {

				// will fade out the whole DIV that covers the website.
				$("#preloader").delay(300).fadeOut("slow");

			});
		});
	};


	/* FitVids
	------------------------------------------------------ */
	var ssFitVids = function () {
		$(".fluid-video-wrapper").fitVids();
	};


	/*	Masonry
	------------------------------------------------------ */
	var ssMasonryFolio = function () {

		var containerBricks = $('.bricks-wrapper');

		containerBricks.imagesLoaded(function () {
			containerBricks.masonry({
				itemSelector: '.brick',
				resize: true
			});
		});
	};


	/*	Light Gallery
	------------------------------------------------------- */
	var ssLightGallery = function () {

		$('#folio-wrap').lightGallery({
			showThumbByDefault: false,
			hash: false,
			selector: ".item-wrap"
		});
	};


	/* Flexslider
		* ------------------------------------------------------ */
	var ssFlexSlider = function () {

		$WIN.on('load', function () {

			$('#testimonial-slider').flexslider({
				namespace: "flex-",
				controlsContainer: "",
				animation: 'slide',
				controlNav: true,
				directionNav: false,
				smoothHeight: true,
				slideshowSpeed: 7000,
				animationSpeed: 600,
				randomize: false,
				touch: true,
			});

		});

	};


	/* Carousel
* ------------------------------------------------------ */
	var ssOwlCarousel = function () {

		$(".owl-carousel").owlCarousel({
			nav: false,
			loop: true,
			margin: 50,
			responsiveClass: true,
			responsive: {
				0: {
					items: 2,
					margin: 20
				},
				400: {
					items: 3,
					margin: 30
				},
				600: {
					items: 4,
					margin: 40
				},
				1000: {
					items: 6
				}
			},
			autoplay: true,
			autoplayTimeout: 1400
		});

	};



	/* Menu on Scrolldown
 * ------------------------------------------------------ */
	var ssMenuOnScrolldown = function () {

		var menuTrigger = $('#header-menu-trigger');
		menuTrigger.addClass('opaque');
	};


	/* OffCanvas Menu
 * ------------------------------------------------------ */
	var ssOffCanvas = function () {

		var menuTrigger = $('#header-menu-trigger'),
			nav = $('#menu-nav-wrap'),
			closeButton = nav.find('.close-button'),
			siteBody = $('body'),
			mainContents = $('section, footer');

		// open-close menu by clicking on the menu icon
		menuTrigger.on('click', function (e) {
			e.preventDefault();
			menuTrigger.toggleClass('is-clicked');
			siteBody.toggleClass('menu-is-open');
		});

		// close menu by clicking the close button
		closeButton.on('click', function (e) {
			e.preventDefault();
			menuTrigger.trigger('click');
		});

		// close menu clicking outside the menu itself
		siteBody.on('click', function (e) {
			if (!$(e.target).is('#menu-nav-wrap, #header-menu-trigger, #header-menu-trigger span')) {
				menuTrigger.removeClass('is-clicked');
				siteBody.removeClass('menu-is-open');
			}
		});

	};


	/* Smooth Scrolling
	  * ------------------------------------------------------ */
	var ssSmoothScroll = function () {

		$('.smoothscroll').on('click', function (e) {
			var target = this.hash,
				$target = $(target);

			e.preventDefault();
			e.stopPropagation();

			$('html, body').stop().animate({
				'scrollTop': $target.offset().top
			}, cfg.scrollDuration, 'swing').promise().done(function () {

				// check if menu is open
				if ($('body').hasClass('menu-is-open')) {
					$('#header-menu-trigger').trigger('click');
				}

				window.location.hash = target;
			});
		});

	};


	/* Placeholder Plugin Settings
	  * ------------------------------------------------------ */
	var ssPlaceholder = function () {
		$('input, textarea, select').placeholder();
	};


	/* Alert Boxes
	------------------------------------------------------- */
	var ssAlertBoxes = function () {

		$('.alert-box').on('click', '.close', function () {
			$(this).parent().fadeOut(500);
		});

	};


	/* Animations
	  * ------------------------------------------------------- */
	var ssAnimations = function () {

		if (!$("html").hasClass('no-cssanimations')) {
			$('.animate-this').waypoint({
				handler: function (direction) {

					var defAnimationEfx = cfg.defAnimation;

					if (direction === 'down' && !$(this.element).hasClass('animated')) {
						$(this.element).addClass('item-animate');

						setTimeout(function () {
							$('body .animate-this.item-animate').each(function (ctr) {
								var el = $(this),
									animationEfx = el.data('animate') || null;

								if (!animationEfx) {
									animationEfx = defAnimationEfx;
								}

								setTimeout(function () {
									el.addClass(animationEfx + ' animated');
									el.removeClass('item-animate');
								}, ctr * 30);

							});
						}, 100);
					}

					// trigger once only
					this.destroy();
				},
				offset: '95%'
			});
		}

	};


	/* Intro Animation
	  * ------------------------------------------------------- */
	var ssIntroAnimation = function () {

		$WIN.on('load', function () {

			if (!$("html").hasClass('no-cssanimations')) {
				setTimeout(function () {
					$('.animate-intro').each(function (ctr) {
						var el = $(this),
							animationEfx = el.data('animate') || null;

						if (!animationEfx) {
							animationEfx = cfg.defAnimation;
						}

						setTimeout(function () {
							el.addClass(animationEfx + ' animated');
						}, ctr * 300);
					});
				}, 100);
			}
		});

	};


	/* Contact Form BOOKMARK 1
	 * ------------------------------------------------------ */
	var ssContactForm = function () {

		/* defualt turn schools and organisations hidden */
		$('#contactForm_s').hide();

		/* form switcher */
		$('#contactForm').on('change', function () {
			switch (this.value) {
				case "individuals":
					$('#contactForm_i').show();
					$('#contactForm_s').hide();
					break;
				case "schoolsandorganizations":
					$('#contactForm_i').hide();
					$('#contactForm_s').show();
					break;
			}
		});

	};


	/* Back to Top
	  * ------------------------------------------------------ */
	var ssBackToTop = function () {

		var pxShow = 500,         // height on which the button will show
			fadeInTime = 400,         // how slow/fast you want the button to show
			fadeOutTime = 400,         // how slow/fast you want the button to hide
			scrollSpeed = 300,         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
			goTopButton = $("#go-top")

		// Show or hide the sticky footer button
		$(window).on('scroll', function () {
			if ($(window).scrollTop() >= pxShow) {
				goTopButton.fadeIn(fadeInTime);
			} else {
				goTopButton.fadeOut(fadeOutTime);
			}
		});
	};

	//

	const carouselTrack = document.querySelector('.carousel-track');
	const slides = carouselTrack.querySelectorAll('.carousel-item');

	let currentSlide = 0;

	function moveToNextSlide() {
		currentSlide++;
		if (currentSlide >= slides.length) {
			currentSlide = 0;
		}
		carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
	}

	setInterval(moveToNextSlide, 3000); // Change interval for desired speed (in milliseconds)

	// 
	// Sponsor 
	const sponsorTrack = document.querySelector('.carousels');
	const sponsorItems = sponsorTrack.querySelectorAll('.sponsor-item');

	let current = 0;

	function moveToNextSponsor() {
		current++;
		if (current >= sponsorItems.length) {
			current = 0;
		}
		sponsorTrack.style.transform = `translateX(-${current * 400}px)`;
	}

	setInterval(moveToNextSponsor, 3000);
	/* Initialize
	  * ------------------------------------------------------ */
	(function ssInit() {

		ssPreloader();
		ssFitVids();
		ssMasonryFolio();
		ssLightGallery();
		ssFlexSlider();
		ssOwlCarousel();
		ssMenuOnScrolldown();
		ssOffCanvas();
		ssSmoothScroll();
		ssPlaceholder();
		ssAlertBoxes();
		ssAnimations();
		ssIntroAnimation();
		ssContactForm();
		ssBackToTop();

	})();

})(jQuery);

const form = document.querySelector('#contactForm_i')
const form1 = document.querySelector('#contactForm_s')
const scriptURL = 'https://script.google.com/macros/s/AKfycby_3nmQKQ0ELygkultZREWn7DaLPO4EVtV3F7XLfUKOoy5OyUVY7rHmW2-LJHvk6xeX/exec'

form.addEventListener('submit', e => {
	e.preventDefault();
	fetch(scriptURL, { method: 'POST', body: new FormData(form) })
		.then(response => {
			$('#message-success_i').html("Thanks for signing up! We will be in touch soon. :)");
			$('#message-success_i').fadeIn();
			alert('Success!', response)
		})
		.catch(error => {
			alert('Error!', error.message)
		})
})

form1.addEventListener('submit', e => {
	e.preventDefault();
	fetch(scriptURL, { method: 'POST', body: new FormData(form1) })
		.then(response => {
			$('#message-success_s').html("Thanks for signing up! We will be in touch soon. :)");
			$('#message-success_s').fadeIn();
			alert('Success!', response)
		})
		.catch(error => {
			alert('Error!', error.message)
		})
})