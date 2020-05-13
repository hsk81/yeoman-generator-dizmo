const gulp = require('gulp');

gulp.task('scripts:watch', () =>
    gulp.watch('src/**/*.(coffee|js)', gulp.series('scripts'))
);
