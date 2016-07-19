'use strict';

const expect = require('gulp-expect-file');
const plumber = require('gulp-plumber');
const htmlmin = require('gulp-htmlmin');
const gulpif = require('gulp-if');
const pug = require('gulp-pug');
const gulp = require('gulp');

module.exports = function templates(files, min, dest) {
  return gulp.src(files).

  pipe(expect(files)).

  pipe(plumber({
    errorHandler: function (err) {
      console.error("\nError building templates!\n");

      console.dir(err, {
        showHidden: true,
        colors: true,
        depth: 8
      });

      this.emit('end');
    }
  })).

  pipe(pug({
    basedir: 'client/templates'
  })).

  pipe(gulpif(min, htmlmin({
    collapseWhitespace: true
  }))).

  pipe(gulp.dest(dest));
};
