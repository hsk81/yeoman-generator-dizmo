let pkg = require('../../package.js'),
    path = require('path'),
    pump = require('pump'),
    gulp = require('gulp');

gulp.task('process-assets:base', function (done) {
    pump([
        gulp.src([
            'assets/Icon.*', 'assets/Icon-dark.*', 'assets/Preview.*'
        ]),
        gulp.dest(
            path.join('build', pkg.name)
        )
    ], done);
});
gulp.task('process-assets', ['process-assets:base'], function (done) {
    pump([
        gulp.src(['assets/**/*'], {base: '.'}),
        gulp.dest(path.join('build', pkg.name))
    ], done);
});
