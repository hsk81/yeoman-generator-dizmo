'use strict';

let os = require('os');
if (os.tmpdir) {
    os.tmpDir = os.tmpdir;
}

let path = require('path'),
    pump = require('pump');
let gulp = require('gulp'),
    gulp_eslint = require('gulp-eslint'),
    gulp_ex_gitignore = require('gulp-exclude-gitignore'),
    gulp_nsp = require('gulp-nsp');

gulp.task('static', function (cb) {
    pump([
        gulp.src('**/*.js'),
        gulp_ex_gitignore(),
        gulp_eslint(),
        gulp_eslint.format(),
        gulp_eslint.failAfterError()
    ], cb);
});

gulp.task('nsp', function (cb) {
    gulp_nsp({package: path.resolve('package.json')}, cb);
});

gulp.task('prepublish', ['nsp']);
gulp.task('default', ['static']);
