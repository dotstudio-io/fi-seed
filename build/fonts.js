'use strict';

const changed = require('gulp-changed');
const gulp = require('gulp');

module.exports = (src, dest) => gulp.src(src)
  .pipe(changed(dest))
  .pipe(gulp.dest(dest));
