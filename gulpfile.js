'use strict';

const expect = require('gulp-expect-file');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const jade = require('gulp-jade');
const sass = require('gulp-sass');
const gulp = require('gulp');
const del = require('del');

const options = {
  errorHandler: function (err) {
    console.dir(err, {
      showHidden: true,
      colors: true,
      depth: 8
    });

    this.emit('end');
  }
};

/**** PATHS ****/
const paths = {
  source: {

    templates: ['client/templates/**/*.jade'],

    styles: [
      'client/styles/client.scss'
    ],

    scripts: [
      'client/scripts/app.js',

      'client/scripts/modules/**/*.js',
      'client/scripts/filters/**/*.js',
      'client/scripts/services/**/*.js',
      'client/scripts/routes/**/*.js',
      'client/scripts/controllers/**/*.js',
      'client/scripts/directives/**/*.js',

      'client/scripts/main.js'
    ]
  },

  dest: {
    templates: 'client/assets/templates',
    scripts: 'client/assets/scripts',
    styles: 'client/assets/styles'
  },

  watch: {
    templates: 'client/templates/**/*.jade',
    scripts: 'client/scripts/**/*.js',
    styles: 'client/styles/**/*.scss'
  }
};

/**** SCRIPTS ****/
gulp.task('scripts:clean', function () {
  del(paths.dest.scripts);
});

gulp.task('scripts:minify', ['scripts:clean'], function () {
  return gulp.src(paths.source.scripts).

  pipe(expect(paths.source.scripts)).

  pipe(plumber(options)).

  pipe(uglify()).

  pipe(concat('client.min.js')).

  pipe(gulp.dest(paths.dest.scripts));
});

gulp.task('scripts:compile', ['scripts:clean'], function () {
  return gulp.src(paths.source.scripts).

  pipe(expect(paths.source.scripts)).

  pipe(plumber(options)).

  pipe(concat('client.js')).

  pipe(gulp.dest(paths.dest.scripts));
});

/**** TEMPLATES ****/
gulp.task('templates:clean', function () {
  del.sync(paths.dest.templates);
});

gulp.task('templates:compile', ['templates:clean'], function () {
  return gulp.src(paths.source.templates).

  pipe(expect(paths.source.templates)).

  pipe(plumber(options)).

  pipe(jade({
    basedir: 'client/templates'
  })).

  pipe(gulp.dest(paths.dest.templates));
});

/**** STYLES ****/
gulp.task('styles:clean', function () {
  del.sync(paths.dest.styles);
});

gulp.task('styles:compile', ['styles:clean'], function () {
  return gulp.src(paths.source.styles).

  pipe(expect(paths.source.styles)).

  pipe(plumber(options)).

  pipe(sass().on('error', sass.logError)).

  pipe(gulp.dest(paths.dest.styles));
});

gulp.task('styles:minify', ['styles:clean'], function () {
  return gulp.src(paths.source.styles).

  pipe(expect(paths.source.styles)).

  pipe(plumber(options)).

  pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError)).

  pipe(rename({
    extname: '.min.css'
  })).

  pipe(gulp.dest(paths.dest.styles));
});

/**** TASKS ****/
/* Compile all without minification */
gulp.task('compile', ['scripts:compile', 'styles:compile', 'templates:compile']);

/* Compile and minify all */
gulp.task('default', ['scripts:minify', 'styles:minify', 'templates:compile']);

/* Watch for file changes */
gulp.task('watch', ['compile'], function () {
  gulp.watch(paths.watch.templates, ['templates:compile']);
  gulp.watch(paths.watch.scripts, ['scripts:compile']);
  gulp.watch(paths.watch.styles, ['styles:compile']);
});
