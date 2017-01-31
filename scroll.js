ATInternet.Scroll = ATInternet.Scroll || {};
ATInternet.Tracker.Plugins.Scroll = function(parent) {
	var _this = this,
		maxScroll = 0,
        documentHeight = $(document).height(),
        defaultfirst = 30 / 100 * documentHeight,
        defaultinterval = 10 / 100 * documentHeight,
		first,
		interval;
        
	parent.Scroll = {};
	parent.Scroll.init = function(params) {
			
		if(params) {
			first = parseInt((params.hasOwnProperty('first')) ? params.first : defaultfirst);
			interval = parseInt((params.hasOwnProperty('interval')) ? params.interval : defaultinterval);
			
			$(document).scroll(function(e) {
				// grab the scroll amount and the window height
				var scrollAmount = $(window).scrollTop();
				if (scrollAmount < maxScroll) {
					return
				}
                
				maxScroll = parseInt(scrollAmount + interval);
				//       scrollAT = '[' + maxScroll + ']';
				// calculate the percentage the user has scrolled down the page
				var scrollPercent = (scrollAmount / documentHeight) * 100;
				var scrollAT = '[' + Math.round(parseInt(scrollPercent / 10) * 10) + '%25]';
				if (scrollAmount > first) {
					sendATHit();
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