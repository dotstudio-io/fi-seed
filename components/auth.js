/* jshint node: true */
'use strict';

var Type = require('type-of-is');
var debug = require('debug');

function authorize(path, req, res, next) {
  var allowed;

  if (Type.is(path.allows, Array)) {
    allowed = path.allows.indexOf(req.session.authorized) >= 0;
  } else if (Type.is(path.allows, String)) {
    allowed = path.allows === req.session.authorized;
  }

  if (path.allows === 'all') {
    debug("%s %s : Allows all", req.method, req.path);
    next();
  } else if (allowed) {
    debug("%s %s : Authorized (needed [%s], has [%s])", req.method, req.path, path.allows, req.session.authorized);
    next();
  } else {
    debug("%s %s : Unauthorized (allows [%s], has [%s])", req.method, req.path, path.allows, req.session.authorized);
    res.status(403).end();
  }
}

module.exports = function (app, config) {

  if (config.debug) {
    if (Type.is(config.debug, String)) {
      debug = debug(config.debug);
    } else if (Type.is(config.debug, Boolean) && config.debug) {
      debug = console.log;
    } else {
      debug = function () {}; /* Dummy function */
    }
  }

  /* Set the session authorized property */
  app.use(function (req, res, next) {
    req.session.authorized = config.authorizer(req);
    next();
  });

  /* Filter each path */
  config.paths.forEach(function (path) {
    if (!path.route) {
      debug("ERROR: No route specified! --> %s", JSON.stringify(path));
      return;
    }

    var route = app.route(path.route);

    debug("%s --> %s : %s", path.method, path.route, path.allows);

    function callback(req, res, next) {
      authorize(path, req, res, next);
    }

    if (Type.is(path.method, Array)) {
      path.method.forEach(function (method) {
        route[method.toLowerCase()](callback);
      });
    } else if (Type.is(path.method, String)) {
      route[path.method.toLowerCase()](callback);
    } else { /* If no method is specified, default to GET */
      route.get(callback);
    }

  });

};
