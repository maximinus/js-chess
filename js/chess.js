// basic start of chess game

var game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.AUTO, '',
						   { preload: preload, create: create, update: update });

// we pollute the global namespace twice
var engine = new ChessEngine();
var gfx = new GFXEngine();

function preload() {
	game.load.image('board', 'gfx/board.png');
	// load the other images programmatically
	for(var i=0; i<IMAGE_NAMES.length; i++) {
		game.load.image(IMAGE_NAMES[i], 'gfx/' + IMAGE_NAMES[i] + '.png');
	}
}

function create() {
	// just draw the board on the screen
	game.add.sprite(BOARD_XOFFSET, BOARD_YOFFSET, 'board');
}

function update() {
	// called every clock tick
	// I think we can ignore, except for some "thinking" animation
}

