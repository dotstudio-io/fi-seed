(function (ng) {
  'use strict';

  ng.module('App').

  config([
    '$locationProvider',

    function ($locationProvider) {
      $locationProvider.html5Mode(true);
    }
  ]).

  constant('APP_NAME', "Fi Seed").
  constant('YEAR', new Date().getFullYear()).
  constant('DOMAIN', 'https://github.com/finaldevstudio/fi-seed').

  run([
    '$rootScope', '$location', 'APP_NAME', 'YEAR', 'DOMAIN',

    function ($rootScope, $location, APP_NAME, YEAR, DOMAIN) {
      /* Constants set */
      $rootScope.APP_NAME = APP_NAME;
      $rootScope.DOMAIN = DOMAIN;
      $rootScope.YEAR = YEAR;

      /* Convenience navigate to method */
      $rootScope.$navigateTo = function (route) {
        $location.path(route);
      };
    }
  ]);

}(angular));
