'use strict';

const ASSETS_OR_API_REGEXP = /^\/(assets|api)\//i;
const ERR_NOT_FOUND = 'ERR.RESOURCE-NOT-FOUND';
const NOT_FOUND_REDIRECT = '/lost?url=';
const ERR_REDIRECT = '/error';
const NOT_FOUND_CODE = 404;
const ERR_CODE = 500;
const NL = '\n';

const DIR_OPTS = {
  colors: true,
  depth: 2
};

module.exports = (app) => {

  /**
   * Catches 404s and forwards them to the error handler.
   */
  app.use((req, res, next) => {
    var err = new Error(ERR_NOT_FOUND);

    err.status = NOT_FOUND_CODE;

    next(err);
  });

  /**
   * Error handler.
   */
  app.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || ERR_CODE);

    /* Log the error */
    console.log(NL);
    console.log(new Date());
    console.dir(err, DIR_OPTS);
    console.log(NL);

    /* If the request is an AJAX call or is for an asset or API method just end
     * the response */
    if (req.xhr || ASSETS_OR_API_REGEXP.test(req.path)) {
      return res.end();
    }

    /* If it's a 404 render the lost page */
    if (err.status === NOT_FOUND_CODE) {
      return res.redirect(NOT_FOUND_REDIRECT + encodeURIComponent(req.originalUrl));
    }

    res.redirect(ERR_REDIRECT);
  });

};
