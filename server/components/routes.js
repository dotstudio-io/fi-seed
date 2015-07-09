'use strict';

var debug = require('debug')('app:routes');
var mongoose = require('mongoose');
var express = require('express');
var walk = require('walk');
var path = require('path');

function getRoute() {
  return getPath.apply(null, arguments).replace(/routes|index/gi, '/').replace(/\\+/g, '/').replace(/\/+/g, '/');
}

function getPath() {
  return path.normalize(path.join.apply(null, arguments));
}

module.exports = function (app, basedir) {

  var fullpath = path.join(__basedir, basedir);

  walk.walkSync(fullpath, {
    listeners: {
      file: function (root, stats, next) {
        if (path.extname(stats.name) === '.js') {
          /* Create a router instance */
          var router = express.Router();

          /* Generate route */
          var route = getRoute(root.replace(fullpath, ''), path.basename(stats.name, '.js'));

          /* Get the controller path */
          var file = getPath(root, stats.name);

          /* Build the controller */
          require(file)(router, mongoose);

          /* Declare route */
          app.use(route, router);

          debug("%s --> %s", route, file);
        }

        next();
      },

      errors: function (root, stats) {
        panic("Could not compile routes!\n", root, stats);
      }
    }
  });

};
