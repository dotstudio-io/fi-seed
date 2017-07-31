'use strict';

const debug = require('debug')('app:database');
const mongoose = require('mongoose');

const PACKAGE = require(__basedir + '/package.json');
const TESTING = process.env.NODE_ENV == 'testing';
const SERVER = 'localhost';
const DB = PACKAGE.name + (TESTING ? '-test' : '');

const USERNAME = null;
const PASSWORD = null;

var options = {
  useMongoClient: true
};

/* Set default mongoose promise */
mongoose.Promise = Promise;

module.exports = () => {

  var connectUri = 'mongodb://';

  if (USERNAME && PASSWORD) {
    connectUri += `${ USERNAME }:${ PASSWORD }@`;
  }

  connectUri += `${ SERVER }/${ DB }`;

  return mongoose.connect(connectUri, options)

    .then(() => {
      debug('Mongoose successfuly connected to [%s]', DB);
    })

    .catch(err => {
      debug(err);
      panic('Couldn\'t connect to database [%s]!', DB);
    });

};