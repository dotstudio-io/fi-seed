/* jshint node: true */
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
  app.use(function (err, req, res, next) {
    var dev = app.get('env') === 'development',
        locals = {};

    res.status(err.status || 500);

    debug("Catched an error!!");
    console.error(err);

    if (req.xhr) {
      if (dev) {
        res.send(err);
      } else {
        res.end();
      }
    } else {
      if (dev) {
        locals.error = err;
      } else {
        locals.error = {
          message: err.message,
          status: err.status
        };
      }

      res.render('error', locals);
    }
  });

};
