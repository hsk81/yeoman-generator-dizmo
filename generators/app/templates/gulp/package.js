const assert = require('assert');
const fs = require('fs');
const path = require('path');

function filter(object) {
    if (typeof object === 'object') {
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                if (object[key] !== '') {
                    object[key] = filter(object[key]);
                } else {
                    delete object[key];
                }
            }
        }
    }
    return object;
}
function get_config(path_to, cfg_json) {
    const cfg_path = path.join(
        path_to, '.generator-dizmo', 'config.json'
    );
    try {
        cfg_json = {
            ...JSON.parse(fs.readFileSync(cfg_path)), ...cfg_json
        };
    } catch (ex) {
        // pass
    }
    const parsed = path.parse(path_to);
    if (parsed.dir && parsed.base) {
        cfg_json = {
            ...cfg_json, ...get_config(parsed.dir, cfg_json)
        };
    }
    return cfg_json;
}
const pkg = get_config(
    __dirname, filter(JSON.parse(fs.readFileSync('package.json')))
);
assert(pkg,
    'package JSON required');
assert(pkg && pkg.description,
    'package.description required');
assert(pkg && pkg.name,
    'package.name required');
assert(pkg && pkg.version,
    'package.version required');
assert(pkg && pkg.dizmo,
    'package.dizmo required');
assert(pkg && pkg.dizmo && pkg.dizmo.settings,
    'package.dizmo.settings required');
assert(pkg && pkg.dizmo && pkg.dizmo.settings['bundle-identifier'],
    'package.dizmo.settings.bundle-identifier required');
assert(pkg && pkg.dizmo && pkg.dizmo.settings['bundle-name'],
    'package.dizmo.settings.bundle-name required'
);
pkg.dizmo.settings = {
    'bundle-display-name':
        pkg.dizmo.settings['bundle-name'],
    'bundle-short-version-string':
        pkg.version,
    'bundle-version':
        pkg.version,
    'description':
        pkg.description,
    'tags': [
        ...(pkg.dizmo.settings['tags'] || []), ...(pkg.keywords || [])
    ],
    ...pkg.dizmo.settings
};

module.exports = pkg;
