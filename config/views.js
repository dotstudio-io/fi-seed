/*jslint node: true, nomen: true */
'use strict';

var path = require('path');
var basedir = 'views';
var engine = 'jade';

module.exports = function (app) {

    app.locals.basedir = path.join(__dirname, '..', basedir);

    return {
        basedir: basedir,
        engine: engine
    };

};
