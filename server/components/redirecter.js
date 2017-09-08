'use strict';

const ENV = process.env.NODE_ENV;

const DEVELOPMENT = ENV === 'development';
const TESTING = ENV === 'testing';

/**
 * Enforces www as sub domain if none present.
 *
 * @param {Object} req Express request object.
 * @param {Object} res Express response object.
 * @param {Object} next Express next middleware callback.
 *
 * @returns {void}
 */
module.exports = (req, res, next) => {
  if (DEVELOPMENT || TESTING || req.subdomains.length) {
    return next();
  }

  const url = `${ req.protocol }://www.${ req.hostname }${ req.originalUrl}`;

  res.redirect(url);
};
