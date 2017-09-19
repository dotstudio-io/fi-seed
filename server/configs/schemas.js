'use strict';

const fi = require('fi-utils');
const path = require('path');

module.exports = {

  partialsdir: path.normalize(path.join(fi.serverdir(), 'schemas', 'partials')),

  basedir: path.normalize(path.join(fi.serverdir(), 'schemas')),

  debug: require('debug')('app:schemas'),

  arguments: [{

    timestamps: true,

    toObject: {
      virtuals: true
    },

    toJSON: {
      virtuals: true
    }

  }]

};
