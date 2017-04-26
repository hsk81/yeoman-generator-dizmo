var pkg = require('../../package.js'),
    extend = require('xtend');
var gulp = require('gulp'),
    gulp_eslint = require('gulp-eslint');

gulp.task('lint:js', function () {
    var eslint = true;

    if (pkg.dizmo && pkg.dizmo.build) {
        var cfg_lint = pkg.dizmo.build.lint;
        if (cfg_lint || cfg_lint === undefined) {
            eslint = extend({}, cfg_lint);
        }
    }

    var argv = require('yargs')
        .default('lint', eslint).argv;
    if (typeof argv.lint === 'string') {
        argv.lint = JSON.parse(argv.lint);
    }

    var bundle = gulp.src([
        './src/**/*.js', '!src/lib/**', '!build/**', '!node_modules/**']);
    if (argv.lint || argv.lint === undefined) {
        bundle = bundle.pipe(gulp_eslint.apply(
            this, [extend({}, argv.lint)]
        )).pipe(gulp_eslint.format());
    }
    return bundle;
});

gulp.task('lint', ['lint:js']);
