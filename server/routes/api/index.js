'use strict';

const CONSTS = component('consts');

const HTTP_CODE_NOBODY = CONSTS.CODES.HTTP.NOBODY;
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
      return res.sendStatus(HTTP_CODE_NOBODY);
    }

    res.send({
      gender: req.session.user.gender,
      role: req.session.user.role,
      name: req.session.user.name,
      _id: req.session.user._id
    });

  });

};
