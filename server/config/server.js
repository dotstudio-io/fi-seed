'use strict';

var path = require('path');
var fs = require('fs');

var credentials = path.join(__serverdir, 'credentials');

module.exports = {

  https: {
    /* These are insecure, self-signed keys and you must provide your own */
    key: fs.readFileSync(path.join(credentials, 'server.key')),
    cert: fs.readFileSync(path.join(credentials, 'server.crt')),
    ca: fs.readFileSync(path.join(credentials, 'server.csr'))
  },

  /* Server ports */
  ports: {
    https: 3443,
    http: 3080
  }

};
