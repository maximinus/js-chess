// basic start of chess game

const SCREEN_WIDTH = 800
const SCREEN_HEIGHT = 600

var game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.AUTO, '',
						   { preload: preload, create: create, update: update });

function preload() {
	game.load.image('board', 'gfx/board.png');
}

function create() {
	// just draw the board on the screen
	game.add.sprite(0, 0, 'board');
}

function update() {
	// called every clock tick
	// I think we can ignore, except for some "thinking" animation
}

