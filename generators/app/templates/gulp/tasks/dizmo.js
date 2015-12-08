var pkg = require('../package.js');
var gulp = require('gulp'),
    gulp_ver = require('gulp-ver'),
    gulp_zip = require('gulp-zip');

gulp.task('dizmo:all', [
    'clean',
    'assets.dir',
    'help.zip',
    'style.css',
    'library.js',
    'index.js',
    'index.html',
    'info.plist'
]);
gulp.task('dizmo:zip', ['dizmo:all'], function () {
    return gulp.src('build/**/*')
        .pipe(gulp_zip('{0}.dzm'.replace('{0}', pkg.name)))
        .pipe(gulp_ver())
        .pipe(gulp.dest('build/'));
});
gulp.task('dizmo', ['dizmo:zip']);
