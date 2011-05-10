/**
 * Cube3D
 * http://www.joelambert.co.uk/cube3d
 *
 * Copyright 2011, Joe Lambert. All rights reserved
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

var Cube = function(elem, opts) {
	var _this = this;
	
	this.options = $.extend({
		size: 400,
		delay: 800,
		faceCSS: {
			background: 'red'
		}
	}, opts);
	
	this.element = $(elem);
	
	// This represents the camera/viewport
	this.surface = $('<div class="cubeviewport"></div>').css3({
		'transform-style': 'preserve-3d',
		'perspective': 600,
		'perspective-origin': '50% 50%'
	});
	
	this.element.append(this.surface);
	
	// This is the container for the cube sides
	this.container = $('<div class="cube"></div>').css({
		width: this.options.size+'px',
		height: this.options.size+'px',
		position: 'relative'
	}).css3({
		'transform': flux.browser.translate(0,0,-this.options.size/2)
	});
	this.surface.append(this.container);
	
	this.drawCube();
	
	this.container.css3({
		'transition-duration': '4000ms',
		'transition-timing-function': 'linear',
		'transition-property': 'all',
		'transform-style': 'preserve-3d'
	});
};

Cube.prototype = {
	sides: [],
	constructor: Cube,
	
	// Perform set rotations
	up: function() {
		this.applyRotation(new Vector(1,0,0), 90);
	},
	down: function() {
		this.applyRotation(new Vector(1,0,0), -90);
	},
	left: function() {
		this.applyRotation(new Vector(0,1,0), -90);
	},
	right: function() {
		this.applyRotation(new Vector(0,1,0), 90);
	},
	
	// Perform matrix transformations
	applyRotation: function(vector, angle) {
		var _this = this;
		
		// Get the current Matrix
		var m = new WebKitCSSMatrix(this.container.css('webkitTransform'));
		
		// Work out what the vector looks like under the current Matrix
		vector = m.transformVector(vector);
		
		// Rotate the Matrix around the transformed vector
		var newMatrix = m.rotateAxisAngle(vector.x, vector.y, vector.z, angle);
		
		this.container.css3({
			'transition-duration': this.options.delay+'ms',
			'transition-timing-function': 'linear'
		});
		
		setTimeout(function(){
			_this.container.get(0).style.webkitTransform = newMatrix;
		}, 5);
	},
	
	// Render the 6 sides of the Cube and position them in 3D space
	drawCube: function() {
		// Add the 6 sides of the cube
		var defaultCSS = $.extend(this.options.faceCSS, {
			position: 'absolute',
			top: '0px',
			left: '0px',
			width: this.options.size+'px',
			height: this.options.size+'px'
		});
		
		var side1 = $('<div></div>').css3({
			'transform': flux.browser.translate(0, 0, this.options.size/2)
		}).css(defaultCSS);
		
		var side2 = $('<div></div>').css3({
			'transform': flux.browser.rotateX(90) + ' ' + flux.browser.translate(0, 0, this.options.size/2)
		}).css(defaultCSS);
		
		var side3 = $('<div></div>').css3({
			'transform': flux.browser.rotateY(90) + ' ' + flux.browser.translate(0, 0, this.options.size/2)
		}).css(defaultCSS);
		
		var side4 = $('<div></div>').css3({
			'transform': flux.browser.rotateX(-90) + ' ' + flux.browser.translate(0, 0, this.options.size/2)
		}).css(defaultCSS);
		
		var side5 = $('<div></div>').css3({
			'transform': flux.browser.rotateY(-90) + ' ' + flux.browser.translate(0, 0, this.options.size/2)
		}).css(defaultCSS);
		
		var side6 = $('<div></div>').css3({
			'transform': flux.browser.translate(0, 0, -this.options.size/2)
		}).css(defaultCSS);
		
		this.sides.push(side1);
		this.sides.push(side2);
		this.sides.push(side3);
		this.sides.push(side4);
		this.sides.push(side5);
		this.sides.push(side6);
		
		for(var i=0; i<this.sides.length; i++)
			this.container.append(this.sides[i]);
	},
	
	// Accessor function
	getSide: function(index) {
		index = index % this.sides.length;
		return this.sides[index];
	}
};