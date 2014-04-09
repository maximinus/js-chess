// basic start of chess game

var width = window.innerWidth * window.devicePixelRatio;
var height = window.innerHeight * window.devicePixelRatio;
var game = new Phaser.Game(width, height, Phaser.AUTO, '',
						   { preload: preload, create: create, update: update });

// we pollute the global namespace twice
var engine = new ChessEngine();
var gfx = new GFXEngine(game);

function preload() {
	game.load.image(BOARD, 'gfx/board.png');
	// load the other images programmatically
	for(var i=0; i<IMAGE_NAMES.length; i++) {
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
	gfx.drawBoard(engine.board);
	game.input.onDown.add(onClick, this);
};

function onClick() {
	// user has clicked screen. Need to do something?
	var x = game.input.x;
	var y = game.input.y;
	if(gfx.insideBoard(x, y) == false) {
		return; }
	// we clicked, it's on the board. Get co-ords
	var pos = gfx.screenToBoard(x, y);
	var piece = engine.board.getIndex(pos);
	if(piece == EMPTY_SQUARE) {
		gfx.clearHighlights();
		return; }
	// highlight
	gfx.drawHighlights(pos);
};

function update() {
	// called every clock tick
};

