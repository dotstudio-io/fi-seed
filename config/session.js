/* jshint node: true */
'use strict';

var name = 'fi-seed.sid';
var secret = ')Fu%&.j!ain2[]cxMrY%tkxD|Afy1W';
var store = {
    host: 'localhost',
    port: 6379,
    db: 0
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
