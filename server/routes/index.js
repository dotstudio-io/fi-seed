'use strict';

const PAGES_MAIN = 'pages/main';

module.exports = (router) => {

  /* We don't want to serve these files on development */
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  /**
   * @api {GET} / Loads default app view for front-end views.
   * @apiName GetApp
   * @apiGroup App
   *
   * @apiSuccess (200) {String} html App base template.
   */
  router.get(/(?!\/api|\/static)\/?.*/, (req, res) => {

    /* Render the base layout */
    res.render(PAGES_MAIN, {
      host: `${ req.protocol }://${ req.get('host') }`
    });

  });

};
