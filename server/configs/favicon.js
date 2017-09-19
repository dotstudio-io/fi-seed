'use strict';

const path = require('path');

module.exports = path.join(
  'client', process.env.NODE_ENV === 'development' ? '' : 'dist', 'static',
  'images', 'icons', 'favicon.ico'
);
