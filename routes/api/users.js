/*jslint node: true */
/*global schema */
'use strict';

var router = require('express').Router();
var User = schema('user');
var bcrypt = require('bcrypt');

/**
 * Create a user up.
 */
router.post('/', function (req, res, next) {

    var user = new (schema('user'))({
        name: req.param('name'),
        email: req.param('email'),
        password: req.param('password'),
    });

    user.save(function (err, user) {
        if (err) {
            next(err);
        } else {
            User.findOne({
                email: req.param('email')
            }, function (err, data) {
                if (err) {
                    next(err);
                } else if (data) {
                    req.session.user = data;
                    res.send({
                        name: data.name,
                        email: data.email
                    });
                } else {
                    setTimeout(res.status(400).end, 1000);
                }
            });
        }
    });

});

module.exports = router;
