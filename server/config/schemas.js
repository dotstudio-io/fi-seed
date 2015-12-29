'use strict';

var path = require('path');

module.exports = {

  basedir: path.normalize(path.join(__serverdir, 'schemas')),

  debug: require('debug')('app:schemas')

};
