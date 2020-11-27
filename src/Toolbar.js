import { $menuVisible } from './Menu.js';
import { $isDead } from './states.js';

export const Toolbar = X.createElement('div', {
    id: 'toolbar',
    style: {
        marginBottom: '1em',
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
