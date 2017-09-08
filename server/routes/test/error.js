'use strict';

module.exports = router => {

  /**
   * @api {GET} /test/error Test the error page.
   * @apiName GetTestError
   * @apiGroup App
   */
  router.get('/', (_req, _res, next) => {

    next(new Error('Test Error Message'));

  });

};
