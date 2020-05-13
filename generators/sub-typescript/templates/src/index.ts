/* eslint @typescript-eslint/explicit-function-return-type: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */

import { Global } from "@dizmo/types";
declare const global: Global;
import { Dizmo } from "@dizmo/types";
declare const dizmo: Dizmo;

/**
 * Shows the `#back` side of a dizmo; assign to `window` to
 * enable in the dizmo menu the *settings* entry.
 */
const showBack = () => {
    dizmo.showBack();
};

global.showBack = showBack;

/**
 * Shows the `#front` side of a dizmo; assign to `window` to
 * enable in the dizmo menu the *contents* entry.
 */
const showFront = () => {
    dizmo.showFront();
};

global.showFront = showFront;

/**
 * Handler to be invoked once the translations are fetched;
 * sets then the UI elements' text contents accordingly. The
 * translations are in the `assets/locales` folder.
 *
 * @param error
 *  Error if fetching the translations fails, otherwise null
 * @param translator
 *  Translator function
 */
const onI18n = (
    error: any|null, translator: (key: string) => string | object
) => {
    const cell = document.getElementsByClassName("table-cell")[0];
    cell.textContent = translator("#front/greeting") as string;
    const done = document.getElementById("done") as HTMLElement;
    done.textContent = translator("#back/done") as string;
};

global.i18n(onI18n);

/**
 * Handler to be invoked once the dizmo is ready.
 */
const onDizmoReady = () => {
    const done = document.getElementById("done") as HTMLElement;
    done.onclick = () => dizmo.showFront();
};
document.addEventListener('dizmoready', onDizmoReady, {
    once: true
});
