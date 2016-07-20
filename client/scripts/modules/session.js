(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * Session factory function.
   */
  function sessionFactoryFn($rootScope) {
    $rootScope.session = {};

    /**
     * Sign a user in.
     */
    function signin(user) {
      $rootScope.session.user = user;
    }

    /**
     * Sign a user out.
     */
    function signout() {
      $rootScope.session.user = null;
    }

    function user(field) {
      if (field && $rootScope.session.user) {
        return $rootScope.session.user[field];
      }

      return !!$rootScope.session.user;
    }

    function get(key) {
      return $rootScope.session[key];
    }

    function set(key, value) {
      $rootScope.session[key] = value;
    }

    /**
     * Checks if the current route is allowed to the current user.
     *
     * @param {Object} route The route object to check for.
     *
     * @returns {Boolean} Whether the route can be accessed.
     */
    function isAllowed(route) {
      if (route && route.auth && route.auth.allows) {
        if (ng.isString(route.auth.allows)) {
          return route.auth.allows === user('role');
        }

        if (ng.isArray(route.auth.allows)) {
          return route.auth.allows.indexOf(user('role')) > -1;
        }
      } else {
        return false;
      }

      /* Allow all by default */
      return true;
    }

    /**
     * Checks if the current route can be accessed after a login.
     *
     * @param {Object} route The route object to check for.
     * @return {Boolean} Wether the route can be accessed after a login.
     */
    function canLogin(route) {
      return route && route.auth && route.auth.login && ng.isString(route.auth.login);
    }

    /**
     * Removes a property from the session object.
     *
     * @param {String} key The property name.
     */
    function rem(key) {
      delete $rootScope.session[key];
    }

    return {
      isAllowed: isAllowed,
      canLogin: canLogin,
      signout: signout,
      signin: signin,
      user: user,
      get: get,
      set: set,
      rem: rem
    };
  }

  /**
   * Session run function.
   */
  function sessionRunFn($rootScope, $route, $session, $location) {

    /**
     * Session has been checked and it's ok.
     */
    function checkSuccess(res) {
      /* Session exists and user is logged in */
      $session.signin(res.data);
    }

    /**
     * Session could not be checked.
     */
    function checkError() {
      $session.signout();
    }

    /**
     * Session check is complete.
     */
    function checkComplete($next, deferred) {
      if ($session.isAllowed($next.$$route)) {
        deferred.resolve();
      } else if ($session.canLogin($next.$$route)) {
        $session.set('redirect', $location.path());
        $location.path($next.$$route.auth.login);
      } else {
        $location.path('/');
      }
    }

    /**
     * Route change start listener callback.
     */
    function onRouteChangeStart($event, $next) {
      if ($next && $next.$$route) {
        $next.$$route.resolve = $next.$$route.resolve || {};

        $next.$$route.resolve.session = [
          '$route', '$session', '$http', '$q',

          function ($route, $session, $http, $q) {
            if ($next.$$route.auth) {
              var deferred = $q.defer();

              /* Retrieve current session */
              $http.get('/api/session')
                .then(checkSuccess)
                .catch(checkError)
                .finally(checkComplete.bind(null, $next, deferred));

              return deferred.promise;
            } else {
              return true;
            }
          }
        ];
      }
    }

    /* Session handling */
    $rootScope.$on('$routeChangeStart', onRouteChangeStart);
  }

  /* Define AngularJS module */
  ng.module('Session', []).

  /* Define AngularJS module service */
  factory('$session', [
    '$rootScope',

    sessionFactoryFn
  ]).

  /* Define AngularJS module run function */
  run([
    '$rootScope', '$route', '$session', '$location',

    sessionRunFn
  ]);

}(window));
