'use strict';

require('./globals')(global);
require('colors');

const PACKAGE = require(__basedir + '/package.json');

/**** Modules *****/
const compression = require('compression');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');
const favicon = require('serve-favicon');
const security = require('fi-security');
const schemas = require('fi-schemas');
const mongoose = require('mongoose');
const routes = require('fi-routes');
const CONSTS = require('fi-consts');
const express = require('express');
const logger = require('morgan');
const https = require('https');
const auth = require('fi-auth');
const path = require('path');

CONSTS.load(config('consts'));

/**** Application ****/
const app = express();

/* Disable Powered By Express header */
app.disable('x-powered-by');

/**** Configuration ****/
const configs = requireDir(__serverdir + '/config');

/**** Setup ****/
mongoose.Promise = Promise;

app.locals.environment = process.env.NODE_ENV;
app.locals.basedir = configs.views.basedir;
app.locals.version = PACKAGE.version;
app.locals.title = PACKAGE.title;
app.locals.stage = PACKAGE.stage;

app.set('view engine', configs.views.engine);
app.set('views', configs.views.basedir);
app.set('trust proxy', 1);

/**** Settings ****/
app.use(logger(app.get('env') === 'production' ? 'tiny' : 'dev'));
app.use(favicon(path.join('client', 'assets', 'favicon.png')));
app.use(compression());
app.use(configs.assets.route, express.static(configs.assets.basedir));
app.use(configs.session.cookieParser);
app.use(configs.session.middleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(configs['body-parser'].urlencoded));

/**** Initialization ****/
const serverUtils = component('server-utils');
const errors = component('errors');

/* Configure database (mongoose) */
configs.database(() => {
  /* Registers schemas (mongoose) */
  schemas(mongoose, configs.schemas);

  /* Setup application security */
  security(app, configs.security);

  /* Set routes auth */
  auth(app, configs.auth);

  /* Register application  routes */
  routes(app, configs.routes);

  /* Register route error handlers */
  errors(app);

  /* Initalize HTTPS server */
  const server = https.createServer(configs.server.https, app);

  server.listen(configs.server.ports.https);

  server.on('listening', () => {
    console.log('\n  HTTPS server is listening on %s\n'.bold, serverUtils.getBind(server));
  });

  server.on('error', serverUtils.onServerError);
});

process.once('SIGINT', () => {
  console.log('\n\n  Shutting down application...\n'.bold);

  /* You may put any cleanup script here */

  process.exit();
});
