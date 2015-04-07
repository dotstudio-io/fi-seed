/* jshint node: true */
/* global panic */
'use strict';

var debug = require('debug')('app:routes');
var mongoose = require('mongoose');
var express = require('express');
var walk = require('walk');
var path = require('path');
var fs = require('fs');
var rekuire = require('rekuire');

module.exports = function (app, basedir) {

  var walkpath = path.normalize(path.join(__dirname, '..', basedir));

  function clean (str) {
    return str.replace(/\\+|\/+/g, '/');
  }

  function getRoute() {
    return clean(getPath.apply(null, arguments).replace(walkpath, '').replace('index', '/'));
  }

  function getPath() {
    return path.normalize(path.join.apply(null, arguments));
  }

  walk.walkSync(walkpath, {
    listeners: {
      file: function (root, stats, next) {
        if (path.extname(stats.name) === '.js') {
          var router = express.Router(), /* Create a router instance */
              route = getRoute(root, path.basename(stats.name, '.js')), /* Generate route */
              file = getPath(root, stats.name); /* Get the routes path */

          rekuire(file)(router, mongoose); /* Build routes */

          /* Declare route */
          app.use(route, router);

          debug(route + " --> " + file.replace(walkpath, '.../routes'));
        }

        next();
      },

      errors: function (root, stats, next) {
        panic('Could not compile routes!\n', root, stats);
      }
    }
  });

};
