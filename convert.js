var fs = require('fs');
var data = require('./schemas/cie10.json');
var converted = [];

console.log("Converting values...");
for (var prop in data) {
    converted.push({
        name: prop,
        value: data[prop]
    });
}

console.log("Creating JSON...");
var json = JSON.stringify(converted, null, 4);

console.log("Writing data...");
fs.writeFileSync('cie10.json', json);

console.log("Completed!");

process.exit(0);
