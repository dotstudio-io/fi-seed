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
    var dev = app.get('env') === 'development';

    var locals = {
      development: process.env.NODE_ENV === 'development',
      title: require(__appdir + '/package.json').title,
      error: null
    };

    res.status(err.status || 500);

    console.log("\n");
    debug("Catched an error!!");
    console.error(err);
    console.log("\n");

    if (req.xhr) {
      if (dev) {
        return res.send(err);
      }

      return res.end();
    }

    if (dev) {
      locals.error = err;
    } else {
      locals.error = {
        message: err.message,
        status: err.status
      };
    }

    if (err.status === 404) {
      /* Let Angular handle 404s */
      res.render('index', locals);
    } else {
      res.render('error', locals);
    }
  });

};
