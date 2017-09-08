'use strict';

const expect = require('gulp-expect-file');
const remember = require('gulp-remember');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cache = require('gulp-cached');
const gulpif = require('gulp-if');
const gulp = require('gulp');

const OPTIONS = require('./options');
const CACHE_NAME = 'scripts';

const OPTS_UGLIFY = {
  mangle: true,
  compress: {
    drop_console: true,
    dead_code: true
  }
};

module.exports = (name, files, min, dest) => gulp.src(files)
  .pipe(plumber(OPTIONS.PLUMBER))
  .pipe(expect.real(files))
  .pipe(gulpif(global.isWatching, cache(CACHE_NAME, OPTIONS.CACHE)))
  .pipe(gulpif(global.isWatching, remember(CACHE_NAME)))
  .pipe(gulpif(min, uglify(OPTS_UGLIFY)))
  .pipe(concat(`${ name }${ min ? '.min' : '' }.js`))
  .pipe(gulp.dest(dest));
