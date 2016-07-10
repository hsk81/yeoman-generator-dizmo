'use strict';

var chalk = require('chalk'),
    lodash = require('lodash'),
    os = require('os'),
    path = require('path'),
    process = require('process'),
    shell = require('shelljs'),
    yeoman = require('yeoman-generator'),
    yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        this.option('install-to', {
            defaults: process.env.DIZMO_INSTALL_TO || '',
            desc: 'Default dizmo installation path',
            type: String
        });
        this.option('git', {
            defaults: false,
            desc: 'GIT repository initialization',
            type: Boolean
        });
        this.option('ext', {
            defaults: false,
            desc: 'Extended sub-generator with SASS etc.',
            type: Boolean
        });
        this.option('ext-coffee-script', {
            defaults: false,
            desc: 'Extended sub-generator incl. CoffeeScript',
            type: Boolean
        });
        this.option('ext-type-script', {
            defaults: false,
            desc: 'Extended sub-generator incl. TypeScript',
            type: Boolean
        });

        this.argument('dizmoName', {
            type: String, required: false, defaults: 'MyDizmo'
        });
        this.argument('dizmoDescription', {
            type: String, required: false
        });
        this.argument('bundleId', {
            type: String, required: false
        });
        this.argument('personName', {
            type: String, required: false,
            defaults: this.user.git.name() || process.env.USER
        });
        this.argument('personEmail', {
            type: String, required: false,
            defaults: this.user.git.email() || process.env.MAIL
        });
    },

    prompting: function () {
        var self = this,
            done = this.async();

        this.log(yosay(
            'Welcome to the awesome ' + chalk.green.bold('dizmo') + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'dizmoName',
            message: 'Name your dizmo:',
            default: function () {
                return lodash.upperFirst(lodash.camelCase(self.dizmoName));
            }
        }, {
            type: 'input',
            name: 'dizmoDescription',
            message: 'Describe it:',
            default: function (p) {
                return self.dizmoDescription
                    || lodash.startCase(p.dizmoName);
            }
        }, {
            type: 'input',
            name: 'bundleId',
            message: 'And its bundle ID?',
            default: function (p) {
                var domain = self.config.get('domain') || self._domain(),
                    bundle_id = domain + '.' + lodash.snakeCase(p.dizmoName);

                return self.bundleId || bundle_id;
            }
        }, {
            store: true,
            type: 'input',
            name: 'personName',
            message: 'What\'s your name?',
            default: this.personName
        }, {
            store: true,
            type: 'input',
            name: 'personEmail',
            message: 'And your email?',
            default: this.personEmail
        }];

        this.prompt(prompts, function (properties) {
            this.properties = lodash.assign(properties, {
                installTo: this.options['install-to'],
                _: lodash
            });
            done();
        }.bind(this));
    },

    configuring: function () {
        var bundle_id = path.parse(this.properties.bundleId);
        if (bundle_id && bundle_id.name) {
            this.config.set('domain', bundle_id.name);
        } else {
            this.config.set('domain', this._domain());
        }

        if (this.options['git']) {
            this.destinationRoot(
                lodash.kebabCase(this.properties.dizmoName) + '.git');
        } else {
            this.destinationRoot(
                lodash.kebabCase(this.properties.dizmoName));
        }

        this.config.save();
    },

    writing: function () {
        this.fs.copy(
            this.templatePath('assets/'),
            this.destinationPath('assets/'));
        this.fs.copy(
            this.templatePath('gulp/'),
            this.destinationPath('gulp/'));
        this.fs.copy(
            this.templatePath('help/**/*.png'),
            this.destinationPath('help/'));
        this.fs.copyTpl(
            this.templatePath('help/**/*.md'),
            this.destinationPath('help/'), this.properties);
        this.fs.copy(
            this.templatePath('src/'),
            this.destinationPath('src/'));
        this.fs.copyTpl(
            this.templatePath('src/index.html'),
            this.destinationPath('src/index.html'), this.properties);
        this.fs.copy(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js'));
        this.fs.copy(
            this.templatePath('.info.plist'),
            this.destinationPath('.info.plist'));
        this.fs.copyTpl(
            this.templatePath('LICENSE'),
            this.destinationPath('LICENSE'), lodash.assign(this.properties, {
                year: new Date().getFullYear()
            }));
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'), this.properties);
        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath('README.md'), this.properties);

        if (this.options.git) {
            this.fs.copy(
                this.templatePath('.npmignore'),
                this.destinationPath('.gitignore'));
        } else {
            this.fs.copy(
                this.templatePath('.npmignore'),
                this.destinationPath('.npmignore'));
        }
    },

    install: function () {
        this.npmInstall('', {'cache-min': 604800});
    },

    end: function () {
        if (this.options['ext']) {
            this.composeWith('dizmo:ext', {
                args: this.args, options: lodash.assign(this.options, {
                    force: true
                })
            });
        }
        if (this.options['ext-coffee-script']) {
            this.composeWith('dizmo:ext-coffee-script', {
                args: this.args, options: lodash.assign(this.options, {
                    force: true
                })
            });
        }
        if (this.options['ext-type-script']) {
            this.composeWith('dizmo:ext-type-script', {
                args: this.args, options: lodash.assign(this.options, {
                    force: true
                })
            });
        }
        this._git();
    },

    _git: function () {
        var git = shell.which('git');
        if (git && this.options.git) {
            this.spawnCommand(git.toString(), [
                'init', '--quiet', this.destinationPath()
            ]);
        }
    },

    _domain: function () {
        if (process.env.USER) {
            return 'me.' + process.env.USER;
        } else if (process.env.USERNAME) {
            return 'me.' + process.env.USERNAME;
        } else try {
            var base = path.parse(os.homedir()).base;
            if (base) {
                return 'me.' + base;
            } else {
                return 'my.domain';
            }
        } catch (_) {
            return 'my.domain';
        }
    }
});
