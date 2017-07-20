let pkg = require('../../package.js'),
    path = require('path'),
    pump = require('pump');
let gulp = require('gulp'),
    gulp_copy = require('gulp-copy');

gulp.task('process-assets:base', function (done) {
    pump([
        gulp.src([
            'assets/Icon.*', 'assets/Icon-dark.*', 'assets/Preview.*'
        ]),
        gulp_copy(path.join('build', pkg.name), {
            prefix: 1
        })
    ], done);
});
gulp.task('process-assets', ['process-assets:base'], function (done) {
    pump([
        gulp.src([
            'assets/**/*'
        ]),
        gulp_copy(path.join('build', pkg.name, 'assets'), {
            prefix: 1
        })
    ], done);
});
