'use strict';

module.exports = (app) => {

  /* Catches 404s and forwards them to the error handler */
  app.use((req, res, next) => {
    var err = new Error("Resource not found (404)");

    err.status = 404;

    next(err);
  });

  /* Error handler */
  app.use((err, req, res, next) => { /* jshint ignore: line */
    res.status(err.status || 500);

    /* Log the error */
    console.log("\n");
    console.log(new Date());
    console.dir(err, {
      colors: true,
      depth: 2
    });
    console.log("\n");

    /* If the request is an AJAX call or is for an asset or api method just end
     * the response */
    if (req.xhr || req.path.match(/^\/(assets|api)\//i)) {
      return res.end();
    }

    /* If it's a 404 render the lost page */
    if (err.status === 404) {
      return res.redirect('/lost?url=' + encodeURIComponent(req.originalUrl));
    }

    res.redirect('/error');
  });

};
