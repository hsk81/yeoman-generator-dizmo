const gulp = require('gulp');
const gulp_coffeelint = require('gulp-coffeelint');

gulp.task('lint', (done) => {
    const argv = require('yargs')
        .default('lint', true).argv;
    if (typeof argv.lint === 'string') {
        argv.lint = JSON.parse(argv.lint);
    }
    if (argv.lint || argv.lint === undefined) {
        let stream = gulp.src([
            './src/**/*.coffee', '!src/lib/**', '!build/**', '!node_modules/**'
        ]);
        if (Object.keys(argv.lint).length > 0) {
            stream = stream.pipe(gulp_coffeelint({ ...argv.lint }));
        } else {
            stream = stream.pipe(gulp_coffeelint());
        }
        stream = stream.pipe(
            gulp_coffeelint.reporter()
        );
        return stream;
    } else {
        done();
    }
});
