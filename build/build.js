'use strict';

require('./check-versions')();

process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const chalk = require('chalk');
const path = require('path');
const rm = require('rimraf');
const ora = require('ora');

const webpackConfig = require('./webpack.prod.conf');
const config = require('../config');

const spinner = ora('building for production...');

spinner.start();

const outdir = path.join(
  config.build.assetsRoot, config.build.assetsSubDirectory
);

rm(outdir, (err) => {
  if (err) {
    throw err;
  }

  webpack(webpackConfig, (err, stats) => {
    spinner.stop();

    if (err) {
      throw err;
    }

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    console.log(chalk.cyan('  Build complete.\n'));
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ));
  });
});
