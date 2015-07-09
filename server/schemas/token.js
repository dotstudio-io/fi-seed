'use strict';

module.exports = function (Schema) {

  return new Schema({

    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },

    created: {
      type: Date,
      expires: '1d',
      default: Date.now
    }

  });

};
