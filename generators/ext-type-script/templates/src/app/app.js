"use strict";
var dizmo_1 = require('./dizmo');
var window_1 = require('./window');
window_1["default"].showBack = function () {
    dizmo_1["default"].showBack();
};
window_1["default"].showFront = function () {
    dizmo_1["default"].showFront();
};
window_1["default"].i18n(function (err, t) {
    var cell = document.getElementsByClassName('table-cell')[0];
    cell.textContent = t('greeting');
    var done = document.getElementById('done');
    done.textContent = t('done');
});
document.addEventListener('dizmoready', function () {
    document.getElementById('done').onclick = function () {
        dizmo_1["default"].showFront();
    };
});
//# sourceMappingURL=app.js.map