"use strict";

// defines, magic numbers and constants for chess

const BOARD_SIZE = 8;
const BOARD_GFX_SIZE = 520;
const SQUARE_SIZE = 60;
const BOARD_SQUARE_SIZE = SQUARE_SIZE * BOARD_SIZE;
// we assume border is same all the way round
const BORDER_SIZE = (BOARD_GFX_SIZE - (SQUARE_SIZE * BOARD_SIZE)) / 2;

const BACKGROUND_COLOUR = 0xbbccee;

const WHITE = true;
const BLACK = false;

// the order of these names and the order of IMAGE_NAMES must be the same
const EMPTY_SQUARE = 0;
const WHITE_KING = 1;
const WHITE_QUEEN = 2;
const WHITE_ROOK = 3;
const WHITE_BISHOP = 4;
const WHITE_KNIGHT = 5;
const WHITE_PAWN = 6;
const BLACK_KING = 7;
const BLACK_QUEEN = 8;
const BLACK_ROOK = 9;
const BLACK_BISHOP = 10;
const BLACK_KNIGHT = 11;
const BLACK_PAWN = 12;
const HIGHEST_PIECE = BLACK_PAWN;
const WHITE_MAX = 6;

// scores. These must be in the same order as the list above
const SCORES = [0, 200, 18, 10, 7, 6, 2, -200, -18, -10, -7, -6, -2];

// this contains a file called empty, placed here just in case, but it should never be called
const IMAGE_NAMES = ['ERROR', 'white_king', 'white_queen', 'white_rook', 'white_bishop', 'white_knight', 'white_pawn',
					 'black_king', 'black_queen', 'black_rook', 'black_bishop', 'black_knight', 'black_pawn'];

// names of other gfx images
const BOARD = 'board';
const HIGHLIGHT_MAIN = 'highlight_main';
const HIGHLIGHT_OTHER = 'highlight_other';

