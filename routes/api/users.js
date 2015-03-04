/* jshint node: true */
'use strict';

var bcrypt = require('bcrypt');

module.exports = function (router, mongoose) {

  var User = mongoose.model('user');

  /**
   * Create a user.
   */
  router.post('/', function (req, res, next) {

    new User({
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      password: req.body.password
    }).save(function (err, user) {
      if (err) {
        /* Check for duplicated entry */
        if (err.code && err.code === 11000) {
          res.status(409).end();
        } else if (err.name && err.name === 'ValidationError') {
          res.status(400).end();
        } else {
          next(err);
        }
      } else {
        req.session.user = user;
        res.send(user);
      }
    });

  });

  /**
   * Log a user in.
   */
  router.post('/signin', function (req, res, next) {

    var email = req.body.email,
        password = req.body.password;

    /* Logout any previous user */
    delete req.session.user;
    delete req.session.workplace;

    /* Find the user by its email address */
    User.findOne()
      .where('email', email)
      .exec(function (err, user) {
      if (err) {
        next(err);
      } else if (user && bcrypt.compareSync(password, user.password)) { /* Check if there's a user and compare the passwords */
        req.session.user = user;

        res.send({
          _id: req.session.user._id,
          name: req.session.user.name
        });
      } else {
        setTimeout(function () {
          res.status(401).end();
        }, 1000);
      }
    });

  });

  /**
   * Logs a user out.
   */
  router.get('/signout', function (req, res, next) {

    delete req.session.user;

    res.end();

  });

  /**
   * Recover a user's password.
   */
  router.post('/recover', function (req, res, next) {

    /* Find the user by its email address, if any */
    User.findOne()
      .where('email', req.body.email)
      .exec(function (err, user) {
      if (err) {
        next(err);
      } else if (user) {
        /* TODO: Actually recover the user's password */
        res.end();
      } else {
        res.status(400).end();
      }
    });

  });

};
