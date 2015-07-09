'use strict';

var path = require('path');

module.exports = function (app) {
  var basedir = path.join(__basedir, 'views');
  var engine = 'jade';

  /* Set the basedir into the app locals */
  app.locals.basedir = basedir;

  return {
    basedir: basedir,
    engine: engine
  };
};
