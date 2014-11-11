/*jslint node: true */
/*global schema */
'use strict';

var router = require('express').Router();
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

var User = mongoose.model('user');

/**
 * Create a user up.
 */
router.post('/', function (req, res, next) {

    new User({
        name: req.param('name'),
        email: req.param('email'),
        password: req.param('password'),
        specialty: req.param('specialty')
    }).save(function (err, user) {
        if (err) {
            /* Check for duplicated entry */
            if (err.code && err.code === 11000) {
                res.status(409).end();
            } else {
                next(err);
            }
        } else {
            res.status(204).end();
        }
    });

});

module.exports = router;
