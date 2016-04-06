'use strict';

module.exports = {

  debug: require('debug')('app:auth'),

  authorizer: (req) => {
    if (req.session.user && req.session.user.role) {
      return req.session.user.role.slug;
    }

    return null;
  },

  routes: [{
    method: 'GET',
    path: '/api/users/sign-out',
    allows: ['user', 'manager', 'admin']
  }]

};
