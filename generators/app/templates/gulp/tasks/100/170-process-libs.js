let pkg = require('../../package.js'),
    path = require('path'),
    pump = require('pump');
let gulp = require('gulp'),
    gulp_copy = require('gulp-copy');

gulp.task('process-libs', function (done) {
    pump([
        gulp.src([
            'src/lib/**/*'
        ]),
        gulp_copy(path.join('build', pkg.name), {
            prefix: 1
        })
    ], done);
});
