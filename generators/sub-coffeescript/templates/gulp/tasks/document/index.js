const cli = require('../../tools/cli.js');
const gulp = require('gulp');

const jsdoc = () => new Promise((resolve, reject) => {
    require('tmp').dir(async (e, path, cleanup) => {
        if (e) {
            return reject(e);
        }
        try {
            await cli.npx('coffee', '-cbo', path, 'src');
        } catch (e) {
            return reject(e);
        }
        try {
            await cli.npx('jsdoc', '-c', 'jsdoc.json', path);
        } catch (e) {
            return reject(e);
        }
        cleanup();
        resolve();
    });
});
gulp.task('docs', async (done) => {
    await cli.npx('rimraf', 'docs');
    await cli.npm_i('tmp').catch(() => null);
    await cli.npm_i('jsdoc').catch(() => null);
    await cli.npm_i('minami').catch(() => null);
    await jsdoc().then(done).catch(console.error);
});
