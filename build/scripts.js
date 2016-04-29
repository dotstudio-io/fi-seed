'use strict';

const expect = require('gulp-expect-file');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const gulpif = require('gulp-if');
const gulp = require('gulp');

module.exports = function scripts(name, files, min, dest) {
  return gulp.src(files).

  pipe(expect(files)).

  pipe(plumber({
    errorHandler: function (err) {
      console.error("\nError building scripts!\n");

      console.dir(err, {
        showHidden: true,
        colors: true,
        depth: 8
      });

      this.emit('end');
    }
  })).

  pipe(gulpif(min, uglify({
    mangle: true,
    compress: {
      drop_console: true,
      dead_code: true
    }
  }))).

  pipe(concat(name + (min ? '.min' : '') + '.js')).

  pipe(gulp.dest(dest));
};
