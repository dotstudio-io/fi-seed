'use strict';

const CONSTS = require('fi-consts');

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
  for (var error in errors) {
    global[error] = errors[error];
  }
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

  var error = new Function(
    `return function ${options.name}(message) { 
      this.name = "${options.name}";
      this.message = message || "${options.message}";
      this.stack = (new Error()).stack;
    };`)();

  // Chain object constructor
  error.prototype = Object.create(Error.prototype);
  error.prototype.constructor = error;

  return error;
}

/**
 * Returns the builded custom errors.
 * If the global object is passed, every error is registered inside.
 */
module.exports = (global) => {

  /**
   * Builds each custom error.
   */

  for (var name in CONSTS.ERRORS.CUSTOM) {
    let options = CONSTS.ERRORS.CUSTOM[name];
    let error = buildError(options);
    errors[options.name] = error;
  }

  if (global) {
    _registerGlobalErrors(errors, global);
  }

  return errors;
};