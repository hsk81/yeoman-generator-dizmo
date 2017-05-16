let pkg = require('../../package.js'),
    pump = require('pump');
let gulp = require('gulp'),
    gulp_ver = require('gulp-ver'),
    gulp_zip = require('gulp-zip');

gulp.task('process-dzm', function (cb) {
    pump([
        gulp.src('build/**/*'),
        gulp_zip('{0}.dzm'.replace('{0}', pkg.name)),
        gulp_ver(),
        gulp.dest('build')
    ], cb);
});
