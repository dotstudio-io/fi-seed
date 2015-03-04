/* global angular */

(function (ng) {
  'use strict';

  var timeout;

  ng.module('Session', []).factory('$session', [
    '$rootScope', '$timeout',

    function ($rootScope, $timeout) {
      $rootScope.session = {};

      return {
        login: function (user) {
          $rootScope.session.user = user;
        },

        logout: function () {
          delete $rootScope.session.user;
        },

        flash: function (type, message) {
          $timeout.cancel(timeout);

          if (message) {
            $rootScope.session.flash = {
              message: message,
              type: type
            };

            timeout = $timeout(function () {
              delete $rootScope.session.flash;
            }, 5000);
          } else {
            delete $rootScope.session.flash;
          }
        },

        user: function (field) {
          return $rootScope.session.user[field];
        },

        get: function (key) {
          return $rootScope.session[key];
        },

        set: function (key, value) {
          $rootScope.session[key] = value;
        },

        delete: function (key) {
          delete $rootScope.session[key];
        }
      };
    }

  ]);

}(angular));
