/*jslint node: true, nomen: true */
'use strict';

var path = require('path');

module.exports = function (global) {
    
    /* Use this method to include a script relative to the root or base path from anywhere */
    global.include = function include(name) {
        return require(path.normalize(path.join(__dirname, '..', name)));
    };

    /* Use this method to include Schemas from anywhere */
    global.schema = function schema(name) {
        return require(path.normalize(path.join(__dirname, '..', 'schemas', name)));
    };

};
