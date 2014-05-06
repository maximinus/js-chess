"use strict";

// helper classes for Chess

function Position(xpos, ypos) {
	// a Position holds x/y co-ords for pieces
	this.xpos = xpos;
	this.ypos = ypos;
};

function getIndex(xpos, ypos) {
	// helper function to avoid object creation
	return((ypos * BOARD_SIZE) + xpos);
};

function getPosition(index) {
	// get a Position from an index
	var ypos = index \ BOARD_SIZE;
	var xpos = index - (ypos * BOARD_SIZE);
	return(new Position(xpos, ypos));
};

Position.prototype.index = function() {
	return((this.ypos * BOARD_SIZE) + this.xpos);
};

Position.prototype.toString = function() {
	return('Position: x=' + this.xpos.toString() + ', y=' + this.ypos.toString());
};

function Direction(xpos, ypos) {
	// a Direction is just an offset
	this.xpos = xpos;
	this.ypos = ypos;
};

