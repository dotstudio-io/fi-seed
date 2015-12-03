'use strict';

var minifycss = require('gulp-minify-css');
var expect = require('gulp-expect-file');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jade = require('gulp-jade');
var less = require('gulp-less');
var gulp = require('gulp');
var del = require('del');

var options = {
  plumber: {
    errorHandler: function (err) {
      console.dir(err, {
        showHidden: true,
        colors: true,
        depth: 8
      });

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
      'client/scripts/filters/**/*.js',
      'client/scripts/services/**/*.js',
      'client/scripts/routes/**/*.js',
      'client/scripts/controllers/**/*.js',
      'client/scripts/directives/**/*.js',

      'client/scripts/main.js'
    ],

    styles: 'client/styles/client.less',

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
gulp.task('scripts:clean', function () {
  del.sync(paths.dest.scripts);
});

gulp.task('scripts:compile', ['scripts:clean'], function () {
  return gulp.src(paths.source.scripts).

  pipe(expect(paths.source.scripts)).

  pipe(plumber(options.plumber)).

  pipe(concat('client.js')).

  pipe(gulp.dest(paths.dest.scripts));
});

gulp.task('scripts:minify', ['scripts:clean'], function () {
  return gulp.src(paths.source.scripts).

  pipe(expect(paths.source.scripts)).

  pipe(plumber(options.plumber)).

  pipe(concat('client.min.js')).

  pipe(uglify({
    compress: true,
    mangle: true
  })).

  pipe(gulp.dest(paths.dest.scripts));
});

/**** STYLES ****/
gulp.task('styles:clean', function () {
  del.sync(paths.dest.styles);
});

gulp.task('styles:compile', ['styles:clean'], function () {
  return gulp.src(paths.source.styles).

  pipe(expect(paths.source.styles)).

  pipe(plumber(options.plumber)).

  pipe(less({
    paths: paths.styles
  })).

  pipe(rename({
    basename: 'client',
    extname: '.css'
  })).

  pipe(gulp.dest(paths.dest.styles));
});

gulp.task('styles:minify', ['styles:clean'], function () {
  return gulp.src(paths.source.styles).

  pipe(expect(paths.source.styles)).

  pipe(plumber(options.plumber)).

  pipe(less({
    paths: paths.styles
  })).

  pipe(minifycss()).

  pipe(rename({
    basename: 'client',
    extname: '.min.css'
  })).

  pipe(gulp.dest(paths.dest.styles));
});

/**** TEMPLATES ****/
gulp.task('templates:clean', function () {
  del.sync(paths.dest.templates);
});

gulp.task('templates:compile', ['templates:clean'], function () {
  return gulp.src(paths.source.templates).

  pipe(expect(paths.source.templates)).

  pipe(plumber(options.plumber)).

  pipe(jade({
    basedir: 'client/templates',
    pretty: true
  })).

  pipe(gulp.dest(paths.dest.templates));
});

gulp.task('templates:minify', ['templates:clean'], function () {
  return gulp.src(paths.source.templates).

  pipe(expect(paths.source.templates)).

  pipe(plumber(options.plumber)).

  pipe(jade({
    basedir: 'client/templates'
  })).

  pipe(gulp.dest(paths.dest.templates));
});

/**** TASKS ****/
/* Compile all without minification */
gulp.task('compile', ['scripts:compile', 'styles:compile', 'templates:compile']);

/* Compile and minify all */
gulp.task('default', ['scripts:minify', 'styles:minify', 'templates:minify']);

/* Watch for file changes */
gulp.task('watch', ['compile'], function () {
  gulp.watch(paths.watch.templates, ['templates:compile']);
  gulp.watch(paths.watch.scripts, ['scripts:compile']);
  gulp.watch(paths.watch.styles, ['styles:compile']);
});
