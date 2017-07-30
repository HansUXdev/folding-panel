// class Orbit extends Plugin {}
// export {Reveal};
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.js"></script>

  /**
  * Creates a new instance of an orbit carousel.
  * @class
  * @name Orbit
  * @param {jQuery} element - jQuery object to make into an Orbit Carousel.
  * @param {Object} options - Overrides to the default plugin settings.
  */



/// Folding-Panel
// jQuery(document).ready(function($){

	// Selectors used to make the magic happen.
	var folding_panel = {
		panel:'.cd-folding-panel',
		gallery:'.cd-gallery',
		contents:'.cd-fold-content',
		content_child: ' .cd-fold-content > *',
		main:'.cd-main',
		item:'.cd-item',
		transition:'.no-csstransitions',
		overflow:'overflow-hidden',
		isOpen:'fold-is-open',
		open:'is-open',
		close:'.cd-close',
		debug: true,
	};
	// if (folding_panel.debug) {console.log('')}

	var gallery = $(folding_panel.gallery),  
		//$('.cd-gallery'),
		foldingPanel = $(folding_panel.panel),					
		//$('.cd-folding-panel'),
		mainContent  = $(folding_panel.main);					
		//$('.cd-main');

	/**
	* Opens Item Info when a click is fired
	* @function
	* @private
	* @param {Function} cb - a callback function to fire when complete.
	*/
	function openItemInfo(url) {
		var mq = viewportSize();
		// if content is visible above the .cd-gallery - 
		// scroll before opening the folding panel 
		if( gallery.offset().top > $(window).scrollTop() && mq != 'mobile') 
		{
			if (folding_panel.debug) {
				console.log("Content is visible ABOVE the gallery");
			};

			$('body,html')
			.animate({
				'scrollTop': gallery.offset().top
			}, 100, function(){ 
	           	toggleContent(url, true);
	        }); 
	    } 
	    // else if
	    else if( gallery.offset().top + gallery.height() < $(window).scrollTop() + $(window).height()  && mq != 'mobile' ) {
			/* if content is visible below the .cd-gallery - scroll before opening the folding panel */
			if (folding_panel.debug) {
				console.log("Content is visible BELOW the gallery");
			};
			$('body,html').animate({
				'scrollTop': gallery.offset().top + gallery.height() - $(window).height()
			}, 100, function(){ 
	           	toggleContent(url, true);
	        });
		} 
		else {
			toggleContent(url, true);
		}
	}


	/**
	* Toggles the content if
	* @function
	* @private
	* @param {Function} cb - 
	*/
	function toggleContent(url, bool) {
		if( bool ) {
			/* load and show new content */
			// 
			foldingPanel.find(folding_panel.contents)
			.load(url+folding_panel.content_child, function(event){
				setTimeout(function(){
					$('body').addClass(folding_panel.overflow);
					foldingPanel.addClass(folding_panel.open);
					mainContent.addClass(folding_panel.isOpen);
				}, 100);
			});
		} else {
			/* close the folding panel */
			var mq = viewportSize();
			foldingPanel.removeClass(folding_panel.open);
			mainContent.removeClass(folding_panel.isOpen);
			
			(mq == 'mobile' || $('.no-csstransitions').length > 0 ) 
				/* according to the mq, immediately remove the .overflow-hidden or wait for the end of the animation */
				? $('body').removeClass(folding_panel.overflow)
				
				: mainContent.find(folding_panel.item).eq(0).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					$('body').removeClass(folding_panel.overflow);
					mainContent.find(folding_panel.item).eq(0).off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
				});
		}
		
	}
	/**
	* Retrieves the content value of folding_panel.panel::before to check the actual mq
	* @function
	* @private
	* @param {Function} cb - a callback function to fire when complete.
	*/
	function viewportSize() {
		if (folding_panel.debug) {console.log('checking the viewport...')}
		// The Window.getComputedStyle() method gives the values of all the CSS properties of an element 
		// after applying the active stylesheets and resolving any basic computation those values may contain
		// var style = window.getComputedStyle(element[, pseudoElt]);
		return window.getComputedStyle(document.querySelector(folding_panel.panel), '::before')
		.getPropertyValue('content')
		.replace(/"/g, "")
		.replace(/'/g, "");
	}

	/**
	* Click Events
	*/
		/* open folding */
		gallery.on('click', 'a', function(event){
			event.preventDefault();
			openItemInfo($(this).attr('href'));
		});

		/* close folding content */
		foldingPanel.on('click', '.cd-close', function(event){
			event.preventDefault();
			toggleContent('', false);
		});
		gallery.on('click', function(event){
			/* detect click on .cd-gallery::before when the .cd-folding-panel is open */
			if($(event.target).is(folding_panel.gallery) && $('.'+folding_panel.isOpen).length > 0 ) toggleContent('', false);
		})


// });

