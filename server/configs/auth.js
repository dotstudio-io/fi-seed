'use strict';

const CONSTS = require('fi-consts');

const HTTP_METHOD_GET = CONSTS.METHODS.HTTP.GET;
const ROLE_ADMIN = CONSTS.ROLES.ADMIN;
const ROLE_USER = CONSTS.ROLES.USER;

module.exports = {

  debug: require('debug')('app:auth'),

  authorizer: req => {
    if (req.session.user && req.session.user.roles) {
      return req.session.user.roles;
    }

    return null;
  },

  routes: [{
    method: HTTP_METHOD_GET,
    path: '/api/users/sign-out',
    allows: [
      ROLE_ADMIN, ROLE_USER
    ]
  }]

};
