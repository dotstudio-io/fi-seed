'use strict';

var path = require('path');
var fs = require('fs');

var credentials = path.join(__serverdir, 'credentials');

module.exports = {

  key: fs.readFileSync(path.join(credentials, 'privatekey.pem')),

  cert: fs.readFileSync(path.join(credentials, 'certificate.pem')),

  ca: fs.readFileSync(path.join(credentials, 'certrequest.csr')),

  /**
   * This is a port prefix that will be prepended to '080' (http) or '443' (https).
   *
   * Set to 0 to use '80' (http) and '443' (https).
   */
  portPrefix: 3

};
