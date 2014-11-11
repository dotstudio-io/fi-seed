/*jslint node: true */
/*global panic */
'use strict';

var walk = require('walk');
var path = require('path');
var fs = require('fs');
var util = require('util');

module.exports = function () {

    console.log("\n\x1b[1mRegistering schemas...\x1b[0m\x1b[2m");

    walk.walkSync('schemas', {
        listeners: {
            file: function (root, stats, next) {
                if (path.extname(stats.name) === '.js') {
                    var file = path.join('../', root, stats.name);

                    console.log(stats.name, "-->", require(file).modelName);
                }

                next();
            },

            errors: function (root, stats, next) {
                panic("Could not register schemas!\n", root, stats);
            },

            end: function () {
                console.log('\n\x1b[0m');
            }
        }
    });

};
