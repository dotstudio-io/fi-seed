'use strict';

const mongoose = require('mongoose');
const path = require('path');

module.exports = {

  debug: require('debug')('app:routes'),

  basedir: path.join(__serverdir, 'routes'),

  arguments: [
    mongoose
  ]

};
