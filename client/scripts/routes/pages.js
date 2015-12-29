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
        templateUrl: '/assets/templates/lost.html'
      }).

      when('/forbidden', {
        templateUrl: '/assets/templates/forbidden.html'
      }).

      otherwise({
        redirectTo: '/lost'
      })

      ;

    }

  ]);

}(angular));
