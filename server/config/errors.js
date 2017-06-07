'use strict';

/**
 * Custom application errors
 */
module.exports = {
  errors: [
    {
      name: 'MongoDuplicatedError',
      message: 'This document is already registered.',
      code: 409
    }
  ]
};