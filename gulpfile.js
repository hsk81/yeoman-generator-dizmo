'use strict';

var path = require('path');
var gulp = require('gulp'),
    gulp_eslint = require('gulp-eslint'),
    gulp_ex_gitignore = require('gulp-exclude-gitignore'),
    gulp_nsp = require('gulp-nsp');

gulp.task('static', function () {
    return gulp.src('**/*.js')
        .pipe(gulp_ex_gitignore())
        .pipe(gulp_eslint())
        .pipe(gulp_eslint.format())
        .pipe(gulp_eslint.failAfterError());
});

gulp.task('gulp_nsp', function (callback) {
    gulp_nsp({package: path.resolve('package.json')}, callback);
});

gulp.task('prepublish', ['nsp']);
gulp.task('default', ['static']);
