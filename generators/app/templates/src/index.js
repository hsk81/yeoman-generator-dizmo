window.showBack = () => {
    dizmo.showBack();
};
window.showFront = () => {
    dizmo.showFront();
};

window.i18n((error, t) => {
    const cell = document.getElementsByClassName('table-cell')[0];
    cell.textContent = t('greeting');
    const done = document.getElementById('done');
    done.textContent = t('done');
});

document.addEventListener('dizmoready', () => {
    document.getElementById('done').onclick = () => {
        dizmo.showFront();
    };
}, {
    once: true
});
