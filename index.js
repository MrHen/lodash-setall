var lodash_forEach = require('lodash.foreach'),
    lodash_set = require('lodash.set'),
    lodash_get = require('lodash.get');

function setAll(origin, path_map, dest) {
    dest = dest || {};
    lodash_forEach(path_map, function(path, key) {
        lodash_set(dest, key, lodash_get(origin, path));
    });
    return dest;
}

module.exports = setAll;
