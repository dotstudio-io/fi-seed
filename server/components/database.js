'use strict';

const credentials = require('fi-credentials').get('database');
const debug = require('debug')('app:database');
const mongoose = require('mongoose');
const is = require('fi-is');

mongoose.Promise = Promise; // Mongoose needs this

const dbname = credentials.db + (process.env.NODE_ENV == 'testing' ? '-test' : '');
const options = {
  useMongoClient: true
};

/**
 * Connects to the database.
 *
 * @returns {Promise} The Mongoose connection promise.
 */
module.exports = () => {

  let connectUri = 'mongodb://';

  /* Check if a username and password has been provided */
  if (is.all.string(credentials.username, credentials.password)) {
    connectUri += credentials.username + ':' +
      encodeURIComponent(credentials.password) + '@';
  }

  /* Check if connecting to a replica set or single server */
  if (is.array(credentials.hosts)) {
    connectUri += credentials.hosts.join(',');
  } else {
    connectUri += credentials.host;
  }

  connectUri += '/' + dbname;

  /* Check if connection options were provided */
  if (is.object(credentials.options)) {
    const params = [];

    connectUri += '?';

    for (let key in credentials.options) {
      params.push(encodeURIComponent(key) + '=' +
        encodeURIComponent(credentials.options[key]));
    }

    connectUri += params.join('&');
  }

  debug('Mongoose connecting to [%s]...', connectUri);

  return mongoose.connect(connectUri, options).then(() => {
    debug('Mongoose successfuly connected to [%s]', dbname);
  });

};
