window.showBack = () => {
    dizmo.showBack();
};
window.showFront = () => {
    dizmo.showFront();
};

window.i18n((error, t) => {
    const cell = document.getElementsByClassName('table-cell')[0];
    cell.textContent = t('#front/greeting');
    const done = document.getElementById('done');
    done.textContent = t('#back/done');
});

document.addEventListener('dizmoready', () => {
    const done = document.getElementById('done');
    done.onclick = () => dizmo.showFront();
}, {
    once: true
});
