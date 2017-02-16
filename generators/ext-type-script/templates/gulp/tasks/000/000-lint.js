var pkg = require('../../package.js'),
    gulp = require('gulp'),
    gulp_tslint = require("gulp-tslint");

gulp.task('lint:ts', function () {
    var tslint = [{
        configuration: 'tslint.json',
        formatter: 'verbose'
    }];
    if (pkg.dizmo && pkg.dizmo.build) {
        var build = pkg.dizmo.build;
        if (build.lint !== null && typeof build.lint === 'object') {
            tslint = build.lint;
        } else if (build.lint === false) {
            tslint = false;
        }
    }
    if (tslint) {
        return gulp.src([
            './src/**/*.ts', '!src/lib/**', '!build/**', '!node_modules/**'])
            .pipe(gulp_tslint.apply(this, tslint))
            .pipe(gulp_tslint.report({emitError: false}));
    }
});

gulp.task('lint', ['lint:ts']);
