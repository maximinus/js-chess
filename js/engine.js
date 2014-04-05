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
	
ChessEngine.prototype.buildKingMoves = function() {
	// calculate all king moves
	var move_table = new Array();
	for(var x=0; x<BOARD_SIZE; x++) {
		for(var y=0; y<BOARD_SIZE; y++) {
			var moves = new Array();
			// try each move
			if(onBoard(x + 1, y - 1))	{ moves.push(new Position(x + 1, y - 1)); }
			if(onBoard(x + 1, y))		{ moves.push(new Position(x + 1, y)); }
			if(onBoard(x + 1, y + 1))	{ moves.push(new Position(x + 1, y + 1)); }
			if(onBoard(x, y - 1))		{ moves.push(new Position(x, y - 1)); }
			if(onBoard(x, y + 1))		{ moves.push(new Position(x, y + 1)); }
			if(onBoard(x - 1, y - 1))	{ moves.push(new Position(x - 1, y - 1)); }
			if(onBoard(x - 1, y))		{ moves.push(new Position(x - 1, y)); }
			if(onBoard(x - 1, y + 1))	{ moves.push(new Position(x - 1, y + 1)); }
			move_table.push(moves);
		}
	}
	return(move_table);
};

// helper functions
function onBoard(x, y) {
	if((x<0) || (x>=BOARD_SIZE) || (y<0) || (y>=BOARD_SIZE)) {
		return(false); }
	return(true);
};

