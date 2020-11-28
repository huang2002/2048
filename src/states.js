import { choice, createRandomizer } from './common.js';
import { $menuVisible } from './Menu.js';
import { slideUp, slideDown, slideLeft, slideRight } from './slide.js';
import { Toolbar } from './Toolbar.js';

export const $scores = X.toReactive(0);

export const BOARD_SIZE = 4;

export const MAX_SLIP_COUNT = BOARD_SIZE ** 2;

export const $board = X.toReactive(
    Array.from({ length: MAX_SLIP_COUNT }, () => 0)
);

export const $isDead = $board.toValue(board => {
    for (let i = 0; i < MAX_SLIP_COUNT; i++) {
        if (!board[i]) {
            return false;
        }
        if (
            (i % BOARD_SIZE + 1 < BOARD_SIZE)
            && (board[i + 1] === board[i])
        ) {
            return false; // right
        }
        if (
            (i + BOARD_SIZE < MAX_SLIP_COUNT)
            && (board[i + BOARD_SIZE] === board[i])
        ) {
            return false; // below
        }
    }
    return true;
});

export const clearBoard = () => {
    for (let i = 0; i < MAX_SLIP_COUNT; i++) {
        $board.replace(i, 0);
    }
};

const positionRandomizer = createRandomizer();

export const getNextPosition = () => {
    const candidates = [];
    for (let i = 0; i < MAX_SLIP_COUNT; i++) {
        if (!$board.current[i]) {
            candidates.push(i);
        }
    }
    return candidates.length
        ? choice(candidates, positionRandomizer)
        : null;
};

export const initGame = () => {
    clearBoard();
    $scores.setSync(0);
    X.setSchedule(() => {
        $board.replace(getNextPosition(), 2);
    });
};

const FOUR_REQUIREMENT = 10;
const FOUR_POSSIBILITY = .2;

const MIN_GESTURE_MOVEMENT = 20;

const numberRandomizer = createRandomizer();

let x0, y0, x1, y1;

const checkGesture = () => {
    if ($isDead.current) {
        alert('Game Over!');
        return;
    }
    const dx = x1 - x0;
    const dy = y1 - y0;
    const movement = Math.sqrt(dx ** 2 + dy ** 2);
    if (movement < MIN_GESTURE_MOVEMENT) {
        // console.log(`movement too small (${movement})`);
        return;
    }
    const board = $board.current.slice();
    let moved;
    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
            moved = slideRight(board);
        } else {
            moved = slideLeft(board);
        }
    } else {
        if (dy > 0) {
            moved = slideDown(board);
        } else {
            moved = slideUp(board);
        }
    }
    // console.log(board);
    if (!moved) {
        // console.log('not moved');
        return;
    }
    $board.setSync(board);
    if ($isDead.current) {
        alert('Game Over!');
        return;
    }
    $board.replace(
        getNextPosition(),
        ($scores.current > FOUR_REQUIREMENT
            && numberRandomizer() < FOUR_POSSIBILITY)
            ? 4
            : 2
    );
};

window.addEventListener('mousedown', event => {
    if ($menuVisible.current || event.target.tagName === 'BUTTON') {
        return;
    }
    event.preventDefault();
    x0 = event.clientX;
    y0 = event.clientY;
}, { passive: false });

window.addEventListener('touchstart', event => {
    if ($menuVisible.current || Toolbar.contains(event.target)) {
        return;
    }
    event.preventDefault();
    const touch = event.changedTouches[0];
    x0 = touch.clientX;
    y0 = touch.clientY;
}, { passive: false });

window.addEventListener('mouseup', event => {
    if ($menuVisible.current || Toolbar.contains(event.target)) {
        return;
    }
    event.preventDefault();
    x1 = event.clientX;
    y1 = event.clientY;
    checkGesture();
}, { passive: false });

window.addEventListener('touchend', event => {
    if ($menuVisible.current || Toolbar.contains(event.target)) {
        return;
    }
    event.preventDefault();
    const touch = event.changedTouches[0];
    x1 = touch.clientX;
    y1 = touch.clientY;
    checkGesture();
}, { passive: false });
