let gulp = require('gulp');

require('../build/build-watch');
require('../build/dizmo-watch');
require('../deploy/deploy-watch');

gulp.task('watch', gulp.parallel(
    'build:watch',
    'dizmo:watch',
    'deploy:watch'
));
