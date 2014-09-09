/*jslint node: true */
/*global schema */
'use strict';

var express = require('express');
var router = express.Router();

var User = schema('user');

/* GET home page. */
router.get('/signup', function (req, res) {

    res.render('templates/users/signup');

});

module.exports = router;