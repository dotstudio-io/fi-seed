'use strict';

var mongoose = require('mongoose');
var debug = require('debug')('app:database');
/* This will use the "name" property in your package.json as the database name. Change it to whatever you like */
var dbname = require(__appdir + '/package.json').name;

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
    debug(err);
    panic("Couldn't connect to the database");
  });

  mongoose.connection.once('open', function () {
    debug("MongoDB successfuly connected to [%s]", dbname);
    cb();
  });
};
