/*jslint node: true, nomen: true */
/*global schema */
'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var User = schema('user');

/**
 * Get current session's public data.
 */
router.get('/session', function (req, res, next) {

    /* Check if there's a user in session */
    if (req.session.user && req.session.workplace) {
        var data = {
            user: {
                _id: req.session.user._id,
                name: req.session.user.name
            },
            
            workplace: {
                _id: req.session.workplace._id,
                name: req.session.workplace.name
            }
        };
        
        res.send(data);
    } else {
        res.status(401).end();
    }

});

/**
 * Log a user in.
 */
router.post('/login', function (req, res, next) {

    var email = req.param('email'),
        password = req.param('password'),
        bcrypt = require('bcrypt');

    /* Find the user by its email address */
    User.findOne({
        email: email
    }, function (err, user) {
        if (err) {
            next(err);
        } else if (user) {
            /* Compare the passwords */
            bcrypt.compare(password, user.password, function (err, equals) {
                if (err) {
                    next(err);
                } else if (equals) {
                    req.session.user = user;

                    res.send({
                        _id: req.session.user._id,
                        name: req.session.user.name
                    });
                } else {
                    setTimeout(res.status(401).end, 1000);
                }
            });
        } else {
            setTimeout(res.status(401).end, 1000);
        }
    });
});

/**
 * Log a user out.
 */
router.get('/logout', function (req, res, next) {

    delete req.session.user;
    delete req.session.workplace;
    
    res.end();

});

/**
 * Recover a user's password.
 */
router.post('/recover', function (req, res, next) {

    /* Find the user by its email address, if any */
    User.findOne({
        email: req.param('email')
    }, function (err, user) {
        if (err) {
            next(err);
        } else if (user) {
            /* TODO: Actually recover the user's password */
            res.end();
        } else {
            res.status(404).end();
        }
    });

});

module.exports = router;
