(function (ng) {
  'use strict';

  ng.module('Session', []).

  factory('$session', [
    '$rootScope',

    function ($rootScope) {
      $rootScope.session = {};

      return {
        signin: function (user) {
          $rootScope.session.user = user;
        },

        signout: function () {
          $rootScope.session.user = null;
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
          if (route && route.auth && route.auth.allows) {
            if (ng.isString(route.auth.allows)) {
              return route.auth.allows === this.user('role');
            }

            if (ng.isArray(route.auth.allows)) {
              return route.auth.allows.indexOf(this.user('role')) > -1;
            }
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

        if ($next && $next.$$route) {
          $next.$$route.resolve = $next.$$route.resolve || {};

          $next.$$route.resolve.session = [
            '$route', '$session', '$http', '$q',

            function ($route, $session, $http, $q) {
              if ($next.$$route.auth) {
                var deferred = $q.defer();

                /* Retrieve current session */
                $http.get('/api/session').then(function success(res) {
                  /* Session exists and user is logged in */
                  $session.signin(res.data);
                }, function error() {
                  $session.signout();
                }).then(function complete() {
                  if ($session.isAllowed($next.$$route)) {
                    deferred.resolve();
                  } else if ($session.canLogin($next.$$route)) {
                    $session.set('redirect', $location.path());
                    $location.path($next.$$route.auth.login);
                  } else {
                    $session.flash('warning', "Uh oh...", "that content isn't available");
                    $location.path('/');
                  }
                });

                return deferred.promise;
              } else {
                return true;
              }
            }
          ];
        }
      });
    }

  ]);

}(angular));
