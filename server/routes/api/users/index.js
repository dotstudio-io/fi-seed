'use strict';

const CONSTS = require('fi-consts');
const errors = require('fi-errors');
const is = require('fi-is');

const HTTP_CODE_CREATED = CONSTS.CODES.HTTP.CREATED;

const {
  NoContentStatus,
  BadRequestError
} = errors;

module.exports = (router, db) => {

  const User = db.model('user');

  /**
   * @api {POST} /user Creates a User (sign up).
   * @apiName PostUser
   * @apiGroup User
   *
   * @apiSuccess (201) {String} id The created user's ID.
   * @apiError (400) {String} empty No user created.
   */
  router.post('/', (req, res, next) => {

    User.create(req.body)

      .then((user) => {
        if (is.empty(user)) {
          throw new BadRequestError();
        }

        res.status(HTTP_CODE_CREATED).json(user._id);
      })

      .catch(next);

  });

  /**
   * @api {PUT} /user Updates a User (sign up).
   * @apiName PostUser
   * @apiGroup User
   *
   * @apiSuccess (201) {String} empty The user has been updated.
   * @apiError (400) {String} empty No user updated.
   */
  router.post('/', (req, _res, next) => {

    const conditions = {
      _id: req.body._id
    };

    const doc = {
      $set: {
        gender: req.body.gender,
        email: req.body.email,
        roles: req.body.roles,
        name: req.body.name
      }
    };

    User.update(conditions, doc)

      .then((raw) => {
        if (raw.nModified < 1) {
          throw new BadRequestError();
        }

        throw new NoContentStatus();
      })

      .catch(next);

  });

};
