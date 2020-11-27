import { $menuVisible } from './Menu.js';
import { $isDead } from './states.js';

export const Toolbar = X.createElement('div', {
    id: 'toolbar',
    style: {
        margin: '1em 0',
        textAlign: 'center',
    },
},
    D.Button({
        listeners: {
            click() {
                if ($isDead.current || confirm('Quit game half way?')) {
                    $menuVisible.setSync(true);
                }
            },
        },
    },
        'Back'
    ),
);
