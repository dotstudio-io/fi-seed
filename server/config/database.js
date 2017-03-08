'use strict';

const debug = require('debug')('app:database');
const mongoose = require('mongoose');

/* This will use the 'name' property in your package.json as the database name */
const DB = require(__basedir + '/package.json').name;
const SERVER = 'localhost';

const uri = `mongodb://${ SERVER }/${ DB }`;
const options = {
  // db: { native_parser: true },
  // server: { poolSize: 5 },
  // replset: { rs_name: 'myReplicaSetName' },
  // user: 'myUserName',
  // pass: 'myPassword'
};

module.exports = () => {
  return mongoose.connect(uri, options).then(() => {
    debug('Mongoose successfuly connected to [%s]', DB);
  }).catch((err) => {
    debug(err.stack);
    panic('Couldn\'t connect to database [%s]!', DB);
  });
};