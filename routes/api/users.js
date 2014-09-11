/*jslint node: true */
/*global schema */
'use strict';

var express = require('express');
var router = express.Router();

var User = schema('user');

/* Create a new user */
router.post('/signup', function (req, res) {

    var user = new User({
        name: req.param('name'),
        email: req.param('email'),
        password: req.param('password')
    });

    user.save(function (err, user) {
        if (err) {
            res.send(err);
            console.error(err);
        } else {
            res.send(user);
        }
    });

});

module.exports = router;
