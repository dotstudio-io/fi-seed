'use strict';

const gulp = require('gulp');
const del = require('del');

/**** PATHS ****/
const paths = {
  source: require('./build/paths/source.json'),
  dest: require('./build/paths/dest.json'),
  watch: require('./build/paths/watch.json')
};

/**** Output file names ****/
const outfiles = {
  scripts: 'client',
  styles: 'client'
};

/**** SCRIPTS ****/
const scripts = require('./build/scripts');

gulp.task('scripts:clean', () => {
  del(paths.dest.scripts);
});

gulp.task('scripts:minify', ['scripts:clean'], () => {
  var files = paths.source.scripts.min.concat(paths.source.scripts.all);
  return scripts(outfiles.scripts, files, true, paths.dest.scripts);
});

gulp.task('scripts:compile', ['scripts:clean'], () => {
  var files = paths.source.scripts.dev.concat(paths.source.scripts.all);
  return scripts(outfiles.scripts, files, false, paths.dest.scripts);
});

/**** TEMPLATES ****/
const templates = require('./build/templates');

gulp.task('templates:clean', () => {
  del.sync(paths.dest.templates);
});

gulp.task('templates:compile', ['templates:clean'], () => {
  return templates(paths.source.templates, false, paths.dest.templates);
});

gulp.task('templates:minify', ['templates:clean'], () => {
  return templates(paths.source.templates, true, paths.dest.templates);
});

/**** STYLES ****/
const styles = require('./build/styles');

gulp.task('styles:clean', () => {
  del.sync(paths.dest.styles);
});

gulp.task('styles:minify', ['styles:clean'], () => {
  var files = paths.source.styles;
  return styles(outfiles.styles, files, true, paths.dest.styles);
});

gulp.task('styles:compile', ['styles:clean'], () => {
  var files = paths.source.styles;
  return styles(outfiles.styles, files, false, paths.dest.styles);
});

/**** LOCALES ***/
const locales = require('./build/locales');

gulp.task('locales:clean', () => {
  del.sync(paths.dest.locales);
});

gulp.task('locales:minify', ['locales:clean'], () => {
  return locales(paths.source.locales, true, paths.dest.locales);
});

gulp.task('locales:compile', ['locales:clean'], () => {
  return locales(paths.source.locales, false, paths.dest.locales);
});

/**** FONTS ****/
gulp.task('fonts:copy', () => {
  return gulp.src(paths.source.fonts).
  pipe(gulp.dest(paths.dest.fonts));
});

/**** TASKS ****/
/* Compile all without minification */
gulp.task('compile', ['scripts:compile', 'styles:compile', 'templates:compile', 'locales:compile', 'fonts:copy']);

/* Compile and minify all */
gulp.task('default', ['scripts:minify', 'styles:minify', 'templates:minify', 'locales:minify', 'fonts:copy']);

/* Watch for file changes */
gulp.task('watch', ['compile'], () => {
  gulp.watch(paths.watch.templates, ['templates:compile']);
  gulp.watch(paths.watch.locales, ['locales:compile']);
  gulp.watch(paths.watch.scripts, ['scripts:compile']);
  gulp.watch(paths.watch.styles, ['styles:compile']);
});
