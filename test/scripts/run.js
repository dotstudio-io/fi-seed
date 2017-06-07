'use strict';

const config = require('../config.js'); // Always initialize config first
const utils = require('./utils.js')(config); 
const expect = require('chai').expect;
const mongoose = require('mongoose');
const request = require('request');
const moment = require('moment');
const Mocha = require('mocha');

const mocha = new Mocha(config.mocha);

var req;

/* Load test files */
utils.loadTests(mocha);

/* Load mongoose schemas */
utils.loadSchemas(mongoose);

/* Load test mock data */
utils.loadMockData();

/* Connect to test database */
utils.database(mongoose, () => {
  mongoose.Promise = Promise;

  /* Set request defaults */
  req = request.defaults({
    baseUrl: config.url + config.port, // Following queries will start with...
    strictSSL: false, // Don't panic with insecure app
    jar: true // Store app cookies in a jar
  });

  /* Retrieve CSRF Token and set it default */
  req('/', (err, res) => {

    req = req.defaults({
      headers: {
        '6nUJKF-fN1sy-JPbez': utils.parseCSRF(res),
        'origin': config.url + config.port
      }
    });

    /* Expose global objects and functions */
    global.mongoose = mongoose;
    global.config = config;
    global.moment = moment;
    global.expect = expect;
    global.utils = utils;
    global.req = req;

    mocha.run((failures) => {
      process.exit(failures);
    });
  });
});
