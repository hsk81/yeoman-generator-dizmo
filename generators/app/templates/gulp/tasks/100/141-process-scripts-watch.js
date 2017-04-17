var pkg = require('../../package.js'),
    path = require('path');
var gulp = require('gulp'),
    gulp_util = require('gulp-util'),
    gulp_uglify = require('gulp-uglify'),
    gulp_sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    extend = require('xtend'),
    js_obfuscator = require('javascript-obfuscator'),
    source = require('vinyl-source-stream'),
    through = require('through2'),
    watchify = require('watchify');

var watched = watchify(browserify({
    basedir: '.', entries: ['src/index.js'],
    cache: {}, packageCache: {}, debug: true
}));

var gulp_obfuscator = function (opts) {
    function obfuscate(file, encoding, callback) {
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
    }
    return through.obj(obfuscate);
};

var on_watch = function () {
    var sourcemaps = false,
        obfuscator = false,
        uglify = false;

    if (pkg.dizmo && pkg.dizmo.build) {
        var min = pkg.dizmo.build.minify;
        if (min) {
            var scripts = min.scripts !== undefined ? min.scripts : {};
            if (scripts) {
                if (scripts.sourcemaps) { // by default w/o source-maps!
                    sourcemaps = extend({loadMaps: true}, scripts.sourcemaps);
                }
                if (scripts.obfuscator || scripts.obfuscator === undefined) {
                    obfuscator = extend({}, scripts.obfuscator);
                }
                if (scripts.uglify || scripts.uglify === undefined) {
                    uglify = extend({}, scripts.uglify);
                }
            }
        }
    }

    var bundle = watched.bundle()
        .pipe(source('index.js')).pipe(buffer());
    if (sourcemaps) {
        bundle = bundle.pipe(gulp_sourcemaps.init(sourcemaps));
    }
    if (obfuscator) {
        bundle = bundle.pipe(gulp_obfuscator.apply(this, obfuscator));
    }
    if (uglify) {
        bundle = bundle.pipe(gulp_uglify.apply(this, uglify));
    }
    if (sourcemaps) {
        bundle = bundle.pipe(gulp_sourcemaps.write('./'));
    }
    return bundle
        .pipe(gulp.dest(path.join('build', pkg.name)));
};

watched.on('update', on_watch);
watched.on('log', gulp_util.log);
gulp.task('process-scripts:watch', on_watch);
