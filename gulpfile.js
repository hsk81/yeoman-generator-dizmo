'use strict';
let pump = require('pump');
let gulp = require('gulp'),
    gulp_eslint = require('gulp-eslint'),
    gulp_exclude = require('gulp-exclude-gitignore');

let os = require('os');
if (os.tmpdir) {
    os.tmpDir = os.tmpdir;
}

gulp.task('prepare', done => done());
gulp.task('default', done => { pump([
    gulp.src('**/*.js'),
    gulp_exclude(),
    gulp_eslint(),
    gulp_eslint.format(),
    gulp_eslint.failAfterError()
], done); });
