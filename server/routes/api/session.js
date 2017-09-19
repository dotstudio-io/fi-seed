'use strict';

const errors = require('fi-errors');
const is = require('fi-is');

const {
  PreconditionFailedError,
  InternalServerError,
  NoContentStatus,
  BadRequestError
} = errors;

const USER_SELECT = '_id firstname lastname gender roles';
const ID = '_id';

module.exports = (router, db) => {

  const User = db.model('user');

  /**
   * @api {GET} /session Obtains current session's client data.
   * @apiName GetSession
   * @apiGroup Session
   *
   * @apiSuccess (200) {Object} empty Session found.
   * @apiSuccess (204) {String} empty No session.
   */
  router.get('/', (req, res) => {

    if (is.empty(req.session)) {
      throw new InternalServerError('No session available!');
    }

    if (is.empty(req.session.user)) {
      throw new NoContentStatus();
    }

    res.send({
      gender: req.session.user.gender,
      roles: req.session.user.roles,
      name: req.session.user.name,
      _id: req.session.user._id
    });

  });

  /**
   * @api {PUT} /session Refreshes current session client's data.
   * @apiName PutSession
   * @apiGroup Session
   *
   * @apiSuccess (204) {} Success Session refreshed.
   * @apiError (412) {} Error No session available.
   * @apiError (400) {} Error No user data found.
   */
  router.put('/', (req, _res, next) => {

    if (is.empty(req.session)) {
      throw new InternalServerError('No session available!');
    }

    if (is.empty(req.session.user)) {
      throw new PreconditionFailedError();
    }

    User.findOne()
      .where(ID).equals(req.session.user._id)
      .select(USER_SELECT)

      .then((user) => {
        if (is.empty(user)) {
          throw new BadRequestError();
        }

        req.session.user = user.toObject();

        throw new NoContentStatus();
      })

      .catch(next);

  });

};
