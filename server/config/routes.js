'use strict';

const mongoose = require('mongoose');
const debug = require('debug');
const path = require('path');

module.exports = {

  debug: debug('app:routes'),

  basedir: path.join(__serverdir, 'routes'),

  arguments: [
    mongoose
  ]

};
