/**
 * Shows the `#back` side of a dizmo; assign to `window` to
 * enable in the dizmo menu the *settings* entry.
 * @function
 */
const showBack = () => {
    dizmo.showBack();
};

window.showBack = showBack;

/**
 * Shows the `#front` side of a dizmo; assign to `window` to
 * enable in the dizmo menu the *contents* entry.
 * @function
 */
const showFront = () => {
    dizmo.showFront();
};

window.showFront = showFront;

/**
 * Handler to be invoked once the translations are fetched;
 * sets then the UI elements' text contents accordingly. The
 * translations are in the `assets/locales` folder.
 *
 * @function
 * @param {Error|null} error
 *  Error if fetching the translations fails, otherwise null
 * @param {Function} translator
 *  Translator function
 */
const onI18n = (error, translator) => {
    const cell = document.getElementsByClassName('table-cell')[0];
    cell.textContent = translator('#front/greeting');
    const done = document.getElementById('done');
    done.textContent = translator('#back/done');
};

window.i18n(onI18n);

/**
 * Handler to be invoked once the dizmo is ready.
 * @function
 */
const onDizmoReady = () => {
    const done = document.getElementById('done');
    done.onclick = () => dizmo.showFront();
};
document.addEventListener('dizmoready', onDizmoReady, {
    once: true
});
