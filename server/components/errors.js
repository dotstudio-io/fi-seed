'use strict';

const CONSTS = require('fi-consts');

const HTTP_CODE_NOTFOUND = CONSTS.CODES.HTTP.NOT_FOUND;
const HTTP_CODE_ERR = CONSTS.CODES.HTTP.ERROR;

const DEVELOPMENT = process.NODE_ENV === 'development';
const ASSETS_OR_API_REGEXP = /^\/(assets|api)\//i;
const NOT_FOUND_REDIRECT = '/lost?url=';
const ERR_NOT_FOUND = 'NotFound';
const ERR_REDIRECT = '/error?err=';
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

    err.status = HTTP_CODE_NOTFOUND;

    next(err);
  });

  /**
   * Error handler.
   */
  app.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || HTTP_CODE_ERR);

    /* Log the error */
    console.log(NL);
    console.log(new Date());
    console.dir(err, DIR_OPTS);

    if (DEVELOPMENT) {
      console.dir(err.stack, DIR_OPTS);
    }

    console.log(NL);

    /* If the request is an AJAX call or is for an asset or API method just end
     * the response */
    if (req.xhr || ASSETS_OR_API_REGEXP.test(req.path)) {
      return res.end();
    }

    /* If it's a 404 render the lost page */
    if (err.status === HTTP_CODE_NOTFOUND) {
      return res.redirect(NOT_FOUND_REDIRECT + encodeURIComponent(req.originalUrl));
    }

    res.redirect(ERR_REDIRECT + encodeURIComponent(err));
  });

};
