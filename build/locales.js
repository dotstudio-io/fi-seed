'use strict';

const jsonminify = require('gulp-jsonminify');
const remember = require('gulp-remember');
const merge = require('gulp-merge-json');
const plumber = require('gulp-plumber');
const merges = require('merge-stream');
const cache = require('gulp-cached');
const gulpif = require('gulp-if');
const path = require('path');
const gulp = require('gulp');

const OPTIONS = require('./options');
const CACHE_NAME = 'locales';
const ERROR = 'error';
const JSON = '.json';

module.exports = (files, min, dest) => {
  var streams = merges();

  for (let i = 0, l = files.length; i < l; i++) {
    let source = files[i];

    let stream = gulp.src(source)
      .pipe(plumber(OPTIONS.PLUMBER))
      .pipe(gulpif(global.isWatching, cache(CACHE_NAME, OPTIONS.CACHE)))
      .pipe(gulpif(global.isWatching, remember(CACHE_NAME)))
      .pipe(merge(path.basename(source, JSON) + JSON))
      .pipe(gulpif(min, jsonminify()))
      .pipe(gulp.dest(dest))
      .on(ERROR, console.error.bind(console));

    streams.add(stream);
  }

  return streams;
};
