'use strict';

const CONSTS = require('fi-consts');
const is = require('fi-is');

const UNKNOWN_BIND = CONSTS.ERRORS.SERVER.UNKNOWN_BIND;
const EADDRINUSE = CONSTS.ERRORS.SERVER.EADDRINUSE;
const EACCES = CONSTS.ERRORS.SERVER.EACCES;
const LISTEN = 'listen';
const PIPE_SP = 'pipe ';
const PORT_SP = 'port ';

const ERR_EADDRINUSE = '\n  Bind [%s:%s] is already in use!\n'.bold.red;
const ERR_EACCES = '\n  Bind [%s:%s] requires elevated privileges!\n'.bold.red;

function getBind(server) {
  var addr = server.address();

  if (addr) {
    return is.string(addr) ? PIPE_SP + addr : PORT_SP + addr.port;
  }

  return UNKNOWN_BIND;
}

function onServerError(error) {
  if (error.syscall !== LISTEN) {
    throw error;
  }

  switch (error.code) {
  case EACCES:
    console.error(ERR_EACCES, error.address, error.port);
    process.exit(1);
    break;

  case EADDRINUSE:
    console.error(ERR_EADDRINUSE, error.address, error.port);
    process.exit(1);
    break;

  default:
    throw error;
  }
}

module.exports.onServerError = onServerError;
module.exports.getBind = getBind;
