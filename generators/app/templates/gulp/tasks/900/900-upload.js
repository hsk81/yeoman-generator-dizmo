var pkg = require('../../package.js'),
    fs = require('fs'),
    request = require('request'),
    url = require('url');

var assert = require('assert'),
    gulp = require('gulp'),
    lodash = require('lodash');

gulp.task('upload', ['build'], function () {
    var base = process.env.DZM_STORE_BASE,
        user = process.env.DZM_STORE_USER,
        pass = process.env.DZM_STORE_PASS;

    assert(base, 'DZM_STORE_BASE required');
    assert(user, 'DZM_STORE_USER required');
    assert(pass, 'DZM_STORE_PASS required');

    var path = 'build/{0}-{1}.dzm'
            .replace('{0}', pkg.name)
            .replace('{1}', pkg.version);

    fs.readFile(path, function (fs_error, data) {
        if (fs_error) throw fs_error;

        request.post(base + '/v1/oauth/login', {
            body: JSON.stringify({
                username:user, password:pass
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }, function (err, res) {
            if (!err && res.statusCode === 200) {
                // TODO: upload via POST/PUT w/session!
            } else {
                console.log(err, res.toJSON());
            }
        });
    });
});
