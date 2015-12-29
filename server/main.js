'use strict';

const PACKAGE = require(__basedir + '/package.json');

/**** Modules *****/
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const security = require('fi-security');
const schemas = require('fi-schemas');
const statics = require('fi-statics');
const mongoose = require('mongoose');
const routes = require('fi-routes');
const express = require('express');
const logger = require('morgan');
const auth = require('fi-auth');
const https = require('https');
const http = require('http');
const path = require('path');

/**** Application ****/
const app = express();

/**** Configuration ****/
const configs = {
  session: config('session')(session),
  bodyParser: config('body-parser'),
  security: config('security'),
  database: config('database'),
  schemas: config('schemas'),
  statics: config('statics'),
  assets: config('assets'),
  errors: config('errors'),
  server: config('server'),
  routes: config('routes'),
  views: config('views'),
  auth: config('auth')
};

/**** Setup ****/
app.locals.development = process.env.NODE_ENV === 'development';
app.locals.basedir = configs.views.basedir;
app.locals.title = PACKAGE.title;

app.set('port prefix', process.env.PORT_PREFIX || configs.server.portPrefix || 0);
app.set('view engine', configs.views.engine);
app.set('views', configs.views.basedir);

/* IMPORTANT: In production always use HTTPS */
if (app.get('env') === 'production') {
  configs.session.cookie.secure = true; // Serve secure cookies
  app.set('trust proxy', 1); // Trust first proxy
}

/**** Settings ****/
app.use(logger(app.get('env') === 'production' ? 'tiny' : 'dev'));
app.use(compression());
app.use(favicon(path.join('client', 'assets', 'icons', 'favicon.png')));
app.use(configs.assets.route, express.static(configs.assets.basedir));
app.use(session(configs.session));
app.use(configs.session.cookieParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(configs.bodyParser.urlencoded));

/**** Initialization ****/

function onServerError(server, error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

  switch (error.code) {
    case 'EACCES':
      console.error("\n  Assigned %s requires elevated privileges!\n".bold.red, bind);
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error("\n  Assigned %s is already in use!\n".bold.red, bind);
      process.exit(1);
      break;

    default:
      throw error;
  }
}

/* Configure database (mongoose) */
configs.database(function registerSchemas() {
  /* Registers schemas (mongoose) */
  schemas(mongoose, configs.schemas);

  /* Load and cache static database models data */
  statics(mongoose, configs.statics, function () {
    /* Setup application security */
    security(app, configs.security);

    /* Set route's auth rules */
    auth(app, configs.auth);

    /* Register application  routes */
    routes(app, configs.routes);

    /* Register route error handlers */
    configs.errors(app);

    /* Initalize HTTPS server */
    var httpsPort = parseInt(app.get('port prefix') + '443');
    var httpsServer = https.createServer(configs.server, app).listen(httpsPort);

    httpsServer.on('listening', function () {
      var addr = httpsServer.address();
      var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

      console.log("\n  HTTPS Server is listening on %s\n".bold, bind);
    });

    httpsServer.on('error', onServerError.bind(null, httpsServer));

    /* Initalize HTTP server */
    var httpPort = parseInt(app.get('port prefix') + '080');
    var httpServer = http.createServer(app).listen(httpPort);

    httpServer.on('listening', function () {
      var addr = httpServer.address();
      var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

      console.log("  HTTP Server is listening on %s\n".bold, bind);
    });

    httpServer.on('error', onServerError.bind(null, httpServer));
  });
});
