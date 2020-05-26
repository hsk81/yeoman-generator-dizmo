const pkg = require('../../../package.js');
const gulp = require('gulp');
const gulp_htmlmin = require('gulp-htmlmin');
const gulp_replace = require('gulp-replace');
const path = require('path');

const api_version = pkg.dizmo &&
    pkg.dizmo.settings && pkg.dizmo.settings['api-version'];
const rgx_script = (path) => new RegExp(
    `<script([\\s\\S]+)src="/scripts/${path}-([\\.\\d]+).js"([\\s\\S]*)>([\\s\\S]*)</script>`);
const tag_script = (path, ...g) =>
    `<script${g[0]}src="/scripts/${path}-${g[1]}.js"${g[2]}>${g[3]}</script>`;

gulp.task('markup', () => {
    const minify = require('yargs')
        .default('minify').argv.minify;
    const argv = require('yargs')
        .default('htmlmin', minify === true).argv;

    let stream = gulp.src(['src/**/*.html'])
        .pipe(gulp_replace(rgx_script('dizmojs'), (match, ...groups) => {
            if (api_version) groups[1] = api_version;
            return tag_script('dizmojs', ...groups);
        }));
    if (typeof argv.htmlmin === 'string') {
        argv.htmlmin = JSON.parse(argv.htmlmin);
    }
    if (typeof argv.htmlmin === 'boolean') {
        argv.htmlmin = {
            collapseWhitespace: argv.htmlmin,
            minifyCSS: argv.htmlmin,
            minifyJS: argv.htmlmin,
            removeComments: argv.htmlmin
        };
    }
    if (argv.htmlmin) {
        stream = stream.pipe(gulp_htmlmin(argv.htmlmin));
    }
    return stream.pipe(gulp.dest(path.join('build', pkg.name)));
});
