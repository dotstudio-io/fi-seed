'use strict';

// Include application globals
require('../server/globals')(global);

global.__testdir = __dirname;

const CONSTS = require('fi-consts');
const moment = require('moment');
const path = require('path');

CONSTS.load(config('consts'));

const PORT = config('server.js').port;
const URL = 'https://localhost:';
const DATABASE = 'fi-seed';
const HOST = 'localhost';

const PATHS = {
  schemas: path.join(__serverdir, 'schemas'),
  tests: path.join(__testdir, 'files')
};

const DATA = {
  tests: path.join(__testdir, 'data', 'tests.json'),
  mock: path.join(__testdir, 'data', 'mock')
};

const TEST_DATE = moment();

const MOCHA = {
  bail: true, // Stop tests on error
  timeout: 10000 // Max waittime for each test
};

const TEST_NAME = [
  TEST_DATE.year(),
  TEST_DATE.month() + 1,
  TEST_DATE.date(),
  TEST_DATE.hours(),
  TEST_DATE.minutes(),
  TEST_DATE.seconds()
].join('-');

const CONFIG = {
  TEST_DATE: TEST_DATE,
  TEST_NAME: TEST_NAME,
  CONSTS: CONSTS,

  database: DATABASE,
  paths: PATHS,
  mocha: MOCHA,
  data: DATA,
  host: HOST,
  port: PORT,
  url: URL
};


module.exports = CONFIG;