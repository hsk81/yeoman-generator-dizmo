const cli = require('../../tools/cli.js');
const gulp = require('gulp');

gulp.task('docs', async function (done) {
    await cli.npx('rimraf', 'docs');
    await cli.npm_i('jsdoc', 'minami').catch(() => null);
    await cli.npx('jsdoc', '--configure', 'jsdoc.json');
    done();
});
