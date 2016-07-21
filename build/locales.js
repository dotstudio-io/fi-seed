'use strict';

const jsonminify = require('gulp-jsonminify');
const expect = require('gulp-expect-file');
const gulpif = require('gulp-if');
const gulp = require('gulp');

module.exports = function locales(files, min, dest) {
  return gulp.src(files)

    .pipe(expect(files))

    .pipe(gulpif(min, jsonminify()))

    .pipe(gulp.dest(dest));
};
