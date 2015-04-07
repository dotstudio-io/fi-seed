/* jshint node: true */
'use strict';

var path = require('path');

var clientRoot = 'client/';
var serverRoot = 'server/';
var publicRoot = 'public/';

module.exports = {
  client: {
    root: clientRoot,
    scripts: {
      source: clientRoot + '**/*.js',
      output: publicRoot + 'app/'
    },
    templates: {
      source: clientRoot + '**/*.html',
      output: publicRoot + 'app/'
    },
    styles: {
      source: clientRoot + '**/*.css',
      output: publicRoot + 'styles/'
    }
  },
  server: {
    root: serverRoot,
    source: serverRoot + '**/*.js'
  },
  doc:'./doc',
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
