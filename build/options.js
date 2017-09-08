'use strict';

const ERR_BUILD = '\n  Plumber: Error on building task!\n';
const END = 'end';

const PLUMBER = {
  errorHandler: function (err) { // Needs a context
    console.error(ERR_BUILD);
    console.error(err);

    this.emit(END);
  }
};

const CACHE = {
  optimizeMemory: true
};

module.exports = {
  PLUMBER,
  CACHE
};
