/* jshint node: true */
/* global include, panic */
'use strict';

var debug = require('debug')('app:sockets');
var socketio = require('socket.io');
var path = require('path');
var walk = require('walk');
var rekuire = require('rekuire');

module.exports = function (server, config) {

  var io = socketio(server),
      walkpath = path.normalize(path.join(__dirname, '..', config.basedir));

  function clean(str) {
    return str.replace(/\/+|\\+/g, '/');
  }

  function getfile() {
    return clean(path.normalize(path.join.apply(null, arguments)));
  }

  function getnsp(filepath) {
    return clean(filepath.replace(walkpath, '').replace(/index/gi, '/').replace('.js', ''));
  }

  /* Initialize socket modules */
  walk.walkSync(walkpath, {
    listeners: {
      file: function (root, stats, next) {
        if (path.extname(stats.name) === '.js') {
          var filepath = getfile(root, stats.name), /* Get file path */
              namespace = getnsp(filepath); /* Get filename without extension */

          rekuire(filepath)(io, namespace); /* Initialize the socket */

          debug(namespace + " --> " + filepath.replace(walkpath, '.../sockets'));
        }

        next();
      },

      errors: function (root, stats, next) {
        panic("Could not register socket module!\n", root, stats);
      }
    }
  });

};
