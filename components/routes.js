/* jshint node: true */
/* global panic */
'use strict';

var debug = require('debug')('app:routes');
var mongoose = require('mongoose');
var express = require('express');
var walk = require('walk');
var path = require('path');
var fs = require('fs');

function getRoute() {
  return getPath.apply(null, arguments).replace(/routes|index/gi, '/').replace(/\\+/g, '/').replace(/\/+/g, '/');
}

function getPath() {
  return path.normalize(path.join.apply(null, arguments));
}

module.exports = function (app, basedir) {

  walk.walkSync(basedir, {
    listeners: {
      file: function (root, stats, next) {
        if (path.extname(stats.name) === '.js') {
          var router = express.Router(), /* Create a router instance */
              route = getRoute(root, path.basename(stats.name, '.js')), /* Generate route */
              file = getPath('..', root, stats.name), /* Get the controller path */
              controller = require(file)(router, mongoose); /* Build the controller */

          /* Declare route */
          app.use(route, router);

          debug(route + " --> " + file);
        }

        next();
      },

      errors: function (root, stats, next) {
        panic("Could not compile routes!\n", root, stats);
      }
    }
  });

};
