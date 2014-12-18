/*jslint node: true */
'use strict';

var mongoose = require('mongoose');

var Message = new mongoose.Schema({

    body: String,

    sender: mongoose.Schema.ObjectId,
    
    sic: mongoose.Schema.ObjectId,

    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('message', Message);
