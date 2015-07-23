'use strict';

var fs = require('fs');

var gridfs = component('gridfs');

module.exports = function (router) {

  /**
   * Obtain a file.
   */
  router.get('/:id', function (req, res, next) {

    /* Get the file from GridFS */
    gridfs.read(req.params.id, function (err, fsfile, rs) {
      if (err) {
        return next(err);
      }

      if (!fsfile) {
        return res.status(404).end();
      }

      /**
       * Since files have a unique MD5 hash they should be cached for a long time,
       * in this case, a full year.
       */
      res.set({
        'Content-Type': fsfile.contentType,
        'Content-Length': fsfile.length,
        'Cache-Control': 'max-age=31536000',
        'Last-Modified': fsfile.uploadDate,
        'ETag': fsfile.md5
      });

      rs.pipe(res);
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
      gridfs.write(rstream, options, function (err, fsfile) {
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
