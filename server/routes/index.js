/* jshint node: true */
'use strict';

module.exports = function (router) {

  /**
   * Provide any route that doesn't matches /api/* or /templates/* with the default view.
   *
   * You must configure the rest of the public routes in Angular. User /api/* for CRUD operations and /templates/* for the views.
   */
  router.get('/', function (req, res) {

    /* Set the XSRF token cookie on first request */
//    res.cookie('XSRF-TOKEN', res.locals._csrf); /* The _csrf is set by lusca */

    /* Render the default public layout */
    res.render('index', {
      title: 'Fi Seed'
    });

  });

};
