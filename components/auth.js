/* jshint node: true */
'use strict';

var debug = require('debug')('app:auth');

module.exports = function (app, config) {

    /* Set the session authorize object */
    app.all('*', config.authorize);

    config.routes.forEach(function (route) {
        
        debug("%s --> %s", route.path, route.allows);

        app.use(route.path, function (req, res, next) {
            
            if (typeof route.allows === 'boolean' && route.allows) {
                next();
            } else if (typeof route.allows === 'string') {

                if (req.session.authorize === route.allows) {
                    next();
                } else {
                    res.status(403).end();
                }

            } else {
                res.status(403).end();
            }

        });

    });

};
