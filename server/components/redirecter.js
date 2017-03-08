'use strict';

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const TESTING = process.env.NODE_ENV === 'testing';
const HTTPS = 'https://';
const WWW = 'www.';

module.exports = (req, res, next) => {
  if (DEVELOPMENT || TESTING || (req.secure && req.subdomains.length)) {
    return next();
  }

  var url = HTTPS;

  if (!req.subdomains.length) {
    url += WWW;
  }

  url += req.hostname + req.originalUrl;

  res.redirect(url);
};