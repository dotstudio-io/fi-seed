/*jslint node: true, regexp: true */
'use strict';

var express = require('express');
var router = express.Router();

/**
 * This is the root URI.
 */
router.get('/', function (req, res) {

    res.render('index', {
        title: "fi-mean"
    });

});

/**
 * Provide any route that doesn't match /api/... or /templates/... with the default view.
 * 
 * You must configure the rest of the public routes in Angular.
 */
router.get(/^\/(?:(?!api|templates)[^\/])+\/?.*/gi, function (req, res) {

    res.render('index', {
        title: "fi-mean"
    });

});

module.exports = router;