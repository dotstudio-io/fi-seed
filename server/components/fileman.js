/**
 * File Manager Component
 *
 * Provides multiple utility functions to manage file uploads including a file writer and
 * an Uploaded Files Cleaner.
 *
 * @type Component
 */

'use strict';

/** Dependencies */
var debug = require('debug')('app:fileman');
var Type = require('type-of-is');
var uuid = require('node-uuid');
var Busboy = require('busboy');
var crypto = require('crypto');
var mkdirp = require('mkdirp');
var path = require('path');
var fs = require('fs');
var os = require('os');

/* Component config */
var config = {

  tempdir: path.join(os.tmpDir(), 'uploads'),

  stordir: path.join(__appdir, 'storage')

};

/**
 * Configures the component.
 *
 * Recieves a configuration and updates it.
 *
 * @param {Object} options The configurion options.
 */
function configure(options) {
  config = {
    tempdir: options.tempdir || config.tempdir,
    stordir: options.stordir || config.stordir
  };

  debug(config);
}

/**
 * Ensures that the desired dirpath directories exists.
 *
 * @param {String} dirpath The path to ensure
 * @param {Function} done The callback
 */
function ensurePath(dirpath, done) {
  mkdirp(dirpath, done);
}

/**
 * Creates folders and generates a unique file name into the temp folder.
 *
 * @param {String} basepath The full path to store the file relative to the temp dir
 * @param {Function} done The callback
 */
function getTempPath(filename, done) {
  /* Create a unique filename but maintain the file's extension */
  var outfile = uuid.v4() + path.extname(filename);

  /* Ensure the path exists */
  ensurePath(config.tempdir, function (err) {
    if (err) {
      return done(err);
    }

    /* Send the destination full path */
    done(null, path.join(config.tempdir, outfile));
  });
}

/**
 * Moves an uploaded file to the specified folder and saves it into the database.
 *
 * @param {String} destpath The destination path to save the file into
 * @param {Object} file The file object obtained from the multipart form parser
 * @param {Function} done The done callback
 */
function save(destpath, tempfile, done) {
  var basepath = path.join(config.stordir, destpath);
  var outpath = path.join(basepath, path.basename(tempfile.path));

  debug("Saving file to: %s", outpath);

  ensurePath(basepath, function (err) {
    if (err) {
      return done(err);
    }

    /* Create a read stream from the source file in the temp directory */
    var source = fs.createReadStream(tempfile.path);
    /* Create write stream to the output path */
    var dest = fs.createWriteStream(outpath);
    /* Create a crypto MD5 hasher for the file's data */
    var hash = crypto.createHash('md5');

    /* Obtain temp file stats to retrieve it's size */
    fs.stat(tempfile.path, function (err, stats) {
      if (err) {
        return done(err);
      }

      debug("Got file stats");
      debug(stats);

      source.on('data', function (data) {
        /* Update the file's MD5 hash */
        hash.update(data, 'utf8');
      });

      source.on('end', function () {
        debug("Wrote file %s", outpath);

        /* Create the file's data */
        var filedata = {
          mimetype: tempfile.mimetype,
          filename: tempfile.filename,
          filesize: stats.size,
          path: outpath.replace(config.stordir, ''),
          md5: hash.digest('hex')
        };

        /* Send the filedata object */
        done(null, filedata);
      });

      source.on('error', function (err) {
        done(err);
      });

      /* Pipe the source file to the output path */
      debug("Streaming file...");
      source.pipe(dest);
    });

  });
}

/**
 * Resolves a file's full path relative to the storage dir.
 *
 * @param {String} path The relative path to the file
 *
 * @return {String} The full path to the file
 */
function resolve(filepath) {
  return path.normalize(path.join(config.stordir, filepath));
}

/**
 * Reads a file from the storage dir.
 *
 * @param {String} path The relative path to the file
 *
 * @return {ReadableStream} The read stream for the file
 */
function read(filepath) {
  return fs.createReadStream(resolve(filepath));
}

/**
 * Parses any incoming multipart form data.
 *
 * @type Express Middleware
 */
function multiparser(req, res, next) {
  /* Only post and put request with multipar form data */
  if ((req.method !== 'POST' && req.method !== 'PUT') || !req.is('multipart')) {
    /* Not for us */
    return next();
  }

  var busboy = new Busboy({
    headers: req.headers
  });

  req.files = [];
  req.body = {};

  /* Move uploaded files to the temp dir */
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    /* Get and esure the temp uploads folder exists */
    getTempPath(filename, function (err, destpath) {
      if (err) {
        return next(err);
      }

      file.on('end', function () {
        debug("Wrote temp file: %s", destpath);

        /* Add the saved file to the request files array */
        req.files.push({
          mimetype: mimetype,
          filename: filename,
          path: destpath
        });
      });

      file.on('error', function (err) {
        next(err);
      });

      debug("Saving temp file: %s", destpath);
      file.pipe(fs.createWriteStream(destpath));
    });
  });

  /* Append fields to the request body */
  busboy.on('field', function (fieldname, val) {
    try {
      req.body[fieldname] = JSON.parse(val);
    } catch (ex) {
      req.body[fieldname] = val;
    }
  });

  busboy.on('finish', function () {
    next();
  });

  req.pipe(busboy);
}

/**
 * Waits until the response is finished and unliks any uploaded files from the temp folder.
 *
 * @type Express Middleware
 */
function uploadedFilesCleaner(req, res, next) {
  res.on('finish', function () {
    /* Check if files qhere uploaded */
    if (Type.is(req.files, Array) && req.files.length) {
      debug("Cleaning %d uploaded files...", req.files.length);

      /* Unlink each file */
      req.files.forEach(function (file) {
        debug("Unlinking '%s'...", file.path);

        fs.unlink(file.path, function (err) {
          if (err) {
            debug(err);
          }

          debug("Unlinked '%s'!", file.path);
        });
      });
    }
  });

  next();
}

/** Public methods */
module.exports.uploadedFilesCleaner = uploadedFilesCleaner;
module.exports.multiparser = multiparser;
module.exports.getTempPath = getTempPath;
module.exports.ensurePath = ensurePath;
module.exports.configure = configure;
module.exports.resolve = resolve;
module.exports.save = save;
module.exports.read = read;
