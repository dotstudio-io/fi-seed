'use strict';

var debug = require('debug')('app:globals');
var path = require('path');

module.exports = function (global) {

  /* The dir where the app is located */
  global.__appdir = path.normalize(path.join(__dirname, '..'));

  /* The server dir from where the app is located */
  global.__basedir = __dirname;

  /**
   * Prints an error and exists the process.
   */
  function panic() {
    console.error('\x1b[31m\x1b[1m'); /* Paint it red and fat */
    console.error.apply(console, arguments);
    console.error('\x1b[0m'); /* Reset colors */
    console.error("Exiting application...\n\n");

    /* We don't want the app to keep running if it panics */
    process.exit(1);
  }

  /**
   * Requires a file relative to the server folder.
   *
   * @param {String} dirpath The relative directory route.
   * @param {String} name The file name to require.
   */
  function include(dirpath, name) {
    var target = path.normalize(path.join(__basedir, dirpath, name));

    debug("Including --> %s:%s", dirpath, name);

    /* Try to require the module */
    try {
      return require(target);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Requires a config file.
   *
   * @param {String} name The file name.
   */
  function config(name) {
    return include('config', name);
  }

  /**
   * Require a component.
   *
   * @param {String} name The component name.
   */
  function component(name) {
    try {
      return include('components', name);
    } catch (ex) {
      try {
        return require('fi-seed-component-' + name);
      } catch (ex) {
        panic("Component not found!", ex);
      }
    }
  }

  global.component = component;
  global.include = include;
  global.config = config;
  global.panic = panic;

};
