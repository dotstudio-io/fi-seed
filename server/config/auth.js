'use strict';

module.exports = {

  debug: 'app:auth',

  authorizer: function (req) {
    if (req.session.user) {
      return true;
    }

    return false;
  },

  paths: [{
    method: 'GET',
    route: ['/api/users/:id'],
    allows: true
  }]

};
