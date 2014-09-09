/*jslint node: true */
'use strict';

var mongoose = require('mongoose');
var db;

mongoose.connect('mongodb://localhost/fi-mean');

db = mongoose.connection;

db.on('error', console.error.bind(console, "MongoDB connection error:"));

db.once('open', function callback() {
    console.log("MongoDB connection successful.");
});