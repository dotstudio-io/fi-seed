/* jshint node: true */
'use strict';

var Grid = require('gridfs-stream');
var Type = require('type-of-is');

var gfs;

/**
 * Initializes the GridFS module.
 * 
 * @param db {Object} The mongo db instance.
 * @param mongo {Object} The mnative ongo driver.
 * 
 * @return {Void}
 */
function init(db, mongo) {
  gfs = new Grid(db, mongo);
}

/**
 * Save a new file.
 * 
 * @param data {Buffer} The file's data buffer.
 * @param options {Object} Any valid gridfs-stream options.
 * 
 * @retun {Stream} The file's read stream.
 */
function save(data, options) {
  var stream;

  options.mode = options.mode || 'w';
  options.filename = options.filename || 'unnamed_file';

  stream = gfs.createWriteStream(options);

  stream.write(data);
  stream.end();
  stream.destroy();

  return stream;
}

/**
 * Get a file from GridFS.
 * 
 * @param filter {String} Either an ObjectID valid string or a filename.
 * @param cb {Function} The callback function. It must accept three parameters (err, fsfile, stream).
 * 
 * @return {Void}
 */
function get(filter, cb) {
  var _id, query = {};

  /* Check for a valid callback */
  if (!Type.is(cb, Function)) {
    throw new TypeError("Must provide a callback function! Eg.: function (err, fsfile, stream) {...}");
  }

  /* Check if the filter is an ObjectID, filename or something else */
  _id = gfs.tryParseObjectId(filter);

  if (_id) {
    query._id = _id;
  } else if (Type.is(filter, String)) {
    query.filename = filter;
  } else {
    throw new TypeError("Invalid query filter value! Must be either a valid ObjectID or a filename.");
  }

  /* Fetch the file information if any */
  gfs.collection().findOne(query, function (err, fsfile) {
    if (err) {
      cb.call(this, err);
    } else if (fsfile) {
      /* Check if the file data exists */
      gfs.exist(query, function (err, found) {

        if (err) {
          cb.call(this, err);
        } else if (found) {
          /* Return the file information and the read stream */
          cb.call(this, null, fsfile, gfs.createReadStream(query));
        } else {
          cb.call(this, null, null);
        }

      });
    } else {
      cb.call(this, null, null);
    }
  });

}

module.exports = {

  init: init, /* Initialize GridFS Stream */

  save: save, /* Save a file */

  get: get /* Get a file by its id */

};
