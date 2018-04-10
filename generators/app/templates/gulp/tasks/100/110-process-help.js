let pkg = require('../../package.js'),
    path = require('path');
let gulp = require('gulp'),
    gulp_zip = require('gulp-zip');

gulp.task('process-help:zip', function (done) {
    return require('../../miscellanea/pipe')([
        gulp.src('help/**/*', {base: '.'}),
        gulp_zip('help.zip'),
        gulp.dest(path.join('build', pkg.name))
    ], done);
});
gulp.task('process-help', ['process-help:zip']);
