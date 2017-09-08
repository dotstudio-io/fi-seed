'use strict';

const debug = require('debug')('app:globals');
const path = require('path');

const ERR_EXITING = '\n  Exiting application...\n\n';

const CLI_RESET = '\x1b[0m';
const CLI_RED = '\x1b[31m';
const CLI_FAT = '\x1b[1m';

const PARTIALS = path.join('schemas', 'partials');
const COMPONENTS = 'components';
const CONFIGS = 'configs';

module.exports = global => {

  /* The base application directory path */
  global.__basedir = path.normalize(path.join(__dirname, '..'));

  /* The server directory path */
  global.__serverdir = __dirname;

  /**
   * Prints an error and exists the process.
   */
  function panic() {
    console.error(CLI_RED + CLI_FAT); // Paint it red and fat
    console.error.apply(console, arguments);
    console.error(CLI_RESET + CLI_FAT); // Reset color and make it fat
    console.error(ERR_EXITING);

    /* We don't want the app to keep running if it panics */
    process.exit(1);
  }

  /**
   * Requires a file relative to the server folder.
   *
   * @param {String} relpath The relative directory route.
   * @param {String} name The file name to require.
   *
   * @returns {Mixed} The required file contents.
   */
  function include(relpath, name) {
    var target = path.normalize(path.join(__serverdir, relpath, name));

    debug('Including --> %s:%s', relpath, name);

    /* Try to require the module */
    return require(target);
  }

  /**
   * Requiress a config file.
   *
   * @param {String} name The config name.
   *
   * @returns {Mixed} The required file contents.
   */
  function config(name) {
    return include(CONFIGS, name);
  }

  /**
   * Requires a component.
   *
   * @param {String} name The component name.
   *
   * @returns {Mixed} The required file contents.
   */
  function component(name) {
    return include(COMPONENTS, name);
  }

  /**
   * Requires a schema partial file.
   *
   * @param {String} name The partial name.
   *
   * @returns {Mixed} The required file contents.
   */
  function partial(name) {
    var dirname = path.dirname(name);
    var basename = path.basename(name);

    return include(PARTIALS, path.join(dirname, `_${basename}.js`));
  }

  debug('Base directory: %s', __basedir);
  debug('Server directory: %s', __serverdir);

  global.component = component;
  global.include = include;
  global.partial = partial;
  global.config = config;
  global.panic = panic;

};
