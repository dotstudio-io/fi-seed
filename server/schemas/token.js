'use strict';

module.exports = (Schema) => {

  return new Schema({

    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },

    expires: {
      type: Date,
      expires: '1d',
      default: Date.now
    }

  }, {

    timestamps: true

  });

};
