const cli = require('../../tools/cli.js');
const gulp = require('gulp');

gulp.task('docs', async function (done) {
    await cli.npx('rimraf', 'docs');
    await cli.npm_i('typedoc');
    await cli.npx('typedoc',
        '--inputFiles', 'src/index.ts',
        '--options', 'typedoc.json'
    );
    done();
});
