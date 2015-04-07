/* jshint node: true */
'use strict';

var nodemon = require('gulp-nodemon');
var gulp = require('gulp');

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('nodemon', function () {

  nodemon({
    script: 'server',
    ext: 'js',
    watch: 'server/',
    env: {
      'NODE_ENV': 'development',
      'DEBUG': 'app:*'
    }
  });

});
