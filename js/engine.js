"use strict";

function ChessEngine() {
	// class to handle playing a game of chess
	this.board = new ChessBoard();
	//this.worker = new Worker('worker.js');
};

function test(event) {
	console.log(event.data);
};

ChessEngine.prototype.getBestMove = function() {
	this.worker.postMessage('hello');
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
