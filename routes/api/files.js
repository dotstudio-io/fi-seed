/*jshint node: true */
/*global component */
'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
var util = require('util');
var gridfs = mongoose.gridfs;

var fileman = component('fileman');

/**
 * Obtain a file.
 */
router.get('/:id', function (req, res, next) {

    gridfs.exist({
        _id: req.param('id')
    }, function (err, found) {
        if (err) {
            next(err);
        } else if (found) {
            var readstream = gridfs.createReadStream({
                _id: req.param('id')
            });

            readstream.pipe(res);
        } else {
            next({status: 404});
        }
    });

});

/**
 * Upload a file.
 */
router.post('/', function (req, res, next) {

    var file, result, curr = 0;

    function validated(err, file) {
        curr += 1;

        if (err) {
            next(err);
        } else {
            var writestream = gridfs.createWriteStream({
                mode: 'w',
                content_type: file.mimetype,
                filename: file.filename
            });

            writestream.write(file.data);
            writestream.end();
            writestream.destroy();

            writestream.on('close', function (sfile) {
                console.log("Saved file:", sfile);

                res.write(util.format('<p><a href="/api/files/%s" target="_blank">%s</a></p>', sfile._id, sfile.filename));

                if (curr === req.files.length) {
                    res.end();
                }
            });

            writestream.on('error', function (err) {
                next(err);
            });
        }
    }

    if (req.files.length) {
        req.files.forEach(function (file) {
            result = fileman.validate(file, validated);
        });
    } else {
        res.status(400).end();
    }

});

module.exports = router;
