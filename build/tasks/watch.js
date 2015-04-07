/* jshint node: true */
'use strict';

var gulp = require('gulp');
var paths = require('../paths');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

/**
 * Outputs changes to files to the console.
 */
function reportChange(event) {
  console.log('File %s was %s, running tasks...', event.path, event.type);
}

//gulp.task('watch', ['watch-client', 'watch-server'], function () {
//
//  return console.log('Watching...');
//
//});

gulp.task('watch', ['build', 'watch-server', 'watch-client']);

/**
 * this task wil watch for changes to js, html, and css files and call the reportChange method.
 * Also, by depending on the serve task, it will instantiate a browserSync session.
 */
gulp.task('watch-client', ['browser-sync'], function () {

  gulp.watch(paths.client.scripts.source, [
    'build-system',
    reload
  ]).on('change', reportChange);

  gulp.watch(paths.client.templates.source, [
    'build-templates',
    reload
  ]).on('change', reportChange);

  gulp.watch(paths.client.styles.source, reload).on('change', reportChange);

});

/**
 * This task will watch for changes in the server code and restart the node app.
 * Also it will instantiate a browserSync session.
 */
gulp.task('watch-server', ['nodemon'], function () {

  gulp.watch(paths.server.scripts, reload).on('change', reportChange);

});
