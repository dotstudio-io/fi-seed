/*jslint node: true */
'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function (req, res) {

    res.render('templates/pages/home', {
        title: 'Final\'s MEAN skeleton application'
    });

});

module.exports = router;