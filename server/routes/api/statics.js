'use strict';

const inflection = require('inflection');
const statics = require('fi-statics');
const is = require('fi-is');

module.exports = (router) => {

  /** Get statics by name */
  router.get('/', (req, res) => {

    /* Convert the static name string to array if necessary */
    if (is.string(req.query.statics)) {
      req.query.statics = [req.query.statics];
    }

    /* Check if there are statics to find */
    if (is.array(req.query.statics) && is.not.empty(req.query.statics)) {
      var results = {};

      req.query.statics.forEach((model) => {
        if (is.string(model)) {
          var data = statics.get(inflection.singularize(model));

          if (data && is.not.empty(data)) {
            results[inflection.pluralize(model)] = data;
          }
        }
      });

      return res.send(results);
    }

    res.status(400).end();

  });

};
