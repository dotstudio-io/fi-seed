'use strict';

require('colors');

/**** Register globals *****/
require('./globals')(global);

/**** Modules *****/
var debug = require('debug')('app:main');
var compression = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var express = require('express');
var security = require('lusca');
var logger = require('morgan');
var http = require('http');
var path = require('path');

/**** Application ****/
var app = express();
var server = http.createServer(app);

/**** Components ****/
var fileman = component('fileman');
var schemas = component('schemas');
var statics = component('statics');
var routes = component('routes');
var gridfs = component('gridfs');
var auth = component('auth');

/**** Configuration ****/
var configs = {
  session: config('session')(session),
  security: config('security'),
  mongoose: config('mongoose'),
  views: config('views')(app),
  fileman: config('fileman'),
  schemas: config('schemas'),
  statics: config('statics'),
  assets: config('assets'),
  errors: config('errors'),
  server: config('server'),
  routes: config('routes'),
  auth: config('auth')
};

/**** Setup ****/
app.set('port', process.env.PORT || configs.server.port || 0);
app.set('view engine', configs.views.engine);
app.set('views', configs.views.basedir);

/* UNCOMMENT IF YOU USE HTTPS */
//if (app.get('env') === 'production') {
//  app.set('trust proxy', 1); /* Trust first proxy */
//  configs.session.cookie.secure = true; /* Serve secure cookies */
//}

/**** Settings ****/
/* Keep this order:
 *
 * 1.- Favicon
 * 2.- Session
 * 3.- Cookie Parser
 * 4.- Body Parser
 * 5.- Multipart Parser
 * 6.- Security [...]
 * 7.- Compression
 * 8.- Anything else...
 */
app.use(favicon(path.join('client', 'assets', 'icons', 'favicon.png')));
app.use(configs.assets.route, express.static(configs.assets.basedir));
app.use(logger(app.get('env') === 'production' ? 'tiny' : 'dev'));
app.use(session(configs.session));
app.use(configs.session.cookieParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(fileman.multiparser);
app.use(security.csrf(configs.security.csrf));
app.use(security.csp(configs.security.csp));
app.use(security.xframe(configs.security.xframe));
app.use(security.hsts(configs.security.hsts));
app.use(security.xssProtection(configs.security.xssProtection));
app.use(fileman.uploadedFilesCleaner);
app.use(compression());

/**** Initialization ****/

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

  debug('Listening on ' + bind);
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var port = app.get('port');
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      debug("%s requires elevated privileges!", bind);
      process.exit(1);
      break;

    case 'EADDRINUSE':
      debug("%s is already in use!", bind);
      process.exit(1);
      break;

    default:
      throw error;
  }
}

/**
 * Starts listening for requests.
 */
function startServer() {
  server.listen(app.get('port'));
  server.on('error', onError);
  server.on('listening', onListening);
}

/**
 * Initializes MongoDB's GridFS.
 */
function initGridFS() {
  gridfs.init(mongoose.connection.db, mongoose.mongo);
  startServer();
}

/**
 * Registers routes.
 */
function registerRoutes() {
  /* Register routes */
  routes(app, configs.routes);

  /* Register error handlers */
  configs.errors(app);

  initGridFS();
}

/**
 * Sets auth rules.
 */
function authorizeRoutes() {
  auth(app, configs.auth);
  registerRoutes();
}

/**
 * Loads statics.
 */
function loadStatics() {
  statics.load(configs.statics, authorizeRoutes);
}

/**
 * Registers schemas.
 */
function registerSchemas() {
  schemas(mongoose, configs.schemas);
  loadStatics();
}

/* Kickstart initialization */
configs.mongoose(registerSchemas);
