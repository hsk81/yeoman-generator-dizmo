let pkg = require('../../package.js'),
    path = require('path'),
    pump = require('pump'),
    gulp = require('gulp');

gulp.task('process-libs', function (done) {
    pump([
        gulp.src(['src/lib/**/*'], {base: 'src'}),
        gulp.dest(path.join('build', pkg.name))
    ], done);
});
