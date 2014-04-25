"use strict";

function Game(player) {
	// stores all the details of the players
	if(player == WHITE) {
		this.white = PLAYER;
		this.black = AI; }
	else {
		this.white = AI;
		this.black = PLAYER; }
	// always start with white player
	this.turn = WHITE;
	// an empty array to store the moves
	this.moves = new Array();
};

function ChessEngine() {
	// class to handle playing a game of chess
	this.board = new ChessBoard();
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
	return(ChessBoard.getMoves(piece, position, this.board));
};
