'use strict';

const debug = require('debug')('app:database');
const mongoose = require('mongoose');

/* This will use the 'name' property in your package.json as the database name */
const DBNAME = require(__basedir + '/package.json').name;
const HOST = 'localhost';

/* Optional mongoose configuration */
var options = {};

module.exports = (next) => {
  const db = mongoose.connect('mongodb://' + HOST + '/' + DBNAME, options).connection;

  db.once('open', () => {
    debug('Mongoose successfuly connected to [%s]', DBNAME);
    next();
  });

  db.on('error', (err) => {
    debug(err);
    panic('Couldn\'t connect to database [%s]!', DBNAME);
  });
};
