'use strict';

/**
 * A mock a file should always be a function that returns the mock object 
 */
module.exports = () => {

  return {
    path: __filename,
    options: {
      filename: 'test.js',
      contentType: 'application/json'
    }
  };

};
