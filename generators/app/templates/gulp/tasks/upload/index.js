const pkg = require('../../package.js');
const ansi_colors = require('ansi-colors');
const assert = require('assert');
const fancy_log = require('fancy-log');
const fs = require('fs');
const gulp = require('gulp');
const request = require('request');

gulp.task('upload:send', (done) => {
    let host = process.env.DZM_STORE_HOST;
    let user = process.env.DZM_STORE_USER;
    let pass = process.env.DZM_STORE_PASS;

    if (pkg.dizmo && pkg.dizmo.store) {
        host = host || pkg.dizmo.store.host;
        user = user || pkg.dizmo.store.user;
        pass = pass || pkg.dizmo.store.pass;
    }

    const argv = require('yargs')
        .default('host', host)
        .default('user', user)
        .default('pass', pass)
        .default('publish', null)
        .argv;

    if (!argv.host) {
        setTimeout(() => fancy_log(ansi_colors.yellow.bold(
            'Upload: DZM_STORE_HOST, package.json:dizmo.store.host or ' +
            '`--host` required!'
        )), 0);
        done();
        return;
    }
    if (!argv.user && argv.user !== '') {
        setTimeout(() => fancy_log(ansi_colors.yellow.bold(
            'Upload: DZM_STORE_USER, package.json:dizmo.store.user or ' +
            '`--user` required!'
        )), 0);
        done();
        return;
    }
    if (!argv.pass && argv.pass !== '') {
        setTimeout(() => fancy_log(ansi_colors.yellow.bold(
            'Upload: DZM_STORE_PASS, package.json:dizmo.store.pass or ' +
            '`--pass` required!'
        )), 0);
        done();
        return;
    }
    if (!pkg ||
        !pkg.dizmo ||
        !pkg.dizmo.settings ||
        !pkg.dizmo.settings['category']) {
        setTimeout(() => fancy_log(ansi_colors.yellow.bold(
            'Upload: package.json:dizmo.settings.category required, ' +
            'e.g. "tools"!'
        )), 0);
        done();
        return;
    }

    const dzm_name = `${pkg.name}-${pkg.version}.dzm`;
    const do_login = function () {
        request.post(argv.host + '/v1/oauth/login',
            {
                body: JSON.stringify({
                    username: argv.user, password: argv.pass
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }, on_login
        );
    };
    const on_login = function (err, res) {
        if (!err && res.statusCode === 200) {
            const set_cookies = res.headers['set-cookie'];
            assert(set_cookies, '"Set-Cookie" header required');
            const set_cookie = set_cookies[0];
            assert(set_cookie, '"Set-Cookie" header empty');
            const session = set_cookie.split(';')[0];
            assert(session, '"Set-Cookie" header invalid');

            if (argv.publish === true) {
                publish_dizmo(session);
            } else {
                post_dizmo(session);
            }
        } else {
            on_error_login.apply(this, arguments);
        }
    };
    const post_dizmo = function (session) {
        if (argv.publish === true) {
            publish_dizmo(session);
        } else {
            request.post(argv.host + '/v1/dizmo', {
                formData: {
                    file: fs.createReadStream('build/' + dzm_name)
                },
                headers: {
                    'Cookie': session
                }
            }, function (err, res) {
                if (!err && res.statusCode === 201) {
                    setTimeout(() => fancy_log(ansi_colors.green.bold(
                        `Upload: transmission to ${argv.host} succeeded.`
                    )), 0);
                    publish_dizmo(session);
                } else {
                    put_dizmo(session);
                }
            });
        }
    };
    const put_dizmo = function (session) {
        if (argv.publish === true) {
            publish_dizmo(session);
        } else {
            const bid = pkg.dizmo.settings['bundle-identifier'];
            request.put(argv.host + `/v1/dizmo/${bid}`, {
                formData: {
                    file: fs.createReadStream('build/' + dzm_name)
                },
                headers: {
                    'Cookie': session
                }
            }, function (err, res) {
                if (!err && res.statusCode === 200) {
                    setTimeout(() => fancy_log(ansi_colors.green.bold(
                        `Upload: transmission to ${argv.host} succeeded.`
                    )), 0);
                    publish_dizmo(session);
                } else {
                    on_error_upload.apply(this, arguments);
                }
            });
        }
    };
    const publish_dizmo = function (session) {
        if (argv.publish !== false) {
            const bid = pkg.dizmo.settings['bundle-identifier'];
            request.put(argv.host + `/v1/dizmo/${bid}/publish/${pkg.version}`, {
                body: JSON.stringify({
                    publish: true
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': session
                }
            }, function (err, res) {
                if (!err && res.statusCode === 200) {
                    setTimeout(() => fancy_log(ansi_colors.green.bold(
                        `Upload: publication of ${dzm_name} succeeded.`
                    )), 0);
                } else {
                    on_error_publish.apply(this, arguments);
                }
            });
        }
    };
    const on_error_login = function () {
        setTimeout(() => fancy_log(ansi_colors.yellow.bold(
            `Upload: sign-in to ${argv.host} failed!`
        )), 0);
        on_error.apply(this, arguments);
    };
    const on_error_upload = function () {
        setTimeout(() => fancy_log(ansi_colors.yellow.bold(
            `Upload: transmission to ${argv.host} failed!`
        )), 0);
        on_error.apply(this, arguments);
    };
    const on_error_publish = function () {
        setTimeout(() => fancy_log(ansi_colors.yellow.bold(
            `Upload: publication of ${dzm_name} failed!`
        )), 0);
        on_error.apply(this, arguments);
    };
    const on_error = function (err, res, body) {
        if (err) {
            setTimeout(() => fancy_log(ansi_colors.red.bold(
                err, res.toJSON()
            )), 0);
        } else if (body) try {
            const json = JSON.parse(body);
            if (json.errormessage && json.errornumber) {
                setTimeout(() => fancy_log(ansi_colors.yellow.bold(
                    `${json.errormessage} [${json.errornumber}]`
                )), 0);
            } else {
                setTimeout(() => fancy_log(ansi_colors.yellow.bold(
                    JSON.stringify(json, null, 4)
                )), 0);
            }
        } catch (ex) {
            setTimeout(() => fancy_log(ansi_colors.red.bold(
                body
            )), 0);
        } else {
            setTimeout(() => fancy_log(ansi_colors.red.bold(
                res.toJSON()
            )), 0);
        }
    };
    do_login();
});
gulp.task('upload', gulp.series(
    'build', 'upload:send'
));
