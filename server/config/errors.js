'use strict';

const CONSTS = require('fi-consts');

/**
 * Every custom error function
 */
const errors = {};

CONSTS.ERRORS.CUSTOM.forEach((error) => {
  errors[error.name] = buildError(error);
});

function buildError(options) {
  if (!options || !options.name || !options.message || !options.code) {
    throw new Error('Malformed custom error');
  }

  var error = new Function();

  error.name = options.name;
  error.message = error.arguments[0] || options.message;
  error.stack = (new Error()).stack;

  // Chain object constructor
  error.prototype = Object.create(Error.prototype);
  error.prototype.constructor = error;

  return error;
}


/**
 * 
 */
module.exports = errors;