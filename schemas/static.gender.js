/* jshint node: true */
'use strict';

var mongoose = require('mongoose');

var StaticGender = new mongoose.Schema({
    name: String,
    value: Number
});

module.exports = mongoose.model('static.gender', StaticGender);
