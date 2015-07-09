'use strict';

var sourcemaps = require('gulp-sourcemaps');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jade = require('gulp-jade');
var less = require('gulp-less');
var gulp = require('gulp');
var del = require('del');

var paths = {
  scripts: [
    'client/app.js',

    'client/modules/**/*.js',
    'client/services/**/*.js',
    'client/routes/**/*.js',
    'client/controllers/**/*.js',
    'client/directives/**/*.js',

    'client/main.js'
  ],

  styles: [
    'client/styles/styles.less'
  ],

  templates: [
    'client/templates/**/*.jade'
  ],

  output: {
    templates: 'client/assets/templates',
    scripts: 'client/assets/scripts',
    styles: 'client/assets/styles'
  },

  watch: [
    'client/!(assets)/**/*'
  ]
};

/**** SCRIPTS ****/

gulp.task('scripts:clean', function (done) {
  del(paths.output.scripts, done);
});

gulp.task('scripts:minify', ['scripts:clean'], function () {
  return gulp.src(paths.scripts).

  pipe(sourcemaps.init()).

  pipe(concat('client.min.js')).

  pipe(uglify()).

  pipe(sourcemaps.write()).

  pipe(gulp.dest(paths.output.scripts));
});

gulp.task('scripts', ['scripts:minify'], function () {
  return gulp.src(paths.scripts).

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

  pipe(gulp.dest(paths.output.scripts));
});

/**** STYLES ****/

gulp.task('styles:clean', function (done) {
  del(paths.output.styles, done);
});

gulp.task('styles:compile', ['styles:clean'], function () {
  return gulp.src(paths.styles).

  pipe(less({
    paths: paths.styles
  })).

  pipe(gulp.dest(paths.output.styles));
});

gulp.task('styles', ['styles:compile'], function () {
  return gulp.src(paths.styles).

  pipe(sourcemaps.init()).

  pipe(less({
    paths: paths.styles
  })).

  pipe(minifycss()).

  pipe(sourcemaps.write()).

  pipe(rename({
    extname: '.min.css'
  })).

  pipe(gulp.dest(paths.output.styles));
});

/**** TEMPLATES ****/

gulp.task('templates:clean', function (done) {
  del(paths.output.templates, done);
});

gulp.task('templates', ['templates:clean'], function () {
  return gulp.src(paths.templates).

  pipe(jade()).

  pipe(gulp.dest(paths.output.templates));
});

/**** TASKS ****/
/* Build all */
gulp.task('build', ['scripts', 'styles', 'templates']);

/* Default task */
gulp.task('default', ['build']);

/* Watch for file changes */
gulp.task('watch', ['build'], function () {
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
});
