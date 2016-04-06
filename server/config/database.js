'use strict';

const debug = require('debug')('app:database');
const mongoose = require('mongoose');

/* This will use the "name" property in your package.json as the database name */
const dbname = require(__basedir + '/package.json').name;

/* Optional mongoose configuration */
var options = {};

module.exports = (callback) => {
  mongoose.connect('mongodb://localhost/' + dbname, options);

  mongoose.connection.on('error', (err) => {
    debug(err);
    panic("Couldn't connect to database [%s]!", dbname);
  });

  mongoose.connection.once('open', () => {
    debug("Mongoose successfuly connected to [%s]", dbname);
    callback();
  });
};
