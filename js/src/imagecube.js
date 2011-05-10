/**
 * Cube3D
 * http://www.joelambert.co.uk/cube3d
 *
 * Copyright 2011, Joe Lambert. All rights reserved
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

var ImageCube = function(elem, opts) {
	var _this = this;
	
	this.options = $.extend({
		size: 400
	}, opts);
	
	this.element = $(elem);
	
	// Get a list the images to use
	this.images = new Array();
	this.imageLoadedCount = 0;
	this.currentImageIndex = 0;
	this.nextImageIndex = 1;
	this.playing = false;
	
	// Find all available images and later paint them onto the 3D Cube
	this.element.find('img').each(function(index, found_img){
		_this.images.push(found_img.cloneNode(false));

		var image = new Image();
		image.onload = function() {
			_this.imageLoadedCount++;

			_this.width  = this.width;
			_this.height = this.height;
			
			if(_this.imageLoadedCount >= _this.images.length)
			{
				_this.finishedLoading();
			}
		};
		
		// Load the image to ensure its cached by the browser
		image.src = found_img.src;
		
		// Remove the images from the DOM
		$(found_img).remove();
	});
	
	this.container = $('<div class="imagecube"></div>');
	
	// Create a 3D cube
	this.cube = new Cube(this.container, this.options);

	this.element.append(this.container);
};

ImageCube.prototype = {
	constructor: ImageCube,
	finishedLoading: function() {
		for(var i=0; i<6; i++)
		{
			var imgIndex = i % this.images.length;
			var image = this.images[imgIndex];
			
			var shortestLength = image.width < image.height ? image.width : image.height;
			
			var dom = this.cube.getSide(i);
			dom.css({
				'background': 'url('+image.src+') center center'
			});
			
			if(true || shortestLength > this.options.size)
			{
				var scale = this.options.size / shortestLength;
				dom.css3({
					'background-size': (image.width*scale)+'px '+(image.height*scale)+'px'
				});
			}
		}
	}
};