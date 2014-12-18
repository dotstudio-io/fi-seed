/*jslint node: true */
/*global panic */
'use strict';

var walk = require('walk');
var path = require('path');
var fs = require('fs');
var util = require('util');
var debug = require('debug')('app:schemas');

module.exports = function () {

    walk.walkSync('schemas', {
        listeners: {
            file: function (root, stats, next) {
                if (path.extname(stats.name) === '.js') {
                    var file = path.join('../', root, stats.name);

                    debug("%s --> %s", stats.name, require(file).modelName);
                }

                next();
            },

            errors: function (root, stats, next) {
                panic("Could not register schemas!\n", root, stats);
            }
        }
    });

};
