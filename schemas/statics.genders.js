/*jshint node: true */
'use strict';

var mongoose = require('mongoose');

var StaticsGenders = new mongoose.Schema({
    name: String,
    value: String
});

module.exports = mongoose.model('Statics.Genders', StaticsGenders);
