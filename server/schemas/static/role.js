'use strict';

module.exports = (Schema) => {

  return new Schema({

    slug: {
      type: String,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true
    }

  });

};
