'use strict';

var fs = require('fs');

var gridfs = component('gridfs');

module.exports = function (router) {

  /**
   * Obtain a file.
   */
  router.get('/:id', function (req, res, next) {

    /* Get the file from GridFS */
    gridfs.get(req.params.id, function (err, fsfile, stream) {
      if (err) {
        return next(err);
      }

      if (!fsfile) {
        return res.status(404).end();
      }

      res.set({
        'Content-Type': fsfile.contentType,
        'Content-Length': fsfile.length,
        'Cache-Control': 'max-age=31536000',
        'Last-Modified': fsfile.uploadDate,
        'ETag': fsfile.md5
      });

      stream.pipe(res);
    });

  });

  /**
   * Upload files.
   */
  router.post('/', function (req, res, next) {

    if (!req.files || !req.files.length) {
      return res.status(400).end();
    }

    var saved = [];

    req.files.forEach(function (file) {
      var options = {
        content_type: file.mimetype,
        filename: file.filename
      };

      /* Read temp file */
      var rstream = fs.createReadStream(file.path);

      /* Save file to GridFS */
      gridfs.save(rstream, options, function (err, fsfile) {
        if (err) {
          return next(err);
        }

        saved.push(fsfile);

        if (saved.length === req.files.length) {
          res.send(saved);
        }
      });
    });

  });

};
