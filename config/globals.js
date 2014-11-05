/*jslint node: true, nomen: true */
'use strict';

var path = require('path');

module.exports = function (global) {

    /**
     * Use this to include a script relative to the root folder.
     */
    function include(folder, name) {
        var target = path.normalize(path.join(process.cwd(), folder, name));

        try {
            return require(target);
        } catch (ex) {
            console.error('\n\x1b[33m\x1b[1m>>\x1b[0m', ex, '\n');
            return null;
        }
    }

    /**
     * Use this method to include Schemas from anywhere
     */
    global.schema = function schema(name) {
        return include('schemas', name);
    };

    /**
     * Use this method to include Components from anywhere
     */
    global.component = function component(name) {
        return include('components', name);
    };

    /**
     * Global fatal error handler.
     * 
     * Prints an error and exists the app.
     */
    global.panic = function panic() {
        console.error('\x1b[31m\x1b[1m'); /* Paint it red and fat */
        console.error.apply(console, arguments);
        console.error('\x1b[0m'); /* Reset colors */
        console.error("Exiting application...\n\n");

        /* We don't want the app to keep running if it panics */
        process.exit(1);
    };

};