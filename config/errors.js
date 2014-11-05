/*jshint node: true */
'use strict';

module.exports = function (app) {

    /* Catch 404 and forward it to the error handler... */
    app.use(function notFound(req, res, next) {
        var err = new Error("Looks like you are lost...");
        err.status = 404;

        next(err);
    });

    /* Error handler */
    app.use(function errorHandler(err, req, res, next) {
        var dev = app.get('env') === 'development',
            locals = {};

        res.status(err.status || 500);

        console.log("\n\x1b[33m\x1b[1m[!]\x1b[0m\x1b[1m Catched an error\x1b[0m");
        console.error(err);
        console.log("\x1b[0m");

        if (req.xhr) {
            if (dev) {
                res.send(err);
            } else {
                res.end();
            }
        } else {
            if (dev) {
                locals.error = err;
            } else {
                locals.error = {
                    message: err.message,
                    status: err.status
                };
            }

            res.render('error', locals);
        }
    });

};
