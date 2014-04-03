// basic start of chess game

const SCREEN_WIDTH = 800
const SCREEN_HEIGHT	= 600

const EMPTY_SQUARE = -1
const WHITE_KING = 0
const WHITE_QUEEN = 1
const WHITE_ROOK = 2
const WHITE_BISHOP = 3
const WHITE_KNIGHT = 4
const WHITE_PAWN = 5
const BLACK_KING = 6
const BLACK_QUEEN = 7
const BLACK_ROOK = 8
const BLACK_BISHOP = 9
const BLACK_KNIGHT = 10
const BLACK_PAWN = 11

const IMAGE_NAMES = ['white_king', 'white_queen', 'white_rook', 'white_bishop', 'white_knight', 'white_pawn',
					 'black_king', 'black_queen', 'black_rook', 'black_bishop', 'black_knight', 'black_pawn']

const BOARD_SIZE = 8;

var game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.AUTO, '',
						   { preload: preload, create: create, update: update });


var Position = function(xpos, ypos) {
	this.xpos = xpos;
	this.ypos = ypos;
};

Position.prototype.index = function() {
	return((this.ypos * BOARD_SIZE) + this.xpos);
};

var ChessBoard = function() {
	// a board, represented in Javascript as an array
	this.board = new Array();
	for(var i=0; i<(BOARD_SIZE * BOARD_SIZE); i++) {
		this.board.push(EMPTY_SQUARE);
	}
};

ChessBoard.prototype.setupBoard = function() {
	// (0, 0) is the bottom left
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

ChessBoard.prototype.setSquare = function(position, piece) {
	this.board[position.index] = piece;
};

ChessBoard.prototype.movePiece = function(start, end) {
	this.board[end.index()] = this.board[start.index()];
	this.board[start.index()] = EMPTY_SQUARE;
};

function preload() {
	game.load.image('board', 'gfx/board.png');
	// load the other images programmatically
	for(var i=0; i<IMAGE_NAMES.length; i++) {
		game.load.image(IMAGE_NAMES[i], 'gfx/' + IMAGE_NAMES[i] + '.png');
	}
}

function create() {
	// just draw the board on the screen
	game.add.sprite(0, 0, 'board');
}

function update() {
	// called every clock tick
	// I think we can ignore, except for some "thinking" animation
}

