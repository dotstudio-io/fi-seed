/*jslint node: true */
'use strict';

module.exports = {
    p3p: 'ABCDEF',
    csrf: {
        header: 'x-xsrf-token'
    },
    xframe: 'SAMEORIGIN',
    xssProtection: true,
    csp: {
        "default-src": "'self'",
        "report-uri": "http://localhost/myCspReporter" /* This URL does not exists in this app. You must provide your own. */
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true
    }
};
