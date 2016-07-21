'use strict';

const debug = require('debug');
const path = require('path');

module.exports = {

  basedir: path.join(__serverdir, 'consts'),

  debug: debug('app:consts')

};
