/*jslint node: true, regexp: true */
'use strict';

var express = require('express');
var router = express.Router();

/**
 * Provide any route that doesn't match /api/... or /templates/... with the default view.
 * 
 * You must configure the rest of the public routes in Angular using /api/ and /templates/.
 */
router.get([
    '/',
    /^\/(?:(?!api|templates)[^\/])+\/?.*/gi
], function (req, res) {

    res.render('index', {
        title: "Telemedicina"
    });

});

module.exports = router;
