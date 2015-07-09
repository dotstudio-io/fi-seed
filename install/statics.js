'use strict';

var path = require('path');
var validate = require('jsonschema').validate;
var database = require('../server/config/database');
var inflection = require('inflection');
var mongoose = require('mongoose');
var fs = require('fs');

require('colors');

database(function(err) {
	var inserted = 0,
		index = 0,
		jsons;

	function next() {
		/* Check if all the files were processed */
		if (index === jsons.length) {
			if (inserted === jsons.length) {
				console.log("\nEverything was inserted!\n".bold);
			} else {
				console.log("\nSome insertions failed\n".bold.yellow);
			}

			/* Finish the process */
			process.exit(0);
		} else {
			var data, Model, schema, json = jsons[index];
			index++;

			console.log("\n%s...".bold, json);

			try {
				data = require('./statics/' + json);
			} catch (ex) {
				console.error(ex);
				console.log("\nHave you created the JSON file?".bold.red);
			}

			try {
				schema = require('../server/schemas/static/' + inflection.singularize(path.basename(json, '.json')))(mongoose.Schema);
				Model = mongoose.model('static.' + path.basename(json, '.json'), schema);
			} catch (ex) {
				console.error(ex);
				console.log("\nHave you created the schema yet?".bold.red);
			}

			if (data && Model) {
				if (validate(4, data)) {
					var total = data.length,
						count = 0,
						success = 0;

					var onsaved = function() {
						if (count === total) {
							console.log("saved %d of %d documents", success, total);

							inserted += 1;
							next();
						} else {
							saveDoc();
						}
					};

					var saveDoc = function() {
						new Model(data[count]).save(function(err) {
							if (!err) {
								success++;
							}

							count++;
							onsaved();
						});
					};

					saveDoc();
				} else {
					console.log("\nMalformed JSON".bold.yellow);
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
		console.log("\nInserting statics JSON into database...\n".bold);

		fs.readdir('./install/statics', function(err, files) {
			var fl = [];

			files.forEach(function(f) {
				if (path.extname(f) === '.json') {
					fl.push(f);
				}
			});

			console.log("Read %d files".bold, fl.length);
			console.dir(fl);

			jsons = fl;

			next();
		});
	}
});
