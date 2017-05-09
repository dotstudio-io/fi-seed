'use strict';

const gulp = require('gulp');
const del = require('del');

const SOURCE = './build/paths/source.json';
const WATCH = './build/paths/watch.json';
const DEST = './build/paths/dest.json';
const ERROR = 'error';

/**** PATHS ****/
const paths = {
  source: require(SOURCE),
  watch: require(WATCH),
  dest: require(DEST)
};

/**** Output file names ****/
const outfiles = {
  scripts: 'client',
  styles: 'client'
};

/**** RELOAD PATHS *****/
gulp.task('reload:paths', () => {
  /* Invalidate require cache */
  delete require.cache[require.resolve(SOURCE)];
  delete require.cache[require.resolve(WATCH)];
  delete require.cache[require.resolve(DEST)];

  /* Reload sources */
  paths.source = require(SOURCE);
  paths.watch = require(WATCH);
  paths.dest = require(DEST);
});

/**** SCRIPTS ****/
const scripts = require('./build/scripts');

gulp.task('scripts:clean', () => {
  del.sync(paths.dest.scripts);
});

gulp.task('scripts:minify', ['scripts:clean'], () => {
  var files = paths.source.scripts.min.concat(paths.source.scripts.all);
  return scripts(outfiles.scripts, files, true, paths.dest.scripts);
});

gulp.task('scripts:compile', () => {
  var files = paths.source.scripts.dev.concat(paths.source.scripts.all);
  return scripts(outfiles.scripts, files, false, paths.dest.scripts);
});

/**** TEMPLATES ****/
const templates = require('./build/templates');

gulp.task('templates:clean', () => {
  del.sync(paths.dest.templates);
});

gulp.task('templates:minify', ['templates:clean'], () => {
  return templates(paths.source.templates, true, paths.dest.templates);
});

gulp.task('templates:compile', () => {
  return templates(paths.source.templates, false, paths.dest.templates);
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

gulp.task('styles:compile', () => {
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

gulp.task('locales:compile', () => {
  return locales(paths.source.locales, false, paths.dest.locales);
});

/**** FONTS ****/
gulp.task('fonts:clean', () => {
  del.sync(paths.dest.fonts);
});

gulp.task('fonts:copy', () => {
  return gulp.src(paths.source.fonts).
  pipe(gulp.dest(paths.dest.fonts)).on('error', console.log.bind(console));
});

/**** TASKS ****/
/* Clean dest folders only */
gulp.task('clean', ['scripts:clean', 'styles:clean', 'templates:clean', 'locales:clean', 'fonts:clean']);

/* Compile all without minification */
gulp.task('compile', ['scripts:compile', 'styles:compile', 'templates:compile', 'locales:compile', 'fonts:copy']);

/* Compile and minify all */
gulp.task('default', ['scripts:minify', 'styles:minify', 'templates:minify', 'locales:minify', 'fonts:copy']);

/**** WATCH ****/

/* Watcher tasks */
const watchers = [
  [paths.watch.components, ['reload:paths', 'compile']],
  [paths.watch.paths, ['reload:paths', 'compile']],
  [paths.watch.templates, ['templates:compile']],
  [paths.watch.locales, ['locales:compile']],
  [paths.watch.scripts, ['scripts:compile']],
  [paths.watch.styles, ['styles:compile']]
];

/* Watch error handler */
function errorHandler(err) {
  console.error(err);
}

/* Watch for file changes */
gulp.task('watch', ['compile'], () => {
  /* Load watchers */
  for (let i = 0, l = watchers.length; i < l; i++) {
    gulp.watch.apply(gulp, watchers[i]).on(ERROR, errorHandler);
  }
});
