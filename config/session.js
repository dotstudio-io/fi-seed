/*jslint node: true */
'use strict';

module.exports = function (session) {

    var RedisStore = require('connect-redis')(session);

    return {
        store: new RedisStore({
            host: 'localhost',
            port: 6379,
            db: 1
        }),
        name: 'cookie.monster',
        secret: 'abcdefghijklmnopqrstuvwxyz0123456789', /* MUST be changed! */
        cookie: {
            secure: false /* This should be true in production mode but requires HTTPS */
        },
        saveUninitialized: true,
        resave: true
    };

};