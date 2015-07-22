'use strict';

module.exports = {

  debug: 'app:auth',

  authorizer: function (req) {
    if (req.session.user) {
      return 'user';
    }

    return null;
  },

  routes: [{
    method: 'GET',
    path: ['/api/users/:id'],
    allows: 'admin'
  }]

};
