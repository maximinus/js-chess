// basic start of chess game

var width = window.innerWidth * window.devicePixelRatio;
var height = window.innerHeight * window.devicePixelRatio;
var game = new Phaser.Game(width, height, Phaser.AUTO, '',
						   { preload: preload, create: create, update: update });

// we pollute the global namespace twice
var engine = new ChessEngine();
var gfx = new GFXEngine(game);

function preload() {
	game.load.image('board', 'gfx/board.png');
	// load the other images programmatically
	for(var i=0; i<IMAGE_NAMES.length; i++) {
		game.load.image(IMAGE_NAMES[i], 'gfx/' + IMAGE_NAMES[i] + '.png');
	}
}

function create() {
	// called once after preload
	// let the graphics engine initialise now
	game.stage.backgroundColor = BACKGROUND_COLOUR;
	gfx.init(width, height);
	gfx.drawBoard(engine.board);
}

function update() {
	// called every clock tick
	// all we do is poll user input (i.e. nothing for now)
}

