'use strict';

var bcrypt = require('bcrypt');

module.exports = function (router, mongoose) {

  var User = mongoose.model('user');

  /**
   * Creates a user.
   */
  router.post('/', function (req, res, next) {

    new User({
      password: req.body.password,
      gender: req.body.gender,
      email: req.body.email
    }).

    save(function (err, user) {
      if (err) {
        /* Check for duplicated entry */
        if (err.code && err.code === 11000) {
          return res.status(409).end();
        }

        /* Check for invalid data */
        if (err.name && err.name === 'ValidationError') {
          return res.status(400).end();
        }

        /* Unknown error */
        return next(err);
      }

      req.session.user = user;

      res.send({
        gender: req.session.user.gender,
        name: req.session.user.name,
        _id: req.session.user._id
      });
    });

  });

  /**
   * Logs a user in.
   */
  router.post('/sign-in', function (req, res, next) {

    /* Logout any previous user */
    delete req.session.user;

    User.findByEmail(req.body.email).

    exec(function (err, user) {
      if (err) {
        return next(err);
      }

      function unauthorized() {
        setTimeout(function () {
          res.status(401).end();
        }, 1000);
      }

      if (!user) {
        return unauthorized();
      }

      /* Compare the passwords */
      bcrypt.compare(req.body.password, user.password, function (err, matches) {
        if (err) {
          return next(err);
        }

        if (!matches) {
          return unauthorized();
        }

        req.session.user = user;

        res.send({
          _id: user._id,
        });
      });
    });

  });

  /**
   * Logs a user out.
   */
  router.get('/sign-out', function (req, res) {

    delete req.session.user;

    res.status(204).end();

  });

  /**
   * Recovers a user's password.
   */
  router.post('/recover', function (req, res, next) {

    User.findByEmail(req.body.email, function (err, user) {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(400).end();
      }

      res.end(); /* TODO: Actually recover the user's password */
    });

  });

};
