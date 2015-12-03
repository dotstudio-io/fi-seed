'use strict';

var debug = require('debug')('app');

/* Load and register the globals module */
require('./globals')(global);

/* Load and register the colors module */
require('colors');

/* Process has been asked to shut down */
process.on('SIGINT', function () {
  debug("\n\n  Shutting down application...\n".bold);

  /* You may put any cleanup script here */

  process.exit();
});

/* Load and export the main app module */
module.exports = require('./main');
