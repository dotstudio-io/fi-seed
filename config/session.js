/* jshint node: true */
'use strict';

/* Session configuration */
var config = {
  name: 'fi-seed.sid',
  secret: ')Fu%&.j!ain2[]cxMrY%tkxD|Afy1W',
  store: {
    host: 'localhost',
    port: 6379,
    db: 11
  }
};

module.exports = function (session) {

  var RedisStore = require('connect-redis')(session),
      cookieParser = require('cookie-parser');

  return {
    name: config.name,
    secret: config.secret,
    store: new RedisStore(config.store),
    cookieParser: cookieParser(config.secret),
    cookie: { secure: false }, /* This should be true in production mode but requires HTTPS */
    saveUninitialized: true,
    resave: true
  };

};
