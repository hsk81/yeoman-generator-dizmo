let gulp = require('gulp');

require('./111-help-watch');
require('./121-assets-watch');
require('./131-styles-watch');
require('./141-scripts-watch');
require('./151-markup-watch');
require('./161-properties-watch');
require('./171-libraries-watch');
require('./181-dizmo-watch');
require('./311-deploy-watch');

gulp.task('watch', gulp.series(
    'build', gulp.parallel(
        'help:watch',
        'assets:watch',
        'styles:watch',
        'scripts:watch',
        'markup:watch',
        'properties:watch',
        'libraries:watch'
    ),
    'dizmo:watch',
    'deploy:watch'
));
