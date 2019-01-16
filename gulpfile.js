'use strict';
const pump = require('pump');
const gulp = require('gulp');
const gulp_eslint = require('gulp-eslint');
const gulp_exclude = require('gulp-exclude-gitignore');

const os = require('os');
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
