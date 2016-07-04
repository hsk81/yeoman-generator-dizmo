window.showBack = function () {
    dizmo.showBack();
};
window.showFront = function () {
    dizmo.showFront();
};

window.i18n(function (err, t) {
    var cell = document.getElementsByClassName('table-cell')[0];
    cell.textContent = t('greeting');
    var done = document.getElementById('done');
    done.textContent = t('done');
});

document.addEventListener('dizmoready', function () {
    document.getElementById('done').onclick = function () {
        dizmo.showFront();
    };
});
