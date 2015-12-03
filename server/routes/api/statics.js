'use strict';

var inflection = require('inflection');

module.exports = function (router, db) {

  /** Get statics by name */
  router.get('/', function (req, res) {

    var statics = req.query.statics;

    /* Convert the static name string to array if necessary */
    if (typeof statics === 'string') {
      statics = [statics];
    }

    /* Check if there are statics to find */
    if (!Array.isArray(statics)) {
      return res.status(400).end();
    }

    var curr, total, model, name;
    var results = {};

    /**
     * Finds the next static
     */
    function findNext() {
      /* Check if there are any more statics to find */
      if (curr === total) {
        if (!Object.keys(results).length) {
          /* No results */
          return res.status(404).end();
        }

        return res.send(results);
      }

      name = statics[curr];
      model = db.model('static.' + inflection.singularize(name));
      curr += 1;

      if (!model) {
        return findNext();
      }

      /* If the model exists, find it */
      model.find().

      sort('_id').

      exec(function (err, data) {
        if (err) {
          console.dir(err);
        } else if (data) {
          results[name] = data;
        }

        findNext();
      });
    }

    total = statics.length;
    curr = 0;

    findNext();
  });

};
