"use strict";

// Chess game written in 100% Javascript
// All code released under the GPL3 license

var width = window.innerWidth * window.devicePixelRatio;
var height = window.innerHeight * window.devicePixelRatio;
var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });

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

Game.prototype.playerTurn = function() {
	// PLAYER is defined as true
	if(game.turn == WHITE) {
		return(game.white) }
	return(game.black);
};

// here come the singletons
var gfx = new GFXEngine(game);
var engine = new ChessEngine();
var chess = new Game(WHITE);

function preload() {
	game.load.image(BOARD, 'gfx/board.png');
	// load the other images programmatically
	for(var i=1; i<IMAGE_NAMES.length; i++) {
		game.load.image(IMAGE_NAMES[i], 'gfx/' + IMAGE_NAMES[i] + '.png');
	}
	game.load.image(HIGHLIGHT_MAIN, 'gfx/highlight_main.png');
	game.load.image(HIGHLIGHT_OTHER, 'gfx/highlight_other.png');
};

function create() {
	// called once after preload
	// let the graphics engine initialise now
	game.stage.backgroundColor = BACKGROUND_COLOUR;
	gfx.init(width, height);
	gfx.drawBoard(engine.getBoard());
	game.input.onDown.add(onClick, this);
};

function onClick() {
	// user has clicked screen. Need to do something?
	if(chess.playerTurn() == false) {
		// don't check the board
		return; }
	var x = game.input.x;
	var y = game.input.y;
	if(gfx.insideBoard(x, y) == false) {
		return; }
	// we clicked, it's on the board. Get co-ords
	var pos = gfx.screenToBoard(x, y);
	var piece = engine.getSquare(pos.index());
	// check possible moves
	var new_move = gfx.checkMove(pos);
	if(new_move != false) {
		// update board
		engine.movePiece(new_move[0], new_move[1]);
		// note: other player has moved, now the computer better move
		playAIMove();
		return; }
	if(piece == EMPTY_SQUARE) {
		gfx.clearHighlights();
		return; }
	gfx.drawHighlights(pos, engine.getMoves(piece, pos));	
};

function playAIMove() {
	// get the best move
	// display it
};

function update() {
	// called every clock tick
};

