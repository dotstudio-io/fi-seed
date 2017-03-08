'use strict';

const CONSTS = require('fi-consts');

const HTTP_CODE_OK = CONSTS.CODES.HTTP.OK;

const PATH = '/api/health';
const GET = 'GET';

module.exports = (req, res, next) => {
  if (req.method === GET  && req.path === PATH) {
    return res.sendStatus(HTTP_CODE_OK);
  }

  next();
};
