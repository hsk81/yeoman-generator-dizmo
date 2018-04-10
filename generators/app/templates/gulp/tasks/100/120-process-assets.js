let pkg = require('../../package.js');
let gulp = require('gulp'),
    gulp_copy = require('gulp-copy');

gulp.task('process-assets:base', function (done) {
    return require('../../miscellanea/pipe')([
        gulp.src([
            'assets/Icon.*', 'assets/Icon-dark.*', 'assets/Preview.*'
        ]),
        gulp_copy('build/{0}/'.replace('{0}', pkg.name), {
            prefix: 1
        })
    ], done);
});
gulp.task('process-assets', ['process-assets:base'], function (done) {
    return require('../../miscellanea/pipe')([
        gulp.src([
            'assets/**/*'
        ]),
        gulp_copy('build/{0}/assets/'.replace('{0}', pkg.name), {
            prefix: 1
        })
    ], done);
});
