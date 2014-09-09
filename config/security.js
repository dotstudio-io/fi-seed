/*jslint node: true */
'use strict';

module.exports = {
    p3p: true,
    csrf: true,
    xframe: 'SAMEORIGIN',
    xssProtection: true,
    csp: {
        "default-src": "'self'",
        "report-uri": "http://localhost/cspReporter"
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true
    }
};