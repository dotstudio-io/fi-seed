/* jshint node: true */
/* global getconf */
'use strict';

var mongoose = require('mongoose');
var debug= require('debug')('app:messaging');

var SessionSocket = require('session.socket.io');

module.exports = function (io, sesscfg) {

    var sio = new SessionSocket(io, sesscfg.store, sesscfg.cookieParser, sesscfg.name);
    var nsp = '/room/messaging';
    
    var Message = mongoose.model('message');

    sio.of(nsp).on('connection', function (err, socket, session) {
        debug("A user connected to", nsp);

        socket.on('disconnect', function () {
            debug("User disconnected");
        });

        socket.on('join', function (data) {
            var room = nsp + ':' + data.room,
                clients = io.of(nsp).adapter.rooms[room];

            clients = clients ? Object.keys(clients).length : 0;

            socket.on('message', function (data) {
                new Message({
                    sender: session.user._id,
                    body: data.body,
                    sic: data.sic
                }).save(function (err, data) {
                    if (err) {
                    } else {
                        io.of(nsp).to(room).emit('message', data);
                    }
                });
            });

            socket.on('leave', function () {
                debug("Leaving room [%s]", room);

                socket.leave(room);
                socket.disconnect();
            });

            debug("Room %s has %d client(s)", room, clients);
            debug("Request to create or join room", room);

            socket.join(room);

        });

    });

};
