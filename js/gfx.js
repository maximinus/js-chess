// class to handle all drawing to screen and animations

ChessPiece = function(xpos, ypos, sprite) {
	this.xpos = xpos;
	this.ypos = ypos;
	this.sprite = sprite;
};

ChessPiece.prototype.getScreenX = function() {
	return(BOARD_XOFFSET + BORDER_SIZE + (this.xpos * SQUARE_SIZE));
};

ChessPiece.prototype.getScreenY = function() {
	return(BOARD_XOFFSET + BORDER_SIZE + (this.ypos * SQUARE_SIZE));
};

GFXEngine = function(game) {
	// class to handle all website and screen interactions
	this.game = game;
};

GFXEngine.prototype.init = function(width, height) {
	// setup pieces
	this.pieces = new Array();
	this.width = width;
	this.height = height;
	// now we need to calculate some constants we use
	// where is the top left of the board?
	this.boardx = (this.width - BOARD_GFX_SIZE) / 2
	this.boardy = (this.height - BOARD_GFX_SIZE) / 2
};

GFXEngine.prototype.insideBoard = function(xpos, ypos) {
	if((ypos < this.boardy + BORDER_SIZE) || (ypos > (this.boardy + BOARD_SQUARE_SIZE))) {
		return(false); }
	if((xpos < this.boardx + BORDER_SIZE) || (xpos > (this.boardx + BOARD_SQUARE_SIZE))) {
		return(false); }
	return(true);
};

GFXEngine.prototype.drawBoard = function(board) {
	this.game.add.sprite(this.boardx, this.boardy, 'board');
	// this should be rare! Almost always we are just moving pieces.
	// this means that when we draw the board we have to hold a differing representation
	// of the board in memory
	// keeping 2 boards together would be highly ineffecient in the chess solving part
	// iterate through the board and grab all the pieces
	var position = new Position(0, 0);
	for(var x=0; x<BOARD_SIZE; x++) {
		for(var y=0; y<BOARD_SIZE; y++) {
			var position = new Position(x, y);
			var piece = board.getSquare(position);
			if(piece != EMPTY_SQUARE) {
				var xpos = this.boardx + BORDER_SIZE + (x * SQUARE_SIZE);
				var ypos = (this.boardy + BORDER_SIZE + BOARD_SQUARE_SIZE) -((y + 1) * SQUARE_SIZE);
				this.pieces.push(new ChessPiece(x, y, this.game.add.sprite(xpos, ypos, IMAGE_NAMES[piece])))
			}
		}
	}
};

GFXEngine.prototype.updateBoard = function(xpos, ypos) {
	// xpos and ypos are click co-ords
	if(this.insideBoard(xpos, ypos)) {
		console.log('Click inside!'); }
	else {
		console.log('Outside!'); }
};

GFXEngine.prototype.highlightSquare = function(xpos, ypos) {
	// highlight the current square
};

