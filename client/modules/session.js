(function (ng) {
  'use strict';

  ng.module('Session', []).

  factory('$session', [
    '$rootScope',

    function ($rootScope) {
      $rootScope.session = {};

      return {
        login: function (user) {
          $rootScope.session.user = user;

          if (user && user.role === 'provider' && !user.provider) {
            this.set('firstTime', true);
          }
        },

        logout: function () {
          delete $rootScope.session.user;
        },

        flash: function (type, title, message) {
          if (message) {
            $rootScope.session.flash = {
              message: message,
              title: title,
              type: type
            };
          } else {
            delete $rootScope.session.flash;
          }
        },

        user: function (field) {
          if (field && $rootScope.session.user) {
            return $rootScope.session.user[field];
          }

          return !!$rootScope.session.user;
        },

        get: function (key) {
          return $rootScope.session[key];
        },

        set: function (key, value) {
          $rootScope.session[key] = value;
        },

        /**
         * Checks if the current route is allowed to the current user.
         *
         * @param {Object} route The route object to check for.
         * @return {Boolean} Wether the route can be accessed.
         */
        isAllowed: function (route) {
          if (route && route.auth && route.auth.allows && ng.isString(route.auth.allows)) {
            return route.auth.allows === this.user('role');
          } else {
            return false;
          }

          /* Allow all by default */
          return true;
        },

        /**
         * Checks if the current route can be accessed after a login.
         *
         * @param {Object} route The route object to check for.
         * @return {Boolean} Wether the route can be accessed after a login.
         */
        canLogin: function (route) {
          return route && route.auth && route.auth.login && ng.isString(route.auth.login);
        },

        delete: function (key) {
          delete $rootScope.session[key];
        }
      };
    }

  ]).

  run([
    '$rootScope', '$route', '$session', '$location',

    function ($rootScope, $route, $session, $location) {

      /* Session handling */
      $rootScope.$on('$routeChangeStart', function ($event, $next) {
        var route = $next.$$route;

        $next.$$route.resolve = $next.$$route.resolve || {};

        $next.$$route.resolve.session = [
          '$route', '$session', '$http', '$q',

          function ($route, $session, $http, $q) {
            if (route.auth) {
              var deferred = $q.defer();

              /* Retrieve current session */
              $http.get('/api/session').
              success(function (data) {
                /* Session exists and user is logged in */
                $session.login(data.user);
              }).

              error(function () {
                $session.logout();
              }).

              finally(function () {
                if ($session.isAllowed(route)) {
                  deferred.resolve();
                } else if ($session.canLogin(route)) {
                  $session.set('redirect', $location.path());
                  $location.path(route.auth.login);
                } else {
                  $location.path('/forbidden');
                }
              });

              return deferred.promise;
            } else {
              return true;
            }
          }
        ];
      });
    }

  ]);

}(angular));
