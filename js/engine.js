// class to handle solving a game of chess
"use strict"
function ChessEngine() {
	// class to handle playing a game of chess
	this.board = new ChessBoard();
	this.buildMoveTable();
};

ChessEngine.prototype.buildMoveTable = function() {
	// build all moves
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

// all moves are an array of rays cast out from the starting point.
// so the table is an array of all pieces -> array of all squares -> array of casts

ChessEngine.prototype.buildKingMoves = function() {
	// calculate all king moves
	var move_table = new Array();
	for(var y=0; y<BOARD_SIZE; y++) {
		for(var x=0; x<BOARD_SIZE; x++) {
			var moves = new Array();
			// try each move
			if(ChessEngine._onBoard(x + 1, y - 1))	{ moves.push([new Position(x + 1, y - 1)]); }
			if(ChessEngine._onBoard(x + 1, y))		{ moves.push([new Position(x + 1, y)]); }
			if(ChessEngine._onBoard(x + 1, y + 1))	{ moves.push([new Position(x + 1, y + 1)]); }
			if(ChessEngine._onBoard(x, y - 1))		{ moves.push([new Position(x, y - 1)]); }
			if(ChessEngine._onBoard(x, y + 1))		{ moves.push([new Position(x, y + 1)]); }
			if(ChessEngine._onBoard(x - 1, y - 1))	{ moves.push([new Position(x - 1, y - 1)]); }
			if(ChessEngine._onBoard(x - 1, y))		{ moves.push([new Position(x - 1, y)]); }
			if(ChessEngine._onBoard(x - 1, y + 1))	{ moves.push([new Position(x - 1, y + 1)]); }
			move_table.push(moves);
		}
	}
	return(move_table);
};

ChessEngine.prototype.buildRookMoves = function() {
	var move_table = new Array();
	for(var y=0; y<BOARD_SIZE; y++) {
		for(var x=0; x<BOARD_SIZE; x++) {
			var moves = new Array();
			// cast a line in all directions
			moves.push(this._castRay(new Position(x, y), Direction.UP));
			moves.push(this._castRay(new Position(x, y), Direction.LEFT));
			moves.push(this._castRay(new Position(x, y), Direction.RIGHT));
			moves.push(this._castRay(new Position(x, y), Direction.DOWN));
			move_table.push(moves);
		}
	}
	return(move_table);
};

ChessEngine.prototype.buildQueenMoves = function() {
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

ChessEngine.prototype.buildBishopMoves = function() {
	var move_table = new Array();
	for(var y=0; y<BOARD_SIZE; y++) {
		for(var x=0; x<BOARD_SIZE; x++) {
			var moves = new Array();
			// cast a line in all directions
			moves.push(this._castRay(new Position(x, y), Direction.UPPER_RIGHT));
			moves.push(this._castRay(new Position(x, y), Direction.BOTTOM_RIGHT));
			moves.push(this._castRay(new Position(x, y), Direction.UPPER_LEFT));
			moves.push(this._castRay(new Position(x, y), Direction.BOTTOM_LEFT));
			move_table.push(moves);
		}
	}
	return(move_table);
};

ChessEngine.prototype.buildKnightMoves = function() {
	var move_table = new Array();
	for(var y=0; y<BOARD_SIZE; y++) {
		for(var x=0; x<BOARD_SIZE; x++) {
			var moves = new Array();
			if(ChessEngine._onBoard(x + 1, y + 2))	{ moves.push([new Position(x + 1, y + 2)]); }
			if(ChessEngine._onBoard(x + 2, y + 1))	{ moves.push([new Position(x + 2, y + 1)]); }
			if(ChessEngine._onBoard(x + 2, y - 1))	{ moves.push([new Position(x + 2, y - 1)]); }
			if(ChessEngine._onBoard(x + 1, y - 2))	{ moves.push([new Position(x + 1, y - 2)]); }
			if(ChessEngine._onBoard(x - 1, y - 2))	{ moves.push([new Position(x - 1, y - 2)]); }
			if(ChessEngine._onBoard(x - 2, y - 1))	{ moves.push([new Position(x - 2, y - 1)]); }
			if(ChessEngine._onBoard(x - 2, y + 1))	{ moves.push([new Position(x - 2, y + 1)]); }
			if(ChessEngine._onBoard(x - 1, y + 2))	{ moves.push([new Position(x - 1, y + 2)]); }
			move_table.push(moves);
		}
	}
	return(move_table);
};

ChessEngine.prototype.buildWhitePawnMoves = function() {
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

ChessEngine.prototype.buildBlackPawnMoves = function() {
	var move_table = new Array();
	for(var x=0; x<BOARD_SIZE; x++) {
		move_table.push([]); }
	for(var y=1; y<(BOARD_SIZE-2); y++) {
		for(var x=0; x<BOARD_SIZE; x++) {
			move_table.push([[new Position(x, y - 1)]]);
		}
	}
	for(var x=0; x<BOARD_SIZE; x++) {
		move_table.push([[new Position(x, 6), new Position(x, 5)]]); }
	for(var x=0; x<BOARD_SIZE; x++) {
		move_table.push([]); }
	return(move_table);
}

ChessEngine.prototype._castRay = function(position, direction) {
	// start from position and add cast offsets to it every time
	// keep going until out of bounds
	var ray = new Array();
	position.xpos += direction.xpos;
	position.ypos += direction.ypos;
	while(ChessEngine._onBoard(position.xpos, position.ypos)) {
		ray.push(new Position(position.xpos, position.ypos));
		position.xpos += direction.xpos;
		position.ypos += direction.ypos;
	}
	return(ray);
};

ChessEngine.prototype.getMoves = function(piece, position) {
	var moves = this.moves[piece][position.index()];
	// loop through all moves and all rays
	var possibles = new Array();
	// for all rays	
	for(var i in moves) {
		// for each move in the ray...
		for(var j in moves[i]) {
			var square = this.board.getSquare(moves[i][j])
			if((square != EMPTY_SQUARE)) {
				if(ChessEngine._differentColour(piece, square)) {
					possibles.push(moves[i][j]);
				}
				break;
			}
			else {
				possibles.push(moves[i][j]); }
		}
	}
	return(possibles);
};

// helper functions
ChessEngine._onBoard = function (x, y) {
	if((x<0) || (x>=BOARD_SIZE) || (y<0) || (y>=BOARD_SIZE)) {
		return(false); }
	return(true);
};

ChessEngine._differentColour = function (p1, p2) {
	return((p1 <= WHITE_MAX) && (p2 > WHITE_MAX));
};

