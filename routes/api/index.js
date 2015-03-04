/* jshint node: true */
/* global schema */
'use strict';

module.exports = function (router, mongoose) {

  /**
   * Get current session's public data.
   */
  router.get('/session', function (req, res, next) {

    /* Check if there's a user in session */
    if (req.session.user) {
      res.send({
        user: {
          _id: req.session.user._id,
          name: req.session.user.name
        }
      });
    } else {
      res.status(401).end();
    }

  });

};
