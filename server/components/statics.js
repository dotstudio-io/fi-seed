'use strict';

var debug = require('debug')('app:statics');
var mongoose = require('mongoose');
var path = require('path');
var walk = require('walk');

module.exports = {

  models: [],

  model: function (model, slug) {
    return this.models[model][slug];
  },

  load: function statics(config, done) {
    var walker = walk.walk(config.basedir);
    var models = this.models;

    walker.on('file', function (root, stats, next) {
      if (path.extname(stats.name) !== '.js') {
        return next();
      }

      var model = path.basename(stats.name, '.js');
      var Model = mongoose.model(config.prefix + '.' + model);

      Model.find(function (err, results) {
        if (err) {
          debug("Could not retrieve %s.%s!", config.prefix, model);
          return next();
        }

        if (!results.length) {
          debug("There is no data for %s.%s!", config.prefix, model);
          return next();
        }

        models[model] = {};

        results.forEach(function (result) {
          models[model][result.slug] = result;

          debug("%s.%s.%s --> %s", config.prefix, model, result.slug, result._id);
        });

        next();
      });
    });

    walker.on('error', function (root, stats) {
      panic("Could not register statics!\n", root, stats);
    });

    walker.on('end', done);

  }

};
