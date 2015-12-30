'use strict';

var path = require('path');
var fs = require('fs');

var credentials = path.join(__serverdir, 'credentials');

module.exports = {

  /**
   * These are insecure, self-signed keys. You must place your own.
   */
  key: fs.readFileSync(path.join(credentials, 'server.key')),

  cert: fs.readFileSync(path.join(credentials, 'server.crt')),

  ca: fs.readFileSync(path.join(credentials, 'server.csr')),

  /**
   * This is a port prefix that will be prepended to '080' (http) or '443' (https).
   *
   * Set to 0 to use '80' (http) and '443' (https).
   */
  portPrefix: 3

};
