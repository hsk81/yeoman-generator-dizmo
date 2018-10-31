import dizmo from './sys/type/dizmo';
import window from './sys/type/window';

import { named } from './sys/util/named';
import { trace } from './sys/util/trace';

import { I18N, TranslationFunction } from './i18n';

@trace
@named('App')
export class App {
    public constructor(t: TranslationFunction) {
        this.globals(t);
        this.events();
    }
    private globals(t: TranslationFunction) {
        window.showBack = () => {
            dizmo.showBack();
        };
        window.showFront = () => {
            dizmo.showFront();
        };
        window.global('T', t);
    }
    private events() {
        document.getElementById('done').onclick = () => {
            dizmo.showFront();
        };
    }
}

document.addEventListener('dizmoready', () => {
    if (window.global('APP') === undefined) {
        I18N.init((t: TranslationFunction) => {
            const cell = document.getElementsByClassName('table-cell')[0];
            cell.textContent = t('greeting');
            const done = document.getElementById('done');
            done.textContent = t('done');

            window.global('APP', new App(t));
        });
    }
});

export default App;
