var mongoose = require('mongoose');
var json = ['cie10', 'genders', 'motives', 'specialties', 'priorities', 'checkups'];
var object = [{
    name: String,
    value: String
}];

var Model = mongoose.model('statics', {
    genders: object,
    motives: object,
    cie10: object,
    priorities: object,
    specialties: object,
    checkups: object
});

mongoose.connect('mongodb://localhost/telemed');
mongoose.connection.on('error', console.error.bind(console, 'Connection error:'));
mongoose.connection.once('open', function callback () {
    var i = 0,
        l = json.length,
        file = '',
        data = {};

    console.log('Connected!');

    for (; i < l; i++) {
        file = './' + json[i] + '.json';
        console.log('Reading %s', file);
        data[json[i]] = require(file);
    }

    (new Model()).save(data, function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('Success!');
        }
    });
});