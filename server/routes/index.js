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
    '/forbidden', '/lost', '/error',

    /* Users */
    '/users/sign-up', '/users/sign-in', '/users/sign-out'

  ], (req, res) => {

    /* Render the base layout */
    res.render(PAGES_MAIN, {
      host: `${ req.protocol }://${ req.get('host') }`
    });

  });

  /* Test error pages */
  router.get('/test/error', (req, res, next) => {

    next(new Error('Test Error Message'));

  });

};
