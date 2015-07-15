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

    role: {
      type: Schema.Types.ObjectId,
      ref: 'static.role'
    },

    created: {
      type: Date,
      default: Date.now
    },

    updated: {
      type: Date,
      default: Date.now
    }

  });

  /**
   * Hash user's password before saving.
   */
  schema.pre('save', function (next) {
    var user = this;

    /* Update 'updated' field */
    if (user.isModified()) {
      user.updated = Date.now();
    }

    /* Hash password if changed */
    if (user.isModified('password')) {
      bcrypt.hash(user.password, 8, function (err, hash) {
        if (err) {
          return next(err);
        }

        user.password = hash;

        next();
      });
    } else {
      next();
    }
  });

  /**
   * Find a user by it's email.
   */
  schema.static('findByEmail', function (email, done) {
    var query = this.model('user').findOne();

    query.where('email').equals(email);

    if (!done) {
      return query;
    }

    if (typeof done === 'function') {
      return query.exec(done);
    }

    throw new TypeError('Callback must be empty or a function!');
  });

  return schema;

};
