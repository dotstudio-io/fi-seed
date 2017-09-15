'use strict';

const credentials = require('fi-credentials').get('session');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
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
