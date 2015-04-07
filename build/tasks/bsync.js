/* jshint node: true */
'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var server = require('../../server/config/server.js');


gulp.task('browser-sync', function () {

  browserSync({
    proxy: 'http://localhost:' + server.port,
    files: ['client/**/*.*'],
    browser: 'google chrome',
    port: server.port + 1
  });

});
