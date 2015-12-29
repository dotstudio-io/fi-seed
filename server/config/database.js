'use strict';

const debug = require('debug')('app:database');
const mongoose = require('mongoose');

/* This will use the "name" property in your package.json as the database name. Change it to whatever you like */
const dbname = require(__basedir + '/package.json').name;

/* Optional mongoose configuration */
var options = {
  //    user: 'myUserName',
  //    pass: 'myPassword',
  //    db: {
  //      native_parser: true
  //    },
  //    server: {
  //      poolSize: 5
  //    },
  //    replset: {
  //      rs_name: 'myReplicaSetName'
  //    }
};

module.exports = function (callback) {
  mongoose.connect('mongodb://localhost/' + dbname, options);

  mongoose.connection.on('error', function (err) {
    debug(err);
    panic("Couldn't connect to database [%s]!", dbname);
  });

  mongoose.connection.once('open', function () {
    debug("Mongoose successfuly connected to [%s]", dbname);
    callback();
  });
};
