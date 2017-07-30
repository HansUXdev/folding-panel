import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';


$(document).foundation();

// import Main from 'main';
// class Orbit extends Plugin {}
// export {Reveal};

// class Orbit extends Plugin {}
// export {Reveal};
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.js"></script>




var test = `
      <div class="cd-fold-content single-page">
        <h2>Title 1</h2>
        <em>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, laboriosam?</em>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus tempora nostrum aut quam praesentium veritatis nisi, odio eius, voluptatibus, iure neque commodi corrupti, inventore laborum fugiat itaque. Pariatur rem veritatis earum quia maxime praesentium accusantium ipsam veniam tenetur hic tempora, unde ipsa esse, aut est repellendus porro, maiores corporis illo!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus tempora nostrum aut quam praesentium veritatis nisi, odio eius, voluptatibus, iure neque commodi corrupti, inventore laborum fugiat itaque. Pariatur rem veritatis earum quia maxime praesentium accusantium ipsam veniam tenetur hic tempora, unde ipsa esse, aut est repellendus porro, maiores corporis illo!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, quidem, dolor! Necessitatibus libero suscipit voluptatum, ex voluptates. Ab, sit nam eum, officiis natus sunt totam aperiam id quo sed obcaecati itaque hic quia, facilis magni est sequi minima ex placeat commodi et modi eos consectetur recusandae. Adipisci quaerat voluptatum dolorem doloribus, ullam molestiae praesentium, saepe, voluptate quasi suscipit iure. Ipsam, iste excepturi dolore, explicabo numquam debitis ducimus laudantium? Aperiam perferendis accusantium quis magnam, odit doloribus, officia nesciunt voluptatum quidem voluptatibus veritatis temporibus adipisci dignissimos dolor quod beatae aliquam similique expedita! Distinctio rem tempora temporibus molestias veritatis accusamus ipsa pariatur iusto!
        </p>
      </div>
`;

/// Folding-Panel
// jQuery(document).ready(function($){

	// Selectors used to make the magic happen.
	var folding_panel = {
		main:'.folding-panel-container',
		gallery:'.cd-gallery',
		item:'.folding-panel-item',
		panel:'.cd-folding-panel',
		contents:'.cd-fold-content',
		// content_child: ' .cd-fold-content > *',
		close:'.cd-close',
		transition:'.no-csstransitions',
		overflow:'overflow-hidden',
		isOpen:'fold-is-open',
		open:'is-open',
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
	* Click Events
	*/
		/* open folding */
		gallery.on('click', 'a', function(event){
			event.preventDefault();
			// grabs content (html page) from the link
			openItemInfo($(this).attr('href'));
		});

		/* close folding content */
		foldingPanel.on('click', folding_panel.close, function(event){
			event.preventDefault();
			// remove the content by resetting it back to an empty string
			toggleContent('', false);
			$('body').removeClass(folding_panel.overflow);
		});
		gallery.on('click', function(event){
			/* detect click on .cd-gallery::before when the .cd-folding-panel is open */
			if($(event.target).is(folding_panel.gallery) && $('.'+folding_panel.isOpen).length > 0 ) toggleContent('', false);
		})

	/**
	* Opens Item Info when a click is fired
	* @function
	* @private
	* @param {Function} passes a url (or content) into toggleContent()
	*/
	function openItemInfo(url) {
		if (folding_panel.debug) {console.log('toggleContent() started..')}
		var mq = viewportSize();
		// if content is visible above the .cd-gallery - 
		// scroll before opening the folding panel 
		if( gallery.offset().top > $(window).scrollTop() && mq != 'mobile') 
		{
			if (folding_panel.debug) {console.log("Content is "+url);};

			$('body,html')
			.animate({'scrollTop': gallery.offset().top}, 100, function(){ 
				if (folding_panel.debug) {console.log("Content from "+url+" is visible ABOVE the gallery");};
	           	toggleContent(url, true);
	        }); 
	    } 
	 //    // else if
	 //    else if( gallery.offset().top + gallery.height() < $(window).scrollTop() + $(window).height()  && mq != 'mobile' ) {
		// 	/* if content is visible below the .cd-gallery - scroll before opening the folding panel */
			
		// 	$('body,html').animate({
		// 		'scrollTop': gallery.offset().top + gallery.height() - $(window).height()
		// 	}, 100, function(){ 
	 //           	toggleContent(url, true);
		// 		if (folding_panel.debug) {console.log("Content from "+url+" is visible BELOW the gallery");};
	 //        });
		// } 
		// else {
		// 	if (folding_panel.debug) {console.log('something else...')}
		// 	toggleContent(url, true);
		// }
	}


	/**
	* Toggles the content if
	* @function
	* @param {Function} url - 
	* @param {Function} bool - if true, then the function will load/show the content
	*		otherwise, it will remove the class name for: folding_panel.overflow, folding_panel.open, folding_panel.isOpen
	*/
	function toggleContent(url, bool) {
		if (folding_panel.debug) {console.log('toggleContent() started..')}
		if( bool ) {
			/* load and show new content */
			// select the panel, find the contents and load the content
			foldingPanel.find(folding_panel.contents)
			// load the url that is passed and select the all the direct children
			.load(url+' '+folding_panel.contents+' > *', 
				function(event){
					if (folding_panel.debug) {console.log('loading '+url+' content...')}
					setTimeout(function(){
						if (folding_panel.debug) {console.log('adding classes')}
						$('body').addClass(folding_panel.overflow);
						foldingPanel.addClass(folding_panel.open);
						mainContent.addClass(folding_panel.isOpen);
					}, 100);
				}
			);
		} 
		else {
			/* close the folding panel */
			var mq = viewportSize();
			foldingPanel.removeClass(folding_panel.open);
			mainContent.removeClass(folding_panel.isOpen);
			
			/* according to the mq, immediately remove the .overflow-hidden or wait for the end of the animation */
			(mq == 'mobile' || $('.no-csstransitions').length > 0 ) 
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

console.log('loaded');

// });

