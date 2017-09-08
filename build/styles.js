'use strict';

const autoprefixer = require('gulp-autoprefixer');
const expect = require('gulp-expect-file');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const gulp = require('gulp');

const OPTIONS = require('./options');
const DOT_MIN = '.min';
const DOT_CSS = '.css';
const NONE = '';

const OPTS_COMPRESSED = {
  outputStyle: 'compressed'
};

const OPTS_AUTOPREFIXER = {
  browsers: ['last 2 versions'],
  cascade: false
};

const OPTS_CSSNANO = {
  safe: true
};

const OPTS_EMPTY = {};

module.exports = (name, files, min, dest) => gulp.src(files)
  .pipe(plumber(OPTIONS.PLUMBER))
  .pipe(expect.real(files))
  .pipe(sass.sync(min ? OPTS_COMPRESSED : OPTS_EMPTY))
  .pipe(autoprefixer(OPTS_AUTOPREFIXER))
  .pipe(gulpif(min, cssnano(OPTS_CSSNANO)))
  .pipe(concat(name + (min ? DOT_MIN : NONE) + DOT_CSS))
  .pipe(gulp.dest(dest));
