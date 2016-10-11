'use strict';

const CONSTS = require('fi-consts');

const bcrypt = require('bcrypt');
const is = require('fi-is');

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

  const schema = new Schema({

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      validate: (val) => is.email(val)
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
  function preSave(next) {
    if (!this.isModified(PASSWORD)) {
      next();
    }

    bcrypt.hash(this.password, HASH_ROUNDS, (err, hash) => {
      if (err) {
        return next(err);
      }

      this.password = hash;

      next();
    });
  }

  /**
   * Hash user's password before updating.
   */
  function preUpdate(next) {
    var update = this._update;

    if (!update.$set || !update.$set.password) {
      next();
    }

    bcrypt.hash(update.$set.password, HASH_ROUNDS, (err, hash) => {
      if (err) {
        return next(err);
      }

      this.update({}, {
        password: hash
      });

      next();
    });
  }

  /**
   * Find a user by it's email (Promised).
   *
   * @param {String} email The email to filter by.
   *
   * @return {Promise}
   */
  function findByEmail(email) {
    return this.model(USER).findOne()
      .where(EMAIL).equals(email);
  }

  schema.pre('findOneAndUpdate', preUpdate);
  schema.pre('update', preUpdate);
  schema.pre('save', preSave);

  schema.static('findByEmail', findByEmail);

  return schema;

};
