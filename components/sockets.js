/* jshint node: true */
/* global include, panic */
'use strict';

var debug = require('debug')('app:sockets');
var socketio = require('socket.io');
var path = require('path');
var walk = require('walk');

module.exports = function (server, config) {

  var io = socketio(server);

  function clean(str) {
    return str.replace(/\/+|\\+/g, '/');
  }

  function getfile() {
    return clean(path.normalize(path.join.apply(null, arguments)));
  }

  function getnsp(filepath) {
    return clean(filepath.replace(config.basedir, '').replace('index', '/').replace(/^.+?(\/.+)\.js$/, '$1'));
  }

  /* Initialize socket modules */
  walk.walkSync(config.basedir, {
    listeners: {
      file: function (root, stats, next) {
        if (path.extname(stats.name) === '.js') {

          var filepath = getfile('..', root, stats.name), /* Get file */
              namespace = getnsp(filepath); /* Get filename without extension */

          require(filepath)(io, namespace); /* Initialize the socket */

          debug(namespace + " --> " + filepath);
        }

        next();
      },

      errors: function (root, stats, next) {
        panic("Could not register socket module!\n", root, stats);
      }
    }
  });

};
