'use strict';

const PRODUCTION = process.env.NODE_ENV === 'production';
const SELF = '\'self\'';

module.exports = {

  csrf: {
    header: 'csrf-token',
    cookie: {
      name: 'CSRF',
      options: {
        sameSite: PRODUCTION,
        secure: PRODUCTION
      }
    }
  },

  xframe: 'DENY',

  xssProtection: true,

  csp: {
    policy: {
      'img-src': `${ SELF } blob: data: loremflickr.com`,
      'default-src': SELF
    }
  },

  hsts: {
    includeSubDomains: true,
    maxAge: 31536000
  }

};
