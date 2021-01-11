'use strict';

const fs = require('fs');
const Generator = require('yeoman-generator');
const lodash = require('lodash');
const rimraf = require('rimraf');

module.exports = class extends Generator {
    writing() {
        const upgrade = Boolean(
            this.options.upgrade && fs.existsSync('package.json')
        );
        if (!upgrade || upgrade) {
            this.fs.copy(
                this.templatePath('gulp/'),
                this.destinationPath('gulp/')
            );
            this.fs.copy(
                this.templatePath('_eslintrc.json'),
                this.destinationPath('.eslintrc.json')
            );
        }
        if (!upgrade || upgrade) {
            const tpl_path = this.templatePath('webpack.config.js');
            const dst_path = this.destinationPath('webpack.config.js');
            const pkg_path = this.destinationPath('package.json');
            const pkg = this.fs.readJSON(pkg_path);
            try {
                const config = require(dst_path) || {};
                const module = config.module || {};
                const rules = module.rules || [];
                if (!rules.find((r) =>
                    typeof r.loader === 'object' &&
                    r.loader.indexOf('ts-loader') >= 0 ||
                    typeof r.loader === 'string' &&
                    r.loader.match(/ts-loader/)
                )) {
                    this.fs.copyTpl(tpl_path, dst_path, {
                        dizmoName: pkg.name
                    });
                }
            } catch (ex) {
                this.fs.copyTpl(tpl_path, dst_path, {
                    dizmoName: pkg.name
                });
            }
        }
        if (!upgrade || upgrade) {
            const pkg_path = this.destinationPath('package.json');
            const pkg = this.fs.readJSON(pkg_path);
            pkg.dependencies = sort(
                lodash.assign(pkg.dependencies, {
                    '@dizmo/dizmo.js': '^1.4.24'
                })
            );
            pkg.devDependencies = sort(
                lodash.assign(pkg.devDependencies, {
                    '@typescript-eslint/eslint-plugin': '4.12.0',
                    '@typescript-eslint/parser': '4.12.0'
                })
            );
            pkg.devDependencies = sort(
                lodash.assign(pkg.devDependencies, {
                    'ts-loader': '^8.0.14',
                    'typescript': '^4.1.3'
                })
            );
            delete pkg.devDependencies['gulp-tslint'];
            delete pkg.devDependencies['tslint'];
            this.fs.writeJSON(pkg_path, pkg, null, 2);
        }
        if (!upgrade || upgrade) {
            const pkg_path = this.destinationPath('package.json');
            const pkg = this.fs.readJSON(pkg_path);
            pkg.optionalDependencies = sort(
                lodash.assign(pkg.optionalDependencies, {
                    'typedoc': '^0.20.14'
                })
            );
            delete pkg.optionalDependencies['jsdoc'];
            delete pkg.devDependencies['minami'];
            this.fs.writeJSON(pkg_path, pkg, null, 2);
        }
        if (!upgrade || upgrade) {
            this.fs.copy(
                this.templatePath('typedoc.json'),
                this.destinationPath('typedoc.json')
            );
        }
        if (!upgrade) {
            this.fs.copy(
                this.templatePath('src/'),
                this.destinationPath('src/')
            );
            this.fs.copy(
                this.templatePath('tsconfig.json'),
                this.destinationPath('tsconfig.json')
            );
        }
        this.conflicter.force = this.options.force || upgrade;
    }
    end() {
        rimraf.sync(
            this.destinationPath('jsdoc.json')
        );
        rimraf.sync(
            this.destinationPath('tslint.json')
        );
        rimraf.sync(
            this.destinationPath('src/index.js')
        );
    }
};
function sort(object) {
    return Object.entries(object).sort().reduce(
        (a, [k, v]) => { a[k] = v; return a; }, {}
    );
}
