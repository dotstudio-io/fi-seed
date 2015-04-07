/* jshint node: true */
/* global getconf */
'use strict';

var debug = require('debug')('app:sockets:messaging');

module.exports = function (io, namespace) {

  io.of(namespace).on('connection', function onconnection(socket) {
    debug("A user connected to %s", namespace);

    socket.on('disconnect', function ondisconnect() {
      debug("User disconnected");
    });

    socket.on('join', function onjoin(room) {
      var clients = io.of(namespace).adapter.rooms[room];

      clients = clients ? Object.keys(clients).length : 0;

      socket.on('leave', function onleave() {
        debug("Leaving room [%s]", room);

        socket.leave(room);
        socket.disconnect();
      });

      debug("Room %s has %d client(s)", room, clients);
      debug("Request to create or join room %s", room);

      socket.join(room);
    });

  });

};
