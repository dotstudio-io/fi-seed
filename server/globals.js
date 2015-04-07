/* jshint node: true */
'use strict';

var path = require('path');
var debug = require('debug')('app:globals');
var rekuire = require('rekuire');

module.exports = function (global) {

  /** Use this to include a script relative to the root folder */
  function include(folder, name) {
    var target = path.normalize(path.join(folder, name));

    /* Try to require the module */
    try {
      return rekuire(target);
    } catch (ex) {
      debug('Could not require %s/%s', folder, name);
      console.error(ex);
      return null;
    }
  }

  /** Include a configuration */
  global.getconf = function (name) {
    return include ('config', name);
  };

  /** Use this method to include Components from anywhere */
  global.component = function (name) {
    return include('components', name);
  };

  /** Prints an error and exists the app */
  global.panic = function panic() {
    console.error('\x1b[31m\x1b[1m'); /* Paint it red and fat */
    console.error.apply(console, arguments);
    console.error('\x1b[0m'); /* Reset colors */
    console.error("Exiting application...\n\n");

    /* We don't want the app to keep running if it panics */
    process.exit(1);
  };

};
