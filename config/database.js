/*jslint node: true */
'use strict';

var mongoose = require('mongoose');
var dbname = require('../package.json').name; /* This will use the "name" property in your package.json. Change it to whatever you like */
var db;

mongoose.connect('mongodb://localhost/' + dbname);

db = mongoose.connection;

db.on('error', console.error.bind(console, "MongoDB connection error!"));

db.once('open', function callback() {
    console.log("MongoDB connection successful.");
});
