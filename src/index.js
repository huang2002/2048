import { Board } from './Board.js';
import { Menu } from './Menu.js';
import { $scores } from './states.js';
import { Toolbar } from './Toolbar.js';

document.body.appendChild(
    X.createElement('div', {
        id: 'app',
    },
        X.createElement('div', {
            id: 'game-view',
            style: {
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                width: '100%',
                height: '100%',
                padding: '1em',
            },
        },
            X.createElement('h2', {
                id: 'scores',
                style: {
                    color: '#F00',
                    fontSize: '1.8em',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    textShadow: '0 1px 0 #FFF',
                },
            },
                'Scores: ',
                $scores,
            ),
            Board,
            Toolbar,
        ),
        Menu,
    )
);
