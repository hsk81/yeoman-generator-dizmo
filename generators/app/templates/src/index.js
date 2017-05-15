window.showBack = () => {
    dizmo.showBack();
};
window.showFront = () => {
    dizmo.showFront();
};

window.i18n((err, t) => {
    let cell = document.getElementsByClassName('table-cell')[0];
    cell.textContent = t('greeting');
    let done = document.getElementById('done');
    done.textContent = t('done');
});

document.addEventListener('dizmoready', () => {
    document.getElementById('done').onclick = () => {
        dizmo.showFront();
    };
});
