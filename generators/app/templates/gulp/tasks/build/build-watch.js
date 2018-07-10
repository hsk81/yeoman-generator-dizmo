let gulp = require('gulp');

require('./help-watch');
require('./assets-watch');
require('./styles-watch');
require('./scripts-watch');
require('./markup-watch');
require('./properties-watch');
require('./libraries-watch');

gulp.task('build:watch', gulp.parallel(
    'help:watch',
    'assets:watch',
    'styles:watch',
    'scripts:watch',
    'markup:watch',
    'properties:watch',
    'libraries:watch'
));
