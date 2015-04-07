/* jshint node: true */
'use strict';

var debug = require('debug')('app:errors');

module.exports = function (app) {

  /* Catch 404 and forward it to the error handler... */
  app.use(function (req, res, next) {

    var err = new Error('Resource not found');
    err.status = 404;

    next(err);

  });

  /* Error handler */
  app.use(function (err, req, res, next) {

    err.status = err.status || 500;

      debug('Status: %s', err.status);
      debug(err);

    res.status(err.status).end();

  });

};
