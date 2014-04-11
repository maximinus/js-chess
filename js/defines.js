// defines, magic numbers and constants for chess

const BOARD_SIZE = 8;
const BOARD_GFX_SIZE = 520;
const SQUARE_SIZE = 60;
const BOARD_SQUARE_SIZE = SQUARE_SIZE * BOARD_SIZE;
// we assume border is same all the way round
const BORDER_SIZE = (BOARD_GFX_SIZE - (SQUARE_SIZE * BOARD_SIZE)) / 2;

const BACKGROUND_COLOUR = 0xbbccee;

// the order of these names and the order of IMAGE_NAMES must be the same!
const EMPTY_SQUARE = -1;
const WHITE_KING = 0;
const WHITE_QUEEN = 1;
const WHITE_ROOK = 2;
const WHITE_BISHOP = 3;
const WHITE_KNIGHT = 4;
const WHITE_PAWN = 5;
const BLACK_KING = 6;
const BLACK_QUEEN = 7;
const BLACK_ROOK = 8;
const BLACK_BISHOP = 9;
const BLACK_KNIGHT = 10;
const BLACK_PAWN = 11;
const HIGHEST_PIECE = BLACK_PAWN;
const WHITE_MAX = 5;

const IMAGE_NAMES = ['white_king', 'white_queen', 'white_rook', 'white_bishop', 'white_knight', 'white_pawn',
					 'black_king', 'black_queen', 'black_rook', 'black_bishop', 'black_knight', 'black_pawn'];

// names of other gfx images
const BOARD = 'board';
const HIGHLIGHT_MAIN = 'highlight_main';
const HIGHLIGHT_OTHER = 'highlight_other';

