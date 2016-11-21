'use strict';

var generators = require('yeoman-generator'),
    lodash = require('lodash'),
    rimraf = require('rimraf');

function sort(dictionary) {
    var array = [],
        sorted = {};

    for(var key in dictionary) {
        array[array.length] = key;
    }
    array.sort();

    for(var i = 0; i < array.length; i++) {
        sorted[array[i]] = dictionary[array[i]];
    }
    return sorted;
}

module.exports = generators.Base.extend({
    configuring: function () {
        var pkg = this.fs.readJSON(
            this.destinationPath('package.json'));

        pkg.scripts = sort(
            lodash.assign(pkg.scripts, {
                'lint': 'node ./node_modules/gulp/bin/gulp.js lint'
            })
        );
        pkg.devDependencies = sort(
            lodash.assign(pkg.devDependencies, {
                'coffeeify': '^2.0.1',
                'gulp-coffeelint': '^0.6.0',
                'gulp-htmlmin': '^2.0.0',
                'gulp-sass': '^2.3.2',
                'gulp-sourcemaps': '^1.6.0',
                'gulp-uglify': '^1.5.3',
                'vinyl-buffer': '^1.0.0'
            })
        );

        this.fs.writeJSON(
            this.destinationPath('package.json'), sort(pkg), null, 4);

        return pkg;
    },

    writing: function () {
        this.fs.copy(
            this.templatePath('gulp/'),
            this.destinationPath('gulp/'));
        this.fs.copy(
            this.templatePath('src/'),
            this.destinationPath('src/'));
        this.fs.copy(
            this.templatePath('coffeelint.json'),
            this.destinationPath('coffeelint.json'));
    },

    install: function () {
        this.npmInstall('', {'cache-min': 604800});
    },

    end: function () {
        rimraf.sync(
            this.destinationPath('src/index.js'));
        rimraf.sync(
            this.destinationPath('src/style/style.css'));
    }
});
