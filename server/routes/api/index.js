'use strict';

const CONSTS = require('fi-consts');

const HTTP_CODE_NO_BODY = CONSTS.CODES.HTTP.NO_BODY;
const HTTP_CODE_OK = CONSTS.CODES.HTTP.OK;

module.exports = (router) => {

  /**
   * Provides a health check route (mainly for AWS).
   */
  router.get('/health', (req, res) => {

    /* TODO: Perform health checks here... */

    res.sendStatus(HTTP_CODE_OK);

  });

  /**
   * Get current session's visible data.
   */
  router.get('/session', (req, res) => {

    /* Check if there's a user in session */
    if (!req.session.user) {
      return res.sendStatus(HTTP_CODE_NO_BODY);
    }

    res.send({
      gender: req.session.user.gender,
      name: req.session.user.name,
      role: req.session.user.role,
      _id: req.session.user._id
    });

  });

};
