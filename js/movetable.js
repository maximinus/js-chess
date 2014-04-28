"use strict";

// all moves are an array of rays cast out from the starting point.
// so the table is an array of all pieces -> array of all squares -> array of casts

function MoveTable() {
	// a static movetable
	this.moves = new Array(HIGHEST_PIECE + 1);
	this.moves[WHITE_KING] = this.buildKingMoves();
	this.moves[BLACK_KING] = this.buildKingMoves();
	this.moves[WHITE_QUEEN] = this.buildQueenMoves();
	this.moves[BLACK_QUEEN] = this.buildQueenMoves();
	this.moves[WHITE_ROOK] = this.buildRookMoves();
	this.moves[BLACK_ROOK] = this.buildRookMoves();
	this.moves[WHITE_BISHOP] = this.buildBishopMoves();
	this.moves[BLACK_BISHOP] = this.buildBishopMoves();
	this.moves[WHITE_KNIGHT] = this.buildKnightMoves();
	this.moves[BLACK_KNIGHT] = this.buildKnightMoves();
	this.moves[WHITE_PAWN] = this.buildWhitePawnMoves();
	this.moves[BLACK_PAWN] = this.buildBlackPawnMoves();
};

MoveTable.prototype.buildKingMoves = function() {
	// calculate all king moves
	var move_table = new Array();
	for(var y=0; y<BOARD_SIZE; y++) {
		for(var x=0; x<BOARD_SIZE; x++) {
			var moves = new Array();
			// try each move
			// Here what has pushed into moves is not a single Position but an array with one element
			if(onBoard(x + 1, y - 1))	{ moves.push([new Position(x + 1, y - 1)]); }
			if(onBoard(x + 1, y))		{ moves.push([new Position(x + 1, y)]); }
			if(onBoard(x + 1, y + 1))	{ moves.push([new Position(x + 1, y + 1)]); }
			if(onBoard(x, y - 1))		{ moves.push([new Position(x, y - 1)]); }
			if(onBoard(x, y + 1))		{ moves.push([new Position(x, y + 1)]); }
			if(onBoard(x - 1, y - 1))	{ moves.push([new Position(x - 1, y - 1)]); }
			if(onBoard(x - 1, y))		{ moves.push([new Position(x - 1, y)]); }
			if(onBoard(x - 1, y + 1))	{ moves.push([new Position(x - 1, y + 1)]); }
			move_table.push(moves);
		}
	}
	return(move_table);
};

MoveTable.prototype.buildRookMoves = function() {
	var move_table = new Array();
	for(var y=0; y<BOARD_SIZE; y++) {
		for(var x=0; x<BOARD_SIZE; x++) {
			var moves = new Array();
			// cast a line in all directions
			moves.push(castRay(new Position(x, y), new Direction(0, 1)));
			moves.push(castRay(new Position(x, y), new Direction(0, -1)));
			moves.push(castRay(new Position(x, y), new Direction(-1, 0)));
			moves.push(castRay(new Position(x, y), new Direction(1, 0)));
			move_table.push(moves);
		}
	}
	return(move_table);
};

MoveTable.prototype.buildQueenMoves = function() {
	// we just join the rook and bishop moves
	var bishop_moves = this.buildBishopMoves();
	var rook_moves = this.buildRookMoves();
	var queen_moves = new Array();
	for(var i=0; i<(BOARD_SIZE * BOARD_SIZE); i++) {
		var square_moves = new Array();
		// iterate over all rays in bishop + rooks
		for(var j in bishop_moves[i]) {
			square_moves.push(bishop_moves[i][j]);
		}
		for(var j in rook_moves[i]) {
			square_moves.push(rook_moves[i][j]);
		};
		queen_moves.push(square_moves);
	};
	return(queen_moves);
};

MoveTable.prototype.buildBishopMoves = function() {
	var move_table = new Array();
	for(var y=0; y<BOARD_SIZE; y++) {
		for(var x=0; x<BOARD_SIZE; x++) {
			var moves = new Array();
			// cast a line in all directions
			moves.push(castRay(new Position(x, y), new Direction(1, 1)));
			moves.push(castRay(new Position(x, y), new Direction(1, -1)));
			moves.push(castRay(new Position(x, y), new Direction(-1, -1)));
			moves.push(castRay(new Position(x, y), new Direction(-1, 1)));
			move_table.push(moves);
		}
	}
	return(move_table);
};

MoveTable.prototype.buildKnightMoves = function() {
	var move_table = new Array();
	for(var y=0; y<BOARD_SIZE; y++) {
		for(var x=0; x<BOARD_SIZE; x++) {
			var moves = new Array();
			if(onBoard(x + 1, y + 2))	{ moves.push([new Position(x + 1, y + 2)]); }
			if(onBoard(x + 2, y + 1))	{ moves.push([new Position(x + 2, y + 1)]); }
			if(onBoard(x + 2, y - 1))	{ moves.push([new Position(x + 2, y - 1)]); }
			if(onBoard(x + 1, y - 2))	{ moves.push([new Position(x + 1, y - 2)]); }
			if(onBoard(x - 1, y - 2))	{ moves.push([new Position(x - 1, y - 2)]); }
			if(onBoard(x - 2, y - 1))	{ moves.push([new Position(x - 2, y - 1)]); }
			if(onBoard(x - 2, y + 1))	{ moves.push([new Position(x - 2, y + 1)]); }
			if(onBoard(x - 1, y + 2))	{ moves.push([new Position(x - 1, y + 2)]); }
			move_table.push(moves);
		}
	}
	return(move_table);
};

MoveTable.prototype.buildWhitePawnMoves = function() {
	// just the basic moves, not including capture
	// rows 1 to 6 just move forward
	var move_table = new Array();
	for(var x=0; x<BOARD_SIZE; x++) {
		move_table.push([]); }
	for(var x=0; x<BOARD_SIZE; x++) {
		move_table.push([[new Position(x, 2), new Position(x, 3)]]);
	}
	for(var y=2; y<(BOARD_SIZE-1); y++) {
		for(var x=0; x<BOARD_SIZE; x++) {
			move_table.push([[new Position(x, y + 1)]]);
		}
	}
	for(var x=0; x<BOARD_SIZE; x++) {
		move_table.push([]); }
	return(move_table);
};

MoveTable.prototype.buildBlackPawnMoves = function() {
	var move_table = new Array();
	// y=0, push nothing
	for(var x=0; x<BOARD_SIZE; x++) {
		move_table.push([]); }
	// y=1-5, push one move forward
	for(var y=1; y<(BOARD_SIZE-2); y++) {
		for(var x=0; x<BOARD_SIZE; x++) {
			move_table.push([[new Position(x, y - 1)]]);
		}
	}
	// y=6, push 2 moves
	for(var x=0; x<BOARD_SIZE; x++) {
		move_table.push([[new Position(x, 5), new Position(x, 4)]]); }
	// y=7, push nothing
	for(var x=0; x<BOARD_SIZE; x++) {
		move_table.push([]); }
	return(move_table);
}

// helper functions
function onBoard(x, y) {
	if((x<0) || (x>=BOARD_SIZE) || (y<0) || (y>=BOARD_SIZE)) {
		return(false); }
	return(true);
};

function castRay(position, direction) {
	// start from position and add cast offsets to it every time
	// keep going until out of bounds
	var ray = new Array();

	position.xpos += direction.xpos;
	position.ypos += direction.ypos;
	while(onBoard(position.xpos, position.ypos)) {
		ray.push(new Position(position.xpos, position.ypos));
		position.xpos += direction.xpos;
		position.ypos += direction.ypos;
	}
	return(ray);
};

