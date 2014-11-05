/*jslint node: true */
'use strict';

var mongoose = require('mongoose');
var dbname = require('../package.json').name; /* This will use the "name" property in your package.json as the database name. Change it to whatever you like */
var gridfs = require('gridfs-stream');
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
        /* Create gridfs instance */
        mongoose.gridfs = gridfs(mongoose.connection.db, mongoose.mongo);

        console.log("\x1b[1mMongoDB successfuly connected to \x1b[36m%s\x1b[0m\n", dbname);

        cb.call(this);
    });
};
