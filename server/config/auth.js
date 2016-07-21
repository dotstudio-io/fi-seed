'use strict';

const CONSTS = require('fi-consts');
const debug = require('debug');

const HTTP_METHOD_GET = CONSTS.METHODS.HTTP.GET;
const ROLE_ADMIN = CONSTS.ROLES.ADMIN.VALUE;
const ROLE_USER = CONSTS.ROLES.USER.VALUE;

const ROUTE_API_USERS_SIGNOUT = '/api/users/sign-out';

module.exports = {

  debug: debug('app:auth'),

  authorizer: (req) => {
    if (req.session.user && req.session.user.role) {
      return CONSTS.ROLES[req.session.user.role].VALUE;
    }

    return null;
  },

  routes: [{
    method: HTTP_METHOD_GET,
    path: ROUTE_API_USERS_SIGNOUT,
    allows: [
      ROLE_ADMIN, ROLE_USER
    ]
  }]

};
