'use strict';

require('./globals')(global);
require('colors');

const PACKAGE = require(__basedir + '/package.json');

const credentials = require('fi-credentials');
const compression = require('compression');
const bodyParser = require('body-parser');
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
const http = require('http');
const path = require('path');

const app = express();

app.disable('x-powered-by');

credentials.load(config('credentials'))

  .then(() => {
    CONSTS.load(config('consts'));

    app.locals.environment = process.env.NODE_ENV;
    app.locals.description = PACKAGE.description;
    app.locals.basedir = config('views').basedir;
    app.locals.version = PACKAGE.version;
    app.locals.title = PACKAGE.title;
    app.locals.stage = PACKAGE.stage;
    app.locals.name = PACKAGE.name;

    app.set('view engine', config('views').engine);
    app.set('views', config('views').basedir);
    app.set('trust proxy', 1);

    app.use(compression());
    app.use(favicon(path.join('client', 'assets', 'favicon.ico')));
    app.use(logger(app.get('env') === 'production' ? 'tiny' : 'dev'));
    app.use(component('health-check'));
    app.use(component('redirecter'));
    app.use(config('assets').route, express.static(config('assets').basedir));
    app.use(config('session').cookieParser);
    app.use(config('session').middleware);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded(config('body-parser').urlencoded));

    errors.config(config('errors'));

    /* Connect to database */
    return component('database')();
  })

  .then(() => schemas(config('schemas')))

  .then(() => {
    /* Setup application security */
    security(app, config('security'));

    /* Set routes auth */
    auth(app, config('auth'));

    /* Register application  routes */
    routes(app, config('routes'));

    /* Register route error handlers */
    app.use(errors.notFoundMiddleware);
    app.use(errors.handler);

    /* Initalize server */
    const serverUtils = component('server-utils');
    const server = http.createServer(app);

    server.listen(config('server').port);

    server.once('listening', () => {
      console.log(`\n  Server is listening on ${ serverUtils.getBind(server) }\n`.bold);
    });

    server.on('error', serverUtils.onServerError);
  });

process.once('SIGINT', () => {
  console.log('\n\n  Shutting down server...\n'.bold);

  mongoose.disconnect().then(() => {
    console.log('  Disconnected from database!\n'.bold);
    process.exit();
  }).catch(err => {
    console.error(err);
    process.exit(1);
  });

  /* You may put any other cleanup scripts here */
});
