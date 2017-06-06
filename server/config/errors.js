'use strict';

/**
 * Custom application errors
 */
module.exports = {
  errors: [

    {
      name: 'BadRequestError',
      message: 'Query malformed.',
      code: 400
    },

    {
      name: 'AccessLevelError',
      message: 'Invalid access level for this operation.',
      code: 403
    },

    {
      name: 'MissingPreconditionError',
      message: 'There is a failed precondition with this request.',
      code: 412
    },

    {
      name: 'MongoDuplicatedError',
      message: 'This document is already registered.',
      code: 409
    },

    {
      name: 'NotFoundError',
      message: 'The HTTP route was not found.',
      code: 404
    }

  ],

  redirect: {
    error: '/error?err=',
    lost: '/lost?url='
  }
};