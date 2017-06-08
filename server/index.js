'use strict';

require('./globals')(global);
require('colors');

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PACKAGE = require(__basedir + '/package.json');

/**** Modules *****/
const compression = require('compression');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');
const favicon = require('serve-favicon');
const security = require('fi-security');
const schemas = require('fi-schemas');
const mongoose = require('mongoose');
const errors = require('fi-errors');
const CONSTS = require('fi-consts');
const routes = require('fi-routes');
const express = require('express');
const logger = require('morgan');
const auth = require('fi-auth');
const https = require('https');
const http = require('http');
const path = require('path');

/* Load constants before other components */
CONSTS.load(config('consts'));
errors.config(config('errors'));

/* Load components */
const serverUtils = component('server-utils');
const healthCheck = component('health-check');
const redirecter = component('redirecter');

/**** Application ****/
const app = express();

/* Disable Powered By Express header */
app.disable('x-powered-by');

/**** Configuration ****/
const configs = requireDir(__serverdir + '/config');

/**** Setup ****/
mongoose.Promise = Promise;

app.locals.environment = process.env.NODE_ENV;
app.locals.description = PACKAGE.description;
app.locals.basedir = configs.views.basedir;
app.locals.version = PACKAGE.version;
app.locals.title = PACKAGE.title;
app.locals.stage = PACKAGE.stage;
app.locals.name = PACKAGE.name;

app.set('view engine', configs.views.engine);
app.set('views', configs.views.basedir);
app.set('trust proxy', 1);

/**** Settings ****/
app.use(compression());
app.use(logger(app.get('env') === 'production' ? 'tiny' : 'dev'));
app.use(healthCheck);
app.use(favicon(path.join('client', 'assets', 'favicon.png')));
app.use(redirecter);
app.use(configs.assets.route, express.static(configs.assets.basedir));
app.use(configs.session.cookieParser);
app.use(configs.session.middleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(configs['body-parser'].urlencoded));

/**** Initialization ****/

/* Configure database (mongoose) */
configs.database().then(() => {
  /* Registers schemas (mongoose) */
  schemas(mongoose, configs.schemas);

  /* Setup application security */
  security(app, configs.security);

  /* Set routes auth */
  auth(app, configs.auth);

  /* Register application  routes */
  routes(app, configs.routes);

  /* Register route error handlers */
  app.use(errors.notFoundMiddleware);
  app.use(errors.handler);

  /* Initalize server */
  var server;

  if (DEVELOPMENT) {
    server = https.createServer(configs.server.credentials, app);
  } else {
    server = http.createServer(app);
  }

  server.listen(configs.server.port);

  server.once('listening', () => {
    console.log(`\n  Server is listening on ${ serverUtils.getBind(server) }\n`.bold);
  });

  server.on('error', serverUtils.onServerError);
});

process.once('SIGINT', () => {
  console.log('\n\n  Shutting down server...\n'.bold);

  /* You may put any cleanup script here */

  process.exit();
});