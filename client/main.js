/* global angular */

(function (ng) {
  'use strict';

  ng.module('App').config([
    '$routeProvider', '$locationProvider',

    function ($routeProvider, $locationProvider) {
      /** Not found route **/
      $routeProvider.otherwise({
        redirectTo: '/notfound'
      }).when('/notfound', {
        templateUrl: '/templates/notfound.html'
      });

      $locationProvider.html5Mode(true);
    }

  ]).run([
    '$rootScope', '$location', '$session', '$http',

    function ($rootScope, $location, $session, $http) {
      /* Retrieve current session */
      $http.get('/api/session').success(function (data) {
        /* Session exists */
        $session.login(data.user);
        $location.path('/dashboard');

      }).error(function () {
        /* No session */
        $location.path('/');

      });
    }

  ]);

}(angular));
