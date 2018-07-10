let gulp = require('gulp');

require('./gulp/tasks/000-lint');
require('./gulp/tasks/010-clean');
require('./gulp/tasks/100-build');
require('./gulp/tasks/310-deploy');
require('./gulp/tasks/900-upload.js');
require('./gulp/tasks/999-watch.js');

gulp.task('default', gulp.series(
    'build'
));
