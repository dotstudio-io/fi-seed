/*jslint node: true */
'use strict';

function log(message) {
    console.log('SOCKETS', message);
}

module.exports = function (io) {

    io.on('connection', function onConnection(socket) {

        log('A user connected to Sockets');

        socket.on('disconnect', function onDisconnect() {
            log('User disconnected from Sockets');
        });

    });

};
