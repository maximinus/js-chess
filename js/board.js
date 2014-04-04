// Classes for handling the board

Position = function(xpos, ypos) {
	this.xpos = xpos;
	this.ypos = ypos;
};

Position.prototype.index = function() {
	return((this.ypos * BOARD_SIZE) + this.xpos);
};

ChessBoard = function() {
	// a board, represented in Javascript as an array
	this.board = new Array();
	for(var i=0; i<(BOARD_SIZE * BOARD_SIZE); i++) {
		this.board.push(EMPTY_SQUARE);
	}
	this.setupBoard();
};

ChessBoard.prototype.setupBoard = function() {
	// (0, 0) is the bottom left
	// this is the standard startup position
	this.setSquare(new Position(0, 0), WHITE_ROOK);
	this.setSquare(new Position(1, 0), WHITE_KNIGHT);
	this.setSquare(new Position(2, 0), WHITE_BISHOP);
	this.setSquare(new Position(3, 0), WHITE_QUEEN);
	this.setSquare(new Position(4, 0), WHITE_KING);
	this.setSquare(new Position(5, 0), WHITE_BISHOP);
	this.setSquare(new Position(6, 0), WHITE_KNIGHT);
	this.setSquare(new Position(7, 0), BLACK_ROOK);
	this.setSquare(new Position(0, 7), BLACK_ROOK);
	this.setSquare(new Position(1, 7), BLACK_KNIGHT);
	this.setSquare(new Position(2, 7), BLACK_BISHOP);
	this.setSquare(new Position(3, 7), BLACK_QUEEN);
	this.setSquare(new Position(4, 7), BLACK_KING);
	this.setSquare(new Position(5, 7), BLACK_BISHOP);
	this.setSquare(new Position(6, 7), BLACK_KNIGHT);
	this.setSquare(new Position(7, 7), BLACK_ROOK);
	for(var i=0; i<BOARD_SIZE; i++) {
		this.setSquare(new Position(i, 1), WHITE_PAWN);
		this.setSquare(new Position(i, 6), BLACK_PAWN);
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

