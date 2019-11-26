ATInternet.Scroll = ATInternet.Scroll || {};
ATInternet.Tracker.Plugins.Scroll = function(parent) {
	var _this = this,
		maxScroll = 0,
		documentHeight = $(document).height(),
		defaultfirst = 40 / 100 * documentHeight,
		defaultinterval = 20 / 100 * documentHeight,
		first,
		interval;
	
	parent.Scroll = {};
	parent.Scroll.init = function(params) {

		if(params) {
            // ---> UPDATE: please not that the updated script was not tested with params
			first = parseInt((params.hasOwnProperty('first')) ? params.first : defaultfirst);
			interval = parseInt((params.hasOwnProperty('interval')) ? params.interval : defaultinterval);

			$(document).scroll(function(e) {
                // grab the scroll amount and the window height
                // ---> UPDATE: add window height to scollAmount to trigger when threshold comes into side not gets out of sight
				var scrollAmount = $(window).height() + $(window).scrollTop();
				if (scrollAmount < maxScroll) {
					return
				}
                
                // UPDATE: relocated 'maxScroll'
				//       scrollAT = '[' + maxScroll + ']';
				// calculate the percentage the user has scrolled down the page
				var scrollPercent = (scrollAmount / documentHeight) * 100;
				// ---> UPDATE: relocated 'scrollAT'
				if (scrollAmount > first) {
                    // ---> UPDATE: increment maxScroll once with first and then each hit by interval
					maxScroll = maxScroll + first + interval;
                    // ---> UPDATE: calculation of % via maxScroll for values equal to interval steps
                    var scrollAT = '[' + (Math.floor(maxScroll/documentHeight * 10) * 10) + '%25]';
					sendATHit();
                    // ---> UPDATE: reset first to 0 so it will be added to maxScroll only once
                    first = 0;
				}


				function sendATHit() {
					parent.publisher.send({
						impression: {
							campaignId: '[Scroll]',
							creation: scrollAT
						}
					});
				}

			});
		}
	}

};
ATInternet.Tracker.addPlugin('Scroll');
