var lodash_forEach = require('lodash.foreach'),
    lodash_set = require('lodash.set'),
    lodash_get = require('lodash.get');

function setAll(dest, path_map, origin) {
    lodash_forEach(path_map, function(value, key) {
        lodash_set(dest, key, lodash_get(origin, value));
    });
    return dest;
}

module.exports = setAll;
