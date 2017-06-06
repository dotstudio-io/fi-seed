'use strict';

const HTTP_CODE_INTERNAL_ERR = 500;
const HTTP_CODE_NOTFOUND_ERR = 404;

const GLOBAL_NAME_ATTRIBUTE = 'Errors';

const ASSETS_OR_API_REGEXP = /^\/(assets|api)\//i;
const NL = '\n';

/**
 * The component configuration.
 */
const config = {};

/**
 * Every custom error function.
 */
const errors = {};

/**
 * Every redirect url.
 */
const redirect = {};

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
  next(new errors.NotFoundError());
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

  res.status(err.code || HTTP_CODE_INTERNAL_ERR);

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
  if (err.code === HTTP_CODE_NOTFOUND_ERR) {
    return res.redirect(redirect.lost + encodeURIComponent(req.originalUrl));
  }

  res.redirect(redirect.error);
}

module.exports = {

  /**
   * Initialize and configure the errors component
   * 
   * @param {Object} cfg The errors configuration object.
   * @param {Array} cfg.errors The custom errors configuration array file.
   * @param {Object} cfg.redirect The default redirect urls.
   * 
   * @returns The errors component.
   */

  configure: function configure(cfg) {
    if (!cfg || !cfg.errors || !cfg.redirect) {
      throw new Error('Missing errors configuration file');
    }

    /**
     * Register each redirection url.
     */
    for (var url in cfg.redirect) {
      redirect[url] = cfg.redirect[url];
    }

    /**
     * Builds each custom error.
     */
    cfg.errors.forEach((options) => {
      let error = buildError(options);
      errors[options.name] = error;
    });

    config.initialized = true;

    return this;
  },

  /**
   * Register the errors list in the application global object.
   * 
   * @param {Object} global The application global object. If true will store
   * @param {String} name An optional name to register in the globals object.
   * Defaults to Errors.
   * 
   * @returns The errors component.
   */
  register: function register(global, name) {
    if (!config.initialized) {
      throw new Error('Configure this package before usage');
    }

    name = name || GLOBAL_NAME_ATTRIBUTE;

    global[name] = errors;

    return this;
  },

  /**
   * Bind the errors component to the express aplication.
   * 
   * @param {Express} app The express application.
   * @returns The errors component.
   */
  bind: function bind(app) {
    if (!config.initialized) {
      throw new Error('Configure this package before usage');
    }

    app.use(_notFound);
    app.use(_customErrorHandler);

    return this;
  },

  /**
   * @returns Every registered error.
   */
  list: function list() {
    if (!config.initialized) {
      throw new Error('Configure this package before usage');
    }

    return errors;
  }

};