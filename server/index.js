'use strict';

const credentials = require('fi-credentials');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const compression = require('compression');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const security = require('fi-security');
const schemas = require('fi-schemas');
const errors = require('fi-errors');
const CONSTS = require('fi-consts');
const routes = require('fi-routes');
const express = require('express');
const logger = require('morgan');
const auth = require('fi-auth');
const fi = require('fi-utils');
const http = require('http');
const path = require('path');

fi.init(require(path.join(__dirname, 'configs', 'utils')));

const PACKAGE = require(path.join(fi.basedir(), 'package.json'));

const app = express();

let server;

app.disable('x-powered-by');

credentials.load(fi.config('credentials'))

  .then(() => {
    CONSTS.load(fi.config('consts'));

    app.locals.environment = process.env.NODE_ENV;
    app.locals.description = PACKAGE.description;
    app.locals.basedir = fi.config('views').basedir;
    app.locals.version = PACKAGE.version;
    app.locals.title = PACKAGE.title;
    app.locals.stage = PACKAGE.stage;
    app.locals.name = PACKAGE.name;

    app.set('view engine', fi.config('views').engine);
    app.set('views', fi.config('views').basedir);
    app.set('trust proxy', 1);

    /* Initilize webpack dev and hot reload */
    if (process.env.NODE_ENV === 'development') {
      fi.component('webpack')(app);
    }

    /* App middlewares */
    app.use(compression());
    app.use(favicon(fi.config('favicon')));
    app.use(logger(fi.config('logger')));
    app.use(fi.component('health-check'));
    app.use(fi.component('redirecter'));
    app.use(fi.config('static').route, express.static(fi.config('static').basedir));
    app.use(cookieParser(fi.config('session').secret));
    app.use(session(fi.config('session')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded(fi.config('body-parser').urlencoded));

    /* Configure errors module */
    errors.config(fi.config('errors'));

    /* Connect to database */
    return fi.component('database').connect();
  })

  /* Load schemas */
  .then(() => schemas.load(fi.config('schemas')))

  .then(() => {
    /* Setup application security */
    security(app, fi.config('security'));

    /* Set routes auth */
    auth(app, fi.config('auth'));

    /* Register application  routes */
    routes(app, fi.config('routes'));

    /* Register route error handlers */
    app.use(errors.notFoundMiddleware);
    app.use(errors.handler);

    /* Initalize server */
    const serverUtils = fi.component('server-utils');

    server = http.createServer(app);

    server.listen(fi.config('server').port, (err) => {
      if (err) {
        return serverUtils.onServerError(err);
      }

      const bind = serverUtils.getBind(server);

      console.log(`[${ process.env.NODE_ENV }] Server is listening on ${ bind }`);
    });
  });

/**
 * SIGINT listener.
 */
process.once('SIGINT', () => {
  console.log('Shutting down application...\n');

  if (server) {
    server.close();
  }

  fi.component('database').disconnect().then(() => {
    console.log('Disconnected from database!\n');
    process.exit();
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });

  /* You may put any other cleanup scripts here */
});
