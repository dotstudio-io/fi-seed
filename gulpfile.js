'use strict';

const expect = require('gulp-expect-file');
const cssnano = require('gulp-cssnano');
const htmlmin = require('gulp-htmlmin');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const jade = require('gulp-jade');
const sass = require('gulp-sass');
const gulpif = require('gulp-if');
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

    fonts: [
      'bower_components/bootstrap-sass/assets/fonts/**/*'
    ],

    templates: [
      'client/templates/**/*.jade',
      '!**/_includes/**/*.jade',
      '!**/_mixins/**/*.jade'
    ],

    styles: [
      'client/styles/bootstrap.scss',
      'client/styles/client.scss',
      'bower_components/angular/angular-csp.css'
    ],

    scripts: {
      dev: [
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js'
      ],

      min: [
        'bower_components/angular/angular.min.js',
        'bower_components/angular-route/angular-route.min.js'
      ],

      all: [
        'client/scripts/app.js',

        'client/scripts/modules/**/*.js',
        'client/scripts/routes/**/*.js',
        'client/scripts/controllers/**/*.js',
        'client/scripts/directives/**/*.js',
        'client/scripts/services/**/*.js',

        'client/scripts/main.js'
      ]
    }
  },

  dest: {
    templates: 'client/assets/templates',
    scripts: 'client/assets/scripts',
    styles: 'client/assets/styles',
    fonts: 'client/assets/fonts'
  },

  watch: {
    templates: 'client/templates/**/*.jade',
    scripts: 'client/scripts/**/*.js',
    styles: 'client/styles/**/*.scss'
  }
};

/**** SCRIPTS ****/
function scripts(name, files, min) {
  return gulp.src(files).

  pipe(expect(files)).

  pipe(plumber(options)).

  pipe(gulpif(min, uglify({
    mangle: true,
    compress: {
      drop_console: true,
      dead_code: true
    }
  }))).

  pipe(concat(name + (min ? '.min' : '') + '.js')).

  pipe(gulp.dest(paths.dest.scripts));
}

gulp.task('scripts:clean', () => {
  del(paths.dest.scripts);
});

gulp.task('scripts:minify', ['scripts:clean'], () => {
  var files = paths.source.scripts.min.concat(paths.source.scripts.all);
  return scripts('scripts', files, true);
});

gulp.task('scripts:compile', ['scripts:clean'], () => {
  var files = paths.source.scripts.dev.concat(paths.source.scripts.all);
  return scripts('scripts', files, false);
});

/**** TEMPLATES ****/
function templates(files, min) {
  return gulp.src(files).

  pipe(expect(files)).

  pipe(plumber(options)).

  pipe(jade({
    basedir: 'client/templates'
  })).

  pipe(gulpif(min, htmlmin({
    collapseWhitespace: true
  }))).

  pipe(gulp.dest(paths.dest.templates));
}

gulp.task('templates:clean', () => {
  del.sync(paths.dest.templates);
});

gulp.task('templates:compile', ['templates:clean'], () => {
  return templates(paths.source.templates, false);
});

gulp.task('templates:minify', ['templates:clean'], () => {
  return templates(paths.source.templates, true);
});

/**** STYLES ****/
function styles(name, files, min) {
  return gulp.src(files).

  pipe(expect(files)).

  pipe(plumber(options)).

  pipe(sass().on('error', sass.logError)).

  pipe(gulpif(min, cssnano())).

  pipe(concat(name + (min ? '.min' : '') + '.css')).

  pipe(gulp.dest(paths.dest.styles));
}

gulp.task('styles:clean', () => {
  del.sync(paths.dest.styles);
});

gulp.task('styles:minify', ['styles:clean'], () => {
  var files = paths.source.styles;
  return styles('styles', files, true);
});

gulp.task('styles:compile', ['styles:clean'], () => {
  var files = paths.source.styles;
  return styles('styles', files, false);
});

/**** FONTS ****/
gulp.task('fonts:copy', () => {
  return gulp.src(paths.source.fonts).
  pipe(gulp.dest(paths.dest.fonts));
});

/**** TASKS ****/
/* Compile all without minification */
gulp.task('compile', ['scripts:compile', 'styles:compile', 'templates:compile', 'fonts:copy']);

/* Compile and minify all */
gulp.task('default', ['scripts:minify', 'styles:minify', 'templates:minify', 'fonts:copy']);

/* Watch for file changes */
gulp.task('watch', ['compile'], () => {
  gulp.watch(paths.watch.templates, ['templates:compile']);
  gulp.watch(paths.watch.scripts, ['scripts:compile']);
  gulp.watch(paths.watch.styles, ['styles:compile']);
});
