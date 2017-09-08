'use strict';

const credentials = require('fi-credentials').get('session');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const PRODUCTION = process.env.NODE_ENV === 'production';

const config = {
  secret: credentials.secret,
  saveUninitialized: true,
  name: 'Session',
  resave: true,

  store: new RedisStore({
    host: credentials.host,
    port: credentials.port,
    db: credentials.db
  }),

  cookie: {
    sameSite: PRODUCTION,
    secure: PRODUCTION
  }
};

module.exports.cookieParser = cookieParser(credentials.secret);
module.exports.middleware = session(config);
module.exports.config = config;
