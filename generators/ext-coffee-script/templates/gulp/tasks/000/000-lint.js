var pkg = require('../../package.js'),
    gulp = require('gulp'),
    gulp_coffeelint = require('gulp-coffeelint');

gulp.task('lint:coffee', function () {
    var coffeelint;
    if (pkg.dizmo && pkg.dizmo.build) {
        var build = pkg.dizmo.build;
        if (build.lint !== null && typeof build.lint === 'object') {
            coffeelint = build.lint;
        } else if (build.lint === false) {
            coffeelint = false;
        }
    }
    if (coffeelint || coffeelint === undefined) {
        return gulp.src([
            './src/**/*.coffee', '!src/lib/**', '!build/**', '!node_modules/**'
        ])
        .pipe(gulp_coffeelint.apply(this, coffeelint))
        .pipe(gulp_coffeelint.reporter())
    }
});

gulp.task('lint', ['lint:coffee']);
