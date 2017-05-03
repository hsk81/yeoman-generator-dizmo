var pkg = require('../../package.js'),
    fs = require('fs'),
    http = require('http'),
    path = require('path'),
    url = require('url');

var assert = require('assert'),
    gulp = require('gulp'),
    lodash = require('lodash');

gulp.task('upload', ['build'], function () {
    var store_url = process.env.DZM_STORE,
        user = process.env.DZM_STORE_USER,
        pass = process.env.DZM_STORE_PASS;

    assert(store_url, 'Store URL required');

    var opts = url.parse(store_url),
        path = 'build/{0}-{1}.dzm'
            .replace('{0}', pkg.name)
            .replace('{1}', pkg.version);

    var auth = '';
    if (user) {
        if (pass) {
            auth += user;
            auth += ':';
            auth += pass;
        } else {
            auth += user;
        }
    } else {
        if (pass) {
            auth += pass;
        }
    }

    if (auth && !opts.auth) {
        lodash.extend(opts, {auth: auth});
    }

    fs.readFile(path, function (fs_error, data) {
        console.log('[ON:FILE]', arguments);

        if (!fs_error) {
            var req = http.request(lodash.extend(opts, {
                method: 'POST', headers: {'Content-Length': data.length}
            }), function (res) {
                console.log('[REQ:OPTION]', opts);
                console.log('[RES:STATUS]', res.statusCode);
                console.log('[RES:STATUS]', res.statusMessage);
                console.log('[RES:HEADER]', JSON.stringify(res.headers));

                var body = '';
                res.on('data', function (chunk) { body += chunk; });
                res.on('end', function () { console.log(body); });
            });

            req.on('error', function (error) {
                console.log('[REQ:ERROR]', error);
            });
            req.write(data);
            req.end();
        } else {
            throw fs_error;
        }
    });
});
