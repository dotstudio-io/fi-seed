'use strict';

const PACKAGE = require(__basedir + '/package.json');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const base64url = require('base64url');
const redis = require('connect-redis');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const sessionKeyFile = path.normalize(path.join(__serverdir, 'credentials', 'session.key'));
const RedisStore = redis(session);

var secret;

/* Generate or use an existant session key */
try {
  secret = fs.readFileSync(sessionKeyFile, 'utf8');
} catch (ex) {
  secret = base64url(crypto.randomBytes(48));
  fs.writeFileSync(sessionKeyFile, secret, 'utf8');
}

var config = {
  name: PACKAGE.name + '.sid',
  saveUninitialized: true,
  secret: secret,
  resave: true,

  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    db: 0
  }),

  cookie: {
    secure: process.env.NODE_ENV === 'production' // Serve secure cookies in production (requires HTTPS)
  }
};

module.exports.cookieParser = cookieParser(secret);
module.exports.middleware = session(config);
module.exports.config = config;
