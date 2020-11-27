import { $scores, BOARD_SIZE } from './states.js';

/**
 * @typedef {(board: number[]) => void} SlideAction
 */

/**
 * @param {number[]} board
 * @param {number} dx
 * @param {number} dy
 */
const fillSpace = (board, dx, dy) => {
    // console.log('fill space');
    let moved = false;
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            const from = j * BOARD_SIZE + i;
            if (!board[from]) {
                continue;
            }
            const x = i + dx;
            const y = j + dy;
            if (
                (x < 0 || x >= BOARD_SIZE)
                || (y < 0 || y >= BOARD_SIZE)
            ) {
                continue;
            }
            const to = y * BOARD_SIZE + x;
            if (board[to]) {
                continue;
            }
            moved = true;
            board[to] = board[from];
            board[from] = 0;
        }
    }
    return moved;
};

/**
 * @type {SlideAction}
 */
export const slideUp = (board) => {
    let moved = false;
    for (let k = 1; k < BOARD_SIZE; k++) {
        moved = fillSpace(board, 0, -1) || moved;
    }
    for (let j = 1; j < BOARD_SIZE; j++) {
        for (let i = 0; i < BOARD_SIZE; i++) {
            const from = j * BOARD_SIZE + i;
            if (!board[from]) {
                continue;
            }
            const to = from - BOARD_SIZE;
            if (board[from] === board[to]) {
                board[to] *= 2;
                board[from] = 0;
                moved = true;
                $scores.set(scores => scores + board[to]);
            }
        }
    }
    for (let k = 1; k < BOARD_SIZE; k++) {
        moved = fillSpace(board, 0, -1) || moved;
    }
    return moved;
};

/**
 * @type {SlideAction}
 */
export const slideDown = (board) => {
    let moved = false;
    for (let k = 1; k < BOARD_SIZE; k++) {
        moved = fillSpace(board, 0, 1) || moved;
    }
    for (let j = BOARD_SIZE - 2; j >= 0; j--) {
        for (let i = 0; i < BOARD_SIZE; i++) {
            const from = j * BOARD_SIZE + i;
            if (!board[from]) {
                continue;
            }
            const to = from + BOARD_SIZE;
            if (board[from] === board[to]) {
                board[to] *= 2;
                board[from] = 0;
                moved = true;
                $scores.set(scores => scores + board[to]);
            }
        }
    }
    for (let k = 1; k < BOARD_SIZE; k++) {
        moved = fillSpace(board, 0, 1) || moved;
    }
    return moved;
};

/**
 * @ype {SlideAction}
 */
export const slideLeft = (board) => {
    let moved = false;
    for (let k = 1; k < BOARD_SIZE; k++) {
        moved = fillSpace(board, -1, 0) || moved;
    }
    for (let i = 1; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            const from = j * BOARD_SIZE + i;
            if (!board[from]) {
                continue;
            }
            const to = from - 1;
            if (board[from] === board[to]) {
                board[to] *= 2;
                board[from] = 0;
                moved = true;
                $scores.set(scores => scores + board[to]);
            }
        }
    }
    for (let k = 1; k < BOARD_SIZE; k++) {
        moved = fillSpace(board, -1, 0) || moved;
    }
    return moved;
};

/**
 * @ype {SlideAction}
 */
export const slideRight = (board) => {
    let moved = false;
    for (let k = 1; k < BOARD_SIZE; k++) {
        moved = fillSpace(board, 1, 0) || moved;
    }
    for (let i = BOARD_SIZE - 2; i >= 0; i--) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            const from = j * BOARD_SIZE + i;
            if (!board[from]) {
                continue;
            }
            const to = from + 1;
            if (board[from] === board[to]) {
                board[to] *= 2;
                board[from] = 0;
                moved = true;
                $scores.set(scores => scores + board[to]);
            }
        }
    }
    for (let k = 1; k < BOARD_SIZE; k++) {
        moved = fillSpace(board, 1, 0) || moved;
    }
    return moved;
};
