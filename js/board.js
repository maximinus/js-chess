"use strict";

// Classes for handling the board used by the Chess engine

function ChessBoard(array) {
	// a board, represented in Javascript as an unsigned bytes array
	this.board = array || new Uint8Array(BOARD_SIZE * BOARD_SIZE);
	for(var i=0; i<(BOARD_SIZE * BOARD_SIZE); i++) {
		this.board[i]= EMPTY_SQUARE;
	}
}

// attach a static variable + function shared by all boards
// I'm not sure this is the correct approach. Where does "this" point to
// in these functions? Anyway, it works right now.

ChessBoard.table = new MoveTable();

ChessBoard.getMoves = function(piece, index, board) {
	var moves = ChessBoard.table.moves[piece][index];
	// loop through all moves and all rays
	var possibles = new Array();
	// for all rays	
	for(var i in moves) {
		// for each move in the ray...
		for(var j in moves[i]) {
			var square = board.getSquare(moves[i][j]);
			//enconter a piece
			if((square != EMPTY_SQUARE)) {
				// if it's different color add that square to the array and stop,
				// otherwise simply stop
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

ChessBoard.prototype.getAllPossibleMoves = function(colour) {
	// cycle through the board
	var all_moves = [];
	if(colour == WHITE) {
		var isRightColour = isBlack; }
	else {
		var isRightColour = isWhite; }
	// now let's get down to business
	for(var i in this.board) {
		var piece = this.board[i];
		if(isRightColour(piece)) {
			all_moves.append([i, ChessBoard.getMoves(piece, i, this.board)]);
		}
	}
	return(all_moves);
};

ChessBoard.prototype.setupBoard = function(pieces) {
	// (0, 0) is the bottom left
	// data passed is sourced from JSON, or the 'start' variable
	// it is a ditionary, so we parse through it:
	for(var i in pieces) {
		// key is "xpos, ypos", split it
		var position = i.split(',');
		if(position.length != 2) {
			return(false); }
		var xpos = parseInt(position[0])
		var ypos = parseInt(position[1])
		if((xpos < 0) || (xpos >= BOARD_SIZE) || (ypos < 0) || (ypos >= BOARD_SIZE)) {
			return(false); }
		var index = IMAGE_NAMES.indexOf(pieces[i]);
		if(index == -1) {
			return(false); }
		// finally!
		this.setSquare((ypos * BOARD_SIZE) + xpos, index);
	};
};

ChessBoard.prototype.makeNewBoard = function(from, to) {
	// return a new board
	var new_board = new ChessBoard(this.board.board);
	new_board.movePiece(from, to);
	return(new_board);
};

ChessBoard.prototype.getSquare = function(index) {
	return(this.board[position]); }
};

ChessBoard.prototype.setSquare = function(index, piece) {
	this.board[index] = piece;
};

ChessBoard.prototype.movePiece = function(start, end) {
	this.board[end] = this.board[start];
	this.board[start] = EMPTY_SQUARE;
};

ChessBoard.prototype.score = function() {
	// iterate along board
	// TODO: use a reduce function?
	var total = 0;
	for(var i in this.board) {
		total += SCORES[this.board[i]];
	}
	return(total);
};

// helper functions
function differentColour(p1, p2) {
	return((p1 <= WHITE_MAX) && (p2 > WHITE_MAX));
};

function isWhite(piece) {
	return((piece >= WHITE_MIN) && (piece <= WHITE_MAX));
};

function isBlack(piece) {
	return((piece >= BLACK_MIN) && (piece <= BLACK_MAX));
};


