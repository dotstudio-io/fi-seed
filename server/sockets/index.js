/* jshint node: true */
'use strict';

var debug = require('debug')('app:sockets');

module.exports = function (io, namespace) {

  /* Setup Socket.IO here */
  io.of(namespace).on('connection', function (socket) {

    console.log('A user connected');

  });

};
