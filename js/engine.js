// class to handle solving a game of chess

ChessEngine = function() {
	// class to handle playing a game of chess
	this.board = new ChessBoard();
	this.buildMoveTable();
};

ChessEngine.prototype.buildMoveTable = function() {
	// build all moves
	this.moves = new Array(HIGHEST_PIECE + 1);
	var king_moves = this.buildKingMoves();
	var queen_moves = this.buildQueenMoves();
	var rook_moves = this.buildRookMoves();
	var bishop_moves = this.buildBishopMoves();
	var knight_moves = this.buildKnightMoves();
	this.moves[WHITE_KING] = king_moves;
	this.moves[BLACK_KING] = king_moves;
	this.moves[WHITE_QUEEN] = queen_moves;
	this.moves[BLACK_QUEEN] = queen_moves;
	this.moves[WHITE_ROOK] = rook_moves;
	this.moves[BLACK_ROOK] = rook_moves;
	this.moves[WHITE_BISHOP] = bishop_moves;
	this.moves[BLACK_BISHOP] = bishop_moves;
	this.moves[WHITE_KNIGHT] = knight_moves;
	this.moves[BLACK_KNIGHT] = knight_moves;
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

ChessEngine.prototype.buildRookMoves = function() {
	var move_table = new Array();
	for(var y=0; y<BOARD_SIZE; y++) {
		for(var x=0; x<BOARD_SIZE; x++) {
			var moves = new Array();
			// cast a line in all directions
			moves.push(this.castRay(new Position(x, y), new Position(1, 0)));
			moves.push(this.castRay(new Position(x, y), new Position(0, -1)));
			moves.push(this.castRay(new Position(x, y), new Position(0, 1)));
			moves.push(this.castRay(new Position(x, y), new Position(-1, 0)));
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
		square_moves = new Array();
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
			moves.push(this.castRay(new Position(x, y), new Position(1, 1)));
			moves.push(this.castRay(new Position(x, y), new Position(1, -1)));
			moves.push(this.castRay(new Position(x, y), new Position(-1, 1)));
			moves.push(this.castRay(new Position(x, y), new Position(-1, -1)));
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

ChessEngine.prototype.castRay = function(position, cast) {
	// start from position and add cast offsets to it every time
	// keep going until out of bounds
	var ray = new Array();
	position.xpos += cast.xpos;
	position.ypos += cast.ypos;
	while(onBoard(position.xpos, position.ypos)) {
		ray.push(new Position(position.xpos, position.ypos));
		position.xpos += cast.xpos;
		position.ypos += cast.ypos;
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
				if(differentColour(piece, square)) {
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
function onBoard(x, y) {
	if((x<0) || (x>=BOARD_SIZE) || (y<0) || (y>=BOARD_SIZE)) {
		return(false); }
	return(true);
};

function differentColour(p1, p2) {
	return((p1 <= WHITE_MAX) && (p2 > WHITE_MAX));
};

