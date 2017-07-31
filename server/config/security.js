'use strict';

const SELF = '\'self\'';

module.exports = {

  csrf: {
    header: '6nUJKF-fN1sy-JPbez',
    cookie: {
      name: 'BvUR4IgEfeAp0WR2',
      options: {
        secure: process.env.NODE_ENV === 'production', // Serve secure cookies in production (requires HTTPS)
        httpOnly: false, // Must be accessed by AngularJS
        sameSite: true
      }
    }
  },

  xframe: 'DENY',

  xssProtection: true,

  csp: {
    policy: {
      'img-src': `${ SELF } loremflickr.com`,
      'default-src': SELF
    }
  },

  hsts: {
    includeSubDomains: true,
    maxAge: 31536000
  },

  nosniff: true

};