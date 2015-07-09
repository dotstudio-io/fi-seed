'use strict';

var walk = require('walk');
var path = require('path');
var mongoose = require('mongoose');
var debug = require('debug')('app:schemas');

function getName() {
  return getPath.apply(null, arguments).replace(/\\+|\/+/g, '.').replace(/^\.+/, '');
}

function getPath() {
  return path.normalize(path.join.apply(null, arguments));
}

module.exports = function (basedir) {

  var fullpath = path.join(__basedir, basedir);

  walk.walkSync(fullpath, {
    listeners: {
      file: function (root, stats, next) {
        if (path.extname(stats.name) === '.js') {

          /* Get file name */
          var file = getPath(root, stats.name);

          /* Require the file and pass the Mongoose Schema object */
          var schema = require(file)(mongoose.Schema);

          /* Generate the schema name */
          var name = getName(root.replace(fullpath, ''), path.basename(stats.name, '.js'));

          /* Create the model in Mongoose */
          mongoose.model(name, schema);

          debug("%s --> %s", name, file);
        }

        next();
      },

      errors: function (root, stats) {
        panic("Could not register schemas!\n", root, stats);
      }
    }
  });

};
