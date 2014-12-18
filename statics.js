/*jshint node: true */
'use strict';

var validate = require('jsonschema').validate;
var database = require('./config/database');
var inflection = require('inflection');
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');

database(function (err) {
    var inserted = 0, index = 0, jsons;

    function next() {
        /* Check if all the files were processed */
        if (index === jsons.length) {
            if (inserted === jsons.length) {
                console.log("\nEverything was inserted\n");
            } else {
                console.log("\nSome insertions failed\n");
            }

            /* Finish the process */
            process.exit(0);
        } else {
            var data = null, Model = null, json = jsons[index];

            console.log("\nInserting", json);

            try {
                data = require('./statics/' + json);
            } catch (ex) {
                console.error("\nJSON not found", ex);
            }

            try {
                Model = require('./schemas/static.' + inflection.singularize(path.basename(json, '.json')));
            } catch (ex) {
                console.error("\nModel not found", ex);
            }

            if (data && Model) {
                if (validate(4, data)) {
                    Model.collection.insert(data, function (err) {
                        index++;

                        if (err) {
                            console.log("Failed to insert", json, err);
                        } else {
                            console.log("Inserted", json);
                            inserted += 1;
                        }

                        next();
                    });
                } else {
                    console.log("\nMalformed JSON");
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
        console.log("\nConnected to database");

        fs.readdir('./statics', function (err, files) {
            console.log("\nRead %d files", files.length);
            console.log(files);

            jsons = files;

            next();
        });
    }

});
