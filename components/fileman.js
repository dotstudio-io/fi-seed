/*jslint node: true */
'use strict';

function checkType(file, done) {
    var mmmagic = require('mmmagic'),
        magic = new mmmagic.Magic(mmmagic.MAGIC_MIME_TYPE);

    magic.detect(file.buffer, function (err, detected) {
        if (err) {
            done.call(this, err, file);
        } else if (file.mimetype === detected) {
            done.call(this, null, file);
        } else {
            var mimerr = new Error("MIME type mismatch: received '" + file.mimetype + "' but detected '" + detected + "'");
            done.call(this, mimerr, file);
        }
    });
}

function validate(file, done) {
    checkType(file, function (err) {
        if (err) {
            done.call(this, err, file);
        } else {
            done.call(this, null, file);
        }
    });
}

module.exports.checkType = checkType;
module.exports.validate = validate;
