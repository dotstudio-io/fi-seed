'use strict';

const expect = require('gulp-expect-file');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const gulp = require('gulp');

module.exports = function styles(name, files, min, dest) {
  return gulp.src(files).

  pipe(expect(files)).

  pipe(plumber({
    errorHandler: function (err) {
      console.error("\nError building styles!\n");

      console.dir(err, {
        showHidden: true,
        colors: true,
        depth: 8
      });

      this.emit('end');
    }
  })).

  pipe(sass.sync(min ? {
    outputStyle: 'compressed'
  } : {})).

  pipe(gulpif(min, cssnano())).

  pipe(concat(name + (min ? '.min' : '') + '.css')).

  pipe(gulp.dest(dest));
};
