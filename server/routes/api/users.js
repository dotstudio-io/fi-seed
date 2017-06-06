'use strict';

const CONSTS = require('fi-consts');
const bcrypt = require('bcrypt');
const is = require('fi-is');

const HTTP_CODE_UNAUTHORIZED = CONSTS.CODES.HTTP.UNAUTHORIZED;
const HTTP_CODE_NO_CONTENT = CONSTS.CODES.HTTP.NO_CONTENT;
const HTTP_CODE_CREATED = CONSTS.CODES.HTTP.CREATED;

const DELAY = 1000;

module.exports = (router, db) => {

  const User = db.model('user');

  /**
   * Creates a user.
   */
  router.post('/', (req, res, next) => {

    User.create(req.body)

      .then((user) => {
        if (!user) {
          throw new Errors.BadRequestError();
        }

        res.status(HTTP_CODE_CREATED).json(user._id);
      })

      .catch(next);

  });

  /**
   * Logs a user in.
   */
  router.post('/sign-in', (req, res, next) => {

    /* Logout any previous user */
    delete req.session.user;

    if (is.not.email(req.body.email)) {
      throw new Errors.BadRequestError();
    }

    User.findByEmail(req.body.email)

      .then((user) => {
        if (!user) {
          return next();
        }

        /* Compare the passwords */
        return bcrypt.compare(req.body.password, user.password).then((matches) => {
          if (!matches) {
            return next();
          }

          req.session.user = user.toObject();

          res.send(user);
        });
      })

      .catch(next);

  }, (req, res) => {

    /* Respond unauthorized with a delay on wrong username or password */
    setTimeout(() => {
      res.sendStatus(HTTP_CODE_UNAUTHORIZED);
    }, DELAY);

  });

  /**
   * Logs a user out.
   */
  router.post('/sign-out', (req, res) => {

    delete req.session.user;

    res.sendStatus(HTTP_CODE_NO_CONTENT);

  });

};