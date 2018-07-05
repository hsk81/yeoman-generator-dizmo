'use strict';

let chalk = require('chalk'),
    fs = require('fs'),
    Generator = require('yeoman-generator'),
    lodash = require('lodash'),
    os = require('os'),
    path = require('path'),
    process = require('process'),
    shell = require('shelljs'),
    rimraf = require('rimraf'),
    yosay = require('yosay');

function sort(dictionary) {
    let array = [],
        sorted = {};

    for(let key in dictionary) {
        array[array.length] = key;
    }
    array.sort();

    for(let i = 0; i < array.length; i++) {
        sorted[array[i]] = dictionary[array[i]];
    }
    return sorted;
}

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('name', {
            defaults: 'MyDizmo',
            required: false,
            type: String
        });
        this.option('description', {
            desc: 'Short one-liner describing the dizmo',
            type: String
        });
        this.option('bundle-id', {
            desc: 'Bundle identifier in reverse domain notation',
            type: String
        });

        this.option('author', {
            defaults: this.user.git.name() || process.env.USER,
            desc: 'Name of the author',
            type: String
        });
        this.option('email', {
            defaults: this.user.git.email() || process.env.MAIL,
            desc: 'Email of the author',
            type: String
        });

        this.option('git', {
            defaults: false,
            desc: 'GIT repository initialization',
            type: Boolean
        });
        this.option('coffeescript', {
            alias: 'coffee-script',
            defaults: false,
            desc: 'Sub-generator with CoffeeScript',
            type: Boolean
        });
        this.option('typescript', {
            alias: 'type-script',
            defaults: false,
            desc: 'Sub-generator with TypeScript',
            type: Boolean
        });
        this.option('upgrade', {
            defaults: false,
            desc: 'Upgrade the build system',
            type: Boolean
        });
    }

    prompting() {
        const self = this;
        let prompts = [], pkg = fs.existsSync('package.json')
            ? JSON.parse(fs.readFileSync('package.json'))
            : {};

        this.log(yosay(
            'Welcome to the awesome {0} generator!'.replace(
                '{0}', chalk.green.bold('dizmo')
            )
        ));

        prompts.push({
            type: 'input',
            name: 'dizmoName',
            message: 'Name your dizmo:',
            default: function () {
                if (pkg && pkg.name) {
                    return pkg.name;
                }
                return lodash.upperFirst(
                    lodash.camelCase(self.options['name']));
            },
            when: function (prop) {
                if (pkg && pkg.name) {
                    if (!pkg.name.match(/\s/)) {
                        prop.dizmoName = pkg.name;
                        return false;
                    }
                }
                if (self.args.length > 0) {
                    if (!self.args[0].match(/\s/)) {
                        prop.dizmoName = self.args[0];
                        return false;
                    }
                }
                return true;
            },
            validate: function (value) {
                return !value.match(/\s/);
            }
        });

        prompts.push({
            type: 'input',
            name: 'dizmoDescription',
            message: 'Describe it:',
            default: function (prop) {
                if (pkg && pkg.description) {
                    return pkg.description;
                }
                return self.dizmoDescription
                    || lodash.startCase(prop.dizmoName);
            },
            when: function (prop) {
                if (pkg && pkg.description) {
                    prop.dizmoDescription = pkg.description;
                    return false;
                }
                if (self.options['description']) {
                    prop.dizmoDescription = self.options['description'];
                    return false;
                }
                return true;
            }
        });

        prompts.push({
            type: 'input',
            name: 'bundleId',
            message: 'And its bundle ID?',
            default: function (prop) {
                if (pkg && pkg.dizmo && pkg.dizmo.settings &&
                    pkg.dizmo.settings['bundle-identifier'])
                {
                    return pkg.dizmo.settings['bundle-identifier'];
                }
                let domain =
                        self.config.get('domain') || self._domain(),
                    bundle_id =
                        domain + '.' + lodash.snakeCase(prop.dizmoName);

                return self.bundleId || bundle_id;
            },
            when: function (prop) {
                if (pkg && pkg.dizmo && pkg.dizmo.settings &&
                    pkg.dizmo.settings['bundle-identifier'])
                {
                    prop.bundleId = pkg.dizmo.settings['bundle-identifier'];
                    return false;
                }
                if (self.options['bundle-id']) {
                    prop.bundleId = self.options['bundle-id'];
                    return false;
                }
                return true;
            }
        });

        prompts.push({
            store: true,
            type: 'input',
            name: 'personName',
            message: 'What\'s your name?',
            default: function () {
                if (pkg && pkg.person && pkg.person.name) {
                    return pkg.person.name;
                }
                return self.personName;
            },
            when: function (prop) {
                if (pkg && pkg.person && pkg.person.name) {
                    prop.personName = pkg.person.name;
                    return false;
                }
                if (self.options['author']) {
                    prop.personName = self.options['author'];
                    return false;
                }
                return true;
            }
        });

        prompts.push({
            store: true,
            type: 'input',
            name: 'personEmail',
            message: 'And your email?',
            default: function () {
                if (pkg && pkg.person && pkg.person.email) {
                    return pkg.person.email;
                }
                return self.personEmail;
            },
            when: function (prop) {
                if (pkg && pkg.person && pkg.person.email) {
                    prop.personEmail = pkg.person.email;
                    return false;
                }
                if (self.options['email']) {
                    prop.personEmail = self.options['email'];
                    return false;
                }
                return true;
            }
        });

        return this.prompt(prompts).then(function (prop) {
            if (prop.dizmoName === undefined) {
                if (pkg && pkg.name) {
                    prop.dizmoName = pkg.name;
                } else {
                    prop.dizmoName = self.options['name'];
                }
            }
            if (prop.dizmoDescription === undefined) {
                if (pkg && pkg.description) {
                    prop.dizmoDescription = pkg.description;
                } else {
                    prop.dizmoDescription = self.options['description'];
                }
            }
            if (prop.bundleId === undefined) {
                if (pkg && pkg.dizmo && pkg.dizmo.settings &&
                    pkg.dizmo.settings['bundle-identifier'])
                {
                    prop.bundleId = pkg.dizmo.settings['bundle-identifier'];
                } else {
                    prop.bundleId = self.options['bundle-id'];
                }
            }
            if (prop.personName === undefined) {
                if (pkg && pkg.person && pkg.person.name) {
                    prop.personName = pkg.person.name;
                } else {
                    prop.personName = self.options['author'];
                }
            }
            if (prop.personEmail === undefined) {
                if (pkg && pkg.person && pkg.person.email) {
                    prop.personEmail = pkg.person.email;
                } else {
                    prop.personEmail = self.options['email'];
                }
            }
            self.properties = lodash.assign(prop, {
                _: lodash
            });
        });
    }

    configuring() {
        let bundle_id = path.parse(this.properties.bundleId);
        if (bundle_id && bundle_id.name) {
            this.config.set('domain', bundle_id.name);
        } else {
            this.config.set('domain', this._domain());
        }

        if (fs.existsSync('package.json')) {
            this.destinationRoot(process.cwd());
        } else {
            if (this.options['git']) {
                this.destinationRoot(
                    lodash.kebabCase(this.properties.dizmoName) + '.git');
            } else {
                this.destinationRoot(
                    lodash.kebabCase(this.properties.dizmoName));
            }
            this.properties.initial = true;
        }
        this.config.save();
    }

    writing() {
        let upgrade = Boolean(
            this.options.upgrade && fs.existsSync('package.json'));
        if (!upgrade || upgrade) {
            this.fs.copy(
                this.templatePath('gulp/'),
                this.destinationPath('gulp/'));
            this.fs.copy(
                this.templatePath('gulpfile.js'),
                this.destinationPath('gulpfile.js'));
        }
        if (!upgrade) {
            this.fs.copyTpl(
                this.templatePath('package.json'),
                this.destinationPath('package.json'), this.properties);
        }
        if (!upgrade || upgrade) {
            let pkg = this.fs.readJSON(
                this.destinationPath('package.json')
            );
            pkg.dependencies = sort(
                lodash.assign(pkg.dependencies, {
                    'babel-polyfill': '^6.26.0'
                })
            );
            pkg.devDependencies = sort(
                lodash.assign(pkg.devDependencies, {
                    'babel-core': '^6.26.3',
                    'babel-preset-env': '^1.7.0',
                    'babelify': '^8.0.0',
                    'browserify': '^16.2.2',
                    'gulp': '^3.9.1',
                    'gulp-copy': '^1.1.0',
                    'gulp-eslint': '^4.0.2',
                    'gulp-htmlmin': '^4.0.0',
                    'gulp-plist': '^0.1.0',
                    'gulp-rename': '^1.3.0',
                    'gulp-sass': '^4.0.1',
                    'gulp-sourcemaps': '^2.6.4',
                    'gulp-sync': '^0.1.4',
                    'gulp-uglify': '^3.0.0',
                    'gulp-util': '^3.0.8',
                    'gulp-ver': '^0.1.0',
                    'gulp-zip': '^4.1.0',
                    'javascript-obfuscator': '^0.17.0',
                    'lodash': '^4.17.10',
                    'pump': '^3.0.0',
                    'rimraf': '^2.6.2',
                    'vinyl-buffer': '^1.0.1',
                    'vinyl-source-stream': '^2.0.0',
                    'watchify': '^3.11.0',
                    'xtend': '^4.0.1'
                })
            );
            pkg.scripts = sort(
                lodash.assign(pkg.scripts, {
                    'build': 'node ./gulp/scripts/build.js',
                    'clean': 'node ./gulp/scripts/clean.js',
                    'deploy': 'node ./gulp/scripts/deploy.js',
                    'lint': 'node ./gulp/scripts/lint.js',
                    'upload': 'node ./gulp/scripts/upload.js',
                    'watch': 'node ./gulp/scripts/watch.js'
                })
            );
            pkg.babel = sort(
                lodash.assign(pkg.babel, {
                    presets: ['env']
                })
            );
            this.fs.writeJSON(
                this.destinationPath('package.json'), pkg, null, 2);
        }
        if (!upgrade) {
            this.fs.copy(
                this.templatePath('assets/'),
                this.destinationPath('assets/'));
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
                this.templatePath('.eslintrc.json'),
                this.destinationPath('.eslintrc.json'));
            this.fs.copy(
                this.templatePath('.info.plist'),
                this.destinationPath('.info.plist'));
            this.fs.copyTpl(
                this.templatePath('LICENSE'),
                this.destinationPath('LICENSE'), lodash.assign(
                    this.properties, {
                        year: new Date().getFullYear()
                    }
                )
            );
            this.fs.copyTpl(
                this.templatePath('README.md'),
                this.destinationPath('README.md'), this.properties);

            if (this.options.git || fs.existsSync('.gitignore')) {
                this.fs.copy(
                    this.templatePath('.npmignore'),
                    this.destinationPath('.gitignore'));
            } else {
                this.fs.copy(
                    this.templatePath('.npmignore'),
                    this.destinationPath('.npmignore'));
            }
        }
        this.conflicter.force = upgrade;
    }

    end() {
        if (this.options['coffeescript']) {
            this.composeWith('dizmo:ext-coffee-script', lodash.assign(
                this.options, {
                    args: this.args, force: this.properties.initial
                }
            ));
        } else if (this.options['typescript']) {
            this.composeWith('dizmo:ext-type-script', lodash.assign(
                this.options, {
                    args: this.args, force: this.properties.initial
                }
            ));
        } else {
            console.log(
                '\nSetting the project root at:', this.destinationPath());
        }
        this._rim();
        this._git();
    }

    _rim() {
        rimraf.sync(
            this.destinationPath('node_modules/'));
    }

    _git() {
        let git = shell.which('git');
        if (git && this.options.git) {
            this.spawnCommand(git.toString(), [
                'init', '--quiet', this.destinationPath()
            ]);
        }
    }

    _domain() {
        if (process.env.USER) {
            return 'me.' + process.env.USER;
        } else if (process.env.USERNAME) {
            return 'me.' + process.env.USERNAME;
        } else try {
            let base = path.parse(os.homedir()).base;
            if (base) {
                return 'me.' + base;
            } else {
                return 'my.domain';
            }
        } catch (_) {
            return 'my.domain';
        }
    }
};
