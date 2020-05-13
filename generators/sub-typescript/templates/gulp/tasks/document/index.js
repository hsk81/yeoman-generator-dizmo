const cli = require('../../tools/cli.js');
const gulp = require('gulp');

const typedoc = () => cli.npx('typedoc',
    '--inputFiles', 'src/index.ts',
    '--options', 'typedoc.json'
);
gulp.task('docs', async (done) => {
    await cli.npx('rimraf', 'docs');
    await cli.npm_i('typedoc').catch(() => null);
    await typedoc().then(done).catch(console.error);
});
