var pkg = require('../../package.js'),
    path = require('path');
var gulp = require('gulp'),
    gulp_htmlmin = require('gulp-htmlmin'),
    extend = require('xtend');

gulp.task('process-markup', function () {
    var htmlmin = {
        collapseWhitespace: false,
        minifyCSS: false,
        minifyJS: false,
        removeComments: false
    };

    if (pkg.dizmo && pkg.dizmo.build) {
        var min = pkg.dizmo.build.minify;
        if (min) {
            var markups = min.markups !== undefined ? min.markups : {};
            if (markups) {
                if (markups.htmlmin || markups.htmlmin === undefined) {
                    htmlmin = extend({
                        collapseWhitespace: true,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: true
                    }, markups.htmlmin);
                }
            }
        }
    }

    var bundle = gulp.src('src/**/*.html');
    if (htmlmin) {
        bundle = bundle.pipe(gulp_htmlmin.apply(this, [htmlmin]));
    }
    return bundle
        .pipe(gulp.dest(path.join('build', pkg.name)));
});
