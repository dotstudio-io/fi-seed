'use strict';

module.exports = {

  p3p: 'ABCDEF',

  csrf: {
    angular: true
  },

  xframe: 'DENY',

  xssProtection: true,

  csp: {
    policy: {
      'img-src': "http://lorempixel.com 'self'",
      'style-src': "*.googleapis.com 'self'",
      'font-src': "*.gstatic.com 'self'",
      'default-src': "'self'"
    }
  },

  hsts: {
    includeSubDomains: true,
    maxAge: 31536000
  }

};
