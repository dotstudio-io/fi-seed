'use strict';

const path = require('path');

const vueLoaderConfig = require('./vue-loader.conf');
const config = require('../config');
const utils = require('./utils');

/**
 * Resolves a path relative to dirname's root.
 *
 * @param {String} dirs... The directories to resolve.
 *
 * @returns {String} The resolved directory.
 */
function resolve() {
  return path.resolve(
    path.join.bind(null, __dirname, '..').apply(null, arguments)
  );
}

module.exports = {
  entry: {
    app: resolve('client', 'source', 'main.js')
  },

  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('client', 'source')
    }
  },

  module: {
    rules: [{
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [resolve('client', 'source'), resolve('test', 'client')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueLoaderConfig
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('client', 'source'), resolve('test', 'client')]
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('images/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('media/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }]
  }
};
