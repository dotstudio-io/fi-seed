/*jslint node: true, nomen: true */
'use strict';


/** App modules */
var express = require('express');
var compression = require('compression');
var favicon = require('serve-favicon');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var security = require('lusca');
var io = require('socket.io')(http);
var sockets = require('./sockets')(io);
var session = require('express-session');
var debug = require('debug')(require('./package.json').name);

/** Configuration scripts */
var config = {
    globals: require('./config/globals')(global),
    security: require('./config/security'),
    database: require('./config/database'),
    routes: require('./config/routes'),
    session: require('./config/session')(session)
};


/** App setup */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/*- Production setup */
if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // Trust first proxy
    config.session.cookie.secure = true; // Serve secure cookies
}


/**
 * App settings
 * ------------
 * 
 * Keep order:
 * 
 * 1.- Session
 * 2.- Cookie Parser
 * 3.- Body Parser
 * 4.- Security
 * 5.- Everything else...
 */
app.use(session(config.session));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(security(config.security));

app.use(logger('dev'));
app.use(compression());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(express['static'](path.join(__dirname, 'public')));


/** Compile routes */
config.routes.forEach(function buildRoutes(route) {
    app.use(route, require('./routes' + route));
});


/** App error handling */
/* Catch 404 and forward to the error handler... */
app.use(function catchNotFound(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;

    next(err);
});

/* Error handler */
app.use(function errorHandler(err, req, res, next) {
    res.status(err.status || 500);

    if (req.xhr) { /* Check if the request was made via AJAX */
        res.send(err.message);
    } else {
        res.render('error', {
            message: err.message,
            error: (app.get('env') === 'development' ? err : {})
        });
    }
});


/** Initialization */
http.listen(app.get('port'), function onListen() {
    debug('Express server listening on port ' + app.get('port'));
});
