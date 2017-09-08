'use strict';

const PAGES_MAIN = 'pages/main';

module.exports = router => {

  /**
   * @api {GET} / Loads default app view for front-end views.
   * @apiName GetApp
   * @apiGroup App
   *
   * @apiSuccess (200) {String} html App base template.
   */
  router.get([
    /* Pages */
    '/', '/theme',

    /* Error routes */
    '/forbidden', '/lost', '/error',

    /* Users */
    '/users/sign-up', '/users/sign-in', '/users/sign-out'

  ], (req, res) => {

    /* Render the base layout */
    res.render(PAGES_MAIN, {
      host: `${ req.protocol }://${ req.get('host') }`
    });

  });

};
