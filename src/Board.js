import { $board, BOARD_SIZE, MAX_SLIP_COUNT } from './states.js';

const $boardViewSize = X.toReactive('0');
const $boardViewSizeInPixel = $boardViewSize.map(
    boardViewSize => boardViewSize + 'px'
);

const SLIP_CLASS = X.createClass({
    display: 'block',
    position: 'absolute',
    width: `${1 / BOARD_SIZE * 100}%`,
    height: `${1 / BOARD_SIZE * 100}%`,
    color: '#000',
    fontSize: '1.5em',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadow: '#FFF 0 0 10px',
    whiteSpace: 'nowrap',
    lineHeight: $boardViewSize.map(
        boardViewSize => boardViewSize / BOARD_SIZE + 'px'
    ),
    borderRadius: '10px',
    boxShadow: '0 0 8px #CCC',
    transition: 'left .2s, top .2s',
    transform: 'scale(.9)',
    cursor: 'default',
});

const SLIP_COLORS = new Map([
    [0, '#EEE'],
    [1 << 1, '#FDA'],
    [1 << 2, '#FD7'],
    [1 << 3, '#FD4'],
    [1 << 4, '#FC0'],
    [1 << 5, '#F90'],
    [1 << 6, '#F60'],
    [1 << 7, '#F30'],
    [1 << 8, '#F00'],
    [1 << 9, '#F03'],
    [1 << 10, '#F06'],
    [1 << 11, '#F09'],
    [1 << 12, '#F0C'],
    [1 << 13, '#F0F'],
    [1 << 14, '#C0F'],
    [1 << 15, '#90F'],
    [1 << 16, '#707'],
]);

/**
 * @param {number} value
 */
const getSlipColor = value => SLIP_COLORS.get(value);

const Slip = X.createComponent(
    /**
     * @param {X.ReactiveValue<number>} $value
     * @param {X.ReactiveValue<number>} $index
     */
    ($value, $index) => {
        const x = $index.current % BOARD_SIZE;
        const y = Math.floor($index.current / BOARD_SIZE);
        return X.createElement('span', {
            class: SLIP_CLASS,
            style: {
                left: `${x / BOARD_SIZE * 100}%`,
                top: `${y / BOARD_SIZE * 100}%`,
                backgroundColor: $value.map(getSlipColor),
            },
        },
            $value.toText(value => value ? value : ''),
        );
    }
);

export const BG_SLIP_COLOR = '#EEE';

export const Board = X.createElement('div', {
    id: 'board-container',
    style: {
        flex: '1',
        margin: '1em',
        overflow: 'hidden',
        userSelect: 'none',
    },
},
    $board.toElement('div', {
        id: 'board',
        style: {
            position: 'relative',
            margin: '0 auto',
            width: $boardViewSizeInPixel,
            height: $boardViewSizeInPixel,
            lineHeight: '0',
        },
    },
        Slip
    )
);

const RESIZE_DELAY = 100;

const _resize = () => {
    const rect = Board.getBoundingClientRect();
    $boardViewSize.setSync(Math.min(rect.width, rect.height));
};

let _resizeTimer = null;
const resize = () => {
    if (_resizeTimer) {
        clearTimeout(_resizeTimer);
    }
    _resizeTimer = setTimeout(_resize, RESIZE_DELAY);
};

window.addEventListener('resize', resize);

resize();
