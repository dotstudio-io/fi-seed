'use strict';

const debug = require('debug');
const path = require('path');

module.exports = {

  basedir: path.normalize(path.join(__serverdir, 'schemas')),

  debug: debug('app:schemas')

};
