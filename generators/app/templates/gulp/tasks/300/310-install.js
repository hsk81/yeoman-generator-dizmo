var pkg = require('../../package.js'),
    fs = require('fs'),
    os = require('os'),
    path = require('path');
var gulp = require('gulp'),
    gulp_util = require('gulp-util');

var to = function () {
    var install_to = process.env.DIZMO_INSTALL_TO
        || pkg.dizmo['install-to'] || '';
    if (path.isAbsolute(install_to) === false) {
        install_to = path.join(os.homedir(), install_to);
    }
    if (install_to) {
        return path.join(
            install_to, pkg.dizmo.settings['bundle-identifier']);
    }
    return null;
};
var install = function (result, to) {
    if (to) {
        return result.pipe(gulp.dest(to));
    } else {
        return result;
    }
};

gulp.task('install', ['build'], function () {
    var stream = install(gulp.src(
        'build/{0}/**/*'.replace('{0}', pkg.name)
    ), to());
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
    return stream;
});
gulp.task('install:only', function () {
    return install(gulp.src(
        'build/{0}/**/*'.replace('{0}', pkg.name)));
});
