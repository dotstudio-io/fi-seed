'use strict';

const CONSTS = require('fi-consts');
const is = require('fi-is');

const UNKNOWN_BIND = CONSTS.ERRORS.SERVER.UNKNOWN_BIND;
const EADDRINUSE = CONSTS.ERRORS.SERVER.EADDRINUSE;
const EACCES = CONSTS.ERRORS.SERVER.EACCES;
const LISTEN = 'listen';
const PIPE_SP = 'pipe ';
const PORT_SP = 'port ';

const ERR_EADDRINUSE = 'Bind [%s:%s] is already in use!'.bold.red;
const ERR_EACCES = 'Bind [%s:%s] requires elevated privileges!'.bold.red;

/**
 * Retrieves the server binding.
 *
 * @param {Object} server The server.
 *
 * @returns {String} The binding string.
 */
function getBind(server) {
  const addr = server.address();

  if (addr) {
    if (is.string(addr)) {
      return PIPE_SP + addr;
    }

    return PORT_SP + addr.port;
  }

  return UNKNOWN_BIND;
}

/**
 * Handles a server listen error.
 *
 * @param {Error} err The error object.
 */
function onServerError(err) {
  if (err.syscall !== LISTEN) {
    throw err;
  }

  switch (err.code) {
  case EACCES:
    console.error(ERR_EACCES, err.address, err.port);
    process.exit(1);
    break;

  case EADDRINUSE:
    console.error(ERR_EADDRINUSE, err.address, err.port);
    process.exit(1);
    break;

  default:
    throw err;
  }
}

module.exports.onServerError = onServerError;
module.exports.getBind = getBind;
