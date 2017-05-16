let pkg = require('../../package.js'),
    extend = require('xtend');
let gulp = require('gulp'),
    gulp_tslint = require("gulp-tslint");

gulp.task('lint:ts', function () {
    let lint = true;
    if (pkg.dizmo && pkg.dizmo.build) {
        let cfg_lint = pkg.dizmo.build.lint;
        if (cfg_lint || cfg_lint === undefined) {
            lint = extend({}, cfg_lint);
        } else {
            lint = false;
        }
    }

    let argv = require('yargs')
        .default('lint', lint).argv;
    if (typeof argv.lint === 'string') {
        argv.lint = JSON.parse(argv.lint);
    }

    let bundle = gulp.src([
        './src/**/*.ts', '!src/lib/**', '!build/**', '!node_modules/**']);
    if (argv.lint || argv.lint === undefined) {
        bundle = bundle.pipe(gulp_tslint.apply(this, [extend({
            formatter: 'stylish'
        }, argv.lint)]));
        bundle = bundle.pipe(gulp_tslint.report({
            emitError: false
        }));
    }
    return bundle;
});

gulp.task('lint', ['lint:ts']);
