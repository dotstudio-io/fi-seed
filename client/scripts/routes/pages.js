(function (ng) {
  'use strict';

  ng.module('App').config([
    '$routeProvider',

    function ($routeProvider) {

      $routeProvider.

      when('/', {
        templateUrl: '/assets/templates/pages/home.html',
        controller: 'Pages:Home'
      }).

      when('/theme', {
        templateUrl: '/assets/templates/pages/theme.html',
        controller: 'Pages:Theme'
      }).

      /** Error routes */

      when('/lost', {
        templateUrl: '/assets/templates/pages/lost.html',
        controller: 'Pages:Lost'
      }).

      otherwise({
        redirectTo: '/lost'
      })

      ;

    }

  ]);

}(angular));
