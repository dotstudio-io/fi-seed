'use strict';

const CONSTS = require('fi-consts');

const HTTP_CODE_NO_CONTENT = CONSTS.CODES.HTTP.NO_CONTENT;

module.exports = (router) => {

  /**
   * Get current session's visible data.
   */
  router.get('/session', (req, res) => {

    /* Check if there's a user in session */
    if (!req.session.user) {
      return res.sendStatus(HTTP_CODE_NO_CONTENT);
    }

    res.send({
      gender: req.session.user.gender,
      roles: req.session.user.roles,
      name: req.session.user.name,
      _id: req.session.user._id
    });

  });

};
