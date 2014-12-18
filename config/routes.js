/*jslint node: true */
/*global panic */
'use strict';

var walk = require('walk');
var path = require('path');
var fs = require('fs');
var debug = require('debug')('app:routes');

module.exports = function (app) {

    walk.walkSync('routes', {
        listeners: {
            file: function (root, stats, next) {
                if (path.extname(stats.name) === '.js') {
                    var route = path.normalize(path.join(root, path.basename(stats.name, '.js')).replace(/routes|index/gi, '/'));
                    var file = path.join('../', root, stats.name);

                    debug('%s --> %s', route, file);

                    app.use(route, require(file));
                }

                next();
            },

            errors: function (root, stats, next) {
                panic("Could not compile routes!\n", root, stats);
            },
            
            end: function () {
                console.log('');
            }
        }
    });

};
