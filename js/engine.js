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
	var rook_moves = this.buildRookMoves();
	var bishop_moves = this.buildBishopMoves();
	this.moves[WHITE_KING] = king_moves;
	this.moves[BLACK_KING] = king_moves;
	this.moves[WHITE_ROOK] = rook_moves;
	this.moves[BLACK_ROOK] = rook_moves;
	this.moves[WHITE_BISHOP] = bishop_moves;
	this.moves[BLACK_BISHOP] = bishop_moves;
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
	// is the piece black?
	if(piece > WHITE_MAX) { // it's black
		var colour = new Function('piece', 'return(piece <= WHITE_MAX);'); }
	else { // white
		var colour = new Function('piece', 'return(piece > WHITE_MAX);'); }
	// loop through all moves and all rays
	var possibles = new Array();
	// for all rays
	for(var i in moves) {
		// for each move in the ray...
		for(var j in moves[i]) {
			var piece = this.board.getSquare(moves[i][j])
			if((piece != EMPTY_SQUARE) && (colour(piece))) {
				break; }
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

