'use strict';

const SELF = '\'self\'';

module.exports = {

  // p3p: 'ABCDEF',

  csrf: {
    angular: true
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
