'use strict';

const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const gulp = require('gulp');

const ERR_BUILD = '\n  Error building styles!\n';

const DOT_MIN = '.min';
const DOT_CSS = '.css';
const END = 'end';
const NONE = '';

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

const OPTS_COMPRESSED = {
  outputStyle: 'compressed'
};

const OPTS_AUTOPREFIXER = {
  browsers: ['last 2 versions'],
  cascade: false
};

const OPTS_EMPTY = {};

module.exports = function styles(name, files, min, dest) {
  return gulp.src(files)
    .pipe(plumber(OPTS_PLUMBER))
    .pipe(sass.sync(min ? OPTS_COMPRESSED : OPTS_EMPTY))
    .pipe(autoprefixer(OPTS_AUTOPREFIXER))
    .pipe(gulpif(min, cssnano()))
    .pipe(concat(name + (min ? DOT_MIN : NONE) + DOT_CSS))
    .pipe(gulp.dest(dest))
    .on('error', console.log.bind(console));
};