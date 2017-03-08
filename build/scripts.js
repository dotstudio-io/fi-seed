'use strict';

const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const gulp = require('gulp');

const ERR_BUILD = '\n  Error building scripts!\n';

const SCRIPTS = 'scripts';
const DOT_MIN = '.min';
const DOT_JS = '.js';
const END = 'end';
const NONE = '';

const OPTS_UGLIFY_MIN = {
  mangle: true,
  compress: {
    drop_console: true,
    dead_code: true
  }
};

const OPTS_UGLIFY_DEV = {
  compress: false,
  mangle: false,
  output: {
    beautify: true,
    comments: true
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
  return gulp.src(files)
    .pipe(plumber(OPTS_PLUMBER))
    .pipe(uglify(min ? OPTS_UGLIFY_MIN : OPTS_UGLIFY_DEV))
    .pipe(concat(name + (min ? DOT_MIN : NONE) + DOT_JS))
    .pipe(gulp.dest(dest))
    .on('error', console.log.bind(console));
};
