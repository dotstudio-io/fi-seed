'use strict';

const schemas = require('fi-schemas');
const bcrypt = require('bcrypt');

const HASH_ROUNDS = 8;

const PASSWORD = 'password';
const EMAIL = 'email';
const USER = 'user';

module.exports = (Schema, options) => {

  const schema = new Schema(schemas.partial('user'), options);

  /**
   * Hashes user's password before saving.
   *
   * @param {Function} next Mongoose next middleware callback.
   *
   * @returns {void}
   */
  function preSavePassword(next) {
    if (!this.isModified(PASSWORD)) {
      return next();
    }

    return bcrypt.hash(this.password, HASH_ROUNDS)

      .then((hash) => {
        this.password = hash;
        next();
      })

      .catch(next);
  }

  /**
   * Hashes user's password before updating.
   *
   * @param {Function} next Mongoose next middleware callback.
   *
   * @returns {void}
   */
  function preUpdatePassword(next) {
    const update = this._update;

    if (!update.$set || !update.$set.password) {
      return next();
    }

    return bcrypt.hash(update.$set.password, HASH_ROUNDS)

      .then((hash) => {
        this.update({}, {
          password: hash
        });

        next();
      })

      .catch(next);
  }

  /**
   * Creates a find User by email query promise.
   *
   * @param {String} email The email to filter by.
   *
   * @returns {Promise} The find promise.
   */
  function findByEmail(email) {
    return this.model(USER).findOne()
      .where(EMAIL).equals(email);
  }

  schema.pre('findOneAndUpdate', preUpdatePassword);
  schema.pre('update', preUpdatePassword);
  schema.pre('save', preSavePassword);

  schema.static('findByEmail', findByEmail);

  return schema;

};
