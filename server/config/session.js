'use strict';

var uuid = require('node-uuid');

var config = {
  name: require(__basedir + '/package.json').name + '.sid',
  secret: uuid.v4(),
  store: {
    host: 'localhost',
    port: 6379,
    db: 0
  }
};

module.exports = function (session) {

  var RedisStore = require('connect-redis')(session);
  var cookieParser = require('cookie-parser');

  return {
    name: config.name,
    secret: config.secret,
    store: new RedisStore(config.store),
    cookieParser: cookieParser(config.secret),
    cookie: {
      secure: true
    },
    saveUninitialized: true,
    resave: true
  };

};
