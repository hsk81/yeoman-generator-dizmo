'use strict';

var fs = require('fs'),
    generators = require('yeoman-generator'),
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

module.exports = generators.extend({
    writing: function () {
        var upgrade = Boolean(
            this.options.upgrade && fs.existsSync('package.json'));
        if (!upgrade || upgrade) {
            this.fs.copy(
                this.templatePath('gulp/'),
                this.destinationPath('gulp/'));
        }
        if (!upgrade || upgrade) {
            var pkg = this.fs.readJSON(
                this.destinationPath('package.json'));
            delete pkg.devDependencies['gulp-eslint'];
            pkg.devDependencies = sort(
                lodash.assign(pkg.devDependencies, {
                    'coffeeify': '^2.0.1',
                    'gulp-coffeelint': '^0.6.0'
                })
            );
            this.fs.writeJSON(
                this.destinationPath('package.json'), pkg, null, 2);
        }
        if (!upgrade) {
            this.fs.copy(
                this.templatePath('src/'),
                this.destinationPath('src/'));
            this.fs.copy(
                this.templatePath('coffeelint.json'),
                this.destinationPath('coffeelint.json'));
        }
        this.conflicter.force = this.options.force || upgrade;
    },

    end: function () {
        rimraf.sync(
            this.destinationPath('.eslintrc.json'));
        rimraf.sync(
            this.destinationPath('src/index.js'));
    }
});
