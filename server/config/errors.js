'use strict';

var debug = require('debug')('app:errors');

module.exports = function (app) {

  /* Catch 404 and forward it to the error handler... */
  app.use((req, res, next) => {
    var err = new Error("Resource not found");
    err.status = 404;

    next(err);
  });

  /* Error handler */
  app.use((err, req, res, next) => { // jshint ignore:line
    res.status(err.status || 500);

    debug(err);

    /* AJAX, assets or API errors should not render a view */
    if (req.xhr || req.path.match(/^\/(assets|api)\/.*/i)) {
      if (app.locals.development) {
        return res.send(err.stack);
      }

      return res.end();
    }

    if (app.locals.development) {
      res.locals.error = err;
    } else {
      res.locals.error = {
        message: err.message,
        status: err.status
      };
    }

    /* Let the AngularJS application handle 404 pages with some context */
    if (err.status === 404) {
      return res.redirect('/lost?path=' + req.path);
    }

    res.render('pages/error');
  });

};
