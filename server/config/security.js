'use strict';

const SELF = '\'self\'';

module.exports = {

  // p3p: 'ABCDEF',

  csrf: {
    header: '6nUJKF-fN1sy-JPbez',
    cookie: 'BvUR4IgEfeAp0WR2'
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
  }

};