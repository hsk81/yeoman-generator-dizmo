/* eslint @typescript-eslint/explicit-function-return-type: [off] */
/* eslint @typescript-eslint/no-explicit-any: [off] */
/* eslint @typescript-eslint/no-unused-vars: [off] */

import { Global } from "@dizmo/dizmo.js";
declare const global: Global;
import { Dizmo } from "@dizmo/dizmo.js";
declare const dizmo: Dizmo;

/**
 * Shows the `#back` side of a dizmo; assignment to `global`
 * enables in the dizmo menu the *settings* entry.
 */
global.showBack = () => dizmo.showBack();

/**
 * Shows the `#front` side of a dizmo; assignment to `global`
 * enables in the dizmo menu the *content* entry.
 */
global.showFront = () => dizmo.showFront();

/**
 * Handler to be invoked once the translations are fetched;
 * sets then the UI elements' text contents accordingly. The
 * translations are in the `assets/locales` folder.
 *
 * @param error
 *  Error if fetching the translations fails, otherwise null
 * @param translate
 *  Translator function
 */
const onI18n = (
    error: Error | null, translate: (key: string) => string | any
) => {
    const cell = document.getElementsByClassName('table-cell')[0];
    cell.textContent = translate('#front/greeting') as string;
    const done = document.getElementById('done') as HTMLElement;
    done.textContent = translate('#back/done') as string;
};
global.i18n(onI18n);

/**
 * Handler to be invoked once the dizmo is ready.
 */
const onDizmoReady = () => {
    dizmo.subscribeToAttribute('settings/framecolor', (path, value) => {
        const front = document.getElementById('front') as HTMLElement;
        front.style.color = dizmo.getAdaptiveColor();
    });
    const done = document.getElementById('done') as HTMLElement;
    done.onclick = () => dizmo.showFront();
};
document.addEventListener('dizmoready', onDizmoReady, {
    once: true
});
