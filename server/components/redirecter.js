'use strict';

const ENV = process.env.NODE_ENV;

const PREPRODUCTION = ENV === 'preproduction';
const DEVELOPMENT = ENV === 'development';
const TESTING = ENV === 'testing';

const HTTPS = 'https://';
const WWW = 'www.';

module.exports = (req, res, next) => {
  if (DEVELOPMENT || TESTING || PREPRODUCTION) {
    return next();
  }

  if ((req.secure && req.subdomains.length)) {
    return next();
  }

  var url = HTTPS;

  if (!req.subdomains.length) {
    url += WWW;
  }

  url += req.hostname + req.originalUrl;

  res.redirect(url);
};