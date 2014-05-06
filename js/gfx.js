"use strict";

// code to handle all drawing to screen and animations

function GFXPiece(board_pos, sprite) {
	// a Position
	this.board = board_pos;
	this.sprite = sprite;
};

GFXPiece.prototype.move = function(board_pos, screen_pos) {
	// both of these parameters are Positions
	this.board = board_pos;
	this.sprite.x = screen_pos.xpos;
	this.sprite.y = screen_pos.ypos;
};

GFXPiece.prototype.matches = function(position) {
	// is the position sent equal to our position?
	if((position.xpos == this.board.xpos) && (position.ypos == this.board.ypos)) {
		return(true); };
	return(false);
};

function GFXEngine(game) {
	// class to handle all website and screen interactions
	this.game = game;
};

GFXEngine.prototype.init = function(width, height) {
	// both of these next 2 are an array of ChessPieces
	this.gfx_pieces = new Array();
	this.highlights = new Array();
	this.width = width;
	this.height = height;
	// now we need to calculate some constants we use
	// where is the top left of the board?
	this.boardx = (this.width - BOARD_GFX_SIZE) / 2
	this.boardy = (this.height - BOARD_GFX_SIZE) / 2
};

GFXEngine.prototype.pieceFactory = function(xpos, ypos, image) {
	var pos = this.boardToScreen(xpos, ypos);
	var sprite = this.game.add.sprite(pos.xpos, pos.ypos, image);
	return(new GFXPiece(new Position(xpos, ypos), sprite));
};

GFXEngine.prototype.insideBoard = function(xpos, ypos) {
	if((ypos < this.boardy + BORDER_SIZE) || (ypos > (this.boardy + BOARD_SQUARE_SIZE))) {
		return(false); }
	if((xpos < this.boardx + BORDER_SIZE) || (xpos > (this.boardx + BOARD_SQUARE_SIZE))) {
		return(false); }
	return(true);
};

GFXEngine.prototype.drawBoard = function(board) {
	this.game.add.sprite(this.boardx, this.boardy, BOARD);
	// this should be rare! Almost always we are just moving pieces.
	// this means that when we draw the board we have to hold a differing representation
	// of the board in memory
	// keeping 2 boards together would be highly ineffecient in the chess solving part
	// iterate through the board and grab all the pieces
	for(var x=0; x<BOARD_SIZE; x++) {
		for(var y=0; y<BOARD_SIZE; y++) {
			var piece = board.getSquare(getIndex(x, y));
			if(piece != EMPTY_SQUARE) {
				this.gfx_pieces.push(this.pieceFactory(x, y, IMAGE_NAMES[piece]));
			}
		}
	}
};

GFXEngine.prototype.updateBoard = function(xpos, ypos) {
	// xpos and ypos are click co-ords
	if(this.insideBoard(xpos, ypos)) {
		this.highlightSquare(xpos, ypos);
	}
};

GFXEngine.prototype.checkMove = function(position) {
	console.log("pos:", position);
	console.log("highlights:", this.highlights);
	if(this.highlights.length < 2) {
		return(false); }
	// does the position given match any current highlight?
	for(var i=1; i<this.highlights.length; i++) {
		if(this.highlights[i].matches(position)) {
			// found our match, so we need to move a piece
			var from = this.highlights[0].board;
			var to = this.highlights[i].board;
			this.move(from, to);
			this.clearHighlights();
			return([from, to]);
		}
	}
	return(false);
};

GFXEngine.prototype.move = function(from, to) {
	// move a piece. First we find the piece
	for(var i in this.gfx_pieces) {
		if(this.gfx_pieces[i].matches(from)) {
			// then move it
			this.gfx_pieces[i].move(to, this.boardToScreen(to.xpos, to.ypos)); 
			return;
		}
	}
};

GFXEngine.prototype.drawHighlights = function(pos, moves) {
	// xpos / ypos board co-ords
	this.clearHighlights();
	var place = getPosition(pos);
	// first piece pushed must be original piece highlight
	this.highlights.push(this.pieceFactory(place.xpos, place.ypos, HIGHLIGHT_MAIN));
	// do the same with the possible moves
	for(var i in moves) {
		var place = getPosition(moves[i]);
		this.highlights.push(this.pieceFactory(place.xpos, place.ypos, HIGHLIGHT_OTHER));
	}
};

GFXEngine.prototype.clearHighlights = function() {
	for(var i in this.highlights) {
		this.highlights[i].sprite.destroy();
	}
	this.highlights = new Array();
};

GFXEngine.prototype.screenToBoard = function(xpos, ypos) {
	// return a position that is the board co-ordinates
	// you must check co-ords with insideBoard() first
	var x = Math.floor((xpos - (this.boardx + BORDER_SIZE)) / SQUARE_SIZE);
	var y = (BOARD_SIZE - 1) - Math.floor((ypos - (this.boardy + BORDER_SIZE)) / SQUARE_SIZE);
	return(new Position(x, y));
};

GFXEngine.prototype.boardToScreen = function(xpos, ypos) {
	var x = this.boardx + BORDER_SIZE + (xpos * SQUARE_SIZE);
	var y = (this.boardy + BORDER_SIZE + BOARD_SQUARE_SIZE) -((ypos + 1) * SQUARE_SIZE);
	return(new Position(x, y));
};

