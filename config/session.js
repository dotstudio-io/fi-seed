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
        name: 'fi-mean.cl',
        secret: 'G4jaSLr_-Dj64SaZLPTTpvE0l0uW9fLwo*Is1il9ij_iyoWnP644fihN637~',
        cookie: {
            secure: false /* This should be true in production mode but requires HTTPS */
        },
        saveUninitialized: true,
        resave: true
    };

};
