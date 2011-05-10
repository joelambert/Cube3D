/**
 * Cube3D
 * http://www.joelambert.co.uk/cube3d
 *
 * Copyright 2011, Joe Lambert. All rights reserved
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function(){
	/**
	 * Helper function for cross-browser CSS3 support, prepends all possible prefixes to all properties passed in
	 * @param {Object} props Key/value pairs of CSS3 properties
	 */
	$.fn.css3 = function(props) {
		var css = {};
		var prefixes = ['webkit', 'moz', 'ms', 'o'];
		
		for(var prop in props)
			for(var i=0; i<prefixes.length; i++)
				css['-'+prefixes[i]+'-'+prop] = props[prop];
			
		this.css(css);
		return this;
	};
	
	/**
	 * Helper function to bind to the correct transition end event
	 * @param {function} callback The function to call when the event fires
	 */
	$.fn.transitionEnd = function(callback) {
		var _this = this;
		
		var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd'];
		
		for(var i=0; i < events.length; i++)
		{
			this.bind(events[i], function(event){
				// Automatically stop listening for the event
				for(var j=0; j<events.length;j++)
					$(this).unbind(events[j]);

				// Perform the callback function
				if(callback)
					callback.call(this);
			});
		}
	};
})();