/*jshint node: true */
'use strict';

var router = require('express').Router();
var path = require('path');

/**
 * Provide any route that doesn't matches /api/* or /templates/* with the default view.
 * 
 * You must configure the rest of the public routes in Angular. User /api/* for CRUD operations and /templates/* for the views.
 */
router.get(['/', /^\/(?!api)+\/?.*/gi], function (req, res) {

    /* Set the XSRF token cookie on first request */
    res.cookie('XSRF-TOKEN', res.locals._csrf);

    /* Render the default public layout */
    res.render('index', {
        title: "Final MEAN structure"
    });

});

module.exports = router;
