'use strict';

require('./globals')(global);
require('colors');

const DEVELOPMENT = 'development';
const HTTPS = 'https://';

const express = require('express');
const logger = require('morgan');
const http = require('http');

const serverUtils = component('server-utils');

const configs = {
  server: config('server')
};

/* Create the Express application */
const app = express();

/* Disable Powered By Express header */
app.disable('x-powered-by');

/* Create the HTTP server */
const server = http.createServer(app);

/* Request logger */
app.use(logger(app.get('env') === DEVELOPMENT ? 'dev' : 'tiny'));

/* Redirect all HTTP traffic to HTTPS */
app.use((req, res) => {
  var url = HTTPS + req.hostname;

  if (process.env.NODE_ENV === DEVELOPMENT) {
    url += ':' + configs.server.ports.https;
  }

  url += req.originalUrl;

  res.redirect(url);
});

/* Initialize HTTP server */
server.listen(configs.server.ports.http);

server.on('listening', () => {
  console.log('\n  HTTP server is listening on %s\n'.bold, serverUtils.getBind(server));
});

server.on('error', serverUtils.onServerError);

process.once('SIGINT', () => {
  console.log('\n\n  Shutting down application...\n'.bold);

  /* You may put any cleanup script here */

  process.exit();
});
