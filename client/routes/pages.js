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

      when('/help', {
        templateUrl: '/assets/templates/pages/help.html',
        controller: 'Pages:Help'
      }).

      when('/about', {
        templateUrl: '/assets/templates/pages/about.html',
        controller: 'Pages:About'
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
