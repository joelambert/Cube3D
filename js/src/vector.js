/**
 * Cube3D
 * http://www.joelambert.co.uk/cube3d
 *
 * Copyright 2011, Joe Lambert. All rights reserved
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

var Vector = function(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
}

WebKitCSSMatrix.prototype.transformVector = function(v) {
	var xOut = this.m11*v.x + this.m12*v.y + this.m13*v.z;
	var yOut = this.m21*v.x + this.m22*v.y + this.m23*v.z;
	var zOut = this.m31*v.x + this.m32*v.y + this.m33*v.z;
	
	return new Vector(xOut, yOut, zOut);
};