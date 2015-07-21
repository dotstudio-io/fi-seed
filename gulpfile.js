'use strict';

var sourcemaps = require('gulp-sourcemaps');
var minifycss = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jade = require('gulp-jade');
var less = require('gulp-less');
var util = require('util');
var gulp = require('gulp');
var del = require('del');

var options = {
  plumber: {
    errorHandler: function (err) {
      console.error(util.inspect(err, {
        showHidden: true,
        colors: true,
        depth: 8
      }));

      this.emit('end');
    }
  }
};

/**** PATHS ****/
var paths = {
  source: {
    scripts: [
      'client/scripts/app.js',

      'client/scripts/modules/**/*.js',
      'client/scripts/services/**/*.js',
      'client/scripts/routes/**/*.js',
      'client/scripts/controllers/**/*.js',
      'client/scripts/directives/**/*.js',

      'client/scripts/main.js'
    ],

    styles: 'client/styles/styles.less',

    templates: 'client/templates/**/*.jade'
  },

  dest: {
    templates: 'client/assets/templates',
    scripts: 'client/assets/scripts',
    styles: 'client/assets/styles'
  },

  watch: {
    templates: 'client/templates/**/*.jade',
    scripts: 'client/scripts/**/*.js',
    styles: 'client/styles/**/*.less'
  }
};

/**** SCRIPTS ****/
gulp.task('scripts:clean', function (done) {
  del(paths.dest.scripts, done);
});

gulp.task('scripts:minify', ['scripts:clean'], function () {
  return gulp.src(paths.source.scripts).

  pipe(plumber(options.plumber)).

  pipe(sourcemaps.init()).

  pipe(concat('client.min.js')).

  pipe(uglify()).

  pipe(sourcemaps.write()).

  pipe(gulp.dest(paths.dest.scripts));
});

gulp.task('scripts', ['scripts:minify'], function () {
  return gulp.src(paths.source.scripts).

  pipe(plumber(options.plumber)).

  pipe(concat('client.js')).

  pipe(uglify({
    mangle: false,
    compress: false,
    output: {
      bracketize: true,
      indent_level: 2,
      beautify: true
    }
  })).

  pipe(gulp.dest(paths.dest.scripts));
});

/**** STYLES ****/
gulp.task('styles:clean', function (done) {
  del(paths.dest.styles, done);
});

gulp.task('styles:compile', ['styles:clean'], function () {
  return gulp.src(paths.source.styles).

  pipe(plumber(options.plumber)).

  pipe(less({
    paths: paths.styles
  })).

  pipe(gulp.dest(paths.dest.styles));
});

gulp.task('styles', ['styles:compile'], function () {
  return gulp.src(paths.source.styles).

  pipe(plumber(options.plumber)).

  pipe(sourcemaps.init()).

  pipe(less({
    paths: paths.styles
  })).

  pipe(minifycss()).

  pipe(sourcemaps.write()).

  pipe(rename({
    extname: '.min.css'
  })).

  pipe(gulp.dest(paths.dest.styles));
});

/**** TEMPLATES ****/
gulp.task('templates:clean', function (done) {
  del(paths.dest.templates, done);
});

gulp.task('templates', ['templates:clean'], function () {
  return gulp.src(paths.source.templates).

  pipe(plumber(options.plumber)).

  pipe(jade()).

  pipe(gulp.dest(paths.dest.templates));
});

/**** TASKS ****/
/* Build all */
gulp.task('build', ['scripts', 'styles', 'templates']);

/* Default task */
gulp.task('default', ['build']);

/* Watch for file changes */
gulp.task('watch', ['build'], function () {
  gulp.watch(paths.watch.templates, ['templates']);
  gulp.watch(paths.watch.scripts, ['scripts']);
  gulp.watch(paths.watch.styles, ['styles']);
});
