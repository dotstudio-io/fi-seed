'use strict';

const validator = require('validator');
const CONSTS = require('fi-consts');
const bcrypt = require('bcrypt');

/* Genders */
const GENDER_FEMALE = CONSTS.GENDERS.FEMALE;
const GENDER_MALE = CONSTS.GENDERS.MALE;

/* Roles */
const ROLE_ADMIN = CONSTS.ROLES.ADMIN;
const ROLE_USER = CONSTS.ROLES.USER;

/* Password hashing rounds */
const HASH_ROUNDS = 8;

const PASSWORD = 'password';
const EMAIL = 'email';
const USER = 'user';

module.exports = (Schema) => {

  var schema = new Schema({

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      validate: (val) => validator.isEmail(val)
    },

    password: {
      type: String,
      required: true
    },

    gender: {
      type: String,
      enum: [
        GENDER_FEMALE, GENDER_MALE
      ]
    },

    role: {
      type: String,
      default: ROLE_USER,
      required: true,
      enum: [
        ROLE_ADMIN, ROLE_USER
      ]
    }

  }, {

    timestamps: true

  });

  /**
   * Hash user's password before saving.
   */
  schema.pre('save', function (next) {
    var user = this;

    /* Hash password if changed */
    if (user.isModified(PASSWORD)) {
      return bcrypt.hash(user.password, HASH_ROUNDS, (err, hash) => {
        if (err) {
          return next(err);
        }

        user.password = hash;

        next();
      });
    }

    next();
  });

  /**
   * Find a user by it's email (Promised).
   */
  schema.static('findByEmail', function (email) {
    return this.model(USER).findOne()
      .where(EMAIL).equals(email);
  });

  return schema;

};
