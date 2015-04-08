/* jshint node: true */
'use strict';

var validate = require('jsonschema').validate;
var database = require('../server/config/database');
var inflection = require('inflection');
var mongoose = require('mongoose');
var path = require('path');
var colors = require('colors');
var fs = require('fs');

database(function (err) {
  var inserted = 0, index = 0, jsons;

  function next() {
    /* Check if all the files were processed */
    if (index === jsons.length) {
      if (inserted === jsons.length) {
        console.log("\n>>".bold.green, "Everything was inserted\n");
      } else {
        console.log("\n>>".bold.yellow, "Some insertions failed\n");
      }

      /* Finish the process */
      process.exit(0);
    } else {
      var data, Model, schema, json = jsons[index];
      index++;

      console.log("\n>>".bold.cyan, json.bold);

      try {
        data = require('./statics/' + json);
      } catch (ex) {
        console.error(">>".bold.red, ex);
        console.log(">>".bold.red, "Have you created the JSON file?");
      }

      try {
        schema = require('../server/schemas/static/' + inflection.singularize(path.basename(json, '.json')))(mongoose.Schema);
        Model = mongoose.model('static.' + path.basename(json, '.json'), schema);
      } catch (ex) {
        console.error(">>".bold.red, ex);
        console.log(">>".bold.red, "Have you created the schema yet?");
      }

      if (data && Model) {
        if (validate(4, data)) {

          var total = data.length, count = 0, success = 0,
              onsaved = function () {
                if (count === total) {
                  console.log("saved", success, "of", total, "documents");

                  inserted += 1;
                  next();
                } else {
                  saveDoc();
                }
              },
              saveDoc = function () {
                new Model(data[count]).save(function (err) {
                  if (!err) {
                    success++;
                  }

                  count++;
                  onsaved();
                });
              };

          saveDoc();

        } else {
          console.log("\n>>".bold.yellow, "\nMalformed JSON");
          next();
        }
      } else {
        next();
      }
    }
  }

  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    fs.readdir('./install/statics', function (err, files) {
      var fl = [];

      files.forEach(function (f) {
        if (path.extname(f) === '.json') {
          fl.push(f);
        }
      });

      console.log("\n>>".bold.white + " Read %d files".bold, fl.length);
      console.log(fl);

      jsons = fl;

      next();
    });
  }

});
