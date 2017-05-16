let pkg = require('../../package.js'),
    path = require('path'),
    pump = require('pump');

let gulp = require('gulp'),
    gulp_zip = require('gulp-zip');

gulp.task('process-help:zip', function (cb) {
    pump([
        gulp.src('help/**/*', {base: '.'}),
        gulp_zip('help.zip'),
        gulp.dest(path.join('build', pkg.name))
    ], cb);
});
gulp.task('process-help', ['process-help:zip']);
