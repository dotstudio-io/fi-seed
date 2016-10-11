'use strict';

const SELF = '\'self\'';
const SP = ' ';

module.exports = {

  p3p: 'ABCDEF',

  csrf: {
    angular: true
  },

  xframe: 'DENY',

  xssProtection: true,

  csp: {
    policy: {
      'img-src': [SELF, 'http://loremflickr.com'].join(SP),
      'default-src': SELF,
      'style-src': SELF,
      'font-src': SELF
    }
  },

  hsts: {
    includeSubDomains: true,
    maxAge: 31536000
  }

};
