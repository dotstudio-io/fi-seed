'use strict';

var debug = require('debug')('app:statics');
var mongoose = require('mongoose');

module.exports = {

  models: [],

  model: function (model, slug) {
    return this.models[model][slug];
  },

  load: function statics(config, done) {
    var models = this.models;
    var total = config.models.length;
    var count = 0;
    var Model;

    config.models.forEach(function (model) {
      try {
        Model = mongoose.model(config.prefix + '.' + model);

        Model.find(function (err, results) {
          var tt = 0;
          var cc = 0;

          count++;

          if (err) {
            debug("Could not retrieve %s.%s!", config.prefix, model);
          } else if (!results.length) {
            debug("There is no data for %s.%s!", config.prefix, model);
          } else {
            tt += results.length;

            models[model] = {};

            results.forEach(function (result) {
              cc++;

              models[model][result.slug] = result;

              debug("%s.%s.%s --> %s", config.prefix, model, result.slug, result._id);
            });
          }

          if (tt === cc && count === total) {
            done();
          }
        });
      } catch (ex) {
        debug("Could not load %s.%s!", config.prefix, model);
      }
    });
  }

};
