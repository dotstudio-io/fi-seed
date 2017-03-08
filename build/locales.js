'use strict';

const jsonminify = require('gulp-jsonminify');
const merge = require('gulp-merge-json');
const plumber = require('gulp-plumber');
const merges = require('merge-stream');
const gulpif = require('gulp-if');
const path = require('path');
const gulp = require('gulp');

const ERR_BUILD = '\n  Error building locales!\n';
const ERROR = 'error';
const JSON = '.json';
const END = 'end';

const OPTS_DIR = {
  showHidden: true,
  colors: true,
  depth: 8
};

const OPTS_PLUMBER = {
  errorHandler: function (err) {
    console.error(ERR_BUILD);
    console.dir(err, OPTS_DIR);

    this.emit(END);
  }
};

module.exports = (files, min, dest) => {
  var streams = merges();

  streams.on(ERROR, console.log.bind(console));

  for (let i = 0, l = files.length; i < l; i++) {
    let source = files[i];

    let stream = gulp.src(source)
      .pipe(plumber(OPTS_PLUMBER))
      .pipe(merge(path.basename(source, JSON) + JSON))
      .pipe(gulpif(min, jsonminify()))
      .pipe(gulp.dest(dest))
      .on(ERROR, console.log.bind(console));

    streams.add(stream);
  }

  return streams;
};
