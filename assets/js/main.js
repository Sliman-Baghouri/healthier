window.addEventListener('DOMContentLoaded', (event)=>{



	/* testimonials click handler */
	function handleSlider(){
		let avatars = document.querySelectorAll('.testimonials .label');
		let reviews = document.querySelectorAll('.testimonials .review-text');
		let selectedReview; 
		let convertedToArray = Array.prototype.slice.call(reviews);
		let disabledReviews;
		let digit = /_\d/;
		let tl = gsap.timeline();
		let classRev;

		avatars.forEach((el) =>{
			// removing all active class so we can add it to the clicked one
			el.addEventListener('click', (e)=>{
				avatars.forEach(elm =>  {
					elm.className = elm.className.replace(/\active/g, '');
					el.className = el.className + " active";
				})

				classRev =  el.className.match(digit)[0];

				selectedReview = document.querySelector('.review-text.'+ classRev);

				disabledReviews = convertedToArray.filter(el => !el.className.includes(classRev) ? el:'');

				/* review section effect */
				tl.to(".review-section", .1, { opacity:0 })

				/* show the active reviews */
				.to(selectedReview,  {display:"block" , onComplete:function(){
						/* hide the other non-active reviews */
						disabledReviews.forEach((el)=>{
							gsap.set(el, {display:"none"}) 
						});

				}})
				
				.to(".review-section", .1, {
					opacity:1 
				});

			});
		});
	}


/*FAQ PAGE*/
function handleFaqs(){
	var accordion = (function(){
  
  var $accordion = $('.js-accordion');
  var $accordion_header = $accordion.find('.js-accordion-header');
  var $accordion_item = $('.js-accordion-item');
 
  // default settings 
  var settings = {
    // animation speed
    speed: 400,
    
    // close all other accordion items if true
    oneOpen: false
  };
    
  return {
    // pass configurable object literal
    init: function($settings) {
      $accordion_header.on('click', function() {
        accordion.toggle($(this));
      });
      
      $.extend(settings, $settings); 
      
      // ensure only one accordion is active if oneOpen is true
      if(settings.oneOpen && $('.js-accordion-item.active').length > 1) {
        $('.js-accordion-item.active:not(:first)').removeClass('active');
      }
      
      // reveal the active accordion bodies
      $('.js-accordion-item.active').find('> .js-accordion-body').show();
    },
    toggle: function($this) {
            
      if(settings.oneOpen && $this[0] != $this.closest('.js-accordion').find('> .js-accordion-item.active > .js-accordion-header')[0]) {
        $this.closest('.js-accordion')
               .find('> .js-accordion-item') 
               .removeClass('active')
               .find('.js-accordion-body')
               .slideUp()
      }
      
	      // show/hide the clicked accordion item
	      $this.closest('.js-accordion-item').toggleClass('active');
	      $this.next().stop().slideToggle(settings.speed);
	    }
	  }
	})();
  	accordion.init({ speed: 300, oneOpen: true });

  /* book download button scroll down */
	if($('.books-text').length){
		$('.books-text button').on('click', function(){
		    $('html,body').animate({
		        scrollTop: $("#odometer").offset().top
		    }, 'slow');
		});
	}
}



/* Scroll Smoothly */
function handleScrolling(){
	function animate(elem, style, unit, from, to, time, prop) {
	    if (!elem) {
	        return;
	    }
	    var start = new Date().getTime(),
	        timer = setInterval(function () {
	            var step = Math.min(1, (new Date().getTime() - start) / time);
	            if (prop) {
	                elem[style] = (from + step * (to - from))+unit;
	            } else {
	                elem.style[style] = (from + step * (to - from))+unit;
	            }
	            if (step === 1) {
	                clearInterval(timer);
	            }
	        }, 1);
	    if (prop) {
	          elem[style] = from+unit;
	    } else {
	          elem.style[style] = from+unit;
	    }
	}

		let target = document.getElementById("contact");
		$('.contactx').on('click', ()=>{
				animate(document.scrollingElement || document.documentElement, "scrollTop", "", 0, target.offsetTop, 1000, true);

		})
}

/* Handling Page Transition */

var select = function(el){
  return el
} 

var options, tl = gsap.timeline();
options = [
  
  {
     from: '(.*)', 
     to: '.*',
    out: function(next) {
       tlq = gsap.timeline();

       tlq.to([select('nav'),select('.white'), select('.title'), select('.text-content')], .6, {y:"-36px",opacity: 0})

        .to(select('.paperTransition'), .3, {x:"100%" , ease: Power4.easeOut, onComplete:next})
    },
    in: (next) => {
       tl = gsap.timeline();
       tl
        .to(select('.paperTransition'), .3, {x:"200%", onComplete:next})
        .to(select('.blackPart'), .3, {top:"-100%", ease: Power4.easeOut})
        .to(select('.paperTransition'), 0, {x:"0%"})
    }

  },

];


const swup = new Swup({
  plugins: [new SwupJsPlugin(options)]
});



	function init() {
	    if (document.querySelector('.testimonials')) {
	       handleSlider()
	    }
	    if (document.querySelector('.js-accordion')) {
	       handleFaqs()
	    }
	    handleScrolling();
	    
	    // if (document.querySelector('#lightbox')) {
	    //     // something like $('#lightbox').lightbox()
	    // }
	    
	    // if (document.querySelector('#something-else')) {
	    //     // ...
	    // }
	$('html, body').animate({ scrollTop: 0 }, '0');

	}

// run once
init();

swup.on('contentReplaced', init);


});