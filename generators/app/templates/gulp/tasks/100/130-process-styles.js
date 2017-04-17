var pkg = require('../../package.js'),
    path = require('path');

var gulp = require('gulp'),
    gulp_copy = require('gulp-copy'),
    gulp_sass = require('gulp-sass'),
    gulp_sourcemaps = require('gulp-sourcemaps'),
    extend = require('xtend');

gulp.task('process-styles:copy', function () {
    return gulp.src(['src/style/**/*', '!src/style/**/*.scss'])
        .pipe(gulp_copy(path.join('build', pkg.name, 'style'), {
            prefix: 2
        }));
});
gulp.task('process-styles', ['process-styles:copy'], function () {
    var sourcemaps = false, sass = {
        outputStyle: 'expanded'
    };

    if (pkg.dizmo && pkg.dizmo.build) {
        var min = pkg.dizmo.build.minify;
        if (min) {
            var styles = min.styles !== undefined ? min.styles : {};
            if (styles) {
                if (styles.sourcemaps) { // minify by default w/o source-maps!
                    sourcemaps = extend({}, styles.sourcemaps);
                }
                if (styles.sass || styles.sass === undefined) {
                    sass = extend({outputStyle: 'compressed'}, styles.sass);
                }
            }
        }
    }

    var bundle = gulp.src('src/style/**/*.scss');
    if (sourcemaps) {
        bundle = bundle.pipe(gulp_sourcemaps.init(sourcemaps));
    }
    if (sass) {
        bundle = bundle.pipe(
            gulp_sass.apply(this, [sass]).on('error', gulp_sass.logError));
    }
    if (sourcemaps) {
        bundle = bundle.pipe(gulp_sourcemaps.write('./'));
    }
    return bundle
        .pipe(gulp.dest(path.join('build', pkg.name, 'style')));
});
