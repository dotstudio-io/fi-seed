'use strict';

module.exports = {

  /* App custom HTTP codes */
  errors: [{
    name: 'OkStatus',
    message: 'OK',
    code: 200
  }, {
    name: 'CreatedStatus',
    message: 'Created',
    code: 201
  }, {
    name: 'NoContentStatus',
    message: 'No Content',
    code: 204
  }, {
    name: 'GoneError',
    message: 'Gone',
    code: 410
  }],

  /* App custom error handlers */
  handlers: {
    /* Mongoose validation errors */
    'ValidationError': 'BadRequestError',

    /* MongoDB general errors */
    'MongoError': 'BadRequestError',

    /* MongoDB duplicated entity error */
    '11000': 'ConflictError'
  },

  shouldDebug: (err) => !err.code || err.code > 399,

  debug: require('debug')('app:errors')

};
