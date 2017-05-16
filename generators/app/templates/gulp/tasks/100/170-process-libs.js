let pkg = require('../../package.js'),
    pump = require('pump');
let gulp = require('gulp'),
    gulp_copy = require('gulp-copy');

gulp.task('process-libs', function (cb) {
    pump([
        gulp.src([
            'src/lib/**/*'
        ]),
        gulp_copy('build/{0}/'.replace('{0}', pkg.name), {
            prefix: 1
        })
    ], cb);
});
