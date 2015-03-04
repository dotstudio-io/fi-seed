/* jshint node: true */
'use strict';

module.exports = function (Schema) {

  return new Schema({

    filename: String,

    contentType: String,

    length: Number,

    chunkSize: Number,

    uploadDate: Date,

    aliases: [String],

    metadata: Schema.Types.Mixed,

    md5: String

  });

};
