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
        results.roles = [];

        for (prop in CONSTS.ROLES) {
          results.roles.push(CONSTS.ROLES[prop].SLUG);
        }

        break;

      case GENDERS:
        results.genders = [];

        for (prop in CONSTS.GENDERS) {
          results.genders.push(CONSTS.GENDERS[prop]);
        }

        break;
      }
    });

    res.send(results);

  });

};
