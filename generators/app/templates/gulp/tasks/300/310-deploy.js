var pkg = require('../../package.js'),
    fs = require('fs'),
    path = require('path');
var gulp = require('gulp'),
    gulp_util = require('gulp-util');

var to = function () {
    var dzm_path =
        process.env.DZM_PATH || pkg.dizmo['path'];
    if (dzm_path && path.isAbsolute(dzm_path) === false) {
        dzm_path = path.join(process.cwd(), dzm_path);
    }
    if (dzm_path) {
        return path.join(
            dzm_path, pkg.dizmo.settings['bundle-identifier']);
    }
    return null;
};
var deploy = function (result, to) {
    if (to) {
        return result.pipe(gulp.dest(to));
    } else {
        return result;
    }
};

gulp.task('deploy', ['build'], function () {
    var stream = deploy(gulp.src(
        'build/{0}/**/*'.replace('{0}', pkg.name)
    ), to());
    if (to() !== null) {
        gulp_util.log(gulp_util.colors.green.bold(
            'Dizmo has been deployed to {0}.'.replace('{0}', to())
        ));
        if (!fs.existsSync(to())) {
            stream = stream.on('finish', function () {
                setTimeout(function () {
                    gulp_util.log(gulp_util.colors.green.bold(
                        'Drag-and-drop {0} onto dizmoViewer!'.replace(
                            '{0}', 'build/{0}-x.y.z.dzm'.replace(
                                '{0}', pkg.name
                            )
                        )
                    ));
                }, 0);
            });
        }
    } else {
        gulp_util.log(gulp_util.colors.yellow.bold(
            'Neither the $DZM_PATH environment variable nor the `dizmo/path` ' +
            'entry in package.json or ~/.generator-dizmo/config.json have ' +
            'been set. Hence the dizmo has not been deployed!'
        ));
        gulp_util.log(gulp_util.colors.yellow.bold(
            'It\'s recommended to set the $DZM_PATH environment variable ' +
            'or the `dizmo/path` entry in ~/.generator-dizmo/config.json ' +
            'to your dizmo deployment path.'
        ));
    }
    return stream;
});
gulp.task('deploy:only', function () {
    return deploy(gulp.src(
        'build/{0}/**/*'.replace('{0}', pkg.name)), to());
});
