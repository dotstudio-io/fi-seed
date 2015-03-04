/* jshint node: true */
'use strict';

var Busboy = require('busboy');

module.exports = function (options) {

  return function (req, res, next) {
    var busboy;

    if (req.method === 'POST' && req.is('multipart')) {
      busboy = new Busboy({
        headers: req.headers
      });

      req.body = {};
      req.files = [];

      busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        var parts = [];

        file.on('data', function (data) {
          parts.push(data);
        });

        file.on('end', function () {
          req.files.push({
            data: Buffer.concat(parts),
            fieldname: fieldname,
            filename: filename,
            encoding: encoding,
            mimetype: mimetype
          });
        });
      });

      busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated) {
        req.body[fieldname] = val;
      });

      busboy.on('finish', function () {
        next();
      });

      req.pipe(busboy);
    } else {
      next();
    }
  };

};
