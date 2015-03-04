/* jshint node: true */
'use strict';

var validator = require('validator');
var bcrypt = require('bcrypt');

module.exports = function (Schema) {

  var schema = new Schema({

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

    gender: {
      type: Schema.Types.ObjectId,
      ref: 'static.gender'
    },

    updated: {
      type: Date,
      default: Date.now
    }

  });

  /** Hash user's password before saving */
  schema.pre('save', function (next) {
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

  /** User's sign up date */
  schema.virtual('created').get(function () {
    return this._id.getTimestamp();
  });

  /** Show virtuals on JSON conversion */
  schema.set('toJSON', {
    virtuals: true
  });

  return schema;

};
