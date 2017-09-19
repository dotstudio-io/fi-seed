'use strict';

const fi = require('fi-utils');
const path = require('path');

const BUILD_PATH = path.join(fi.basedir(), 'build');

require(path.join(BUILD_PATH, 'check-versions'))();

const webpack = require('webpack');
const opn = require('opn');

const webpackConfig = require(path.join(BUILD_PATH, 'webpack.dev.conf'));
const config = require(path.join(fi.basedir(), 'config'));
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  // log: false
});

/* Force page reload when html-webpack-plugin template changes */
compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({
      action: 'reload'
    });

    cb();
  });
});

module.exports = (app) => {

  /* Handle fallback for HTML5 history API */
  app.use(require('connect-history-api-fallback')());

  /* Serve webpack bundle output */
  app.use(devMiddleware);

  /* Enable hot-reload and state-preserving compilation error display */
  app.use(hotMiddleware);

};
