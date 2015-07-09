'use strict';

var database = require('../server/config/database');
var mongoose = require('mongoose');
var fs = require('fs');

require('colors');

try {
	var input = JSON.parse(fs.readFileSync('./install/statics/chile-complete-optimized.geojson', 'utf8'));
} catch (ex) {
	console.log(ex);
	process.exit(1);
}

database(function(err) {
	if (err) {
		console.log(err);
		process.exit(1);
	}

	console.log("\nInserting Geolocations into database...\n".bold);

	var Geolocation = mongoose.model('static.geolocation', require('../server/schemas/static/geolocation.js')(mongoose.Schema)),
		total = input.features.length,
		curr = 0,
		success = 0;

	input.features.forEach(function(feature) {
		var id = String(feature.properties.id);

		/* Generate an ID based on region's ID */
		feature._id = "e39549de1274" + ("000000000000" + id).slice(-12);

		new Geolocation(feature).
		save(function(err) {
			curr++;

			if (err) {
				if (err.code !== 11000) {
					console.log(err);
				}
			} else {
				success++;
			}

			if (curr === total) {
				console.log('%d of %d feature collections saved successfully\n', success, total);
				process.exit();
			}
		});
	});
});
