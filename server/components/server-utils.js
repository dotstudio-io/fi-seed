'use strict';

const is = require('fi-is');

function getBind(server) {
  var addr = server.address();

  if (addr) {
    return is.string(addr) ? 'pipe ' + addr : 'port ' + addr.port;
  }

  return '(unknown bind)';
}

function onServerError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
  case 'EACCES':
    console.error("\n  Bind [%s:%s] requires elevated privileges!\n".bold.red, error.address, error.port);
    process.exit(1);
    break;

  case 'EADDRINUSE':
    console.error("\n  Bind [%s:%s] is already in use!\n".bold.red, error.address, error.port);
    process.exit(1);
    break;

  default:
    throw error;
  }
}

module.exports.onServerError = onServerError;
module.exports.getBind = getBind;
