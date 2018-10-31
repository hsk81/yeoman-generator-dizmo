import bundle from './sys/type/bundle';
import dizmo from './sys/type/dizmo';
import window from './sys/type/window';

import { Global } from '@dizmo/functions';
declare const global: Global;

import { trace, traceable } from '@dizmo/functions';
import { I18N, TranslationFunction } from './i18n';

@trace
export class App {
    public constructor() {
        this.globals();
        this.events();
    }
    @traceable(false)
    private globals() {
        window.showBack = () => {
            dizmo.showBack();
        };
        window.showFront = () => {
            dizmo.showFront();
        };
    }
    @traceable(false)
    private events() {
        document.getElementById('done')
            .onclick = this.onClick.bind(this);
    }
    private onClick(ev: MouseEvent) {
        dizmo.showFront();
    }
}

document.addEventListener('dizmoready', () => {
    if (global.APP === undefined) {
        I18N.init((t: TranslationFunction) => {
            const cell = document.getElementsByClassName('table-cell')[0];
            cell.textContent = t('greeting');
            const done = document.getElementById('done');
            done.textContent = t('done');

            global.APP = new App();
        });
        global.TRACE = bundle.privateStorage.getProperty('TRACE', {
            fallback: false
        });
    }
});

export default App;
