'use strict';

const mongoose = require('mongoose');
const fi = require('fi-utils');
const path = require('path');

module.exports = {

  basedir: path.join(fi.serverdir(), 'routes'),

  debug: require('debug')('app:routes'),

  arguments: [mongoose]

};
