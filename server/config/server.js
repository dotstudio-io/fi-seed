'use strict';

var path = require('path');
var fs = require('fs');

var credentials = path.join(__serverdir, 'credentials');

module.exports = {

  https: {
    /* These are insecure, self-signed keys and you must provide your own */
    key: fs.readFileSync(path.join(credentials, 'server-key.pem')),
    cert: fs.readFileSync(path.join(credentials, 'server-cert.pem')),
    ca: fs.readFileSync(path.join(credentials, 'server-ca.pem'))
  },

  /* Server ports */
  ports: {
    https: 3443,
    http: 3080
  }

};
