'use strict';

const path = require('path');

module.exports = {

  route: '/static',

  basedir: path.join(
    'client', process.env.NODE_ENV === 'development' ? '' : 'dist', 'static'
  )

};
