'use strict';

require('colors');

var connection = require('../server/config/mongoose');
var inflection = require('inflection');
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');

connection(function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  var inserted = 0;
  var jsons = [];
  var index = 0;

  function next() {
    /* Check if all the files were processed */
    if (index === jsons.length) {
      if (inserted === jsons.length) {
        console.log("\nEverything was inserted!\n".bold);
      } else {
        console.log("\nSome insertions were not made\n".bold.yellow);
      }

      /* Finish the process successfully */
      process.exit(0);
    }

    var data, Model;
    var json = jsons[index];

    index++;

    console.log("\n%s...".bold, json);

    /* Read the JSON data */
    try {
      data = require('./statics/' + json);
    } catch (ex) {
      console.error(ex);
      console.log("\nAre you sure it's a valid JSON file?".bold.red);
    }

    /* Load the model on mongoose */
    try {
      var basename = path.basename(json, '.json');
      var schemaname = inflection.singularize(basename);
      var modelname = 'static.' + basename;

      var schema = require('../server/schemas/static/' + schemaname)(mongoose.Schema);

      Model = mongoose.model(modelname, schema);
    } catch (ex) {
      console.error(ex);
      console.log("\nHave you created the schema?".bold.red);
    }

    if (!data || !Model) {
      return next();
    }

    var total = data.length;
    var created = 0;
    var count = 0;

    console.log("%d documents total", total);

    data.forEach(function (item) {
      new Model(item).save(function (err) {
        if (err) {
          if (err.code && err.code === 11000) {
            console.log("Already inserted (%s)", item._id);
          } else {
            console.log(err);
          }
        } else {
          created++;
        }

        if (++count === total) {
          console.log("Created %d new documents", created);

          inserted++;

          next();
        }
      });
    });
  }

  console.log("\nInserting statics JSON into database...\n".bold);

  /* Read all JSONs in the statics directory */
  fs.readdir('install/statics', function (err, files) {
    files.forEach(function (file) {
      if (path.extname(file) === '.json') {
        jsons.push(file);
      }
    });

    console.log("Read %d files".bold, jsons.length);
    console.dir(jsons);

    next();
  });
});
