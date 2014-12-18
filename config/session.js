/*jslint node: true */
'use strict';

var name = 'telemed.sid';
var secret = 'G4jaSLr_-Dj64SaZLPTTpvE0l0uW9fLwo*Is1il9ij_iyoWnP644fihN637~';
var store = {
    host: 'jtguzman.dnsalias.com',
    port: 6379,
    db: 1
};

module.exports = function (session) {

    var RedisStore = require('connect-redis')(session);
    var cookieParser = require('cookie-parser');

    return {
        name: name,
        secret: secret,
        store: new RedisStore(store),
        cookieParser: cookieParser(secret),
        cookie: { secure: false }, /* This should be true in production mode but requires HTTPS */
        saveUninitialized: true,
        resave: true
    };

};
