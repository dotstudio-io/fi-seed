'use strict';

const CONSTS = require('fi-consts');

const HTTP_CODE_NOTFOUND = CONSTS.CODES.HTTP.NOT_FOUND;
const HTTP_CODE_ERR = CONSTS.CODES.HTTP.ERROR;

const ASSETS_OR_API_REGEXP = /^\/(assets|api)\//i;
const NOT_FOUND_REDIRECT = '/lost?url=';
const ERR_REDIRECT = '/error?err=';
const NL = '\n';

/**
 * Every custom error function
 */
const errors = {};

/**
 * Register every application registered error for global usage.
 * 
 * @param {any} global The application global object.
 */

/**
 * Registers every error function in the application global object.
 * 
 * @param {any} errors The custom errors object.
 * @param {any} global The application global object.
 */
function _registerGlobalErrors(errors, global) {
  global.Errors = errors;
}

/**
 * Builds an error function.
 * 
 * @param {Object} options The error definition.
 * @returns An error function.
 */
function buildError(options) {
  if (!options || !options.name || !options.message || !options.code) {
    throw new Error('Malformed custom error');
  }

  /**
   * Create function dinamically
   */
  var error = new Function(
    `return function ${options.name}(message) { 
      this.name = "${options.name}";
      this.code = "${options.code}";
      this.message = message || "${options.message}";
      this.stack = (new Error()).stack;
    };`)();

  // Chain object constructor
  error.prototype = Object.create(Error.prototype);
  error.prototype.constructor = error;

  return error;
}

/**
 * Catches 404s and forwards them to the error handler.
 * 
 * @param {Object} req The request object. 
 * @param {Object} res The response object.
 * @param {Function} next The following middleware.
 */
function _notFound(req, res, next) {
  next(new Errors.NotFoundError());
}

/**
 * Set proper HTTP status code for custom errors. 
 * 
 * @param {Error} err The generated error.
 * @param {Object} req The request object. 
 * @param {Object} res The response object.
 * @param {Function} next The following middleware. Must be declared to access error
 */
function _customErrorHandler(err, req, res, next) { // eslint-disable-line
  err = err || {};

  res.status(err.code || HTTP_CODE_ERR);

  if (!err.code) {
    /* Log the error */
    console.log(NL);
    console.log(new Date());
    console.error(err.stack);
    console.log(NL);
  }

  /* If the request is an AJAX call or is for an asset or API method just end
   * the response */
  if (req.xhr || ASSETS_OR_API_REGEXP.test(req.path)) {
    return res.end();
  }

  /* If it's a 404 render the lost page */
  if (err.status === HTTP_CODE_NOTFOUND) {
    return res.redirect(NOT_FOUND_REDIRECT + encodeURIComponent(req.originalUrl));
  }

  res.redirect(ERR_REDIRECT);
}

module.exports = {

  /**
   * Initialize and configure the errors component
   * 
   * @param {Array} _errors The custom errors configuration array file.
   * @param {Object} global The application global object. If true will store
   * the custom errors in global.Errors.
   * 
   * @returns The errors component.
   */
  configure: function configure(_errors, global) {
    if (!_errors) {
      throw new Error('Missing errors configuration file');
    }

    /**
     * Builds each custom error.
     */
    _errors.forEach((options) => {
      let error = buildError(options);
      errors[options.name] = error;
    });

    if (global) {
      _registerGlobalErrors(errors, global);
    }

    return this;
  },

  /**
   * Bind the errors component to the express aplication.
   * 
   * @param {Express} app The express application.
   */
  bind: function bind(app) {
    if (!errors) {
      throw new Error('Configure this package before usage');
    }

    app.use(_notFound);
    app.use(_customErrorHandler);
  }

};