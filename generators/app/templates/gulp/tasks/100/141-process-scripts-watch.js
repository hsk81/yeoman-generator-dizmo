var pkg = require('../../package.js'),
    path = require('path');
var gulp = require('gulp'),
    gulp_util = require('gulp-util'),
    gulp_uglify = require('gulp-uglify'),
    gulp_sourcemaps = require('gulp-sourcemaps');
var babelify = require('babelify'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    extend = require('xtend'),
    js_obfuscator = require('javascript-obfuscator'),
    source = require('vinyl-source-stream'),
    through = require('through2'),
    watchify = require('watchify');

var watched = watchify(browserify({
    basedir: '.', entries: ['src/index.js'],
    cache: {}, packageCache: {}, debug: true
}).transform(babelify));

var gulp_obfuscator = function (opts) {
    return through.obj(function (file, encoding, callback) {
        if (file.isNull()) {
            return callback(null, file);
        }
        if (file.isStream()) {
            return callback(new Error('streaming not supported', null));
        }
        var result = js_obfuscator.obfuscate(
            file.contents.toString(encoding), opts);
        file.contents = Buffer.from(
            result.getObfuscatedCode(), encoding);
        callback(null, file);
    });
};

var on_watch = function () {
    var cli_min = require('yargs')
        .default('minify')
        .argv.minify;

    var sourcemaps = false,
        obfuscate = cli_min === true,
        uglify = cli_min === true;

    if (pkg.dizmo && pkg.dizmo.build) {
        var cfg_min = pkg.dizmo.build.minify;
        if (cfg_min) {
            var cfg_ss = cfg_min.scripts !== undefined ? cfg_min.scripts : {};
            if (cfg_ss) {
                if (cfg_ss.sourcemaps) // by default w/o a source-map!
                {
                    sourcemaps = extend({loadMaps: true}, cfg_ss.sourcemaps);
                }
                if (cli_min === undefined && (
                    cfg_ss.obfuscate || cfg_ss.obfuscate === undefined))
                {
                    obfuscate = extend({}, cfg_ss.obfuscate);
                }
                if (cli_min === undefined && (
                    cfg_ss.uglify || cfg_ss.uglify === undefined))
                {
                    uglify = extend({}, cfg_ss.uglify);
                }
            }
        }
    }

    var argv = require('yargs')
        .default('sourcemaps', sourcemaps)
        .default('obfuscate', obfuscate)
        .default('uglify', uglify).argv;

    if (typeof argv.sourcemaps === 'string') {
        argv.sourcemaps = JSON.parse(argv.sourcemaps);
    }
    if (typeof argv.obfuscate === 'string') {
        argv.obfuscate = JSON.parse(argv.obfuscate);
    }
    if (typeof argv.uglify === 'string') {
        argv.uglify = JSON.parse(argv.uglify);
    }

    var bundle = watched.bundle()
        .pipe(source('index.js')).pipe(buffer());
    if (argv.sourcemaps) {
        bundle = bundle.pipe(gulp_sourcemaps.init(
            extend({loadMaps: true}, argv.sourcemaps)
        ));
    }
    if (argv.obfuscate) {
        bundle = bundle.pipe(gulp_obfuscator.apply(
            this, extend({}, argv.obfuscate)
        ));
    }
    if (argv.uglify) {
        bundle = bundle.pipe(gulp_uglify.apply(
            this, extend({}, argv.uglify)
        ));
    }
    if (argv.sourcemaps) {
        bundle = bundle.pipe(gulp_sourcemaps.write('./'));
    }
    return bundle
        .pipe(gulp.dest(path.join('build', pkg.name)));
};

watched.on('update', on_watch);
watched.on('log', gulp_util.log);
gulp.task('process-scripts:watch', on_watch);
