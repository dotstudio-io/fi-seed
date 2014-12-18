/* jshint node: true */
'use strict';

module.exports = {

    authorize: function (req, res, next) {
        if (req.session.user && req.session.workplace) {
            req.session.authorize = 'user workplace';
        } else if (req.session.user) {
            req.session.authorize = 'user';
        } else {
            req.session.authorize = null;
        }

        next();
    },

    routes: [
        {
            path: ['/', '/help', '/recover', '/signup', '/api/session'],
            allows: true
        },
        {
            path: ['/welcome'],
            allows: 'user'
        },
        {
            path: ['/worktable/*', '/sics/*'],
            allows: 'user workplace'
        }

    ]
};
