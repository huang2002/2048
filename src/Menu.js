import { initGame } from './states.js';

export const $menuVisible = X.toReactive(true);

const MenuButtonSection = (text, handler) => (
    D.Section(null,
        D.Button({
            listeners: {
                click: handler
            },
        },
            text
        )
    )
);

export const Menu = D.Mask({
    id: 'menu-container',
    style: {
        display: $menuVisible.map(
            menuVisible => menuVisible ? 'block' : 'none'
        ),
    },
},
    D.DialogWindow({
        id: 'menu-window',
        style: {
            textAlign: 'center',
        },
    },
        X.createElement('h1', {
            style: {
                fontSize: '2em',
            },
        },
            D.Highlight(null, '2048'),
        ),
        MenuButtonSection('Start', () => {
            initGame();
            $menuVisible.setSync(false);
        }),
        D.Section(null,
            D.Link({
                href: 'https://github.com/huang2002/2048',
            },
                'github'
            )
        )
    )
);
