var child_process = require('child_process'),
    fs = require('fs');

var run_script = function () {
    child_process.spawn('node', [
        './node_modules/gulp/bin/gulp.js', 'deploy'
    ].concat(process.argv.slice(2)), {
        stdio: 'inherit'
    });
};

fs.access('./node_modules', function (error) {
    if (error) {
        var npm_install = child_process.spawn('npm', [
            'install'
        ], {
            stdio: 'inherit'
        });
        npm_install.on('close', run_script);
    } else {
        run_script();
    }
});
