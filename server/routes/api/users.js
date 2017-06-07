'use strict';

const CONSTS = require('fi-consts');
const errors = require('fi-errors');
const bcrypt = require('bcrypt');
const is = require('fi-is');

const MONGO_CODE_DUPLICATED = CONSTS.CODES.MONGO.DUPLICATED;
const HTTP_CODE_NO_CONTENT = CONSTS.CODES.HTTP.NO_CONTENT;
const HTTP_CODE_CREATED = CONSTS.CODES.HTTP.CREATED;

const DELAY = 1000;

const {

  BadRequestError,
  UnauthorizedError,
  MongoDuplicatedError

} = errors.list();

module.exports = (router, db) => {

  const User = db.model('user');

  /**
   * Creates a user.
   */
  router.post('/', (req, res, next) => {

    User.create(req.body)

      .then((user) => {
        if (!user) {
          throw new BadRequestError();
        }

        res.status(HTTP_CODE_CREATED).json(user._id);
      })

      .catch((err) => {
       /* Check for duplicated entry */
        if (err.code && err.code === MONGO_CODE_DUPLICATED) {
          return next(new MongoDuplicatedError());
        }

        next(err);

      });

  });

  /**
   * Logs a user in. 
   */
  router.post('/sign-in', (req, res, next) => {

    /* Logout any previous user */
    delete req.session.user;

    if (is.not.email(req.body.email)) {
      throw new BadRequestError();
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

  }, () => {

    /* Respond unauthorized with a delay on wrong username or password */
    setTimeout(() => {
      throw new UnauthorizedError();
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