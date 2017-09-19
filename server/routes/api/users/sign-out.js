'use strict';

const CONSTS = require('fi-consts');

const HTTP_CODE_NO_CONTENT = CONSTS.CODES.HTTP.NO_CONTENT;

module.exports = (router) => {

  /**
   * @api {POST} /user Signs a User out.
   * @apiName PostUserSignOut
   * @apiGroup User
   *
   * @apiSuccess (204) {String} empty The session user has been removed.
   */
  router.post('/', (req, res) => {

    delete req.session.user;

    res.sendStatus(HTTP_CODE_NO_CONTENT);

  });

};
