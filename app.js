/* jshint node: true */
/* global panic, getconf, component */
'use strict';

/**** Modules *****/
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var compression = require('compression');
var bodyParser = require('body-parser');
var multiParser = require('./components/multiparse');
var security = require('lusca');
var session = require('express-session');
var sockets = require('./sockets');
var logger = require('morgan');
var path = require('path');
var debug = require('debug')('app:main');


/**** Register globals *****/
require('./globals')(global);


/**** Configuration ****/
var configs = {
    server: getconf('server'),
    security: getconf('security'),
    database: getconf('database'),
    session: getconf('session')(session),
    routes: getconf('routes'), /* Routes must be compiled later */
    schemas: getconf('schemas'),
    views: getconf('views')(app),
    tasks: getconf('tasks'),
    errors: getconf('errors'),
    static: getconf('static'),
    auth: getconf('auth')
};


/**** Setup ****/
app.set('port', process.env.PORT || configs.server.port);
app.set('views', path.join(process.cwd(), configs.views.basedir));
app.set('view engine', configs.views.engine);

/*- Production setup */
if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // Trust first proxy
    configs.session.cookie.secure = true; // Serve secure cookies
}

/**** Settings ****/
/* Keep this order:
 *
 * 1.- Session
 * 2.- Cookie Parser
 * 3.- Body Parser
 * 4.- Multipart Parser
 * 5.- Compression
 * 6.- Security [...]
 * 7.- Anything else...
 */
app.use(session(configs.session));
app.use(configs.session.cookieParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(multiParser());
app.use(compression());
app.use(security.csrf(configs.security.csrf));
app.use(security.csp(configs.security.csp));
app.use(security.xframe(configs.security.xframe));
app.use(security.p3p(configs.security.p3p));
app.use(security.hsts(configs.security.hsts));
app.use(security.xssProtection(configs.security.xssProtection));
app.use(express.static(configs.static));
app.use(logger('dev'));

/**** Auth ****/
// component('auth')(app, configs.auth);

/**** Routes ****/
configs.schemas(); /* Register schemas */
configs.routes(app); /* Compile routes */
configs.errors(app); /* Error handlers */
configs.tasks(app.get('env')); /* Perform grunt tasks */

/**** Initialization *****/
configs.database(function (err) {
    if (err) {
        panic("Couldn't connect to the database");
    } else {
        http.listen(app.get('port'), function () {
            console.log("\n\x1b[1mServer listening on port \x1b[36m%d", app.get('port'), '\x1b[0m\n');

            sockets(io, configs.session); /* Initialize sockets */
        });
    }
});
