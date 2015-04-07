/* jshint node: true */
'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', function () {

  return gulp.src(paths.client.scripts.source).

  pipe(plumber()).

  pipe(changed(paths.client.scripts.output, {
    extension: '.js'
  })).

  pipe(sourcemaps.init()).

  pipe(to5(assign({}, compilerOptions, {
    modules: 'system'
  }))).

  pipe(sourcemaps.write({
    includeContent: false,
    sourceRoot: '/' + paths.client.root
  })).

  pipe(gulp.dest(paths.client.scripts.output));

});

// copies changed html files to the output directory
gulp.task('build-templates', function () {

  return gulp.src(paths.client.templates.source).

  pipe(changed(paths.client.templates.output, {
    extension: '.html'
  })).

  pipe(gulp.dest(paths.client.templates.output));

});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function (done) {

  runSequence('clean', [
    'build-system',
    'build-templates'
  ]);

});
