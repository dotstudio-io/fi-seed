'use strict';

const PAGES_MAIN = 'pages/main';

module.exports = (router) => {

  /**
   * Define all public routes here.
   */
  router.get([
    /* Pages */
    '/', '/theme',

    /* Error routes */
    '/lost', '/error',

    /* Users */
    '/users/sign-up', '/users/sign-in', '/users/sign-out'

  ], (req, res) => {

    /* Render the base layout */
    res.render(PAGES_MAIN, {
      host: req.headers.origin
    });

  });

};
