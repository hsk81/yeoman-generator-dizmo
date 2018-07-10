let gulp = require('gulp');

require('./gulp/tasks/lint/lint');
require('./gulp/tasks/clean/clean');
require('./gulp/tasks/build/build');
require('./gulp/tasks/deploy/deploy');
require('./gulp/tasks/upload/upload');
require('./gulp/tasks/watch/watch');

gulp.task('default', gulp.series(
    'build'
));
