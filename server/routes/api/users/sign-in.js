'use strict';

const randomInt = require('random-int');
const errors = require('fi-errors');
const bcrypt = require('bcrypt');
const is = require('fi-is');

const DELAY_MAX = 1437;
const DELAY_MIN = 861;

const {
  UnauthorizedError,
  BadRequestError
} = errors;

module.exports = (router, db) => {

  const User = db.model('user');

  /**
   * @api {POST} /user Signs a User in.
   * @apiName PostUserSignIn
   * @apiGroup User
   *
   * @apiSuccess (201) {String} id The created user's ID.
   * @apiError (400) {String} empty No user created.
   */
  router.post('/', (req, res, next) => {

    /* Remove any session User */
    delete req.session.user;

    if (is.not.email(req.body.email)) {
      throw new BadRequestError();
    }

    User.findByEmail(req.body.email)

      .then(user => {
        if (is.empty(user)) {
          return next();
        }

        /* Validate password */
        return bcrypt.compare(req.body.password, user.password)

          .then(matches => {
            if (matches) {
              req.session.user = user.toObject();

              return res.send(user);
            }

            next();
          });
      })

      .catch(next);

  }, (_req, _res, next) => {

    /* Respond unauthorized with a delay on wrong credentials */
    setTimeout(next, randomInt(DELAY_MIN, DELAY_MAX));

  }, () => {

    throw new UnauthorizedError();

  });

};
