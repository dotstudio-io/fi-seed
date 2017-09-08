'use strict';

const mongoose = require('mongoose');
const path = require('path');

module.exports = {

  basedir: path.join(__serverdir, 'routes'),

  debug: require('debug')('app:routes'),

  arguments: [mongoose]

};
