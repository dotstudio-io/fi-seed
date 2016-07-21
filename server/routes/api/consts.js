'use strict';

const CONSTS = require('fi-consts');
const is = require('fi-is');

const HTTP_CODE_BAD_REQUEST = CONSTS.CODES.HTTP.BAD_REQUEST;
const GENDERS = 'GENDERS';
const ROLES = 'ROLES';

module.exports = (router) => {

  router.get('/', (req, res) => {

    if (is.string(req.query.consts)) {
      req.query.consts = [req.query.consts];
    }

    if (is.not.array(req.query.consts) || is.empty(req.query.consts)) {
      return res.sendStatus(HTTP_CODE_BAD_REQUEST);
    }

    var results = {};

    req.query.consts.forEach((name) => {
      var NAME = name.toUpperCase();
      var prop;

      switch (NAME) {
      case ROLES:
      case GENDERS:
        results[name] = [];

        for (prop in CONSTS[NAME]) {
          results[name].push(CONSTS[NAME][prop]);
        }

        break;
      }
    });

    res.send(results);

  });

};
