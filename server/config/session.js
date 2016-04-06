'use strict';

var base64url = require('base64url');
var crypto = require('crypto');
var path = require('path');
var fs = require('fs');

var sessionKeyFile = path.normalize(path.join(__serverdir, 'credentials', 'session.key'));

var config = {
  name: require(__basedir + '/package.json').name + '.sid',
  store: {
    host: 'localhost',
    port: 6379,
    db: 8
  }
};

/* Generate session key */
try {
  config.secret = fs.readFileSync(sessionKeyFile, 'utf-8');
} catch (ex) {
  config.secret = base64url(crypto.randomBytes(48));
  fs.writeFileSync(sessionKeyFile, config.secret, 'utf-8');
}

module.exports = function (session) {

  var RedisStore = require('connect-redis')(session);
  var cookieParser = require('cookie-parser');

  return {
    name: config.name,
    secret: config.secret,
    store: new RedisStore(config.store),
    cookieParser: cookieParser(config.secret),
    cookie: {
      secure: false
    },
    saveUninitialized: true,
    resave: true
  };

};
