'use strict';

const bcrypt = require('bcrypt');

const CONSTS = component('consts');

const MONGO_CODE_DUPLICATED = CONSTS.CODES.MONGO.DUPLICATED;
const MONGO_ERR_VALIDATION = CONSTS.ERR.MONGO.VALIDATION;

const HTTP_CODE_UNAUTHORIZED = CONSTS.CODES.HTTP.UNAUTHORIZED;
const HTTP_CODE_BADREQUEST = CONSTS.CODES.HTTP.BADREQUEST;
const HTTP_CODE_CONFLICT = CONSTS.CODES.HTTP.CONFLICT;
const HTTP_CODE_CREATED = CONSTS.CODES.HTTP.CREATED;
const HTTP_CODE_NOBODY = CONSTS.CODES.HTTP.NOBODY;

const DELAY = 1000;

module.exports = (router, db) => {

  const User = db.model('user');

  /**
   * Creates a user.
   */
  router.post('/', (req, res, next) => {

    User.create(req.body)

    .then(() => res.sendStatus(HTTP_CODE_CREATED))

    .catch((err) => {
      /* Check for duplicated entry */
      if (err.code && err.code === MONGO_CODE_DUPLICATED) {
        return res.sendStatus(HTTP_CODE_CONFLICT);
      }

      /* Check for invalid data */
      if (err.name && err.name === MONGO_ERR_VALIDATION) {
        return res.sendStatus(HTTP_CODE_BADREQUEST);
      }

      /* Unknown error */
      return next(err);
    });

  });

  /**
   * Logs a user in.
   */
  router.post('/sign-in', (req, res, next) => {

    /* Logout any previous user */
    delete req.session.user;

    User.findByEmail(req.body.email)

    .then((user) => {
      if (!user) {
        return next();
      }

      /* Compare the passwords */
      bcrypt.compare(req.body.password, user.password, (err, matches) => {
        if (err) {
          throw err;
        }

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
    setTimeout(() => res.sendStatus(HTTP_CODE_UNAUTHORIZED), DELAY);

  });

  /**
   * Logs a user out.
   */
  router.get('/sign-out', (req, res) => {

    delete req.session.user;

    res.sendStatus(HTTP_CODE_NOBODY);

  });

};
