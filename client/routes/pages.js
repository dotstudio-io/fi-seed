/* global angular */

(function (ng) {
  'use strict';

  ng.module('App').config([
    '$routeProvider',

    function ($routeProvider) {

      $routeProvider.when('/', {
        templateUrl: '/templates/pages/home.html'

      }).when('/help', {
        controller: 'Pages:Help',
        templateUrl: '/templates/pages/help.html'

      }).when('/dashboard', {
        controller: 'Pages:Dashboard',
        templateUrl: '/templates/pages/dashboard.html'

      });

    }

  ]);

}(angular));
