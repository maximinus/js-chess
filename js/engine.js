"use strict";

function ChessEngine() {
	// class to handle playing a game of chess
	this.board = new ChessBoard();
};


ChessEngine.prototype.getBestMove = function(colour) {
	// this is an absolutly terrible early method
	// get all the moves
	var all_moves = this.board.getAllPossibleMoves(colour);
	// generate all boards
	var all_boards = []
	for(var i in all_moves) {
		var from = all_moves[i][0]
		// [1] - second entry in this data is all moves to
		for(var j=1; k<all_moves[i][1].length; j++) {
			all_boards.push(this.board.makeNewBoard(from, all_moves[i][j]));
		}
	}
	// now we have all the boards
	if(colour == WHITE) {
		filter = highest; }
	else {
		filter = lowest; }
	var best_score = filter(1000, -1000) * -1;
	var index = 0;
	for(var i in all_boards) {
		var score = all_boards[i].score();
		best_score = filter(score, best_score);
		if(score == best_score) {
			index = i; }
	}
	// i is the index of the board with the best move
};

// simple layer API to enfore encapsulation
ChessEngine.prototype.getSquare = function(position) {
	return(this.board.getSquare(position));
};

ChessEngine.prototype.movePiece = function(from, to) {
	this.board.movePiece(from, to);
};

ChessEngine.prototype.getBoard = function() {
	return(this.board);
};

ChessEngine.prototype.getMoves = function(piece, position) {
	// return all current valid moves for this piece
	return(ChessBoard.getMoves(piece, position.index(), this.board));
};

function lowest(a, b) {
	if(a < b) {
		return(a); }
	return(b);
};

function highest(a, b) {
	if(a < b) {
		return(b); }
	return(a);
};
