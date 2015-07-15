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
* @param data {Stream} The input read stream.
* @param options {Object} Any valid gridfs-stream options.
*
* @retun {Stream} The file's read stream.
*/
function save(rstream, options, cb) {
  options.mode = options.mode || 'w';
  options.filename = options.filename || 'unnamed_file';

  var wstream = gfs.createWriteStream(options);

  rstream.pipe(wstream);

  wstream.on('close', function(fsfile) {
    cb(null, fsfile);
  });

  wstream.on('error', function(err) {
    cb(err);
  });
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
  gfs.collection().findOne(query, function(err, fsfile) {
    if (err) {
      return cb(err);
    }

    if (!fsfile) {
      return cb(null, null);
    }

    /* Check if the file data exists */
    gfs.exist(query, function(err, found) {
      if (err) {
        return cb(err);
      }

      if (!found) {
        return cb(null, null);
      }

      /* Return the file information and the read stream */
      cb(null, fsfile, gfs.createReadStream(query));
    });
  });

}

module.exports = {

  /* Initialize GridFS Stream */
  init: init,

  /* Save a file */
  save: save,

  /* Get a file by its id */
  get: get,

  /* Remove a file */
  remove: function (options, cb) {
    if (!gfs) {
      throw new Error("GridFS is not initialized!");
    }

    return gfs.remove(options, cb);
  }

};
