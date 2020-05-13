const cli = require('../../tools/cli.js');
const rimraf = require('rimraf');
const gulp = require('gulp');

gulp.task('docs', async function (done) {
    await cli.npm_i('jsdoc', 'minami').catch(() => null);
    const jsdoc = cli.npx('jsdoc', '--configure', 'jsdoc.json');
    rimraf('docs', () => jsdoc.then(done));
});
