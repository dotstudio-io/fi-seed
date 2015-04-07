/* jshint node: true */
'use strict';

var gulp = require('gulp');
var paths = require('../paths');
var del = require('del');
var vinylPaths = require('vinyl-paths');

/**
 * The list of paths to clean.
 */
var cleanpaths = [
  paths.client.scripts.output,
  paths.client.templates.output,
  paths.client.styles.output
];

/**
 * Deletes all files in the output paths.
 */
gulp.task('clean', function() {

  return gulp.src(cleanpaths).

  pipe(vinylPaths(del));

});
