/* jshint node: true */
/* global component */
'use strict';

var path = require('path');
var util = require('util');
var fs = require('fs');

var fileman = component('fileman');
var gridfs = component('gridfs');

module.exports = function (router, mongoose) {

  var FsFile = mongoose.model('fs.file');

  /**
   * Obtain a file.
   */
  router.get('/:id/:name', function (req, res, next) {

    /* Get the file from GridFS */
    gridfs.get(req.params.id, function (err, fsfile, stream) {

      if (err) {
        next(err);
      } else if (fsfile) {
        res.set('Content-Type', fsfile.contentType);
        stream.pipe(res);
      } else {
        res.status(404).end();
      }

    });

  });

  /**
   * Upload a file.
   */
  router.post('/', function (req, res, next) {

    var file, result,
        curr = 0;

    function validated(err, file) {
      curr += 1;

      if (err) {
        next(err);
      } else {
        var stream = gridfs.save(file.data, {
          content_type: file.mimetype,
          filename: file.filename
        });

        stream.on('close', function (sfile) {
          if (curr === req.files.length) {
            res.end();
          }
        });

        stream.on('error', function (err) {
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

};