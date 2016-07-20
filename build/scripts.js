'use strict';

const expect = require('gulp-expect-file');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const gulpif = require('gulp-if');
const gulp = require('gulp');

const ERR_BUILD = '\n  Error building scripts!\n';
const DOT_MIN = '.min';
const DOT_JS = '.js';
const END = 'end';
const NONE = '';

const OPTS_UGLIFY = {
  mangle: true,
  compress: {
    drop_console: true,
    dead_code: true
  }
};

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

module.exports = (name, files, min, dest) => {
  return gulp.src(files).

  pipe(expect(files)).

  pipe(plumber(OPTS_PLUMBER)).

  pipe(gulpif(min, uglify(OPTS_UGLIFY))).

  pipe(concat(name + (min ? DOT_MIN : NONE) + DOT_JS)).

  pipe(gulp.dest(dest));
};
