'use strict';

const expect = require('gulp-expect-file');
const plumber = require('gulp-plumber');
const htmlmin = require('gulp-htmlmin');
const gulpif = require('gulp-if');
const pug = require('gulp-pug');
const gulp = require('gulp');

const ERR_BUILD = '\n  Error building templates!\n';
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

const OPTS_PUG = {
  basedir: 'client/templates'
};

const OPTS_HTMLMIN = {
  collapseWhitespace: true
};

module.exports = function templates(files, min, dest) {
  return gulp.src(files).

  pipe(expect(files)).

  pipe(plumber(OPTS_PLUMBER)).

  pipe(pug(OPTS_PUG)).

  pipe(gulpif(min, htmlmin(OPTS_HTMLMIN))).

  pipe(gulp.dest(dest));
};
