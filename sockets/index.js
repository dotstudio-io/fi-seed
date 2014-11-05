/*jshint node: true */
'use strict';

function log(message) {
    console.log('SOCKETS', message);
}

module.exports = function (io) {

    io.sockets.on('connection', function (socket) {

        function log() {
            var array = [">>> "],
                i;

            for (i = 0; i < arguments.length; i += 1) {
                array.push(arguments[i]);
            }

            socket.emit('log', array);
        }

        socket.on('message', function (message) {
            log('Got message: ', message);

            socket.broadcast.emit('message', message); // should be room only
        });

        socket.on('chat.message', function (message) {
            io.emit('chat.message', {
                username: socket.username,
                message: message
            });
        });

        socket.on('user.welcome', function (data) {
            socket.to(data.id).emit('user.welcome', {
                id: socket.id,
                username: data.username
            });
        });

        socket.on('disconnect', function () {
            socket.broadcast.emit('user.farewell', socket.id);
        });

        socket.on('create or join', function (data) {
            var clients = io.sockets.adapter.rooms[data.room],
                numClients = (typeof clients !== 'undefined') ? Object.keys(clients).length : 0,
                room = data.room;

            socket.on('leave', function () {
                log('Leaving room', room);
                socket.leave(room);
            });

            socket.username = data.username;

            log('Room ' + room + ' has ' + numClients + ' client(s)');
            log('Request to create or join room', room);

            switch (numClients) {
                    /* No clients, create */
                case 0:
                    socket.join(data.room);

                    socket.broadcast.emit('user.present', {
                        id: socket.id,
                        username: socket.username
                    });

                    socket.emit('created', data.room);
                    break;

                    /* Only one client, join */
                case 1:
                    io.sockets.in(data.room).emit('join', data.room);

                    socket.join(data.room);

                    socket.broadcast.emit('user.present', {
                        id: socket.id, 
                        username: socket.username
                    });

                    socket.emit('joined', data.room);
                    break;

                    /* Room is full */
                default:
                    socket.emit('full', data.room);
            }


            socket.emit('emit(): client ' + socket.id + ' joined room ' + data.room);
            socket.broadcast.emit('broadcast(): client ' + socket.id + ' joined room ' + data.room);
        });

    });

};