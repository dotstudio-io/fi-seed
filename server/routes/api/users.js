'use strict';

var bcrypt = require('bcrypt');

module.exports = (router, db) => {

  var User = db.model('user');

  /**
   * Creates a user.
   */
  router.post('/', (req, res, next) => {

    User.create(req.body)

    .then(() => res.sendStatus(201))

    .catch((err) => {
      /* Check for duplicated entry */
      if (err.code && err.code === 11000) {
        return res.sendStatus(409);
      }

      /* Check for invalid data */
      if (err.name && err.name === 'ValidationError') {
        return res.sendStatus(400);
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
    setTimeout(() => res.sendStatus(401), 1000);

  });

  /**
   * Logs a user out.
   */
  router.get('/sign-out', (req, res) => {

    delete req.session.user;

    res.sendStatus(204);

  });

};
