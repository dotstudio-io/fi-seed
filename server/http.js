'use strict';

require('./globals')(global);
require('colors');

const CONSTS = require('fi-consts');
const express = require('express');
const logger = require('morgan');
const http = require('http');

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const HTTPS = 'https://';
const COL = ':';

/* Load constants before othe components */
CONSTS.load(config('consts'));

const serverUtils = component('server-utils');

const configs = {
  server: config('server')
};

const PORT = COL + configs.server.ports.https;

/* Create the Express application */
const app = express();

/* Disable Powered By Express header */
app.disable('x-powered-by');

/* Create the HTTP server */
const server = http.createServer(app);

/* Request logger */
app.use(logger(DEVELOPMENT ? 'dev' : 'tiny'));

/* Redirect all HTTP traffic to HTTPS */
app.use((req, res) => {
  var url = HTTPS + req.hostname;

  if (DEVELOPMENT) {
    url += PORT;
  }

  url += req.originalUrl;

  res.redirect(url);

  url = null;
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
