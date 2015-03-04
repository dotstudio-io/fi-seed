/* jshint node: true */
'use strict';

var mongoose = require('mongoose');
var dbname = require('../package.json').name; /* This will use the "name" property in your package.json as the database name. Change it to whatever you like */
var debug = require('debug')('app:database');

var options = {
  //    db: { native_parser: true },
  //    server: { poolSize: 5 },
  //    replset: { rs_name: 'myReplicaSetName' },
  //    user: 'myUserName',
  //    pass: 'myPassword'
};

module.exports = function (cb) {
  mongoose.connect('mongodb://localhost/' + dbname, options);

  mongoose.connection.on('error', function (err) {
    console.error("MongoDB connection error!", err);
    cb.call(this, err);
  });

  mongoose.connection.once('open', function () {
    debug("MongoDB successfuly connected to \"%s\"", dbname);
    cb.call(this);
  });
};
