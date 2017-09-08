'use strict';

const path = require('path');

module.exports = {

  basedir: path.join(__serverdir, 'consts'),

  debug: require('debug')('app:consts')

};
