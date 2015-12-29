'use strict';

var debug = require('debug')('app:errors');

module.exports = function (app) {

  /* Catch 404 and forward it to the error handler... */
  app.use(function (req, res, next) {
    var err = new Error("Looks like you are lost...");
    err.status = 404;

    next(err);
  });

  /* Error handler */
  /* jshint unused: false */
  app.use(function (err, req, res, next) {
    var dev = process.env.NODE_ENV === 'development';

    res.status(err.status || 500);

    debug(err);

    if (req.xhr) {
      if (dev) {
        return res.send(err);
      }

      return res.end();
    }

    if (dev) {
      res.locals.error = err;
    } else {
      res.locals.error = {
        message: err.message,
        status: err.status
      };
    }

    if (err.status === 404) {
      /* Let the AngularJS application handle 404s */
      return res.render('pages/home');
    }

    res.render('pages/error');
  });

};
