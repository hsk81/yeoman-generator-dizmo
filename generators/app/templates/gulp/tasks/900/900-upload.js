var pkg = require('../../package.js'),
    fs = require('fs'),
    url = require('url');

var assert = require('assert'),
    lodash = require('lodash'),
    request = require('request');
var gulp = require('gulp'),
    gulp_util = require('gulp-util');

gulp.task('upload', ['build'], function () {
    var host = process.env.DZM_STORE_HOST,
        user = process.env.DZM_STORE_USER,
        pass = process.env.DZM_STORE_PASS;

    if (!host) {
        gulp_util.log(gulp_util.colors.yellow.bold(
            'Upload: DZM_STORE_HOST required!'
        ));
        return;
    }
    if (!user) {
        gulp_util.log(gulp_util.colors.yellow.bold(
            'Upload: DZM_STORE_USER required!'
        ));
        return;
    }
    if (!pass) {
        gulp_util.log(gulp_util.colors.yellow.bold(
            'Upload: DZM_STORE_PASS required!'
        ));
        return;
    }
    if (!pkg ||
        !pkg.dizmo ||
        !pkg.dizmo.settings ||
        !pkg.dizmo.settings['category'])
    {
        gulp_util.log(gulp_util.colors.yellow.bold('Upload: ' +
            '"package.json:dizmo.settings.category" required, ' +
            'e.g. "tools"!'
        ));
        return;
    }

    var dzm_name = '{0}-{1}.dzm'
        .replace('{0}', pkg.name)
        .replace('{1}', pkg.version);

    var on_login = function (err, res) {
        if (err || res.statusCode !== 200) {
            on_error_login.apply(this, arguments);
        } else {
            var set_cookies = res.headers['set-cookie'];
            assert(set_cookies, '"Set-Cookie" header required');
            var set_cookie = set_cookies[0];
            assert(set_cookie, '"Set-Cookie" header empty');
            var session = set_cookie.split(';')[0];
            assert(session, '"Set-Cookie" header invalid');

            post_dizmo(session);
        }
    };

    var on_error_login = function (err, res, body) {
        gulp_util.log(gulp_util.colors.yellow.bold(
            'Upload: sign-in to {0} failed!'.replace('{0}', host)
        ));
        if (err) {
            console.log(err, res.toJSON());
        } else if (body) {
            try {
                var json = JSON.parse(body);
                if (json.errormessage && json.errornumber) {
                    gulp_util.log(gulp_util.colors.yellow.bold('{0} [{1}]'
                        .replace('{0}', json.errormessage)
                        .replace('{1}', json.errornumber)
                    ));
                } else {
                    gulp_util.log(gulp_util.colors.yellow.bold(
                        JSON.stringify(json, null, 4)
                    ));
                }
            } catch (ex) {
                console.log(res.toJSON());
            }
        } else {
            console.log(res.toJSON());
        }
    };

    var post_dizmo = function (session) {
        request.post(host + '/v1/dizmo', {
            formData: {
                file: fs.createReadStream('build/' + dzm_name)
            },
            headers:{
                'Cookie': session
            }
        }, function (err, res) {
            if (err || res.statusCode !== 201) {
                put_dizmo(session);
            }
        });
    };

    var put_dizmo = function (session) {
        request.put(host + '/v1/dizmo/{0}'.replace(
            '{0}', pkg.dizmo.settings['bundle-identifier']
        ), {
            formData: {
                file: fs.createReadStream('build/' + dzm_name)
            },
            headers:{
                'Cookie': session
            }
        }, function (err, res) {
            if (err || res.statusCode !== 200) {
                on_error_upload.apply(this, arguments);
            }
        });
    };

    var on_error_upload = function (err, res, body) {
        gulp_util.log(gulp_util.colors.yellow.bold(
            'Upload: of {0} to {1} failed!'
                .replace('{0}', dzm_name).replace('{1}', host)
        ));
        if (err) {
            console.log(err, res.toJSON());
        } else if (body) {
            try {
                var json = JSON.parse(body);
                if (json.errormessage && json.errornumber) {
                    gulp_util.log(gulp_util.colors.yellow.bold('{0} [{1}]'
                        .replace('{0}', json.errormessage)
                        .replace('{1}', json.errornumber)
                    ));
                } else {
                    gulp_util.log(gulp_util.colors.yellow.bold(
                        JSON.stringify(json, null, 4)
                    ));
                }
            } catch (ex) {
                console.log(res.toJSON());
            }
        } else {
            console.log(res.toJSON());
        }
    };

    request.post(host + '/v1/oauth/login', {
        body: JSON.stringify({
            username:user, password:pass
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    }, on_login);
});
