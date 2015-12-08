var pkg = require('../package.js'),
    lodash = require('lodash');
var gulp = require('gulp'),
    gulp_plist = require('gulp-plist'),
    gulp_rename = require('gulp-rename');

gulp.task('info.plist', function () {
    var settings = lodash.mapKeys(pkg.dizmo.settings, function (value, key) {
        return lodash.capitalize(lodash.camelCase(key));
    });

    return gulp.src('.info.plist')
        .pipe(gulp_plist(settings))
        .pipe(gulp_rename('Info.plist'))
        .pipe(gulp.dest('build/{0}/'.replace('{0}', pkg.name)));
});
