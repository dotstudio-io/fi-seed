'use strict';

const path = require('path');
const fs = require('fs');

const CRED_DIR = path.join(__serverdir, 'credentials');
const CERT = 'server-cert.pem';
const KEY = 'server-key.pem';
const CA = 'server-ca.pem';

module.exports = {

  credentials: {
    /* These are insecure, self-signed keys for development only */
    cert: fs.readFileSync(path.join(CRED_DIR, CERT)),
    key: fs.readFileSync(path.join(CRED_DIR, KEY)),
    ca: fs.readFileSync(path.join(CRED_DIR, CA))
  },

  /* Server ports */
  port: 3080

};
