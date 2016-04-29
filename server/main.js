'use strict';

const PACKAGE = require(__basedir + '/package.json');

/**** Modules *****/
const compression = require('compression');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');
const favicon = require('serve-favicon');
const security = require('fi-security');
const schemas = require('fi-schemas');
const statics = require('fi-statics');
const mongoose = require('mongoose');
const routes = require('fi-routes');
const express = require('express');
const logger = require('morgan');
const auth = require('fi-auth');
// const https = require('https');
const http = require('http');
const path = require('path');

const serverUtils = component('server-utils');
const errors = component('errors');

/**** Application ****/
const app = express();

/**** Configuration ****/
var configs = requireDir(path.join(__serverdir, 'config'));

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
app.use(favicon(path.join('client', 'assets', 'favicon.png')));
app.use(configs.assets.route, express.static(configs.assets.basedir));
app.use(configs.session.middleware);
app.use(configs.session.cookieParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(configs['body-parser'].urlencoded));

/**** Initialization ****/

/* Configure database (mongoose) */
configs.database(() => {
  /* Registers schemas (mongoose) */
  schemas(mongoose, configs.schemas);

  /* Load and cache static database models data */
  statics(mongoose, configs.statics, () => {
    /* Setup application security */
    security(app, configs.security);

    /* Set route's auth rules */
    auth(app, configs.auth);

    /* Register application  routes */
    routes(app, configs.routes);

    /* Register route error handlers */
    errors(app);

    /* Initalize HTTP server */
    var httpPort = parseInt(app.get('port prefix') + '080');
    var httpServer = http.createServer(app).listen(httpPort);

    httpServer.on('listening', () => {
      console.log("\n  HTTP server is listening on %s".bold, serverUtils.getBind(httpServer));
    });

    httpServer.on('error', serverUtils.onServerError);

    /**
     * IMPORTANT: If you're using HTTPS you should consider redirect all HTTP
     * requests to the HTTPS server.
     */

    /* Initalize HTTPS server */
    // var httpsPort = parseInt(app.get('port prefix') + '443');
    // var httpsServer = https.createServer(configs.server, app).listen(httpsPort);
    //
    // httpsServer.on('listening', function () {
    //   console.log("\n  HTTPS server is listening on %s\n".bold, getBind(httpsServer));
    // });
    //
    // httpsServer.on('error', onServerError);
  });
});
