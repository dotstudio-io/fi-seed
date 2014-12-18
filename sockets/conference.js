/*jslint node: true */
'use strict';

var debug = require('debug')('app:conference');

module.exports = function (io) {

    var namespace = '/room/conference';

    /* A user connected */
    io.of(namespace).on('connection', function (socket) {
        debug("User [%s] has connected to [%s]", socket.id, namespace);

        /* A user disconnected */
        socket.on('disconnect', function () {
            debug("User [%s] has disconnected", socket.id);

            socket.to(socket.room).broadcast.emit('leave');
        });

        socket.on('join', function (room) {
            /* Prefix the room name with the namespace */
            room = namespace + ':' + room;

            /* Count clients in the room */
            var clients = io.nsps[namespace].adapter.rooms[room];
            clients = clients ? Object.keys(clients).length : 0;

            debug("Room [%s] has [%s] clients", room, clients);

            /* Join the room if there are less than 2 clients */
            if (clients < 2) {
                socket.room = room;
                socket.join(room);

                /* Tell the user if he created or joined the room */
                if (clients === 0) {
                    debug("User [%s] has created the room [%s]", socket.id, room);
                    socket.emit('created', room);
                } else {
                    debug("User [%s] has joined the room [%s]", socket.id, room);
                    socket.emit('joined', room);
                }
            } else {
                debug("User  [%s] tried to join room [%s] but it's full", socket.id, room);
                socket.emit('full', room);
            }
        });

        /* Received the offer from joiner */
        socket.on('offer', function (offer) {
            debug("Got offer from [%s] in room [%s]", socket.id, socket.room);
            socket.to(socket.room).broadcast.emit('offer', offer);
        });

        /* Received the answer from creator */
        socket.on('answer', function (answer) {
            debug("Got answer from [%s] in room [%s]", socket.id, socket.room);
            socket.to(socket.room).broadcast.emit('answer', answer);
        });

        /* Received an ICE candidate */
        socket.on('ice candidate', function (candidate) {
            debug("Got ICE candidate from [%s] in room [%s]", socket.id, socket.room);
            socket.to(socket.room).broadcast.emit('ice candidate', candidate);
        });

        /* A peer left the room */
        socket.on('leave', function () {
            debug("User [%s] left the room [%s]", socket.id, socket.room);

            socket.to(socket.room).broadcast.emit('leave');

            socket.leave(socket.room);
        });

    });
};