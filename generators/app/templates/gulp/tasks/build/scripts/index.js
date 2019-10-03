const cli = require('../../../miscellanea/cli.js');
const pkg = require('../../../package.js');

const gulp = require('gulp');
const path = require('path');

let webpack_config = require('../../../../webpack.config');
const webpack_stream = require('webpack-stream');
const webpack = require('webpack');

gulp.task('scripts', async () => {
    const argv = require('yargs')
        .default('sourcemaps')
        .default('obfuscate')
        .default('minify')
        .argv;

    if (typeof argv.sourcemaps === 'string') {
        argv.sourcemaps = JSON.parse(argv.sourcemaps);
    }
    if (typeof argv.sourcemaps === 'boolean') {
        argv.sourcemaps = {
            devtool: argv.sourcemaps ? 'source-map' : undefined
        };
    }
    if (argv.sourcemaps) {
        webpack_config = { ...webpack_config, ...argv.sourcemaps };
    }
    if (typeof argv.obfuscate === 'string') {
        argv.obfuscate = JSON.parse(argv.obfuscate);
    }
    if (typeof argv.obfuscate === 'boolean') {
        argv.obfuscate = argv.obfuscate ? {} : null;
    }
    if (argv.obfuscate) {
        const obfuscator = await cli.npm_i(
            'webpack-obfuscator'
        );
        webpack_config = { ...webpack_config, ...{
            plugins: [new obfuscator(argv.obfuscate)]
        }};
    }
    if (typeof argv.minify === 'string') {
        argv.minify = JSON.parse(argv.minify);
    }
    if (typeof argv.minify === 'boolean') {
        argv.minify = {
            mode: argv.minify ? 'production' : 'none'
        };
    }
    if (argv.minify) {
        webpack_config = { ...webpack_config, ...argv.minify };
    }
    return await new Promise((resolve) => webpack_stream(
        webpack_config, webpack, (error, stats) => {
            if (error) console.error(error);
        })
        .pipe(gulp.dest(path.join('build', pkg.name)))
        .on('end', resolve)
    );
});
