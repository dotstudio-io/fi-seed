/*jshint node: true */
'use strict';

var grunt = require('grunt');

module.exports = function (env) {
    console.log("\x1b[1mStarting Grunt with \x1b[36m" + env + "\x1b[0m\x1b[1m tasks...\x1b[0m");

    grunt.tasks(env, {}, function() {
        grunt.log.ok("Done running tasks");
    });
};
