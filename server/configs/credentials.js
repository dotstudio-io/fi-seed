'use strict';

const path = require('path');

const ENVIRONMENT = process.env.NODE_ENV;
const FILENAME = 'credentials.json';

module.exports = {

  source: ENVIRONMENT === 'development' ? 'local' : 'S3',

  debug: require('debug')('app:credentials'),

  s3: {
    key: `path/to/${ FILENAME }`,

    apiVersion: '2006-03-01',

    bucket: 'bucket-name'
  },

  local: {
    path: path.normalize(path.join(__basedir, FILENAME))
  }

};
