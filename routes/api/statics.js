/* jshint node: true */
'use strict';

var util = require('util');
var inflection = require('inflection');

module.exports = function (router, mongoose) {

  /** Get statics by name */
  router.get('/', function (req, res, next) {

    var curr, total, regexp, model, name,
        statics = req.query.statics,
        results = {};

    /** 
     * Finds the next static
     */
    function findNext() {
      /* Check if there are any more statics to find */
      if (curr === total) {
        if (Object.keys(results).length) {
          res.send(results);
        } else {
          res.status(400).end();
        }
      } else {
        name = statics[curr];
        model = mongoose.model('static.' + inflection.singularize(name));
        curr += 1;

        /* If the model exists, find it */
        if (model) {
          model.find(function (err, data) {
            if (err) {
              console.error(err);
            } else if (data) {
              results[name] = data;
            }

            findNext();
          });
        } else {
          findNext();
        }
      }
    }

    /* Convert the static name string to array if necessary */
    if (typeof statics === 'string') {
      statics = [statics];
    }

    /* Check if there are static names to find */
    if (Array.isArray(statics)) {
      total = statics.length;
      curr = 0;

      findNext();
    } else {
      res.status(400).end();
    }

  });

};
