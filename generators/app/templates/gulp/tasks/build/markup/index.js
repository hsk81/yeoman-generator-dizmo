const pkg = require('../../../package.js');
const gulp = require('gulp');
const gulp_htmlmin = require('gulp-htmlmin');
const path = require('path');

gulp.task('markup', () => {
    const minify = require('yargs')
        .default('minify').argv.minify;
    const argv = require('yargs')
        .default('htmlmin', minify === true).argv;

    let stream = gulp.src(['src/**/*.html']);
    if (typeof argv.htmlmin === 'string') {
        argv.htmlmin = JSON.parse(argv.htmlmin);
    }
    if (typeof argv.htmlmin === 'boolean') {
        argv.htmlmin = {
            collapseWhitespace: argv.htmlmin,
            minifyCSS: argv.htmlmin,
            minifyJS: argv.htmlmin,
            removeComments: argv.htmlmin
        };
    }
    if (argv.htmlmin) {
        stream = stream.pipe(gulp_htmlmin(argv.htmlmin));
    }
    return stream.pipe(gulp.dest(path.join('build', pkg.name)));
});
