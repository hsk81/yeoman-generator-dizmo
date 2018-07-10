let gulp = require('gulp');

require('./110-help');
require('./120-assets');
require('./130-styles');
require('./140-scripts');
require('./150-markup');
require('./160-properties');
require('./170-libraries');
require('./180-dizmo');

gulp.task('build:only', gulp.parallel(
    'help',
    'assets',
    'styles',
    'scripts',
    'markup',
    'properties',
    'libraries'
));
gulp.task('build', gulp.series(
    'lint',
    'clean',
    'build:only',
    'dizmo'
));
