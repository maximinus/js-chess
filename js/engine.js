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
	this.moves[WHITE_KING] = king_moves;
	this.moves[BLACK_KING] = king_moves;
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

ChessEngine.prototype.getMoves = function(piece, position) {
	var moves = this.moves[piece][position.index()];
	// is the piece black?
	if(piece > WHITE_MAX) { // it's black
		var colour = new Function('piece', 'return(piece <= WHITE_MAX);'); }
	else { // white
		var colour = new Function('piece', 'return(piece > WHITE_MAX);'); }
	// loop through all moves and all rays
	var possibles = new Array();
	for(var i in moves) {
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

