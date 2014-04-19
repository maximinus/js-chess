// Classes for handling the board

function Position(xpos, ypos) {
	this.xpos = xpos;
	this.ypos = ypos;
};

Position.prototype.index = function() {
	return((this.ypos * BOARD_SIZE) + this.xpos);
};

Position.prototype.toString = function() {
	return('Position: x=' + this.xpos.toString() + ', y=' + this.ypos.toString());
};

function Direction(xpos, ypos) {
	this.xpos = xpos;
	this.ypos = ypos;
}

Direction.prototype = Object.create(Position.prototype);

//Define direction constants
Direction.UP = new Direction(1, 0);
Direction.LEFT = new Direction(0, -1);
Direction.RIGHT = new Direction(0, 1);
Direction.DOWN = new Direction(0, -1);
Direction.UPPER_RIGHT = new Direction(1, 1);
Direction.BOTTOM_RIGHT = new Direction(1, -1);
Direction.UPPER_LEFT = new Direction(-1, 1);
Direction.BOTTOM_LEFT = new Direction(-1, -1);


function ChessBoard() {
	// a board, represented in Javascript as an array
	this.board = new Array();
	for(var i=0; i<(BOARD_SIZE * BOARD_SIZE); i++) {
		this.board.push(EMPTY_SQUARE);
	}
	this._setupBoard(initial_start);
};

ChessBoard.prototype._setupBoard = function(pieces) {
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
		this.setSquare(new Position(xpos, ypos), index);
	};
};

ChessBoard.prototype.getIndex = function(index) {
	return(this.board[index]);
};

ChessBoard.prototype.getSquare = function(position) {
	return(this.board[position.index()]);
};

ChessBoard.prototype.setSquare = function(position, piece) {
	this.board[position.index()] = piece;
};

ChessBoard.prototype.movePiece = function(start, end) {
	this.board[end.index()] = this.board[start.index()];
	this.board[start.index()] = EMPTY_SQUARE;
};

