'use strict';

var path = require('path');

module.exports = {

  debug: require('debug')('app:routes'),

  basedir: path.join(__serverdir, 'routes'),

  arguments: [
    require('mongoose')
  ]

};
