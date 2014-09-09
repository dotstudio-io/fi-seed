/*jslint node: true */
'use strict';

var path = require('path');

module.exports = function (global) {

    global.include = function include(name) {
        return require(path.normalize(path.join(__dirname, '..', name)));
    };

    global.schema = function schema(name) {
        return require(path.normalize(path.join(__dirname, '..', 'schemas', name)));
    };

};