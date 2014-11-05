/*jslint node: true, nomen: true */
/* global panic */
'use strict';


/**** Modules *****/
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cookieParser = require('cookie-parser');
var compression = require('compression');
var bodyParser = require('body-parser');
var multiParser = require('./components/multiparse');
var security = require('lusca');
var sockets = require('./sockets')(io);
var session = require('express-session');
var favicon = require('serve-favicon');
var logger = require('morgan');
var path = require('path');


/**** Configuration ****/
var config = {
    server: require('./config/server'),
    security: require('./config/security'),
    database: require('./config/database'),
    globals: require('./config/globals')(global),
    session: require('./config/session')(session),
    routes: require('./config/routes'), /* Routes must be compiled after */
    views: require('./config/views')(app),
    tasks: require('./config/tasks'),
    errors: require('./config/errors'),
    static: require('./config/static')
};


/**** Setup ****/
app.set('port', process.env.PORT || config.server.port);
app.set('views', path.join(process.cwd(), config.views.basedir));
app.set('view engine', config.views.engine);

/*- Production setup */
if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // Trust first proxy
    config.session.cookie.secure = true; // Serve secure cookies
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
app.use(session(config.session));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(multiParser());
app.use(compression());
app.use(security.csrf(config.security.csrf));
app.use(security.csp(config.security.csp));
app.use(security.xframe(config.security.xframe));
app.use(security.p3p(config.security.p3p));
app.use(security.hsts(config.security.hsts));
app.use(security.xssProtection(config.security.xssProtection));
//app.use(favicon(path.join(config.static, 'favicon.png')));
app.use(express.static(config.static));
app.use(logger('dev'));

/**** Routes ****/
config.routes(app); /* Compile routes */
config.errors(app); /* Error handlers */

/**** Initialization *****/
config.database(function (err) {
    if (err) {
        panic("Couldn't connect to the database");
    } else {
        http.listen(app.get('port'), function () {
            console.log("\x1b[1mServer listening on port \x1b[36m%d\n\x1b[0m", app.get('port'));
            
            config.tasks(app.get('env'));
        });
    }
});
