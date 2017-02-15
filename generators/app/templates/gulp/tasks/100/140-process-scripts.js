var pkg = require('../../package.js'),
    path = require('path');
var gulp = require('gulp'),
    gulp_uglify = require('gulp-uglify'),
    gulp_sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream');

gulp.task('process-scripts', function () {
    var browserified = browserify({
        basedir: '.', entries: ['src/index.js']
    });
    return browserified.bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(gulp_sourcemaps.init({loadMaps: true}))
        .pipe(gulp_uglify())
        .pipe(gulp_sourcemaps.write('./'))
        .pipe(gulp.dest(path.join('build', pkg.name)));
});
