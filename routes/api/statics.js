/*jslint node: true */
/*global schema, when */
'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var util = require('util');

router.get(['/'], function (req, res, next) {

    var statics = req.param('statics'),
        filter = req.param('filter'),
        limit = req.param('limit'),
        query = {},
        results = {},
        model = null,
        regexp;

    function isComplete(index, length) {
        if ((index + 1) === length) {
            if (Object.keys(results).length) {
                res.send(results);
            } else {
                res.status(400).end();
            }
        }
    }

    /* Select by names query params if present */
    if (statics && typeof statics === 'string') {
        statics = [statics];
    } else if (!statics || !Array.isArray(statics)) {
        res.status(400).end();
        return;
    }

    /* Filter by filter query param if present */
    if (filter && typeof filter === 'string') {
        regexp = new RegExp('.*' + filter + '.*', 'gi');

        query.$or = [{
            name: regexp
        }, {
            value: regexp
        }];
    }

    /* Find all requested statics */
    statics.forEach(function (name, index, array) {
        model = schema('statics.' + name);

        if (model) {
            var q = model.find(query);

            /* Set a limit if present */
            if (limit && !isNaN(limit)) {
                q.limit(limit);
            }

            q.exec(function (err, data) {
                if (err) {
                    next(err);
                } else if (data) {
                    results[name] = data;

                    isComplete(index, array.length);
                } else {
                    res.status(400).end();
                }
            });
        } else {
            isComplete(index, array.length);
        }
    });

});

module.exports = router;
