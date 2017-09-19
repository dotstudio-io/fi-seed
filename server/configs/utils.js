'use strict';

const path = require('path');

module.exports = {

  basedir: path.resolve(path.join(__dirname, '..', '..')),

  serverdir: path.resolve(__dirname, '..'),

  debug: require('debug')('app:fi')

};
