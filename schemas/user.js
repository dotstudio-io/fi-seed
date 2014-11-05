/*jshint node: true */
'use strict';

var mongoose = require('mongoose');
var validator = require('validator');
var bcrypt = require('bcrypt');

var User = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            validator.isEmail,
            "Uh oh, looks like you don't know how to write an email address. Go back to your cave."
        ]
    },

    password: {
        type: String,
        required: true
    },

    updated: {
        type: Date,
        default: Date.now
    }

});

/** User's sign up date */
User.virtual('created').get(function () {
    return this._id.getTimestamp();
});

/** Hash user password before saving */
User.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.hash(user.password, 8, function (err, hash) {
            if (err) {
                next(err);
            } else {
                user.password = hash;
                next();
            }
        });
    } else {
        next();
    }

});

module.exports = mongoose.model('User', User);
