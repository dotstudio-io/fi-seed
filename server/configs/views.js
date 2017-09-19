'use strict';

const fi = require('fi-utils');
const path = require('path');

module.exports = {

  basedir: path.join(fi.serverdir(), 'views'),

  engine: 'pug'

};
